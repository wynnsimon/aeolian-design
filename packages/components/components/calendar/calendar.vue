<script setup lang="ts">
import {
  calendarEmits,
  calendarProps,
  type CalendarDateCell,
  type CalendarDateType,
} from "../../types/calendar";
import { createNamespace } from "@aeolian-design/utils/src/create";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { computed } from "vue";

defineOptions({
  name: "ao-calendar",
});

const props = defineProps(calendarProps);
const emits = defineEmits(calendarEmits);
const bem = createNamespace("calendar");
// dayjs.locale("zh-cn");

const firstDayOfWeek = dayjs().startOf("week").day();

const weekMapping = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

const weekDays = computed(() => {
  return [
    ...weekMapping.slice(firstDayOfWeek),
    ...weekMapping.slice(0, firstDayOfWeek),
  ];
});

// 如果用户没有传日期，就从当前日期开始
const date = computed(() => {
  return props.modelValue ? dayjs(props.modelValue) : dayjs();
});

// 面板部分

// 面板显示日期，格式为二维数组，6行*7天
const rows = computed(() => {
  const list: CalendarDateCell[] = [];
  // 获取当前月的第一天周几
  const firstDay = date.value.startOf("month").day();
  // 获取上个月最后一天
  const lastDayOfLastMonth = date.value
    .subtract(1, "month")
    .endOf("month")
    .date();

  // 计算当月第一行需要补上个月几天（灰色显示）
  const count = firstDay - firstDayOfWeek;

  const prevMonthDays: CalendarDateCell[] = Array.from({ length: count })
    .map((_, idx) => lastDayOfLastMonth - (count - 1 - idx))
    .map((_) => ({
      text: _,
      type: "prev",
    }));

  list.push(...prevMonthDays);

  // 获取当月天数
  const days = date.value.daysInMonth();
  const currentMonthDays: CalendarDateCell[] = Array.from({ length: days }).map(
    (_, idx) => ({
      text: idx + 1,
      type: "current",
    })
  );

  list.push(...currentMonthDays);

  // 当前月和上个月后面天数补齐行数后剩余的天数
  let remaning = 42 - list.length;

  const nextMonthDays: CalendarDateCell[] = Array.from({
    length: remaning,
  }).map((_, idx) => ({
    text: idx + 1,
    type: "next",
  }));

  list.push(...nextMonthDays);
  return Array.from({ length: 6 }).map((_, idx) => {
    return list.slice(idx * 7, idx * 7 + 7);
  });
});

const prevMonthDay = computed(() => date.value.subtract(1, "month").date(1));
const nextMonthDay = computed(() => date.value.add(1, "month").date(1));
const prevYearDay = computed(() => date.value.subtract(1, "year").date(1));
const nextYearDay = computed(() => date.value.add(1, "year").date(1));
function pickDay(day: Dayjs) {
  // 选择日期
  emits("update:modelValue", day.toDate());
}

function selectDate(type: CalendarDateType) {
  //采用策略来优化
  const dateMap: Record<CalendarDateType, Dayjs> = {
    "prev-month": prevMonthDay.value,
    "next-month": nextMonthDay.value,
    "prev-year": prevYearDay.value,
    "next-year": nextYearDay.value,
    today: dayjs(),
  };

  const day = dateMap[type];

  pickDay(day);
}

function handlePick(cell: CalendarDateCell) {
  // 处理点击日期
  if (cell.type === "current") {
    const day = date.value.date(cell.text);
    pickDay(day);
  } else if (cell.type === "prev") {
    const day = date.value.subtract(1, "month").date(cell.text);
    pickDay(day);
  } else if (cell.type === "next") {
    const day = date.value.add(1, "month").date(cell.text);
    pickDay(day);
  }
}
</script>

<template>
  <div
    :class="bem.b()"
    class="border border-gray-300 rounded shadow-md bg-white max-w-full overflow-hidden"
  >
    <div
      :class="bem.e('header')"
      class="p-3 border-b border-gray-300 flex justify-between items-center"
    >
      <div :class="bem.e('title')" class="text-base font-medium text-gray-800">
        {{ date.format("YYYY年MM月DD日") }}
      </div>
      <div :class="bem.e('button-group')" class="flex gap-2">
        <ao-button type="primary" @click="(e) => selectDate('prev-year')"
          >前一年</ao-button
        >
        <ao-button type="primary" @click="(e) => selectDate('prev-month')"
          >上个月</ao-button
        >
        <ao-button type="primary" @click="(e) => selectDate('today')"
          >今天</ao-button
        >
        <ao-button type="primary" @click="(e) => selectDate('next-month')"
          >下个月</ao-button
        >
        <ao-button type="primary" @click="(e) => selectDate('next-year')"
          >下一年</ao-button
        >
      </div>
    </div>
    <div :class="bem.e('body')" class="p-3">
      <table :class="bem.e('table')" class="w-full border-collapse table-fixed">
        <thead class="w-full">
          <tr>
            <th
              v-for="day in weekDays"
              :key="day"
              class="w-1/7 p-3 text-gray-600 font-medium text-center border-b border-gray-300"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rIdx) in rows" :key="rIdx">
            <td
              v-for="(cell, cIdx) in row"
              :key="cIdx"
              :class="{
                'text-gray-400': cell.type !== 'current',
                'text-gray-700': cell.type === 'current',

                'hover:bg-primary-light-9': true,
                'hover:text-primary-light-3': cell.type === 'current',
                'hover:text-primary-light-2': cell.type !== 'current',
                'text-success bg-success-light-3':
                  cell.type === 'current' && date.date() === cell.text,
                'cursor-pointer': true,
                'transition-colors': true,
                'duration-200': true,
                rounded: true,
                'p-3': true,
                'text-center': true,
                'align-middle': true,
                'h-12': true,
              }"
              @click="(e) => handlePick(cell)"
            >
              {{ cell.text }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
