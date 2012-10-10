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
        // html file
        if(content.indexOf('<!--umdebug-->') != -1) {
            // 对内联js进行打包
            content = content.replace(/<script[^>]*[^<]*<\/script>/g, function(str) {
                var bg = str.split('>');
                if(bg[0].indexOf(' src=') != -1)return str; 
                var bh = bg[0];
                bg = bg.slice(1);
                return bh + '>try{' + bg.join('>').replace(/<\/script>$/g, '') + '}catch(e){window.umerror(e)};</script>' 
            });
            content = content.replace(/<!--umdebug-->/g, dbhtml);
        } else {
        // js file，许多手机浏览器遇到错误会终止执行，因此需要用try catch对代码进行打包
            content = 'try{' + content + '}catch(e){window.umerror(e)};'
        }
        // 替换文件引入
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

