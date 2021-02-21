const express = require("express");
const path = require("path");
const members = require("./Members");

const app = express();

//view Engine
app.set("view engine", "ejs");

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Members", members });
});

app.use("/api/members", require("./routes/route"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server is running"));
