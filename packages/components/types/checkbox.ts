import type{ ExtractPropTypes, PropType } from "vue-demi";

export const checkboxProps = {
  // 绑定值
  modelValue: {
    type: [String, Number, Boolean, Array] as PropType<
      string | number | boolean
    >,
    default: "",
  },
  // 是否半选
  indeterminate: Boolean,
  // 是否禁用
  disabled: Boolean,
  // 显示文字
  label: String as PropType<string>,
};

export const checkboxEmits = {
  // 数据更新
  "update:modelValue": (value: boolean | string | number) => typeof value === "boolean",
  // 选中状态改变
  change: (value: boolean) => typeof value === "boolean",
};

export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>;
export type CheckboxEmits = typeof checkboxEmits;