const UserModel = require("../data/users.model")
const { v4: uuidv4 } = require('uuid');

const userService ={
    getUser: async (username) => {
        const foundUser = await UserModel.findOne({username: username});
        return foundUser;
    },
    getUserById: async (userId) => {
        const foundUser = await UserModel.findOne({id: userId});
        return foundUser;
    },

    getUsers: async () => {
        const users = await UserModel.find();
        return users;
    },

    createUser: async (userData) =>{
        console.log("Reached user service");
        userData.id = uuidv4();
        const user = await UserModel.create(userData);
        return user;
        console.log(user);
    },

    deleteUser: (userId) =>{
        console.log(`Reached service user ${userId}`);
        console.log(userId);
    },
    updateEventList: async (userId, eventId) => {
        const user = await userService.getUserById(userId);
        if(user.events.includes(eventId)) {
            await UserModel.updateOne({ id: userId }, {$pull:  {events: eventId} });
        } else {
            await UserModel.updateOne({ id: userId }, {$push:  {events: eventId} });
        }
    }

}

module.exports = userService;