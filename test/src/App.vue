<script setup lang="ts">
import type { FormInstance } from "@aeolian-design/components/components/form";
import { type Key } from "@aeolian-design/components/types/tree";
import type { UploadRawFile } from "@aeolian-design/components/types/upload";
import { AppleOutlined } from "@vicons/antd";
import { reactive, ref } from "vue";
import Transfer from './components/transfer.vue'
import Collapse from './components/collapse.vue'

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

const state = reactive({ username: "", password: "" });
const formRef = ref<FormInstance>();

function validateForm() {
  formRef.value
    ?.validate((valid, errors) => {
      console.log("回调函数的方式", valid, errors);
    })
    .then(() => {
      console.log("Promise的方式:校验成功");
    })
    .catch(() => {
      console.log("Promise的方式:校验失败");
    });
}

function handleUpload(file: UploadRawFile) {
  console.log("上传成功", file);
  return false;
}

const curDate = ref(new Date());
</script>

<template>
  <div>
    <!-- <ao-upload :before-upload="handleUpload" multiple>
      <ao-button type="primary">点我上传</ao-button>
    </ao-upload> -->

    <collapse></collapse>

    <transfer></transfer>

    {{ curDate }}
    <ao-calendar v-model="curDate">
    </ao-calendar>

    <ao-form
      ref="formRef"
      :model="state"
      :rules="[
        {
          username: {
            min: 3,
            max: 10,
            message: '用户名长度在3-10个字符',
            trigger: ['blur', 'change'],
          },
        },
      ]"
    >
      <ao-form-item
        prop="username"
        label="用户名"
        :rules="[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名3-10位',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <ao-input
          placeholder="请输入用户名"
          v-model="state.username"
        ></ao-input>
        <template #label> 用户名 </template>
      </ao-form-item>

      <ao-form-item
        prop="password"
        label="密码"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <ao-input
          placeholder="请输入密码"
          v-model="state.password"
          type="password"
        ></ao-input>
        <template #label> 密码 </template>
      </ao-form-item>
      <ao-button type="primary" @click="validateForm"> 校验 </ao-button>
    </ao-form>

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
