<template>
  <div class="menu-detail-container">
    <header-bar class="header-bar" :type="3" :passedMenuId="menuId" :menuList="menuList"></header-bar>
    <div class="menu-detail-flex-box" v-if="isCompleted">
      <div class="menu-detail-top">
        <div class="menu-detail-top-left">
          <p>{{ restaurantName }}</p>
          <p>점심시간 {{ operationTime }}</p>
        </div>
        <div class="menu-detail-top-right">
          <img src="../assets/icon_share.svg" />
        </div>
      </div>

      <div class="menu-detail-middle">
        <div class="menu-detail-middle-image">
          <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            fade
            indicators
            :interval=0
          >
            <b-carousel-slide v-for="(slide, index) in slides" :key="index">
              <template v-slot:img>
                <img :src="slide" class="d-block menu-image">
              </template>
            </b-carousel-slide>
          </b-carousel>
        </div>
        <img
          class="favorite-icon"
          :src="favoriteImg"
          @click="changeFavoriteState"
        />
      </div>

      <div class="menu-detail-bottom">
        <div class="menu-detail-bottom-date">
          <div class="menu-detail-bottom-date-menu-type">
            <p>{{ menuString }}</p>
          </div>
          <div class="menu-detail-bottom-date-start-end-date">
            <p>{{ startDate | formatDate(endDate) }}</p>
          </div>
        </div>
        <div class="menu-detail-bottom-contents">
          <p>{{ contents }}</p>
          <p>{{ price }} </p>
        </div>
        <div class="menu-detail-bottom-info">
          <div class="menu-detail-bottom-info-distance">
            <p>{{ distance }}</p>
          </div>
          <div class="menu-detail-bottom-info-address">
            <p>{{ restaurantAddress }}</p>
          </div>
          <div class="menu-detail-bottom-info-phone">
            <p>{{ restaurantPhone }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/headerBar";

export default {
  created() {
    this.menuId = this.$route.params.restaurantId
    if (this.$store.state.favoriteList.indexOf(this.menuId) != -1) {
      this.isFavorite = true;
    }
    this.getMenuDetail(this.menuId)
  },
  components: {
    HeaderBar
  },
  data() {
    return {
      isCompleted: false,
      restaurantName: "종로타워 한식부페 미담",
      operationTime: "10:30 - 14:30",
      price: undefined,
      // menuType: "주간",
      menuImage: undefined,
      restaurantImage1: undefined,
      restaurantImage2: undefined,
      restaurantImage3: undefined,
      restaurantImage4: undefined,
      menuType: undefined,
      startDate: "2020-01-12",
      endDate: "2020-01-17",
      contents: "6,500원에 맛있는 점심 한 끼 드시고 가세요!!",
      // distance: "200m 이내",
      restaurantAddress: "서울시 종로구 종로5길 14-3 파이낸스타워 B1",
      restaurantPhone: "02-2361-3345",
      isFavorite: false,
      menuId: "1",
      gpsX: undefined,
      gpsY: undefined,
      // slides: ["https://picsum.photos/1024/480/?image=12", "https://picsum.photos/1024/480/?image=22", "https://picsum.photos/1024/480/?image=10"],
      menuList: [
        { menuName : '메뉴수정', pathName: 'MenuUpdate' },
        { menuName : '신고하기', pathName: 'CS' }, // Todo 신고하기 path 지정 필요
        { menuName : '고객센터', pathName: 'CS' }
      ]
    };
  },
  computed: {
    favoriteImg: function() {
      if (this.isFavorite) {
        return require("../assets/icon_favorite_on.svg");
      } else {
        return require("../assets/icon_favorite_off.svg");
      }
    },
    slides: function() {
      if(this.menuImage) {
        let tempArray = [
          this.menuImage,
          this.restaurantImage1,
          this.restaurantImage2,
          this.restaurantImage3,
          this.restaurantImage4
        ]
        let resArray = []
        
        for(let image in tempArray) {
          if(image) {
            resArray.push(image)
          }
        }
        
        return resArray
      } else {
        return [
          "https://picsum.photos/1024/480/?image=12"
        ]
      }
    },
    menuString: function() {
      if(this.menuType == 0) {
        return "일간"
      } else if (this.menuType == 1) {
        return "주간"
      } else if (this.menuType == 2) {
        return "월간"
      } else {
        return "일간"
      }
    },
    distance: function() {
      if(this.gpsX) {
        return '거리'
      } else {
        return '알수없음'
      }
    }
  },
  methods: {
    changeFavoriteState: function() {
      if (this.isFavorite) {
        this.$store.commit("deleteFavoriteRes", this.menuId);
      } else {
        this.$store.commit("addFavoriteRes", this.menuId);
      }

      this.isFavorite = !this.isFavorite;
    },
    getMenuDetail(menuId) {
      let params = {
        menuId : menuId
      }

      this.$api.menuDetail(params)
      .then(response => {
        console.log('response : ', response)
        if(response.data.errCode == 200) {
          this.price = response.data.price,
          this.menuImage = response.data.menu_image,
          this.contents = response.data.contents,
          this.menuType = response.data.menu_type,
          this.startDate = response.data.start_date,
          this.endData = response.data.end_data,
          this.restaurantName = response.data.restaurant_name,
          this.restaurantAddress = response.data.restaurant_address,
          this.restaurantPhone = response.data.restaurant_phone,
          this.operationTime = response.data.operation_time,
          this.restaurantImage1 = response.data.restaurant_image_1,
          this.restaurantImage2 = response.data.restaurant_image_2,
          this.restaurantImage3 = response.data.restaurant_image_3,
          this.restaurantImage4 = response.data.restaurant_image_4,
          this.restaurantId = response.data.restaurant_id,
          this.gpsX = response.data.gps_x,
          this.gpsY = response.data.gps_y,
          this.isCompleted = true
        }
      })
      .catch(error => {
        console.log('error : ',error)
      })
    }
  },
  filters: {
    formatDate: function(startDate, endDate) {
      return startDate + " ~ " + endDate;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-detail-container {
  .menu-detail-flex-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 25px;
    background-color: #f9f9f9;

    .menu-detail-top {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 100%;

      .menu-detail-top-left {
        width: calc(100% - 30px);

        p {
          display: block;
          margin: 0px;
        }
        p:first-child {
          font-size: 26px;
          color: #000000;
          letter-spacing: 0.65px;
          font-weight: bold;
          margin-bottom: 10px;
        }
      }
      .menu-detail-top-right {
        align-self: center;
        width: 30px;
        height: 30px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    .menu-detail-middle {
      width: 100%;
      height: 300px;
      background-color: #ffffff;
      margin-top: 20px;
      position: relative;

      .menu-detail-middle-image {
        .menu-image {
          width: 100%;
          height: 300px;
        }
      }
      .favorite-icon {
        z-index: 100;
        position: absolute;
        width: 30px;
        height: 30px;
        top: 10px;
        left: 10px;
      }
    }
    .menu-detail-bottom {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      width: 100%;
      background-color: #ffffff;

      .menu-detail-bottom-date {
        display: flex;
        flex-direction: row;
        margin: 20px 10px;
        background-color: #f4f0f0;
        border-radius: 17px;

        div {
          padding: 6px 10px;
        }
        p {
          margin: 0;
        }
        .menu-detail-bottom-date-menu-type {
          width: 74px;
          background-color: #cf5252;
          border: 1px solid #70707000;
          border-radius: 17px;

          p {
            font-size: 22px;
            color: #ffffff;
            text-align: center;
          }
        }
        .menu-detail-bottom-date-start-end-date {
          width: 100%;
          p {
            font-size: 17px;
            line-height: 35px;
            position: absolute;
          }
        }
      }
      .menu-detail-bottom-contents {
        margin: 0 20px;

        p {
          color: #040404;
          font-size: 28px;
        }
      }
      .menu-detail-bottom-info {
        text-align: right;
        margin: 20px;

        p {
          margin: 0;
        }
        .menu-detail-bottom-info-distance {
          margin-bottom: 10px;

          p {
            font-size: 20px;
            font-weight: bold;
            color: #000000;
          }
        }
        .menu-detail-bottom-info-address {
          margin-bottom: 10px;

          p {
            color: #828282;
            font-size: 22px;
          }
        }
        .menu-detail-bottom-info-phone {
          p {
            font-size: 20px;
            font-weight: bold;
            color: #cf5252;
          }
        }
      }
    }
  }
}
</style>
