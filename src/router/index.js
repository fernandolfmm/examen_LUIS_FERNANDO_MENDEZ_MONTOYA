import Vue from "vue";
import Router from "vue-router";
import auth from "@/router/auth";
import axios from "axios";

Vue.use(Router);

function checkSession(to, from, next) {
  let jwt = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ';
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;

  next();
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: () => import("@/pages/errors/404.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import(`@/pages/Login.vue`),
      // beforeEnter(to, from, next) {
      //   if (Vue.prototype.$session.exists()) {
      //     auth.check().then((res) => {
      //       if (res) {
      //         next("/home");
      //       } else {
      //         next();
      //       }
      //     });
      //   } else {
      //     next();
      //   }
      // },
    },
    {
      path: "/",
      name: "Root",
      redirect: {
        name: "Home",
      },
      component: () => import(`@/pages/Root.vue`),
      children: [
        {
          path: "/home",
          name: "Home",
          component: () => import(`@/pages/Home.vue`),
          beforeEnter: checkSession,
        },
        {
          path: "/reporte",
          name: "Report",
          component: () => import(`@/pages/Report.vue`),
          beforeEnter: checkSession,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((to, from) => { });

export default router;
