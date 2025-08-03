<script setup lang="ts">
import {
  type Key,
  type TreeNode,
  type TreeOption,
} from "@aeolian-design/components/types/tree";
import { AppleOutlined } from "@vicons/antd";
import { ref } from "vue";

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

const tableCols = Array.from({ length: 10 }, (_, i) => {
  return {
    label: `header${i}`,
    key: i,
  };
});

const tableData = Array.from({ length: 1000 }, (_, i) => {
  return Array.from({ length: 10 }, (_, j) => {
    return `${i}-${j}`;
  });
});

const check = ref(true);

const username = ref("aeolian");
</script>

<template>
  <div>
    <ao-icon :color="'blue'" :size="40">
      <AppleOutlined />
    </ao-icon>

    <ao-icon :color="'#26fec3'" :size="'60px'">
      <AppleOutlined />
    </ao-icon>

    {{ username }}
    <ao-input
      v-model="username"
      placeholder="请输入用户名"
      @blur="(e) => console.log(e)"
      @focus="(e) => console.log(e)"
      :show-password="true"
    >
      <template #prepend>aeolian</template>
      <template #prefixIcon>
        <ao-icon>
          <AppleOutlined />
        </ao-icon>
      </template>
      <template #suffixIcon>
        <ao-icon>
          <AppleOutlined />
        </ao-icon>
      </template>
      <template #append> design </template>
    </ao-input>

    <div class="w-240 h-200">
      <ao-canvas-table
        :columns="tableCols"
        :data="tableData"
        :item-height="50"
        :item-width="100"
      ></ao-canvas-table>
    </div>
    <ao-button
      type="primary"
      size="small"
      icon-placement="right"
      @click="console.log(1)"
      @mousedown="console.log(2)"
      round
      >你好
      <template #icon>
        <AppleOutlined />
      </template>
    </ao-button>

    {{ check }}
    <ao-checkbox
      v-model="check"
      :disabled="false"
      :indeterminate="true"
      label="测试"
      @change="(value) => console.log(value)"
    ></ao-checkbox>

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

    <div class="w-[90vw]">
      <ao-virtual-list
        :columns="tableCols"
        :data="tableData"
        :item-height="60"
        :item-width="100"
        :count="5"
      ></ao-virtual-list>
    </div>
  </div>
</template>

<style scoped></style>
