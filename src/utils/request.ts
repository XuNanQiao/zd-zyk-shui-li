/*
 * @Author: ZHAO
 * @Date: 2024-01-12 16:32:20
 * @LastEditTime: 2024-10-15 14:47:13
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \Weifang-drone\src\utils\request.ts
 *
 */
import Cookies from 'js-cookie';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getTokenFromCookie, saveTokenToCookie } from '@/utils/cookie';
import { useUserStore } from '@/stores/user';

const service: any = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL as string, //接口统一域名
    timeout: 6000 //设置超时
});

// request拦截器
service.interceptors.request.use(
    (config) => {
       /*  config.headers = {
            'Content-Type': 'application/json;charset=UTF-8;',
            'x-access-token': getTokenFromCookie()
        }; */
    //     config.headers = {
    //       'Authorization': 'Bearer ' + useUserStore().getT
    //   };
        // console.log(config);

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (response.config.successMassage) {
            if (res.msg == 'success') {
                ElMessage.success('操作成功');
            } else {
                ElMessage.error(res.msg);
            }
        }
        if (response.config.errorMassage && res.msg != 'success') {
            ElMessage.error(res.msg);
        }
        return response.data;
    },
    (error) => {
        /* Message({
      message: '服务器调用错误',
      type: 'error',
      duration: 5 * 1000
    }) */
        console.log('服务器调用错误');
        return Promise.reject(error);
    }
);
export default service;
