/*
 * @Author: ZHAO
 * @Date: 2024-01-12 16:33:21
 * @LastEditTime: 2024-11-25 16:30:15
 * @LastEditors: JIANG
 * @Description:
 * @FilePath: \dezhou-cereal\src\assets\api\home.ts
 *
 */
import request from '@/utils/request';
export class HomeApi {
    /**登录后的前台首页
  * @name 搜索关键词
  * @categoryId 实验类别id
  * @pageNum   
  * @pageSize 
  * @type  "2",
  * @employeeId  人员id
  * @departmentId  人员组织id
 
  */
    async queryPageLogOn(params: any) {
        let requestData: any = await request({
            url: '/prod-api/simulationExperimen/queryPageLogOn',
            method: 'post',
            data: params
        });
        return requestData;
    }

    /**
     * 课程列表
     * @param params
     * @param pageNum 页码
     * @param pageSize 每页条数
     * @param majorId 主ID
     * @param courseType 课程类型
     * @param educationType 课程类型
     * @returns
     */
    async getCourseList(params: any) {
        let projectGroupId = import.meta.env.VITE_APP_PROJECTID;
        let requestData: any = await request({
            url: '/prod-api/website/course/course/list/project/courseWeb',
            method: 'get',
            params: {
                projectGroupId,
                ...params
            }
        });
        return requestData;
    }
    async getCourseList2(params: any) {
        let projectId  = import.meta.env.VITE_APP_PROJECTID;
        let requestData: any = await request({
            url: '/portalProject/ajax-course-getCourse',
            method: 'get',
            params: {
                projectId ,
                ...params
            }
        });
        return requestData;
    }
    async getCourseList3(params: any) {
        let projectGroupId  = import.meta.env.VITE_APP_PROJECTID;
        let requestData: any = await request({
            url: '/prod-api/website/course/list',
            method: 'get',
            params: {
                projectGroupId ,
                ...params
            }
        });
        return requestData;
    }
    /**资源库简介 */
    async projectGroupInfo() {
        let requestData: any = await request({
            url: '/prod-api/website/projectGroupInfo/detail/info?shortUrl=dzlsgc',
            method: 'GET'
        });
        return requestData;
    }
    /**信息统计 */
    async statisticsAllInfo() {
        let id = import.meta.env.VITE_APP_PROJECTID;
        console.log(id);

        let requestData: any = await request({
            url: '/prod-api/website/projectGroupInfo/projectStatistics/statisticsAllInfo',
            method: 'GET',
            params: { projectId: id }
        });
        return requestData;
    }
    /**知识图谱 */
    async knowledge() {
        let id = import.meta.env.VITE_APP_PROJECTID;
        let requestData: any = await request({
            url: '/prod-api/graph/knowledge/list',
            method: 'post',
            data: { proId: id }
        });
        return requestData;
    }
    /**
     * 项目信息
     */
    async projectInfo() {
        return await request({
            url: '/prod-api/website/projectGroupInfo/detail/info?shortUrl=dzlsgc',
            method: 'GET'
        });
    }
}
