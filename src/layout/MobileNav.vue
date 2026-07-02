<!--
 * @Author: ZHAO
 * @Date: 2024-01-12 16:39:21
 * @LastEditTime: 2026-07-01 11:29:07
 * @LastEditors: ZHAO
 * @Description: 移动端底部导航栏
 * @FilePath: \zd-zyk-shui-li\src\layout\MobileNav.vue
 * 
 -->
<template>
    <div class="mobile-nav" v-if="isMobile">
        <div 
            class="nav-item" 
            v-for="item in mobileMenuList" 
            :key="item.path"
            :class="{ 'active': currentPath === item.path }"
            @click="goToPage(item.path)"
        >
            <el-icon class="nav-icon">
                <component :is="item.icon" />
            </el-icon>
            <span class="nav-text">{{ item.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
    HomeFilled,
    Menu as MenuIcon,
    Search,
    VideoPlay,
    UserFilled
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const currentPath = computed(() => {
    return route.path
})

const isMobile = computed(() => {
    return window.innerWidth <= 768
})

const mobileMenuList = ref([
    {
        path: '/home',
        name: '首页',
        icon: HomeFilled
    },
    {
        path: '/course?index=0',
        name: '课程',
        icon: VideoPlay
    },
    {
        path: '/search',
        name: '搜索',
        icon: Search
    },
    {
        path: '/sourceMaterial',
        name: '素材',
        icon: MenuIcon
    },
    {
        path: '/profile',
        name: '我的',
        icon: UserFilled
    }
])

const goToPage = (path: string) => {
    if (path === '/search') {
        router.push('/search')
    } else {
        router.push(path)
    }
}
</script>

<style scoped lang="scss">
.mobile-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    padding-bottom: env(safe-area-inset-bottom);
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s ease;

    .nav-icon {
        font-size: 24px;
        color: #999;
        margin-bottom: 2px;
    }

    .nav-text {
        font-size: 12px;
        color: #999;
    }

    &.active {
        .nav-icon {
            color: #2E90FA;
        }

        .nav-text {
            color: #2E90FA;
            font-weight: bold;
        }
    }
}
</style>