# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

使用 [content](file://d:\Project\aeolian-design\uno.config.ts#L4-L6) 属性来定义 Tooltip 的内容。

<script setup lang="ts">
import { ref } from "vue"
const visible = ref(false)
</script>

<div class="flex items-center justify-around">
  <ao-tooltip content="提示内容">
    <ao-button>Hover me</ao-button>
  </ao-tooltip>
</div>

## 不同位置

通过 `placement` 属性来定义 Tooltip 的显示位置。

<div class="flex items-center justify-around flex-wrap gap-4">
  <ao-tooltip content="提示内容" placement="top-start">
    <ao-button>Top Start</ao-button>
  </ao-tooltip>

  <ao-tooltip content="提示内容" placement="top-end">
    <ao-button>Top End</ao-button>
  </ao-tooltip>

  <ao-tooltip content="提示内容" placement="bottom-start">
    <ao-button>Bottom Start</ao-button>
  </ao-tooltip>

  <ao-tooltip content="提示内容" placement="bottom-end">
    <ao-button>Bottom End</ao-button>
  </ao-tooltip>

  <ao-tooltip content="提示内容" placement="left-start">
    <ao-button>Left Start</ao-button>
  </ao-tooltip>

  <ao-tooltip content="提示内容" placement="left-end">
    <ao-button>Left End</ao-button>
  </ao-tooltip>

  <ao-tooltip content="提示内容" placement="right-start">
    <ao-button>Right Start</ao-button>
  </ao-tooltip>

  <ao-tooltip content="提示内容" placement="right-end">
    <ao-button>Right End</ao-button>
  </ao-tooltip>
</div>

## 不同触发方式

通过 [trigger](file://d:\Project\aeolian-design\packages\components\types\form.ts#L6-L6) 属性来定义 Tooltip 的触发方式，默认为 `hover`。

<div class="flex items-center justify-around">
  <ao-tooltip content="提示内容" trigger="hover">
    <ao-button>Hover me</ao-button>
  </ao-tooltip>

  <ao-tooltip content="提示内容" trigger="click">
    <ao-button>Click me</ao-button>
  </ao-tooltip>
</div>

## 自定义内容

通过具名插槽 [content](file://d:\Project\aeolian-design\uno.config.ts#L4-L6) 可以自定义 Tooltip 的内容。

<div class="flex items-center justify-around">
  <ao-tooltip>
    <ao-button>Hover me</ao-button>
    <template #content>
      <div>自定义内容</div>
      <div>可以是任意的 HTML</div>
    </template>
  </ao-tooltip>
</div>

```vue
<template>
  <div class="p-4">
    <!-- 基础用法 -->
    <div class="mb-6">
      <ao-tooltip content="提示内容">
        <ao-button>Hover me</ao-button>
      </ao-tooltip>
    </div>

    <!-- 不同位置 -->
    <div class="mb-6 flex flex-wrap gap-4">
      <ao-tooltip content="提示内容" placement="top">
        <ao-button>Top</ao-button>
      </ao-tooltip>

      <ao-tooltip content="提示内容" placement="bottom">
        <ao-button>Bottom</ao-button>
      </ao-tooltip>

      <ao-tooltip content="提示内容" placement="left">
        <ao-button>Left</ao-button>
      </ao-tooltip>

      <ao-tooltip content="提示内容" placement="right">
        <ao-button>Right</ao-button>
      </ao-tooltip>
    </div>

    <!-- 不同触发方式 -->
    <div class="mb-6 flex gap-4">
      <ao-tooltip content="提示内容" trigger="hover">
        <ao-button>Hover me</ao-button>
      </ao-tooltip>

      <ao-tooltip content="提示内容" trigger="click">
        <ao-button>Click me</ao-button>
      </ao-tooltip>
    </div>

    <!-- 自定义内容 -->
    <div>
      <ao-tooltip>
        <ao-button>Hover me</ao-button>
        <template #content>
          <div>自定义内容</div>
          <div>可以是任意的 HTML</div>
        </template>
      </ao-tooltip>
    </div>
  </div>
</template>
```

### Props

| 参数名    | 说明               | 类型            | 可选值                                                                                                                          | 默认值 |
| --------- | ------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ |
| content   | 显示的内容         | string \| VNode | —                                                                                                                               | ''     |
| trigger   | 触发方式           | string          | hover / click                                                                                                                   | hover  |
| placement | Tooltip 出现的位置 | string          | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | top    |

### Slots

| 插槽名  | 说明                    |
| ------- | ----------------------- |
| default | 触发 Tooltip 显示的元素 |
| content | 自定义内容              |

### Events

| 事件名        | 说明                              | 回调参数                   |
| ------------- | --------------------------------- | -------------------------- |
| visibleChange | 当 Tooltip 显示状态发生变化时触发 | (visible: boolean) => void |
