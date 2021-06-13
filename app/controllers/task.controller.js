const db = require("../models");
const dayjs = require("dayjs");
const Tasks = db.tasks;

// タスク新規作成
exports.create = (req, res) => {
  if (!req.body.title || !req.body.status) {
    res.status(400).send({
      message: "'title' or 'status' can not be empty!"
    })
    return
  }

  const task = {
    title: req.body.title,
    memo: req.body.memo,
    status: req.body.status,
    category: req.body.category ?? "none",
    deadline: req.body.deadline,
    finished_at:
      req.body.status === "FINISHED"
        ? dayjs().format("YYYY-MM-DD HH:mm:ss")
        : null,
  };

  Tasks.create(task).then(data => {
    res.send({
      message: "Task was created successfully.",
      task: data
    });
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Task.",
    });
  });
}

// タスクの全取得
exports.findAll = (req, res) => {
  Tasks.findAll().then(data => {
    res.send({
      message: "Retrieving all tasks successfully.",
      tasks: data
    })
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tasks.",
    });
  })
}

// タスクの一件取得
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tasks.findByPk(id).then(data => {
    if (data) {
      res.send({
        message: "Retrieving task successfully.",
        task: data,
      });
    } else {
      res.status(404).send({
        message: "Task not found."
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving Task with id=" + id
    });
  })
}

// タスクの更新
exports.update = (req, res) => {
  const id = req.params.id;

  Tasks.update(req.body, {
    where: { id }
  }).then(num => {
    if (num === 1) {
      res.send({
        message: "Task was updated successfully."
      })
    } else {
      res.status(404).send({
        message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating Task with id=" + id,
    });
  })
}

// タスクの削除
exports.delete = (req, res) => {
  const id = req.params.id;

  Tasks.destroy({
    where: { id }
  }).then(num => {
    if (num === 1) {
      res.send({
        message: "Task was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete Task with id=" + id
    });
  })
}
