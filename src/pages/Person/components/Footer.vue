<template>
  <div>
    <footer>
      <div class="base">
        <div class="footer_item" @click="goto('/home')" :class="{on:isCurrent('/home')}">
          <span class="item_icon">
            <i class="iconfont">&#xe72c;</i>
          </span>
          <span class="words">货架</span>
        </div>
        <div class="footer_item" @click="goto('/person')" :class="{on:isCurrent('/person')}">
          <span class="item_icon">
            <i class="iconfont">&#xe8a0;</i>
          </span>
          <span class="words">我的</span>
        </div>
      </div>
      <div class="add" @click="goto('/release')">
        <span class="item_icon">
            <i class="iconfont icon_add">&#xe659;</i>
        </span>
      </div>
    </footer>
  </div>
</template>
<script>
export default{
  methods:{
    goto(path) {
      if(path == '/release'){
        this.$router.push(path);
      }else{
        this.$router.replace(path);
      }
    },
    isCurrent(path){
      return this.$route.path === path
    }
  }
}
</script>

<style lang='stylus' scoped>
footer{
  position: fixed;
  z-index: 100;
  bottom: 0;
  width: 100%;
  height: .94rem;
  background: white;
  box-shadow: 0px -5px 10px #E0E0E0;
}
.base{
  height:100%
  display: flex;
  display: -webkit-flex;
  justify-content: space-between
}
.footer_item{
  width: 33%
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.iconfont{
  font-size: 30px;
}
.words{
  margin-top: -.1rem;
  font-size: 10px
}
.add{
  position: fixed;
  bottom: .2rem;
  left: 50%;
  transform:translateX(-50%);
  height: 1.3rem;
  width: 1.3rem;
  background: white;
  -webkit-border-radius:50%;
  -moz-border-radius:50%;
  border-radius: 50%;
  box-shadow: 0px -5px 10px 0 #E0E0E0;;
  // -webkit-appearance: none;
  color : #F36778;
  text-align: center;
  z-index:100;
}
.icon_add{
  font-size:1.2rem;
}
.on{
  color : #F36778;
}
</style>
