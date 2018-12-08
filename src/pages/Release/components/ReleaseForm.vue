<template>
</div class=release-form>
  <div class="content">
    <div class="row">
      <div class="row-add">价格</div>
      <div class="row-input">
        <input @input="uploadPrice" v-model="price" class="input-price" type="number" pattern="[0-9]\*" name="price" placeholder="打算卖多少"></input>
      </div>
    </div>
    <div class="row" >
      <div class="row-add">分类</div>
      <div class="row-input">
         <input @click="goto('/classify')" readonly placeholder="分个类卖得快" :value="curCategory"></input>
      </div>
      <div class="row-back">

      </div>


    </div>

    <div class="row">
      <div class="row-add">可面交校区</div>
      <div class="row-input">
        <input @click="getSchool" readonly placeholder="可面交校区" :value="curSchool"></input>
      </div>
      <div class="row-back">

      </div>
    </div>

    <div class="row">
      <div class="row-add">手机号</div>
      <div class="row-input">
        <input @input="uploadPhoneNum" v-model="phoneNum" type="number" oninput="if(value.length>11)value=value.slice(0,11)" name="phoneNum" placeholder="选填" ></input>
      </div>
    </div>
    <div class="row">
      <div class="row-add">QQ号</div>
      <div class="row-input">
        <input @input="uploadQqNum" v-model="qqNum"type="number" maxlength="12" name="qqNum" placeholder="选填" ></input>
      </div>
    </div>
    <div class="row">
      <div class="row-add">微信号</div>
      <div class="row-input">
        <input @input="uploadWxid" v-model="wxid" type="text" maxlength="20" name="wxid" placeholder="选填" ></input>
      </div>
    </div>
  <van-popup v-model="show">
    <ul class=school>
      <li @touchstart="changeStyle" @touchend="uploadSchool"><span>全部校区</span></li>
      <li @touchstart="changeStyle" @touchend="uploadSchool"><span>友谊校区</span></li>
      <li @touchstart="changeStyle" @touchend="uploadSchool"><span>长安校区</span></li>
    </ul>
  </van-popup>
</div>
</template>
<script>

import utils from "../../../utils.js"
export default {
  data() {
    return {
      show: false,
      price:this.myPrice,
      phoneNum:this.myphoneNum,
      wxid:this.mywxid,
      qqNum:this.myQqNum,
      category: this.myClassify,
      school: {
        name: '',
        code: '',
      }
    }
  },
  props:['myPrice','mySchoolName','mySchoolCode','myphoneNum','myQqNum','mywxid','myClassify'],
  watch:{
    myPrice(val){
      this.price = val
    },
    mySchoolName(val){
      this.school.name = val
    },
    mySchoolCode(val){
      this.school.code = val
    },
    myphoneNum(val){
      this.phoneNum = val
    },
    myQqNum(val){
      this.qqNum = val
    },
    mywxid(val){
      this.wxid = val
    },
    myClassify(val){
      this.category = val
    },
  },
  computed:{
    curCategory() {
      for(var i=0;i<this.category.length;i++){
        if(this.category.charAt(i) == ' '){
          break;
        }
      }
      return this.category.substring(0,i)
    },
    curSchool() {
      return this.school.name
    }
  },
  methods: {
    goto (path) {
        this.$router.push(path)
      },
    getSchool () {
      this.show = true
    },
    changeStyle(e){
      e.target.style.backgroundColor = '#aeaeae'
    },
    uploadSchool(e){
      switch(e.target.innerText){
        case "全部校区" : this.school.name = '全部校区';this.school.code = 'quanbuxiaoqu';break;
        case "友谊校区" : this.school.name = '友谊校区';this.school.code = 'youyixiaoqu';break;
        case "长安校区" : this.school.name = '长安校区';this.school.code = 'changanxiaoqu';break;
      }
      this.$emit('getSchool',this.school)
      e.target.style.backgroundColor = '#fff'
      this.show = false
    },
    uploadPrice(){
      this.$emit('getPrice',this.price)
    },
    uploadPhoneNum(){
      this.$emit('getPhoneNum',this.phoneNum)
    },
    uploadQqNum(){
      this.$emit('getQqNum',this.qqNum)
    },
    uploadWxid(){
      this.$emit('getWxid',this.wxid)
    },
  },
  created () {
    this.$root.Bus.$on('getClassify',(msg) => {
      this.category = msg
      this.$emit('getClassify',msg)
    })
  }
}
</script>
<style scoped>
.content{
  height : 8.00rem;
  margin-top : .20rem;
  background-color: #f3f3f7;
}
.row{
  display: flex;
  height: 1.00rem;
  width : 100%;
  margin-bottom:.03rem;
  background: #FFFFFF;
}
.row-add{
  width:2.00rem;
  height: 1.00rem;
  text-align: left;
  padding-left: 3.8%;
  padding-top : .32rem;
  font-size: .30rem;
  font-family: Arial Normal;
}
.row-input{
  width:4.30rem;
  height:1.00rem;
  text-align: left;
  padding-top:.32rem;
  padding-left:.30rem;
  font-size: .30rem;
  color: #808080;
  font-family: Arial Normal;
}
.row-back{
  padding-top : .32rem;
  color : #808080;
  text-align: center;
}
input {
  border: 0;
  outline: none;
}
.input-price{
  color: #f40;
}
.school{
  width: 80vw;
  height: 40vw;
  flex-direction: column;
}
.school li{
  height: 33.333%;
  box-sizing: border-box;
}
.school li+li{
  border-top: 1px solid #e4e4e4;
}
li span{
  line-height: 50px;
  margin-left: 20px;
  font-weight: 500
}
</style>
