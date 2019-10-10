import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "@/store.ts";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
            path: "/menu",
            name: "menu",
            component: () => import("./views/Menu.vue")
        },
        {
            path: "/sign-in",
            name: "signin",
            component: () => import("./views/Signin.vue")
        },
        {
            path: "/join",
            name: "join",
            component: () => import("./views/Join.vue")
        },
        {
            path: "/about",
            name: "about",
            component: () => import("./views/About.vue"),
            meta: {
                title: "Profile",
                authRequired: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log("000");
    console.log(to);
    console.log(to.matched);

    if (to.matched.some(record => record.meta.authRequired)) {
        console.log(111);

        if (!store.state.isAuthenticated) {
            console.log(222);

            next({
                path: "/sign-in"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
