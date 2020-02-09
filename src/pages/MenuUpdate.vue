<template>
  <div class="menu-update-container">
    <header-bar :type=1></header-bar>
    <div class="menu-update-body">
      <div class="menu-top">
        <img :src="menuImage" class="menu-img"/>
      </div>
      <div class="menu-type-bar">
        <div class="type-day menu-type">매일</div>
        <div class="type-week menu-type">주간</div>
        <div class="type-month menu-type">월간</div>
      </div>
      <div class="menu-input">
        <div class="start-date">
          <div class="date-label">시작일</div>

  <v-app>

            <v-row justify="center">
              <!-- <v-col> -->
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="startDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startDate"
                        readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" no-title scrollable color="#CF5252">
                    <v-spacer></v-spacer>
                    <v-btn text color="#CF5252" @click="menu = false">취소</v-btn>
                    <v-btn text color="#CF5252" @click="$refs.menu.save(startDate)">확인</v-btn>
                  </v-date-picker>
                </v-menu>
              <!-- </v-col> -->
            </v-row>

  </v-app>













        </div>
        <div class="end-date">
          <div class="date-label">종료일</div>
          <input v-model="endDate" disabled> 
        </div>
        <div class="menu-price">
          <input class="price-input" v-model="price">
          <div class="won">원</div>
        </div>
      </div>
      <div class="menu-textarea">
        <textarea v-model="contents"></textarea>
      </div>
    </div>
    <div class="menu-update-bar"> 
      <input class="menu-update-put" type="submit" value="메뉴수정" @click="setMenu">
    </div>
  </div>
</template>

<script>

  import HeaderBar from "@/components/headerBar"

  export default {
    created() {
      this.menuId = this.$route.params.restaurantId

      this.getMenuDetail(this.menuId)
    },
    updated(){
      // console.log(5, this.endDate, '/', this.startDate)
    },
    watch:{
      // endDate(oldVal, newVal){
      //   console.log("oldVal : " , oldVal)
      //   console.log("newVal : " ,newVal)
      // }
    },
    components:{
      HeaderBar
    },
    data() {
      return{
        menuId: "1",
        menuImage: undefined,
        menuType: undefined,
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        contents: "",
        price: 0
      };
    },
    methods: {
      getMenuDetail(menuId) {
          let params = {
            menuId : menuId
          }
          
          this.$api.menuDetail(params)
          .then(response => {
            console.log('response : ', response)
            console.log(3)
            if(response.data.errCode == 200) {
              this.price = response.data.price,
              this.menuImage = response.data.menuImage,
              this.contents = response.data.contents,
              this.menuType = response.data.menuType,
              this.startDate = response.data.startDate,
              this.endDate = response.data.endDate,
              this.restaurantId = response.data.restaurantId
            }
          })
          .catch(error => {
            console.log('error : ',error)
          })
      },
      setMenu(){
        let params = {
          menuId : this.menuId,
          price : this.price,
          menuImage : this.menuImage,
          contents : this.contents,
          menuType : this.menuType,
          startDate : this.startDate,
          endDate : this.endDate
        }

        console.log("param : " , params)

        this.$api.menuUpdate(params)
        .then(response => {
          console.log('result : ' , response)

        })
        .catch(error => {
          console.log('error : ' , error)
        })
      }
    }
    // filters: {
    // formatPrice: function(price) {
    //   console.log("price : " ,price)
    //   let point, len, str ;

    //   point = String(price).length % 3 ;
    //   len = String(price).length ; 

    //   str = String(price).substring(0, point)
      
    //   console.log("str : ", str)
    //   while (point < len) {
    //     if(str != "") str += ",";
    //     str += String(price).substring(point, point + 3);
    //     point += 3;
    //   }

    //   console.log("return : " ,str)

    //   return str;
    // }
  // }
  };
</script>

<style lang="scss">

.menu-update-container {
  .menu-update-body{
    width:90%;
    margin: 0 auto;
    padding-bottom: 70px; 
    .menu-top{
      .menu-img{
        width:100%;
        height: 351px;
        margin-top: 25px;
        border:none;
        background-color: #F8F8F8;

      }
    }
    .menu-type-bar{
      width: 181px;
      height: 42px;
      text-align: center;
      .menu-type{
        width: 60px;
        height: 42px;
        padding: 4px 0 ;
        margin:13px 0;
        float: left;
        border: 1px solid #CF5252;
        font-size : 22px;
        color:#CF5252;
      }
      .type-day{
        border-radius: 19px 0 0 19px;
        border-right: none;
      }
      .type-month{
        border-radius: 0 19px 19px 0;
        border-left: none;
      }
    }
    .menu-input{
      clear: both;
      
      .start-date{
        clear: both;
        border-bottom: 1px solid #D9D8D8;
        padding: 11px 0 ;
        input{
          border:none;
          width: calc(100% - 95px);
          text-align: center;
          letter-spacing: 3px;
          line-height: 33px;
          font-size : 20px; 
        }
      }
      .end-date{
        clear: both;
        border-bottom: 1px solid #D9D8D8;
        padding: 11px 0 ;
        input{
          border:none;
          width: calc(100% - 95px);
          text-align: center;
          letter-spacing: 3px;
          line-height: 33px;
          font-size : 20px; 
          color: #999;
        }
      }
      .date-label{
        font-size: 22px;
        width: 95px;
        line-height: 33px;
        text-align: center;
        float: left;
      }
      .menu-price{
        border-bottom: 1px solid #D9D8D8;
        padding: 11px 0 ;
        .price-input{
          width: calc(100% - 60px);
          border: none;
          height: 32px;
          font-size: 20px;
          padding-left: 19px;
          letter-spacing: 3px;
          text-align: right;
        }
        .won{
          width:50px;
          line-height: 32px;
          font-size:22px;
          float: right;
          text-align: right;
          padding-right: 19px;
        }
      }

      // date-picker custom : start
      .v-application--wrap{
        min-height: auto !important;
      }
      .v-text-field{
        padding-top: 0px;
        margin-top: 0px;
      }
      .v-text-field__details{
        height: 0px;
        min-height: 0px;
      }
      .theme--light.v-text-field>.v-input__control>.v-input__slot:before{
        border-color: transparent;
      }
      .row{
        margin-right: 0px;
        margin-left: 0px;
      }
      .v-input__slot{
        margin:0px;
      }
      // date-picker custom : end
    }
    .menu-textarea{
      textarea{
        width:100%;
        height:115px;
        margin-top: 21px;
        resize: none;
        border: 1px solid #D9D8D8;
        font-size: 20px;
        padding: 19px;

      }
    }
  }
  .menu-update-bar{
    width: 100%;
    height: 50px;

    position: fixed;
    bottom: 0;

    .menu-update-put{
      width: 100%;
      height: 100%;
      background-color: #CF5252;
      border: none;
      color: white;
      font-size: 38px;
    }

  }

  
}
</style>