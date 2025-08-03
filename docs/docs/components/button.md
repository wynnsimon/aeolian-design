# Button 按钮

按钮用于触发一个操作，如提交表单、打开对话框等。

## 使用

### 基础用法

<script setup lang="ts">
import { AppleOutlined } from "@vicons/antd";
</script>

<div :style="{ display: 'flex', gap: '20px' }">
  <ao-button type="primary" @click="console.log('点击事件')">主要按钮</ao-button>
  <ao-button type="success">成功按钮</ao-button>
  <ao-button type="warning">警告按钮</ao-button>
  <ao-button type="danger">危险按钮</ao-button>
  <ao-button type="info">信息按钮</ao-button>
</div>

### 禁用状态

<ao-button disabled>禁用按钮</ao-button>

### 加载中
<ao-button type="primary" loading>加载中</ao-button>


### 自定义加载图标

<div :style="{ display: 'flex', gap: '20px' }">
  <ao-button type="primary" icon-placement="left" loading>
    <template #icon>
      <AppleOutlined />
    </template>
    加载中
  </ao-button>

  <ao-button type="primary" icon-placement="right" loading>
    <template #icon>
      <AppleOutlined />
    </template>
    加载中
  </ao-button>
</div>

### 不同尺寸

<div :style="{ display: 'flex', gap: '20px' }">
  <ao-button size="large">大号按钮</ao-button>
  <ao-button size="medium">中等按钮</ao-button>
  <ao-button size="small">小号按钮</ao-button>
  <ao-button size="default">默认按钮</ao-button>
</div>

### 圆角按钮

<div :style="{ display: 'flex', gap: '20px' }">
  <ao-button round>圆角按钮</ao-button>
  <ao-button type="primary" icon-placement="left" loading round>
    <template #icon>
      <AppleOutlined />
    </template>
  </ao-button>
</div>

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <div :style="{ display: 'flex', gap: '20px', marginBottom: '20px' }">
      <ao-button type="primary" @click="handleClick">主要按钮</ao-button>
      <ao-button type="success">成功按钮</ao-button>
      <ao-button type="warning">警告按钮</ao-button>
      <ao-button type="danger">危险按钮</ao-button>
      <ao-button type="info">信息按钮</ao-button>
    </div>

    <!-- 禁用状态 -->
    <div :style="{ marginBottom: '20px' }">
      <ao-button disabled>禁用按钮</ao-button>
    </div>

    <!-- 加载中 -->
    <div :style="{ marginBottom: '20px' }">
      <ao-button type="primary" loading>加载中</ao-button>
    </div>

    <!-- 自定义加载图标 -->
    <div :style="{ display: 'flex', gap: '20px', marginBottom: '20px' }">
      <ao-button type="primary" icon-placement="left" loading>
        <template #icon>
          <AppleOutlined />
        </template>
        加载中
      </ao-button>

      <ao-button type="primary" icon-placement="right" loading>
        <template #icon>
          <AppleOutlined />
        </template>
        加载中
      </ao-button>
    </div>

    <!-- 不同尺寸 -->
    <div :style="{ display: 'flex', gap: '20px', marginBottom: '20px' }">
      <ao-button size="large">大号按钮</ao-button>
      <ao-button size="medium">中等按钮</ao-button>
      <ao-button size="small">小号按钮</ao-button>
      <ao-button size="default">默认按钮</ao-button>
    </div>

    <!-- 圆角按钮 -->
    <div :style="{ display: 'flex', gap: '20px' }">
      <ao-button round>圆角按钮</ao-button>
      <ao-button type="primary" icon-placement="left" loading round>
        <template #icon>
          <AppleOutlined />
        </template>
      </ao-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppleOutlined } from "@vicons/antd";

const handleClick = () => {
  console.log("按钮被点击了");
};
</script>
```
### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'error' \| 'info' \| 'default' | 'default' |
| size | 按钮尺寸 | 'large' \| 'medium' \| 'small' \| 'default' | 'default' |
| native-type | 按钮的原生类型 | 'button' \| 'submit' \| 'reset' | 'default' |
| disabled | 是否禁用按钮 | boolean | false |
| round | 是否为圆角按钮 | boolean | false |
| loading | 是否处于加载状态 | boolean | false |
| icon-placement | 图标位置 | 'left' \| 'right' | 'left' |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |
| icon | 自定义图标 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | (e:MouseEvent)=>e instanceof MouseEvent |
| mouse-down | 鼠标按下时触发 | (e:MouseEvent)=>e instanceof MouseEvent |
