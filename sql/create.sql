USE task_manager;

DROP TABLE IF EXISTS tasks;

CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  memo TEXT,
  category VARCHAR(10),
  status ENUM('PLANNING', 'INPROGRESS', 'FINISHED') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp,
  deadline TIMESTAMP,
  finished_at TIMESTAMP
);

INSERT INTO tasks (
  title,
  memo,
  category,
  status,
  deadline,
  finished_at
) VALUES (
  "レポート",
  "今回のレポートは重い",
  "大学",
  "PLANNING",
  "2021-07-01 12:30:00",
  null
);

INSERT INTO tasks (
  title,
  memo,
  category,
  status,
  deadline,
  finished_at
) VALUES (
  "風呂掃除",
  "",
  "家事",
  "FINISHED",
  "2021-06-12 12:00:00",
  "2021-06-12 11:00:00"
);

INSERT INTO tasks (
  title,
  memo,
  category,
  status,
  deadline,
  finished_at
) VALUES (
  "インターン",
  "今のタスクを終わらせる",
  "仕事",
  "INPROGRESS",
  null,
  null
);