// debug 编译配置
// 代码debug之前需要做编译
var __conf = {
    dir: '/search/yangqianjun/public_html/mobiledebugger/debug/', // dir to debug, debug前请把需要debug的文件拷贝到该目录，请备份好源文件 
    files: [], // 需要debug的文件，此参数是为了提升编译效率，此参数有效的情况下，将忽略dir参数
    token: 'absbsbsbbs' , // token种子，配置
    end: 0
};

exports.conf = __conf;
