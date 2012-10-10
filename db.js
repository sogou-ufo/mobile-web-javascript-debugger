var severconf = require(__dirname + '/js/severconf.js').conf
    , conf = require('./conf.js').conf
    , fs = require('fs');
var bp = fs.readFileSync(__dirname + '/tpl/bp.js', 'UTF8'); 
var ucmd = fs.readFileSync('./ucmd.js', 'UTF8');
var dbhtml = fs.readFileSync(__dirname + '/tpl/load.html', 'UTF8').replace(/#debugSever#/g, severconf.debugSever.replace(/\/$/g, '')).replace(/#token#/g, conf.token).replace(/#ucmd#/g, ucmd);

function recursionDir(dir) {
    var parDir = dir.replace(/\/$/g, '') + '/', dir = fs.readdirSync(dir); 
    dir.forEach(function(item){
        if(fs.statSync(parDir + item).isDirectory()){
            recursionDir(parDir + item);    
        } else if(fs.statSync(parDir + item).isFile()){
            build(parDir + item);   
        } 
    });
};

function build(fileName) {
    var content = fs.readFileSync(fileName, 'UTF8');   
    if(content.indexOf('/**umlog(') != -1 || content.indexOf('/**umbp(') != -1 || content.indexOf('<!--umdebug-->') != -1) {
        // 替换日志
        content = content.replace(/(\/\*\*)(umlog\([^\)]*\))[^*]*(\*\*\/)/g,function(str) {
            return str.replace(/(^\/\*\*)umlog\(([^\)]*)\)[^*]*/g, 'umlog("$2 is: " + ($2))').replace(/([;]?\*\*\/$)/g, ';')    
        });
        // 替换断点
        content = content.replace(/(\/\*\*)(umbp\([^\)]*\))[^*]*(\*\*\/)/g, bp);
        // 替换文件引入
        content = content.replace(/<!--umdebug-->/g, dbhtml);
        fs.writeFileSync(fileName, content, 'UTF8'); 
    }
};

if(conf.files.length) {
    conf.files.forEach(function(index, item) {
        build(item);
    });    
} else if(conf.dir) {
    recursionDir(conf.dir);
}

