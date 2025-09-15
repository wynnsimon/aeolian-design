<!-- App.vue -->
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

// 定义所有页面的路由配置
const pages = [
  { name: "Calendar", path: "/calendar" },
  { name: "CanvasTable", path: "/canvas-table" },
  { name: "Checkbox", path: "/checkbox" },
  { name: "Collapse", path: "/collapse" },
  { name: "Editor", path: "/editor" },
  { name: "Form", path: "/form" },
  { name: "Input", path: "/input" },
  { name: "Message", path: "/message" },
  { name: "OnlineExcel", path: "/online-excel" },
  { name: "Tooltip", path: "/tooltip" },
  { name: "Tree", path: "/tree" },
  { name: "Upload", path: "/upload" },
  { name: "VirtualList", path: "/virtual-list" },
  { name: "Signature", path: "/signature" },
  { name: "DrawingBoard", path: "/drawing-board" },
];
</script>

<template>
  <div class="app-container">
    <div class="nav-buttons">
      <button
        v-for="page in pages"
        :key="page.path"
        class="nav-button"
        @click="router.push(page.path)"
      >
        {{ page.name }}
      </button>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
