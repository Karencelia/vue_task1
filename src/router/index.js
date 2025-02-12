import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Home.vue';
import Register from '@/views/Register.vue';
import MyBucket from '@/views/MyBucket.vue';
import AddList from '@/views/AddList.vue';
import FullDetails from '@/views/FullDetails.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
    },

    {
      path: '/addlist',
      name: 'add-list',
      component: AddList,
    },


    {
      path: '/mybucket',
      name: 'my-bucket',
      component: MyBucket,
    },


    {
      path: '/mybucket/:id',
      name: 'full-details',
      component: FullDetails,
      props: true,
    },

    
  ],
});

export default router;