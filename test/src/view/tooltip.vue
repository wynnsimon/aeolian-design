<script setup lang="ts">
defineOptions({
  name: "test-tooltip",
});
</script>

<template>
  <div class="h-100 w-100 items-center flex justify-around">
    <ao-tooltip content="提示内容">
      <ao-button>Hover me</ao-button>
    </ao-tooltip>

    <ao-tooltip>
      <ao-button>Hover me</ao-button>
      <template #content> 提示内容 </template>
    </ao-tooltip>

    <ao-tooltip content="提示内容" placement="bottom">
      <ao-button>Hover me</ao-button>
    </ao-tooltip>

    <ao-tooltip content="提示内容" placement="right" trigger="click">
      <ao-button>Hover me</ao-button>
    </ao-tooltip>
  </div>
</template>

<style scoped></style>
