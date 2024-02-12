const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./empdb.db");
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

app.get("/db", (req, res) => {
  const query = `SELECT * FROM emp`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error retrieving datas:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
    console.log(rows);
  });
});

app.post("/add", (req, res) => {
  const { empid, name, dob, gender, doj, sect, role, income, address } =
    req.body;
  const query = `INSERT INTO emp (empid, name, dob, gender, doj, sect, role, income, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [empid, name, dob, gender, doj, sect, role, income, address];

  db.run(query, values, function (err) {
    if (err) {
      console.error("Error adding new employee:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(`New employee added with ID: ${this.lastID}`);
    res
      .status(201)
      .json({ message: "New employee added successfully", empId: this.lastID });
  });
});

app.post("/delete", (req, res) => {
  const { empid } = req.body;
  const query = `delete from emp where empid = ?`;
  const values = [empid];

  db.run(query, values, function (err) {
    if (err) {
      console.error("Error adding new employee:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(`Employee Deleted with ID: ${this.lastID}`);
    res
      .status(201)
      .json({ message: "Employee deleted successfully", empId: this.lastID });
  });
});


app.post("/update", (req, res) => {
  const { empid, name, dob, gender, doj, sect, role, income, address } =
    req.body;
  const query = `UPDATE emp SET name = ?, dob = ?, gender = ?, doj = ?, sect = ?, role = ?, income = ?, address = ? WHERE empid = ?`;
  const values = [name, dob, gender, doj, sect, role, income, address, empid];

  db.run(query, values, function (err) {
    if (err) {
      console.error("Error updating employee:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(`Employee with ID ${empid} updated successfully`);
    res
      .status(200)
      .json({ message: "Employee updated successfully", empId: empid });
  });
});


const PORT = process.env.PORT || 5000; // Specify the port number you want to use

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const query = `SELECT * FROM emp`;

// db.all(query, [], (err, rows) => {
//   if (err) {
//     console.error("Error retrieving datas:", err.message);
//     // res.status(500).json({ error: "Internal Server Error" });
//     return;
//   }
//   // res.json(rows);
//   console.log(rows);
// });
