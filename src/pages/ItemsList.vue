<template>
 <div class=items-list>
    <div v-for="(item,index) in items" class="block" @click="goto(index)">
      <div class="block-header">
        <div class="avatar">
          <div class="avatar-img">
            <img class="img-avatar" :src="item.avatarUrl">
          </div>
          <div class="avatar-span">
            <div class="nickName">
              <span>{{item.nickName}}</span>
            </div>
            <div class="subTime">
              <span>{{item.subTime}}</span>
            </div>
          </div>
        </div>
        <div class="cateTip" :style="{display: (item.category=='求购'? '':'none')}">
          <span>{{item.category}}</span>
        </div>
        <div class="price">
          <span>￥{{item.price}}</span>
        </div>
      </div>
      <div class="block-content" >
        <div class="title">
          <span>{{item.title}}</span>
        </div>
        <div class="image">
        <div v-for="(imgItem,imgIndex) in item.imageUrl">
          <img class="img-image" :src="imgItem">
        </div>
        </div>
      </div>
      <div class="block-footer">
        <span>{{item.school}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default{
  props:{
    items:Array
  },
  methods:{
    goto(index){
      this.$router.push({
        name: 'detail',
        params: {
          id: this.items[index].goods_id
        }
      })
    }
  }
}
</script>

<style scoped>
.items-list{
  background-color: #eee
}
.block{
  z-index: -2;
  height: 3.94rem;
  background: white;
  margin-bottom: .20rem;
}
.block-header{
  z-index: 0;
  height : .96rem;
  position: relative;
  padding-left: .33rem;
}
.cateTip{
  position : absolute;
  margin-top : .30rem;
  padding-left: .10rem;
  padding-right: .10rem;
  height: .40rem;
  right : 2.00rem;
  top : 0rem;
  font-size : .30rem;
  color : white;
  background : #F37F58;
  border-radius: 10%;
}
.price{
  position: absolute;
  padding-top : .22rem;
  right : .30rem;
  top : 0rem;
  font-size: .40rem;
  color : #F5697B;
}
.avatar{
  padding-top : .20rem;
  display: flex;
}
.avatar-text{
  font-size: .23rem;
  padding-left: .10rem;
  padding-top : .08rem;
}
.nickName{
  font-weight: bold;
}
.subTime{
  font-size: 13px;
  color: #99999E;
}
.block-content{
  height : 2.58rem;
  padding-left: .33rem;
}
.title{
  font-size: .30rem;
  font-weight: bold;
}
.image{
  display: flex;
  margin-top : .10rem;
}
.block-footer{
  height : .40rem;
  padding-left: .33rem;
  font-size: 13px;
  color: #99999E;
}

.img-avatar{
  height : .64rem;
  width : .64rem;
  border: .02rem solid black;
  border-radius: 100%;
}
.img-image{
  height: 2.00rem;
  width: 2.00rem;
  margin-right: .20rem;
}
</style>
