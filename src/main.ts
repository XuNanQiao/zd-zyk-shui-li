/*
 * @Author: ZHAO
 * @Date: 2024-01-10 16:42:49
 * @LastEditTime: 2025-05-21 17:31:26
 * @LastEditors: JIANG
 * @Description:
 * @FilePath: \shui-li\src\main.ts
 *
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { getTokenFromCookie, saveTokenToCookie } from '@/utils/cookie';
import { useUserStore } from '@/stores/user';
import { LoginApi } from '@/assets/api/login';
import mitt from 'mitt';
import App from './App.vue';
import router from './router';
import './utils/rem';

import 'element-plus/dist/index.css';
import './assets/main.css';
import './assets/index.scss';
const loginApi = new LoginApi();

/**
 * 获取用户信息和用户权限对应的路由，构建动态路由
 */
async function getLoginInfo() {
    try {
        //获取登录用户信息
        loginApi.getLoginInfo().then((res) => {
            initVue();
            useUserStore().setUserLoginInfo(res.data);
        });
        //更新用户信息到pinia
    } catch (e) {
        initVue();
    }
}
function initVue() {
    const app = createApp(App);
    app.config.globalProperties.goPage = (path: string) => {
        router.push(path);
    };
    app.config.globalProperties.goBack = () => {
        router.back();
    };
    app.config.globalProperties.bus = mitt();
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }
    app.use(createPinia());
    app.use(router);
    app.use(ElementPlus);
    app.mount('#app');
}

let token = getTokenFromCookie();
if (token) {
    getLoginInfo();
} else {
    initVue();
}
