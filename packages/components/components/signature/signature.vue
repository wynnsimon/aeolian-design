<script setup lang="ts">
import { signatureProps } from "../../types/signature";
import { createNamespace } from "@aeolian-design/utils/src/create";
import { onMounted, ref } from "vue-demi";
import { useDraggable } from "@vueuse/core";
import { useTemplateRef } from "vue-demi";
defineOptions({
  name: "ao-signature",
});

const props = defineProps(signatureProps);
const bem = createNamespace("signature");

function initCanvasSize(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  width: number,
  height: number
) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx?.scale(dpr, dpr);
}

const showFloat = ref(true);

// #region 主画板
let mainCtx: CanvasRenderingContext2D | null = null;
const main = ref<HTMLCanvasElement | null>(null);
onMounted(() => {
  if (main.value) {
    mainCtx = main.value.getContext("2d");
    const rect = main.value.getBoundingClientRect();
    initCanvasSize(main.value, mainCtx, rect.width, rect.height);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = props.imageSrc;
    img.onload = () => {
      mainCtx!.drawImage(img, 0, 0, props.width, props.height);
    };
  }
});

interface SignRecord {
  x: number;
  y: number;
  width: number;
  height: number;
}

const signRecords = ref<SignRecord[]>([]);

function add() {
  if (main.value && signFloatRef.value) {
    const mainRect = main.value.getBoundingClientRect();
    const signFloatRect = signFloatRef.value.getBoundingClientRect();

    const dx = signFloatRect.left - mainRect.left;
    const dy = signFloatRect.top - mainRect.top;

    mainCtx!.drawImage(
      signFloatRef.value,
      dx,
      dy,
      signFloatRect.width,
      signFloatRect.height
    );

    signRecords.value.push({
      x: dx,
      y: dy,
      width: signFloatRect.width,
      height: signFloatRect.height,
    });
  }
}

function back() {
  if (!mainCtx || signRecords.value.length === 0) return;

  const last = signRecords.value.pop();
  if (last) {
    mainCtx.clearRect(last.x, last.y, last.width, last.height);
  }
}

function save() {
  if (main.value) {
    const link = document.createElement("a");
    link.href = main.value.toDataURL("image/png");
    link.download = "save.png";
    link.click();
  }
}

// #endregion

// #region 拖拽预览画板
const signFloatRef = useTemplateRef<HTMLCanvasElement>("signFloatRef");
const limitRef = useTemplateRef<HTMLDivElement>("limitRef");
const { style } = useDraggable(signFloatRef, {
  containerElement: main,
});
let floatCtx: CanvasRenderingContext2D | null = null;
onMounted(() => {
  if (signFloatRef.value) {
    floatCtx = signFloatRef.value.getContext("2d");
    const rect = signFloatRef.value.getBoundingClientRect();
    initCanvasSize(signFloatRef.value, floatCtx, rect.width, rect.height);
  }
});

function floatDraw(ctx: HTMLCanvasElement | null) {
  if (ctx && signFloatRef.value) {
    const rect = ctx.getBoundingClientRect();
    signFloatRef.value.width = rect.width;
    signFloatRef.value.height = rect.height;
    floatCtx?.drawImage(ctx, 0, 0, rect.width, rect.height);
  }
}
// #endregion
</script>

<template>
  <div class="w-full h-full flex flex-row" :class="bem.b()">
    <span
      class="w-1/2 h-full flex flex-col gap-2 justify-between p-2 border-1 border-solid border-black"
      :class="bem.e('main-board')"
    >
      <div ref="limitRef" class="relative flex-1">
        <!-- 主画板 -->
        <canvas ref="main" class="w-full h-full"></canvas>
        <!-- 签名绘制浮层画板 -->
        <canvas
          v-show="showFloat"
          ref="signFloatRef"
          :style="style"
          class="absolute w-1/4 h-1/4 left-0 top-0 border-1 border-solid border-primary"
          :class="bem.em('float', 'board')"
        ></canvas>
      </div>
      <div class="w-full flex gap-2">
        <ao-button @click="add">添加</ao-button>
        <ao-button @click="back">回退</ao-button>
        <ao-button @click="showFloat = !showFloat">显隐</ao-button>
        <ao-button @click="save">保存</ao-button>
      </div>
    </span>
    <span
      class="w-1/2 h-full flex flex-col justify-between p-2 border-1 border-solid border-black"
      :class="bem.e('sign-board')"
    >
      <ao-drawing-board @complete="floatDraw"></ao-drawing-board>
    </span>
  </div>
</template>

<style scoped></style>
