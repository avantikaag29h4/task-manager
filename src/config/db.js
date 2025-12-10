const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'avantika',
  database: 'task_manager'
});

module.exports = pool.promise();
