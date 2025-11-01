<script setup lang="ts">
import { onMounted } from "vue-demi";
import { onlineExcelProps } from "../../types/onlineExcel";
import { createNamespace } from "@aeolian-design/utils/src/create";
import axios from "axios";

defineOptions({
  name: "ao-online-excel",
});

const props = defineProps(onlineExcelProps);
const bem = createNamespace("online-excel");
function sendExcel() {
  let excel = luckysheet.getAllSheets();
  axios
    .post(props.saveUrl!, {
      data: excel,
      filename: props.filename,
    })
    .then((res) => {
      console.log(res);
    });
}

let curSheet = "Sheet1";
function initExcel() {
  if (typeof luckysheet !== "undefined") {
    const ws = new WebSocket("ws://localhost:2000?f=" + props.filename);

    ws.onmessage = function (msg) {
      console.log(msg);
      const data = JSON.parse(msg.data);
      luckysheet.setCellValue(data.row, data.col, data.after.v, {
        isRefresh: true,
      });
    };

    luckysheet.create({
      lang: "zh",
      container: "excel",
      gridKey: props.filename!,
      loadUrl: props.loadUrl!,
      hook: {
        sheetActivate(index: number) {
          const sheets = luckysheet.getAllSheets();
          curSheet = sheets[index]?.name;
        },
        cellUpdateBefore(row: number, col: number, data: any) {
          // 如果变化前和变化后的值相同则阻止更新
          if (luckysheet.getCellValue(row, col) == data) {
            return false;
          }
        },
        cellUpdated(row: number, col: number, before: any, after: any) {
          ws.send(
            JSON.stringify({
              row,
              col,
              filename: props.filename,
              sheet: curSheet,
              after,
            })
          );
        },
      },
    });
  } else {
    console.error("luckysheet is not available");
  }
}

onMounted(() => {
  initExcel();
});
</script>

<template>
  <div class="flex gap-2">
    <ao-button @click="sendExcel">保存</ao-button>
  </div>
  <div class="w-full h-full" :class="bem.b('excel')" id="excel"></div>
</template>

<style scoped></style>
