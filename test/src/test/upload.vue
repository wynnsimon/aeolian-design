<script setup lang="ts">
import type { UploadRawFile } from "@aeolian-design/components/types/upload";

defineOptions({
  name: "test-upload",
});

function handleUpload(file: UploadRawFile) {
  console.log("上传成功", file);
  return false;
}
</script>

<template>
  <div>
    <ao-upload :before-upload="handleUpload" multiple>
      <ao-button type="primary">点我上传</ao-button>
    </ao-upload>
  </div>
</template>

<style scoped></style>
