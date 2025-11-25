const express = require("express");
const router = express.Router();
const { resetPassword } = require("../../controllers/reset/resetPassword.controller");

// POST /api/reset/password
router.post("/", resetPassword);

module.exports = router;
