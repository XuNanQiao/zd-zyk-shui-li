export default {
    plugins: {
      "postcss-pxtorem": {
        "rootValue": 512, // 设计稿宽度的1/3.75，代表 1rem=100px（设置100，是为了适配几年前开发的页面，对应/src/utils/rem.js）
        "propList": ["*"], // 需要做转化处理的css属性  * 就是所有属性都要转换，如`hight`、`width`、`margin`等，`*`表示全部
      }
    }
  }