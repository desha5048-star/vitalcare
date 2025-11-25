const bcrypt = require("bcryptjs");
const Doctor = require("../models/doctor.model");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
    try {
        const { fullName, userName, password, email, specialization, phone, dates } = req.body;

        // Check if exists
        const exists = await Doctor.findOne({ $or: [{ email }, { userName }] });
        if (exists) {
            return res.status(400).json({ message: "Email or Username already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const doctor = await Doctor.create({
            fullName,
            userName,
            email,
            password: hashed,
            specialization,
            phone,
            dates,
        });

        const { password: _, ...safe } = doctor._doc;

        res.status(201).json({ message: "Doctor registered", doctor: safe });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await Doctor.findOne({ email });
        if (!doctor) return res.status(400).json({ message: "Invalid email or password" });

        const match = await bcrypt.compare(password, doctor.password);
        if (!match) return res.status(400).json({ message: "Invalid email or password" });

        const token = generateToken({ id: doctor._id, email: doctor.email });

        res.json({ message: "Login success", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id).select("-password");
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const doctor = await Doctor.findByIdAndUpdate(req.user.id, updateData, {
            new: true,
        }).select("-password");

        res.json({ message: "Updated", doctor });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
