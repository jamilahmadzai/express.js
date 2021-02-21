const express = require("express");
const path = require("path");
const members = require("./Members");

const app = express();

//get all members
app.get("/api/members", (req, res) => {
  res.json(members);
});

//get single member by id
app.get("/api/members/:id", (req, res) => {
  const found = members.some((member) => {
    return member.id === parseInt(req.params.id);
  });

  if (found) {
    const member = members.filter(
      (member) => member.id === parseInt(req.params.id)
    );
    res.send(member);
  } else {
    res.status(404).send({ msg: "No member with this id exists" });
    console.log("No member with this id exists");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server is running"));
