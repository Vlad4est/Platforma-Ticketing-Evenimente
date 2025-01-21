const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/event.controller");
const tokenMiddleware = require("../middlewares/token.middleware");

//Router for getting all events
router.get("/", tokenMiddleware, eventsController.getEvents);
router.get("/:organizerId", tokenMiddleware, eventsController.getRequestsByOrganizerId);
router.post("/accept", tokenMiddleware, eventsController.acceptRequest);
router.post("/decline", tokenMiddleware, eventsController.declineRequest);
//Router for creating a event
router.post("/", tokenMiddleware, eventsController.createEvent);
router.post("/:id", tokenMiddleware, eventsController.reciveInvitationRequest);
router.delete("/:id", tokenMiddleware, eventsController.deleteEvent);




module.exports = router;