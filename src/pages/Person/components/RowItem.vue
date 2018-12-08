<template>
  <div class="content">
    <div class="row" @click="goto('/myRelease')">
      <span class="row_icon">
        <i class="iconfont">&#xe621;</i>
      </span>
      <span class="row_text">我的发布</span>
    </div>
    <div class="row" @click="goto('/myCollect')">
      <span class="row_icon">
        <i class="iconfont">&#xe646;</i>
      </span>
      <span class="row_text">我的收藏</span>
    </div>
    <div class="row">
      <span class="row_icon">
        <i class="iconfont">&#xe641;</i>
      </span>
      <span class="row_text">个人信息</span>
    </div>
    <div class="row">
      <span class="row_icon">
        <i class="iconfont">&#xe65d;</i>
      </span>
      <span class="row_text">意见反馈</span>
    </div>
    <div class="row">
      <span class="row_icon">
        <i class="iconfont">&#xe61b;</i>
      </span>
      <span class="row_text">联系我们</span>
    </div>
  </div>
</template>

<script>
export default{
  methods:{
    goto(path){
      this.$router.push(path)
    }
  }
}
</script>

<style style="stylus" scoped>
.content{
  border-top: 6px solid #f3f3f7;
}
.row{
  height: 1.3rem;
  background-color: white;
  box-sizing: content-box;
  line-height: 1.3rem;
}
.content .row:nth-child(2){
  border-top: 1px solid #e4e4e4;
  border-bottom: 10px solid #f3f3f7;
}
.content .row:nth-child(n+4){
  border-top: 1px solid #e4e4e4;
}
.iconfont{
  font-size:.58rem;
  color : #F36778;
  margin-left: .4rem;
  margin-right: .3rem;
  vertical-align:middle;
}
.row_text{

}
</style>
