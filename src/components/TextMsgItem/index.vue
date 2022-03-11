<template>
  <div class="text-msg-item" :class="[isSelf ? 'self' : 'others', showName ? 'has-name' : '']">
    <template v-if="isSelf">
      <div class="msg-box">
        <div v-if="showName" class="nickname">{{ info.socketId }}</div>
        <div class="msg">{{ info.value }}</div>
      </div>
      <img class="avatar" :src="info.avatarUrl" alt="" />
    </template>
    <template v-else>
      <img class="avatar" :src="info.avatarUrl" alt="" />
      <div class="msg-box">
        <div v-if="showName" class="nickname">{{ info.socketId }}</div>
        <div class="msg">{{ info.value }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  info: {
    type: Object,
    default: () => ({
      type: 'text',
      socketId: '',
      value: '',
      avatarUrl: '',
    })
  },
  socketId: {
    type: String,
    default: '',
  },
  showName: {
    type: Boolean,
    default: true,
  }
})

const isSelf = computed(() => props.info.socketId === props.socketId)
</script>

<script>
export default {
  name: 'TextMsgItem',
}
</script>

<style lang="less" scoped>
.text-msg-item {
  display: flex;
  align-items: flex-start;
  padding-bottom: 40px;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 8px;
  }
  .msg-box {
    position: relative;
    display: flex;
    flex-direction: column;    
    max-width: 70%;
    .nickname {
      margin-bottom: 4px;
      font-size: 24px;
      color: #ccc;
    }
    .msg {
      position: relative;
      display: inline-block;      
      padding: 20px;
      line-height: 36px;
      font-size: 24px;
      border: 1px solid #eee;
      border-radius: 8px;
      color: #333;
      word-break: break-all;
      &::before {
        display: block;
        position: absolute;
        top: 20px;
        content: '';
        width: 0;
        height: 0;
        border: 8px solid transparent;
      }
    }
  }
  &.others {
    justify-content: flex-start;
    .avatar {
      margin-right: 20px;
    }
    .msg {
      background: #fff;
      &::before {
        left: -15px;
        border-right-color: #fff;
      }
    }
  }
  &.self {
    justify-content: flex-end;
    .avatar {
      margin-left: 20px;
    }
    .msg-box {
      align-items: flex-end;
    }
    .msg {
      background: #a8ea7c;
      &::before {
        right: -15px;
        border-left-color: #a8ea7c;
      }
    }
  }
  &.has-name {
    .msg-box {
      top: -12px;
    }
  }
}
</style>