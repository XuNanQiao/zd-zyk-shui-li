<!--
 * @Author: ZHAO
 * @Date: 2024-10-17 15:15:00
 * @LastEditTime: 2024-11-25 16:37:59
 * @LastEditors: JIANG
 * @Description: 
 * @FilePath: \dezhou-cereal\src\views\professional\index.vue
 * 
-->
<template>
    <div class="professional-page">
        <div class="professional-banner"></div>
        <div class="page-content">
            <div class="page-left">
                <div class="page-left-bg"></div>
                <div class="list">
                    <div
                        class="item"
                        :class="{ active: search.nodeId  == item.id }"
                        v-for="(item, index) in tags"
                        :key="index"
                        @click="handChange(item)"
                    >
                        <div class="befor-icon iconfont " :class="item.icon"></div>
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
                        <div class="item-text ellipsis">{{ item.DocTitle  }}</div>
                        <div class="item-tips">{{ item.CreateTime  }}</div>
                    </div>
                </div>
                <div class="cour-list" v-else-if="tagsType=='2'">
                    <div
                        class="course-item"
                        @click="goDetail(item)"
                        v-for="(item,index) in dataList"
                        :key="index"
                    >
                        <div class="course-img-box ">
                            <img class="course-img" :src="item.file" alt="" />
                        </div>
                        <div class="course-name ellipsis ">{{ item.DocTitle }}</div>
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
import { sr } from 'element-plus/es/locales.mjs';
let route = useRoute();
const router = useRouter();
const tags = ref([
    { id: "4ef2a4d8-ef2d-4c56-9e37-318eb71f068f", text: '专业介绍', type: '1', icon: 'icon-jieshaoxinxi' },
    { id: "a11c4caf-14f1-429c-9d68-e218afebe302", text: '专业标准', type: '1', icon: 'icon-xinrenkaohebiaozhun' },
    { id: "b3e1ad6e-ec81-4434-950a-1234b2556c82", text: '人培方案', type: '1', icon: 'icon-fanganku' },
    { id: "5e8cab26-f109-4e95-b1c0-3d7f4be102bb", text: '课程标准', type: '1', icon: 'icon-wodekecheng' },
    { id: "08183752-d840-41c0-bc12-485375b20119", text: '教学案例', type: '2', icon: 'icon-anli' },
    { id: '9ff40f61-563a-46ec-b65c-c96d21d5089c', text: '数字教材', type: '2', icon: 'icon-jieshaoxinxi' },
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
    proxy.bus.on('professionalReload', (index: number) => {
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
.professional-page {
    width: 100%;
    min-height: 100%;
    background: #fff;

    .professional-banner {
        background-image: url('@/assets/images/banner/professional-bg.png');
    }
}
</style>
