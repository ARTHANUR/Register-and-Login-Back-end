const jwt = require("jsonwebtoken");

const secret = "sarthanur"; 

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });
};

module.exports = {
    generateToken
};
