<!--
 * @Author: ZHAO
 * @Date: 2024-10-17 15:15:00
 * @LastEditTime: 2024-12-09 14:14:42
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \shui-li\src\views\professional\index.vue
 * 
-->
<template>
    <div class="page-box">
        <div class="professional-banner"></div>
        <div class="page-content">
            <div class="page-left">
                <img class="page-left-bg" src="@/assets/images/banner/professional-left-bg.png" />
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
                            <img class="course-img" :src="item.file" alt="" />
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
import { sr } from 'element-plus/es/locales.mjs';
let route = useRoute();
const router = useRouter();
const tags = ref([
    {
        id: '4a3d7070-9cf8-49b0-8835-cc18f5e23cff',
        text: '专业介绍',
        type: '1',
        icon: 'icon-jieshaoxinxi_o'
    },
    {
        id: '82da12d1-9b29-4beb-b3fe-61324ff4f3a3',
        text: '专业标准',
        type: '1',
        icon: 'icon-zhuanyemingcheng'
    },
    {
        id: '19adfa83-de18-4755-8ebc-bae02d955c9a',
        text: '行业标准',
        type: '1',
        icon: 'icon-hangye'
    },
    {
        id: 'e247440c-b04c-4ec3-95bc-cdb77dfca5ed',
        text: '职业标准',
        type: '1',
        icon: 'icon-zhiye'
    },
    { id: 'd2f629cc-8909-4adb-8507-fce717443349', text: '人培方案', type: '2', icon: 'icon-renpeibiaozhun' },
    { id: 'c49f5315-405b-4b87-829b-8222a00f60d2', text: '课程标准', type: '2', icon: 'icon-tongshikecheng' },
    { id: '061b183d-ff22-47d1-b9bb-a3f5f5da6e12', text: '专业课程体系', type: '2', icon: 'icon-zhuanyezhuanyeke' },
    { id: '0a0b3aa5-9cb0-446c-8fca-e921dd810775', text: '优秀教学案例', type: '2', icon: 'icon-tuijian' },
    
]);
const total = ref(100);
const tagsType = ref('1');
const dataList = ref<any>([]);
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
.page-box {
    .professional-banner {
        background-image: url('@/assets/images/banner/professional-bg.png');
        margin-top: -70px;
    }
}
</style>
