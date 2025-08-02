<script setup lang="ts">
import { iconProps } from "../../types/icon";
import { createNamespace } from "@aeolian-design/utils/src/create";

defineOptions({
  name: "ao-icon",
});

const props = defineProps(iconProps);
const bem = createNamespace("icon");
</script>

<template>
  <i
    class=" inline-flex h-4 w-4"
    :class="bem.b()"
    :style="{
      color: props.color,
      height: typeof props.size === 'number' ? props.size + 'px' : props.size,
      width: typeof props.size === 'number' ? props.size + 'px' : props.size,
    }"
  >
    <slot :class="bem.e('element')"></slot>
  </i>
</template>

<style scoped></style>
