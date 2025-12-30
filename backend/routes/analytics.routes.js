const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const router = express.Router();

router.get("/overview", auth, role, async (req, res) => {
  const totalUsers = await User.countDocuments();

  const totalSalesAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const totalSales = totalSalesAgg[0]?.total || 0;

  res.json({
    totalUsers,
    totalSales
  });
});

module.exports = router;
