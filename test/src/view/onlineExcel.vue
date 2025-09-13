<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
defineOptions({
  name: "test-online-excel",
});

onMounted(() => {
});
</script>

<template>
  <div class="w-240 h-100">
    <ao-online-excel
      load-url="http://localhost:8000/load"
      save-url="http://localhost:8000/save"
      :filename="route.query.f as string"
    ></ao-online-excel>
  </div>
</template>

<style scoped></style>
