const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require('cors')

app.use(express.json())
app.use(cors())

mongoose.connect(
  "mongodb+srv://Ayush:Ayush03@tutorial.2gn4q.mongodb.net/barsha?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", () => console.log("error in connecting to db"));
db.once("open", () => console.log("db connected"));

app.get("/", (req, res) => {
  res.send("barsha");
});

const schemaTemp = require("./db/Contactmodel");

app.post("/barsha", (req, res) => {
  const data = new schemaTemp({
    fname: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    locality: req.body.locality,
  });

  data.save();
  res.json(data);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
