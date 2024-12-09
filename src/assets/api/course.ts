/*
 * @Author: JIANG
 * @Date: 2024-11-18 10:35:15
 * @LastEditTime: 2024-11-25 16:25:27
 * @LastEditors: JIANG
 * @Description: 
 * @FilePath: \dezhou-cereal\src\assets\api\course.ts
 * 
 */
import request from '@/utils/request';

export const passLogin = (params: any) => {
    return request({
        url: `/website/course/course/list/courseWeb`,
		method: 'get',
        params,
    });
};