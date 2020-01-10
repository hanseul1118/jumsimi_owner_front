<template>
  <div class="menu-detail-container">
      <header-bar class="header-bar" :type="3"></header-bar>
      <div class="menu-detail-flex-box">

        <div class="menu-detail-top">
          <div class="menu-detail-top-left">
            <p>{{title}}</p>
            <p>점심시간 {{operationTime}}</p>
          </div>
          <div class="menu-detail-top-right">
            <img/>
          </div>
        </div>

        <div class="menu-detail-middle">

        </div>

        <div class="menu-detail-bottom">

        </div>

      </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/headerBar'

export default {
    components:{
        HeaderBar
    },
    data() {
      return {
        title: "종로타워 한식부페 미담",
        operationTime: "10:30 - 14:30"
      }
    }
}
</script>

<style lang="scss" scoped>
.menu-detail-container {
  .menu-detail-flex-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 25px;
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
        background-color: red;
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

    }
    .menu-detail-bottom {

    }
  }
}
</style>