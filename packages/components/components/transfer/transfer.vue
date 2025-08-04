<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";
import AoTransferItem from "./transferItem.vue";
import AoButton from "../../components/button";

defineOptions({
  name: "ao-transfer",
});

const props = defineProps();
const bem = createNamespace("transfer");
</script>

<template>
  <div :class="bem.b()">
    <ao-transfer-item></ao-transfer-item>
    <div>
      <ao-button></ao-button>
      <ao-button></ao-button>
    </div>
    <ao-transfer-item></ao-transfer-item>
  </div>
</template>

<style scoped></style>
