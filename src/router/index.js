import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home'
import auth from '@/components/children/auth'
import NotFound from '@/components/404'
import post from '@/components/post'
import user from '@/components/user'

Vue.use(VueRouter);

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: home,
//       meta: { requireAuth: true },
//       children: [
//         {
//           path: '/login',
//           name: 'login',
//           component: login
//         },
//         {
//           path: '/register',
//           name: 'register',
//           component: register
//         }
//       ]
//     },
//     // {
//     //     path: '/login',
//     //     name: 'Login',
//     //     component: Login
//     // },
//     // {
//     //     path: '/register',
//     //     name: 'Register',
//     //     component: Register
//     // },
//   ]
// })
const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    // meta: {requireAuth: true},
    children: [
      {
        path: '/auth',
        name: 'auth',
        component: auth
      },
    ]
  },
  {
    path: '/user/:id',
    name: 'user',
    component: user,
    meta: {requireAuth: true},
  },
  {
    path: '/post/:id',
    name: 'post',
    component: post,
  },
  { path: '*', component: NotFound }
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
});

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requireAuth) && (!token || token === null)) {
    // 未登陆重定向
    // next({
    //   path: '/login',
    //   query: { redirect: to.fullPath }
    // 将跳转的路由path作为参数，登录成功后跳转到该路由
    // })
    next()
  } else {
    next()
  }
});

export default router
