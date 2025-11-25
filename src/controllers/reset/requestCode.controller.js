const Patient = require("../../models/patient.model");
const Doctor = require("../../models/doctor.model");
const generateResetCode = require("../../utils/generateCode");
const { saveResetCode } = require("../../db/resetCodes");
const { sendResetCode } = require("../../utils/email");

// Send reset code without role
exports.requestResetCode = async (req, res) => {
    const { email } = req.body;

    if (!email)
        return res.status(400).json({ message: "Email is required" });

    // Try doctor first
    let user = await Doctor.findOne({ email });

    // If not doctor => try patient
    if (!user) user = await Patient.findOne({ email });

    if (!user)
        return res.status(404).json({ message: "User not found" });

    // Generate 6-digit code
    const code = generateResetCode();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    // Store code
    saveResetCode(email, code, expiresAt);

    // Send email
    await sendResetCode(email, code);

    res.json({
        message: "Reset code sent",
        email

    });
};
