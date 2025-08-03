import { UploadProgressEvent, RequestOptions } from "../../types/upload";

export function httpRequest(options: RequestOptions) {
  const xhr = new XMLHttpRequest();
  const action = options.action;

  xhr.open(options.method, action, true);
  xhr.upload.addEventListener("progress", (e) => {
    // 计算上传进度
    const processEvents = e as UploadProgressEvent;
    processEvents.percentage = e.total > 0 ? (e.loaded / e.total) * 100 : 0;

    options.onProgress(processEvents);
  });

  // 请求头
  const headers = options.headers;
  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      xhr.setRequestHeader(key, value);
    }
  }

  // 请求数据
  const formData = new FormData();
  if (options.data) {
    for (const [key, value] of Object.entries(options.data)) {
      formData.append(key, value);
    }
  }
  formData.append(options.name, options.file);

  // 监听事件
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      options.onSuccess(xhr.response);
    } else {
      options.onError({ status: xhr.status });
    }
  };
  xhr.addEventListener("error", function (err) {
    options.onError(err);
  });

  xhr.send(formData);
  return xhr;
}
