<template>
    <div class="restaurant-list-container">
        <header-bar :type="2" :menuList="menuList"></header-bar>
        <div class="restaurant-list-body">
            <div v-for="(item, index) in restaurantList" class="restaurant-list-card" :key="index" >
                <div class="card-left" @click="likeClick(item)">
                    <!-- <img class="card-like" > -->
                    <img class="card-img" >
                    <img
                    class="favorite-icon"
                    :src="item.isFavorite? favoriteOffImg : favoriteOnImg"
                    />
                </div>
                <div class="card-right" @click="goDetail(item.menuId)"> 
                    <div class="restaurant-top">
                        <div class="restaurant-name">{{item.restaurantName}}</div>
                        <div class="restaurant-type">{{item.menuType | menuTypeFilter}}</div>
                    </div>
                    <div class="restaurant-text">
                        {{item.contents}}
                    </div>
                    <div class="restaurant-price">{{item.price | priceFilter}}</div>
                    <div class="restaurant-bottom">
                        <div class="restaurant-lunch-time">점심시간 {{item.lunchOperationTime}}</div>
                        <div class="restaurant-distance">{{item.distance}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from '../components/headerBar'
    import codeFilter from '../js/codeFilter.js'

    export default {
        created() {
            for (let index = 0; index < this.restaurantList.length; index++) {
                const data = this.restaurantList[index];
        
                if (this.$store.state.favoriteList.indexOf(data.menuId) != -1) {
                    data.isFavorite = true;
                }
            }
            this.addScrollEvent();
            this.getRestaurantList();
        },
        destroyed() {
            this.removeScrollEvent();
        },
        components : {
            HeaderBar
        },   
        data(){
            return{
                favoriteOffImg : require('../assets/icon_favorite_off.svg'),
                favoriteOnImg : require('../assets/icon_favorite_on.svg'),
                restaurantList : [
                  {
                    menuId : '',
                    restaurantName : '',
                    menuType : '',
                    contents : '' ,
                    lunchOperationTime : '',
                    distance : '',
                    price : 0,
                    isFavorite: false
                  }
                ],menuList : [
                  { menuName : '식당등록', pathName: 'RestaurantCreate' },
                  { menuName : '고객센터', pathName: 'CS' }
                ],
                pageCnt : 5,
                pageNumber: 0,
                bottomYN: false,
                isMorePost: true,
            }
        },
        filters:{
            priceFilter(val){
                let num = new Number(val);

                return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") + " 원"

            },
            menuTypeFilter: codeFilter.menuType
        },
        methods:{
            likeClick(data){
                data.isFavorite = !data.isFavorite;
                
                // console.log('err');
                if (data.isFavorite) {
                    this.$store.commit("addFavoriteRes", data.menuId);
                } else {
                    this.$store.commit("deleteFavoriteRes", data.menuId);
                }

            },
            goDetail(id){
                this.$router.push({ name : "MenuDetail" , params:{menuId : id}})
            },
            getRestaurantList() {
                // 페이지 증가
                this.pageNumber++;

                if(this.pageNumber == 1){
                    this.restaurantList = [];
                }

                let params = {
                    pageCnt : this.pageCnt,
                    pageNumber: this.pageNumber
                }

                // restaurant 리스트 불러오기
                this.$api.restaurantList(params)
                .then(response => {
                    if(response.data.errCode == 200) {
                        let result = response.data.restaurantList;

                        // 더보기 할 때 object 병합
                        let origin = this.restaurantList;
                        this.restaurantList = [];
                        this.restaurantList = origin.concat(result);

                        // 더보기 가능한 restaurant 존재 여부 저장
                        if (result.length < this.pageSize) {
                            this.isMorePost = false;
                        }
                    }
                })
                .catch(error => {
                    console.log('error : ',error)
                })
            },
            // 스크롤이 bottom 에 도달여부 체크
            bottomVisible() {
                let actionPoint = 300; // 더보기 기능 동작할 스크롤 위치
                let scrollY = window.pageYOffset;
                let visible = document.documentElement.clientHeight;
                let pageHeight = document.documentElement.scrollHeight;
                let bottomOfPage = visible + scrollY + actionPoint >= pageHeight;
                return bottomOfPage || pageHeight < visible + actionPoint;
            },
            // 스크롤이 바닥에 도달하기 전에 더보기 이벤트 제거
            addScrollEvent() {
                window.addEventListener("scroll", () => {
                // restaurantList 가 있고, 더 불러올 post가 있을 때
                    if (this.restaurantList.length > 0 && this.isMorePost) {
                        this.bottomYN = this.bottomVisible();
                    }
                });
            },
            // 스크롤이 바닥에 도달하기 전에 더보기 이벤트 제거
            removeScrollEvent() {
                window.removeEventListener("scroll", () => {
                    if (this.postList.length > 0 && this.isMorePost) {
                    this.bottomYN = this.bottomVisible();
                    }
                });
            },
        },
        watch:{
            bottomYN(val) {
                if (val) {
                    this.getRestaurantList();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.restaurant-list-container{

    .restaurant-list-body{

        .restaurant-list-card{
            height: 150px;
            clear: both;
            background-color: #F3F3F3;
            margin-bottom: 20px;    

            .card-left{
                width: 154px;
                float: left;
                text-align: center;
                margin: 12px 0;
                position: relative;
                
                .card-img {
                    width: 124px;
                    height: 125px;
                    margin: auto;
                }
                .favorite-icon {
                    z-index: 100;
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    top: 4px;
                    left: 19px;
                }
            }
            .card-right{
                display: inline-block;
                margin-top: 12px;
                margin-right: 15px;
                width: calc(100% - 169px);
                height: 125px;

                .restaurant-top{
                        display: flex;

                    .restaurant-name{
                        color: #000000;
                        font-size: 18px;
                        font-weight: bold;
                        flex: 1;
                        text-decoration: none;
                        color: #333;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    .restaurant-type{
                        width: 40px;
                        background-color: #EF532E;
                        text-align: center;
                        border-radius: 12px;
                        padding: 3px;
                        color: #FFFFFF;
                        font-size: 14px;
                    }
                }
                .restaurant-text{
                    clear: both;
                    margin-top: 13px;
                    font-size: 14px;
                    color: #EF532E;
                }
                .restaurant-price{
                    font-size: 18px;
                    font-weight: bold;
                    position: relative;
                    bottom: -16px;

                }

                .restaurant-bottom{
                    display: flex;
                    position: relative;
                    bottom: -16px;

                    .restaurant-lunch-time{
                        font-size: 14px;
                        flex: 1;
                    }

                    .restaurant-distance{
                        color: #EF532E;
                        font-size: 13px;
                    }
                }
            }
            
        }

    }

}
</style>