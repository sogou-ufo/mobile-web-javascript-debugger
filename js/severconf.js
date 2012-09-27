var __conf = {
    debugSever: 'http://ufo.sogou-inc.com:8088/', // debug服务ip或者host，用于获取公用代码
    port: 8088, // debug服务运行端口号
    debugdir: './debug/' // 编译文件存放的目录，调试请使用debug目录下文件
};
try {
    exports && (exports.conf = __conf);
} catch (e){}

