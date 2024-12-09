<!--
 * @Author: ZHAO
 * @Date: 2024-01-12 16:39:21
 * @LastEditTime: 2024-12-02 10:55:41
 * @LastEditors: JIANG
 * @Description: 
 * @FilePath: \dezhou-cereal\src\layout\index.vue
 * 
-->
<template>
    <div class="header">
        <div class="header-left">
            <!-- <img class="hearer-logo" :src="logo ? logo : '/src/assets/images/logo.png'" /> -->
            <img class="hearer-logo" src="/src/assets/images/logo.png" />
            <div class="hearer-title">
                <div class="title" @click="goPage(`/home`)">粮食工程技术与管理专业教学资源库</div>
                <div class="tips">
                    Teaching Resource Library for Grain Engineering Technology and Management
                </div>
            </div>
        </div>
        <div class="header-right">
            <div class="hearer-user flex" v-if="token">
                <el-image class="user-img" :src="userInfo.avatar ? userInfo.avatar : ''" />
                <div class="name" @click="toNext">{{ userInfo.nickName }}</div>
                <el-divider direction="vertical" />
                <div class="name" @click="logout">退出</div>
            </div>
            <div v-else class="hearer-user flex">
                <!-- <img class="user-img" :src="sculpture" /> -->
                <el-icon class="icon" @click="goLogin"><User /></el-icon>
                <div class="login name" @click="goLogin">登录</div>
                <el-divider direction="vertical" />
                <div class="name" @click="goRegister">注册</div>
            </div>
        </div>
    </div>
    <div class="tab-list">
        <el-menu
            :default-active="defaultActive"
            popper-class="layout-menu-popper"
            class="el-menu-popper-demo"
            mode="horizontal"
            :popper-offset="0"
            @select="select"
        >
            <template v-for="(item,index) of menuList" :key="index">
                <el-sub-menu
                    :index="item.path"
                    v-if="item.children&&item.children.length>0"
                    :data-content="item.name"
                >
                    <template #title>
                        <div @click="turnToPage(item.path)">
                            {{ item.name}}
                        </div>
                    </template>
                    <el-menu-item
                        v-for="(chil,chilIndex) of item.children"
                        :key="chilIndex"
                        :index="chil.path"
                        >{{chil.name}}</el-menu-item
                    >
                </el-sub-menu>
                <el-menu-item
                    v-else
                    :index="item.path"
                    :data-content="item.name"
                    >{{ item.name}}</el-menu-item
                >
            </template>
        </el-menu>
    </div>
    <router-view> </router-view>
    <div class="footer">
        <div class="footer-inner">
            <div class="top">
                <div class="footer-left">
                    <a :href="item.url" target="_blank" class="ve-link" v-for="item in linksList">
                        {{item.name}}
                    </a>
                </div>
                <div class="footer-right">
                    <h3 class="footer-logo">高等教育出版社</h3>
                    <div class="footer-text">
                        <p>
                            <a
                                href="https://www.icve.com.cn/portal_new/apply/apply.html"
                                target="_blank"
                                class="ve-link"
                            >
                                开通项目申请表
                            </a>
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/platform.html?page=1"
                                target="_blank"
                                class="ve-link"
                            >
                                平台简介
                            </a>
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/platform.html?page=2"
                                target="_blank"
                                class="ve-link"
                            >
                                知识产权
                            </a>
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/platform.html?page=3"
                                target="_blank"
                                class="ve-link"
                            >
                                免责声明
                            </a>
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/platform.html?page=4"
                                target="_blank"
                                class="ve-link"
                            >
                                意见反馈
                            </a>
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/platform.html?page=5"
                                target="_blank"
                                class="ve-link"
                            >
                                联系我们
                            </a>
                            &nbsp;|&nbsp;
                            <a
                                href="https://www.icve.com.cn/portal_new/platform/policy.html"
                                target="_blank"
                                class="ve-link"
                            >
                                隐私政策
                            </a>
                            <a
                                href="https://help.icve.com.cn/jjxx"
                                target="_blank"
                                class="ve-link"
                            >
                                疫情防控在线教学方案
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <a
                    target="_blank"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010202007836"
                >
                    <p>京公网安备 11010202007836号</p>
                </a>
                <span>Copyright©2014-2019 高等教育出版社</span>
                <a href="http://beian.miit.gov.cn" class="copyright-ICP">
                    京ICP备12020869号-19
                </a>
                <div style="display: inline-block; vertical-align: middle">
                    <span>技术支持:</span>
                    <a href="javascript:;"></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
const { proxy } = getCurrentInstance();
const sculpture = computed(() => useUserStore().sculpture);
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
import { LoginApi } from '@/assets/api/login';
const loginApi = new LoginApi();
import { clearAllCoolies, COOKIE_TOKEN_KEY } from '@/utils/cookie';
import { passLogin, getUserInfo, logoutApi, getLink } from '@/assets/api/common';
import Cookies from 'js-cookie';
import { ztreeAll } from '@/assets/api/common';

import { HomeApi } from '@/assets/api/home';
const homeApi = new HomeApi();
// const defaultActive = ref('/home');
const defaultActive = computed(() => {
    const { meta, fullPath } = route;

    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
        return meta.activeMenu;
    }
    return fullPath;
});

const menuList = ref([
    { path: '/home', name: '首页' },
    {
        path: '/professional',
        name: '专业园地',
        children: [
            { path: '/professional?index=0', name: '专业介绍' },
            { path: '/professional?index=1', name: '专业标准' },
            { path: '/professional?index=2', name: '人培方案' },
            { path: '/professional?index=3', name: '课程标准' },
            { path: '/professional?index=4', name: '教学案例' },
            { path: '/professional?index=5', name: '数字教材' },
        ]
    },
    {
        path: '/industry',
        name: '行业园地',
        children: [
            { path: '/industry?index=0', name: '行业信息' },
            { path: '/industry?index=1', name: '行业标准' },
            { path: '/industry?index=2', name: '就业信息' },
            { path: '/industry?index=3', name: '企业文化' },
            { path: '/industry?index=4', name: '行业新技术' }
        ]
    },
    {
        path: '/course',
        name: '课程中心',
        children: [
            { path: '/course?index=0', name: '食品生物技术' },
            { path: '/course?index=1', name: '食品营养与健康' },
            { path: '/course?index=2', name: '食品智能加工技术' },
            { path: '/course?index=3', name: '食品检验检测技术' },
            { path: '/course?index=4', name: '粮食储运与质量安全' },
            { path: '/course?index=5', name: '粮食工程技术与管理' }
        ]
    },
    { path: '/sourceMaterial', name: '素材中心' },
    {
        path: '/trainingCenter',
        name: '培训中心',
        children: [
            { path: '/trainingCenter?index=0', name: '社会培训' },
            { path: '/trainingCenter?index=1', name: '企业培训' },
            { path: '/trainingCenter?index=2', name: '职业认证培训' },
            { path: '/trainingCenter?index=3', name: '“兴农人”培训' }
        ]
    },
    {
        path: '/virtualSimulation',
        name: '虚仿中心',
        children: [
            { path: '/virtualSimulation?index=0', name: '粮油加工' },
            { path: '/virtualSimulation?index=1', name: '食品加工' },
            { path: '/virtualSimulation?index=2', name: '检验检测' },
            { path: '/virtualSimulation?index=3', name: '健康营养' }
        ]
    },
    {
        path: '/popularization',
        name: '粮心育人',
        children: [
            { path: '/popularization?index=0', name: '课程思政案例库' },
            { path: '/popularization?index=1', name: '双创教育案例库' }
        ]
    },
    {
        path: '/research',
        name: '粮韵文化馆',
        children: [
            { path: '/research?index=0', name: '“放心粮油”工程' },
            { path: '/research?index=1', name: '“五粮手作”展示' },
            { path: '/research?index=2', name: '“金色麦田”实践' },
            { path: '/research?index=3', name: '“沿黄美食”体验' }
        ]
    },
    { path: '/internationalExchange', name: '国际交流与合作' }
]);
const logout = async () => {
    logoutApi(token.value).then((res: any) => {
        if (res.code == 200) {
            (document.cookie =
                'token=;expires=Thu,01 Jan 1970 00:00:00 UTC;domain=.icve.com.cn;path=/;'),
                localStorage.clear();
            userInfo.value = undefined;
            token.value = '';
        }
    });
};
function goLogin() {
    window.open(
        `https://sso.icve.com.cn/sso/auth?mode=simple&source=14&redirect=${window.location.href}`,
        'noreferrer',
        'noopener'
    );
}
const goRegister = () => {
    window.open(
        `https://sso.icve.com.cn/sso/register?mode=simple&source=14&redirect=${window.location.href}`,
        'noreferrer',
        'noopener'
    );
};
function turnToPage(path: string) {
    if (path.includes('?')) {
        path = path + '&index=0';
    } else {
        path = path + '?index=0';
    }
    select(path);
    // router.push(path);
}
// 页面跳转
function select(MenuSelectEvent: any) {
    const { path } = route;
    let data = MenuSelectEvent.split('?');
    router.push(MenuSelectEvent);
    if (data[0] == path) {
        let page = path.slice(1);
        let index = data[1].slice(6);
        proxy.bus.emit(page + 'Reload', Number(index));
    }
}

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const userInfo = ref<any>(undefined);
const token = ref();
const toNext = () => {
    window.open('https://zyk.icve.com.cn/icve-admin/index', '_blank', 'noreferrer');
};
const logo = ref();

const linksList = ref()
onMounted(() => {

    getLink().then((res: any)=>{
        linksList.value = res.list
    })

    homeApi.projectInfo().then((res) => {
        logo.value = res.data.projectGroupInfo.projectLogo;
    });
    userInfo.value = JSON.parse(localStorage.getItem('userInfo') as string);

    let cookieToken = getCookie('token');
    if (!cookieToken) {
        return;
    }
    passLogin({
        token: cookieToken
    }).then((res: any) => {
        if (res.code !== 200) {
            return;
        }
        token.value = res.data.access_token;
        // localStorage.setItem("token", res.data.access_token)
        useUserStore().setToken(res.data.access_token);
        getUserInfo(res.data.access_token).then((res: any) => {
            localStorage.setItem('userInfo', JSON.stringify(res.user));
            userInfo.value = res.user;
        });
    });
});
</script>
<style scoped lang="scss">
.header {
    height: 79px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1291px;
    margin: auto;
    .header-left {
        display: flex;
        align-items: center;
        margin-right: 270px;
        .hearer-logo {
            width: 58px;
            height: 58px;
            margin-right: 7px;
        }

        .hearer-title {
            width: 642px;
            font-family: 'YouSheBiaoTiYuan';
            padding-top: 8px;
            .title {
                font-size: 34px;
                font-weight: 400;
                color: #0a7860;
                line-height: 24px;
            }

            .tips {
                font-size: 12px;
                font-weight: 400;
                letter-spacing: -0.4px;
                color: #0a7860;
            }
        }
    }
    .header-right {
        flex-shrink: 0;

        .hearer-user {
            display: flex;
            align-items: center;
            color: #0a7860;
            .user-img {
                background: #237ff0;
                margin-right: 8px;
                width: 32px;
                border-radius: 28px;
                height: 32px;
            }
            .icon{
                font-size: 20px;
            }
            .name {
                font-family: '思源黑体';
                font-size: 16px;
                cursor: pointer;
            }
            .el-divider--vertical {
                border-left: 1px #3d3d3d solid;
            }
            .login {
                margin-left: 5px;
            }
        }
    }
}
.tab-list {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: flex-end;
    background-color: #e4f4e9;
    .el-divider {
        border-left: 1px solid rgba(93, 93, 93, 1);
        margin: 4px 16px;
        height: 24px !important;
    }
    :deep(.el-menu) {
        background-color: #e4f4e9;
        width: 100%;
        border-bottom: none;
        justify-content: center;
        align-items: center;
        height: 56px !important;
        .el-menu-item,
        .el-sub-menu {
            position: relative;
            padding: 0 26px;
            height: 100%;
            > .el-sub-menu__title {
                padding: 0;
                color: #0a7860;
            }
        }
        .el-menu-item,
        .el-sub-menu__title {
            font-size: 16px;
            color: #0a7860;
            font-weight: bold;
            text-align: center;
            // &:hover {
            //     border-radius: 8px;
            //     outline: 0;
            //     color: var(--el-menu-hover-text-color);
            //     background-color: var(--el-menu-hover-bg-color);
            // }
        }

        .el-menu-item,
        .el-sub-menu {
            &:hover {
                background-color: #0a7860;
                color: #fff;
                > .el-sub-menu__title {
                    background-color: transparent;
                    color: #fff;
                }
            }
        }

        .el-sub-menu__title > div {
            font-weight: bold;
        }
        .el-sub-menu__icon-arrow {
            display: none;
        }
        .is-active {
            border-bottom: none;
            height: 56px !important;
            .el-sub-menu__title {
                border-bottom: none;
            }
            &::after {
                content: attr(data-content);
                height: 56px;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: #0a7860;
                color: #fff;
                font-size: 16px;
                text-align: center;
                line-height: 56px;
                font-weight: bold;
            }
        }
        .el-menu-item.is-active,
        .el-sub-menu.is-active .el-sub-menu__title {
            border-radius: 8px;
            font-weight: bold !important;
            // background: rgba(0, 140, 255, 1);
            // color: #fff !important;
        }
    }
}

.footer {
    width: 100%;
    font-size: 14px;
    background: black;
    overflow: hidden;
}

.top {
    display: flex;
    padding: 0 200px 20px;
}

.footer-inner {
    padding-top: 25px;
    margin: 0 auto;
    width: 100%;
    min-height: 175px;
    a {
        color: #969696;
        margin: 0 5px 0 5px;
        display: inline-block;
        text-decoration: none;
    }
    a:hover {
        color: #fff;
        text-decoration: none;
        background: none;
    }
    h3 {
        margin: 45px 200px;
        display: inline-block;
        font-size: 0;
        width: 230px;
        height: 50px;
        background: url("https://qun.icve.com.cn/portalproject/9tk7anmyrbcwaexr1n9tg/sta_page/img/layout_long_logo.5606b99c.5606b99c.png")
            no-repeat;
    }
    .footer-left {
        width: 40%;
        .ve-link {
            display: inline-block;
            width: 45%;
            height: 36px;
            line-height: 36px;
            margin: 0;
            margin-right: 1em;
        }
    }
    .footer-right {
        width: 60%;
        padding-top: 50px;
    }
    .footer-copyright {
        font-size: 12px;
        color: #969696;
        text-align: center;
        border-top: 1px solid #323232;
        clear: left;
        padding: 18px 0;
        p {
            display: inline-block;
            line-height: 1.25;
            margin: 0 40px 0;
        }
    }
    .copyright-ICP {
        vertical-align: middle;
    }
    .footer-text {
        padding-right: 6px;
        color: #fff;
        padding-top: 5px;
        text-align: center;
        min-height: 70px;
        overflow: hidden;

        p {
            margin: 0 auto;
            line-height: 30px;
            text-align: left;
        }
    }
}
</style>

<style lang="scss">
.layout-menu-popper .el-menu--popup {
    min-width: 113.99px;
    opacity: 1;
    .el-menu-item {
        justify-content: center;
        color: #0A7860 !important;
    }
    .is-active{
        background-color: #0A7860 !important;
        color: #fff !important;
    }
    .el-menu-item:hover{
        background-color: #0A7860 !important;
        color: #fff !important;
    }
}
</style>
