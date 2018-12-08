<template>
  <div class="release">
    <my-header tag="发布" fixed></my-header>
    <div class="release-content">
      <my-input @getTitle='setTitle' @getDesc='setDesc' :myReleaseTitle='title' :myReleaseDesc='desc'></my-input>
      <upload-img @getFiles='getImageList' @removeFiles='removeImage' @removeMyImg='removeMyImg' :myImg='imgUrl'></upload-img>
      <release-form @getPrice='setPrice' @getClassify='setClassify' @getSchool='setSchool' @getPhoneNum='setPhoneNum' @getQqNum='setQqnum' @getWxid='setWxid' :myPrice='price' :mySchoolName='school.name' :mySchoolCode='school.code' :myphoneNum='phoneNum' :myQqNum='qqNum' :mywxid='wxid' :myClassify='classify'></release-form>
    </div>
    <div class="foot-button" :style="{background : btncolor}" @click='handleSubmit'>{{bottomContent}}</div>
  </div>
</template>
<script>
    import utils from "../../utils.js"
    import MyHeader from "../../components/MyHeader.vue"
    import MyInput from "./components/Input.vue"
    import UploadImg from "./components/UploadImg.vue"
    import ReleaseForm from "./components/ReleaseForm.vue"
    export default{
        name: "release",
        components:{
          MyHeader,
          UploadImg,
          MyInput,
          ReleaseForm
        },
        data () {
          return {
            title: '',
            desc: '',
            imgList: [],
            price: '',
            classify: '',
            school: {
              name:'',
              code:''
            },
            phoneNum: '',
            qqNum: '',
            wxid: '',
            goods_id:'',
            imgUrl:[],
            bottomContent:'发布',
            myRelease: false
          }
        },
        computed: {
          btncolor () {
            return this.title=='' ? '#aeaeae' : '#F36778'
          },
          classifyCode() {
            for(var i=0;i<this.classify.length;i++){
            if(this.classify.charAt(i) == ' ')
              break;
            }
            if(i==this.classify.length){
              return this.classify
            }else{
              return this.classify.substring(i+1,this.classify.length)
            }
          },
        },
        methods:{
          getImageList(files) {
            for(let i=0;i<files.length;i++){
              this.imgList.push(files[i].file)
            }
          },
          removeImage(index) {
            this.imgList.splice(index,1)
          },
          removeMyImg(index){
            this.imgUrl.splice(index,1)
          },
          getGoodsId() {
            let p = new Promise((resolve,reject) => {
              if(!this.goods_id){
                this.$axios({
                    method: 'post',
                    url: '/api/paogua/index.php/Home/release/createUUid',
                    data: {
                      'Mstring': 'ogoHi5FW147DltmY7recr7vpsYEA'
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
                  this.goods_id = res.data.goods_id
                  resolve('')
                 })
               }
              else{
                resolve('')
              }
            })
            return p
          },
          getImgToken() {
            let p = new Promise((resolve,reject) => {
              this.$axios({
              method:'post',
              url:'http://123.207.167.170:8765/qiniu',
              data:{
                'name':'yh'
              },
              headers:{
                'Content-Type':'application/x-www-form-urlencoded'
              }
              }).then((res) => {
                resolve(res.data.token)
              })
            })
            return p
          },
          uploadImg(token) {
            let p = new Promise((resolve,reject) => {
              var tempUrl = []
              var i = 0;                                  //如果没有进入for循环，resolve一个空数组
              for(i=0; i<this.imgList.length;i++) {
                let file = this.imgList[i];
                let param = new FormData();
                param.append('file',file),
                param.append('token',token)
                this.$axios({
                  method: 'post',
                  url: 'http://upload.qiniup.com/',
                  data : param
                }).then((res) => {
                    tempUrl.push(res.data.hash)
                    if(tempUrl.length == this.imgList.length) {
                      resolve(tempUrl)
                    }
                })
              }
              if(i==0) {
                resolve(tempUrl)
              }
            })
            return p
          },
          setImgUrl(imgUrl){
            for(var i=0;i<imgUrl.length;i++) {
              var url = "http://pi4ce8cq1.bkt.clouddn.com" + '/' + imgUrl[i]
              this.imgUrl.push(url)
            }
          },
          setTitle(title) {
            this.title = title
          },
          setDesc(desc) {
            this.desc = desc
          },
          setPrice(price){
            this.price = price
          },
          setClassify(classify) {
            this.classify = classify
          },
          setSchool(school) {
            this.school = school
          },
          setPhoneNum(phoneNum) {
            this.phoneNum = phoneNum
          },
          setQqnum(qqNum) {
            this.qqNum = qqNum
          },
          setWxid(wxid) {
            this.wxid = wxid
          },
          handleSubmit(){
            if(this.title == '') {
              this.$toast.fail('未输入标题')
            }else if(this.desc == '') {
              this.$toast.fail('未输入介绍')
            }else if( !(this.imgUrl.length||this.imgList.length) ) {
              this.$toast.fail('未添加图片')
            }else if(this.price == '') {
              this.$toast.fail('未输入价格')
            }else if(Object.keys(this.school).length == 0) {
              this.$toast.fail('未添加校区')
            }else if(this.phoneNum == '' && this.qqNum == '' && this.wxid == '') {
              this.$toast.fail('未填联系方式')
            }else {
              this.$toast.loading('上传中')
              this.getGoodsId()
              .then(() => {
                return this.getImgToken()
              })
              .then((token) => {
                return this.uploadImg(token)
              })
              .then((imgUrl) => {
                this.setImgUrl(imgUrl)
                if(this.myRelease){
                  this.saveEdit()
                }else{
                  this.uploadData()
                }
              })
              .then(() => {
                this.$toast.success({
                  message:'上传成功',
                  duration: 500
                })
                this.$router.go(-1)
              })
            }
          },
          uploadData() {
            let p =new Promise((resolve,reject) => {
              this.$axios({
                method: 'post',
                url: '/api/paogua/index.php/Home/Release/release',
                data:{
                  'Mstring': 'ogoHi5FW147DltmY7recr7vpsYEA',
                  'goods_id': this.goods_id,
                  'title': this.title,
                  'description': this.desc,
                  'price': this.price,
                  'category': this.classifyCode,
                  'school': this.school.code,
                  'phoneNum': this.phoneNum,
                  'qqNum': this.qqNum,
                  'wxid': this.wxid,
                  'imageUrl':JSON.stringify(this.imgUrl)
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
              }).then(() => {
                resolve('')
              })
            })
            return p
          },
          saveEdit() {
            let p =new Promise((resolve,reject) => {
              this.$axios({
                method: 'post',
                url: '/api/paogua/index.php/Home/Release/saveEdit',
                data:{
                  'Mstring': 'ogoHi5FW147DltmY7recr7vpsYEA',
                  'goods_id': this.goods_id,
                  'title': this.title,
                  'description': this.desc,
                  'price': this.price,
                  'category': this.classifyCode,
                  'school': this.school.code,
                  'phoneNum': this.phoneNum,
                  'qqNum': this.qqNum,
                  'wxid': this.wxid,
                  'imageUrl':JSON.stringify(this.imgUrl)
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
              }).then(() => {
                resolve('')
              })
            })
            return p
          },
          getMyRelease(id) {
            this.$axios({
              method: 'post',
              url: '/api/paogua/index.php/Home/Self/editMyRelease',
              data:{
                'Mstring': 'ogoHi5FW147DltmY7recr7vpsYEA',
                'goods_id': this.goods_id,
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
            .then(res => {
              this.fillInData(res.data)
            })
            .catch(() => {
              this.$toast.fail('获取数据失败')
            })
          },
          fillInData(data) {
            this.title = data.title
            this.desc = data.description
            this.imgUrl = data.imageUrl
            this.price = data.price
            console.log(data.category.split('-'))
            this.classify = utils.parseCate(data.category.split('-')[0],data.category.split('-')[1],1) + ' ' + data.category
            this.school.name = utils.parseSch(data.school)
            this.school.code = data.school
            this.phoneNum = data.phoneNum
            this.qqNum = data.qqNum
            this.wxid = data.wxId
          }
        },
        beforeRouteEnter:(to, from, next) => {
          if(from.name == 'myRelease'){
            next( vm => {
              vm.myRelease = true;
              vm.goods_id = vm.$route.query.id
              vm.bottomContent = '保存'
              vm.getMyRelease(vm.goods_id)
            })
          }else{
            next()
          }
        },
        mounted() {
          var vm = this
        }

    }
</script>
<style scoped>
.release-content{
    margin-top: 1rem;
}
.foot-button{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.2rem;
  text-align: center;
  line-height: 1.2rem;
  color: #fff;
  z-index: 999;
  border-radius: 5px;
  background-color: #aeaeae;
  font-size: .48rem;
}

</style>
