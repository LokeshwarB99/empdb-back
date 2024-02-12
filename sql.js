const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./empdb.db");

const emptable = `
    CREATE TABLE IF NOT EXISTS emp (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        empid TEXT,
        name TEXT,
        dob TEXT,
        gender TEXT,
        doj TEXT,
        sect TEXT,
        role TEXT,
        income INTEGER,
        address TEXT
    )
`;

// Execute the SQL query to create the table
db.run(emptable, (err) => {
  if (err) {
    console.error("Error creating courses table:", err.message);
  } else {
    console.log("success");
  }
});


db.run(
  `INSERT INTO emp (empid, name, dob, gender, doj, sect, role, income, address) VALUES 
('STUD001', 'John Doe', '1990-01-01', 'Male', '2020-05-15', 'CSE', 'CSE', 6, '123 Main St, City, Country'),
('STUD002', 'Jane Smith', '1992-03-15', 'Female', '2019-10-20', 'CIVIL', 'CIVIL', 7, '456 Elm St, City, Country'),
('STUD003', 'Bob Johnson', '1985-08-22', 'Male', '2021-02-10', 'MECH', 'MECH', 5, '789 Oak St, City, Country')`,
  (err) => {
    if (err) {
      console.error("Error inserting rows:", err.message);
    } else {
      console.log("Rows inserted successfully.");
    }
  }
);

