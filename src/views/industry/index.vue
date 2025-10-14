<!--
 * @Author: ZHAO
 * @Date: 2024-10-17 15:15:00
 * @LastEditTime: 2025-07-31 14:21:57
 * @LastEditors: JIANG
 * @Description: 
 * @FilePath: \shui-li\src\views\industry\index.vue
 * 
-->
<template>
    <div class="page-box">
        <div class="professional-banner"></div>
        <div class="page-content">
            <div class="page-left">
                <img class="page-left-bg" src="@/assets/images/banner/industry-left-bg.png" />
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
    // {
    //     id: 'dd5186e5-bb0f-44d3-bdce-3beb0e9bf786',
    //     text: '产教融合',
    //     type: '2',
    //     icon: 'icon-chanpin'
    // },
    // {
    //     id: 'ffe068d1-e94e-4779-95cf-6c6b7fd11fe9',
    //     text: '城市体检',
    //     type: '2',
    //     icon: 'icon-chengshi'
    // },
    
    {
        id: 'adedd809-31d0-42e1-a845-d1b652594b06',
        text: '数字教材',
        type: '1',
        icon: 'icon-chanpin'
    },
    {
        id: '93d95cd2-3b82-4b5a-84ef-6b9385d98e4f',
        text: '学生案例',
        type: '2',
        icon: 'icon-wodekecheng'
    },
    {
        id: 'dad9d674-b7f0-4236-af56-8a8f782079ee',
        text: '教学案例',
        type: '1',
        icon: 'icon-shuzijiaocai'
    },
    // {
    //     id: 'f097e5fd-5042-4992-a439-157ff555a756',
    //     text: '知识图谱',
    //     type: '3',
    //     icon: 'icon-tuozhan'
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
    if(item.type == 3) {
        window.open(`https://specialty3d.zhihuishu.com/home/1843599388807663616`, '_blank', 'noreferrer');
    } else {
        search.nodeId = item.id;
        tagsType.value = item.type;
        getList();
    }
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
    proxy.bus.on('industryReload', (index: number) => {
        if(index == 4) {
            window.open(`https://specialty3d.zhihuishu.com/home/1843599388807663616`, '_blank', 'noreferrer');
        } else {
            search.nodeId = tags.value[index].id;
            tagsType.value = tags.value[index].type;
            getList();
        }
    });
    if (route.query.index) {
        if (route.query.index == '4') {
            window.open(`https://specialty3d.zhihuishu.com/home/1843599388807663616`, '_blank', 'noreferrer');
            search.nodeId = tags.value[0].id;
            tagsType.value = tags.value[0].type;
        } else {
            let index = Number(route.query.index);
            search.nodeId = tags.value[index].id;
            tagsType.value = tags.value[index].type;
        }
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
        background-image: url('@/assets/images/banner/industry-bg.jpg');
        margin-top: -70px;
    }
}
</style>
