/*
 * @Author: ZHAO
 * @Date: 2024-01-12 16:33:21
 * @LastEditTime: 2024-03-25 18:27:21
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \simulationUser\src\assets\api\login.ts
 *
 */
import request from "@/utils/request";
export class LoginApi {
 /*** 获取验证码*/
 async getCaptcha() {
  let requestData: any = await request({
   url: "/login/getCaptcha",
   method: "get",
  });
  return requestData;
 }
 /**
  * 登录
  * @param param
  */
 async login(param) {
  let requestData: any = await request({
   url: "/login",
   method: "post",
   errorMassage: true,
   data: param,
  });
  return requestData;
 }
 /**
  * 用户信息
  * @param param
  */
 async getLoginInfo() {
  let requestData: any = await request({
   url: "/login/getLoginInfo",
   method: "get",
  });
  return requestData;
 }
 /**
  * 退出登录
  * @param param
  */
 async logout() {
  return request({
   url: "/auth/logout",
   method: "get",
  });
 } 
}
