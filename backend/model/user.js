const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verification: { type: Object },
});

const User = mongoose.model("user", userSchema);
module.exports = User;