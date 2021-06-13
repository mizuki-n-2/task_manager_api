require("dotenv").config();
const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
console.log("DB connected!");

require("./app/routes/task.routes")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
