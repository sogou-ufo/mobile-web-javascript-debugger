var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , conf = require(__dirname + '/js/severconf.js').conf;

server.listen(conf.port || 8088);

// 访问页面
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/b.html');
});

// gey umobile.js
app.get('/umobile', function (req, res) {
    res.sendfile(__dirname + '/js/umobile.js');
});

// gey severconf.js
app.get('/severconf', function (req, res) {
    res.sendfile(__dirname + '/js/severconf.js');
});

var mobileEnv, pcView;

/**
 * mobile和sever的连接
 * ssever接收到msg，转发给pc 
 *
 * */
mobileEnv = io.of('/env').on('connection', function(socket) {
    socket.on('msg', function(data) {
        // 将token和socket绑定
        socket.set('token', data.token);
        // 广播转发给pc
        pcView && pcView.emit('msg', data);    
    });
    // mobie和sever对话断开
    socket.on('disconnect', function(){
        socket.get('token',function(err, token){
            if(err)return;
            pcView && pcView.emit('msg', {
                token: token,
                type: 'system',
                message: '调试链接A-S已经断开' 
            });
        }); 
    });
});

/**
 * pv和sever的连接
 * pc和sever采用多对一，sever对pc进行广播，所有来自mobile的消息都广播至pc
 * */
pcView = io.of('/view').on('connection', function(socket) {
    socket.on('msg', function(data) {
        // pc需要通过sever让mobile直行某段命令  
        mobileEnv && mobileEnv.emit('msg', data);
    }); 
});
