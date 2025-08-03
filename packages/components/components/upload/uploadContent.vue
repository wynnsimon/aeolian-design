<script setup lang="ts">
import { createNamespace } from "@aeolian-design/utils/src/create";
import {
  genId,
  uploadContentProps,
  type UploadRawFile,
} from "../../types/upload";
import { ref } from "vue";
import { httpRequest } from "./ajax";

defineOptions({
  name: "ao-upload-content",
  inheritAttrs: false,
});

const props = defineProps(uploadContentProps);
const bem = createNamespace("upload");
const inputRef = ref<HTMLInputElement | null>(null);

async function upload(rawFile: UploadRawFile) {
  if (inputRef.value) {
    // 清空输入框
    inputRef.value.value = "";
    let result = await props.beforeUpload(rawFile);

    if (result === false) return props.onRemove(rawFile); //取消上传

    // 上传的过程
    const { method, name, action, headers, data } = props;
    httpRequest({
      method,
      name,
      action,
      headers,
      data,
      file: rawFile,
      onError: (e) => {
        props.onError(e, rawFile);
      },
      onSuccess: (res) => {
        props.onSuccess(res, rawFile);
      },
      onProgress: (e) => {
        props.onProgress(e, rawFile);
      },
    });
  }
}

function handleClick() {
  if (inputRef.value) {
    inputRef.value.value = "";
    inputRef.value.click();
  }
}

function handleChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const rawFile = files[i] as UploadRawFile;
      rawFile.uid = genId();
      props.onStart(rawFile);
      upload(rawFile);
    }
  }
}
</script>

<template>
  <span :class="bem.b()" @click="handleClick">
    <slot></slot>
    <input
      class="hidden"
      ref="inputRef"
      type="file"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange"
    />
  </span>
</template>

<style scoped></style>
