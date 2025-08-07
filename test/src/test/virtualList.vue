<script setup lang="ts">
defineOptions({
  name: "test-virtual-list",
});

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
  <div class="w-[90vw]">
    <ao-virtual-list
      :columns="tableCols"
      :data="tableData"
      :item-height="60"
      :item-width="100"
      :count="5"
    ></ao-virtual-list>
  </div>
</template>

<style scoped></style>
