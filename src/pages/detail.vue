<template>
  <div class="detail">
    <my-header tag="抛瓜" fixed></my-header>
    <div class="block">
      <div class="block-header">
        <div class="avatar">
          <div class="avatar-img">
            <img class="img-avatar" :src="detail.avatarUrl" >
          </div>
          <div class="avatar-span">
            <div class="nickName">
              <span>{{detail.nickName}}</span>
            </div>
            <div class="subTime">
              <span>{{detail.subTime}}</span>
            </div>
          </div>
        </div>
        <div class="school">
          <span>{{detail.school}}</span>
        </div>
      </div>
      <div class="block-content">
        <div class="title">
          <span>{{detail.title}}</span>
        </div>
        <div class="description">
          <span>{{detail.description}}</span>
        </div>
      </div>
    </div>
    <div class="images" >
        <div v-for="(item,index) in detail.imageUrl">
          <div class="images-div" >
            <img class="img-image" :src="item">
          </div>
        </div>
    </div>
    <div v-if="Object.keys(detail).length" class="contact">
      <div class="row">
        <div class="add">
          <span>手机号</span>
        </div>
        <div class="input">
          <span>{{detail.phoneNum}}</span>
        </div>
        <button
          v-if="detail.phoneNum != '无'"
          v-clipboard="detail.phoneNum"
          class="copy"
          @success="handleSuccess"
          >复制</button>
      </div>
      <div class="row">
        <div class="add">
          <span>微信号</span>
        </div>
        <div class="input">
          <span>{{detail.wxId}}</span>
        </div>
        <button
          v-if="detail.wxId != '无'"
          v-clipboard="detail.wxId"
          class="copy"
          @success="handleSuccess"
          >复制</button>
      </div>
      <div class="row">
        <div class="add">
          <span>QQ号</span>
        </div>
        <div class="input">
          <span>{{detail.qqNum}}</span>
        </div>
        <button
          v-if="detail.qqNum != '无'"
          v-clipboard="detail.qqNum"
          class="copy"
          @success="handleSuccess"
          >复制</button>
      </div>
      <div class="hidden" :style="{height:'1.88rem',backgroundColor:'#eee'}"></div>
    </div>
    <div class="footerFix">
        <div class="price">
            <span>￥{{detail.price}}</span>
        </div>
        <div  @click="collect">
          <div v-if="detail.ifCollect" class="icon">
            <span class="iconfont collect">&#xe646;</span>
          </div>
          <div v-else class="icon">
            <span class="iconfont">&#xe702;</span>
          </div>
        </div>


    </div>
  </div>
</template>

<script>
import utils from '../utils.js'
import MyHeader from '../components/MyHeader.vue'

export default{
  components:{
    MyHeader
  },
  data() {
    return {
      detail: {
      }
    }
  },
  created() {
   this.$axios({
      method:'post',
      url:'/api/paogua/index.php/Home/Shelf/toDetail',
      data:{
        'Mstring': 'ogoHi5FW147DltmY7recr7vpsYEA',
        'goods_id': this.$route.params.id
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
    }).then((res) =>{
      if(!res.data.phoneNum){
        res.data.phoneNum = '无'
      }
      if(!res.data.qqNum){
        res.data.qqNum = '无'
      }
      if(!res.data.wxId){
        res.data.wxId = '无'
      }
      res.data.school = utils.parseSch(res.data.school)
      this.detail = res.data
    })
  },
  mounted() {
  },
  methods:{
    collect(){
      this.$axios({
        method:'post',
        url:'/api/paogua/index.php/Home/Shelf/collect',
        data:{
          'Mstring':'ogoHi5FW147DltmY7recr7vpsYEA',
          'goods_id':this.$route.params.id,
          'ifCollect':this.detail.ifCollect
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
      }).then((res) => {
        if(res.data == '200'){
            this.detail.ifCollect = this.detail.ifCollect ? 0 : 1
        }
      })
    },
    handleSuccess() {
      this.$toast({
        duration: 500,
        message:'复制成功'
      })
    }
  }
}
</script>

<style scoped>
.block{
  margin-top: 7vh;
  width : 90%;
  padding-left: 5%;
  padding-right: 5%;
  background: white;
}
.block-header{
  height : .96rem;
  position: relative;
}
.avatar{
  padding-top : .20rem;
  display: flex;
}
.avatar-text{
  font-size: 11px;
  padding-left: .10rem;
}
.nickName{
  font-weight: bold;
}
.subTime{
  color: #99999E;
}
.block-content{
  padding-bottom: .20rem;
}
.title{
  font-size: 19px;
  font-weight: bold;
}
.description{
  font-size: .30rem;
}
.school{
  position: absolute;
  background: #F47F59;
  height : .44rem;
  width : 1.24rem;
  right : .20rem;
  top : .20rem;
  font-size: .26rem;
  text-align: center;
  border-radius: 8%;
  color :white;
}

.img-avatar{
  height : .64rem;
  width : .64rem;
  border: .02rem solid black;
  border-radius: 100%;
}
.images{
/*   position: relative;
  top :1rem;
  left: 0rem; */
  background:  white;
  width : 100%;
  padding-bottom: .10rem;
}
.img-image{
  background: white;
  width:90%;
  margin-left: 5%;
  margin-right: 5%;
}

/* contact */
.contact{
  position: relative;
  top :0rem;
  left: 0rem;
  padding-top : .30rem;
  height: 3.09rem;
  background-color: #eee
}
.row{
  display: flex;
  background : #FFFFFF;
  margin-bottom: .03rem;
  height: 1.00rem;
  position: relative;
}
.add{
  margin-left : 5%;
  margin-top:.30rem;
  height: .70rem;
  width : 20%;
  font-size: 15px;

}
.input{
  height: .70rem;
  margin-top : .30rem;
  font-size: .30rem;
}
.display{
  display: none
}
.copy{
  position: absolute;
  right: .80rem;
  color: white;
  background : #F47F59;
  text-align: center;
  font-size: .30rem;
  margin-top : .30rem;
  height: .44rem;
  width : .90rem;
  border-radius: 10%;
  float: right;
  margin-left: .40rem;
}
/* footer */
.footerFix{
  width : 100%;
  position : fixed;
  bottom : 0;
  height: 1rem;
  background-color: white;
}
.price{
  position: absolute;
  text-align: center;
  right: 5px;
}
.price>span{
   font-size: 22px;
   color : #F5697B;
   line-height: 1rem;
}
.icon{
  position: absolute;
  left: 2px;
  top : 0rem;
  height: 1rem;
  width: 1rem;
  text-align: center;

}
.iconfont{
    font-size: 28px;
    line-height: 1rem;
}
.collect{
  color: #F36778;
}
</style>
