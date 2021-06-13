module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("Task", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    memo: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category: {
      type: Sequelize.STRING,
    },
    deadline: {
      type: Sequelize.DATE,
    },
    finished_at: {
      type: Sequelize.DATE,
    },
  }, {
    underscored: true
  });

  return Task;
};
