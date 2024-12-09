<!--
 * @Author: ZHAO
 * @Date: 2024-10-17 15:15:00
 * @LastEditTime: 2024-12-09 14:32:18
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \shui-li\src\views\course\index.vue
 * 
-->
<template>
    <div class="page-box">
        <div class="professional-banner"></div>
        <div class="page-content">
            <div class="page-left">
                <img class="page-left-bg" src="@/assets/images/banner/course-left-bg.png" />
                <div class="list">
                    <div class="item" :class="{ active: search.tags    == item.text }" v-for="(item, index) in tags" :key="index" @click="handChange(item)">
                        <div class="befor-icon iconfont" :class="item.icon"></div>
                        <div class="text">{{ item.text }}</div>
<!--                         <div class="after-icon iconfont icon-youjiantou"></div> -->
                    </div>
                </div>
            </div>
            <div class="page-right">
                <div class="cour-list">
                    <div class="course-item" @click="goDetail(item)" v-for="(item,index) in dataList" :key="index">
                        <div class="course-img-box">
                            <img class="course-img" :src="item.imageUrl" alt />
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
                        <el-pagination v-model:current-page="search.pageNum " v-model:page-size="search.pageSize" background layout="prev, pager, next, jumper" :total="total" @size-change="getList" @current-change="getList" />
                    </el-config-provider>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
import { ProfessionalApi } from '@/assets/api/professionalApi';
const professionalApi = new ProfessionalApi();
import { HomeApi } from '@/assets/api/home';
const homeApi = new HomeApi();

import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { useRouter, useRoute } from 'vue-router';
import { ztreeAll } from '@/assets/api/common';
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
const dataList = ref([]);
const search = reactive({
    tags: '',
    pageSize: 9,
    sort: 'create_time',
    pageNum: 1
});
const handChange = (item: any) => {
    search.tags = item.text;
    getList();
};
const getList = () => {
    let data={...search}
    data.tags ='食品生物技术'
    homeApi.getCourseList3(data).then((res) => {
        total.value = res.total;
        dataList.value = res.rows;
    });
};
const goDetail = (item: any) => {
    window.open(`https://zyk.icve.com.cn/courseDetailed?id=${item.id}`, '_blank', 'noreferrer');
};
onMounted(async () => {
    proxy.bus.on('course' + 'Reload', (index: number) => {
        search.tags = tags.value[index].text;
        getList();
    });
    if (route.query.index) {
        let index = Number(route.query.index);
        search.tags = tags.value[index].text;
    } else {
        search.tags = tags.value[0].text;
    }
    getList();
});
</script>

<style scoped lang="scss">
// 引入 Element UI 的重置样式和变量文件
$--el-pagination-button-bg-color: '#fff';

// 引入 Element UI 的主样式文件
.page-box {
    .professional-banner {
        background-image: url('@/assets/images/banner/course-bg.png');
    }
}
.course-name {
    text-align: left !important;
}

</style>
