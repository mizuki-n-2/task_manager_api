module.exports = app => {
  const tasks = require("../controllers/task.controller");

  var router = require("express").Router();

  router.get("/", tasks.findAll);
  router.post("/", tasks.create);

  router.get("/:id", tasks.findOne);
  router.patch("/:id", tasks.update);
  router.delete("/:id", tasks.delete);

  app.use("/api/tasks", router);
}