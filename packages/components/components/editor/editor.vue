<script setup lang="ts">
import { ref } from "vue";
import { editorProps } from "../../types/editor";
import { createNamespace } from "@aeolian-design/utils/src/create";

defineOptions({
  name: "ao-editor",
});

const props = defineProps(editorProps);
const bem = createNamespace("editor");
const cursorRef = ref<HTMLDivElement | null>(null);
const colorPickerRef = ref<HTMLInputElement | null>(null);

// 根据命令创建对应的标签
function defineCommand(command: string, value?: string): HTMLElement | null {
  switch (command) {
    case "bold":
      return document.createElement("strong");
    case "italic":
      return document.createElement("em");
    case "underline":
      return document.createElement("u");
    case "color":
      const span = document.createElement("span");
      if (value) {
        span.style.color = value;
      }
      return span;
    default:
      return null;
  }
}

// 判断当前选中的文本是否被对应命令创建的对应标签包裹
function isWrapped(range: Range, command: string, value?: string): boolean {
  let container = range?.commonAncestorContainer;
  if (container.nodeType === Node.TEXT_NODE) {
    container = container.parentNode!;
  }
  while (container && container !== document.body) {
    switch (command) {
      case "bold":
        return container.nodeName === "STRONG" || container.nodeName === "B";
      case "italic":
        return container.nodeName === "EM" || container.nodeName === "I";
      case "underline":
        return container.nodeName === "U";
      case "color":
        if (container.nodeName === "SPAN" && container.style.color) {
          if (value) {
            return container.style.color === value;
          }
          return true;
        }
        break;
      default:
        break;
    }
    container = container.parentNode!;
  }
  return false;
}

// 取消命令对应标签的包裹
function unwrap(range: Range, command: string) {
  let container = range.commonAncestorContainer;

  // 使用递归的方式移除指定格式节点
  function unwrapNode(node: Node) {
    const parent = node.parentNode;
    while (node.firstChild) {
      parent?.insertBefore(node.firstChild, node); // 将子节点插入父节点
    }
    parent?.removeChild(node);
  }
  // 检查和移除目标格式的节点
  let current = container;
  while (current && current !== document.body) {
    if (
      (command === "bold" &&
        (current.nodeName === "STRONG" || current.nodeName === "B")) ||
      (command === "italic" &&
        (current.nodeName === "EM" || current.nodeName === "I")) ||
      (command === "underline" && current.nodeName === "U") ||
      (command === "color" &&
        current.nodeName === "SPAN" &&
        current.style.color)
    ) {
      unwrapNode(current);
      break;
    }
    current = current.parentNode!;
  }
}

function execColorCommand() {
  if (colorPickerRef.value) {
    colorPickerRef.value.click();
  }
}

function handleColorChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const color = input.value;
  execCommand("color", color);
}

function execCommand(command: string, value?: string) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  // 如果当前选中的文本被对应的标签包裹，则取消包裹
  if (isWrapped(range, command, value)) {
    unwrap(range, command);
    return;
  }

  // 获取选中的内容
  const selectedContent = range.extractContents();
  const wrap = defineCommand(command, value);

  if (!wrap) return;

  // 将选中内容包装在对应标签中
  wrap.appendChild(selectedContent);

  // 将包装后的内容插入到文档中
  range.insertNode(wrap);

  // 设置光标位置到格式化内容之后
  const newRange = document.createRange();
  newRange.setStartAfter(wrap);
  newRange.collapse(true);

  selection.removeAllRanges();
  selection.addRange(newRange);
}
</script>

<template>
  <div class="w-full h-full flex flex-col justify-around" :class="bem.b()">
    <div class="h-1/5 flex gap-2">
      <ao-button @click="execCommand('bold')">加粗</ao-button>
      <ao-button @click="execCommand('italic')">斜体</ao-button>
      <ao-button @click="execCommand('underline')">下划线</ao-button>
      <ao-button @click="execColorCommand">颜色</ao-button>
      <input
        type="color"
        ref="colorPickerRef"
        @input="handleColorChange"
        class="hidden"
      />
    </div>
    <div class="h-3/5relative" :class="bem.be('content')">
      <div
        class="h-full border-gray border-1 border-solid p-2"
        :class="bem.e('container')"
        :contenteditable="true"
      ></div>
      <div
        class="w-[1px] h-6 absolute bg-black hidden"
        ref="cursorRef"
        :class="bem.e('cursor')"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
