import Vue from "vue"

// 모듈
import Router from "vue-router"
// import { store } from "./store/store"

// 화면
import RestaurantList from "@/pages/RestaurantList.vue"
import RestaurantCreate from "@/pages/RestaurantCreate.vue"
import MenuCreate from "@/pages/MenuCreate.vue"
import MenuDetail from "@/pages/MenuDetail.vue"
import MenuUpdate from "@/pages/MenuUpdate.vue"
import Login from "@/pages/Login.vue"
import CS from "@/pages/common/CS.vue"

// import api from "@/api/api.js"
Vue.use(Router)

const router = new Router({
    mode: "history",
    routes: [
        { 
            path: "/login",
            name: "Login",
            component: Login
        },
        { 
            path: "/restaurantlist",
            name: "RestaurantList",
            component: RestaurantList
        },
        { 
            path: "/restaurantcreate",
            name: "RestaurantCreate",
            component: RestaurantCreate
        },
        { 
            path: "/menucreate",
            name: "MenuCreate",
            component: MenuCreate
        },
        { 
            path: "/menudetail/:menuId",
            name: "MenuDetail",
            component: MenuDetail
        },
        { 
            path: "/menuupdate/:menuId",
            name: "MenuUpdate",
            component: MenuUpdate
        },
        { 
            path: "/cs",
            name: "CS",
            component: CS
        },
    ]
})

export default router