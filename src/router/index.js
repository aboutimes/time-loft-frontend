import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import NotFound from '@/components/404'
import Post from '@/components/Post'
import Posts from '@/components/Posts'
import User from '@/components/User'
import PostEdit from '@/components/PostEdit'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      // name: 'Home', //有默认子路由需要删除 name
      component: resolve => require(['@/components/Home'], resolve), // 使用懒加载
      children: [
        {
          path: '',
          name: 'Posts',
          component: Posts
        },
        {
          path: 'post/:id',
          name: 'Post',
          component: Post,
        },
        {
          path: 'post/:id/edit',
          name: 'PostEdit',
          component: PostEdit
        },
        {
          path: '/user/:id',
          name: 'User',
          component: User,
        },
      ]
    },
    { path: '*', component: NotFound }
    // {
    //   meta: {requireAuth: true},
    //   beforeEach: (to, from, next) => {
    //     let token = window.localStorage.getItem('token');
    //     if (to.matched.some(record => record.meta.requireAuth) && (!token || token === null)) {
    //       // // 未登陆重定向
    //       // next({
    //       //   path: '/login',
    //       //   query: { redirect: to.fullPath }
    //       // // 将跳转的路由path作为参数，登录成功后跳转到该路由
    //       // })
    //       next()
    //     } else {
    //       next()
    //     }
    //   }
    // },

  ]
})



