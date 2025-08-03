import type {  PropType, ExtractPropTypes } from "vue";

export const inputProps = {
  // 输入框的类型
  type: {
    type: String,
    default: "text",
  },
  // 绑定值
  modelValue: {
    type: [Number, String] as PropType<string | number>,
    default: "",
  },
  // 占位符
  placeholder: {
    type: String,
    default: "",
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否可清空
  clearable: {
    type: Boolean,
  },
  // 密码可见
  showPassword: {
    type: Boolean,
    default: false,
  },
  // 只读
  readonly: {
    type: Boolean,
    default: false,
  },
  // 输入框标题
  label: {
    type: String,
  },
};

export const inputEmits = {
  // 输入框内容发生改变时触发
  "update:modelValue": (value: string) => String(value),
  // 输入框内容发生改变时触发
  change: (value: string) => String(value),
  // 输入框输入时触发
  input: (value: string) => String(value),
  // 输入框获得焦点时触发
  focus: (e:FocusEvent) => e instanceof FocusEvent,
  // 输入框失去焦点时触发
  blur: (e:FocusEvent) => e instanceof FocusEvent,
  // 清空
  clear: () => true,
};

export type InputProps = ExtractPropTypes<typeof inputProps>;
export type InputEmits = typeof inputEmits;