<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch, type Ref } from "vue-demi";
import { tooltipProps, tooltipEmits } from "../../types/tooltip";
import { createNamespace } from "@aeolian-design/utils/src/create";
import { createPopper, type Instance } from "@popperjs/core";

defineOptions({
  name: "ao-tooltip",
});

const props = defineProps(tooltipProps);
const emit = defineEmits(tooltipEmits);
const bem = createNamespace("tooltip");

const isOpen = ref(false);
const popperRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
let popperInstance: Instance | null = null;
function togglePopper() {
  isOpen.value = !isOpen.value;
  emit("visibleChange", isOpen.value);
}

watch(
  () => isOpen.value,
  (newVal) => {
    if (newVal) {
      if (triggerRef.value && popperRef.value) {
        popperInstance = createPopper(triggerRef.value, popperRef.value, {
          placement: props.placement,
        });
      } else {
        popperInstance?.destroy();
      }
    }
  },
  { flush: "post" }
);

let events = reactive<Record<string, any>>({});
// 鼠标移动出所有的包括tooltip才关闭
let outerEvents = reactive<Record<string, any>>({});
function open() {
  isOpen.value = true;
  emit("visibleChange", true);
}

function close() {
  isOpen.value = false;
  emit("visibleChange", false);
}

function attachEvents() {
  Object.keys(events).forEach(key => delete events[key]);
  Object.keys(outerEvents).forEach(key => delete outerEvents[key]);
  if (props.trigger === "hover") {
    events["mouseenter"] = open;
    outerEvents["mouseleave"] = close;
  } else if (props.trigger === "click") {
    events["click"] = togglePopper;
  }
}

// 防止异步修改触发条件
watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      events = {};
      outerEvents = {};
      attachEvents();
    }
  }
);

// 当触发条件为点击时点击tooltip组件外部的元素关闭tooltip
function useClickOutside(
  elementRef: Ref<HTMLElement | null>,
  callback: (e: MouseEvent) => void
) {
  function handle(e: MouseEvent) {
    if (
      elementRef.value &&
      e.target &&
      !elementRef.value.contains(e.target as HTMLElement)
    ) {
      callback(e);
    }
  }

  onMounted(() => {
    document.addEventListener("click", handle);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handle);
  });
}

const popperContainerRef = ref<HTMLElement | null>(null);
useClickOutside(popperContainerRef, () => {
  if (props.trigger === "click" && isOpen.value) {
    close();
  }
});

onMounted(() => {
  attachEvents();
});
</script>

<template>
  <div :class="[bem.b()]" v-on="outerEvents" ref="popperContainerRef">
    <div :class="[bem.e('trigger')]" ref="triggerRef" v-on="events">
      <slot></slot>
    </div>
    <div
      v-if="isOpen"
      :class="[bem.e('popper'), 'z-1000', 'relative']"
      ref="popperRef"
    >
      <div
        class="bg-black/40 text-white text-sm py-1 px-3 rounded shadow-lg break-words max-w-200px"
        :class="{
          'after:content-[\'\'] after:absolute after:border-4 after:border-transparent': true,
          'after:border-t-gray-900 after:border-b-0 after:-bottom-1 after:left-1/2 after:-translate-x-1/2':
            props.placement.includes('top'),
          'after:border-b-gray-900 after:border-t-0 after:-top-1 after:left-1/2 after:-translate-x-1/2':
            props.placement.includes('bottom'),
          'after:border-l-gray-900 after:border-r-0 after:-right-1 after:top-1/2 after:-translate-y-1/2':
            props.placement.includes('left'),
          'after:border-r-gray-900 after:border-l-0 after:-left-1 after:top-1/2 after:-translate-y-1/2':
            props.placement.includes('right'),
        }"
      >
        <slot name="content">{{ content }}</slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
