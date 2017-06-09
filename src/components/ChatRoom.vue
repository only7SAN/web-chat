<template>
  <div class="chat-page" id="chat-page">
    <div class="chat-room" id="chat-room">
      <Header class="chat-header">
        <h1>web-chat聊天室</h1>
      </Header>
      <div class="chat-content">
        <ul class="chat-msg-ul" v-if="msgList !== []">
          <li class="chat-msg-li" v-for="msg in msgList">
            <div class="chat-msg-box" v-bind:class="{active:msg.name==name }">
              <span class="chat-msg-name">{{ msg.name }}:</span>
              <span class="chat-msg-p">{{ msg.message }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="chat-form">
        <input class="chat-input" placeholder="请输入聊天内容" v-model="message"></input>
        <button class="chat-btn" v-on:click.stop.prevent="submit">发送</button>
      </div>
    </div>
    <div class="user-list">{{ userList }}</div>
  </div>
</template>

<script>
export default {
  sockets:{
    connect:function(){
      console.log(this.name + "已进入聊天室");
    },
    chatMessage: function(data){
      console.log('this method is sending message');
      this.msgList.push(data);
    },
    userSignIn: function(userList){
      this.userList = userList.userList;
    },
    userSignOut:function(){
      ths.userList = userList.userList;
    },
    disconnect:function(){
      console.log(this.name + "离开了聊天室");
    }
  },
  created:function(){
    if(this.name == ''){
      this.$router.push({path:'/'});
    }
    this.$socket.emit('userSignIn',{
        name:this.name
      });
  },
  ready:() => {
    console.log(this.userList);
  },
  data(){
          return{
              message:'',
              msgList:[],
              userList:[],
              name:JSON.parse(sessionStorage.getItem("name"))
          }
      },
  methods:{
    submit:function(e){
      console.log(this.name)
      this.$socket.emit('chatMessage',{
        name:this.name,
        message:this.message
      });
      this.message = '';
      return false;
    }
  },
  destroyed:() =>{
    this.$socket.emit('userSignOut',{
      name:this.name
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.chat-page{
  position: absolute;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
}

.chat-room{
  position: relative;
  width: 800px;
  height: 560px;
  margin: 40px auto 0 auto;
  border-radius: 30px;
  border:2px solid #5199c7;
}

.chat-header{
  position: relative;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-bottom: 2px solid #5199c7;
  border-radius: 30px;
  border-bottom-right-radius: #5199c7;
  border-bottom-left-radius: #5199c7;
  color: gray;
}

.chat-content{
  position: absolute;
  top:60px;
  left: 0px;
  bottom: 60px;
  right: 0px;
  color: black;
}

.chat-msg-ul{
  overflow: hidden;
}

.chat-msg-li{
  display: block;
  padding:10px 20px;
  line-height: 20px;
  overflow: hidden;
}

.active{
}

.chat-msg-p{
  padding: 5px 10px;
  border:1px solid gray;
}

.chat-form{
  position: absolute;
  display: table;
  left: 0px;
  bottom: 0px;
  height: 60px;
  width: 100%;
  vertical-align: middle;
  border:0px;
  border-top: 2px solid #5199c7;
  border-radius: 30px;
}

.chat-input{
  display: table-cell;
  width: 80%;
  height: 60px;
  border:0px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  line-height: 60px;
  text-align: center;
  font-size: 22px;
  outline-style: none;
}

.chat-btn{
  display: table-cell;
  width: 20%;
  height: 60px;
  line-height: 60px;
  border:0px;
  color: #5199c7;
  border-left:2px solid #5199c7;
  background-color: rgba(255,255,255,0);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  font-size: 22px;
  outline-style: none;
}
</style>
