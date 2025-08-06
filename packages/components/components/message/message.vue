<script setup lang="ts">
import { messageProps } from "../../types/message";
import { createNamespace } from "@aeolian-design/utils/src/create";
import AoIcon from "../icon";
import { CloseOutlined } from "@vicons/antd";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { getLastBottomOffset } from "./message";

defineOptions({
  name: "ao-message",
});

const props = defineProps(messageProps);
const bem = createNamespace("message");
const visible = ref(false);
const messageRef = ref<HTMLDivElement | null>(null);

// 计算偏移高度
const height = ref(0);
// 上一个示例最下面的坐标
const lastOffset = computed(() => getLastBottomOffset(props.id!));
// 当前元素的offset
const topOffset = computed(() => props.offset + lastOffset.value);
// 下一个元素预留的offset也就是自身的bottom
const bottomOffset = computed(() => height.value + topOffset.value);

function startTimer() {
  if (props.duration === 0) {
    return;
  }
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
}

onMounted(async () => {
  visible.value = true;
  startTimer();
  await nextTick();
  height.value = messageRef.value?.getBoundingClientRect().height || 0;
});

watch(
  () => visible.value,
  (newVal) => {
    if (!newVal && props.onDestory) {
      props.onDestory();
    }
  }
);

defineExpose({
  bottomOffset,
  visible,
});
</script>

<template>
  <div
    v-show="visible"
    ref="messageRef"
    :class="[
      bem.b(),
      bem.is('visible', visible),
      zIndex ?? `z-${zIndex}`,
      'fixed left-1/2 -translate-x-1/2',
      'min-w-380px border rounded-md',
      'px-5 py-4',
      'flex items-center',
      'shadow-md',
      'transition-all duration-300 ease-in-out',
      'z-1000',
      // info 类型样式
      'bg-info-light-9 border-info-light-8 text-info',
      // success 类型样式
      props.type === 'success' &&
        'bg-success-light-9 border-success-light-8 text-success',
      // warning 类型样式
      props.type === 'warning' &&
        'bg-warning-light-9 border-warning-light-8 text-warning',
      // error 类型样式
      props.type === 'error' &&
        'bg-error-light-9 border-error-light-8 text-error',
    ]"
    role="alert"
    :style="{ top: topOffset + 'px' }"
  >
    <div :class="bem.e('wrapper')" class="flex items-center w-full">
      <span :class="bem.m('content')" class="flex-1 pr-3 text-sm">
        <slot>
          {{ message }}
        </slot>
      </span>
      <span
        v-show="showClose"
        @click.stop="() => (visible = false)"
        :class="[bem.e('close')]"
        class="cursor-pointer text-base hover:opacity-70"
      >
        <ao-icon><CloseOutlined /></ao-icon>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
