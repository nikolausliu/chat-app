<template>
  <div class="container">
    <div class="msgs" id="msgs">
      <template v-for="(item, index) in msgs" :key="index">
        <text-msg-item :info="item" :socket-id="socketId"></text-msg-item>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TextMsgItem from '@/components/TextMsgItem/index.vue'
import avatar1 from '@/assets/avatars/1.png'
import avatar2 from '@/assets/avatars/2.png'

const msgs = ref([{
  type: 'text',
  value: '你好啊',
  socketId: '1',
  avatarUrl: avatar1
}, {
  type: 'text',
  value: '你好啊',
  socketId: '2',
  avatarUrl: avatar2
}])
const msg = ref('')
const socketId = ref('1')
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  min-height: 100vh;
  background: #ededed;
  .msgs {
    padding: 20px;
    padding-bottom: 100px;
    .msg-item {
      display: flex;
      align-items: flex-start;
      padding-bottom: 100px;
      &.msg-item--others {
        justify-content: flex-start;
        background: #fff;
      }
      &.msg-item--self {
        flex-direction: row-reverse;
        background: #a8ea7c;
      }
      width: 80%;
      padding: 20px;
      line-height: 40px;
      font-size: 24px;
      border: 1px solid #eee;
      border-radius: 8px;
      color: #333;
    }
  }
}
</style>
