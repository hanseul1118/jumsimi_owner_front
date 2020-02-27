import Vue from "vue"

// 모듈
import Router from "vue-router"
import { store } from './store/store'

// 화면
import MenuList from "@/pages/MenuList.vue"
import RestaurantCreate from "@/pages/RestaurantCreate.vue"
import MenuDetail from "@/pages/MenuDetail.vue"
import MenuUpdate from "@/pages/MenuUpdate.vue"
import Login from "@/pages/Login.vue"
import CS from "@/pages/common/CS.vue"
import testmhs from "@/pages/testmhs.vue"

// import api from "@/api/api.js"
Vue.use(Router)

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Main",
            component: MenuList
        },
        { 
            path: "/login",
            name: "Login",
            component: Login
        },
        { 
            path: "/menulist",
            name: "MenuList",
            component: MenuList
        },
        { 
            path: "/restaurantcreate",
            name: "RestaurantCreate",
            component: RestaurantCreate
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
        // 테스트용
        { 
            path: "/hs",
            name: "hs",
            component: testmhs
        },
    ]
})
router.beforeEach((to, from, next) => {
    if(to.name == "Login"){
        next()
        return;
    }
    if (!!store.state.userInfo && !!store.state.userInfo.token) {
        next()
    } else {
        next({ name: "Login", params: to.params })
        console.log('before routing, token is undefined')
    }
})

export default router