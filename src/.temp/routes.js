export default [
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "component--home" */ "/home/oleg/Localdev/Cividi/cividi-planet/src/pages/Index.vue")
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "component--404" */ "/home/oleg/Localdev/Cividi/cividi-planet/node_modules/gridsome/app/pages/404.vue"),
    meta: { isIndex: false }
  },
  {
    name: "tag",
    path: "/tag/:id",
    component: () => import(/* webpackChunkName: "component--tag" */ "/home/oleg/Localdev/Cividi/cividi-planet/src/templates/Tag.vue")
  },
  {
    name: "post",
    path: "/:slug",
    component: () => import(/* webpackChunkName: "component--post" */ "/home/oleg/Localdev/Cividi/cividi-planet/src/templates/Post.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "component--404" */ "/home/oleg/Localdev/Cividi/cividi-planet/node_modules/gridsome/app/pages/404.vue"),
    meta: { isIndex: false }
  }
]

