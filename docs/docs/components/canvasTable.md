# CanvasTable 虚拟表格

使用 Canvas 渲染的高性能表格组件，适用于大量数据的展示。

## 使用

### 基础用法

<script setup lang="ts">
const tableCols = Array.from({ length: 10 }, (_, i) => {
  return {
    label: `header${i}`,
    key: i,
  };
});

const tableData = Array.from({ length: 1000 }, (_, i) => {
  return Array.from({ length: 10 }, (_, j) => {
    return `${i}-${j}`;
  });
});
</script>

<div class="w-190 h-140">
  <ao-canvas-table
    :columns="tableCols"
    :data="tableData"
    :item-height="50"
    :item-width="75"
  ></ao-canvas-table>
</div>

```vue
<template>
  <div class="w-240 h-200">
    <ao-canvas-table
      :columns="tableCols"
      :data="tableData"
      :item-height="50"
      :item-width="100"
    ></ao-canvas-table>
  </div>
</template>

<script setup lang="ts">
const tableCols = Array.from({ length: 10 }, (_, i) => {
  return {
    label: `header${i}`,
    key: i,
  };
});

const tableData = Array.from({ length: 1000 }, (_, i) => {
  return Array.from({ length: 10 }, (_, j) => {
    return `${i}-${j}`;
  });
});
</script>
```
### Props

| 参数名 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| data | 列表体数据 | Array | - | 是 |
| columns | 列表头数据 | ListColumns[] | - | 是 |
| count | 显示多少项 | number | 10 | 否 |
| itemHeight | 列表项高度 | number | 30 | 否 |
| itemWidth | 列表项宽度 | number | 50 | 否 |

### ListColumns

| 属性名 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 列标题 | string | 是 |
| key | 列标识 | string \| number | 是 |