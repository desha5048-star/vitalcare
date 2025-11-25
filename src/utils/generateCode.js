// Generate a 6-digit numeric reset code
function generateResetCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = generateResetCode;
