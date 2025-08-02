// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["packages/components/**/*.{vue,ts,tsx}"],
  },
  rules: [],
  shortcuts: {},
  theme: {
    colors: {
      // 主色
      primary: {
        DEFAULT: "#409eff",
        light: {
          2: "#337ecc",
          3: "#79bbff",
          5: "#a0cfff",
          7: "#c6e2ff",
          8: "#d9ecff",
          9: "#ecf5ff",
        },
        // 暗色主题
        dark: {
          2: "#66b1ff",
          3: "#3375b9",
          5: "#2a598a",
          7: "#213d5b",
          8: "#1d3043",
          9: "#18222b",
        },
      },
      // 成功色
      success: {
        DEFAULT: "#67c23a",
        light: {
          2: "#529b2e",
          3: "#95d475",
          5: "#b3e19d",
          7: "#d1edd4",
          8: "#e1f3d8",
          9: "#f0f9eb",
        },
        // 暗色主题变体
        dark: {
          2: "#85ce61",
          3: "#4e8e2f",
          5: "#3e6b27",
          7: "#2d481f",
          8: "#25371c",
          9: "#1c2518",
        },
      },
      // 警告色
      warning: {
        DEFAULT: "#e6a23c",
        light: {
          2: "#b88230",
          3: "#eebe77",
          5: "#f3d19e",
          7: "#f8e3c5",
          8: "#faecd8",
          9: "#fdf6ec",
        },
        // 暗色主题变体
        dark: {
          2: "#ebb563",
          3: "#a77730",
          5: "#7d5b28",
          7: "#533f20",
          8: "#3e301c",
          9: "#292218",
        },
      },
      // 错误色（危险色）
      error: {
        DEFAULT: "#f56c6c",
        light: {
          2: "#c45656",
          3: "#f89898",
          5: "#fac6c6",
          7: "#fcd3d3",
          8: "#fde2e2",
          9: "#fef0f0",
        },
        // 暗色主题变体
        dark: {
          2: "#f78989",
          3: "#b25252",
          5: "#854040",
          7: "#582e2e",
          8: "#412626",
          9: "#2a1d1d",
        },
      },
      // 信息色
      info: {
        DEFAULT: "#909399",
        light: {
          2: "#73767a",
          3: "#b1b3b8",
          5: "#c8c9cc",
          7: "#dedfe0",
          8: "#e9e9eb",
          9: "#f4f4f5",
        },
        // 暗色主题变体
        dark: {
          2: "#a6a9ad",
          3: "#6b6d71",
          5: "#525457",
          7: "#393a3c",
          8: "#2d2d2f",
          9: "#202121",
        },
      },
    },
  },
});