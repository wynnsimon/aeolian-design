<script setup lang="ts">
import { ref } from "vue-demi";
import { uploadProps } from "../../types/upload";
import { createChunk, hash } from "./file";
import axios from "axios";

defineOptions({
  name: "ao-upload",
});

const props = defineProps(uploadProps);
// 进度条实例
const progressRef = ref<HTMLProgressElement | null>(null);
// 文件分片列表
let fileChunks: Blob[] = [];
// 文件哈希
let fileHash = "";
// 文件名
let filename = "";
const message = ref<string>("");
const cancelToken = axios.CancelToken;
let source = cancelToken.source();
const loading = ref(false);
/**
 * 上传分片
 * @param chunks 分片
 * @param hash 文件的哈希值
 * @param filename 文件名
 * @param uploaded 已经上传的切片索引数组，默认为空（主要用于断点续传）
 */
function uploadChunk(
  chunks: Blob[],
  hash: string,
  filename: string,
  uploaded: number[] = []
) {
  const tasks = chunks
    .map((chunk, index) => {
      if (uploaded.length > 0 && uploaded.includes(index)) {
        return;
      }
      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("chunkIndex", index.toString());
      formData.append("filename", `${hash}-${filename}`);

      return axios
        .post(props.uploadUrl!, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          cancelToken: source.token,
        })
        .then(() => {
          if (progressRef.value) {
            ++progressRef.value.value;
          }
        });
    })
    .filter((item) => item);

  Promise.all(tasks).then(() => {
    axios
      .post(props.mergeUrl!, {
        filename: `${hash}-${filename}`,
      })
      .then((res) => {
        console.log(res);
      });
  });
}

async function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;

  loading.value = true;
  const files = target.files;
  const startChunk = performance.now();
  fileChunks = await createChunk(files[0], props.chunkSize);
  fileHash = await hash(fileChunks);
  const endChunk = performance.now();
  console.log(`耗时: ${(endChunk - startChunk).toFixed(2)} ms`);

  filename = files[0].name;
  if (progressRef.value) {
    progressRef.value.max = fileChunks.length;
  }
  loading.value = false;
}

async function handleUpload() {
  // 开始上传
  if (fileHash === "" || filename === "") return;

  const res = await verifyFile(props.verifyUrl!, {
    filename: `${fileHash}-${filename}`,
  });
  message.value = res.message;

  switch (res.data.fileState) {
    case 1:
      if (progressRef.value) {
        progressRef.value.value = progressRef.value?.max;
      }
      break;
    default:
      if (progressRef.value) {
        progressRef.value.value = res.data.uploaded.length;
      }
      uploadChunk(fileChunks, fileHash, filename, res.data.uploaded);
      break;
  }
}

async function handleStop() {
  // 暂停上传
  source.cancel("终止上传");
  source = cancelToken.source();
  message.value = "暂停上传";
}

async function verifyFile(url: string, data: object) {
  const result = await axios.post(url, data);
  return result.data;
}
</script>

<template>
  <span>
    <div>
      <input type="file" @change="handleChange" multiple />
    </div>
    <div>
      <progress ref="progressRef" value="0" max="100"></progress>
      <span v-show="message">{{ message }}</span>
    </div>
    <div class="flex gap-2">
      <ao-button :loading="loading" type="primary" @click="handleUpload"
        >上传</ao-button
      >
      <ao-button @click="handleStop">暂停</ao-button>
    </div>
  </span>
</template>
