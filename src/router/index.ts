import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

// Middlewhere logic
/* Local storage */
import { Storage } from "@ionic/storage";
const store = new Storage();

/* Api end point routes */
import * as ApiRoutes from "../Core/apiEndpoint";

/* Axios import */
import axios from "axios";

// Autenticate user login
async function checkSanctumToken() {
    await store.create();

    const sanctumToken = await store.get("auth_token");

    // Header with the sanctum token
    const config = {
        headers: {
            Authorization: "Bearer " + sanctumToken,
        },
    };
    // Check if the token is valid with the endpoint
    const response = await axios
        .post(ApiRoutes.CheckLoginApi, {}, config)
        .then((res) => {
            // On sucess
            return res.data.data;
        })
        .catch((err) => {
            return false;
        });

    return response;
}

const routes: Array<RouteRecordRaw> = [
    {
        path: "",
        redirect: "/login",
    },
    {
        name: "login",
        path: "/login",
        component: () => import("../views/Auth/Login.vue"),
        // Generic guard protection
        beforeEnter: async (to, from, next) => {
            // Check if the user has the autenticated token if no send back to login
            if (await checkSanctumToken()) {
                next({
                    name: "user_home",
                });
            } else {
                next();
            }
        },
    },
    // Protected routes
    {
        name: "user_home",
        path: "/user_home",
        component: () => import("../views/User/Home.vue"),
        // Generic guard protection
        beforeEnter: async (to, from, next) => {
            // Check if the user has the autenticated token if no send back to login
            if (await checkSanctumToken()) {
                next();
            } else {
                next({
                    name: "login",
                });
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
