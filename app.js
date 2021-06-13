require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

// タスクの全取得
app.get("/tasks", (req, res) => {
  const sql = "select * from tasks;";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json({
      message: "get all tasks successfully!",
      tasks: result
    })
  });
});

// タスクの新規作成
app.post("/tasks", (req, res) => {
  console.log(req.body)
  const title = req.body.title;
  const memo = req.body.memo;
  const category = req.body.category;
  const status = req.body.status;
  const deadline = req.body.deadline;
  const sql = `insert into tasks (title, memo, category, status, deadline) values ("${title}", "${memo}", "${category}", "${status}", "${deadline}");`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
  })
  res.send('created successfully!')
});

// タスクの一件取得
app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  const sql = `select * from tasks where id = ${id}`
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json({
      message: "get task successfully!",
      tasks: result
    })
  })
})

// タスクの編集
app.patch("/tasks/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  console.log(req.body)
  const title = req.body.title;
  const memo = req.body.memo;
  const category = req.body.category;
  const status = req.body.status;
  const deadline = req.body.deadline;
  const sql = `update tasks set title="${title}", memo="${memo}", category="${category}", status="${status}", deadline="${deadline}" where id = ${id}`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
  })
  res.send("updated successfully!");
})

// タスクの削除
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  const sql = `delete from tasks where id = ${id}`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
  })
  res.send("deleted successfully!");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
