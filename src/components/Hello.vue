<template>
  <div class="chat-room" id="chat-room">
    <Header class="chat-header">
      <h1>web-chat聊天室</h1>
    </Header>
    <div class="chat-content">
      <ul v-if="msgList !== []">
        <li v-for="msg in msgList">
          {{ msg }}
        </li>
      </ul>
    </div>
    <div class="chat-form">
      <input class="chat-input" placeholder="请输入聊天内容" v-model="message"></input>
      <button class="chat-btn" v-on:click="submit">发送</button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  const socket = require('socket.io-client')('http://localhost:8080');

  const say = () => {
    console.log('已连接至聊天室');
  };
  socket.on('connect', say);

  export default {
    data(){
            return{
                message:'app',
                msgList:['789']
            }
        },
    created:function(){
      console.log("created")
    },
    mouted:function(){
      console.log("mouted")
    },
    updated:function(){
      
      console.log("updated")
    },
    destroyed:function(){
      console.log("destoryed")
    },
    watch: {
    },
    methods:{
      submit:function(e){
        socket.emit('chat message', this.message);
        this.message = '';
        socket.on('chat message', (msg) => {
                    this.msgList.push(msg);
                    console.log(this.msgList)
                    console.log(msg)
                  });
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
