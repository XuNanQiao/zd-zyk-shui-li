/*
 * @Author: ZHAO
 * @Date: 2024-02-03 11:35:21
 * @LastEditTime: 2024-02-27 17:56:04
 * @LastEditors: 南桥几许
 * @Description:
 * @FilePath: \simulationUser\src\typings\data.d.ts
 *
 */
/// <reference types="vite/client" />
declare module "*.vue" {
 import { DefineComponent } from "vue";
 const component: DefineComponent<object, object, any>;
 export default component;
}
declare module "js-cookie";
