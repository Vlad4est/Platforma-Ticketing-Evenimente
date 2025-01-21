const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser } = require("./users.service");
require("dotenv").config();

const authService = {
    hashPassword: async (password) => {

        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);   
    }, 

    register: async (userData) => {
        const hashedPassword = await authService.hashPassword(userData.password);
        userData.password = hashedPassword;
        const user = await createUser(userData);
        const accessToken = jwt.sign({ username: user.username, id: user.id, isOrganizer: user.isOrganizer}, process.env.ACCESS_TOKEN_SECRET);
        return accessToken;
    },
    login: async (user) => {
        const accessToken = jwt.sign({ username: user.username, id: user.id, isOrganizer: user.isOrganizer}, process.env.ACCESS_TOKEN_SECRET);
        return accessToken;
    }
}

module.exports = authService;