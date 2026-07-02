<!--
 * @Author: ZHAO
 * @Date: 2024-10-17 15:15:00
 * @LastEditTime: 2026-07-01 11:59:18
 * @LastEditors: ZHAO
 * @Description: 
 * @FilePath: \zd-zyk-shui-li\src\views\course\index.vue
 * 
-->
<template>
    <div class="page-box" :class="{ 'mobile-page': isMobile }">
        <div class="professional-banner">
            <div class="slideshow-box">
                <div ref="mobileBox" class="mobile-box">
                    <div class="slideshow-item" v-for="item in bannerList">
                        <div class="slideshow-text">
                            {{ item.name }}
                        </div>
                        <img :src="item.img" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="page-content" :class="{ 'mobile-content': isMobile }">
            <div class="page-left">
                <img class="page-left-bg" src="@/assets/images/banner/course-left-bg.png" />
                <div class="list">
                    <div
                        class="item"
                        :class="{ active: search.educationType == item.text }"
                        v-for="(item, index) in tags"
                        :key="index"
                        @click="handChange(item)"
                    >
                        <div class="befor-icon iconfont" :class="item.icon"></div>
                        <div class="text">{{ item.text }}</div>
                        <!-- <div class="after-icon iconfont icon-youjiantou"></div> -->
                    </div>
                </div>
            </div>
            <div class="page-right">
                <div class="cour-list">
                    <div
                        class="course-item"
                        @click="goDetail(item)"
                        v-for="(item,index) in dataList"
                        :key="index"
                    >
                        <div class="course-img-box">
                            <img class="course-img" :src="item.imageUrl" alt="" />
                        </div>
                        <div class="course-name ellipsis">{{ item.name }}</div>
                        <div class="course-tips ellipsis">{{ item.schoolName }}</div>
                        <div class="course-bottom">
                            <div>
                                <span class="iconfont icon-jiaoshi"></span>
                                {{item.userName}}
                            </div>
                            <!--  <div>
                                <span class="iconfont icon-yanjing"></span>
                                {{ item.peopleNumber}}
                            </div>-->
                        </div>
                    </div>
                </div>
                <div class="page-bottom">
                    <el-config-provider :locale="zhCn">
                        <el-pagination
                            v-model:current-page="search.pageNum "
                            v-model:page-size="search.pageSize"
                            background
                            layout="prev, pager, next, jumper"
                            :total="total"
                            @size-change="getList"
                            @current-change="getList"
                        />
                    </el-config-provider>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
import { ProfessionalApi } from '@/assets/api/professionalApi';
const professionalApi = new ProfessionalApi();
import { HomeApi } from '@/assets/api/home';
const homeApi = new HomeApi();

import banner1 from '@/assets/images/course/slideshow/1.jpeg';
import banner2 from '@/assets/images/course/slideshow/2.jpeg';
import banner3 from '@/assets/images/course/slideshow/3.jpeg';
import banner4 from '@/assets/images/course/slideshow/4.jpeg';
import banner5 from '@/assets/images/course/slideshow/5.jpeg';
import banner6 from '@/assets/images/course/slideshow/6.jpeg';
import banner7 from '@/assets/images/course/slideshow/7.jpeg';
import banner8 from '@/assets/images/course/slideshow/8.jpeg';

import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { useRouter, useRoute } from 'vue-router';
import { ztreeAll } from '@/assets/api/common';

// Element Plus locale声明
declare module 'element-plus/dist/locale/zh-cn.mjs' {
    const locale: any;
    export default locale;
}

// 响应式状态
const isMobile = ref(window.innerWidth <= 768);

const bannerList = [
    {img: banner1, name: '建筑材料与检测'},
    {img: banner2, name: '地基基础工程检测'},
    {img: banner3, name: '主体结构检测'},
    {img: banner4, name: '钢结构工程检测'},
    {img: banner5, name: '建筑节能检测'},
    {img: banner6, name: '室内环境检测'},
    {img: banner7, name: '高性能混凝土试验与检测'},
    {img: banner8, name: '房屋安全鉴定'},
    {img: banner1, name: '建筑材料与检测'},
    {img: banner2, name: '地基基础工程检测'},
    {img: banner3, name: '主体结构检测'},
    {img: banner4, name: '钢结构工程检测'},
    {img: banner5, name: '建筑节能检测'},
    {img: banner6, name: '室内环境检测'},
    {img: banner7, name: '高性能混凝土试验与检测'},
    {img: banner8, name: '房屋安全鉴定'},
]

let route = useRoute();
const router = useRouter();
const tags = ref([
    // { id: '', text: '数字教材', type: '2', icon: 'icon-jieshaoxinxi' },
    {
        id: '42196917-a72c-4ce2-8ef0-e64b2c2a67f9',
        text: '专业基础课',
        type: '2',
        icon: 'icon-basic-info'
    },
    {
        id: '0374f328-12c4-4e64-b866-6e12efe321cd',
        text: '专业核心课',
        type: '2',
        icon: 'icon-hexin'
    },
    {
        id: '22659ac1-a946-47cc-9ed1-4f30957ec418',
        text: '专业拓展课',
        type: '1',
        icon: 'icon-tuozhan'
    },
    {
        id: '952e432f-5aa9-41b5-a1e2-b84e284e206f',
        text: '实习实训课',
        type: '1',
        icon: 'icon-shixun'
    }
]);
const total = ref(100);
const dataList = ref<any>([]);
const search = reactive({
    courseType: '',
    educationType: '',
    pageSize: 9,
    pageNum: 1
});

// 监听窗口大小变化
const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
};

const handChange = (item: any) => {
    search.educationType = item.text;
    getList();
};
const getList = () => {
    let data={...search}
    data.courseType ='学历课程'
    homeApi.getCourseList(data).then((res) => {
        if (res.code == 200) {
            dataList.value = res.rows
            total.value = res.total;
        }
    })
};
const goDetail = (item: any) => {
    window.open(`https://zyk.icve.com.cn/courseDetailed?id=${item.id}`, '_blank', 'noreferrer');
};

const mobileBox = ref()
let offset = ref(0)
const mobileBoxMove = () => {
    if (offset.value == -1928) {
        offset.value = -20
    }
    offset.value--
    mobileBox.value.style.transform = `translate(${offset.value}px)`
    setTimeout(() => {
        mobileBoxMove()
    }, 10)
}
onMounted(async () => {
    // 响应式监听
    handleResize();
    window.addEventListener('resize', handleResize);
    
    mobileBoxMove()
    proxy.bus.on('course' + 'Reload', (index: number) => {
        search.educationType = tags.value[index].text;
        getList();
    });
    if (route.query.index) {
        let index = Number(route.query.index);
        search.educationType = tags.value[index].text;
    } else {
        search.educationType = tags.value[0].text;
    }
    getList();

});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped lang="scss">
// 引入 Element UI 的重置样式和变量文件
$--el-pagination-button-bg-color: '#fff';

// 引入 Element UI 的主样式文件
.page-box {
    .professional-banner {
        background-image: url('@/assets/images/banner/course-bg.png');
        margin-top: -70px;

        .slideshow-box{
            position: absolute;
            bottom: 29px;
            width: 100%;
            height: 154px;
            overflow: hidden;

            .mobile-box{
                margin-left: -188px;
                display: flex;
                gap:0 15px;
                transform: translate(0);
                .slideshow-item{
                    width: 274px;
                    height: 154px;
                    background-color: bisque;
                    border-radius: 17px;
                    flex-shrink: 0;
                    position: relative;
                    .slideshow-text{
                        width: 274px;
                        height: 36px;
                        line-height: 36px;
                        border-radius: 0px 0px 17px 17px;
                        background: rgba(0, 0, 0, 0.2);
                        backdrop-filter: blur(4px);
                        text-align: center;
                        position: absolute;
                        bottom: 0;
                        color: #fff;
                        font-size: 20px;
                    }
                    img{
                        width: 274px;
                        height: 154px;
                        border-radius: 17px;
                        object-fit: cover;
                        border: 2px solid rgba(255, 255, 255, 0.5);
                        box-shadow: 0px 0px 4px  rgba(0, 80, 184, 0.74);
                    }
                }
            }
        }
    }
}

.course-name {
    text-align: left !important;
}

// 移动端适配样式
.mobile-page {
    .professional-banner {
        background-size: cover;
        margin-top: -50px;
        
        .slideshow-box {
            height: 120px;
            bottom: 15px;
            
            .mobile-box {
                .slideshow-item {
                    width: 200px;
                    height: 112px;
                    border-radius: 12px;
                    
                    .slideshow-text {
                        width: 200px;
                        height: 28px;
                        line-height: 28px;
                        font-size: 14px;
                        border-radius: 0 0 12px 12px;
                    }
                    
                    img {
                        width: 200px;
                        height: 112px;
                        border-radius: 12px;
                    }
                }
            }
        }
    }
}

.mobile-content {
    .page-left {
        width: 100% !important;
        height: auto !important;
        position: relative !important;
        margin-bottom: 10px;
        
        .page-left-bg {
            display: none;
        }
        
        .list {
            display: flex;
            overflow-x: auto;
            padding: 10px;
            gap: 10px;
            
            .item {
                flex-shrink: 0;
                padding: 8px 16px;
                white-space: nowrap;
                
                .text {
                    font-size: 14px;
                }
            }
        }
    }
    
    .page-right {
        width: 100% !important;
        padding: 10px !important;
        
        .cour-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            
            .course-item {
                width: 100% !important;
                height: auto !important;
                display: flex;
                padding: 10px;
                
                .course-img-box {
                    width: 120px !important;
                    height: 90px !important;
                    flex-shrink: 0;
                    
                    .course-img {
                        width: 120px !important;
                        height: 90px !important;
                    }
                }
                
                .course-name {
                    font-size: 16px !important;
                }
                
                .course-tips {
                    font-size: 14px !important;
                }
            }
        }
        
        .page-bottom {
            padding: 10px !important;
            
            :deep(.el-pagination) {
                justify-content: center;
            }
        }
    }
}
</style>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
import { ProfessionalApi } from '@/assets/api/professionalApi';
const professionalApi = new ProfessionalApi();
import { HomeApi } from '@/assets/api/home';
const homeApi = new HomeApi();

import banner1 from '@/assets/images/course/slideshow/1.jpeg';
import banner2 from '@/assets/images/course/slideshow/2.jpeg';
import banner3 from '@/assets/images/course/slideshow/3.jpeg';
import banner4 from '@/assets/images/course/slideshow/4.jpeg';
import banner5 from '@/assets/images/course/slideshow/5.jpeg';
import banner6 from '@/assets/images/course/slideshow/6.jpeg';
import banner7 from '@/assets/images/course/slideshow/7.jpeg';
import banner8 from '@/assets/images/course/slideshow/8.jpeg';

import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { useRouter, useRoute } from 'vue-router';
import { ztreeAll } from '@/assets/api/common';

const bannerList = [
    {img: banner1, name: '建筑材料与检测'},
    {img: banner2, name: '地基基础工程检测'},
    {img: banner3, name: '主体结构检测'},
    {img: banner4, name: '钢结构工程检测'},
    {img: banner5, name: '建筑节能检测'},
    {img: banner6, name: '室内环境检测'},
    {img: banner7, name: '高性能混凝土试验与检测'},
    {img: banner8, name: '房屋安全鉴定'},
    {img: banner1, name: '建筑材料与检测'},
    {img: banner2, name: '地基基础工程检测'},
    {img: banner3, name: '主体结构检测'},
    {img: banner4, name: '钢结构工程检测'},
    {img: banner5, name: '建筑节能检测'},
    {img: banner6, name: '室内环境检测'},
    {img: banner7, name: '高性能混凝土试验与检测'},
    {img: banner8, name: '房屋安全鉴定'},
]

let route = useRoute();
const router = useRouter();
const tags = ref([
    // { id: '', text: '数字教材', type: '2', icon: 'icon-jieshaoxinxi' },
    {
        id: '42196917-a72c-4ce2-8ef0-e64b2c2a67f9',
        text: '专业基础课',
        type: '2',
        icon: 'icon-basic-info'
    },
    {
        id: '0374f328-12c4-4e64-b866-6e12efe321cd',
        text: '专业核心课',
        type: '2',
        icon: 'icon-hexin'
    },
    {
        id: '22659ac1-a946-47cc-9ed1-4f30957ec418',
        text: '专业拓展课',
        type: '1',
        icon: 'icon-tuozhan'
    },
    {
        id: '952e432f-5aa9-41b5-a1e2-b84e284e206f',
        text: '实习实训课',
        type: '1',
        icon: 'icon-shixun'
    }
]);
const total = ref(100);
const dataList = ref<any>([]);
const search = reactive({
    courseType: '',
    educationType: '',
    pageSize: 9,
    pageNum: 1
});
const handChange = (item: any) => {
    search.educationType = item.text;
    getList();
};
const getList = () => {
    let data={...search}
    data.courseType ='学历课程'
    homeApi.getCourseList(data).then((res) => {
        if (res.code == 200) {
            dataList.value = res.rows
            total.value = res.total;
        }
    })
};
const goDetail = (item: any) => {
    window.open(`https://zyk.icve.com.cn/courseDetailed?id=${item.id}`, '_blank', 'noreferrer');
};

const mobileBox = ref()
let offset = ref(0)
const mobileBoxMove = () => {
    if (offset.value == -1928) {
        offset.value = -20
    }
    offset.value--
    mobileBox.value.style.transform = `translate(${offset.value}px)`
    setTimeout(() => {
        mobileBoxMove()
    }, 10)
}
onMounted(async () => {
    // 响应式监听
    handleResize();
    window.addEventListener('resize', handleResize);
    
    mobileBoxMove()
    proxy.bus.on('course' + 'Reload', (index: number) => {
        search.educationType = tags.value[index].text;
        getList();
    });
    if (route.query.index) {
        let index = Number(route.query.index);
        search.educationType = tags.value[index].text;
    } else {
        search.educationType = tags.value[0].text;
    }
    getList();

});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped lang="scss">
// 引入 Element UI 的重置样式和变量文件
$--el-pagination-button-bg-color: '#fff';

// 引入 Element UI 的主样式文件
.page-box {
    .professional-banner {
        background-image: url('@/assets/images/banner/course-bg.png');
        margin-top: -70px;

        .slideshow-box{
            position: absolute;
            bottom: 29px;
            width: 100%;
            height: 154px;
            overflow: hidden;

            .mobile-box{
                margin-left: -188px;
                display: flex;
                gap:0 15px;
                transform: translate(0);
                .slideshow-item{
                    width: 274px;
                    height: 154px;
                    background-color: bisque;
                    border-radius: 17px;
                    flex-shrink: 0;
                    position: relative;
                    .slideshow-text{
                        width: 274px;
                        height: 36px;
                        line-height: 36px;
                        border-radius: 0px 0px 17px 17px;
                        background: rgba(0, 0, 0, 0.2);
                        backdrop-filter: blur(4px);
                        text-align: center;
                        position: absolute;
                        bottom: 0;
                        color: #fff;
                        font-size: 20px;
                    }
                    img{
                        width: 274px;
                        height: 154px;
                        border-radius: 17px;
                        object-fit: cover;
                        border: 2px solid rgba(255, 255, 255, 0.5);
                        box-shadow: 0px 0px 4px  rgba(0, 80, 184, 0.74);
                    }
                }
            }
        }
    }
}
.course-name {
    text-align: left !important;
}
</style>
