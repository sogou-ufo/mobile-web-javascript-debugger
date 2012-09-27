umlog('nihao');
(function() {
    var e, tmp = prompt('请输入指令：') || '', cmd; 
    if(tmp = tmp.trim()) {
        if(tmp.indexOf('@') != -1) {
            if((tmp = tmp.replace(/^@/g,'')) && (cmd = window.ucmd[tmp])) {
            } else {
                e ={
                    type: 'error',
                    message: tmp + ' is not found in ucmd' 
                };     
            }
        } else {
            cmd = tmp;    
        }
        try {
            if(cmd.split) {
                eval(cmd);    
            } else {
                cmd && cmd();    
            }
            window.umlog(cmd + '执行成功');
        }catch(e) {
            var e = e;
        } 
        e && (e.cmd = cmd || tmp) && (e.input = tmp) && window.umerror(e);
    }
})();

umlog('nihao');
(function() {
    var e, tmp = prompt('请输入指令：') || '', cmd; 
    if(tmp = tmp.trim()) {
        if(tmp.indexOf('@') != -1) {
            if((tmp = tmp.replace(/^@/g,'')) && (cmd = window.ucmd[tmp])) {
            } else {
                e ={
                    type: 'error',
                    message: tmp + ' is not found in ucmd' 
                };     
            }
        } else {
            cmd = tmp;    
        }
        try {
            if(cmd.split) {
                eval(cmd);    
            } else {
                cmd && cmd();    
            }
            window.umlog(cmd + '执行成功');
        }catch(e) {
            var e = e;
        } 
        e && (e.cmd = cmd || tmp) && (e.input = tmp) && window.umerror(e);
    }
})();

