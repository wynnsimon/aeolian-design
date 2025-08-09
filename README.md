# Aeolian Design

一个基于 Vue 3 的现代化 UI 组件库，专为构建美观、高性能的 Web 应用而设计。

## 特性

- 🌈 精美的 UI 设计和丰富的组件
- 🚀 基于 Vue 3 和 TypeScript 构建
- ⚡ 高性能和轻量级实现
- 📦 按需引入，支持 Tree Shaking
- 🎨 支持主题定制
- 🌍 完善的中文文档

## 按需引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Input } from '@aeolian-design/components'

const app = createApp(App)
app.use(Button)
app.use(Input)
app.mount('#app')
```

## 组件列表
- Button 按钮
- Icon 图标
- Input 输入框
- Form 表单
- Checkbox 复选框
- Tree 树形控件
- VirtualList 虚拟列表
- CanvasTable 画布表格
- Upload 上传
- Calendar 日历
- Collapse 折叠面板
- Tooltip 文字提示


```
aeolian-design/
├── docs/              # 文档站点
├── packages/
│   ├── components/    # 组件库源码
│   └── utils/         # 工具函数
├── test/              # 测试项目
└── package.json
```


# 许可证
[MIT](LICENSE.txt)

# 感谢
本项目受到以下开源项目的启发：

- [Element Plus](https://element-plus.org/zh-CN/)
- [Ant Design Vue](https://www.antdv.com/docs/vue/introduce-cn)

Made with ❤️ by the Aeolian Design Team