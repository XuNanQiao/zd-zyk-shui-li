/*
 * @Author: ZHAO
 * @Date: 2024-02-23 11:55:54
 * @LastEditTime: 2024-02-23 11:56:11
 * @LastEditors: 南桥几许
 * @Description: 
 * @FilePath: \simulationUser\src\utils\local-util.ts
 * 
 */
export const localSave = (key, value) => {
 localStorage.setItem(key, value);
};

export const localRead = (key) => {
 return localStorage.getItem(key) || "";
};

export const localClear = () => {
 localStorage.clear();
};
