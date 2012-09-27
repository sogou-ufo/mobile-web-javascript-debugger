/**
 * 用于移动web开发javascript调试使用，提供日志打印，断点命令等功能，日志将打印到连接到sever【sever连接到mobile】的pc浏览器上
 * author: yangqianjun
 * 2012-09-26
 * */
(function() {
    // if already exist return
    if(window.umlog || !window.__token)return; 
    
    var send, chat;
    /**
     * 打log接口，将日志发送到服务器
     *
     * @method send
     * @param {Object} msg
     * */
    send = function(msgObj) {
        msgObj.token = window.__token;
        var msg = {};
        for(var i in msgObj) {
            if(msgObj[i] !== false)msg[i] = msgObj[i];  
        }
        chat && chat.emit('msg', msg);
    };
    /**
     * 通过prompt模拟断点，需要编译处理，因此该方法实际并不需要实现
     * 
     * @method umbp
     * */
    /**
     window.umbp = function() { 
    },
     ==> 编译成 tpl/bp.js 
     * */
    /**
     * 打log接口
     * 
     * @method umlog
     * @param {String | javascript表达式}
     * */
    window.umlog = function(msg) {
        var msgObj = {
            type: 'log',
            message: msg    
        };
        send(msgObj);
    },
    window.umerror =function(e) {
        var msg = {
            type: 'error',
            etype: e.type || false,
            name: e.name || false,
            lineno: e.lineno || false,
            filename: e.filename || false,
            message: e.message || false,
            cmd: e.cmd || false,
            input: e.input || false,
            timeStamp: e.timeStamp || false
        };
        send(msg);
    };

    // if error, catch it and send it so sever
    window.addEventListener('error', umerror); 

    // 和sever建立调试会话 
    chat = io.connect(__conf.debugSever + 'env');
    chat.on('connect', function () {
        // 调试会话建立
        send({
            type: 'log',
            message: '调试链接A-S已经建立'    
        });
    });
    // 接受广播
    chat.on('msg', function(data){
        // token不匹配
        if(data.token != window.__token)return;
        if(data.cmd) {
            try {
                eval(data.cmd);    
                window.umlog(data.cmd + '执行成功');
            } catch(e) {
                e.cmd = data.cmd;
                window.umerror(e);
            } 
        };
    });
})();
