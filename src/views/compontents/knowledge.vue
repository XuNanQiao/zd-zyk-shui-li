<!--
 * @Author: ZHAO
 * @Date: 2024-10-15 17:44:22
 * @LastEditTime: 2024-11-14 14:40:29
 * @LastEditors: JIANG
 * @Description: 
 * @FilePath: \weifang-drone\src\views\compontents\knowledge.vue
 * 
-->
<template>
    <div class="box">
        <div class="top">
            <div class="top-left">
                <el-dropdown popper-class="topMenu-radio">
                    <el-button type="primary">
                        展开节点
                        <el-icon class="el-icon--right"> <arrow-down /> </el-icon
                    ></el-button>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-button
                                @click="nodeChange(6)"
                                :type="optionData.select==6?'info':'primary'"
                                text
                                :disabled="optionData.select==6"
                            >
                                展开下级节点</el-button
                            >
                            <div></div>
                            <el-button
                                @click="nodeChange(3)"
                                :type="optionData.select==3?'info':'primary'"
                                text
                                :disabled="optionData.select==3"
                            >
                                收起下级节点</el-button
                            >
                            <el-dropdown-item divided>展开层级</el-dropdown-item>
                            <el-radio-group v-model="optionData.select" @change="nodeChange">
                                <el-radio :label="3">专业</el-radio>
                                <el-radio :label="6">课程</el-radio>
                            </el-radio-group>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="top-right">
                <el-input
                    v-model="optionData.search"
                    style="max-width: 600px"
                    placeholder="搜索内容"
                    class="input-with-select"
                >
                    <template #append>
                        <el-button :icon="Search" @click="searchHand" />
                    </template>
                </el-input>
            </div>
        </div>
        <div class="nodeBox">
            <div class="node-list">
                <div class="node" v-for="(item,index) in nodeData.categories" :key="index">
                    <div class="name">
                        <i class="iconfont icon-dian" :style="{color:colorList[index]}"></i>
                        <p>{{item.name}}</p>
                    </div>
                    <p>{{ nodeData.cateCount[item.name]}}</p>
                </div>
            </div>
            <div class="node-list relationship">
                <div class="node">
                    <div class="name">
                        <i class="iconfont icon-a-lujing10624" style="color:rgb(247, 90, 0) ;"></i>
                        <p>包含关系</p>
                    </div>
                </div>
                <div class="node">
                    <div class="name">
                        <i
                            class="iconfont icon-a-lujing10624"
                            style="color: rgb(66, 217, 163);"
                        ></i>
                        <p>并列关系</p>
                    </div>
                </div>
                <div class="node">
                    <div class="name">
                        <i class="iconfont icon-a-lujing10624" style="color:rgb(20, 95, 223) ;"></i>
                        <p>先后关系</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mountNode" id="mountNode" ref="myPage">
            <RelationGraph ref="graphRef" :options="graphOptions" :onNodeClick="onNodeClick">
                <template #node="{node}">
                    <div
                        @mouseover="showNodeTips(node, $event)"
                        @mouseout="hideNodeTips(node, $event)"
                    >
                        <div class="c-my-rg-node">
                            <i style="font-size: 30px;" :class="node.data.myicon" />
                        </div>
                        <div
                            class="node"
                            style="color: forestgreen;font-size: 16px;position: absolute; text-align: center;left: -65px;    top: 40px;width: 160px;"
                        >
                            {{ node.text }}
                        </div>
                    </div>
                </template>
                <template #graph-plug>
                    <div
                        v-if="isShowNodeTipsPanel"
                        :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }"
                        style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;"
                    >
                        <div style="line-height: 25px;color: #888888;font-size: 12px;">
                            {{currentNode.data.category}}信息
                        </div>
                        <div class="c-node-menu-item">
                            {{currentNode.data.category}}名称: {{currentNode.text}}
                        </div>
                    </div>
                </template>
            </RelationGraph>
        </div>
    </div>
</template>
/* 引入 G6 */
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import * as echarts from 'echarts';
import { Search } from '@element-plus/icons-vue';
import { HomeApi } from '@/assets/api/home';
const homeApi = new HomeApi();
type EChartsOption = echarts.EChartsOption;
const colorList = ref(['rgb(20, 95, 223)', 'rgb(128, 176, 255)', 'rgb(66, 217, 163)']);
const nodeData: any = reactive({ cateCount: {}, categories: [], edges: [], nodes: [] });
const optionData: any = reactive({ search: '', select: 6 });
import RelationGraph from 'relation-graph-vue3';
const graphRef = ref<RelationGraphComponent | null>(null);
const graphOptions: RGOptions = {};
const options = {
    defaultExpandHolderPosition: 'right',
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultNodeColor: 'rgba(66,187,66,1)',
    defaultJunctionPoint: 'border',
    focusNodeById: ''
};
import type {
    RGJsonData,
    RGNode,
    RGLine,
    RGLink,
    RGUserEvent,
    RGOptions,
    RelationGraphComponent
} from 'relation-graph-vue3';
const isShowNodeTipsPanel = ref(false);
const currentNode = ref({});
const myPage = ref();
const nodeMenuPanelPosition = ref({ x: 0, y: 0 });

onMounted(() => {
    homeApi.knowledge().then((res) => {
        Object.assign(nodeData, res);
        init(res);
    });
});
function init(data) {
    const __graph_json_data: RGJsonData = {
        rootId: 'a',
        nodes: data.nodes.map((node, index) => {
            return {
                id: node.id,
                text: node.name,
                styleClass: 'nodeItem',
                width: 30,
                height: 30,
                data: node,
                color:
                    node.category == '资源库'
                        ? 'rgb(20, 95, 223)'
                        : node.category == '专业'
                        ? 'rgb(128, 176, 255)'
                        : 'rgb(66, 217, 163)'
            };
        }),
        lines: data.edges.map((edge) => {
            return {
                from: edge.startId,
                to: edge.endId,
                label: false,
                data: edge,
                color:
                    edge.type == '包含'
                        ? 'rgb(247, 90, 0)'
                        : edge.type == '并列'
                        ? 'rgb(66, 217, 163)'
                        : 'rgb(20, 95, 223)'
            };
        })
    };
    const graphInstance = graphRef.value!.getInstance();
    graphInstance.setJsonData(__graph_json_data).then(() => {
        graphInstance.moveToCenter();
        graphInstance.zoomToFit();
    });
}
const nodeChange = (val) => {
    optionData.select = val;
    let data = { ...nodeData };
    if (optionData.select == 3) {
        data.nodes = data.nodes.filter((item) => item.category != '课程');
    }
    init(data);
};
const searchHand = () => {
    if (!optionData.search) return;
    const allNodes = graphRef.value.getNodes();
    let item: any = allNodes.filter((i) => i.text == optionData.search);
    if (item.length > 0) {
        // graphRef.value.getInstance().focusNodeById(item[0].id);
        onNodeClick(item[0]);
    }
    // onNodeClick()
};
const showNodeTips = (nodeObject: RGNode, $event: RGUserEvent) => {
    currentNode.value = nodeObject;
    const _base_position = graphRef.value!.getInstance().options.fullscreen
        ? { x: 0, y: 0 }
        : myPage.value.getBoundingClientRect();
    isShowNodeTipsPanel.value = true;
    nodeMenuPanelPosition.value.x = $event.clientX - _base_position.x + 10;
    nodeMenuPanelPosition.value.y = $event.clientY - _base_position.y + 10;
};

const hideNodeTips = (nodeObject: RGNode, $event: RGUserEvent) => {
    isShowNodeTipsPanel.value = false;
};
const userData = ref<any>([]);
const onNodeClick = (nodeObject: RGNode) => {
    let noData = nodeObject.data;
    nodeData.value = [];
    for (let key in noData) {
        nodeData.value.push({
            0: key,
            1: noData[key]
        });
    }
    userData.value = nodeObject;
    const allLinks = graphRef.value.getLinks();
    allLinks.forEach((link) => {
        // 还原所有样式
        link.relations.forEach((line) => {
            line.color =
                line.data.type == '包含'
                    ? 'rgb(247, 90, 0)'
                    : line.data.type == '并列'
                    ? 'rgb(66, 217, 163)'
                    : 'rgb(20, 95, 223)';
            line.lineWidth = 1;
        });
    });

    allLinks
        .filter((link) => link.fromNode === nodeObject || link.toNode === nodeObject)
        .forEach((link) => {
            link.relations.forEach((line) => {
                line.color = 'rgb(255, 0, 0)';
                line.lineWidth = 2;
            });
        });
    graphRef.value.getInstance().dataUpdated();
};
</script>

<style scoped lang="scss">
.box {
    position: relative;
    width: 1196px;
    height: 796px;
    // background: url(https://img.js.design/assets/img/670de12448e0a8436469a403.png);
    box-shadow: 0px 0px 24px rgba(138, 165, 210, 1);
    margin: 35px auto 55px;
    .top {
        height: 50px;
        background: #fff;
        position: relative;
        padding: 0px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .top::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 1px;
        background: #e0ecfb;
        box-shadow: 0 3px 6px 1px rgba(0, 0, 0, 0.06);
    }
    .nodeBox {
        padding-left: 15px;
        position: absolute;
        width: 150px;
        z-index: 1002;
        margin-top: 70px;
        .node-list {
            .node {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 44px;
                .name {
                    display: flex;
                    align-items: center;
                }
                .iconfont {
                    color: rgb(20, 95, 223);
                    font-size: 14px;
                    margin-right: 10px;
                }
                p {
                    font-size: 14px;
                    line-height: 14px;
                    color: #666;
                }
            }
        }
        .relationship {
            margin-top: 22px;
        }
    }
}
.mountNode {
    width: 1196px;
    height: 676px;
}
</style>
<style lang="scss">
.topMenu-radio {
    .el-radio-group {
        display: inline-flex;
        flex-direction: column;
        padding: 5px 16px;
        align-items: flex-start;
        .el-radio {
            display: block;
            margin: auto;
        }
    }
}
</style>
<style lang="scss">
.nodeItem {
    width: 30px;
    height: 30px;
    box-shadow: rgba(20, 95, 223, 0.3) 0px 0px 6px 2px;
    border: 4px solid rgb(255, 255, 255) !important;
    .c-node-text {
        border-radius: 50%;
        border: 4px solid rgb(255, 255, 255);
        box-shadow: rgba(20, 95, 223, 0.3) 0px 0px 6px 2px;
    }
}
.rel-node-checked {
    box-shadow: 0 0 0 5px #fd8b374d !important;
}
.c-my-rg-node {
    height: 80px;
    line-height: 80px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    place-items: center;
    justify-content: center;
}
</style>