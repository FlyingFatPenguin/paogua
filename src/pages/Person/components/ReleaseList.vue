<template>
 <div class=items-list>
    <div v-for="(item,index) in items" class="block" @click="$emit('myDetail',item.goods_id,index)">
      <div class="top">
        <div class="top-l">
          <img class="img-image" :src="item.imageUrl">
        </div>
        <div class="top-r">
          <div class="title">
            <span>{{item.title}}</span>
          </div>
          <div class="category">
            <span>{{item.category}}</span>
          </div>
          <div class="price">
            <span>￥{{item.price}}</span>
          </div>
          <div class="tip">
            <span>{{item.tip}}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <button @click.stop="$emit('myDelete',item.goods_id,index)">删除</button>
        <button @click.stop="$emit('myPolish',item.goods_id,index)">擦亮</button>
        <button @click.stop="$emit('myEdit',item.goods_id,index)">编辑</button>
      </div>
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
    },
    removeCollect(goods_id,index){
      this.$emit('removeCollect',index)
      this.$axios({
        method:'post',
        url:'/api/paogua/index.php/Home/Shelf/collect',
        data:{
          'Mstring':'ogoHi5FW147DltmY7recr7vpsYEA',
          'goods_id': goods_id,
          'ifCollect': 1
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
      })
    }
  }
}
</script>

<style scoped>
.items-list{
  margin-top: 7vh;
  background-color: #f3f5f9;
  padding: .20rem;
}
.block{
  height: 23vh;
  margin-bottom: .20rem;
  background-color: white;
  box-sizing: border-box;
  padding: .24rem;
  box-shadow: .01rem .01rem .02rem #ccc
}
.top{
  box-sizing: border-box;
  border-bottom: .005rem solid #eee
}
.top>div{
  float: left;
}
.top::after {
   content:"";
   display: block;
   clear:both;
}
.img-image{
  height: 26vw;
  width: 26vw;
}
.top-r{
  width: 60vw;
  position: relative;
  height: 28vw;
  margin-left: 2vw;
}
.title{
  font-weight: 500;
  font-size: 16px;
}
.category{
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  font-size: 12px;
}
.price{
  position: absolute;
  bottom: .08rem;
  color: #f40;
}
.tip{
  position: absolute;
  right: 0;
  bottom: .08rem;
  font-size: 10px;
  color : #9DACB1
}
.bottom{
  padding-top: .12rem;
}
.bottom>button{
  width: 12vw;
  height: 6vw;
  border: 0.01rem solid #000;
  font-size: 12px;
  color: #333;
}
.bottom>button:nth-of-type(2){
  margin-left: 44vw;
  margin-right: 3vw;
}
</style>
