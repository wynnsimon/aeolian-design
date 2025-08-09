# VirtualList 虚拟列表

虚拟列表是一种优化长列表渲染性能的技术，通过只渲染可视区域内的元素来减少 DOM 节点数量，提升渲染性能。

## 基础用法

通过设置 [data](file://d:\Project\aeolian-design\test\src\test\tree.vue#L36-L36)、[columns](file://d:\Project\aeolian-design\packages\components\types\virtual.ts#L14-L17) 等属性来配置虚拟列表。

<script setup lang="ts">
const tableCols = Array.from({ length: 10 }, (_, i) => {
  return {
    label: `${i}`,
    key: i,
  };
});

const tableData = Array.from({ length: 10000 }, (_, i) => {
  return Array.from({ length: 10 }, (_, j) => {
    return `${i}-${j}`;
  });
});
</script>

<div class="w-200 h-180">
  <ao-virtual-list
    :columns="tableCols"
    :data="tableData"
    :item-height="60"
    :item-width="75"
    :count="10"
  ></ao-virtual-list>
</div>

```vue
<template>
  <div class="w-full">
    <ao-virtual-list
      :columns="tableCols"
      :data="tableData"
      :item-height="60"
      :item-width="100"
      :count="5"
    ></ao-virtual-list>
  </div>
</template>

<script setup lang="ts">
const tableCols = Array.from({ length: 10 }, (_, i) => {
  return {
    label: `列${i}`,
    key: i,
  };
});

const tableData = Array.from({ length: 1000 }, (_, i) => {
  return Array.from({ length: 10 }, (_, j) => {
    return `行${i}-列${j}`;
  });
});
</script>
```

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 列表数据 | any[][] | [] |
| columns | 列配置 | { label: string; key: string \| number }[] | [] |
| item-height | 列表项高度 | number | - |
| item-width | 列表项宽度 | number | - |
| count | 可视区域显示的列表项数量 | number | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| scroll | 滚动事件 | (event: Event) => void |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽 |
| item | 列表项插槽 |