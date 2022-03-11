<template>
  <div class="container">
    <div class="msgs" id="msgs">
      <template v-for="(item, index) in msgs" :key="index">
        <text-msg-item :info="item" :socket-id="socketId"></text-msg-item>
      </template>
    </div>

    <div class="opts-bar">
      <input v-model="msg" type="text" @keyup.enter="handleSend">
      <button :class="{disabled: msg === ''}" @click="handleSend">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TextMsgItem from '@/components/TextMsgItem/index.vue'
import avatar1 from '@/assets/avatars/1.png'
import avatar2 from '@/assets/avatars/2.png'

const loadAvatar = () => {
  const name = Math.floor(Math.random() * 10) + 1
  return import(`./assets/avatars/${name}.png`).then(res => res.default)
}
let avatarUrl = ''

const msgs = ref([
// {
//   type: 'text',
//   value: '你好啊',
//   socketId: '1',
//   avatarUrl: avatar1
// }, {
//   type: 'text',
//   value: '你好啊',
//   socketId: '2',
//   avatarUrl: avatar2
// }
])
const msg = ref('')
const socketId = ref('1')

const handleSend = async () => {
  if (msg.value === '') return
  // msgs.value.push(msg.value)
  if (!avatarUrl) {
    avatarUrl = await loadAvatar()
  }
  msgs.value.push({
    type: 'text',
    value: msg.value,
    socketId: socketId.value,
    avatarUrl
  })
  msg.value = ''
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

  .opts-bar {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 20px;
    left: 0;
    bottom: 0;
    background: #f6f6f6;
    input {
      flex-grow: 1;    
      border: none;
      padding: 0 10px;
      outline: none;
      appearance: none;
      height: 60px;
      border-radius: 8px;
      background: #fff;
    }
    button {
      appearance: none;
      border: none;
      height: 60px;
      margin-left: 20px;
      padding: 0 40px;
      border-radius: 8px;
      background: #3478f3;
      color: #fff;
      &.disabled {
        background: #b5b8c1;
        color: #797c85;
      }
    }
  }
}
</style>
