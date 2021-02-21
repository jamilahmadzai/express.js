const { urlencoded } = require("express");
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

//Create a new member
app.post("/api/members", (req, res) => {
  const newMember = {
    id: members.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  if (!newMember.name || !newMember.email) {
    res.status(404).send("Please inculde a name and an email");
  } else {
    members.push(newMember);
    // res.send(members);
    res.redirect("/");
  }
});

//Update a member
app.put("/api/members/:id", (req, res) => {
  const found = members.some((member) => {
    return member.id === parseInt(req.params.id);
  });

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
      }
    });
    res.send(members);
  } else {
    res.status(404).send({ msg: "No member with this id exists" });
    console.log("No member with this id exists");
  }
});

//Delete a member
app.delete("/api/members/:id", (req, res) => {
  const found = members.some((member) => {
    return member.id === parseInt(req.params.id);
  });
  if (found) {
    const newMembers = members.filter((member) => {
      return member.id !== parseInt(req.params.id);
    });
    res.send(newMembers);
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
