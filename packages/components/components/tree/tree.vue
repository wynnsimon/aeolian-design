<script setup lang="ts">
import { computed, provide, ref, unref, useSlots, watch } from "vue";
import { createNamespace } from "@aeolian-design/utils/src/create";
import AoTreeNode from "./treeNode.vue";
import {
  treeEmits,
  treeInjectKey,
  treeProps,
  type Key,
  type TreeNode,
  type TreeOption,
} from "../../types/tree";
// import AoVirtualList from "../virtualList/virtualList.tsx";

const bem = createNamespace("tree");
defineOptions({
  name: "ao-tree",
});

const props = defineProps(treeProps);
const emits = defineEmits(treeEmits);
const tree = ref<TreeNode[]>([]);

// 根据用户传入的字段获取数据中的字段
function getLabel(node: TreeOption): Key {
  return node[props.labelField] as Key;
}

function getKey(node: TreeOption): Key {
  return node[props.keyField] as Key;
}

function getChildren(node: TreeOption): TreeOption[] {
  return node[props.childrenField] as TreeOption[];
}

// 遍历树形数据
function tarversal(
  data: TreeOption[],
  parent: TreeNode | null = null
): TreeNode[] {
  return data.map((node) => {
    const children: TreeOption[] = getChildren(node);
    const treeNode = {
      label: getLabel(node),
      key: getKey(node),
      level: parent ? parent.level + 1 : 0,
      rawNode: node,
      children: [] as TreeNode[],
      disabled: !!node.disabled,
      // 如果node没有isLeaf属性，则根据children是否为空来判断
      isLeaf: node.isLeaf ?? children?.length === 0,
    };

    if (children?.length > 0) {
      treeNode.children = tarversal(children, treeNode);
    }
    return treeNode;
  });
}

// 格式化数据
function createTree(
  data: TreeOption[],
  parent: TreeNode | null = null
): TreeNode[] {
  const result = tarversal(data, parent);
  return result;
}

// 监听数据变化调用格式化函数
watch(
  props.data,
  (newData: TreeOption[]) => {
    tree.value = createTree(newData);
    console.log(tree.value);
  },
  { immediate: true }
);

// 需要展开的key
// 展开的元素包括它的子元素也显示出来
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys));

/*
  40
    4030
    4040
    4050
      405010
      405020
  50
    5010
  ----------------
    result=[40,4030,4040,4050,405010,405020,50,5010]
*/
// 扁平化的树
const flattenTree = computed(() => {
  // 要展开的key
  let expandedKeys = expandedKeysSet.value;
  // 最终扁平化的节点
  let flattenNodes: TreeNode[] = [];
  // 被格式化后的节点
  const nodes = tree.value || [];
  // 用于遍历树的栈
  const stack: TreeNode[] = [];

  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i]);
  }

  // 先序遍历
  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    flattenNodes.push(node); // 添加当前节点到扁平化列表
    // 如果当前节点的key在展开的key中，则添加到扁平化
    if (expandedKeys.has(node.key)) {
      const children = node.children;
      if (children) {
        for (let i = node.children.length - 1; i >= 0; --i) {
          stack.push(children[i]); // 将子节点添加到栈中
        }
      }
    }
  }
  return flattenNodes;
});

const loadingKeysRef = ref(new Set<Key>());

function triggerLoading(node: TreeNode) {
  // 异步加载节点
  if (!node.children.length && !node.isLeaf) {
    // 如果没有加载过这个节点则加载
    const loadingKeys = loadingKeysRef.value;
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key);
      const onload = props.onload;
      if (onload) {
        onload(node.rawNode).then((children) => {
          // 修改原来的节点
          node.rawNode.children = children;
          // 更新自定义的node
          node.children = createTree(children, node);
          loadingKeys.delete(node.key);
        });
      }
    }
  }
}

function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key);
}
// 折叠
function collapse(node: TreeNode) {
  expandedKeysSet.value.delete(node.key);
}
// 展开
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key);
  // 异步加载子节点数据
  triggerLoading(node);
}
// 切换状态
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value;
  // 如果当前节点正在加载中不能收起
  if (expandKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
    collapse(node);
  } else {
    expand(node);
  }
}

const selectKeysRef = ref<Key[]>([]);
function handleSelect(node: TreeNode) {
  // 如果不能选择就不做
  if (!props.selectable) return;
  let keys = unref(selectKeysRef);

  if (props.multiple) {
    // 支持多选的逻辑
    const index = keys.findIndex((key) => key === node.key);
    if (index > -1) {
      keys.splice(index, 1);
    } else {
      keys.push(node.key);
    }
  } else {
    // 单选的逻辑
    if (keys.includes(node.key)) {
      keys = [];
    } else {
      keys = [node.key];
    }
  }
  emits("update:selectedKeys", keys);
}

watch(
  () => props.selectedKeys,
  (value) => {
    if (value) {
      selectKeysRef.value = value;
    }
  },
  {
    immediate: true,
  }
);

provide(treeInjectKey, {
  slots: useSlots(),
});

console.log(flattenTree.value);
</script>

<template>
  <div :class="bem.b()" class="inline-block w-full">
    <div v-for="node in flattenTree" :key="node.key">
      <ao-tree-node
        :key="node.key"
        :node="node"
        :expanded="isExpanded(node)"
        :loading-keys="loadingKeysRef"
        :selectedKeys="selectKeysRef"
        @toggle="toggleExpand"
        @select="handleSelect"
      >
        <div :class="bem.e('element')">{{ node.label }}</div>
      </ao-tree-node>
    </div>
  </div>
</template>

<style scoped></style>
