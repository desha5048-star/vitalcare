const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const patientCtrl = require("../controllers/patient.controller");
const auth = require("../middleware/auth.middleware");

// Signup (image upload optional)
router.post("/signup", upload.single("image"), patientCtrl.signup);

// Login
router.post("/signin", patientCtrl.signin);

// Me
router.get("/me", auth, patientCtrl.getMe);

// Update
router.put("/update", auth, upload.single("image"), patientCtrl.update);

module.exports = router;
