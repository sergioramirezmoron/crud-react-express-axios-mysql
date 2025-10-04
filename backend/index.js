const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "workers_crud",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const experience = req.body.experience;

  db.query(
    "INSERT INTO workers(name,age,country,position,experience) VALUES (?,?,?,?,?)",
    [name, age, country, position, experience],
    (err, result) => {
      if (err) {
        console.log("ERROR: ", err);
      } else {
        res.send("Empleado registrado con éxito!!");
      }
    }
  );
});

app.get("/workers", (req, res) => {
  db.query("SELECT * FROM workers;", (err, result) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const experience = req.body.experience;

  db.query(
    "UPDATE workers SET name=?, age=? ,country=? ,position=? ,experience=? WHERE id=?",
    [name, age, country, position, experience, id],
    (err, result) => {
      if (err) {
        console.log("ERROR: ", err);
      } else {
        res.send("Empleado actualizado con éxito!!");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM workers WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Funcionando en el puerto establecido");
});
