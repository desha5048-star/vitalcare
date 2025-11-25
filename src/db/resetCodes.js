// Simple in-memory store for reset codes
const resetCodes = {};

function saveResetCode(email, code, expiresAt) {
    resetCodes[email] = { code, expiresAt };
}

function getResetCode(email) {
    return resetCodes[email] || null;
}

function clearResetCode(email) {
    delete resetCodes[email];
}

module.exports = { saveResetCode, getResetCode, clearResetCode };
