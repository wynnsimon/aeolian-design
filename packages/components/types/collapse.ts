import type { ExtractPropTypes, PropType, Ref, InjectionKey } from "vue";

export type NameType = string | number;
export const collapseProps = {
  modelValue: {
    type: Array as PropType<NameType[]>,
    default: () => [],
  },
  accordion: {
    type: Boolean,
    default: false,
  },
} as const;

export const collapseItemProps = {
  name: {
    type: [String, Number] as PropType<NameType>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
} as const;

export const collapseEmits = {
  "update:modelValue": (value: NameType[]) => value,
  change: (value: NameType[]) => value,
};

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>;
export type collapseProps = ExtractPropTypes<typeof collapseProps>;

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol("collapseContextKey");
