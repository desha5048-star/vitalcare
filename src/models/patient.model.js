const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        cancerType: { type: String },
        diagnosis: { type: String },
        notes: { type: String },
        abnormalSymptoms: { type: String },
        additionalInfo: { type: String },
        age: { type: Number },
        gender: { type: String, enum: ["Male", "Female"] },
        image: { type: String },
        date: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
