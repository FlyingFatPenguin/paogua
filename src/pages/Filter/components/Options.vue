<template>
  <div>
    <div class="options">
      <div @click="choose=1" class="option-school">
        <span>{{school}}</span>
        <i class="iconfont">&#xe607;</i>
      </div>
      <div @click="choose=2" class="option-sort">
        <span>{{sortBy}}</span>
        <i class="iconfont">&#xe607;</i>
      </div>
      <div @click="choose=3" class="option-classify">
        <span>{{classify}}</span>
        <i class="iconfont">&#xe607;</i>
      </div>
    </div>
    <div v-if="choose == 1" class="content-school">
      <ul>
        <li v-for="(item,index) in schoolList" @click="chooseSchool(item,index)">{{item}}</li>
      </ul>
    </div>
    <div v-if="choose == 2" class="content-order">
      <ul>
        <li v-for="(item,index) in sortByList" @click="chooseSort(item,index)">{{item}}</li>
      </ul>
    </div>
    <div v-if="choose == 3" class='classify'>
      <div class='container'>
        <ul class='left_part'>
          <li v-for="(item,index) in navItem" :key="item.id">
            <div v-text="item.name" class="nav_left_item" :class="curNav == item.id ? 'active':''" @click="switchRight(item.id)" >
            </div>
          </li>
        </ul>
        <ul class='right_part'  v:if="navItem[curNav-1].is_child">
          <li v-for="(item,index) in navItem[curNav-1].child_nav">
            <div class="nav_part" @click="backCate(item.cid)">
              <div class='cname'>{{item.cname}}</div>
              <div class='content'>{{item.content}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="choose" class="mask" @click="choose=0"></div>
  </div>
</template>
<script>
  var navItem = [{
        id: 1,
        name: "生活用品",
        code : "shenghuoyongpin",
        is_child: true,
        child_nav: [{
          cid:1,
          cname: "全部",
          ccode : "quanbu",
          content: "全部生活用品"
        },{
          cid: 2,
          cname: "用电的",
          ccode : "yongdiande",
          content: "电吹风、小电扇、体重计、空气净化器等"
        },
        {
          cid: 3,
          cname: "不用电的",
          ccode : "buyongdiande",
          content: "脸盆、搓衣板、洗衣粉、撑衣杆等"
        },
        {
          cid: 4,
          cname: "运动用品",
          ccode : "yundongyongpin",
          content: "哑铃、瑜伽垫、健身用品等"
        },
        {
          cid: 5,
          cname: "代步工具",
          ccode : "daibugongju",
          content: "自行车、滑板、溜冰鞋等"
        },
        ]

      }, {
        id: 2,
        name: "书籍学习",
        code : "shujixuexi",
        is_child: true,

        child_nav: [{
          cid:1,
          cname: "全部",
          ccode : "quanbu",
          content: "全部书籍学习"
        },{
          cid:2,
          cname: "教材",
          ccode : "jiaocai",
          content: "课内教材"
        },
        {
          cid: 3,
          cname: "其他书籍",
          ccode : "qitashuju",
          content: "非课内教材等"
        },
        {
          cid: 4,
          cname: "乐器",
          ccode : "yueqi",
          content: "吉他、口风琴等"
        },
        {
          cid: 5,
          cname: "学习用品",
          ccode: "xuexiyongpin",
          content: "电子元器件、单片机、文具、计算器的等"
        },
        {
          cid: 6,
          cname: "电子资料",
          ccode : "dianziziliao",
          content: "PDF电子书、听力材料、软件等"
        }
        ]

      }, {
        id: 3,
        name: "数码产品",
        code : "shumachanpin",
        is_child: true,
        child_nav: [{
          cid:1,
          cname: "全部",
          ccode : "quanbu",
          content: "全部数码产品"
        },{
          cid: 2,
          cname: "手机/平板",
          ccode: "shouji/pingban",
          content: "手机、平板电脑等"
        },
        {
          cid: 3,
          cname: "电脑/显示器",
          ccode : "diannao/xianshiqi",
          content: "笔记本、台式机、显卡、显示器等"
        },
        {
          cid: 4,
          cname: "摄影器材",
          ccode: "sheyingqicai",
          content: "单反、微单、三脚架、摄影包等"
        },
        {
          cid: 5,
          cname: "音响/耳机",
          ccode : "yinxiang/erji",
          content: "实打实的音响或者耳机"
        },
        {
          cid: 6,
          cname: "游戏相关",
          ccode : "youxixiangguan",
          content: "游戏光盘、虚拟游戏物品等"
        }
        ]

      }, {
        id: 4,
        name: "服装鞋包",
        code : "fuzhuangxiebao",
        is_child: true,
        child_nav: [{
          cid: 1,
          cname: "全部",
          ccode : "quanbu",
          content: "全部服装鞋包"
        },{
          cid: 2,
          cname: "女装",
          ccode : "nvzhuang",
          content: ""
        },
        {
          cid: 3,
          cname: "女鞋",
          ccode : "nvxie",
          content: ""
        },
        {
          cid: 4,
          cname: "女包",
          ccode: "nvbao",
          content: ""
        },
        {
          cid: 5,
          cname: "男装",
          ccode : "nanzhuang",
          content: ""
        },
        {
          cid: 6,
          cname: "男鞋",
          ccode : "nanxie",
          content: ""
        },
        {
          cid: 7,
          cname: "男包",
          ccode : "nanbao",
          content: ""
        },
        {
          cid: 8,
          cname: "帽子",
          ccode : "maozi",
          content: ""
        },
        {
          cid: 8,
          cname: "饰品",
          ccode : "shipin",
          content: ""
        }
        ]

      }, {
        id: 5,
        name: "好吃的",
        code : "haochide",
        is_child: false,
        child_nav: [
        ]

      }, {
        id: 6,
        name: "美妆养护",
        code : "meizhuangmeihu",
        is_child: true,
        child_nav: [{
          cid:1,
          cname: "全部",
          ccode : "quanbu",
          content: "全部美妆养护"
        },{
          cid: 2,
          cname: "护肤",
          ccode : "hufu",
          content: ""
        },
        {
          cid: 3,
          cname: "底妆",
          ccode : "dizhuang",
          content: ""
        },
        {
          cid: 4,
          cname: "彩妆",
          ccode : "caizhuang",
          content: ""
        },
        {
          cid: 5,
          cname: "口红",
          ccode : "kouhong",
          content: ""
        },
        {
          cid: 6,
          cname: "香水",
          ccode : "xiangshui",
          content: ""
        },
        {
          cid: 7,
          cname: "指甲油",
          ccode : "zhijiayou",
          content: ""
        },
        {
          cid: 8,
          cname: "医药保健",
          ccode : "yiyaobaojian",
          content: ""
        }
        ]

      }, {
        id: 7,
        name: "小服务",
        code : "xiaofuwu",
        is_child: true,
        child_nav: [{
          cid: 1,
          cname: "全部",
          ccode : "quanbu",
          content: "全部小服务"
        },{
          cid: 2,
          cname: "摄影摄像航拍",
          ccode: "sheyingshexianghangpai",
          content: ""
        },
        {
          cid: 3,
          cname: "长期代取快递",
          ccode : "changqidaiqukuaidi",
          content: ""
        },
        {
          cid: 4,
          cname: "课业辅导",
          ccode : "keyefudao",
          content: ""
        },
        {
          cid: 5,
          cname: "美妆美甲",
          ccode : "meizhuangmeijia",
          content: ""
        },
        {
          cid: 6,
          cname: "市区代购",
          ccode : "shiqudaigou",
          content: ""
        },

        ]

      }, {
        id: 8,
        name: "求购",
        code : "qiugou",
        is_child: true,
        child_nav: [{
          cid: 1,
          cname: "生活用品",
          ccode : "shenghuoyongpin",
          content: "日常用品、运动用品、代步工具等"
        },
        {
          cid: 2,
          cname: "书籍学习",
          ccode : "shujixuexi",
          content: "教材、图书、电子元器件、乐器等"
        },
        {
          cid: 3,
          cname: "数码产品",
          ccode : "shumachanpin",
          content: "手机、电脑、耳机、相机、游戏相关等"
        },
        {
          cid: 4,
          cname: "服装鞋包",
          ccode : "fuzhuangxiebao",
          content: "男女装、包、帽子、饰品等"
        },
        {
          cid: 5,
          cname: "好吃的",
          ccode : "haochide",
          content: "对啊就真的很好吃"
        },
        {
          cid: 6,
          cname: "美妆养护",
          ccode : "meizhuangmeihu",
          content: "护肤、底妆、彩妆、口红、香水等"
        },
        {
          cid: 7,
          cname: "求帮忙",
          ccode: "qiubangmang",
          content: "认真的求帮忙"
        }
        ]
      }]
export default{
  data() {
    return {
      choose: 0,
      schoolList: ['全部校区','友谊校区','长安校区'],
      sortByList: ['最近发布','价格最低','价格最高'],
      navItem : navItem,
      curNav: 1,
      curChild: 1,
      school: '全部校区',
      sortBy: '最新发布',
      classify:this.classifyTemp
    }
  },
  props:{
    classifyTemp:String
  },
  methods:{
    chooseSchool(item,index) {
      this.$emit('getSchool',index)
      this.school = item
      this.choose = 0
    },
    chooseSort(item,index) {
      this.$emit('getSort',index)
      this.sortBy = item
      this.choose = 0
    },



    switchRight (id) {
      if(this.navItem[id-1].is_child){
        this.curNav = id
      }
      else{
        var category = this.navItem[id-1].name+" "+this.navItem[id-1].code
        this.classify = this.navItem[id-1].name
        this.choose = 0
        this.$emit('getClassify',this.navItem[id-1].code)
      }
    },
    backCate : function(cid){
      var pNav  = this.curNav
      var pName = this.navItem[pNav-1].name
      var pCode = this.navItem[pNav-1].code
      var childName = this.navItem[pNav-1].child_nav[cid-1].cname
      var childCode = this.navItem[pNav-1].child_nav[cid-1].ccode
      var category = pName+"-"+childName+" "+pCode+"-"+childCode
      this.classify = pName + '-' + childName
      this.choose = 0
      this.$emit('getClassify',pCode+"-"+childCode)
    },
  },
  mounted() {

  },
  created() {
  }
}

</script>
<style scoped>
.options{
  margin-top: 7vh;
  width: 100%;
  height: 6vh;
  border-color: #FFF;
}
.options>div:first-child{
  margin-left: 5%;
}
.options>div{
  float: left;
  line-height: .8rem;
  margin-right: .2rem;
}
.iconfont{
  color: #aaa;
  margin-left: -0.08rem;
}
.content-school{
  position: absolute;
  top: 1.8rem;
  width: 100%;
  height: 3rem;
  background-color: #eee;
  z-index: 999
}
.content-school ul{
  width: 100%;
  height: 100%;
}
.content-school ul li{
  width: 100%;
  height: 1rem;
  text-align: center;
  line-height: 1rem
}
.content-order{
  position: absolute;
  top: 1.8rem;
  width: 100%;
  height: 3rem;
  background-color: #eee;
  z-index: 999
}
.content-order ul{
  width: 100%;
  height: 100%;
}
.content-order ul li{
  width: 100%;
  height: 1rem;
  text-align: center;
  line-height: 1rem
}


.classify{
  height: 70vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1.8rem;
  width: 100%;
  z-index: 999
}
.container {
  flex: 1;
  position: relative;
}

.left_part {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 30%;
  height: 100%;
  background-color: #f5f5f5;
  text-align: center;
}

.right_part {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 70%;
  background-color: #fafafa;
}

.nav_left_item {
  height: 1.1rem;
  text-align: center;
  font-size: .3rem;
  line-height: 1rem;
}

.active {
  color: red;
  background-color: #fafafa;
}
.nav_part
{
  height: .9rem;
  display: block;
  margin-top: .15rem;
  margin-left: .3rem;
  padding-top: .05rem;
}
.cname
{
  font-size: .3rem;
  width: 100%;
  display: block;
}
.content
{
  font-size: .2rem;
  color: #949494;
  width: 100%;
  display: block;
}
.mask{
  position: absolute;
  top: 1.8rem;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(66,66,66,0.4);
  z-index: 666
}
</style>
