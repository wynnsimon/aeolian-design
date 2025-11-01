import type {
  ExtractPropTypes,
  InjectionKey,
  PropType,
  SetupContext,
} from "vue-demi";

export type Key = string | number;

/**
 * 树形组件接受的数据
 */
export interface TreeOption {
  label?: Key;
  key: Key;
  children?: TreeOption[];
  isLeaf?: boolean;
  disabled?: boolean;
  [key: string]: unknown; //任意接口
}

export interface TreeNode extends Required<TreeOption> {
  level: number;
  rawNode: TreeOption;
  children: TreeNode[];
  parentKey: Key | undefined;
}

/**
 * 树形组件接口
 * @param data 树形数据
 * @param labelField 树形数据中的 label 字段名
 * @param keyField 树形数据中的 key 字段名
 * @param childrenField 树形数据中的 children 字段名
 */
export const treeProps = {
  data: {
    type: Array as () => TreeOption[],
    default: () => [],
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  labelField: {
    type: String,
    default: "label",
  },
  keyField: {
    type: String,
    default: "key",
  },
  childrenField: {
    type: String,
    default: "children",
  },
  onload: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  selectedKeys: {
    type: Array as PropType<Key[]>,
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
} as const;

// 树形组件节点的属性类型
export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    required: true,
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  checked: Boolean,
  disabled: Boolean,
  indeterminate: Boolean,
};

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
  check: (node: TreeNode,value: boolean) => typeof value === "boolean",
};
export const treeEmits = {
  "update:selectedKeys": (keys: Key[]) => keys,
};

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>;
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;

export interface TreeContext {
  slots: SetupContext["slots"];
  // emit: SetupContext<typeof treeEmits>["emit"];
}

// 提供出去的数据
export const treeInjectKey: InjectionKey<TreeContext> = Symbol();
export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
};
