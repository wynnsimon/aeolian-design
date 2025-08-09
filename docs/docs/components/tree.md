# Tree 树形控件

文件树组件用于展示具有层级结构的数据，如文件夹结构、组织架构等。

## 使用

### 基础用法

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    key: '1',
    label: '一级节点1',
    children: [
      {
        key: '1-1',
        label: '二级节点1-1',
        children: [
          {
            key: '1-1-1',
            label: '三级节点1-1-1',
            isLeaf: true
          },
          {
            key: '1-1-2',
            label: '三级节点1-1-2',
            isLeaf: true
          }
        ]
      },
      {
        key: '1-2',
        label: '二级节点1-2',
        isLeaf: true
      }
    ]
  },
  {
    key: '2',
    label: '一级节点2',
    children: [
      {
        key: '2-1',
        label: '二级节点2-1',
        isLeaf: true
      }
    ]
  }
])

const selectedKeys = ref([])

const asyncTreeData = ref([
  {
    key: '1',
    label: '节点1',
    isLeaf: false
  },
  {
    key: '2',
    label: '节点2',
    isLeaf: false
  }
])

function onLoad(node) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          key: node.key + '-1',
          label: node.label + '-1',
          isLeaf: false
        }
      ])
    }, 1000)
  })
}
</script>

<ao-tree :data="treeData" v-model:selected-keys="selectedKeys">
  <template #default="{ node }">
    {{ node.label }}
  </template>
</ao-tree>

### 带复选框的树

<ao-tree :data="treeData" v-model:selected-keys="selectedKeys" show-checkbox :default-checked-keys="['1', '2-1']">
  <template #default="{ node }">
    {{ node.label }}
  </template>
</ao-tree>

### 异步加载数据

<ao-tree :data="asyncTreeData" :onload="onLoad" v-model:selected-keys="selectedKeys">
  <template #default="{ node }">
    {{ node.label }}
  </template>
</ao-tree>

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <ao-tree :data="treeData" v-model:selected-keys="selectedKeys" selectable>
      <template #default="{ node }">
        {{ node.label }}
      </template>
    </ao-tree>

    <!-- 可选择的树 -->
    <ao-tree
      :data="treeData"
      v-model:selected-keys="selectedKeys"
      selectable
      multiple
    >
      <template #default="{ node }">
        {{ node.label }}
      </template>
    </ao-tree>

    <!-- 带复选框的树 -->
    <ao-tree
      :data="treeData"
      v-model:selected-keys="selectedKeys"
      show-checkbox
      :default-checked-keys="['1', '2-1']"
    >
      <template #default="{ node }">
        {{ node.label }}
      </template>
    </ao-tree>

    <!-- 异步加载数据 -->
    <ao-tree
      :data="asyncTreeData"
      :onload="onLoad"
      v-model:selected-keys="selectedKeys"
    >
      <template #default="{ node }">
        {{ node.label }}
      </template>
    </ao-tree>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const treeData = ref([
  {
    key: "1",
    label: "一级节点1",
    children: [
      {
        key: "1-1",
        label: "二级节点1-1",
      },
      {
        key: "1-2",
        label: "二级节点1-2",
      },
    ],
  },
  {
    key: "2",
    label: "一级节点2",
    children: [
      {
        key: "2-1",
        label: "二级节点2-1",
      },
    ],
  },
]);

const asyncTreeData = ref([
  {
    key: "1",
    label: "节点1",
    isLeaf: false,
  },
  {
    key: "2",
    label: "节点2",
    isLeaf: false,
  },
]);

const selectedKeys = ref([]);

function onLoad(node) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          key: node.key + "-1",
          label: node.label + "-1",
          isLeaf: false,
        },
      ]);
    }, 1000);
  });
}
</script>
```

## Tree Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| data | `TreeOption[]` | `[]` | 树形数据源 |
| labelField | `string` | `'label'` | 指定节点标签的字段名 |
| keyField | `string` | `'key'` | 指定节点唯一标识的字段名 |
| childrenField | `string` | `'children'` | 指定子节点的字段名 |
| defaultExpandedKeys | `Key[]` | `[]` | 默认展开的节点 key 数组 |
| selectedKeys | `Key[]` | `undefined` | 当前选中的节点 key 数组（支持 v-model）|
| defaultCheckedKeys | `Key[]` | `[]` | 默认选中的复选框节点 key 数组 |
| selectable | `boolean` | `false` | 是否启用节点选择功能 |
| multiple | `boolean` | `false` | 是否支持多选 |
| showCheckbox | `boolean` | `false` | 是否显示复选框 |
| onload | `(node: TreeOption) => Promise<TreeOption[]>` | `undefined` | 异步加载子节点数据的回调函数 |

## Tree Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:selectedKeys | `(keys: Key[]) => void` | 节点选中状态改变时触发 |

## Tree Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| default | `{ node: TreeNode }` | 自定义节点内容 |

## TreeNode Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| node | `TreeNode` | `undefined` | 树节点数据 |
| expanded | `boolean` | `false` | 节点是否展开 |
| loadingKeys | `Set<Key>` | `undefined` | 正在加载的节点 key 集合 |
| selectedKeys | `Key[]` | `[]` | 已选中的节点 key 数组 |
| showCheckbox | `boolean` | `false` | 是否显示复选框 |
| checked | `boolean` | `undefined` | 节点是否被选中 |
| disabled | `boolean` | `undefined` | 节点是否被禁用 |
| indeterminate | `boolean` | `undefined` | 节点是否为半选状态 |

## TreeNode Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| toggle | `(node: TreeNode) => void` | 节点展开/收起时触发 |
| select | `(node: TreeNode) => void` | 节点被选中时触发 |
| check | `(node: TreeNode, value: boolean) => void` | 节点复选框状态改变时触发 |

## TreeNode Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| default | `{ node: TreeNode }` | 自定义节点内容 |