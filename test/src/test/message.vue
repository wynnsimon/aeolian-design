<script setup lang="ts">
import { createMessage, getLastInstance } from "@aeolian-design/components";
import { onMounted } from "vue";

defineOptions({
  name: "test-message",
});

onMounted(() => {
  const instance = createMessage({
    message: "测试消息",
    type: "error",
    duration: 0,
    showClose: true,
  });
  createMessage({
    message: "测试消息",
    type: "success",
    showClose: true,
    duration: 2000,
  });
  createMessage({
    message: "测试消息",
    type: "info",
    showClose: true,
    duration: 3000,
  });
  createMessage({
    message: "测试消息",
    type: "warning",
    showClose: true,
    duration: 4000,
  });
  setTimeout(() => {
    instance.destory()
  }, 1000);
});
</script>

<template>
  <div>
    <!-- <ao-message message="测试消息"></ao-message>
  <ao-message message="测试消息" show-close></ao-message>
  <ao-message message="测试消息" show-close></ao-message> -->
  </div>
</template>

<style scoped></style>
