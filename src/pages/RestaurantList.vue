<template>
    <div class="restaurant-list-container">
        <header-menu></header-menu>
        <div class="restaurant-list-body">
            <div v-for="(item, index) in restaurantList" class="restaurant-list-card" :key="index">
                <div class="card-left">
                    <!-- <img class="card-like" > -->
                    <img @click="likeClick">
                </div>
                <div class="card-right"> 
                    <div class="restaurant-top">
                        <div class="restaurant-name">{{item.restaurantName}}</div>
                        <div class="restaurant-type">{{item.menuType}}</div>
                    </div>
                    <div class="restaurant-text">
                        {{item.contents}}
                    </div>
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
    import HeaderMenu from '../components/headerMenu'
    export default {
        components : {
            HeaderMenu
        },   
        data(){
            return{
                restaurantList : [
                    {
                        restaurantName : '깨돌이식당'
                        , menuType : '주간'
                        , contents : '7,000원' 
                        , lunchOperationTime : '점심시간'
                        , distance : '10m 이내'
                        
                    },
                    {
                        restaurantName : '깨돌이식당1'
                        , menuType : '주간1'
                        , contents : '7,000원' 
                        , lunchOperationTime : '점심시간'
                        , distance : '10m 이내'
                        
                    }
                ]
            }
        },
        methods:{
            likeClick(){
                // console.log('err');
                alert('hi')

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

            .card-left{
                width: 154px;
                float: left;
                text-align: center;
                margin: 12px 0;
                
                img {
                    width: 124px;
                    height: 125px;
                    margin: auto;
                }
            }
            .card-right{
                display: inline-block;
                margin-top: 12px;
                width: calc(100% - 154px);

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
                        background-color: #CF5252;
                        text-align: center;
                        border-radius: 12px;
                        padding: 3px;
                        color: #FFFFFF;
                        font-size: 14px;
                    }
                }
                .restaurant-text{
                    clear: both;
                    margin-top: 17px;
                }
            }
            
        }

    }

}
</style>