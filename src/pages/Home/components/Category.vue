<template>
  <div class="container">
    <div class="backimg">
      <img class="back_img" src="../../../assets/images/home_images/home_airplane.png">
    </div>
    <div class="category_wraper">
      <div class="category">
        <div v-for="(item,index) in categoryItems" class="category_item" @click="toFilter(item.desc,item.code)">
          <img class="item_icon" :src="item.src">
          <span class="desc">{{item.desc}}</span>
        </div>
      </div>
      <div class="fresh">
        <span class="fresh_icon">|</span>
        <span class="fresh_text">最新鲜</span>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return {
      categoryItems:[{
        src:require("../../../assets/images/home_images/SHYP.png"),
        desc:"生活用品",
        code:"shenghuoyongpin"
      },{
        src:require("../../../assets/images/home_images/JCXX.png"),
        desc:"书籍学习",
        code:"shujixuexi"
      },{
        src:require("../../../assets/images/home_images/SMCP.png"),
        desc:"数码产品",
        code:"shumachanpin"
      },{
        src:require("../../../assets/images/home_images/FZXB.png"),
        desc:"服装鞋包",
        code:"fuzhuangxiebao"
      },{
        src:require("../../../assets/images/home_images/HCD.png"),
        desc:"好吃的",
        code:"haochide"
      },{
        src:require("../../../assets/images/home_images/MZYH.png"),
        desc:"美妆美护",
        code:"meizhuangmeihu"
      },{
        src:require("../../../assets/images/home_images/XFW.png"),
        desc:"小服务",
        code:"xiaofuwu"
      },{
        src:require("../../../assets/images/home_images/QG.png"),
        desc:"求购",
        code:"qiugou"
         }
      ]
    }
  },
  methods:{
    toFilter(desc,code){
      if(code != 'haochide'){
        desc = desc + '-全部'
        code = code + '-quanbu'
      }
      this.$router.push({
        name:'filter',
        params:{
          classify:desc,
          code:code
        }
      })
    }
  }
}
</script>

<style scoped>
.category_wraper{
  position: relative;
  top: -1.2rem;
  height: 2.8rem;
}
.category{
  width : 6.94rem;
  height : 3.24rem;
  background-color: rgba(0,0,0,.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  padding: 10px 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 6px #C1C1C1;
  -moz-box-shadow: 0 0 6px #C1C1C1;
  margin: 0 auto 10px auto;
}

.category_item{
  width: 21%;
  height: 40%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color : #858585;
}
.item_icon{
  width: 70%;
  margin-bottom: -5px;
}
.fresh{
  width: 6.94rem;
  margin: 0 auto ;
}
.fresh_icon{
  vertical-align:text-top;
  color: #F36778;
  font-weight: 500;
}
.fresh_text{
  font-weight: 700;
}
</style>
