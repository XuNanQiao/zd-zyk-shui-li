/*
 * @Author: ZHAO
 * @Date: 2024-01-12 16:33:21
 * @LastEditTime: 2024-11-19 17:13:36
 * @LastEditors: JIANG
 * @Description:
 * @FilePath: \dezhou-cereal\src\assets\api\professionalApi.ts
 *
 */
import request from '@/utils/request';
export class ProfessionalApi {
    /**专业园地
     * tags
     * pageSize
     * page
     * orders
     * array_media
     * array_application
     */
    async newmaterialMaterial(search: any) {
        let projectId = import.meta.env.VITE_APP_PROJECTID;
        let requestData: any = await request({
            url: '/portalProject/ajax-newmaterial-material',
            method: 'GET',
            params: { projectId, ...search }
        });
        return requestData;
  }
    /**媒体类型:
     * pageSize
     * page
     */
    async sysMediaTypePageList() {
        let requestData: any = await request({
            url: '/prod-api/system/basicSettings/sysMediaType/sysMediaTypePageList',
            method: 'POST',
            data: { pageNum: 1, pageSize: 9999, state: 0 }
        });
        return requestData;
    }
    /**应用分类:
     * pageSize
     * page
     */
    async sysApplyTypePageList() {
        let requestData: any = await request({
            url: '/prod-api/system/basicSettings/sysApplyType/sysApplyTypePageList',
            method: 'POST',
            data: { pageNum: 1, pageSize: 9999, state: 0 }
        });
        return requestData;
    }
 
}
