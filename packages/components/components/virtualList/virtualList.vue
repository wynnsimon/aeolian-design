<script setup lang="ts">
import { computed, ref } from "vue-demi";
import { createNamespace } from "@aeolian-design/utils/src/create";
import { virtualListProps } from "../../types/virtual";

defineOptions({
  name: "ao-virtual-list",
});

const props = defineProps(virtualListProps);
const bem = createNamespace("virtual-list");

const containerRef = ref<HTMLElement | null>(null);
// 当前数据的开头索引
let start = ref(0);

// 预留显示的数据的个数
// 前面预留显示个数
const prev = computed(() => {
  return Math.min(start.value, props.count);
});
// 后面预留显示个数
const next = computed(() => {
  return Math.min(props.data!.length - start.value - props.count, props.count);
});

// 显示数据的列表
const showList = computed(() => {
  return props.data!.slice(
    start.value - prev.value,
    start.value + props.count + next.value
  );
});

function handleScroll() {
  start.value = Math.floor(containerRef.value!.scrollTop / props.itemHeight);
}
</script>

<template>
  <div
    :class="bem.b()"
    :style="{ height: itemHeight + 'px',width: itemWidth * columns!.length + 'px' }"
  >
    <div
      class="flex w-full font-bold border-b-2 border-gray-300 bg-gray-100 sticky top-0 z-10"
      :class="bem.e('header')"
      :style="{ height: itemHeight + 'px' }"
    >
      <div
        v-for="item in columns"
        :key="item.key"
        class="flex items-center justify-center"
        :style="{ width: itemWidth + 'px' }"
      >
        <div>{{ item.label }}</div>
      </div>
    </div>
    <div
      class="h-full w-full overflow-auto relative"
      :class="bem.e('container')"
      :style="{ height: itemHeight * count + 'px' }"
      ref="containerRef"
      @scroll="handleScroll"
    >
      <div
        class="absolute top-0 left-0"
        :class="bem.e('scroll-list')"
        :style="{
          height: itemHeight * count + 'px',
          top: start * itemHeight + 'px',
        }"
      >
        <div class="flex" v-for="(i, index) in showList" :key="index">
          <slot :data="i">
            <div v-for="j in i" :key="j">
              <div
                class="border-1 border-solid text-center box-border"
                :style="{
                  height: itemHeight + 'px',
                  width: itemWidth + 'px',
                  lineHeight: itemHeight + 'px',
                }"
              >
                {{ j }}
              </div>
            </div>
          </slot>
        </div>
      </div>
      <!-- 撑开盒子高度 -->
      <div
        :class="bem.e('scroll-bar')"
        :style="{ height: itemHeight * data!.length + 'px' }"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
