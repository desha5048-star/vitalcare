const Patient = require("../models/patient.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
    try {
        const {
            fullName,
            username,
            email,
            password,
            phone,
            cancerType,
            diagnosis,
            notes,
            abnormalSymptoms,
            additionalInfo,
            age,
            gender
        } = req.body;

        const exists = await Patient.findOne({ $or: [{ email }, { username }] });
        if (exists) {
            return res.status(400).json({ message: "Email or username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let imageUrl = "";
        if (req.file) {
            imageUrl = req.file.path; // Cloudinary URL
        }

        const patient = await Patient.create({
            fullName,
            username,
            email,
            password: hashedPassword,
            phone,
            cancerType,
            diagnosis,
            notes,
            abnormalSymptoms,
            additionalInfo,
            age,
            gender,
            image: imageUrl
        });

        const token = generateToken({ id: patient._id });

        res.status(201).json({
            message: "Patient registered successfully",
            token,
            patient: {
                ...patient._doc,
                password: undefined
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken({ id: patient._id });

        res.json({
            message: "Login successful",
            token,
            patient: {
                ...patient._doc,
                password: undefined,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getMe = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user.id).select("-password");
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.update = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        if (req.file) {
            updateData.image = req.file.path;
        }

        const patient = await Patient.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        ).select("-password");

        res.json({
            message: "Profile updated",
            patient
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
