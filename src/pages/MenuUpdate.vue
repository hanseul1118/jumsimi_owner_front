<template>
  <div class="menu-update-container">
    <header-bar :type=1></header-bar>
    <div class="menu-update-body">
      <div class="menu-top">
        <img :src="menuImage" class="menu-img"/>
      </div>
      <div class="menu-type-bar">
        <div class="type-day menu-type" :style="menuType=='01'? 'background:#CF5252; color:white;' : ''">매일</div>
        <div class="type-week menu-type" :style="menuType=='02'? 'background:#CF5252; color:white;' : ''">주간</div>
        <div class="type-month menu-type" :style="menuType=='03'? 'background:#CF5252; color:white;' : ''">월간</div>
      </div>
      <div class="menu-input">
        <div class="start-date">
          <div class="date-label">시작일</div>
            <v-app>
              <v-row justify="center">
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
              </v-row>
            </v-app>
        </div>
        <div class="end-date">
          <div class="date-label">종료일</div>
          <input :value="endDate" disabled> 
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
  import codeFilter from '../js/codeFilter.js'

  export default {
    created() {
      this.menuId = this.$route.params.menuId

      this.getMenuDetail(this.menuId)
    },
    updated(){
      // console.log(5, this.endDate, '/', this.startDate)
    },
    watch:{
      startDate(newVal){

        // menuType 에 따른 endDate 구하기
        if      (this.menuType == '02') {    // menutype 주간
          this.getSaterday(newVal)  
        }else if(this.menuType == '03') {   // menutype 월간                         
            newVal = newVal.replace(/-/gi, ""); 

            let year    = newVal.substring(0, 4);
            let month   = newVal.substring(4, 6);
            let lastDay = new Date(year, month, 0).getDate();

          this.endDate =  year + '-' + month + '-' + lastDay
        }

      }
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
            if(response.data.errCode == 200) {
              this.price = response.data.price
              this.menuImage = response.data.menuImage
              this.contents = response.data.contents
              // this.menuType = response.data.menuType
              this.menuType = '03' // 임시
              this.startDate = response.data.startDate
              this.endDatec= response.data.endDate
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
      },
      getSaterday(date){
        date = date.replace(/-/gi, ""); 
        console.log('date', date)

        let year    = date.substring(0, 4);
        let month   = date.substring(4, 6);
        let day     = date.substring(6, 8);
        let vn_day1 = new Date( year, month-1, day );

        let dayOfWeek = vn_day1.getDay();         // 현재 요일 ( 0:일, 1:월, 2:화, 3:수, 4:목, 5:금, 6:토 )

        let saturday = 0;
        if ((dayOfWeek > 0) && (dayOfWeek < 7)) { // 현재 요일이 월~토 일때
          saturday = 6 - dayOfWeek;
        }else{                                    // 현재 요일이 일요일
          saturday = 6
        }

        let Cal_en = new Date( year, month-1, vn_day1.getDate() + saturday ); // 해당일자 주간의 토요일
        this.endDate = year + '-' + month + '-' + Cal_en.getDate() 

        console.log('dayOfWeek', dayOfWeek  )
        console.log('Cal_en.getDate()', Cal_en.getDate())
      },
    },
    filters: {
      menuTypeFilter: codeFilter.menuType

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
    }
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
      .v-menu__content.theme--light.menuable__content__active{
        top: 550px !important;
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
      font-family: 'Hi Melody', cursive;
    }

  }

  
}
</style>