const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const router = express.Router();

router.get("/users", auth, role, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put("/toggle/:id", auth, role, async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isActive = !user.isActive;
  await user.save();
  res.json(user);
});

module.exports = router;
