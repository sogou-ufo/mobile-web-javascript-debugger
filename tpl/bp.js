(function() {
    var u__e, u__tmp = prompt('请输入指令：') || '', u__cmd; 
    if(u__tmp = u__tmp.trim()) {
        if(u__tmp.indexOf('@') != -1) {
            if((u__tmp = u__tmp.replace(/^@/g,'')) && (u__cmd = window.ucmd[u__tmp])) {
            } else {
                u__e ={
                    type: 'error',
                    message: u__tmp + ' is not found in ucmd' 
                };     
            }
        } else {
            u__cmd = u__tmp;    
        }
        try {
            if(u__cmd.split) {
                eval(u__cmd);    
            } else {
                u__cmd && u__cmd();    
            }
            window.umlog(u__cmd + '执行成功');
        }catch(e) {
            var u__e = e;
        } 
        u__e && (u__e.cmd = u__cmd || u__tmp) && (u__e.input = u__tmp) && window.umerror(u__e);
    }
})();
