import { ArrayBuffer } from "spark-md5";

self.onmessage = async (e: MessageEvent) => {
  const { chunks, index } = e.data;
  const spark = new ArrayBuffer();
  let finished = 0;
  function loadNext() {
    const reader = new FileReader();
    reader.onload = (ev) => {
      spark.append(ev.target?.result as ArrayBuffer);
      ++finished;

      if (finished < chunks.length) {
        loadNext();
      } else {
        const hash = spark.end();
        self.postMessage({ type: "done", index, hash });
      }
    };
    reader.readAsArrayBuffer(chunks[finished]);
  }
  loadNext();
};
