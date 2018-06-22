<template>
  <el-select v-model="value5" filterable multiple placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'
  export default {
    components: {
    //  Calendar
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value5: ['选项2'],
      }
    },
    updated(){
      console.log(this.value5)
    }
  }
</script>

<style scoped>

</style>
