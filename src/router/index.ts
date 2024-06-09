import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1Vokabeln'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1Vokabeln'
      },
      {
        path: 'tab1Vokabeln',
        component: () => import('@/views/TabVokabelnPage.vue')
      },
      {
        path: 'tab2VokabelnLernen',
        component: () => import('@/views/TabVokabelnLernenPage.vue')
      },
      {
        path: 'tab3Tabellen',
        component: () => import('@/views/TabTabellenPage.vue')
      },
      {
        path: 'tab4TabellenLernen',
        component: () => import('@/views/TabTabellenLernenPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
