import Vue from 'vue';
import Router from 'vue-router';
import ChatRoom from '@/components/ChatRoom';
import SignIn from '@/components/SignIn';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn,
    },
    {
    	path:'/chatroom',
    	name:'ChatRoom',
    	component:ChatRoom
    }
  ],
});
