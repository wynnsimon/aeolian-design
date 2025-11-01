import type { RuleItem } from "async-validator";
import type { ExtractPropTypes, InjectionKey, PropType } from "vue-demi";

export type ArrayAble<T> = T | T[];

interface FormItemRule extends RuleItem {
  trigger?: ArrayAble<string>;
}

export const formItemValidateState = ["", "error", "success"] as const;

export type FormItemValidateState = (typeof formItemValidateState)[number];

export const formItemProps = {
  // 校验输入框的属性
  prop: String,
  // 输入框的标签
  label: String,
  // 输入框的校验规则
  rules: [Array] as PropType<FormItemRule[]>,
  // 是否显示校验信息
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const;

export const formProps = {
  // 表单数据
  model: Object,
  // 表单校验规则
  rules: [Array] as PropType<FormItemRule[]>,
  // 是否显示校验信息
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const;

export type FormProps = Partial<ExtractPropTypes<typeof formProps>>;
export type FormItemProps = Partial<ExtractPropTypes<typeof formItemProps>>;

export interface FormItemContext extends FormItemProps {
  validate: (
    trigger: string,
    callback?: (isValid: boolean) => void
  ) => Promise<any>;
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void;
}

export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol("form-item");
export const formContextKey: InjectionKey<FormContext> = Symbol("form");
