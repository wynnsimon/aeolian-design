<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";
import { checkboxProps, checkboxEmits } from "../../types/checkbox";
import { computed, onMounted, ref, watch } from "vue-demi";

defineOptions({
  name: "ao-checkbox",
});
const props = defineProps(checkboxProps);
const emits = defineEmits(checkboxEmits);
const bem = createNamespace("checkbox");

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const inputRef = ref<HTMLInputElement | null>(null);

function indeterminate(value:boolean) {
  if (props.indeterminate) {
    inputRef.value!.indeterminate = value;
  }
}

watch(() => props.indeterminate, indeterminate);

function handleChange(e: Event) {
  emits("change", (e.target as HTMLInputElement).checked);
}

onMounted(() => {
  indeterminate(props.indeterminate);
});
</script>

<template>
  <label :class="bem.b()">
    <span :class="bem.e('input')">
      <input
        type="checkbox"
        ref="inputRef"
        v-model="model"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
      />
      <span v-if="$slots.default || label" :class="bem.e('label')">
        <slot></slot>
        <template v-if="!$slots.default">{{ label }}</template>
      </span>
    </span>
  </label>
</template>

<style scoped></style>
