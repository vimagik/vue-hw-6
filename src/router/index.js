import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import ProductView from '@/views/ProductView.vue'
import ShoppingCartView from '@/views/ShoppingCartView.vue'
import AddProduct from '@/views/AddProduct.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCartView
    },
    {
      path: '/newproduct',
      name: 'newproduct',
      component: AddProduct
    }
  ],
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('user')
  if (to.name === 'newproduct' && !auth) { 
    next({name: 'login'})
  } else next()
})

export default router
