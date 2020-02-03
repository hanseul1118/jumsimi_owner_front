<template>
  <div class="menu-update-container">
    <header-bar :type=1></header-bar>
    <div class="menu-update-body">
      <div class="menu-top">
        <img class="menu-img"/>
      </div>
      <div class="menu-type-bar">
        <div class="type-day">매일</div>
        <div class="type-week">주간</div>
        <div class="type-month">월간</div>
      </div>
      <div class="menu-input">
        <div class="start-date">시작일
          <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
              <input id="startpicker-input" type="text" aria-label="Date">
              <span class="tui-ico-date"></span>
              <div id="startpicker-container" style="margin-left: -1px;"></div>
          </div>
        </div>
        <div class="end-date">종료일
          <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
              <input id="endpicker-input" type="text" aria-label="Date">
              <span class="tui-ico-date"></span>
              <div id="endpicker-container" style="margin-left: -1px;"></div>
          </div>
        </div>
        <div class="menu-price">
          <input>
          원</div>
      </div>
      <div class="menu-textarea">
        <textarea></textarea>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from "../components/headerBar"

  export default {
    mounted(){

        let today = new Date();
        let picker = this.$datePicker.createRangePicker({
            startpicker: {
                date: today,
                input: '#startpicker-input',
                container: '#startpicker-container'
            },
            endpicker: {
                date: today,
                input: '#endpicker-input',
                container: '#endpicker-container'
            },
            selectableRanges: [
                [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
            ]
        });

        console.log('picker', picker)

    },
    components:{
      HeaderBar
    }
  };
</script>

<style lang="scss" scoped>

.menu-update-container {
  .menu-update-body{
    width:90%;
    margin: 0 auto;
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
      div{
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
        background-color: #CF5252;
        color:white;
      }
      .type-month{
        border-radius: 0 19px 19px 0;
        border-left: none;
      }
    }
    .menu-input{
      clear: both;

      div{
          border-bottom: 1px solid #D9D8D8;
          width:100%; 
          padding: 10px;
          color: #000000;
          font-size:22px;
        input{
          border: none;
          width: calc(100% - 110px);
          margin-left:30px;
        }
      }

      .start-date{
        border-top:1px solid #D9D8D8;
        // border-top:1px solid #D9D8D8;
      }
    }
    .menu-textarea{
      textarea{
        width:100%;
        height:115px;
        margin-top: 21px;
        resize: none;
        border: 1px solid #D9D8D8;
      }
    }
  }
}
</style>