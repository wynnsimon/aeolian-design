import type {
  ComponentInternalInstance,
  ExtractPublicPropTypes,
  PropType,
  VNode,
} from "vue-demi";

export const messageProps = {
  message: {
    type: [String, Object] as PropType<string | VNode>,
    required: false,
  },
  duration: {
    type: Number,
    default: 3000,
    required: false,
  },
  showClose: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String as PropType<"info" | "success" | "warning" | "error">,
    required: false,
    default: "info",
  },
  onDestory: {
    type: Function as PropType<() => void>,
    required: false,
  },
  offset: {
    type: Number,
    required: false,
    default: 20,
  },
  id: {
    type: String,
    required: false,
  },
  zIndex: {
    type: Number,
    required: false,
  },
} as const;

export type MessageProps = ExtractPublicPropTypes<typeof messageProps>;
export interface MessageContext {
  id: string;
  vnode: VNode;
  props: MessageProps;
  vm: ComponentInternalInstance;
  destory: () => void;
}
