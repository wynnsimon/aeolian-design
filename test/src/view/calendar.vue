<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: "test-calendar",
});

const curDate = ref(new Date());
</script>

<template>
  <div>
    {{ curDate }}
    <ao-calendar v-model="curDate"> </ao-calendar>
  </div>
</template>

<style scoped></style>
