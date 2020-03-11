"use strict";

/*
 * 环境列表，第一个环境为默认环境
 * envName: 指明现在使用的环境
 * dirName: 打包的路径，只在build的时候有用
 * baseUrl: 这个环境下面的api 请求的域名
 * assetsPublicPath: 静态资源存放的域名，未指定则使用相对路径
 * */
const ENV_LIST = [
  {
    //本地环境
    envName: "Local",
    baseUrl: "http://localhost:3000",
    assetsPublicPath: "/"
  }
];

//获取环境，即--mode后的环境
const HOST_ENV = process.env.NODE_ENV;
//没有设置环境，则默认为第一个
const HOST_CONF = HOST_ENV
  ? ENV_LIST.find(item => item.envName === HOST_ENV)
  : ENV_LIST[0];

module.exports = HOST_CONF;
