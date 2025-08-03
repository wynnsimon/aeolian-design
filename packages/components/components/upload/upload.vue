<script setup lang="ts">
import {
  uploadProps,
  type UploadContentProps,
  type UploadFile,
  type UploadFiles,
  type UploadProgressEvent,
  type UploadRawFile,
} from "../../types/upload";
import UploadContent from ".";
import { computed, ref } from "vue";

defineOptions({
  name: "ao-upload",
});

const props = defineProps(uploadProps);

const uploadFiles = ref<UploadFiles>(props.FileList);

function findFile(rawFile: UploadRawFile) {
  return uploadFiles.value.find((file) => file.uid === rawFile.uid);
}

const uploadContentProps = computed<UploadContentProps>(() => {
  return {
    ...props,
    onStart: (rawFile: UploadRawFile) => {
      const uploadFile: UploadFile = {
        uid: rawFile.uid,
        name: rawFile.name,
        size: rawFile.size,
        status: "start",
        percentage: 0,
        raw: rawFile,
      };
      uploadFiles.value = [...uploadFiles.value, uploadFile];
      props.onChange(uploadFile);
    },

    onProgress: (e: UploadProgressEvent, rawFile: UploadRawFile) => {
      const uploadFile = findFile(rawFile);
      if (uploadFile) {
        uploadFile.status = "uploading";
        uploadFile.percentage = e.percentage;
        props.onProgress(e, uploadFile, uploadFiles.value);
      }
    },
    onRemove: async (rawFile: UploadRawFile) => {
      const uploadFile = findFile(rawFile);

      if (uploadFile) {
        const r = await props.beforeRemove(uploadFile, uploadFiles.value);
        if (r !== false) {
          const fileList = uploadFiles.value;
          fileList.splice(fileList.indexOf(uploadFile), 1);
          props.onRemove(uploadFile, uploadFiles.value);
        }
      }
    },

    onSuccess: (res: any, rawFile: UploadRawFile) => {
      const uploadFile = findFile(rawFile);
      if (uploadFile) {
        uploadFile.status = "success";
        const fileList = uploadFiles.value;
        props.onSuccess(res, uploadFile, fileList);
      }
    },
    onError: (err: Error, rawFile: UploadRawFile) => {
      const uploadFile = findFile(rawFile);
      if (uploadFile) {
        uploadFile.status = "error";
        const fileList = uploadFiles.value;
        fileList.splice(fileList.indexOf(uploadFile), 1);
        props.onError(err, uploadFile, fileList);
      }
    },
  };
});
</script>

<template>
  <UploadContent v-bind="uploadContentProps">
    <slot></slot>
  </UploadContent>
  {{ uploadFiles }}
</template>

<style scoped></style>
