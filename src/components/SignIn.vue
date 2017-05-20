<template>
  <div class="sign-in" id="sign-in">
    <Header class="sign-in-header">
      <h1 class="sign-in-header-h1">web-chat通行证</h1>
    </Header>
    <div class="sign-in-form">
      <div class="sign-in-form-title">Name</div>
      <input class="sign-in-input" placeholder="your name" v-model="name"></input>
      <button class="sign-in-btn" v-on:click.stop.prevent="submit">Sign In</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
          return{
              name:""
          }
      },
  methods:{
    submit:function(e){
      if(this.name !== ''){
        console.log(JSON.stringify(this.name));
        sessionStorage.setItem("name",JSON.stringify(this.name));
        this.$router.push({ path: '/chatroom' });
      }else{
        alert("名字输入不能为空");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sign-in{
  position: relative;
  overflow: hidden;
}

.sign-in-header{
  display: block;
  margin:40px 20px;
  text-align: center;
  color: #5199c7;
}

.sign-in-form{
  position: relative;
  margin:0 auto;
  width: 400px;
  border:2px solid #b1b1b1;
  background-color: #f5f5f5;
  color: gray;
  text-align: center;
  overflow: hidden;
  border-radius: 20px;
}

.sign-in-form-title{
  margin:20px;
  font-size: 28px;
  color:#40adca;
}

.sign-in-input{
  display: block;
  width: 300px;
  margin:20px auto;
  border:2px solid #cacacc;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  text-align: center;
}

.sign-in-btn{
  display: block;
  width: 80px;
  height: 40px;
  margin:20px auto;
  border:0px;
  line-height: 40px;
  background-color: skyblue;
  border-radius: 10px;
  font-size: 18px;
  color: #fff;
}
</style>