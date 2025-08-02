import type { PropType } from "vue";

interface ListColumns {
  label: string;
  key: string | number;
}

export const virtualListProps={
  // 列表体数据
  data: {
    type: Array,
    required: true,
  },
  // 列表头数据
  columns: {
    type: Array as PropType<ListColumns[]>,
    required: true,
  },
  // 显示多少项
  count: {
    type: Number,
    default: 10,
  },
  // 列表项高度
  itemHeight: {
    type: Number,
    default: 30,
  },
  // 列表项宽度
  itemWidth: {
    type: Number,
    default: 50,
  },
}

