// import { createRouter, createWebHistory } from 'vue-router'
// // import DefaultLayout from '../layouts/DefaultLayout.vue'
// import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       component: HomeView,
//       // children: [
//       //   {
//       //     path: '',
//       //     name: 'home',
//       //     component: HomeView
//       //   },
//       //   {
//       //     path: 'about',
//       //     name: 'about',
//       //     component: AboutPage
//       //   }
//       // ]
//     },
//     {
//       path: '/session',
//       name: 'session',
//       component: SessionView
//     }
//   ]
// });

// export default router
import { createRouter, createWebHistory } from 'vue-router'
import SessionView from '../views/SessionView.vue'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import SessionLayout from '../layouts/SessionLayout.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView
        }
      ]
    },
    {
      path: '/session',
      component: SessionLayout,
      children: [
        {
          path: '',
          name: 'session',
          component: SessionView
        },
      ]
    },
  ]
})

export default router
