# OnlineExcel 在线协同表格组件

基于 [Luckysheet](https://github.com/mengshukeji/Luckysheet) 的在线协同表格组件，支持多人实时协作编辑。

## 使用说明

该组件是基于 Luckysheet 二次开发的在线协同表格组件。使用前需要：

1. 将 Luckysheet 的包文件放置在 `public` 或 `assets` 目录下
2. 在 [index.html](file://d:\Project\aeolian-design\test\index.html) 中引入 Luckysheet 相关资源

```html
<!-- 在 index.html 中添加以下引用 -->
<link rel='stylesheet' href='/luckysheet/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='/luckysheet/plugins/plugins.css' />
<link rel='stylesheet' href='/luckysheet/css/luckysheet.css' />
<link rel='stylesheet' href='/luckysheet/assets/iconfont/iconfont.css' />
<script src="/luckysheet/plugins/js/plugin.js"></script>
<script src="/luckysheet/luckysheet.umd.js"></script>
```

> [!Warning] 注意事项
> 要运行演示示例，需要手动启动两个服务：
> 运行 pnpm run serve 启动主服务器
> 运行 pnpm run serve:ws 启动 WebSocket 服务器

## 基础用法


### 示例

<div class="w-200 h-50 m-auto">
  <ao-online-excel></ao-online-excel>
</div>


```vue
<template>
  <div class="w-240 h-100">
    <ao-online-excel
      load-url="http://localhost:8000/load"
      save-url="http://localhost:8000/save"
      filename="testFile"
    ></ao-online-excel>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  // 组件挂载后会自动初始化 Luckysheet 表格
});
</script>
```

## Props

| 参数名      | 说明              | 类型     | 默认值 |
| -------- | --------------- | ------ | --- |
| loadUrl  | 加载表格数据的URL      | string | -   |
| saveUrl  | 保存表格数据的URL      | string | -   |
| filename | 表格文件名，用于标识不同的表格 | string | -   |

# 功能特性

✅ 实时协同编辑：多用户可同时编辑同一份表格

✅ 数据自动同步：通过 WebSocket 实现实时数据同步

✅ 保存功能：支持将表格数据保存到指定服务器

✅ Luckysheet 完整功能：支持 Luckysheet 的所有基础功能

# 工作原理

组件初始化时通过 loadUrl 加载表格数据

通过 WebSocket 连接实现实时协同编辑

监听单元格变更事件，将变更数据通过 WebSocket 广播给其他用户

提供保存按钮，将当前表格数据提交到 saveUrl
