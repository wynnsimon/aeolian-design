import type { ExtractPropTypes, PropType } from "vue"

export type Size='small' | 'medium' | 'large'
export type Type='primary' | 'success' | 'warning' | 'danger' | 'error' | 'info' | 'default'
export type NativeType='button' | 'submit' | 'reset'
export type Placement='left' | 'right'

export const buttonProps = {
  type: {
    type: String as PropType<Type>,
    validator: (value: string) => {
      return ['primary', 'success', 'warning', 'danger', 'info', 'default', ''].includes(value)
    },
    default: ''
  },
  size: {
    type: String as PropType<Size>,
    default: 'medium'
  },
  nativeType: {
    type: String as PropType<NativeType>,
    default: 'button'
  },
  iconPlacement: {
    type: String as PropType<Placement>,
    default: 'left'
  },
  round:Boolean,
  loading:Boolean,
  disabled:Boolean,
}as const;

export const buttonEmits={
  click:(e:MouseEvent)=>e instanceof MouseEvent,
  mousedown:(e:MouseEvent)=>e instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = typeof buttonEmits;