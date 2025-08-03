<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";
import {
  formContextKey,
  formItemContextKey,
  formItemProps,
  type FormItemContext,
  type FormItemValidateState,
} from "../../types/form";
import { computed, inject, onMounted, provide, ref } from "vue";
import AsyncValidator, { type Values } from "async-validator";

defineOptions({
  name: "ao-form-item",
});
const bem = createNamespace("form-item");
const props = defineProps(formItemProps);
const formContext = inject(formContextKey);

function getRuleFiltered(trigger: string) {
  return props.rules?.filter((rule) => {
    if (!rule.trigger || !trigger) return true; //如果没有触发条件或者没有触发规则
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger);
    } else {
      return rule.trigger === trigger;
    }
  });
}

// 合并父组件form的规则和自身form-item的规则
const _rules = computed(() => {
  const curItemRules = props.rules;
  const formRules = formContext?.rules;

  if (formRules && props.prop) {
    const _temp = formRules[props.prop];

    if (_temp && curItemRules) {
      curItemRules.push(..._temp);
    }
  }
  return curItemRules;
});

function onValidationSuccessed() {
  validateState.value = "success";
  validateMessage.value = "";
}
function onValidationFailed(error: Values) {
  validateState.value = "error";
  validateMessage.value = error ? error.errors[0].message : "";
}

const context: FormItemContext = {
  ...props,
  validate: async (trigger: string, callback?) => {
    // 触发时
    // rules:触发的规则
    // trigger:触发的方式
    const rules = getRuleFiltered(trigger);

    const modelName = props.prop;
    let validator = null;
    // 校验器
    if (modelName) {
      validator = new AsyncValidator({ [modelName]: rules });
    }

    const model = formContext?.model;

    return validator
      ?.validate({
        [modelName]: model[modelName],
      })
      .then(() => {
        console.log("success");
        onValidationSuccessed();
      })
      .catch((err) => {
        onValidationFailed(err);
        return Promise.reject(err);
      });
  },
};

provide(formItemContextKey, context);

const validateState = ref<FormItemValidateState>("");
const validateMessage = ref("");

onMounted(() => {
  // 将自己的上下文添加到父亲form中
  formContext?.addField(context);
});
</script>

<template>
  <div
    :class="[
      bem.b(),
      'mb-6',
      bem.is('error', validateState === 'error'),
      bem.is('success', validateState === 'success'),
    ]"
  >
    <label
      :class="[
        bem.e('label'),
        'block text-sm text-gray-700 dark:text-gray-300 mb-2',
        validateState === 'error' ? 'text-danger-DEFAULT' : '',
        validateState === 'success' ? 'text-success-DEFAULT' : '',
      ]"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div :class="[bem.e('content'), 'relative']">
      <slot></slot>
      <div :class="[bem.e('error'), 'text-danger-DEFAULT text-xs mt-1']">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>
