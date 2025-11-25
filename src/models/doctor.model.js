const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        specialization: { type: String, required: true },
        phone: { type: String, required: true },
        dates: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
