import sparkMd5 from "spark-md5";

/**
 * 计算哈希
 * @param chunks 分片
 * @returns 包含哈希值的promise对象，支持异步
 */
export function hash(chunks: Blob[]): Promise<string> {
  return new Promise((resolve) => {
    const md5 = new sparkMd5.ArrayBuffer();
    for (let i = 0; i < chunks.length; ++i) {
      const fr = new FileReader();
      fr.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) md5.append(e.target.result as ArrayBuffer);
      };
      fr.readAsArrayBuffer(chunks[i]);
    }
    resolve(md5.end(false));
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

