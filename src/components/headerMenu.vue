<template>
    <div class="header-menu-container">
        <div class="header-txt">
            점심이
        </div>
        <div class="header-menu-img-container">
            <img src="@/assets/arrow_down.png">
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .header-menu-container{
        position: relative;
        .header-txt{
            text-align: center;
            color: #F65130;
        }
        .header-menu-img-container{
            width: 18px;
            height: 11px;
            position: absolute;
            top: 0px;
            right: 5px;
            img {
                 width: 18px;
                height: 11px;
            }
        }
        
    }
</style>