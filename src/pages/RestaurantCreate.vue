<template>
  <div class="restaurant-create-container">
    <HeaderBar :type="0" class="header-bar"></HeaderBar>
    <div class="restaurant-create-flex-box">
      <div class="restaurant-create-img">
        <input type="file" accept="image/*" id="image-input" >
        <label for="image-input">
          <img src="https://live.staticflickr.com/65535/48580618611_2dab0d71f5_o.jpg" />
        </label>
      </div>
      <div class="restaurant-create-input-box">
        <input type="text" :placeholder=resNamePlaceholder v-model=resName>
        <input type="text" :placeholder=resOwnersIdPlaceholder v-model=resOwnersId>
        <input type="text" :placeholder=resAddressPlaceholder v-model=resAddress>
        <input type="text" :placeholder=resPhonePlaceholder v-model=resPhone>
        <input type="text" :placeholder=resOperTimePlaceholder v-model=resOperTime>
        <input type="text" :placeholder=resLatPlaceholder v-model=resLat>
        <input type="text" :placeholder=resLngPlaceholder v-model=resLng>
      </div>
    </div>
    <button class="restaurnt-create-button" @click="createRestaurant">식당등록</button>
  </div>
</template>

<script>
  import HeaderBar from "../components/headerBar"

  export default {
    components: {
      HeaderBar
    },
    data() {
      return {
        resNamePlaceholder: "식당 이름",
        resOwnersIdPlaceholder: "사장님 아이디",
        resAddressPlaceholder: "식당 주소",
        resPhonePlaceholder: "식당 전화번호",
        resOperTimePlaceholder: "점심 운영시간",
        resLatPlaceholder: "식당 위치(X)",
        resLngPlaceholder: "식당 위치(Y)",
        resName: "",
        resOwnersId: "",
        resAddress: "",
        resPhone: "",
        resOperTime: "",
        resLat: "",
        resLng: "",
        restaurantImage: []
      }
    },
    methods: {
      createRestaurant: function() {
        console.log(
          this.resName,
          this.resOwnersId,
          this.resAddress,
          this.resPhone,
          this.resOperTime,
          this.resLat,
          this.resLng
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Hi+Melody&display=swap');


  .restaurant-create-container {

    .restaurant-create-flex-box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 25px;
      flex-direction: column;

      .restaurant-create-img {
        width: 100%;
        background-color: #F7F7F7;
        input {
          display: none;
        }
        label {
          position: relative;
          width: 340px;
          height: 340px;
          display: block;
          margin: auto;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
       
      .restaurant-create-input-box {
        width: 100%;
        input:first-child {
          margin-top: 10px;
        }
        input {
          margin-bottom: 10px;
          display: block;
          border: none;
          border-bottom: solid 1px #707070;
          padding: 10px;
          width: 100%;
          box-sizing: border-box;
          font-size: 16px;
          color: #707070;
        }
        input:focus {
          outline: none;
          color: #F65130;
          border-bottom: solid 1px #F65130;
        }
      }
    }

    .restaurnt-create-button {
      position: fixed;
      bottom: 0px;
      font-family: 'Hi Melody', cursive;
      width: 100vw;
      height: 50px;
      background-color: #CF5252;
      text-align: center;
      font-size: 38px;
      letter-spacing: -3.57px;
      color: #FFFFFF;
    }
  }
</style>