<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";
import { buttonEmits, buttonProps, type Type } from "../../types/button";
import { computed, useSlots } from "vue-demi";
import { Loading3QuartersOutlined } from "@vicons/antd";

defineOptions({
  name: "ao-button",
  inheritAttrs: false,
});
const bem = createNamespace("button");
const props = defineProps(buttonProps);
const emits = defineEmits(buttonEmits);

// 定义按钮类型对应的样式类
const typeClassMap: Record<Type, string> = {
  default: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500",
  primary:
    "text-white bg-primary hover:bg-primary-light-3 focus:ring-primary-light-9",
  success:
    "text-white bg-success hover:bg-success-light-5 focus:ring-success-light-9",
  warning:
    "text-white bg-warning hover:bg-warning-light-5 focus:ring-warning-light-9",
  danger:
    "text-white bg-danger hover:bg-danger-light-5 focus:ring-danger-light-9",
  error: "text-white bg-error hover:bg-error-light-5 focus:ring-error-light-9",
  info: "text-white bg-info hover:bg-info-light-5 focus:ring-info-light-9",
};
// 获取当前按钮类型对应的类
const buttonTypeClasses = computed(() => {
  return typeClassMap[props.type] || typeClassMap.default;
});

const slots = useSlots();
</script>

<template>
  <Component
    :is="'button'"
    :type="nativeType"
    :disabled="disabled || loading"
    class="inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-sans text-xs font-semibold leading-4 shadow-sm disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2"
    @click="emits('click', $event)"
    @mousedown="emits('mousedown', $event)"
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled),
      buttonTypeClasses,
      {
        'px-2 py-1': size === 'small',
        'px-3 py-2': size === 'medium',
        'px-4 py-3': size === 'large',
        'rounded-full': round,
      },
    ]"
  >
    <ao-icon
      v-if="loading && iconPlacement === 'left'"
      color="white"
      class="mx-1"
      :size="'16px'"
    >
      <template v-if="slots.icon">
        <Component :is="slots.icon"></Component>
      </template>
      <Loading3QuartersOutlined v-else class="animate-spin" />
    </ao-icon>
    <slot />
    <ao-icon
      v-if="loading && iconPlacement === 'right'"
      color="white"
      class="mx-1"
      :size="'16px'"
    >
      <template v-if="slots.icon">
        <Component :is="slots.icon"></Component>
      </template>
      <Loading3QuartersOutlined v-else class="animate-spin" />
    </ao-icon>
  </Component>
</template>

<style scoped></style>
