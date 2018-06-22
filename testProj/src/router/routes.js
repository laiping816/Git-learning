const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    query:{title:'功能入口'},path: '/index',component: resolve => require(['../pages/Index.vue'], resolve)
  }
]

export default routes
