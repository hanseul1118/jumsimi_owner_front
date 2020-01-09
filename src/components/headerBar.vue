<template>
    <div class="header-menu-container">
        <div class="header-top">
            <div class="back-btn" @click="goBack()" v-show="type==1">뒤로</div>
            <div class="header-txt">
                점심이
            </div>
            <div v-show="type==2" class="header-menu-img-container">
                <img src="@/assets/arrow_down.png" @click="menuClick=!menuClick">
            </div>
        </div>
        <div v-show="type==2&&menuClick" class="header-menu">
            <div>
                <div class="header-sub-menu">
                    <img src="@/assets/menu_dot.png" />
                    식당등록
                </div>
                <div class="header-sub-menu" @click="csClick()">
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
        },
        props:{
            type:{
                /** 
                 *  0:타이틀
                 *  1:타이틀 + 뒤로가기 버튼
                 *  2:타이틀 + 메뉴버튼 */
                type: Number,
                default : 0,
                required : false
            }
        },
        methods:{
            goBack(){
                history.go(-1);
            },
            csClick(){
                this.$router.push({name:'CS'})
            }
        },
        created(){
        }
    }
</script>

<style lang="scss" scoped>
    .header-menu-container{
        position: relative;
        
        .header-top{
            border-bottom:1px solid #cccccc;
            height:58px;
            .back-btn{
                position: absolute;
                top: 17px;
                left: 14px;
                cursor: pointer;
                color:#828282;
                font-size: 20px;
            }
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