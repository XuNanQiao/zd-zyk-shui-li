<!--
 * @Author: ZHAO
 * @Date: 2024-10-17 15:15:00
 * @LastEditTime: 2025-10-17 17:29:44
 * @LastEditors: ZHAO
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
                    <div
                        class="item"
                        :class="{ active: search.nodeId  == item.id }"
                        v-for="(item, index) in tags"
                        :key="index"
                        @click="handChange(item)"
                    >
                        <div class="befor-icon iconfont" :class="item.icon"></div>
                        <div class="text">{{ item.text }}</div>
                        <div class="after-icon iconfont icon-youjiantou"></div>
                    </div>
                </div>
            </div>
            <div class="page-right">
                <div class="data-list-text" v-if="tagsType=='1'">
                    <div
                        class="data-item"
                        @click="goDetail(item)"
                        v-for="(item, index) in dataList"
                        :key="index"
                    >
                        <div class="item-text-icon"></div>
                        <div class="item-text ellipsis">{{ item.DocTitle }}</div>
                        <div class="item-tips">{{ item.CreateTime }}</div>
                    </div>
                </div>
                <div class="cour-list" v-else-if="tagsType=='2'">
                    <div
                        class="course-item"
                        @click="goDetail(item)"
                        v-for="(item,index) in dataList"
                        :key="index"
                    >
                        <div class="course-img-box">
                            <img class="course-img" :src="item.file" alt />
                        </div>
                        <div class="course-name ellipsis">{{ item.DocTitle }}</div>
                    </div>
                </div>
                <div class="page-bottom">
                    <el-config-provider :locale="zhCn">
                        <el-pagination
                            v-model:current-page="search.page "
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
        id: '6bc05978-194d-4494-b8f6-0d4081abbedb',
        text: '材料检测',
        type: '2',
        icon: 'icon-xinrenkecheng'
    },
    {
        id: '0b1fafd4-03e7-40d1-8f2d-e902d889f9cd',
        text: '钢结构检测',
        type: '2',
        icon: 'icon-hexin'
    },
    {
        id: '7f033b78-de71-41e1-bbc5-63edeafe7c0d',
        text: '地基桩基检测',
        type: '2',
        icon: 'icon-wusunjiancegongyi'
    },
     {
        id: 'afe970d2-4f74-4f23-8d48-5289ae30713c',
        text: '砌体结构检测',
        type: '2',
        icon: 'icon-tuozhan'
    },
    {
        id: 'cca0010d-86d5-4b94-9454-7c95922658b6',
        text: '混凝土结构检测',
        type: '2',
        icon: 'icon-shixun'
    },
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
