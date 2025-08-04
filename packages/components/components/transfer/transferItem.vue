<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";

defineOptions({
  name: "ao-transfer",
});

const props = defineProps();
const bem = createNamespace("transfer-item");
</script>

<template>
<div :class="bem.b()"></div>
</template>

<style scoped></style>
