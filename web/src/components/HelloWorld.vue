<template>
<div class="content">
  <el-input v-model="model.name"></el-input>
  <el-button type="primary" @click='save'>发起请求</el-button>

</div>
</template>

<script>
export default {
  data () {
    return {
      model:{}
    }
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

</style>
