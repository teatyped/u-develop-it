const { getConsoleOutput } = require("@jest/console");
const express = require("express");
const mysql = require("mysql2");
const { resourceLimits } = require("worker_threads");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "@Vingtsun1!",
    database: "election",
  },
  console.log("Connected to the election database")
);

// DATABASE query's here

// GET a single candiate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

// //DELETE a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            VALUES (?,?,?,?)`;
const params = [1,'Ronald', 'Firbank', 1];

db.query(sql, params, (err, results) => {
    if (err) {
        console.log(err);
    }
    console.log(results);
});



// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
