# Signature 签名

签名组件允许用户在图片上添加手写签名，支持签名绘制、拖拽调整位置、添加到主图、回退操作和保存图片等功能。

## 使用

### 基础用法

基础的签名组件包含主画板区域和签名绘制区域，可以在签名区域绘制签名并添加到主图中。

<ao-signature
  image-src="https://example.com/images/avatar.jpg"
  :height="300"
  :width="300"
></ao-signature>

```vue
<template>
  <div class="w-300 h-100">
    <ao-signature
      image-src="https://example.com/images/avatar.jpg"
      :height="300"
      :width="300"
    ></ao-signature>
  </div>
</template>
```

## API

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| imageSrc | 背景图片资源路径 | string | "" |
| width | 图片宽度 | number | 600 |
| height | 图片高度 | number | 400 |

### Events

签名组件暂无事件。

### Slots

签名组件暂无插槽。

### Exposes

签名组件暂无暴露属性。

# 功能说明

## 签名功能
签名组件主要包含以下功能区域：

- 主画板区域：显示背景图片和已添加的签名
- 签名绘制区域：用于手写绘制签名
- 控制按钮区域：提供添加、回退、显隐和保存功能

## 操作说明

1. 在右侧签名区域使用 ao-drawing-board 组件绘制签名
2. 通过拖拽左侧预览框调整签名位置
3. 点击"添加"按钮将签名添加到主图中
4. 点击"回退"按钮撤销上一次添加的签名
5. 点击"显隐"按钮控制签名预览框的显示/隐藏
6. 点击"保存"按钮将合成后的图片保存到本地