<template>
    <div class="restaurant-list-container">
        <header-bar :type="2"></header-bar>
        <div class="restaurant-list-body">
            <div v-for="(item, index) in restaurantList" class="restaurant-list-card" :key="index" >
                <div class="card-left" @click="likeClick(item)">
                    <!-- <img class="card-like" > -->
                    <img class="card-img" >
                    <img
                    class="favorite-icon"
                    :src="item.favoriteImg"
                    />
                </div>
                <div class="card-right" @click="goDetail(item.restaurantId)"> 
                    <div class="restaurant-top">
                        <div class="restaurant-name">{{item.restaurantName}}</div>
                        <div class="restaurant-type">{{item.menuType}}</div>
                    </div>
                    <div class="restaurant-text">
                        {{item.contents}}
                    </div>
                    <div class="restaurant-price">{{item.price | priceFilter}}</div>
                    <div class="restaurant-bottom">
                        <div class="restaurant-lunch-time">{{item.lunchOperationTime}}</div>
                        <div class="restaurant-distance">{{item.distance}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from '../components/headerBar'
    export default {
        created() {
            for (let index = 0; index < this.restaurantList.length; index++) {
                const data = this.restaurantList[index];
        
                    if (this.$store.state.favoriteList.indexOf(data.restaurantId) != -1) {
                        data.isFavorite = true;
                    }
            }
        },
        components : {
            HeaderBar
        },   
        data(){
            return{
                restaurantList : [
                    {
                        restaurantId : '1010101010'
                        , restaurantName : '깨돌이식당'
                        , menuType : '주간'
                        , contents : '7,000원' 
                        , lunchOperationTime : '점심시간 10:30 - 14:30'
                        , distance : '10m 이내'
                        , price : 0
                        , isFavorite: false
                        , favoriteImg : require('../assets/icon_favorite_off.svg')
                    },
                    {
                        restaurantId : '2222'
                        , restaurantName : '엄마식당'
                        , menuType : '일간'
                        , contents : '8,000원' 
                        , lunchOperationTime : '점심시간 10:30 - 14:30'
                        , distance : '20m 이내'
                        , price : 0
                        , isFavorite: false
                        , favoriteImg : require('../assets/icon_favorite_off.svg')
                    }
                ]
            }
        },
        filters:{
            priceFilter(val){
                let num = new Number(val);

                return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") + " 원"

            }
        },
        methods:{
            likeClick(data){
                // console.log('err');
                if (data.isFavorite) {
                    this.$store.commit("deleteFavoriteRes", data.restaurantId);
                    data.favoriteImg = require('../assets/icon_favorite_off.svg')
                } else {
                    this.$store.commit("addFavoriteRes", data.restaurantId);
                    data.favoriteImg = require('../assets/icon_favorite_on.svg')
                }

                data.isFavorite = !data.isFavorite;
            },
            goDetail(id){
                this.$router.push({ name : "MenuDetail" , params:{restaurantId : id}})
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