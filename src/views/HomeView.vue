<!--
 * @Author: ZHAO
 * @Date: 2024-10-14 10:11:10
 * @LastEditTime: 2024-11-25 15:49:39
 * @LastEditors: JIANG
 * @Description: 
 * @FilePath: \dezhou-cereal\src\views\HomeView.vue
 * 
-->
<template>
    <div class="homePage">
        <el-carousel class="banner-box">
            <el-carousel-item class="banner-item" v-for="item in projectInfo?.projectBanners" :key="item.id">
                <el-image class="banner-img" fit="cover" :src="item.imageUrl"></el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="user-box">
        <div class="user-item">
            <img class="user-img" loading="lazy" src="@/assets/images/home/teacher.png" />
            <div class="user-tupe">教师用户</div>
        </div>
        <div class="user-item">
            <img class="user-img" loading="lazy" src="@/assets/images/home/pupil.png" />
            <div class="user-tupe">学生用户</div>
        </div>
        <div class="user-item">
            <img class="user-img" loading="lazy" src="@/assets/images/home/firm.png" />
            <div class="user-tupe">企业用户</div>
        </div>
        <div class="user-item">
            <img class="user-img" loading="lazy" src="@/assets/images/home/society.png" />
            <div class="user-tupe">社会学习者</div>
        </div>
    </div>
    <div class="wrap1">
        <div class="little-title">
            <div class="line-box">
                <div class="line"></div>
                <div class="round"></div>
            </div>
            <div class="title-box">
                <img class="title" loading="lazy" src="@/assets/images/home/title1.png"></img>
            </div>
            <div class="line-box">
                <div class="round"></div>
                <div class="line right"></div>
            </div>
        </div>
        <div class="home-data">
            <img class="data-img" loading="lazy" src="@/assets/images/home/home-data.png" />
            <div class="text-box">
                <div class="data-text" v-html="data.text"></div>
                <div class="view" @click="goPage('/projectInfo')">查看详情>></div>
            </div>
        </div>
        <div class="home-data-list">
            <div class="list-item">
                <img class="item-img" loading="lazy" src="@/assets/images/home/statistics1.png" />
                <div class="item-text">
                    用户数：
                    <text class="text-tips">{{ statistics.userNumber }}</text>
                </div>
                <div class="line"></div>
            </div>
            <div class="list-item">
                <img class="item-img" loading="lazy" src="@/assets/images/home/statistics2.png" />
                <div class="item-text">
                    课程数：
                    <text class="text-tips">{{ statistics.courseNumber }}</text>

                </div>
                <div class="line"></div>
            </div>
            <div class="list-item">
                <img class="item-img" loading="lazy" src="@/assets/images/home/statistics3.png" />
                <div class="item-text">
                    开课数：
                    <text class="text-tips">{{ statistics.courseInfoNumber }}</text>

                </div>
                <div class="line"></div>
            </div>
            <div class="list-item">
                <img class="item-img" loading="lazy" src="@/assets/images/home/statistics4.png" />
                <div class="item-text">
                    素材数：
                    <text class="text-tips">{{ statistics.resourceNumber }}</text>

                </div>
                <div class="line"></div>
            </div>
        </div>
        <div class="user-text-box">
            <div class="content-box"
                v-show="constructState.type == 2"
                :style="`background-image: url(${cultivateBg1});`"
            >
                <h4>
                    <div class="round">
                        <div class="small-round"></div>
                    </div>
                    人才培养方案
                </h4>
                <div class="text">
                    专业人才培养方案是职业院校落实党和国家关于技术技能人才培养总体要求，组织开展教学活动、安排教学任务的规范性文件，是实施专业人才培养和开展质量评价的基本依据。
                </div>
                <div class="see-btn" @click="toOption('professional', constructState.type)">查看详情>></div>
            </div>
            <div class="content-box" 
                v-show="constructState.type == 1"
                :style="`background-image: url(${cultivateBg2});`"
            >
                <h4>
                    <div class="round">
                        <div class="small-round"></div>
                    </div>
                    专业建设标准
                </h4>
                <div class="text">
                    专业（群）建设要重视市场在人才培养中的导向作用，根据市场需求的变化，与行业企业共同研讨制订专业教学方案；根据职业岗位技能要求和职业资格标准，规范实践教学基本要求，真正实现教学过程与生产过程对接、课程内容与职业标准对接。
                </div>
                <div class="see-btn" @click="toOption('professional', constructState.type)">查看详情>></div>
            </div>
            <div class="tab-box">
                <div @click="() => { constructState.type = 2 }" class="tab-item"
                    :class="{ active: constructState.type == 2 }">
                    <i class="iconfont icon-fanganku"></i>
                    <span>人才培养方案</span>
                </div>
                <div @click="() => { constructState.type = 1 }" class="tab-item"
                    :class="{ active: constructState.type == 1 }">
                    <i class="iconfont icon-xinrenkaohebiaozhun"></i>
                    <span>专业建设标准</span>
                </div>
            </div>
        </div>
    </div>

    <div class="wrap2">
        <div class="little-title">
            <div class="line-box">
                <div class="line"></div>
                <div class="round"></div>
            </div>
            <div class="title-box">
                <img class="title" loading="lazy" src="@/assets/images/home/title2.png"></img>
            </div>
            <div class="line-box">
                <div class="round"></div>
                <div class="line right"></div>
            </div>
        </div>
        <div class="house-of-culture">
            <img loading="lazy" src="@/assets/images/home/bg2.png" alt="" />
            <div class="house-of-culture-content">
                <div>
                    粮韵文化馆是一个专注于展示和传承粮食文化和历史的场所。它通过展览各种与粮食相关的文物、文献资料和实物藏品，向公众普及粮食知识，弘扬节粮惜粮的精神，并提供一个了解粮食安全和农耕文化的机会。粮韵文化馆通常会结合现代科技手段，如声、光、电等，以及互动体验，使参观者能够更加生动地感受到粮食文化的魅力和重要性。
                </div>
                <div class="more-btn" @click="toOption('research', 0)">查看详情>></div>
            </div>
        </div>
        <div class="nav-tabs-box">
            <div class="nav-tabs-item item1" @click="toOption('research', 0)">
                <div class="mask"></div>
                <div class="tips-box">
                    <img loading="lazy" src="@/assets/images/home/nav-icon1.png" alt="">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <text class="text stroke" x="0" y="0" alignment-baseline="text-before-edge"
                            text-anchor="start">“放心粮油”工程</text>
                    </svg>
                </div>
            </div>
            <div class="nav-tabs-item item2" @click="toOption('research', 1)">
                <div class="mask"></div>
                <div class="tips-box">
                    <img loading="lazy" src="@/assets/images/home/nav-icon2.png" alt="">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <text class="text stroke" x="0" y="0" alignment-baseline="text-before-edge"
                            text-anchor="start">“五粮手作”展示</text>
                    </svg>
                </div>
            </div>
            <div class="nav-tabs-item item3" @click="toOption('research', 2)">
                <div class="mask"></div>
                <div class="tips-box">
                    <img loading="lazy" src="@/assets/images/home/nav-icon3.png" alt="">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <text class="text stroke" x="0" y="0" alignment-baseline="text-before-edge"
                            text-anchor="start">“金色麦田”实践</text>
                    </svg>
                </div>
            </div>
            <div class="nav-tabs-item item4" @click="toOption('research', 3)">
                <div class="mask"></div>
                <div class="tips-box">
                    <img loading="lazy" src="@/assets/images/home/nav-icon4.png" alt="">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <text class="text stroke" x="0" y="0" alignment-baseline="text-before-edge"
                            text-anchor="start">“沿黄美食”体验</text>
                    </svg>
                </div>
            </div>
        </div>
        
        <!-- 两园 -->
        <div class="little-title">
            <div class="line-box">
                <div class="line"></div>
                <div class="round"></div>
            </div>
            <div class="title-box">
                <img loading="lazy" class="title" src="@/assets/images/home/title3.png"></img>
            </div>
            <div class="line-box">
                <div class="round"></div>
                <div class="line right"></div>
            </div>
        </div>
        <div class="two-garden">
            <div class="garden1" @click="toOption('professional', 0)">
                <div class="line"></div>
            </div>
            <div class="garden2" @click="toOption('industry', 0)">
                <div class="line"></div>
            </div>
            <div class="decorate">
                <div class="left"></div>
                <div class="right"></div>
                <div class="bottom"></div>
            </div>
        </div>
        
        <!-- 四中心 -->
        <div class="little-title">
            <div class="line-box">
                <div class="line"></div>
                <div class="round"></div>
            </div>
            <div class="title-box">
                <img loading="lazy" class="title" src="@/assets/images/home/title4.png"></img>
            </div>
            <div class="line-box">
                <div class="round"></div>
                <div class="line right"></div>
            </div>
        </div>
        <div class="four-centre">
            <div class="centre-item a1" @click="toOption('course', 0)">
                <div class="title-box">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <text class="text stroke" x="4" y="0" alignment-baseline="text-before-edge"
                            text-anchor="start">课程中心</text>
                    </svg>
                </div>
            </div>
            <div class="centre-item a2" @click="toOption('sourceMaterial', 0)">
                <div class="title-box">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <text class="text stroke" x="4" y="0" alignment-baseline="text-before-edge"
                            text-anchor="start">素材中心</text>
                    </svg>
                </div>
            </div>
            <div class="centre-item a3" @click="toOption('trainingCenter', 0)">
                <div class="title-box">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <text class="text stroke" x="4" y="0" alignment-baseline="text-before-edge"
                            text-anchor="start">培训中心</text>
                    </svg>
                </div>
            </div>
            <div class="centre-item a4" @click="toOption('virtualSimulation', 0)">
                <div class="title-box">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <text class="text stroke" x="4" y="0" alignment-baseline="text-before-edge"
                            text-anchor="start">虚仿中心</text>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <div class="virtual">
        <div class="details-btn" @click="toNext('https://strs.icve.com.cn/index')">查看详情>></div>
    </div>



    <div class="knowledge">
        <div class="little-title">
            <div class="line-box">
                <div class="line"></div>
                <div class="round"></div>
            </div>
            <div class="title-box">
                <img loading="lazy" class="title" src="@/assets/images/home/title5.png"></img>
            </div>
            <div class="line-box">
                <div class="round"></div>
                <div class="line right"></div>
            </div>
        </div>
        <div class="knowledge-content">
            <knowledge />
        </div>
    </div>
    <div class="team-box">
        <div class="team-wrap">
            <div class="little-title">
                <div class="line-box">
                    <div class="line"></div>
                    <div class="round"></div>
                </div>
                <div class="title-box">
                    <img loading="lazy" class="title" src="@/assets/images/home/title6.png"></img>
                </div>
                <div class="line-box">
                    <div class="round"></div>
                    <div class="line right"></div>
                </div>
            </div>
            <div class="team-content">
                <div class="team-tag">主持院校</div>
                <div class="school-box">
                    <div class="school-item" v-for="item in projectInfo?.projectGroupInfo?.presidingUnitName">
                        {{ item }}
                    </div>
                </div>
                <div class="team-tag">参建单位</div>
                <div class="unit-box">
                    <div class="school-item" v-for="item in projectInfo?.projectGroupInfo?.joinUnit">
                        <!-- <div v-html="item"></div> -->
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
import { useRouter } from 'vue-router';
import { HomeApi } from '@/assets/api/home';
import { getNewsList } from "@/assets/api/common"
import knowledge from './compontents/knowledge.vue';
import cultivateBg1 from "@/assets/images/home/cultivate-bg1.png"
import cultivateBg2 from "@/assets/images/home/cultivate-bg2.png"
const router = useRouter();
const homeApi = new HomeApi();
let data = reactive({
    text: ""
});
let statistics = reactive({
    userNumber: 0,
    courseNumber: 0,
    courseInfoNumber: 0,
    resourceNumber: 0
});

const constructState = reactive({
    type: 2,
    trainingProgram: ''
})

const toNext = (url: any) => {
    window.open(url, '_blank');
};
// 轮播图
const projectInfo = ref<any>();
const gatProjectInfo = () => {
    homeApi.projectInfo().then((res) => {
        // res.data.projectGroupInfo.joinUnit = res.data.projectGroupInfo.joinUnit.split(',').map((item: any) => {
        //     item = item.replace("(", '<br/>(')
        //     return item
        // });
        res.data.projectGroupInfo.joinUnit = res.data.projectGroupInfo.joinUnit.split(',')

        res.data.projectGroupInfo.presidingUnitName =
            res.data.projectGroupInfo.presidingUnitName.split(',');
        projectInfo.value = res.data;
    });
};

const toOption = (url: string, index: number) => {
    router.push(`/${url}?index=${index}`);
    proxy.bus.emit(`${url}Reload`, index);
};

onMounted(() => {
    homeApi.projectGroupInfo().then((res) => {
        constructState.trainingProgram = res.data?.projectMajor[0]?.trainingProgram
        data.text = res.data.projectGroupInfo.introduce;
    });
    homeApi.statisticsAllInfo().then((res) => {
        console.log(res, '====sss');

        statistics = res.data;
    });
    gatProjectInfo();

});
</script>
<style scoped lang="scss">
.homePage {
    .banner-box {
        width: 100%;
        height: 533px;

        .banner-item {
            height: 533px;

            .banner-img {
                background-color: aqua;
                width: 100%;
                height: 100%;
            }
        }

        :deep(.el-carousel__arrow) {
            background-color: rgba($color: #000000, $alpha: 0.5);
            top: 250px;
            width: 50px;
            height: 50px;

            i {
                font-size: 20px;
            }

            &:hover {
                background-color: #000000;
            }
        }
    }
}

.user-box {
    width: 964px;
    height: 124px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .25);
    margin: -70px auto 27px;
    display: flex;
    justify-content: space-evenly;
    position: relative;
    z-index: 999;

    .user-item {
        text-align: center;
        padding-top: 15px;

        .user-img {
            width: 64px;
            height: 64px;
        }

        .user-tupe {
            font-size: 20px;
            font-weight: bold;
            color: #000000;
        }
    }
}

.wrap1 {
    background-image: url('@/assets/images/home/bg1.png');
    background-size: 100% 100%;
    padding-bottom: 26px;

    .home-data {
        margin: 50px auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 1320px;

        .data-img {
            width: 649px;
            height: 365px;
            margin-right: 43px;
        }

        .text-box {
            position: relative;
            height: 274px;
            width: 597px;
            padding-top: 20px;

            .data-text {
                font-size: 20px;
                font-weight: 400;
                letter-spacing: 0px;
                line-height: 45px;
                color: rgba(0, 0, 0, 1);
                text-align: left;
                vertical-align: top;
                display: inline-flex;
                flex-wrap: wrap;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 6;
                /* 控制显示的行数 */

            }

            .view {
                width: 167px;
                height: 40px;
                background-color: #0A7860;
                color: #fff;
                font-size: 20px;
                line-height: 40px;
                text-align: center;
                margin: 20px auto 0;
                cursor: pointer;
            }
        }
    }

    .home-data-list {
        display: flex;
        justify-content: center;
        gap: 140px;
        margin-bottom: 30px;

        .list-item {
            display: flex;
            align-items: center;

            .item-img {
                width: 55px;
                height: 55px;
                margin-right: 20px;
            }

            .item-text {
                font-size: 20px;
                font-weight: bold;

                .text-tips {
                    font-size: 20px;
                    font-weight: bold;
                    color: #0A7860;
                }
            }
        }
    }

    .user-text-box {
        width: 1320px;
        height: 290px;
        margin: auto;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .25);
        display: flex;

        .content-box {
            width: 1008px;
            height: 290px;
            flex-shrink: 0;
            padding: 176px 61px 15px 229px;
            position: relative;
            background-size: 100% 100%;
            background-repeat: no-repeat;

            >h4 {
                font-size: 14px;
                color: #fff;
                font-weight: 500;
                text-shadow: 0px 2px 2px #000000;
                display: flex;
                align-items: center;

                .round {
                    width: 11px;
                    height: 11px;
                    background-color: #0A7860;
                    border: #fff 2px solid;
                    border-radius: 50%;
                    margin-right: 9px;
                }
            }
            .text{
                color: #fff;
                text-indent: 2em;
                text-shadow: 0px 2px 2px  #000000;
            }
            .see-btn{
                width: 97px;
                height: 25px;
                border: 1px solid #fff;
                color: #fff;
                text-align:center;
                background-color: #0A7860;
                font-size: 14px;
                position: absolute;
                right: 69px;
                bottom: 15px;
                cursor: pointer;
            }
        }

        .tab-box {
            flex-shrink: 0;
            padding: 81px 25px;
            font-size: 25px;
            color: #0A7860;
            
            .tab-item {
                height: 75px;
                line-height: 75px;
                cursor: pointer;

                >span {
                    font-weight: bold;
                }

                >i {
                    font-size: 26px;
                    margin-right: 22px;
                }
            }

            .active {
                background-color: #0A7860;
                color: #fff;
                padding: 0 45px;
                margin-left: -61px;
                box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.25);
                border-radius: 7px;
                position: relative;
                z-index: 999;
            }
        }
    }

}

.wrap2 {
    padding: 27px 300px;
    background: linear-gradient(180deg, rgba(228, 244, 233, 1) 0%, rgba(228, 244, 233, 0) 100%);

    .house-of-culture {
        display: flex;
        margin-bottom: 35px;

        >img {
            width: 653px;
            height: 405px;
            margin-right: 20px;
        }

        .house-of-culture-content {
            >:nth-child(1) {
                padding-top: 70px;
                font-size: 20px;
                line-height: 2.5;
                text-indent: 2em;
                margin-bottom: 40px;
            }

        }
    }

    .nav-tabs-box {
        width: 100%;
        height: 177px;
        display: flex;
        gap: 5px;
        margin-bottom: 32px;

        .nav-tabs-item {
            width: 327px;
            height: 177px;
            background-color: #0A7860;
            cursor: pointer;
            color: #fff;
            position: relative;

            .mask {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                transition: background-color .5s;
            }

            .tips-box {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding-top: 30px;


                img {
                    width: 59px;
                    height: 60px;
                    object-fit: cover;
                    margin-bottom: 10px;
                }

                svg {
                    width: 150px;
                    height: 30px;

                    .text {
                        font-size: 20px;
                        fill: white;
                        font-weight: 700;
                    }

                    .stroke {
                        stroke: rgba(10, 120, 96, 0);
                        paint-order: stroke;
                        stroke-width: 8px;
                        stroke-linejoin: round;
                        transition: .5s;
                    }
                }
            }

            &:hover .mask {
                background-color: rgba(0, 0, 0, 0);
            }

            &:hover .tips-box {
                svg {
                    .stroke {
                        stroke: rgba(10, 120, 96, 0.77);
                    }
                }
            }

        }

        @for $i from 1 through 4 {
            .item#{$i} {
                background-image: url('@/assets/images/home/nav-tabs#{$i}.png');
                background-size: 100% 100%;
            }
        }
    }

    .two-garden {
        position: relative;
        display: flex;
        justify-content: center;
        width: 1320px;
        height: 344px;
        gap: 15px;
        margin-bottom: 40px;

        .garden1,
        .garden2 {
            width: 634px;
            height: 333px;
            background-size: 100% 100%;
            position: relative;
            z-index: 1;
            transition: .5s;
            cursor: pointer;
        }

        .garden1:hover, .garden2:hover{
            transform: translate(0px, -20px);
        }

        .garden1 {
            background-image: url("@/assets/images/home/garden1.png");

        }

        .garden2 {
            background-image: url("@/assets/images/home/garden2.png");
        }

        .decorate {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;

            .left {
                position: absolute;
                top: 56px;
                left: 0;
                width: 13px;
                height: 234px;
                border-radius: 170px 0 0 170px;
                background-color: #0A7860;
            }

            .right {
                position: absolute;
                top: 56px;
                right: 0;
                width: 13px;
                height: 234px;
                border-radius: 0 170px 170px 0;
                background-color: #0A7860;
            }

            .bottom {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                width: 954px;
                height: 22px;
                background-image: url("@/assets/images/home/arc.png");
                background-size: 100% 100%;
            }
        }
    }

    .four-centre {
        width: 1320px;
        height: 465px;
        display: flex;
        gap: 10px;
        margin-top: 44px;

        > :nth-child(odd) {
            background-color: #0A7860;
        }

        > :nth-child(even) {
            background-color: #000000;
        }

        .centre-item {
            flex-shrink: 0;
            width: 360px;
            height: 465px;
            position: relative;

            .title-box {
                background-color: rgba(0, 0, 0, 0.2);
                width: 100%;
                height: 99px;
                position: absolute;
                bottom: 0;
                text-align: center;
                line-height: 130px;
                transition : background-color .5s;

                svg {
                    width: 94px;
                    height: 30px;
                    .text {
                        font-size: 20px;
                        fill: white;
                        font-weight: 700;
                    }

                    .stroke {
                        stroke: rgba(0, 0, 0, 0.6);
                        paint-order: stroke;
                        stroke-width: 10px;
                        stroke-linejoin: round;
                        transition: .5s;
                    }
                }
            }
        }

        .centre-item:hover .title-box {
            background-color: rgba(0, 0, 0, 0.8);
        }

        .a1 {
            -webkit-clip-path: polygon(0 0, 70% 0, 100% 100%, 0% 100%);
            clip-path: polygon(0 0, 70% 0, 100% 100%, 0% 100%);
            background-image: url("@/assets/images/home/a1.png");
            background-size: 100% 100%;
        }

        .a2 {
            width: 427px;
            background-image: url("@/assets/images/home/a2.png");
            background-size: 100% 100%;
            -webkit-clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);
            clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);
            margin-left: -100px;
            svg{
                margin-left: 80px;
            }
        }

        .a3 {
            width: 427px;
            background-image: url("@/assets/images/home/a3.png");
            background-size: 100% 100%;
            -webkit-clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);
            clip-path: polygon(0 0, 75% 0, 100% 100%, 25% 100%);
            margin-left: -100px;
            svg{
                margin-left: 80px;
            }
        }

        .a4 {
            -webkit-clip-path: polygon(0 0, 70% 0, 100% 100%, 0% 100%);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 100%);
            background-image: url("@/assets/images/home/a4.png");
            background-size: 100% 100%;
            margin-left: -100px;
            svg{
                margin-left: 90px;
            }
        }
    }
}

.virtual{
    width: 100%;
    height: 287px;
    background-image: url("@/assets/images/home/vr-bg.png");
    background-size: 100% 100%;
    position: relative;
    margin-bottom: 30px;

    .details-btn{
        width: 132px;
        height: 35px;
        background-color: #0A7860;
        color: #fff;
        font-size: 20;
        font-weight: bold;
        text-align: center;
        line-height: 35px;
        position: absolute;
        bottom: 70px;
        left: 525px;
        cursor: pointer;
    }
}

.little-title {
    font-family: AlimamaShuHeiTi-Bold;
    display: flex;
    justify-content: center;

    .line-box {
        display: flex;
        align-items: center;

        .line {
            width: 109px;
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, #0A7860 100%);
        }

        .right {
            background: linear-gradient(90deg, #0A7860 0%, transparent 100%);
        }

        .round {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #0A7860;
        }

    }

    .title-box {
        height: 48px;
        margin: 0 20px;

        .title {
            height: 48px;
        }
    }
}





// 建设团队
.team-box {
    background-color: #E6F0E6;
    padding-top: 40px;
    padding-bottom: 40px;
    .team-wrap{
        width: 1280px;
        margin: auto;
        .team-content {
            margin-top: 20px;
            .team-tag{
                color: #000000;
                font-size: 30px;
                font-weight: 700;
                letter-spacing: 9px;
                margin-left: 50px;
                margin-bottom: 40px;
                padding-left: 10px;
                position: relative;
                &::before{
                    content: '';
                    display: block;
                    width: 28px;
                    height: 50px;
                    background-color: #0A7860;
                    -webkit-clip-path: polygon(50% 0, 100% 0, 50% 100%, 0% 100%);
                    clip-path: polygon(50% 0, 100% 0, 50% 100%, 0% 100%);
                    position: absolute;
                    left: -50px;
                    top: 10px;
                }
                &::after{
                    content: '';
                    display: block;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, #0A7860 0%, transparent 100%);;
                }
            }
            .school-box, .unit-box{
                display: flex;
                flex-wrap: wrap;
                font-size: 20px;
                margin-bottom: 46px;
                .school-item{
                    width: 25%;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    padding: 0 10px;
                    margin-bottom: 30px;
                }
            }
        }
    }
}

.more-btn {
    cursor: pointer;
    width: 167px;
    height: 53px;
    opacity: 1;
    background: #0A7860;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 53px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin: 0px auto;
}

.knowledge {
    width: 100%;
    height: 975px;
    opacity: 1;
}
</style>
