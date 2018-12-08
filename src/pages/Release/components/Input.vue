<template>
  <div class="my-input">
    <div class="title">
      <input type="text" maxlength="15" name="title" placeholder="取一个标题吧，记得多带一些关键字" class="input-title" v-model="title" @input="uploadTitle">
      </input>
      <div class="input-limit">
        <span>
          {{titleLength+'/'+15}}
        </span>
      </div>
    </div>

    <div class="description">
      <textarea maxlength="200" name="description" placeholder="详细介绍一下你的宝贝，比如品牌、型号、规格、成色、购买渠道等" class="textarea-description" v-model="desc" @input="uploadDesc">
      </textarea>
      <div class="textarea-limit">
        <span>
          {{descLength+'/'+200}}
        </span>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      title:this.myReleaseTitle,
      desc:this.myReleaseDesc
    }
  },
  props:['myReleaseTitle','myReleaseDesc'],
  computed: {
    titleLength() {
      return this.title.length
    },
    descLength() {
      return this.desc.length
    }
  },
  watch: {
    myReleaseTitle(val){
      this.title = val
    },
    myReleaseDesc(val){
      this.desc = val
    }
  },
  methods:{
    uploadTitle() {
      this.$emit('getTitle',this.title)
    },
    uploadDesc() {
      this.$emit('getDesc',this.desc)
    }
  }
}

</script>
<style scoped>
.my-input{
}
.title{
  height:.82rem;
  width : 100%;
  display : flex;
  margin-bottom: 20px;
}
.input-title{
  flex: 1;
  height : .82rem;
  width : 85%;
  padding-right: 0rem;
  margin-left: 3.5%;
  font-weight: bold;
  border: 0;
}
.input-limit{
  height: .82rem;
  line-height: .82rem;
  margin-right: .20rem;
  font-size: .30rem;
  font-weight: normal;
  color:#808080;
}
.description{
  height: 2.88rem;
  width : 100%;
}
.textarea-description{
  height: 2.50rem;
  width:90%;
  margin-left: 3.5%;
}
.textarea-limit{
  height : .38rem;
  text-align:  right;
  margin-right: .20rem;
  font-size: .30rem;
  font-weight: normal;
  color: #808080;
}

</style>
