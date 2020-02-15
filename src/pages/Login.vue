<template>
  <div class="login-container">
    <div class="login-flex-box">
      <div class="login-logo">
        점심이
      </div>
      <div class="login-input-box">
        <input type="text" :placeholder="idPlaceholder" v-model="userId" />
        <input
          type="password"
          :placeholder="passwordPlaceholder"
          v-model="userPassword"
          @keyup.enter="login"
        />
      </div>
      <button class="login-button" @click="login">로그인</button>
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
    login() {
      if(!this.userId || !this.userPassword) {
        alert('삐.')
      }

      let request = {
        userId: this.userId,
        userPassword: this.userPassword
      }

      this.$api
        .login(request)
        .then(response => {
          switch (response.data.errCode) {
            case 200: {
              this.$store.commit('setUserInfo', response.data);
              this.$router.push({name: 'MenuList'})
              break
            }
            case 400: {
              alert(response.data.msg)
              break
            }
            default: {
              console.log('response.data', response.data)
              alert('로그인이 되지 않습니다. 잠시 후 시도해 주세요')
              break
            }
          }
        })
        .catch(err => {
          console.log('error: ', err)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  font-family: "Hi Melody", cursive;
}

.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  .login-flex-box {
    width: calc(100% - 100px);

    .login-logo {
      width: max-content;
      margin: 0 auto 170px auto;
      font-size: 55px;
      letter-spacing: -6.02px;
      color: #cf5252;
      font-family: "Hi Melody", cursive;
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
      ::placeholder {
        color: #d0d0d0;
      }
      input:focus {
        outline: none;
        color: #f65130;
        border-bottom: solid 1px #f65130;
      }
    }
    .login-button {
      width: 100%;
      height: 58px;
      background: transparent linear-gradient(114deg, #f65130 0%, #e9941a 100%)
        0% 0% no-repeat padding-box;
      border-radius: 13px;
      opacity: 1;
      margin-top: 120px;
      text-align: center;
      font-size: 35px;
      letter-spacing: -3.48px;
      color: #ffffff;
    }
  }
}
</style>
