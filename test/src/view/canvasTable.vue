<script setup lang="ts">
defineOptions({
  name: 'test-canvas-table'
})

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

<style scoped>

</style>
