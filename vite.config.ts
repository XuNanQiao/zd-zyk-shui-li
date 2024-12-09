/*
 * @Author: ZHAO
 * @Date: 2024-01-10 16:42:49
 * @LastEditTime: 2024-11-13 11:43:53
 * @LastEditors: JIANG
 * @Description:
 * @FilePath: \weifang-drone\vite.config.ts
 *
 */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // 服务端渲染
    server: {
        host: '0.0.0.0',
        port: 5173
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'js/[name]-[hash].js', // js入口文件配置，仅仅入口文件不包括分包及懒加载的js [name][hash]占位符 [ext]后缀
                chunkFileNames: 'js/[name]-[hash].js', // 打包后每个chunk的文件名
                // assetFileNames: "assets/[name]-[hash].[ext]" // 打包后每个资源文件的文件名 可以传入字符串（静态资源均在assets中包括css svg等） 可传入函数
                assetFileNames(assetInfo) {
                    // 自定义资源文件的命名
                    if (assetInfo.name?.endsWith('css')) {
                        return `css/[name]-[hash][extname]`;
                    }
                    // 定义图片后缀
                    const imgExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
                    if (imgExts.some((imgExt) => assetInfo.name?.endsWith(imgExt))) {
                        return `img/[name]-[hash][extname]`;
                    }
                    const fontExts = ['.ttf', '.otf', '.ttc'];
                    if (fontExts.some((imgExt) => assetInfo.name?.endsWith(imgExt))) {
                        return `fonts/[name]-[hash][extname]`;
                    }
                    return `assets/[name]-[hash][extname]`;
                }
            }
        }
    }
});
