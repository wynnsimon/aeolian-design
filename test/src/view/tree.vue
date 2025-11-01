<script setup lang="ts">
import { ref } from "vue";
import { type Key } from "@aeolian-design/components/types/tree";

defineOptions({
  name: "test-tree",
});

// const data = ref<TreeOption[]>([
//   {
//     key: "0",
//     label: "0",
//     children: [
//       {
//         key: "0-0",
//         label: "0-0",
//       },
//       {
//         key: "0-1",
//         label: "0-1",
//         disabled: true,
//         children: [
//           {
//             key: "0-1-0",
//             label: "0-1-0",
//           },
//           {
//             key: "0-1-1",
//             label: "0-1-1",
//           },
//         ],
//       },
//     ],
//   },
// ]);

// 普通数据------------------
const data = ref(createData());
function createData(level = 4, parentKey = ""): any {
  if (!level) return [];
  const arr = new Array(20 - level).fill(0);
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx;
    return {
      label: createLabel(level), //内容
      key, //唯一标识
      children: createData(level - 1, key), //子节点
    };
  });
}
function createLabel(level: number): string {
  if (level === 1) return "4级";
  if (level === 2) return "3级";
  if (level === 3) return "2级";
  if (level === 4) return "1级";
  return "";
}

//异步加载测试数据-------------------
// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false,
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false,
//     },
//   ];
// }
// function nextLabel(currentLabel?: string | number): string {
//   if (!currentLabel) return "Out of Tao, One is born";
//   if (currentLabel === "Out of Tao, One is born")
//     return "Out of Tao,Two is born";
//   if (currentLabel === "Out of Tao,Two is born")
//     return "Out of Tao,Three is born";
//   if (currentLabel === "Out of Tao,Three is born")
//     return "Out of Tao,Four is born";
//   return "";
// }
// function handleLoad(node: TreeOption) {
//   // 内部需要将展开的节点传递出来
//   return new Promise<TreeOption[]>((resolve) => {
//     setTimeout(() => {
//       resolve([
//         {
//           label: nextLabel(node.label),
//           key: node.key + nextLabel(node.label),
//           isLeaf: false,
//         },
//       ]);
//     }, 1000);
//   });
// }

const value = ref<Key[]>([]);
</script>

<template>
  <div>
    <ao-tree
      :data="data"
      v-model:selected-keys="value"
      :default-checked-keys="['40', '41']"
      selectable
      multiple
      show-checkbox
    >
      <template #default="{ node }">{{ node.key }}-{{ node.label }}</template>
    </ao-tree>
  </div>
</template>

<style scoped></style>
