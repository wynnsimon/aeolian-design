import SparkMd5 from "spark-md5";

const THREAD_COUNT = navigator.hardwareConcurrency || 4;

/**
 * 计算哈希
 * @param chunks 分片
 * @returns 包含哈希值的promise对象，支持异步
 */
export function hash(chunks: Blob[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const workers: Worker[] = [];
    const results: { index: number; hash: string }[] = [];

    // 每个 worker 负责的 chunk 数量
    const chunkSize = Math.ceil(chunks.length / THREAD_COUNT);
    for (let i = 0; i < THREAD_COUNT; ++i) {
      const worker = new Worker(new URL("./worker.ts", import.meta.url), {
        type: "module",
      });
      workers.push(worker);

      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, chunks.length);
      const subChunks = chunks.slice(start, end);

      worker.postMessage({ chunks: subChunks, index: i });

      worker.onmessage = (e: MessageEvent) => {
        const { type, hash, index } = e.data;
        if (type === "done") {
          results.push({ index, hash });
          worker.terminate();

          // 所有 worker 都完成
          if (results.length === THREAD_COUNT) {
            // 按 index 排序，保证顺序正确
            results.sort((a, b) => a.index - b.index);

            const spark = new SparkMd5();
            results.forEach((r) => spark.append(r.hash));

            resolve(spark.end());
          }
        }
      };

      worker.onerror = (e: ErrorEvent) => {
        reject(e);
        worker.terminate();
      };
    }
  });
}

/**
 * 创建分片
 * @param file 文件
 * @param chunkSize 分片大小
 * @returns 分片数组
 */
export async function createChunk(file: File, chunkSize: number) {
  const result: Blob[] = [];
  for (let i = 0; i < file.size; i += chunkSize) {
    result.push(file.slice(i, i + chunkSize));
  }
  return result;
}
