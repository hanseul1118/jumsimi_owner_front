<template>
  <div class="header-menu-container">
    <div class="header-top">
      <div class="back-btn" @click="goBack()" v-show="type == 1 || type == 3">
        뒤로
      </div>
      <div class="header-txt">
        점심이
      </div>
      <div v-show="type == 2" class="header-menu-img-container">
        <img src="@/assets/icon_header_menu.svg" @click="menuClick = !menuClick" />
      </div>
      <div v-show="type == 3" class="header-edit" @click="goMenuUpdate()">
        수정
      </div>
    </div>
    <div v-show="type == 2 && menuClick" class="header-menu">
      <div>
        <div class="header-sub-menu" @click="goRestaurantCreate()">
          <img src="@/assets/menu_dot.png" />
          식당등록
        </div>
        <div class="header-sub-menu" @click="goCs()">
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
                 *  2:타이틀 + 메뉴버튼
                 *  3:타이틀 + 뒤로가기 + 수정 버튼*/
                type: Number,
                default : 0,
                required : false
            },
            passedMenuId: {
                type: String,
                required: false
            }
        },
        methods:{
            goBack(){
                history.go(-1);
            },
            goMenuUpdate(){
                this.$router.push({name:'MenuUpdate', props: { menuId:  this.passedMenuId}})
            },
            goCs(){
                this.$router.push({name:'CS'})
            },
            goRestaurantCreate(){
                this.$router.push({name:'RestaurantCreate'})
            }
        }
    }
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Hi+Melody&display=swap");

.header-menu-container {
  position: relative;

  .header-top {
    border-bottom: 1px solid #cccccc;
    height: 58px;
    .back-btn {
      position: absolute;
      top: 17px;
      left: 14px;
      cursor: pointer;
      color: #828282;
      font-size: 20px;
    }
    .header-txt {
      font-size: 38px;
      line-height: 58px;
      text-align: center;
      color: #f65130;
      font-family: "Hi Melody", cursive;
    }
    .header-edit {
      position: absolute;
      top: 17px;
      left: calc(100% - 50px);
      cursor: pointer;
      color: #828282;
      font-size: 20px;
    }
    .header-menu-img-container {
      width: 18px;
      height: 11px;
      position: absolute;
      top: 15px;
      right: 15px;
      img {
        width: 18px;
        height: 11px;
        cursor: pointer;
      }
    }
  }

  .header-menu {
    width: 100%;
    height: 121px;
    position: absolute;
    background: white;
    z-index: 1000;

    .header-sub-menu {
      color: #707070;
      font-size: 23px;
      padding: 13px 0;
      margin: 0 38px;
      img {
        width: 7px;
        padding-bottom: 6px;
      }
    }

    .header-sub-menu:first-child {
      border-bottom: 1px solid #efefef;
    }
  }
}
</style>
