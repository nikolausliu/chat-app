<template>
  <div class="container">
    <div class="msgs" id="msgs">
      <template v-for="(item, index) in msgs" :key="index">
        <text-msg-item v-if="item.type === 'text'" :info="item" :socket-id="socketId"></text-msg-item>
        <notice-item v-if="item.type === 'notice'" :info="item"></notice-item>
      </template>
    </div>

    <div class="opts-bar">
      <input v-model="msg" type="text" @keyup.enter="handleSend">
      <button :class="{disabled: msg === ''}" @click="handleSend">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { io } from 'socket.io-client'
import TextMsgItem from '@/components/TextMsgItem/index.vue'
import NoticeItem from './components/NoticeItem/index.vue'

const socket = io(import.meta.env.VITE_SOCKET_URL)

// 动态加载头像
// const loadAvatar = () => {
//   const name = Math.floor(Math.random() * 10) + 1
//   return import(`./assets/avatars/${name}.png`).then(res => res.default)
// }
let avatarUrl = ''
const randomAvatarUrl = () => `./assets/avatars/${Math.floor(Math.random() * 10) + 1}.png`

const msgs = ref([])
const msg = ref('')
const socketId = ref('1')

// 初始化socket
const initSocket = () => {
  socket.on('connect', () => {
    socketId.value = socket.id
    console.log(`socket连接成功,socketId为${socketId.value}`)
  })
  socket.on('disconnect', () => {
    console.log(`socket断开连接,socketId为${socketId.value}`)
  })
  listenSocket()
}

// 监听socket服务
const listenSocket = () => {
  socket.on('message', (info) => {
    // 当接收到socket发来的新消息时，渲染新消息，并使滚动条滚动到底部
    msgs.value.push(info)
    nextTick(() => {
      handleScroll()
    })
  })
}

// 页面滚动到列表底部
const handleScroll = () => {
  const msgs = document.getElementById('msgs')
  window.scrollTo(0, msgs.scrollHeight)
}

// 当用户发送消息时
const handleSend = async () => {
  if (msg.value === '') return
  if (!avatarUrl) {
    avatarUrl = randomAvatarUrl()
  }
  socket.emit('message', {
    type: 'text',
    value: msg.value,
    socketId: socketId.value,
    avatarUrl
  })
  msg.value = ''
}

initSocket()
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
