<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";
import { treeNodeEmits, treeNodeProps } from "../../types/tree";
import { CaretRightOutlined, Loading3QuartersOutlined } from "@vicons/antd";
import { computed } from "vue-demi";
import AoTreeNodeContext from "./treeNodeContext";
import AoCheckbox from "../checkbox/checkbox.vue";

const props = defineProps(treeNodeProps);
const emits = defineEmits(treeNodeEmits);
const bem = createNamespace("tree-node");

function handleExpand() {
  if (props.node) {
    console.log("handleExpand", props.node);
    emits("toggle", props.node);
  }
}

const isLoading = computed(() => {
  return props.loadingKeys!.has(props.node!.key);
});

const isSelected = computed(() => {
  return props.selectedKeys!.includes(props.node!.key);
});

function handleSelect() {
  if (props.node?.disabled) return;
  if (props.node) {
    emits("select", props.node);
  }
}

function handleCheckChange(value: boolean) {
  emits("check", props.node!, value);
}
</script>

<template>
  <div
    :class="[bem.b(),bem.is('selected', isSelected),bem.is('disabled',node!.disabled)]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: `${(node?.level ?? 0) * 20}px` }"
    >
      <span
        v-if="!node?.isLeaf || !node?.children || node?.children?.length > 0"
        @click="handleExpand"
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node?.isLeaf },
          bem.is('leaf', node?.isLeaf),
        ]"
        class="cursor-pointer inline-block align-middle transform-rotate-0 transition-transform duration-200 ease-in px-1"
      >
        <ao-icon :color="'gray'">
          <Loading3QuartersOutlined v-if="isLoading" class="animate-spin" />
          <CaretRightOutlined v-else />
        </ao-icon>
      </span>
      <ao-checkbox
        v-if="showCheckbox"
        :model-value="checked"
        :disabled="disabled"
        :indeterminate="indeterminate"
        @change="handleCheckChange"
      ></ao-checkbox>
      <span :class="[bem.e('label')]" @click="handleSelect">
        <ao-tree-node-context :node="node"></ao-tree-node-context>
      </span>
    </div>
  </div>
</template>

<style scoped>
.expanded {
  transform: rotate(90deg);
}

.is-selected {
  background-color: red;
}

.is-disabled {
  color: gray;
  cursor: not-allowed;
}
</style>
