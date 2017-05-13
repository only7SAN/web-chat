<template>
  <div class="hello">
    <h1>web-chat聊天室</h1>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
  const socket = require('socket.io-client')('http://localhost:8080');

  const say = () => {
    console.log('aacc');
  };
  socket.on('connect', say);
  socket.on('chat message', say);
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
</style>
