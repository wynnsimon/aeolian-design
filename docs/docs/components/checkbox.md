# Checkbox 复选框

复选框用于在一组选项中进行多项选择。

## 使用

### 基础用法

<script setup lang="ts">
import { ref } from "vue"
const checked = ref(false)
const indeterminateChecked = ref(false)
const checkedList = ref(['option1'])
</script>

<ao-checkbox v-model="checked">选项 1</ao-checkbox>

### 禁用状态

<ao-checkbox disabled>禁用选项</ao-checkbox>
<ao-checkbox disabled checked>禁用已选选项</ao-checkbox>

### 半选状态

<ao-checkbox v-model="indeterminateChecked" indeterminate>半选状态</ao-checkbox>

### 多选框组

<div>
  <ao-checkbox v-model="checkedList" label="option1">选项1</ao-checkbox>
  <ao-checkbox v-model="checkedList" label="option2">选项2</ao-checkbox>
  <ao-checkbox v-model="checkedList" label="option3">选项3</ao-checkbox>
</div>

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <div style="margin-bottom: 20px;">
      <ao-checkbox v-model="checked">选项1</ao-checkbox>
    </div>

    <!-- 禁用状态 -->
    <div style="margin-bottom: 20px;">
      <ao-checkbox disabled>禁用选项</ao-checkbox>
      <ao-checkbox disabled checked>禁用已选选项</ao-checkbox>
    </div>

    <!-- 半选状态 -->
    <div style="margin-bottom: 20px;">
      <ao-checkbox v-model="indeterminateChecked" indeterminate
        >半选状态</ao-checkbox
      >
    </div>

    <!-- 多选框组 -->
    <div>
      <ao-checkbox v-model="checkedList" label="option1">选项1</ao-checkbox>
      <ao-checkbox v-model="checkedList" label="option2">选项2</ao-checkbox>
      <ao-checkbox v-model="checkedList" label="option3">选项3</ao-checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(false);
const indeterminateChecked = ref(false);
const checkedList = ref(["option1"]);
</script>
```

### Props

| 参数名        | 说明                                     | 类型                          | 默认值      | 可选值            |
| ------------- | ---------------------------------------- | ----------------------------- | ----------- | ----------------- |
| modelValue    | 绑定值，可以是字符串、数字、布尔值或数组 | `string \| number \| boolean` | `""`        | -                 |
| indeterminate | 是否为半选状态                           | `boolean`                     | `false`     | `true` \| `false` |
| disabled      | 是否禁用                                 | `boolean`                     | `false`     | `true` \| `false` |
| label         | 选项标签值                               | `string`                      | `undefined` | -                 |

### Events

| 事件名            | 说明                 | 回调参数                                       |
| ----------------- | -------------------- | ---------------------------------------------- |
| update:modelValue | 当绑定值变化时触发   | `(value: boolean \| string \| number) => void` |
| change            | 当选中状态改变时触发 | `(value: boolean) => void`                     |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义标签内容 |
