<!--
 * @Author: ZHAO
 * @Date: 2024-10-17 15:15:00
 * @LastEditTime: 2025-07-31 14:15:21
 * @LastEditors: JIANG
 * @Description: 
 * @FilePath: \shui-li\src\views\trainingCenter\index.vue
 * 
-->
<template>
    <div class="page-box">
        <div class="professional-banner"></div>
        <div class="page-content">
            <div class="page-left">
                <img class="page-left-bg" src="@/assets/images/banner/trainingCenter-left-bg.png" />
                <div class="list">
                    <div class="item" :class="{ active: search.nodeId  == item.id }" v-for="(item, index) in tags" :key="index" @click="handChange(item)">
                        <div class="befor-icon iconfont" :class="item.icon"></div>
                        <div class="text">{{ item.text }}</div>
                        <div class="after-icon iconfont icon-youjiantou"></div>
                    </div>
                </div>
            </div>
            <div class="page-right">
                <div class="data-list-text" v-if="tagsType=='1'">
                    <div class="data-item" @click="goDetail(item)" v-for="(item, index) in dataList" :key="index">
                        <div class="item-text-icon"></div>
                        <div class="item-text ellipsis">{{ item.DocTitle }}</div>
                        <div class="item-tips">{{ item.CreateTime }}</div>
                    </div>
                </div>
                <div class="cour-list" v-else-if="tagsType=='2'">
                    <div class="course-item" @click="goDetail(item)" v-for="(item,index) in dataList" :key="index">
                        <div class="course-img-box">
                            <img class="course-img" :src="item.file" alt />
                        </div>
                        <div class="course-name ellipsis">{{ item.DocTitle }}</div>
                    </div>
                </div>
                <div class="page-bottom">
                    <el-config-provider :locale="zhCn">
                        <el-pagination v-model:current-page="search.page " v-model:page-size="search.pageSize" background layout="prev, pager, next, jumper" :total="total" @size-change="getList" @current-change="getList" />
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
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { useRouter, useRoute } from 'vue-router';
import { ztreeAll } from '@/assets/api/common';
let route = useRoute();
const router = useRouter();
const tags = ref([
    {
        id: '1792da15-dfe0-4e2f-940c-90d8be0816f7',
        text: '城市体检',
        type: '2',
        icon: 'icon-chengshitijian'
    },
    {
        id: 'ddd14efb-fba4-4e84-b215-f7aa8da748aa',
        text: '试验检测员',
        type: '2',
        icon: 'icon-gangweiguanli'
    },
    {
        id: 'b72366ec-fb98-4588-ab79-1948b4fd4408',
        text: '无损检测员',
        type: '2',
        icon: 'icon-wusunjiancegongyi'
    }
    // {
    //     id: '27e43636-93a5-47e9-8f15-2a8f2a663fb9',
    //     text: '虚拟仿真培训',
    //     type: '2',
    //     icon: 'icon-VRD'
    // }
]);
const total = ref(100);
const tagsType = ref('1');
const dataList = ref([]);
const search = reactive({
    nodeId: '',
    pageSize: 9,
    page: 1
});
const handChange = (item: any) => {
    search.nodeId = item.id;
    tagsType.value = item.type;
    getList();
};
const getList = () => {
    professionalApi.newmaterialMaterial(search).then((res) => {
        total.value = res.materialCount;
        dataList.value = JSON.parse(res.list).obj;
    });
};
const goDetail = (item: any) => {
    window.open(`https://zyk.icve.com.cn/materialDetailed?id=${item.id}`, '_blank', 'noreferrer');
};
onMounted(async () => {
    proxy.bus.on('trainingCenter' + 'Reload', (index: number) => {
        search.nodeId = tags.value[index].id;
        tagsType.value = tags.value[index].type;
        getList();
    });
    if (route.query.index) {
        let index = Number(route.query.index);
        search.nodeId = tags.value[index].id;
        tagsType.value = tags.value[index].type;
    } else {
        search.nodeId = tags.value[0].id;
        tagsType.value = tags.value[0].type;
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
        background-image: url('@/assets/images/banner/trainingCenter-bg.jpg');
        margin-top: -70px;
    }
}
</style>
