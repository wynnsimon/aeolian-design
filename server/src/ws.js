import {WebSocketServer} from "ws";
import { parse } from "qs";
import { readFileSync, unlinkSync, writeFileSync } from "fs";

const server = new WebSocketServer({
  port: 2000,
});

// 连接池-记录所有连接的用户
const sockets = [];

server.on("connection", (socket, req) => {
  let queryStr = req.url.split("?")[1];
  let query = parse(queryStr);
  // 将连接的用户保存在连接池中
  sockets.push({
    socket: socket,
    filename: query.f,
  });

  socket.on("message", (message) => {
    let { row, col, sheet, after, filename } = JSON.parse(message.toString());
    let _path = "excel/" + filename + ".json";
    let data = JSON.parse(readFileSync(_path));

    // 找到编辑的文件以及活跃的sheet
    let sheetArr = data.find((item) => item.name === sheet);

    sheetArr.data[row][col] = after;

    unlinkSync(_path);
    writeFileSync(_path, JSON.stringify(data));
    sockets.forEach((user) => {
      if (user.filename === filename) {
        user.socket.send(message.toString());
      }
    });
  });

  socket.on('close',()=>{
    sockets = sockets.filter(item=>item.socket !== socket)
  })
});
