<template>
  <div class="menu-update-container">
    <header-bar :type=1></header-bar>
    <div class="menu-update-body">
      <div class="menu-top">
        <img :src="menuImage" class="menu-img"/>
      </div>
      <div class="menu-type-bar">
        <input type="radio" id="type-day"   name="menu-type" value="01" v-model="menuType"> 
        <label for="type-day">  <div>매일</div></label>
        <input type="radio" id="type-week"  name="menu-type" value="02" v-model="menuType">
        <label for="type-week"> <div>주간</div></label>
        <input type="radio" id="type-month" name="menu-type" value="03" v-model="menuType">
        <label for="type-month"><div>월간</div></label>
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
              this.menuType = '01' // 임시
              this.startDate = response.data.startDate
              this.endDate= response.data.endDate
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
        let mm      = date.substring(4, 6);
        let day     = date.substring(6, 8);
        let vn_day1 = new Date( year, mm-1, day );

        let dayOfWeek = vn_day1.getDay();         // 현재 요일 ( 0:일, 1:월, 2:화, 3:수, 4:목, 5:금, 6:토 )

        let dayNum = 0;
        if ((dayOfWeek > 0) && (dayOfWeek < 7)) { // 현재 요일이 월~토 일때
          dayNum = 6 - dayOfWeek;
        }else{                                    // 현재 요일이 일요일
          dayNum = 6
        }

        let saturday = new Date( year, mm-1, vn_day1.getDate() + dayNum ); // 해당일자 주간의 토요일
        let dd = saturday.getDate().toString();
        this.endDate = year + '-' + mm + '-' + (dd[1]?dd:"0"+dd[0]);
      },
      // menuType 에 따른 endDate 구하기
      getEndDate(){
        if(this.menuType == '01'){
         
          this.endDate = this.startDate;

        }else if(this.menuType == '02') {    // menutype 주간
          
          this.getSaterday(this.startDate)  

        }else if(this.menuType == '03') {   // menutype 월간                         
          
          let day = this.startDate.replace(/-/gi, ""); 

          let year = day.substring(0, 4);
          let mm   = day.substring(4, 6);
          let dd   = new Date(year, mm, 0).getDate().toString();

          this.endDate =  year + '-' + mm + '-' + (dd[1]?dd:"0"+dd[0]);
          
        }else{
          this.endDate = this.startDate;
        }
      }
    },
    watch:{
      startDate(){
        this.getEndDate();
      },
      menuType(){
        this.getEndDate();
      }
    },
    components:{
      HeaderBar
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
      margin: 13px 0;
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

// radio custom : start

  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
      position: absolute;
      left: -9999px;
  }

  #type-day:not(:checked) + label div{
    border-radius: 19px 0 0 19px !important;
    border-right: none !important;
  }

  #type-day:checked + label div{
    border-radius: 19px 0 0 19px !important;
    border-right: none !important;
  }

  #type-month:not(:checked) + label div{
    border-radius: 0 19px 19px 0;
    border-left: none;
  }

  #type-month:checked + label div{
    border-radius: 0 19px 19px 0;
    border-left: none;
  }

  [type="radio"]:checked + label div
  {
      position: relative;
      cursor: pointer;
      line-height: 20px;
      display: inline-block;
      color: white;
      background: #CF5252; 
      width: 60px;
      height: 42px;
      line-height: 42px;
      font-size: 22px;
      text-align: center;
      border: 1px solid #CF5252;
  }
  [type="radio"]:not(:checked) + label div
  {
      position: relative;
      cursor: pointer;
      line-height: 20px;
      display: inline-block;
      color: #CF5252;
      width: 60px;
      height: 42px;
      line-height: 42px;
      font-size: 22px;
      text-align: center;
      border: 1px solid #CF5252;
  }
  [type="radio"]:checked + label:before,
  [type="radio"]:not(:checked) + label:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      height: 42px;
      padding: 4px 0;
      float: left;
      border: 1px solid #CF5252;
      color: #CF5252;
  }
  [type="radio"]:checked + label:after,
  [type="radio"]:not(:checked) + label:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background: #CF5252;
      width: 60px;
      height: 42px;
      float: left;
      border: 1px solid #CF5252;
      font-size: 22px;
      color: white;
  }
  // [type="radio"]:not(:checked) + label:after {
  //     opacity: 0;
  //     -webkit-transform: scale(0);
  //     transform: scale(0);
  // }
  // [type="radio"]:checked + label:after {
  //     opacity: 1;
  //     -webkit-transform: scale(1);
  //     transform: scale(1);
  // }

// radio custom : end

}
</style>