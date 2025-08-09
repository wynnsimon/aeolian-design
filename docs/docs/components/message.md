# Message 消息提示

消息提示组件用于向用户显示简短的通知信息，通常在页面顶部显示，并在一定时间后自动消失。

## 使用

### 基础用法

通过调用 [createMessage](file://d:\Project\aeolian-design\packages\components\components\message\message.ts#L24-L64) 方法来显示不同类型的消息。

<script setup lang="ts">
import { onMounted } from 'vue'
import { createMessage } from '@aeolian-design/components'

const showMessage = (type) => {
  createMessage({
    message: '这是一条消息提示',
    type,
    showClose: true
  })
}
</script>

<div :style="{ display: 'flex', gap: '20px', flexWrap: 'wrap' }">
  <ao-button type="info" @click="showMessage('info')">信息消息</ao-button>
  <ao-button type="success" @click="showMessage('success')">成功消息</ao-button>
  <ao-button type="warning" @click="showMessage('warning')">警告消息</ao-button>
  <ao-button type="error" @click="showMessage('error')">错误消息</ao-button>
</div>

### 可关闭消息

通过设置 `showClose` 属性显示关闭按钮，用户可以手动关闭消息。

<div :style="{ display: 'flex', gap: '20px' }">
  <ao-button @click="createMessage({ message: '可关闭消息', showClose: true })">可关闭消息</ao-button>
  <ao-button @click="createMessage({ message: '自动关闭消息', duration: 5000 })">自动关闭消息</ao-button>
</div>

### 自定义持续时间

通过 `duration` 属性设置消息显示时间，单位为毫秒。设置为 0 时不会自动关闭。

<div :style="{ display: 'flex', gap: '20px' }">
  <ao-button @click="() => createMessage({ message: '显示5秒', duration: 5000, showClose: true })">显示5秒</ao-button>
  <ao-button @click="() => {
    const instance = createMessage({ message: '不会自动关闭', duration: 0, showClose: true });
    setTimeout(() => instance.destory(), 3000);
  }">手动关闭</ao-button>
</div>

```vue
<template>
  <div>
    <div :style="{ display: 'flex', gap: '20px', marginBottom: '20px' }">
      <ao-button @click="() => showMessage('info')">信息消息</ao-button>
      <ao-button @click="() => showMessage('success')">成功消息</ao-button>
      <ao-button @click="() => showMessage('warning')">警告消息</ao-button>
      <ao-button @click="() => showMessage('error')">错误消息</ao-button>
    </div>

    <div :style="{ display: 'flex', gap: '20px', marginBottom: '20px' }">
      <ao-button @click="() => createMessage({ message: '可关闭消息', showClose: true })">可关闭消息</ao-button>
      <ao-button @click="() => createMessage({ message: '自动关闭消息', duration: 5000 })">自动关闭消息</ao-button>
    </div>

    <div :style="{ display: 'flex', gap: '20px' }">
      <ao-button @click="() => createMessage({ message: '显示5秒', duration: 5000, showClose: true })">显示5秒</ao-button>
      <ao-button @click="() => {
        const instance = createMessage({ message: '不会自动关闭', duration: 0, showClose: true });
        setTimeout(() => instance.destory(), 3000);
      }">手动关闭</ao-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createMessage } from '@aeolian-design/components'

const showMessage = (type) => {
  createMessage({
    message: '这是一条消息提示',
    type,
    showClose: true
  })
}
</script>
```
## API

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 消息文本内容 | string | - |
| type | 消息类型 | 'info' \| 'success' \| 'warning' \| 'error' | 'info' |
| duration | 显示时间，单位毫秒，设为 0 时不自动关闭 | number | 3000 |
| showClose | 是否显示关闭按钮 | boolean | false |
| offset | 消息距离窗口顶部的偏移量 | number | 20 |
| id | 消息唯一标识 | string | 自动生成 |
| zIndex | 消息层级 | number | 自动递增 |

### 实例方法

通过 [createMessage](file://d:\Project\aeolian-design\packages\components\components\message\message.ts#L24-L64) 返回的实例可以调用以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| destory | 手动关闭当前消息 | - |

## 类型定义
```ts
interface MessageProps {
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
  showClose?: boolean
  offset?: number
  id?: string
  zIndex?: number
}

interface MessageInstance {
  id: string
  destory: () => void
}
```

## 使用示例
```ts
import { createMessage } from '@aeolian-design/components'

// 基础用法
createMessage({
  message: '这是一条消息提示',
  type: 'info'
})

// 成功消息
createMessage({
  message: '操作成功',
  type: 'success',
  duration: 2000
})

// 可关闭的错误消息
const instance = createMessage({
  message: '操作失败，请重试',
  type: 'error',
  showClose: true,
  duration: 0 // 不自动关闭
})

// 手动关闭消息
setTimeout(() => {
  instance.destory()
}, 3000)
```