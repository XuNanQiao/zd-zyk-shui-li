<!--
 * @Author: ZHAO
 * @Date: 2024-10-14 10:11:10
 * @LastEditTime: 2024-11-22 10:48:07
 * @LastEditors: JIANG
 * @Description: 
 * @FilePath: \dezhou-cereal\src\views\projectInfo.vue
 * 
-->
<template>
    <div class="little-title">
        <div class="title">资源库简介</div>
        <div class="title-line"></div>
    </div>
    <div class="home-data">
        <img class="data-img" src="@/assets/images/home/home-data.png" />
        <div class="text-box">
            <div class="data-text" v-html="data.text"></div>
        </div>
    </div>
    <el-button color="#0A7860" class="button" @click="goPage('/home')"
        >返回首页</el-button
    >
</template>
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
import { HomeApi } from '@/assets/api/home';
const homeApi = new HomeApi();
let data = reactive({
    text: ``
});

onMounted(() => {
    homeApi.projectGroupInfo().then((res) => {
        data.text = res.data.projectGroupInfo.introduce;
    });
});
</script>
<style scoped lang="scss">
.little-title {
    padding-top: 36px;
    .title {
        font-size: 40px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 1;
        color: rgba(0, 0, 0, 1);
        text-align: center;
    }

    .title-line {
        margin: 20px auto 0px;
        width: 400px;
        height: 5px;
        opacity: 1;
        background: linear-gradient(
            90deg,
            rgba(10, 120, 96, 0) 0%,
            rgba(10, 120, 96, 0.98) 52.05%,
            var( --title-color) 53.08%,
            rgba(10, 120, 96, 0) 100%
        );
    }
}
.home-data {
    margin-top: 50px;
    .data-img {
        width: 596px;
        height: 372px;
        display: block;
        margin: 0px auto;
    }
    .text-box {
        position: relative;
        padding: 33px 200px;
        text-indent: 4em;
        .data-text {
            font-size: 24px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 1.8;
            color: rgba(0, 0, 0, 1);
            :deep(strong) {
                font-weight: bold !important;
            }
        }
    }
}
.button {
    margin: 32px auto;
    display: block;
    width: 216px;
    height: 58px;
    font-size: 30px;
}
</style>
