/*
 * @Author: ZHAO
 * @Date: 2026-07-01 11:28:11
 * @LastEditTime: 2026-07-01 11:28:21
 * @LastEditors: ZHAO
 * @Description: 
 * @FilePath: \zd-zyk-shui-li\src\utils\responsive.ts
 * 
 */
/**
 * 响应式工具函数
 */

// 窗口宽度断点
export const MOBILE_BREAKPOINT = 768
export const TABLET_BREAKPOINT = 1024
export const PC_BREAKPOINT = 1291

/**
 * 判断是否为移动端
 */
export const isMobile = (): boolean => {
    return window.innerWidth <= MOBILE_BREAKPOINT
}

/**
 * 判断是否为平板设备
 */
export const isTablet = (): boolean => {
    return window.innerWidth > MOBILE_BREAKPOINT && window.innerWidth <= TABLET_BREAKPOINT
}

/**
 * 判断是否为PC端
 */
export const isDesktop = (): boolean => {
    return window.innerWidth > TABLET_BREAKPOINT
}

/**
 * 获取当前设备类型
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    if (isMobile()) return 'mobile'
    if (isTablet()) return 'tablet'
    return 'desktop'
}

/**
 * 响应式rem初始化
 */
export const initRem = () => {
    // 设置根字体大小
    const setRootFontSize = () => {
        const width = document.documentElement.clientWidth || window.innerWidth
        // 基于PC端设计稿1291px，移动端适配375px
        const designWidth = width <= MOBILE_BREAKPOINT ? 375 : 1291
        const html = document.documentElement
        html.style.fontSize = (width / designWidth) * 100 + 'px'
    }

    setRootFontSize()
    window.addEventListener('resize', setRootFontSize)
    window.addEventListener('orientationchange', setRootFontSize)
}

/**
 * 防抖函数
 */
export const debounce = (fn: Function, delay: number = 300) => {
    let timer: any = null
    return function (this: any, ...args: any[]) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}