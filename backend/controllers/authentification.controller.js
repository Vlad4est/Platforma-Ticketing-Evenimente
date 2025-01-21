const userService = require("../services/users.service");
const authService = require("../services/authentification.service");
const bcrypt = require("bcrypt");

const authController = {

    login: async (req, res) => {
        const userCredentials = req.body;
        if(!userCredentials?.username || !userCredentials?.password) {
            res.status(400).send({message: "Invalid data"});
            return;
        }

        const foundUser = await userService.getUser(userCredentials.username);
        if(!foundUser) {
            res.status(404).send({message: "User not found"});
            return;
        }

        const isMatch = await bcrypt.compare(userCredentials.password, foundUser.password);
        if(!isMatch) {
            res.status(403).send({message: "Wrong password"});
            return;
        }
        try {
            const accessToken = await authService.login(foundUser);
            res.status(200).send({message: "User logged in", accessToken});
        } catch (error) {
            res.status(500).send({message: error});
        }
        

    },

    register: async (req, res) => {

        let userData = req.body;
        if(!userData?.username || !userData?.password) {
            res.status(400).send({message: "Invalid data"});
            return;
        }
        const foundUser = await userService.getUser(userData.username);

        if(foundUser) {
            res.status(409).send({message: "User already exists"});
            return;
        }
        try {
            accessToken = await authService.register(userData);
            res.status(201).send({message: "User registered" , accessToken});
        } catch (error) {
            res.status(500).send({message: error});
        }
        
    }
}

module.exports = authController;