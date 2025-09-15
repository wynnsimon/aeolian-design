<script setup lang="ts">
import { onMounted, ref } from "vue";
import { drawingBoardEmits, drawingBoardProps } from "../../types/drawingBoard";
import { createNamespace } from "@aeolian-design/utils/src/create";

defineOptions({
  name: "ao-drawing-board",
});

const props = defineProps(drawingBoardProps);
const emit = defineEmits(drawingBoardEmits);
const bem = createNamespace("drawingBoard");

// 当前模式
const mode = ref<"pen" | "eraser">("pen");
// 粗细
const lineWidth = ref(2);
// 颜色
const lineColor = ref("#000");
// 添加颜色选择处理函数
function handleColorChange(e: Event) {
  const target = e.target as HTMLInputElement;
  lineColor.value = target.value;
}

let signCtx: CanvasRenderingContext2D | null = null;
let signing: boolean = false;
const signBoardRef = ref<HTMLCanvasElement | null>(null);

function signMousedown(e: MouseEvent) {
  signing = true;
  signCtx?.beginPath();
  signCtx?.moveTo(e.offsetX, e.offsetY);
}

function signMousemove(e: MouseEvent) {
  if (!signing || !signCtx) return;

  switch (mode.value) {
    case "pen":
      signCtx.lineWidth = lineWidth.value;
      signCtx.strokeStyle = lineColor.value;
      signCtx.lineTo(e.offsetX, e.offsetY);
      signCtx.stroke();
      break;
    case "eraser": {
      const size = lineWidth.value;
      signCtx.clearRect(e.offsetX - size / 2, e.offsetY - size / 2, size, size);
      break;
    }
  }
}

function signMouseup() {
  signing = false;
}

function clearSignBoard() {
  if (!signCtx) return;
  const canvas = signCtx.canvas;
  // 清空并重置
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  signCtx.scale(dpr, dpr);

  // 初始化绘制参数
  signCtx.lineCap = "round";
  signCtx.lineJoin = "round";
}

onMounted(() => {
  const canvas = signBoardRef.value;
  if (canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    signCtx = canvas.getContext("2d");
    signCtx?.scale(dpr, dpr);

    if (signCtx) {
      signCtx.lineWidth = lineWidth.value;
      signCtx.lineCap = "round";
      signCtx.lineJoin = "round";
      signCtx.strokeStyle = lineColor.value;
    }
  }
});

defineExpose({
  signBoardRef,
});
</script>

<template>
  <div
    :class="bem.b()"
    class="flex gap-2 w-full h-full border-1 border-solid border-black"
  >
    <canvas
      :class="bem.e('main-board')"
      ref="signBoardRef"
      class="w-full flex-1"
      @mousedown="signMousedown"
      @mousemove="signMousemove"
      @mouseup="signMouseup"
    ></canvas>

    <span
      v-if="props.showTools"
      :class="bem.e('tools')"
      class="flex flex-col gap-2 p-2"
    >
      <ao-button @click="clearSignBoard()">清除</ao-button>
      <ao-button @click="emit('complete', signBoardRef)">确认</ao-button>
      <ao-button
        :type="mode === 'eraser' ? 'primary' : 'default'"
        @click="mode = 'eraser'"
      >
        橡皮擦
      </ao-button>
      <ao-button
        :type="mode === 'pen' ? 'primary' : 'default'"
        @click="mode = 'pen'"
      >
        笔
      </ao-button>

      <div class="flex items-center gap-2">
        <input
          type="range"
          min="1"
          max="50"
          v-model="lineWidth"
          class="flex-1"
        />
        <span>{{ lineWidth }}</span>
      </div>

      <!-- 颜色选择 -->
      <div class="flex items-center gap-2">
        <input type="color" :value="lineColor" @input="handleColorChange" />
        <span>{{ lineColor }}</span>
      </div>
    </span>
  </div>
</template>

<style scoped>
input[type="range"] {
  width: 100px;
}
</style>
