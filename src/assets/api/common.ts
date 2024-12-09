/*
 * @Author: JIANG
 * @Date: 2024-10-17 16:52:51
 * @LastEditTime: 2024-11-13 14:40:08
 * @LastEditors: JIANG
 * @Description:
 * @FilePath: \weifang-drone\src\assets\api\common.ts
 *
 */
import request from '@/utils/request';

export const passLogin = (params: any) => {
    return request({
        url: `/prod-api/auth/passLogin`,
        params
    });
};

export const logoutApi = (token: any) => {
    return request({
        url: `/prod-api/auth/logout`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache'
        }
    });
};

export const getUserInfo = (token: string) => {
    return request({
        url: `/prod-api/system/user/getInfo`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

/**
 * 获取知识树数据
 * @param projectId 项目ID
 * @param nodeId 所要查询节点Id
 * @returns
 */
export const ztreeAll = (params: any) => {
    let projectId = import.meta.env.VITE_APP_PROJECTID;
    return request({
        url: `/portalProject/ajax-newmaterial-ztreeAll`,
        method: 'GET',
        params: {
            projectId,
            ...params
        }
    });
};

/**
 * 获取新闻列表
 * @param projectId 项目ID
 * @param typeId 所要查询节点Id
 * @returns
 */
export const getNewsList = (params: any) => {
    let projectId = import.meta.env.VITE_APP_PROJECTID;
    return request({
        url: `/portalProject/ajax-portalproject-getNewsList`,
        method: 'GET',
        params: {
            projectId,
            ...params
        }
    });
};

// 获取友情链接
export const getLink = () => {
    let projectId = import.meta.env.VITE_APP_PROJECTID;
    return request({
        url: `/portalProject/ajax-portalpoject-getLink`,
        params: {
            projectId,
        }
    });
};