/*
 * @Author: ZHAO
 * @Date: 2024-01-10 16:42:49
 * @LastEditTime: 2024-11-18 16:24:41
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \dezhou-cereal\src\router\index.ts
 *
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import layout from '@/layout/index.vue';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL), // 添加这一段解决问题
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 };
    },
    routes: [
        {
            path: '/',
            redirect: 'home',
            component: layout,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('../views/HomeView.vue'),
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: '/professional',
                    name: 'professional',
                    component: () => import('../views/professional/index.vue'),
                    meta: {
                        title: '专业园地'
                    }
                },
                {
                    path: '/industry',
                    name: 'industry',
                    component: () => import('../views/industry/index.vue'),
                    meta: {
                        title: '行业园地'
                    }
                },
                {
                    path: '/course',
                    name: 'course',
                    component: () => import('../views/course/index.vue'),
                    meta: {
                        title: '课程中心'
                    }
                },
                {
                    path: '/sourceMaterial',
                    name: 'sourceMaterial',
                    component: () => import('../views/sourceMaterial/index.vue'),
                    meta: {
                        title: '素材中心'
                    }
                },
                {
                    path: '/trainingCenter',
                    name: 'trainingCenter',
                    component: () => import('../views/trainingCenter/index.vue'),
                    meta: {
                        title: '培训中心'
                    }
                },
                {
                    path: '/virtualSimulation',
                    name: 'virtualSimulation',
                    component: () => import('../views/virtualSimulation/index.vue'),
                    meta: {
                        title: '虚仿中心'
                    }
                },
                {
                    path: '/popularization',
                    name: 'popularization',
                    component: () => import('../views/popularization/index.vue'),
                    meta: {
                        title: '粮心育人'
                    }
                },
                {
                    path: '/research',
                    name: 'research',
                    component: () => import('../views/research/index.vue'),
                    meta: {
                        title: '粮韵文化馆'
                    }
                },
                {
                    path: '/internationalExchange',
                    name: 'internationalExchange',
                    component: () => import('../views/internationalExchange/index.vue'),
                    meta: {
                        title: '国际交流中心'
                    }
                },
                {
                    path: '/projectInfo',
                    name: 'projectInfo',
                    component: () => import('../views/projectInfo.vue'),
                    meta: {
                        title: '资源库简介'
                    }
                }
            ]
        }
    ]
});

export default router;
