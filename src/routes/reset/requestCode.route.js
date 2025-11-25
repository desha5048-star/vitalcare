const express = require("express");
const router = express.Router();
const { requestResetCode } = require("../../controllers/reset/requestCode.controller");

// POST /api/reset/request
router.post("/", requestResetCode);

module.exports = router;
