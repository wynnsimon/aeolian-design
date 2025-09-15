# DrawingBoard 画板

画板组件提供了一个可以自由绘制的画布区域，支持笔刷、橡皮擦、颜色选择、线条粗细调节等功能。

## 使用

### 基础用法

基础的画板组件包含绘制区域和工具栏，可以通过工具栏切换模式、调整参数。


### 示例

<div class="drawing-container w-150">
  <ao-drawing-board
    :show-tools="true"
    @complete="handleComplete"
  ></ao-drawing-board>
</div>

### 隐藏工具栏

通过 [showTools](file://d:\Project\aeolian-design\packages\components\types\drawingBoard.ts#L2-L5) 属性可以控制是否显示工具栏。

<ao-drawing-board :show-tools="false"></ao-drawing-board>

```vue
<template>
  <div class="w-200 h-100">
    <ao-drawing-board></ao-drawing-board>
  </div>

  <!-- 隐藏工具栏 -->
  <div class="w-200 h-100">
    <ao-drawing-board :show-tools="false"></ao-drawing-board>
  </div>
</template>
```

## API

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showTools | 是否显示工具栏 | boolean | true |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| complete | 点击确认按钮时触发 | (ctx: HTMLCanvasElement \| null) => void |

### Slots

画板组件暂无插槽。

### Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| signBoardRef | 画布元素的引用 | Ref<HTMLCanvasElement \| null> |


# 功能说明
## 绘制功能
画板支持两种模式：

- 笔刷模式：可以自由绘制
- 橡皮擦模式：可以擦除绘制内容

## 工具栏功能

工具栏包含以下功能：

1. 清除：清空整个画布
2. 确认：触发 complete 事件，返回画布元素
3. 模式切换：在笔刷和橡皮擦之间切换
4. 线条粗细调节：通过滑块调整线条粗细（1-50px）
5. 颜色选择：选择绘制颜色