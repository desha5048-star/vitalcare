const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate.middleware");
const auth = require("../middleware/auth.middleware");
const doctorCtrl = require("../controllers/doctor.controller");

const router = express.Router();

router.post(
    "/signup",
    [
        body("fullName").notEmpty(),
        body("userName").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
        body("phone").matches(/^\+?\d{7,15}$/),
        body("specialization").notEmpty(),
        body("dates").notEmpty(),
    ],
    validate,
    doctorCtrl.signup
);

router.post(
    "/signin",
    [body("email").isEmail(), body("password").notEmpty()],
    validate,
    doctorCtrl.signin
);

router.get("/me", auth, doctorCtrl.getMe);

router.put("/update", auth, doctorCtrl.update);

module.exports = router;
