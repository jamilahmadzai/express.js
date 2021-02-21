const express = require("express");
const router = express.Router();
const members = require("../Members");

//get all members
router.get("/", (req, res) => {
  res.json(members);
});

//get single member by id
router.get("/:id", (req, res) => {
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
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
