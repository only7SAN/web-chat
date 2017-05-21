<template>
  <div class="chat-room" id="chat-room">
    <Header class="chat-header">
      <h1>web-chat聊天室{{userList}}</h1>
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
</template>

<script>
export default {
  sockets:{
    connect:function(){
      console.log(this.name + "已进入聊天室");
      this.$socket.emit('userMessage',{
        name:this.name
      });
    },
    chatMessage: function(data){
      console.log('this method is sending message');
      this.msgList.push(data);
    },
    userMessage: function(user){
      console.log(user)
      this.userList.push(user);
      console.log(this.userList);
    }
  },
  created:function(){
    console.log(this.name)
    if(this.name == ''){
      this.$router.push({path:'/'});
    }
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

.chat-room{
  position: absolute;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
}

.chat-header{
  position: relative;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: gray;
  color: white;
}

.chat-content{
  position: absolute;
  top:60px;
  left: 0px;
  bottom:60px;
  right: 0px;
  background-color: #f3f3f3;
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
}

.chat-input{
  display: table-cell;
  width: 80%;
  height: 60px;
  border:0px;
  line-height: 60px;
  font-size: 22px;
}

.chat-btn{
  display: table-cell;
  width: 20%;
  height: 60px;
  line-height: 60px;
  border:0px;
  color: #fff;
  background-color: gray;
  font-size: 22px;
}
</style>
