import Vue from "vue"

// 모듈
import Router from "vue-router"
import { store } from "./store/store"

// 화면
import RestaurantList from "@/pages/owner/RestaurantList.vue"
import RestaurantCreate from "@/pages/owner/RestaurantCreate.vue"
import MenuCreate from "@/pages/owner/MenuCreate.vue"
import MenuDetail from "@/pages/owner/MenuDetail.vue"
import MenuUpdate from "@/pages/owner/MenuUpdate.vue"
import Login from "@/pages/owner/Login.vue"
import OwnerCS from "@/pages/Owner/common/CS.vue"

import api from "@/api/api.js"
Vue.use(Router)

const router = new Router({
    mode: "history",
    routes: [
        { 
            path: "/",
            name: "Login",
            component: Login,
            children: []
        }
    ]
})

    export default router