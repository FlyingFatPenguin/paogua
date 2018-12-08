<template>

      <div class="img_upload">
          <div v-for="(item,index) in allUrl" :key="index">
                  <img :src="item"/>
                  <span class="file-remove" @click="remove(index)">×</span>
          </div>
          <div v-if="isAddImg">
            <div class="add">
              <input type="file" @change="selectImgs()" multiple accept="image/*" ref="file">
            </div>
          </div>
      </div>


</template>


<script>

export default {
   data() {
            return {
             files: [], // 文件缓存
             filesUrl: [],
             myImgUrl: this.myImg,
            }
        },
        props:['myImg'],
        computed: {
            allUrl() {
              return this.myImgUrl.concat(this.filesUrl)
            },
            isAddImg() {
              //如果已经9张了，isAddImg为false，隐藏加号
                if (this.allUrl.length >= 9) {
                    return false;
                } else {
                    return true;
                }
            },
        },
        watch:{
          myImg(val){
            this.myImgUrl = val
          }
        },

    methods:{
      selectImgs() {
            let fileList = this.$refs.file.files
            let tempList = [];
            if (this.allUrl.length + fileList.length > 9) { //如果大于9张,做出提醒
              this.$toast.fail("图片数量大于9张啦")
            } else {
              for (let i = 0, len = fileList.length; i < len; i++) {
                  let fileItem = {
                      file: fileList[i]
                  }
                  //将图片文件转成Base64
                  let reader = new FileReader()

                  reader.readAsDataURL(fileList[i])
                  this.files.push(fileItem)
                  tempList.push(fileItem)
                  reader.onload = (e) => {
                      //压缩图片并存到fileItem中
                      this.getBase64(e.target.result).then((url) => {
                          this.$set(fileItem, 'src', url)
                          this.filesUrl.push(url)
                      })
                  }
                }
                setTimeout(() => {
                  this.$emit('getFiles', tempList)
                }, 300)
            }
        },
        getBase64(url) {
            let self = this;
            let Img = new Image(),
                dataURL = '';
            Img.src = url;
            let p = new Promise(function (resolve, reject) {
                Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
                    let canvas = document.createElement("canvas"), //创建canvas元素
                        width = Img.width, //确保canvas的尺寸和图片一样
                        height = Img.height;
                    // 默认将长宽设置为图片的原始长宽，这样在长宽不超过最大长度时就不需要再处理
                    let ratio = width / height,
                        maxLength = 1000,
                        newHeight = height,
                        newWidth = width;
                    // 在长宽超过最大长度时，按图片长宽比例等比缩小
                    if (width > maxLength || height > maxLength) {

                        if (width > height) {
                            newWidth = maxLength;
                            newHeight = maxLength / ratio;
                        } else {
                            newWidth = maxLength * ratio;
                            newHeight = maxLength;
                        }
                    }
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    canvas.getContext("2d").drawImage(Img, 0, 0, newWidth, newHeight); //将图片绘制到canvas中
                    dataURL = canvas.toDataURL('image/jpeg', 0.5); //转换图片为dataURL
                    resolve(dataURL);
                };
            });
            return p
        },
        remove(index) {
          if(index<this.myImgUrl.length){
            this.$emit('removeMyImg',index)
          }else{
            this.filesUrl.splice(index-this.myImgUrl.length,1)
            this.files.splice(index-this.myImgUrl.length,1)
            this.$emit('removeFiles', index-this.myImgUrl.length)
          }

    }
  }

}

</script>

<style>

</style>

