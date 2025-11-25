const express = require("express");
const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.routes");
const requestCodeRoutes = require("./routes/reset/requestCode.route");
const verifyCodeRoutes = require("./routes/reset/verifyCode.route");
const resetPasswordRoutes = require("./routes/reset/resetPassword.route");

const app = express();
app.use(express.json());

// Routes
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/reset/request", requestCodeRoutes);
app.use("/api/reset/verify", verifyCodeRoutes);
app.use("/api/reset/password", resetPasswordRoutes);
module.exports = app;
