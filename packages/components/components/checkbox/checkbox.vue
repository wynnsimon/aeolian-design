<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";

defineOptions({
  name: "ao-checkbox",
});
const bem = createNamespace("checkbox");
</script>

<template>
  <label :class="bem.b()">
    <span>
      <input type="checkbox" />
      <span></span>
    </span>
  </label>
</template>

<style scoped></style>
