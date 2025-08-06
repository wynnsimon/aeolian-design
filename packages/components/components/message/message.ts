import type { MessageProps, MessageContext } from "../../types/message";
import Message from ".";
import { h, shallowReactive, render, ref, computed } from "vue";

const zIndex = ref(0);
function useZIndex(initialValue: number = 2000) {
  const initialZIndex = ref(initialValue);
  const currentZIndex = computed(() => {
    return (zIndex.value += initialZIndex.value);
  });

  function nextZIndex() {
    zIndex.value++;
    return currentZIndex.value;
  }
  return {
    currentZIndex,
    nextZIndex,
    initialZIndex,
  };
}

let seed = 1;
const instances = shallowReactive<MessageContext[]>([]);
export function createMessage(props: MessageProps) {
  const {nextZIndex}=useZIndex();
  const id = `message_${seed++}`;
  function destroyed() {
    const index = instances.findIndex((item) => item.id === id);
    if (index >= 0) {
      instances.splice(index, 1);
    }
    render(null, container);
  }

  function manualDestory() {
    const instance = instances.find((item) => item.id === id);
    if (instance) {
      instance.vm.exposed!.visible = false;
    }
  }

  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroyed,
  };

  const container = document.createElement("div");
  const vnode = h(Message, newProps);
  render(vnode, container);

  document.body.appendChild(container.firstElementChild!);
  const vm = vnode.component!;
  const instance = {
    id,
    vnode,
    props: newProps,
    vm,
    destory: manualDestory,
  };
  instances.push(instance);
  return instance;
}

export function getLastInstance() {
  return instances[instances.length - 1];
}

export function getLastBottomOffset(id: string): number {
  const index = instances.findIndex((item) => item.id === id);
  if (index <= 0) {
    return 0;
  } else {
    const prev = instances[index - 1];
    return prev.vm.exposed!.bottomOffset.value;
  }
}
