<template>
  <div class="login-container">
    <div class="login-flex-box">
      <div class="login-logo">
        점심이
      </div>
      <div class="login-input-box">
        <input type="text" :placeholder=idPlaceholder v-model=userId>
        <input type="password" :placeholder=passwordPlaceholder v-model=userPassword>
      </div>
      <button class="login-button" @click=login>로그인</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idPlaceholder: "아이디",
      passwordPlaceholder: "비밀번호",
      userId: "",
      userPassword: ""
    };
  },
  methods: {
    login: function() {
      let userId = this.userId;
      let userPassword = this.userPassword;
      
      console.log('userId: ', userId, 'userPassword: ', userPassword);
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Hi+Melody&display=swap');
button {
  font-family: 'Hi Melody', cursive;
}

.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  font-family: 'Hi Melody', cursive;
  .login-flex-box {
    width: calc(100% - 100px);

    .login-logo {
      width: max-content;
      margin: 0 auto 170px auto;
      font-size: 55px;
      letter-spacing: -6.02px;
      color: #CF5252;
    }
    .login-input-box {
      input:first-child {
        margin-bottom: 10px;
      }
      input {
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
    .login-button {
      width: 100%;
      height: 58px;
      background: transparent linear-gradient(114deg, #F65130 0%, #E9941A 100%) 0% 0% no-repeat padding-box;
      border-radius: 13px;
      opacity: 1;
      margin-top: 120px;
      text-align: center;
      font-size: 35px;
      letter-spacing: -3.48px;
      color: #FFFFFF;
    }
  }
}
</style>