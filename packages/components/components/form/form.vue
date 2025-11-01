<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";
import {
  formContextKey,
  formProps,
  type FormContext,
  type FormItemContext,
} from "../../types/form";
import { provide } from "vue-demi";
import type { Values } from "async-validator";

defineOptions({
  name: "ao-form",
});
const bem = createNamespace("form");
const props = defineProps(formProps);

// 包含的所有form-item字段
const fields: FormItemContext[] = [];

const addField: FormContext["addField"] = (context) => {
  fields.push(context);
};

const context = {
  ...props,
  addField,
};

async function validate(callback?: (valid: boolean, fields?: Values) => void) {
  let errors: Values = {};
  for (const field of fields) {
    try {
      await field.validate("");
    } catch (error) {
      errors = {
        ...errors,
        ...(error as Values).fields,
      };
    }
  }

  // 支持回调和promise
  if (Object.keys(errors).length === 0) {
    callback?.(true);
    return Promise.resolve();
  } else {
    callback?.(false, errors);
    return Promise.reject(errors);
  }
}

defineExpose({
  // 暴露给用户使用校验方法
  validate,
});
provide(formContextKey, context);
</script>

<template>
  <form :class="[bem.b()]">
    <slot></slot>
  </form>
</template>

<style scoped></style>
