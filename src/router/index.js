import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import NotFound from '@/components/404'
import Post from '@/components/Post'
import Posts from '@/components/Posts'
import User from '@/components/User'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      // name: 'Home', //有默认子路由需要删除 name
      component: Home,
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
          path: '/user/:id',
          name: 'User',
          component: User,
        },
      ]
    },
    { path: '*', component: NotFound }
    // {
    //   path: '/user/:id',
    //   name: 'user',
    //   component: user,
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
    // {
    //   path: '/post/:id',
    //   name: 'post',
    //   component: post,
    // },

  ]
})


// const routes = [
//   {
//     path: '*',
//     component: NotFound
//   },
//   {
//     path: '/',
//     name: 'home',
//     component: home,
//     meta: {requireAuth: true},
//     children: [
//       {
//         path: '/auth',
//         name: 'auth',
//         component: auth
//       },
//     ]
//   },
//   {
//     path: '/user/:id',
//     name: 'user',
//     component: user,
//     meta: {requireAuth: true},
//   },
//   {
//     path: '/post/:id',
//     name: 'post',
//     component: post,
//   },
//
// ];
//
// const router = new VueRouter({
//   mode: 'history',
//   // base: '/',
//   routes: routes
// });
//
// router.beforeEach((to, from, next) => {
//   let token = window.localStorage.getItem('token');
//   if (to.matched.some(record => record.meta.requireAuth) && (!token || token === null)) {
//     // 未登陆重定向
//     // next({
//     //   path: '/login',
//     //   query: { redirect: to.fullPath }
//     // 将跳转的路由path作为参数，登录成功后跳转到该路由
//     // })
//     next()
//   } else {
//     next()
//   }
// });
//
// export default router
