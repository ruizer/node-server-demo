const getIPAdress = require("./utils");

// 引入express中间件
const express = require("express");
// 创建web服务器
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

// 指定启动服务器到哪个文件夹
app.use(express.static("./dist"));
const SERVER_PATH = "http://10.15.11.17:8089";
app.use(
  "/test",
  createProxyMiddleware({
    target: SERVER_PATH,
    changeOrigin: true,
    pathRewrite: {
      "^/test": "",
    },
  })
);

const port = 3000;
const server = app.listen(port, () => {
  console.log("web server runnin at:");
  console.log(`Local:   http://localhost:${port}`);
  console.log(`Network: http://${getIPAdress.myHost}:${port}`);
});

// const server = app.listen(0, () => {
//   console.log("web server runnin at:");
//   const port = server.address().port;
//   console.log(`Local:   http://localhost:${port}`);
//   console.log(`Network: http://${getIPAdress.myHost}:${port}`);
// });
