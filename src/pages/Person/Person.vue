<template>
  <div>
    <top></top>
    <row-item></row-item>
    <footer-guide></footer-guide>
  </div>
</template>

<script>
import top from './components/Top.vue'
import RowItem from './components/RowItem.vue'
import FooterGuide from './components/Footer'
export default{
  components:{
    top,
    RowItem,
    FooterGuide,
  },
}
</script>

<style scoped>
div{
}
</style>
