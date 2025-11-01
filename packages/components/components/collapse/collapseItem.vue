<!-- collapseItem.vue -->
<script setup lang="ts">
import { computed, inject, ref, watch } from "vue-demi";
import { collapseContextKey, collapseItemProps } from "../../types/collapse";
import { createNamespace } from "@aeolian-design/utils/src/create";

defineOptions({
  name: "ao-collapse-item",
});

const props = defineProps(collapseItemProps);
const bem = createNamespace("collapse-item");
const collapseContext = inject(collapseContextKey);

const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name!);
});

// 控制内容区域的显示状态和动画
const contentRef = ref<HTMLElement | null>(null);
const isAnimating = ref(false);
const showContent = ref(false);
const contentHeight = ref(0);

function handleItemClick() {
  if (props.disabled) {
    return;
  }
  collapseContext?.handleItemClick(props.name!);
}

// 监听激活状态变化，触发动画
watch(isActive, (newVal) => {
  if (newVal) {
    // 展开动画
    showContent.value = true;
    isAnimating.value = true;
    // 等待下一帧获取内容高度
    setTimeout(() => {
      if (contentRef.value) {
        contentHeight.value = contentRef.value.scrollHeight;
      }
    }, 0);
  } else {
    // 关闭动画
    isAnimating.value = true;
    if (contentRef.value) {
      contentHeight.value = contentRef.value.scrollHeight;
      // 触发关闭动画
      setTimeout(() => {
        contentHeight.value = 0;
      }, 0);
    }
  }
});

// 动画结束后的处理
function onTransitionEnd() {
  if (!isActive.value) {
    showContent.value = false;
  }
  isAnimating.value = false;
}
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.is('disabled', disabled),
      disabled ? 'opacity-50' : '',
    ]"
    class="border-b border-gray-200 last:border-b-0"
  >
    <div
      :class="[
        bem.e('header'),
        disabled ? 'cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer',
      ]"
      @click="handleItemClick"
      class="flex justify-between items-center p-4 transition-colors duration-200 font-medium text-gray-700"
    >
      <slot name="title">
        {{ title }}
      </slot>
      <div
        class="transform transition-transform duration-300 w-5 h-5 text-gray-500 i-heroicons-chevron-down"
        :class="{ 'rotate-180': isActive }"
      ></div>
    </div>
    <div
      v-show="showContent || isAnimating"
      :class="bem.e('content')"
      class="overflow-hidden transition-all duration-300 ease-in-out"
      :style="{
        height: isActive && !isAnimating ? 'auto' : contentHeight + 'px',
      }"
      @transitionend="onTransitionEnd"
    >
      <div ref="contentRef" class="p-4 text-gray-600">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
