<template>
  <div class="top">
    <p class="title">抛瓜</p>
    <div class="top-avater">
      <img class=avatar :src="info.avatarUrl">
    </div>
    <p class="name">{{info.nickName}}</p>
    <p class="subs">你已经抛出了{{info.subs}}个瓜哦</p>
  </div>
</template>

<script>
export default{
  data () {
    return {
      info:{}
    }
  },
  methods: {
    getInfo () {
      this.$axios({
        method:'post',
        url:'/api/paogua/index.php/Home/Self/getSelf',
        data:{
          'Mstring':'ogoHi5FW147DltmY7recr7vpsYEA'
        },
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        },
        transformRequest:[function(obj){
      　　　　var str = [];
      　　　　for(var p in obj){
      　　　　　str.push(encodeURIComponent(p) + "="
      　　　　　+ encodeURIComponent(obj[p]));
      　　　　}
      　　　　return str.join("&");
      　}]
      }).then(this.getInfoSucc)
    },
    getInfoSucc (res) {
      this.info = res.data
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>

<style scoped>
.top{
  height:3.9rem;
  background: linear-gradient(#F47F59,#F36778);
}
p{
  text-align: center
}
.title{
  padding-top: 0.15rem;
  font-size: 25px;
  color : white;
  margin-bottom : 0.35rem;
}
.top-avater{

  height:1.3rem;
  width: 1.3rem;
  margin: 0 auto;
}
.avatar{
   border-radius: 50%
}
.name{
  font-size: 20px;
  color: white;
  margin: 3px;
}
.subs{
  font-size: 16px;
  color: white;
}
</style>
