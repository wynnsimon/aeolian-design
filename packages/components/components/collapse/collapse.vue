<script setup lang="ts">
import { onMounted, provide, ref, watch } from "vue-demi";
import {
  collapseContextKey,
  collapseProps,
  type NameType,
  collapseEmits,
} from "../../types/collapse";
import { createNamespace } from "@aeolian-design/utils/src/create";

defineOptions({
  name: "ao-collapse",
});

const props = defineProps(collapseProps);
const emit = defineEmits(collapseEmits);
const bem = createNamespace("collapse");

const activeNames = ref<NameType[]>(props.modelValue);

function handleItemClick(item: NameType) {
  if (props.accordion) {
    // 如果是手风琴模式，则只能展开一个面板
    activeNames.value = activeNames.value.includes(item) ? [] : [item];
  } else {
    const index = activeNames.value.indexOf(item);
    // 存在展开数组中则删除，不存在则添加
    if (index > -1) {
      activeNames.value.splice(index, 1);
    } else {
      activeNames.value.push(item);
    }
  }

  emit("update:modelValue", activeNames.value);
  emit("change", activeNames.value);
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});

// 监听modelValue改变，解决异步modelValue改变没有触发的问题
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue;
  }
);

onMounted(() => {
  if (props.accordion && activeNames.value.length > 1) {
    // 手风琴模式下只能展开一个，如果用户传递两个展示的name，则警告
    console.warn(
      "[Aeolian Design Warn][Collapse]Accordion mode expects only 1 active name, and active-names will be overwritten."
    );
  }
});
</script>

<template>
  <div
    :class="bem.b()"
    class="rounded-lg shadow-sm border border-gray-200 overflow-hidden"
  >
    <slot></slot>
  </div>
</template>
