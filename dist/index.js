var socket;
var msgSpan = document.getElementById('msgSpan');
var app = new Vue({
  el: '#content',
  data: {
    title: 'Socket IO 聊天室!',
    persons:[
    ],
    chatdata:'',
    msg:'',
    username:''
  },
  methods:{
  		addMsg:function(msg){
  			this.msg+='<p>'+msg+'</p>';
  		},
  		login:function(){
  				if(this.username==''){
  					alert("请输入用户名");
  					return;
  				}
  			socket = io();
  			this.addMsg("正在建立连接……");
  			socket.on('connect',function(){
  					console.log("已经建立连接");
  				  document.getElementById('msgSpan').innerHTML +='<p>聊天服务器连接建立成功</p>';
  				  socket.emit('add user', app.username);
  				  socket.on('login',function(name){
					  	console.log("收到服务端的login广播");
					  	document.getElementById('msgSpan').innerHTML +='<p>欢迎用户'+name+'进入聊天室</p>';	
				  	});
  				  socket.on('send clients',function(names){
									console.log("返回用户列表信息"+names);
								app.persons=names;
							});
						socket.on('chat',function(data){
								 document.getElementById('msgSpan').innerHTML +='<p>'+data.username+"说："+data.msg+'</p>';
							});
  				});
  			},
  		sendDta:function(){
  			console.log("发送消息");
  				socket.emit('chat', {username:this.username,msg:this.chatdata});
  		}
  		
  }
});