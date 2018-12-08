<template>
  <div class="head" :style="{'position':fixed ? 'fixed' : 'static'}">
    <div class="back" @click="comBack">
      <img src="../assets/images/back.png" alt="">
    </div>
    <div class="title">{{tag}}</div>
  </div>
</template>

<script>
  export default {
    props:{
      tag : {
        type : String,
        dafault : ''
      },
      fixed : {
        type : Boolean,
        dafault : false
      }
    },
    methods : {
      comBack () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
.head {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f8f8f8;
  top: 0;
  left: 0;
  right: 0;
  height: 7vh;
  z-index: 999;
  background-color: #fff;
}
.back {
  display: flex;
  align-items: center;
  height: .8rem;
  width: .8rem;
}
.back img{
  height: 70%;
}
.title {
  font-size : 20px;
  margin-left : -12px;
}

</style>
