import type { Placement } from "@popperjs/core";
import type { ExtractPropTypes, PropType } from "vue-demi";
export const tooltipProps = {
  //  内容
  content: {
    type: String,
    default: "",
  },
  // 触发方式
  trigger: {
    type: String as PropType<"click" | "hover">,
    default: "hover",
  },
  // 弹出位置
  placement: {
    type: String as PropType<Placement>,
    default: "top",
  },
} as const;

export const tooltipEmits = {
  visibleChange: ( visible: boolean) => visible,
} as const;

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;
export type TooltipEmits = ExtractPropTypes<typeof tooltipEmits>;
