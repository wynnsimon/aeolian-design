import express from "express";
import cors from "cors";
import { Form } from "multiparty";
import { mkdirSync, copyFileSync, unlinkSync } from "fs";
import { chunkStreamMerge, verifyFile } from "./file.js";
import { existsSync, readFileSync, writeFileSync } from "fs";

const app = express();

// 允许所有域名跨域（开发阶段常用）
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 或者更精细地指定

app.post("/upload", (req, res) => {
  const form = new Form();
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({
        code: 500,
        message: "上传切片失败",
      });
    } else {
      mkdirSync("uploads/chunks/" + fields.filename[0], { recursive: true });

      const tempPath = files.chunk[0].path;
      const targetPath =
        "uploads/chunks/" +
        fields.filename[0] +
        "/" +
        fields.filename[0] +
        "-" +
        fields.chunkIndex[0];

      try {
        copyFileSync(tempPath, targetPath);
        unlinkSync(tempPath);
      } catch (error) {
        console.error("文件移动失败:", error);
        res.json({
          code: 500,
          message: "文件保存失败",
        });
        return;
      }
    }
  });
  res.json({
    code: 200,
    message: "上传切片成功",
  });
});

app.post("/upload_end", (req, res) => {
  const filename = req.body.filename;
  chunkStreamMerge("uploads/chunks/" + filename, "uploads/" + filename);

  res.json({
    code: 200,
    message: "合并成功",
    data: "uploads/" + filename,
  });
});

app.post("/upload_verify", (req, res) => {
  // 0：未上传，1：已完成，2：缺少分片
  const result = verifyFile("uploads", req.body.filename);
  res.json({
    code: 200,
    message:
      result.fileState == 0
        ? "未上传"
        : result.fileState == 1
        ? "已完成(秒传)"
        : "缺少分片(断点续传)",
    data: result,
  });
});

app.post("/load", (req, res) => {
  let filename = req.body.gridKey;
  let _path = "excel" + "/" + filename + ".json";
  let _isExist = existsSync(_path);

  if (_isExist) {
    let data = readFileSync(_path);
    res.send(data);
  } else {
    let templatePath = "excel" + "/empty.json";
    let data = readFileSync(templatePath);

    writeFileSync("excel" + "/" + filename + ".json", data);
    res.send(data);
  }
});

app.post("/save", (req, res) => {
  let filename = req.body.filename;
  console.log(filename);
  let _path = "excel" + "/" + filename + ".json";
  let _isExist = existsSync(_path);
  if (_isExist) {
    unlinkSync(_path);
  }
  writeFileSync(_path, JSON.stringify(req.body.data));
  res.send("保存成功");
});

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
