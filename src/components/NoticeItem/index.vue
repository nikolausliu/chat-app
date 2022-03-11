<template>
  <div class="notice-item">
    <div class="inner">{{ info.value }}</div>    
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  info: {
    type: Object,
    default: () => ({
      type: 'notice',
      value: '',
    })
  }
})
</script>

<script lang="ts">
export default {
  name: 'notice-item',
}
</script>

<style lang="less" scoped>
.notice-item {
  padding: 40px;
  .inner {
    width: 80%;
    margin: 0 auto;
    line-height: 40px;
    font-size: 24px;
    color: #bbb;
    text-align: center;
  }
}
</style>