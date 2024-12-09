<!--
 * @Author: ZHAO
 * @Date: 2024-10-15 17:44:22
 * @LastEditTime: 2024-10-18 16:53:37
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \Weifang-drone\src\views\compontents\knowledge copy.vue
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
            <el-button @click="zoomHand"> 缩放</el-button>
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
        <div class="mountNode" id="mountNode"></div>
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
const myChart = ref();
onMounted(() => {
    homeApi.knowledge().then((res) => {
        /*   nodeData.cateCount = res.cateCount;
        nodeData.categories = res.categories;
        nodeData.nodes = res.nodes;
        nodeData.edges = res.edges;
        console.log(nodeData, '-------nodeData'); */
        Object.assign(nodeData, res);
        init(res);
    });
});
function init(data) {
    let option = {
        title: {
            show: false,
            text: 'Basic Graph'
        },
        legend: { show: false },
        tooltip: {
            trigger: 'item',
            formatter: (params) => {
                if (params.dataType == 'node') {
                    return params.data.category + '名称：' + params.data.value;
                }
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    title: '缩放',
                    type: 'inside',
                    yAxisIndex: 'none'
                },
                brush: { type: 'lineY' },
                restore: {
                    title: '刷新'
                }
            }
        },
        dataZoom: {
            type: 'inside',
            start: 0, // 数据窗口范围的起始百分比
            end: 50, // 数据窗口范围的结束百分比
            minSpan: 10,
            maxSpan: 100,
            show: true
        },
        series: [
            {
                type: 'graph',
            layout: 'force',
            // coordinateSystem :'geo',
                symbolSize: 50,
                roam: true,
                draggable: true,
                markArea: { show: true, label: 'sdfsdf' },

                label: {
                    show: true,
                    position: 'bottom',
                    formatter: '{c}'
                },

                itemStyle: {
                    borderWidth: 2,
                    borderColor: 'rgb(255, 255, 255)',
                    shadowColor: 'rgba(20, 95, 223, 0.3)',
                    shadowBlur: 3
                },
                lineStyle: {
                    opacity: 0.9,
                    width: 1,
                    curveness: 0
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    show: false
                },
                emphasis: { focus: 'adjacency', scale: true },
                focusNodeAdjacency: true,
                legendHoverLink: true,
                selectedMode: 'single',
                select: {
                    itemStyle: {
                        borderColor: 'rgb(255, 255, 255)',
                        shadowColor: '#e57a2d'
                    },
                    lineStyle: {
                        width: 3,
                        borderColor: 'rgb(255, 255, 255)'
                    }
                },
                force: {
                    // initLayout: 'circular',
                    gravity: 0,
                    // friction: 0,
                    repulsion: 100,
                    edgeLength: [200, 300]
                },
                categories: data.categories.map((item, index) => {
                    return {
                        name: item.name,
                        itemStyle: {
                            color: colorList.value[index]
                        }
                    };
                }),
                nodes: data.nodes.map((node, index) => {
                    return {
                        id: node.id,
                        value: node.name,
                        name: node.name,
                        label: node.name,
                        symbolSize: 40,
                        category: node.category
                    };
                }),
                // links: [],
                links: data.edges.map((edge) => {
                    return {
                        source: edge.startId,
                        target: edge.endId,
                        label: false,
                        lineStyle: {
                            color:
                                edge.type == '包含'
                                    ? 'rgb(247, 90, 0)'
                                    : edge.type == '并列'
                                    ? 'rgb(66, 217, 163)'
                                    : 'rgb(20, 95, 223)'
                        }
                    };
                })
            }
        ]
    };
    var chartDom = document.getElementById('mountNode')!;

    if (chartDom) {
        myChart.value = echarts.init(chartDom);
      option && myChart.value.setOption(option);
      echarts.on('graphRoam', (params: any) => {
});
    }
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
    myChart.value.dispatchAction({
        type: 'select',
        name: optionData.search
    });
};
const zoomHand = () => {
    myChart.value.dispatchAction({
        type: 'graphRoam',
        zoom: 0.8
    });
};
</script>

<style scoped lang="scss">
.box {
    position: relative;
    width: 1245px;
    height: 834px;
    // background: url(https://img.js.design/assets/img/670de12448e0a8436469a403.png);
    box-shadow: 0px 0px 24px rgba(138, 165, 210, 1);
    margin: 45px auto 55px;
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
    width: 1245px;
    height: 784px;
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