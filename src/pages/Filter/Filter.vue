<template>
  <div class="filter">
    <my-header tag="抛瓜" fixed></my-header>
    <my-options
      :classifyTemp="$route.params.classify"
      @getSchool="setSchool"
      @getSort="setSort"
      @getClassify="setClassify"
    ></my-options>
    <div class="home" ref="home">
      <div class="scroll" ref="scroll">
        <div class="top-tip">
            <span class="refresh-hook">{{pulldownMsg}}</span>
        </div>
        <div class="wraper" ref="wraper">
          <item-list :items="items"></item-list>
        </div>
        <div class="bottom-tip">
            <span class="loading-hook">{{pullupMsg}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import utils from "../../utils.js"
import BScroll from 'better-scroll'
import MyHeader from '../../components/MyHeader.vue'
import MyOptions from './components/Options.vue'
import ItemList from '../ItemsList.vue'

export default{
  name:'my-filter',
  components:{
    MyHeader,
    MyOptions,
    ItemList,
  },
  data(){
    return {
      items: [],
      page: 1,
      pulldownMsg: '下拉刷新',
      pullupMsg: '加载更多',
      alertHook: false,
      schoolCode: 0,
      sortCode: 0,
      classifyCode: this.$route.params.code,
    }
  },
  created() {
    this.loadData(this.page,true)
  },
  mounted() {

  },
  methods: {
    setSchool(ref){
      this.schoolCode = ref
      this.loadData(1,true)
    },
    setSort(ref){
      this.sortCode = ref
      this.loadData(1,true)
    },
    setClassify(ref){
      this.classifyCode = ref
      this.loadData(1,true)
    },
    loadData(limit,fresh) {
      this.requestData(limit,fresh).then(() => {
      this.$nextTick(() => {
        if(!this.scroll){
            this.scroll = new BScroll(this.$refs.home, {
                probeType: 1,
                click: true
            })
            this.scroll.on('scroll',(pos) => {
              if(pos.y<10 ){
                this.pulldownMsg = '下拉刷新'
              }
              if(pos.y>40){
                  this.pulldownMsg = '释放立即刷新'
              }
            })
            this.scroll.on('touchEnd', (pos) => {
              if(pos.y>40) {
                this.page = 1
                this.loadData(this.page,false)
              }
              if(pos.y<(this.scroll.maxScrollY-30)){
                  this.page++
                  this.loadData(this.page,false)
              }
            })
          }else {
            this.scroll.refresh()
          }
      })
    })
    },
    requestData(limit,fresh) {
      let p = new Promise((resolve,reject) => {
        this.$axios({
          method:'post',
          url:'/api/paogua/index.php/Home/Shelf/Pfilter',
          data:{
            'Mstring':'ogoHi5FW147DltmY7recr7vpsYEA',
            'limit': limit.toString(),
            'school': this.schoolCode,
            'ftype': this.sortCode,
            'category': this.classifyCode
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
          console.log(res.data)
          if(res.data.length){
            this.alertHook = false
            for(var i=0;i<res.data.length;i++) {
              res.data[i].school = utils.parseSch(res.data[i].school)
              if(limit != 1){
                this.items.push(res.data[i])
              }else{
                if(i==0) {
                  this.items.splice(0,this.items.length)
                }
                this.items.push(res.data[i])
              }
            }
          }else {
            this.alertHook = true
            if(fresh){
              this.items.splice(0,this.items.length)
              this.$toast({
                duration: 1000,
                message:'这里是空的'
              })
            }
            else{
              this.pullupMsg = '已经到底啦'
              this.$toast({
                duration: 1000,
                message:'已经到底啦'
              })
            }
          }
          resolve('')
        })
      })
      return p
    }
  }
}
</script>

<style scoped>

.home{
  width: 100vw;
  height: 87vh;
  overflow: hidden;
}
.scroll{
  min-height: 87vh;
}
.top-tip{
  position: absolute;
  top: -50vh;
  left: 0;
  z-index: -1;
  width: 100%;
  height:50vh;
  background-color:rgba(32,32,32,.9);
}
.refresh-hook{
  position: absolute;
  line-height:40px;
  color: #eee;
  bottom: 0;
  left: 40vw;
}
.loading-hook{
  position: absolute;
  line-height:40px;
  color: #eee;
  top: 0;
  right: 4vw;
}

.bottom-tip{
  width: 100%;
  height: 50vh;
  color: #fff;
  background: #f2f2f2;
  background-color:rgba(32,32,32,.3);
  position: absolute;
  bottom: -50vh
}
.test{
  height: 110vh;
  background-color: rgba(0,0,0,.3);
}

</style>

