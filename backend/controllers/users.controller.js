const userService = require("../services/users.service");


const usersController = {
    getUser: async (req, res) =>{
        const username = req.params.username;
        const foundUser = await userService.getUser(username);
        if(!foundUser) {
            res.status(404).send("User not found");
            return;
        }
        res.send(foundUser);  
        
    },

    getUsers: async (req, res) => {
        res.status(200).send(await userService.getUsers());
    },

    createUser: async (req, res) => {
        /*console.log("Reached user controller");
        const userData = req.body;
        if(!userData?.id ||!userData?.name || !userData?.password)
            {
            res.status(400).send("Invalid data");
            return;
            }
        userService.createUser(userData);
        res.status(201).send("User created"); */
        try {
            const userData = req.body;
            await userService.createUser(userData);
            res.status(201).send("User created");
        } catch (error) {
            res.status(400).send(error);
        }
    },

    deleteUser: async (req, res) => {
        console.log(`Deleted user with id ${userId}`);
        userService.deleteUser(userId);
    }
   

}

module.exports = usersController;