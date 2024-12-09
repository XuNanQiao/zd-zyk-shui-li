<template>
    <div class="wrap">
        <div class="banner"></div>
        <div class="nothing">
            <img src="../../assets/images/banner/nothing.png" ondragstart="return false" />
            <div class="nothing-text">暂无数据</div>
        </div>
        <!-- <div class="min-container">
            <div class="tab-bar">
                <div
                    class="tab-item"
                    :class="{ active: item.id == state.nodeId }"
                    v-for="item in state.tabList"
                    :key="item.icon"
                    @click="changeType(item.id)"
                >
                    <div class="mask-layer">
                        <i :class="['iconfont', item.icon]"></i>
                        <div class="tag">{{ item.title }}</div>
                        <div class="line"></div>
                    </div>
                </div>
            </div>
            <div class="content-box">
                <div class="data-list">
                    <div
                        class="data-item"
                        @click="goDetail(item)"
                        v-for="(item, index) in state.dataList"
                        :key="index"
                    >
                        <img class="item-img" :src="item.murl" />
                        <div class="item-text-box">
                            <div class="item-title" :title="item.DocTitle">{{ item.DocTitle }}</div>
                            <div class="item-content" :title="item.DocTitle">
                                {{ item.DocTitle }}
                            </div>
                            <div class="item-bottom">
                                <div class="item-time">
                                    <i class="iconfont icon-shijian"></i>
                                    <span>{{ '2019-05-30' }}</span>
                                </div>
                                <div class="item-btn" @click="goDetail(item)">
                                    <span>查看详情</span>
                                    <i class="iconfont icon-youjiantou"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-bottom">
                    <el-config-provider :locale="zhCn">
                        <el-pagination
                            v-model:current-page="state.page.page"
                            v-model:page-size="state.page.pageSize"
                            background
                            layout="prev, pager, next, jumper"
                            :total="state.page.total"
                            @size-change="getList"
                            @current-change="getList"
                        />
                    </el-config-provider>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { ProfessionalApi } from '@/assets/api/professionalApi';
import { ztreeAll } from '@/assets/api/common';
import { useRoute } from 'vue-router';
const route = useRoute();
const professionalApi = new ProfessionalApi();
const { proxy } = getCurrentInstance();
const state = reactive({
    tabList: [
        {
            id: '1',
            icon: 'icon-jichupeizhi',
            title: '国际技能竞赛'
        },
        {
            id: '2',
            icon: 'icon-hexin',
            title: '国际交流资源'
        }
    ],
    page: {
        page: 1,
        pageSize: 2,
        total: 0
    },
    nodeId: '',
    lastTime: 0,
    dataList: []
});
const knowledge = async () => {
    await ztreeAll({
        nodeId: '82b4571f-ab62-4ac3-97b3-54319b26e3d0'
    }).then((res) => {
        res.forEach((item, index) => {
            for (let i = 0; i < state.tabList.length; i++) {
                let itemObj = state.tabList[i];
                if (item.name == itemObj?.title) {
                    itemObj.id = item.id;
                    return;
                }
            }
        });
        state.nodeId = state.tabList[0].id;
        console.log(state.tabList, '===state.tabList');
    });
};
const getList = () => {
    professionalApi
        .newmaterialMaterial({
            ...state.page,
            nodeId: state.nodeId
        })
        .then((res) => {
            state.dataList = JSON.parse(res.list).obj;
            state.page.total = res.materialCount;
        });
};
const changeType = (e) => {
    state.nodeId = e;
    getList();
};
const goDetail = (item) => {
    window.open(`https://zyk.icve.com.cn/materialDetailed?id=${item.id}`, '_blank', 'noreferrer');
};

onMounted(async () => {
    await knowledge();
    getList();
});
</script>

<style lang="scss" scoped>
.wrap {
    background-color: #fff;
    padding-bottom: 63px;
    .banner {
        width: 100%;
        height: 378px;
        background-image: url('@/assets/images/banner/internationalExchange-bg.png');
        background-size: 100% 100%;
        position: relative;
        margin-bottom: 88px;
    }

    .min-container {
        width: 1220px;
        margin: auto;

        .tab-bar {
            height: 286px;
            display: flex;
            justify-content: space-around;

            .tab-item {
                width: 610px;
                height: 286px;
                border-radius: 10px 10px 0 0;
                cursor: pointer;

                .mask-layer {
                    height: 100%;
                    background-color: rgba(16, 46, 104, 0.6);
                    border-radius: 10px 10px 0 0;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    .iconfont {
                        font-size: 51px;
                    }

                    .tag {
                        font-size: 20px;
                        margin-bottom: 10px;
                    }

                    .line {
                        width: 93px;
                        height: 4px;
                        background-color: #fff;
                    }
                }
            }

            @for $i from 1 through 2 {
                > :nth-child(#{$i}) {
                    background-image: url('@/assets/images/internationalExchange/tab#{$i}.png');
                    background-size: 100%;
                }
            }

            .active {
                .mask-layer {
                    background: linear-gradient(
                        180deg,
                        rgba(255, 255, 255, 1) 0%,
                        rgba(255, 255, 255, 0.71) 98.71%,
                        rgba(255, 255, 255, 0.7) 100%
                    );
                    box-shadow: 0px -9px 9px rgba(40, 57, 93, 0.54);
                    color: rgba(25, 112, 241, 1);
                }
            }
        }

        .content-box {
            width: 1220px;
            height: 671px;
            padding-top: 57px;
            background-color: #fff;
            box-shadow: 0px -9px 35px rgba(138, 165, 210, 1);

            .data-list {
                padding: 0px 150px;
                height: 450px;
                margin-bottom: 58px;

                .data-item {
                    height: 204px;
                    background-color: rgb(232, 244, 254);
                    padding: 17px 22px;
                    display: flex;
                    margin-bottom: 42px;
                    .item-img {
                        width: 257px;
                        height: 170px;
                        margin-right: 30px;
                        flex-shrink: 0;
                    }
                    .item-text-box {
                        width: 600px;
                        font-size: 24px;
                        flex-shrink: 0;
                        .item-title {
                            font-weight: bold;
                            margin-bottom: 20px;
                            width: 90%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .item-content {
                            text-indent: 2em;
                            height: 80px;
                            width: 90%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .item-bottom {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .item-time {
                                font-size: 18px;
                                color: #5d5d5d;
                            }
                            .item-btn {
                                font-size: 24px;
                                font-weight: bold;
                                color: #1970f1;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }

            .page-bottom {
                width: 100%;
                // position: absolute;
                bottom: 80px;
                height: 68px;
                display: flex;
                align-items: center;
                justify-content: center;

                :deep(.el-pagination) {
                    background: rgb(213, 226, 249);
                    padding: 10px 12px;
                    border-radius: 5px;

                    .btn-prev,
                    .number,
                    .more,
                    .btn-next {
                        background: #fff !important;
                    }

                    .is-active {
                        background: var(--el-color-primary) !important;
                    }
                }
            }
        }
    }
}
</style>
