mobile-web-javascript-debugger
==============================

基于手机端&lt;=>服务器&lt;=>PC端结构的mobile javascript调试工具

原理：

依赖nodejs & socket.io，实现手机、服务器和PC端实时通信，解决在手机小屏幕上调试打印日志不方便的问题

debug的时候，工具会将包含特殊注释语法的源文件编译成可以打印日志、断点执行命令、捕获代码错误的目标代码【日志及执行结果将在PC端展示出来，而不用困扰手机屏幕过小的问题】

打印日志通过将语句执行结果发送到服务器，服务器广播到PC实现

断点通过prompt方法实现，可以通过输入javascript语句或者@hash形式的特殊语法调用预先存储的命令，执行完毕，成功或错误都会发送日志到服务器，并进行广播

错误捕获通过window error事件实现

使用：

下载，将文件解压到任意文件夹

修改./js/目录下的severconf.js，配置debugSever以及端口等信息，执行 node sever.js 将启动一个sever服务，负责转发mobile和pc间的消息

拷贝tpl/ucmd.js和tpl/conf.js到项目目录，配置conf.js，配置需要编译的文件或者目录以及token种子[token种子用于生成标识会话的uid]，注意工具会直接修改文件和目录，因为建议新建一个debug目录，专门用于debug调试

修改需要调试的页面，在尽可能前的地方，加入 <!--umdebug--> [工具的特殊语法都是通过注释实现，因此不用纠结调试会污染你的代码，最终编译压缩后，这些注释语法都会被压缩掉]

修改需要调试的代码，注释语法：

/\*\*umlog(exp)\*\*/ ---- 打印exp的值，并在pc端显示出来

/\*\*umbp()\*\*/     ---- 在该处断点，会弹出一个prompt窗口，可以直接输入语句或者@hash[在ucmd.js文件内配置的键值对]以在断点处执行特殊的命令

在项目目录下执行node db.js对源代码进行编译处理

通过手机访问执行debug目录代码

pc访问severconf.js内配置的debugSever[映射至b.html]，实时显示来至mobile端的日志和错误信息，在pc端，可以通过 send(会话guid, cmd)向手机发送执行命令



