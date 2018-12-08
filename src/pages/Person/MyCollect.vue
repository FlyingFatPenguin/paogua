<template>
  <div class="filter">
    <my-header tag="我收藏的" fixed></my-header>
    <div class="wraper">
      <item-list :items="items" @removeCollect="removeCollect"></item-list>
    </div>
  </div>
</template>

<script>

import MyHeader from '../../components/MyHeader.vue'
import ItemList from './components/CollectItemList.vue'

export default{
  components:{
    MyHeader,
    ItemList,
  },
  data(){
    return {
      items: [],
      toast:false
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
          url:'/api/paogua/index.php/Home/self/getMyCollect',
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
          console.log(res.data)
          if(res.data.length){
            this.toast = false
            for(var i=0;i<res.data.length;i++) {
              this.items.push(res.data[i])
            }
           }else{
            this.toast = true
           }
         })
    },
    removeCollect(index){
      this.items.splice(index,1)
    }
  }
}
</script>

<style scoped>
.wraper{
  margin-top: 7vh;
}

</style>


