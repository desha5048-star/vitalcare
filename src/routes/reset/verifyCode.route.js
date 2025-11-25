const express = require("express");
const router = express.Router();
const { verifyResetCode } = require("../../controllers/reset/verifyCode.controller");

// POST /api/reset/verify
router.post("/", verifyResetCode);

module.exports = router;
