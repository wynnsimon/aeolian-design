<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";
import { onMounted, ref } from "vue";
import { virtualListProps } from "../../types/virtual";

defineOptions({
  name: "ao-canvas-table",
});
const bem = createNamespace("canvas-table");

const props = defineProps(virtualListProps);
const canvasRef = ref<HTMLCanvasElement>();
const headerCanvasRef = ref<HTMLCanvasElement>();

// 绘制表头
function drawHeader(ctx: CanvasRenderingContext2D) {
  if (!ctx) return;

  const w = props.itemWidth;
  const h = props.itemHeight;

  ctx.beginPath();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 设置表头字体大小
  ctx.font = `${Math.floor(h * 0.35)}px Arial`; // 字体大小为行高的40%

  // 绘制表头背景
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, w * props.columns!.length, h);
  ctx.fillStyle = "#000";

  for (let index = 0; index < props.columns!.length; index++) {
    const x = index * w;
    const y = 0;

    // 绘制边框
    ctx.rect(x, y, w, h);

    // 绘制表头文字
    const column = props.columns![index];
    // 处理不同格式的列定义
    let text = "";
    if (typeof column === "object" && column !== null) {
      text = column.label || column.title || column.key || `Column ${index}`;
    } else {
      text = String(column);
    }

    ctx.fillText(text, x + w / 2, y + h / 2);
  }

  ctx.stroke();
  ctx.closePath();
}

function drawCell(ctx: CanvasRenderingContext2D) {
  if (!ctx) return;

  const w = props.itemWidth;
  const h = props.itemHeight;

  ctx.beginPath();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // 设置数据区域字体大小
  ctx.font = `${Math.floor(h * 0.3)}px Arial`; // 字体大小为行高的30%

  for (let rowIndex = 0; rowIndex < props.data!.length; rowIndex++) {
    for (let index = 0; index < props.columns!.length; index++) {
      ctx.moveTo(index * w, rowIndex * h);
      ctx.lineTo((index + 1) * w, rowIndex * h);
      ctx.lineTo((index + 1) * w, (rowIndex + 1) * h);
      ctx.lineTo(index * w, (rowIndex + 1) * h);
      ctx.lineTo(index * w, rowIndex * h);

      // 安全地获取单元格值
      const cellValue = props.data![rowIndex]?.[index];
      ctx.fillText(
        cellValue !== undefined && cellValue !== null ? String(cellValue) : "",
        index * w + w / 2,
        rowIndex * h + h / 2
      );
    }
  }
  ctx.stroke();
  ctx.closePath();
}

onMounted(() => {
  // 绘制表头
  if (headerCanvasRef.value) {
    headerCanvasRef.value.width = props.itemWidth * props.columns!.length;
    headerCanvasRef.value.height = props.itemHeight;
    const headerCtx = headerCanvasRef.value.getContext("2d");
    if (headerCtx) {
      drawHeader(headerCtx);
    }
  }

  // 绘制数据内容
  if (!canvasRef.value) return;

  canvasRef.value.width = props.itemWidth * props.columns!.length;
  canvasRef.value.height = props.itemHeight * props.data!.length;
  const ctx = canvasRef.value.getContext("2d");
  if (ctx) {
    drawCell(ctx);
  }
});
</script>

<template>
  <div
    class="w-full h-full overflow-auto"
    :class="bem.b()"
    :style="{ width: itemWidth * columns!.length + 'px', height: itemHeight * (count + 1) + 'px' }"
  >
    <!-- 表头 canvas -->
    <canvas
      :class="bem.e('header')"
      ref="headerCanvasRef"
      :style="{ display: 'block' }"
    ></canvas>

    <!-- 数据内容 canvas -->
    <canvas
      :class="bem.e('container')"
      ref="canvasRef"
      :style="{ display: 'block' }"
    ></canvas>
  </div>
</template>

<style scoped>
.canvas-table__header {
  border-bottom: 1px solid #ccc;
}
</style>