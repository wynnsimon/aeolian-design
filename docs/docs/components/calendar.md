# Calendar 日历

用于选择日期的组件。

## 使用

### 基础用法

<script setup lang="ts">
import { ref } from 'vue';

const curDate = ref(new Date());
</script>

<ao-calendar v-model="curDate"></ao-calendar>

```vue
<template>
  <div>
    <ao-calendar v-model="curDate"></ao-calendar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const curDate = ref(new Date());
</script>
```

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前选中的日期 | Date | - |
| range | 日期范围 | [Date, Date] | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 选中日期变化时触发 | (val: Date) => val instanceof Date |