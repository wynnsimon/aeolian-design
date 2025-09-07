import {
  createReadStream,
  createWriteStream,
  existsSync,
  readdirSync,
  rmSync,
} from "fs";
import { resolve, join } from "path";
import { finished } from "stream/promises"; // 添加这个导入

/**
 * 合并每一个切片
 * @param {*} fileList 文件列表
 * @param {*} fileWriteStream 文件写入流
 * @param {*} sourceFiles 源文件
 */
function chunkStreamMergeProgress(fileList, fileWriteStream, sourceFiles) {
  if (!fileList.length) {
    fileWriteStream.end("完成");
    if (sourceFiles) {
      finished(fileWriteStream)
        .then(() => {
          console.log("开始删除源文件", sourceFiles);
          rmSync(sourceFiles, { recursive: true, force: true });
        })
        .catch((err) => {
          console.error("流结束时出错:", err);
        });
    }
    return;
  }
  const data = fileList.shift();
  const { filePath: chunkFilePath } = data;
  const currentReadStream = createReadStream(chunkFilePath);
  currentReadStream.pipe(fileWriteStream, { end: false });
  currentReadStream.on("end", () => {
    chunkStreamMergeProgress(fileList, fileWriteStream, sourceFiles);
  });
}

/**
 * 合并文件切片
 * @param {*} sourceFiles 源文件
 * @param {*} targetFile 目标文件
 */
export function chunkStreamMerge(sourceFiles, targetFile) {
  const chunkFilesDir = sourceFiles;
  const list = readdirSync(chunkFilesDir);
  const fileList = list.map((name) => {
    return {
      name,
      filePath: resolve(chunkFilesDir, name),
    };
  });

  const fileWriteStream = createWriteStream(targetFile);
  chunkStreamMergeProgress(fileList, fileWriteStream, sourceFiles);
}

/**
 * 验证文件
 * @param {string} filePath 上传目录路径 (比如 "uploads")
 * @param {string} filename 文件名
 * @returns {{ fileState: number, uploaded: string[] }}
 * fileState: 0=未上传, 1=已完成, 2=未完成
 */
export function verifyFile(filePath, filename) {
  let fileState = 0; // 默认未上传
  let uploaded = [];

  // 合并后的完整文件路径
  const mergedFilePath = join(filePath, filename);
  // 切片目录路径
  const chunkDir = join(filePath, "chunks", filename);
  console.log(mergedFilePath);
  // 1. 判断是否存在合并后的文件
  if (existsSync(mergedFilePath)) {
    fileState = 1; // 已完成
  }
  // 2. 判断是否存在切片目录
  else if (existsSync(chunkDir)) {
    fileState = 2; // 未完成
    // 获取已上传的切片文件名
    uploaded = readdirSync(chunkDir).map((chunk) =>
      parseInt(chunk.split("-").pop())
    );
  }
  // 3. 都不存在
  else {
    fileState = 0; // 未上传
  }

  return {
    fileState,
    uploaded,
  };
}
