/*
 * 登录用户
 *
 * @Author:    1024创新实验室-主任：卓大
 * @Date:      2022-09-06 20:55:09
 * @Wechat:    zhuda1024
 * @Email:     lab1024@163.com
 * @Copyright  1024创新实验室 （ https://1024lab.net ），Since 2012
 */
import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { getTokenFromCookie, saveTokenToCookie } from "@/utils/cookie";

export const useUserStore = defineStore({
 id: "userStore",
 state: () => ({
  token: localStorage.getItem("token"),
  userInfo: {},
  userId: "",
  employeeId: "",
  sculpture: "",
  loginName: "",
  actualName: "",
  type: "",
  phone: "",
  departmentId: "",
  departmentName: "",
  administratorFlag: "",
  lastLoginIp: "",
  lastLoginUserAgent: "",
  lastLoginTime: "",
 }),
 getters: {
  getToken(state) {
   if (state.token) {
    return state.token;
   }
   return getTokenFromCookie();
  },
  getT(state) {
    return state.token
  }
 },

 actions: {
  logout() {
   this.token = "";
   this.employeeId = "";
   this.loginName = "";
   this.actualName = "";
   this.phone = "";
   this.type = "";
   this.departmentId = "";
   this.departmentName = "";
   this.administratorFlag = "";
   this.lastLoginIp = "";
   this.lastLoginUserAgent = "";
   this.lastLoginTime = "";
   this.userId = "";
  },
  //设置登录信息
  setUserLoginInfo(data: any) {
   saveTokenToCookie(data.token);
   // 用户基本信息
   this.token = data.token;
   this.userId = data.userId;
   this.employeeId = data.employeeId;
   this.sculpture = data.sculpture;
   this.loginName = data.loginName;
   this.actualName = data.actualName;
   this.phone = data.phone;
   this.type = data.type;
   this.departmentId = data.departmentId;
   this.departmentName = data.departmentName;
   this.administratorFlag = data.administratorFlag;
   this.lastLoginIp = data.lastLoginIp;
   this.lastLoginUserAgent = data.lastLoginUserAgent;
   this.lastLoginTime = data.lastLoginTime;
  },
  setToken(token: string) {
   this.token = token;
   localStorage.setItem('token', token)
//    saveTokenToCookie(token);
  },
 },
});
