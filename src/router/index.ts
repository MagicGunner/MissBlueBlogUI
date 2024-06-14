import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/articles/:articleId',
      name: 'Articles',
      component: () => import('../views/ArticleView.vue')
    },
    {
      path: '/talks',
      name: 'talkList',
      component: () => import('../views/TalkListView.vue')
    },
    {
      path: '/talks/:talkId',
      name: 'talks',
      component: () => import('../views/TalkView.vue')
    },
    {
      path: '/archives',
      name: 'Archives',
      component: () => import('../views/ArchivesView.vue')
    },
    {
      path: '/article-list/:tagId',
      name: 'ArticleList',
      component: () => import('../views/ArticleListView.vue')
    },
    {
      path: '/tags',
      name: 'Tags',
      component: () => import('../views/TagsView.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('../views/MessageView.vue')
    },
    {
      path: '/friends',
      name: 'Friends',
      component: () => import('../views/FriendLinkView.vue')
    },
    {
      path: '/photos/:albumId',
      name: 'Photos',
      component: () => import('../views/PhotosView.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404View.vue')
    },
    {
      path: '/oauth/login/qq',
      name: 'qqLogin',
      component: () => import('../components/OauthLogin.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
      // hidden: true
    }
  ]
})

export default router
