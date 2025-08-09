# Collapse 折叠面板

折叠面板用于将内容分组并可展开或收起显示，常用于展示大量信息的场景。

## 使用

### 基础用法

<script setup lang="ts">
import { ref } from "vue";

const modelValue1 = ref(["a"]);
</script>

<div>
  <ao-collapse v-model="modelValue">
    <ao-collapse-item name="a" title="标题1">
      <div>这些是标题1的内容</div>
    </ao-collapse-item>
    <ao-collapse-item name="b" title="标题3">
      <div>这些是标题3的内容</div>
    </ao-collapse-item>
    <ao-collapse-item name="c" title="标题4" disabled>
      <div>这些是标题4的内容</div>
    </ao-collapse-item>
  </ao-collapse>
</div>

### 手风琴模式

<div>
  <ao-collapse v-model="modelValue1" accordion>
    <ao-collapse-item name="a" title="标题1">
      <div>这些是标题1的内容</div>
    </ao-collapse-item>
    <ao-collapse-item name="b" title="标题3">
      <div>这些是标题3的内容</div>
    </ao-collapse-item>
    <ao-collapse-item name="c" title="标题4" disabled>
      <div>这些是标题4的内容</div>
    </ao-collapse-item>
  </ao-collapse>
</div>

### 自定义标题

<div>
  <ao-collapse v-model="modelValue">
    <ao-collapse-item name="a">
      <template #title>
        <h1>标题1</h1>
      </template>
      <div>这些是标题1的内容</div>
    </ao-collapse-item>
    <ao-collapse-item name="b" title="标题3">
      <div>这些是标题3的内容</div>
    </ao-collapse-item>
    <ao-collapse-item name="c" title="标题4" disabled>
      <div>这些是标题4的内容</div>
    </ao-collapse-item>
  </ao-collapse>
</div>


```vue
<template>
  <div>
    <ao-collapse v-model="modelValue">
      <ao-collapse-item name="a">
        <template #title>
          <h1>标题1</h1>
        </template>
        <div>这些是标题1的内容</div>
      </ao-collapse-item>
      <ao-collapse-item name="b" title="标题3">
        <div>这些是标题3的内容</div>
      </ao-collapse-item>
      <ao-collapse-item name="c" title="标题4" disabled>
        <div>这些是标题4的内容</div>
      </ao-collapse-item>
    </ao-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const modelValue = ref(["a"]);
</script>
```
## Collapse 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前激活的面板的 name | `Array<string \| number>` | `[]` |
| accordion | 是否开启手风琴模式，开启后每次至多展开一个面板 | `boolean` | `false` |

## Collapse 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 面板展开状态改变时触发 | `(activeNames: Array<string \| number>) => void` |
| change | 面板展开状态改变时触发 | `(activeNames: Array<string \| number>) => void` |

## CollapseItem 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识符，必填 | `string \| number` | — |
| title | 面板标题 | `string` | — |
| disabled | 是否禁用该面板项 | `boolean` | `false` |

## CollapseItem 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 面板内容 |
| title | 自定义面板标题 |