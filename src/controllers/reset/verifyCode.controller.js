const { getResetCode } = require("../../db/resetCodes");

// Verify the reset code
exports.verifyResetCode = async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code)
        return res.status(400).json({ message: "Email and code are required" });

    const entry = getResetCode(email);
    if (!entry)
        return res.status(400).json({ message: "No code found" });

    if (entry.code !== code)
        return res.status(400).json({ message: "Incorrect code" });

    if (entry.expiresAt < Date.now())
        return res.status(400).json({ message: "Code expired" });

    res.json({ message: "Code verified" });
};
