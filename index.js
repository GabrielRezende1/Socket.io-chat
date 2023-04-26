const path = require("path");
const express = require("express");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

//app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

let usuarios = [];
let socketIds = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket) => {
  socket.on("new user", (data) => {
    if (usuarios.indexOf(data) != -1) {
      socket.emit("new user", { success: false });
    } else {
      usuarios.push(data);
      socketIds.push(socket.id);
      io.emit("user count", { userCount: usuarios.length, userList: usuarios });
      socket.emit("new user", { success: true });
      //Emit para os outros usuários dizendo que tem um novo usuário ativo.
      //socket.broadcast.emit("hello", "world");
    }
  });

  socket.on("chat message", (obj) => {
    if (
      usuarios.indexOf(obj.nome) != -1 &&
      usuarios.indexOf(obj.nome) == socketIds.indexOf(socket.id)
    )
      io.emit("chat message", obj);
    else console.log("Erro: Você não tem permissão para executar a ação.");
  });

  socket.on("user typing", (u) => {
    if (usuarios.indexOf(u.nome) != -1) {
      //check is user exists
      if (u.typing) socket.broadcast.emit("user typing", { nome: u.nome, typing: true });
      else socket.broadcast.emit("user typing", { nome: u.nome, typing: false });
    } else console.log("Erro: Você não tem permissão para executar a ação.");
  });

  socket.on("disconnect", () => {
    let id = socketIds.indexOf(socket.id);
    socketIds.splice(id, 1);
    usuarios.splice(id, 1);
    io.emit("user count", { userCount: usuarios.length, userList: usuarios });
    console.log(socketIds);
    console.log(usuarios);
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
