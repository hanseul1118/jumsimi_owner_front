<template>
    <div class="header-menu-container">
        <div class="header-top">
            <div class="header-txt">
                점심이
            </div>
            <div class="header-menu-img-container">
                <img src="@/assets/arrow_down.png" @click="menuClick=!menuClick">
            </div>
        </div>
        <div v-show="menuClick" class="header-menu">
            <div>
                <div class="header-sub-menu">
                    <img src="@/assets/menu_dot.png" />
                    식당등록
                </div>
                <div class="header-sub-menu">
                    <img src="@/assets/menu_dot.png" />
                    고객센터
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                menuClick : false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header-menu-container{
        position: relative;
        .header-top{
            border-bottom:1px solid #cccccc;
            height:58px;
            .header-txt{
                font-size:38px;
                line-height: 58px;
                text-align: center;
                color: #F65130;
            }
            .header-menu-img-container{
                width: 18px;
                height: 11px;
                position: absolute;
                top: 15px;
                right: 5px;
                img {
                    width: 18px;
                    height: 11px;
                    cursor: pointer;
                }
            }
        }

        .header-menu{
            width:100%;
            height: 117px;
            
            .header-sub-menu{
                color:#707070;
                font-size:23px;
                padding: 17px 0;
                margin: 0 38px;
                img{
                    width: 7px;
                    padding-bottom:6px;
                }
            }

            .header-sub-menu:first-child{
                border-bottom:1px solid #EFEFEF ;
            }

        }
        
    }
</style>