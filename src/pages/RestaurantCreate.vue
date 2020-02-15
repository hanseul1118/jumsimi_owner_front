<template>
  <div class="restaurant-create-container">
    <HeaderBar :type="0" class="header-bar"></HeaderBar>
    <div class="restaurant-create-flex-box">
      <div class="restaurant-create-img">
        <input id="file" type="file" ref="file" @change="previewImage" accept="image/*">
        <div>
          <!-- <label for="file">
          </label> -->
          <auto-rotate><img id="preview-image" :src="imageData" @click="imageClick()"></auto-rotate>
        </div>
      </div>
      <div class="restaurant-create-input-box">
        <input type="text"   :placeholder="resNamePlaceholder"      v-model="resName">
        <input type="text"   :placeholder="resOwnersIdPlaceholder"  v-model="resOwnersId">
        <input type="text"   :placeholder="resAddressPlaceholder"   v-model="resAddress">
        <input type="text"   :placeholder="resPhonePlaceholder"     v-model="resPhone">
        <input type="number" :placeholder="resOperTimePlaceholder"  v-model="resOperTime" :maxLength="8" @keydown="checkMaxLength($event.target)">
        <input type="text"   :placeholder="resLatPlaceholder"       v-model="resLat">
        <input type="text"   :placeholder="resLngPlaceholder"       v-model="resLng">
      </div>
    </div>
    <button class="restaurnt-create-button" @click="createRestaurant">식당등록</button>
    <LoadingBar :loading="loading"></LoadingBar>
  </div>
</template>

<script>
  import HeaderBar from "../components/headerBar"
  import LoadingBar from "../components/loadingBar"
  import AutoRotate from "@/components/AutoRotate"
  import { mapGetters } from 'vuex'

  export default {
    components: {
      HeaderBar,
      LoadingBar,
      AutoRotate
    },
    data() {
      return {
        resNamePlaceholder: "식당 이름",
        resOwnersIdPlaceholder: "사장님 아이디",
        resAddressPlaceholder: "식당 주소",
        resPhonePlaceholder: "식당 전화번호",
        resOperTimePlaceholder: "점심 운영시간(숫자 8자리)",
        resLatPlaceholder: "식당 위치(X)",
        resLngPlaceholder: "식당 위치(Y)",
        resName: "",
        resOwnersId: "",
        resAddress: "",
        resPhone: "",
        resOperTime: undefined,
        resLat: "",
        resLng: "",
        restaurantImage: [],
        imageData: 'https://live.staticflickr.com/65535/48580618611_2dab0d71f5_o.jpg',
        file: undefined,
        loading : false,
        rotatedFile: undefined
      }
    },
    computed: mapGetters({
      userId : 'getUserId',
      token : 'getToken'
    }),
    methods: {
      createRestaurant: function() {
        let formData = new FormData();
        
        formData.append('file', this.rotatedFile);
        formData.append('resOwnersId', this.resOwnersId);
        formData.append('restaurantName', this.resName);
        formData.append('restaurantAddress', this.resAddress);
        formData.append('restaurantPhone', this.resPhone);
        formData.append('gpsX', this.resLat);
        formData.append('gpsY', this.resLng);
        formData.append('lunchOperationTime', this.resOperTime);

        this.loading = true //로딩바 활성화

        this.$api.createRestaurant(formData, this.token)
        .then((response) => {
          switch(response.data.errCode) {
            case 200:
              this.$router.replace({ name: 'MenuList' }) 
              this.loading = false // 로딩바 비활성화
              break;
            case 500:
              alert('server err : ', response)
              this.loading = false // 로딩바 비활성화
              console.log('server err : ', response)
              break;
            default:
              alert(response.data.msg)
              console.log('check errCode : ', response.data);
              this.loading = false // 로딩바 비활성화
          }
        })
        .catch((err) => {
          alert(err)
          console.log(err);
          this.loading = false // 로딩바 비활성화
        })
      },
      imageClick() {
        document.getElementById('file').click()
      },
      previewImage: function(event) {
        console.log('event : ', event)
        this.file = this.$refs.file.files[0];
        
        if(!this.file) {
          return;
        }

        this.checkFileSize()

        let reader = new FileReader();

        reader.onload = (e) => {
          let image = new Image();
          image.src = e.target.result;

          image.onload = function() {
            let width = image.width
            let height = image.height
            
            if(width >= height) {
              document.getElementById('preview-image').style.maxWidth = '100%'
              document.getElementById('preview-image').style.height = 'auto'
            } else {
              document.getElementById('preview-image').style.width = '100%'
              document.getElementById('preview-image').style.height = 'auto'
            }
          }

          this.imageData = e.target.result;
        }

        reader.readAsDataURL(this.file);

        let obj = {
          data: new FormData(),
          dataType: this.file.type,
          file: this.file
        }

        obj.data.append('content', this.file, this.file.name)
        this.save(obj)
      },
      save (obj) {
        const getOrientedImage = require('exif-orientation-image')
        let blob = null
        return new Promise((resolve, reject) => {
          getOrientedImage(obj.file, function (err, canvas) {
            if (!err) {
              if (canvas.getContext){
                var ctx = canvas.getContext('2d');
                var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
                var data=imgData.data;
                for(var i=0;i<data.length;i+=4){
                    if(data[i+3]<255){
                        data[i]=255;
                        data[i+1]=255;
                        data[i+2]=255;
                        data[i+3]=255;
                    }
                }
                ctx.putImageData(imgData,0,0);
              }
              canvas.toBlob(function (blob) {
                  resolve(blob)
              }, obj.file.type, 0.92)
            }
            if (err) {
              reject()
            }
          })
        }).then((orientedImageBlob) => {
          blob = orientedImageBlob
          this.imageData = URL.createObjectURL(blob)
          this.rotatedFile = new File([blob], this.file.name, { type: blob.type })
        })
      },
      checkFileSize() {
        var maxSize  = 5 * 1024 * 1024 // 5MB
        var fileSize = 0;
        
        fileSize = parseInt(this.file.size)

        if(fileSize > maxSize) {
          alert("프리뷰 용량은 5MB 보다 작아야 합니다.");
          return;
        }
      },
       checkMaxLength(object){
        if (object.value.length > object.maxLength){
            object.value = object.value.slice(0, object.maxLength);
        }    
      }
    }
  }
</script>

<style lang="scss" scoped>

  .restaurant-create-container {

    .restaurant-create-flex-box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 25px;
      flex-direction: column;

      .restaurant-create-img {
        position: relative;
        display: block;
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
        display: block;
        width: 100%;
        input:first-child {
          margin-top: 10px;
        }
        input:last-child {
          margin-bottom: 50px;
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
        ::placeholder {
          color: #D0D0D0;
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