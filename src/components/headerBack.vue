<template>
    <div class="header-basic-container">
        <div class="back-btn" @click="goBack()">뒤로</div>
        <div class="header-txt">
            점심이
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            goBack(){
                history.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header-basic-container{
        position: relative;

        .back-btn{
            position: absolute;
            top: 0px;
            left: 4px;
            cursor: pointer;
        }
        .header-txt{
            text-align: center;
            color: #F65130;
        }
    }
</style>