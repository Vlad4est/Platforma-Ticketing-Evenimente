const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller")


//Router for getting all users
router.get("/", usersController.getUsers);
//Router for getting one user
router.get("/:username", usersController.getUser);
//Router for creating a user
router.post("/", usersController.createUser);
//Router for deleting a user
router.delete("/", usersController.deleteUser);


module.exports = router;