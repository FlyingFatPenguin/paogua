<template>
  <div class="filter">
    <my-header tag="我发布的" fixed></my-header>
    <div class="wraper">
      <item-list
        :items="items"
        @myDetail="myDetail"
        @myDelete="myDelete"
        @myPolish="myPolish"
        @myEdit="myEdit"
      ></item-list>
    </div>
  </div>
</template>

<script>
import utils from '../../utils.js'
import MyHeader from '../../components/MyHeader.vue'
import ItemList from './components/ReleaseList.vue'
export default{
  components:{
    MyHeader,
    ItemList,
  },
  data(){
    return {
      items: [],
      toast:false,
    }
  },
  created() {
    this.requestData()
  },
  mounted() {
    if(this.toast){
      this.$toast({
        duration: 1000,
        message:'这里空空如也'
      })
    }
  },
  methods: {
    requestData() {
        this.$axios({
          method:'post',
          url:'/api/paogua/index.php/Home/Self/getMyRelease',
          data:{
            'Mstring':'ogoHi5FW147DltmY7recr7vpsYEA',
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
          if(res.data.length){
            this.toast = false
            for(var i=0;i<res.data.length;i++) {
              var a = res.data[i].category.split("-")
              var subtime = new Date(res.data[i].subTime)
              var curTime = new Date()
              curTime.setTime(curTime.getTime())
              var dateL = curTime.getDate() - subtime.getDate()
              var hourL = curTime.getHours() - subtime.getHours()
              if (hourL >= 23) {
                  dateL += 1
              }
              var tip = ""
              if (dateL >= 0 && dateL <= 1) {
                tip = "我超新！不需要再擦亮啦！"
              } else if (dateL > 1 && dateL <= 7) {
                tip = "擦亮一下，可以被更多人看到！"
              } else if (dateL > 7 && dateL <= 30) {
                tip = "积灰太多其他人看不见啦，快擦亮！"
              } else if (dateL > 30 && dateL <= 50) {
                tip = "主人太久没擦亮我！我快消失啦！"
              } else {
                tip = "其他人已经看不见我啦，快擦亮！"
              }
              res.data[i].category = utils.parseCate(a[0], a[1], 1)
              res.data[i].tip = tip;
              this.items.push(res.data[i])
            }
           }else{
            this.toast = true
           }
         })
    },
    myDetail(id,index){
      this.$router.push({
        name:'detail',
        params:{
          id:id
        }
      })
    },
    myDelete(id,index){
      this.$toast.loading({
        mask:true,
        message:'删除中...'
      })
      this.$axios({
        method:'post',
        url:'/api/paogua/index.php/Home/Self/removeMyRelease',
        data:{
          'Mstring': 'ogoHi5FW147DltmY7recr7vpsYEA',
          'goods_id': id,
          'reason': "r_sold"
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
      .then((res) => {
        if (res.data == "200"){
          this.items.splice(index,1)
          this.$toast.success({
            message:'删除成功',
            duration:500
          })
        }else{
          this.$toast.fail({
            message:'删除失败',
            duration:500
          })
        }
      })
      .catch(() => {
        this.$toast.success({
            message:'删除失败',
            duration:500
        })
      })
    },
    myPolish(id,index){
      this.$axios({
        method:'post',
        url:'/api/paogua/index.php/Home/Home/Self/republish',
        data:{
          'Mstring': 'ogoHi5FW147DltmY7recr7vpsYEA',
          'goods_id': id,
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
      .then(() => {
        if (res.data == "200"){
          this.$toast.success({
            message:'擦亮成功',
            duration:500
          })
        }else{
          this.$toast.fail({
            message:'擦亮失败',
            duration:500
          })
        }
      })
      .catch(() => {
        this.$toast.success({
            message:'擦亮失败',
            duration:500
        })
      })
    },
    myEdit(id,index){
      this.$router.push({
        name:'release',
        query:{
          id:id
        }
      })
    }

  }
}
</script>

<style scoped>
.wraper{
  margin-top: 7vh;
}

</style>



