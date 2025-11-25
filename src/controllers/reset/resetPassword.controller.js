const bcrypt = require("bcryptjs");
const Patient = require("../../models/patient.model");
const Doctor = require("../../models/doctor.model");
const { getResetCode, clearResetCode } = require("../../db/resetCodes");

// Reset password for doctor or patient
exports.resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword)
        return res.status(400).json({ message: "All fields are required" });

    const entry = getResetCode(email);
    if (!entry)
        return res.status(400).json({ message: "No reset code stored" });

    if (entry.code !== code)
        return res.status(400).json({ message: "Incorrect reset code" });

    if (entry.expiresAt < Date.now())
        return res.status(400).json({ message: "Reset code expired" });

    const hashed = await bcrypt.hash(newPassword, 10);

    // Try updating doctor first
    let updated = await Doctor.findOneAndUpdate(
        { email },
        { password: hashed }
    );

    // If not doctor → update patient
    if (!updated) {
        updated = await Patient.findOneAndUpdate(
            { email },
            { password: hashed }
        );
    }

    if (!updated)
        return res.status(404).json({ message: "User not found" });

    clearResetCode(email);

    res.json({ message: "Password reset successfully" });
};
