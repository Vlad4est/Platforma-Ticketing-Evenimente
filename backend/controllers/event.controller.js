const EventModel = require("../data/events.model");
const { reciveInvitationRequest } = require("../services/events.service");
const eventService = require("../services/events.service")

const eventsController = {

    getEvents: async (req, res) => {
        const events = await eventService.getEvents();
        
        res.status(200).send(events);
    },
    getRequestsByOrganizerId: async (req, res) => {
        let events = await eventService.getEvents();
        
        events = events.filter(event => event.organizerId === req.user.id);
        const requests = events.flatMap(event => {
            return event.pendingInvitations.map(username => {
              return {
                username: username,
                event: {
                  id: event.id,
                  title: event.title,
                  dateTime: event.time
                }
              };
            });
          });
        res.status(200).send(requests);
    },
    
    createEvent: async (req, res) =>{
        try {
            let eventData = req.body;
            console.log(eventData);
            await eventService.createEvent(eventData);
            res.status(201).send({message: "Event created"});
        } catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
       
    },
    deleteEvent: async (req, res) => {
        try {
            eventId = parseInt(req.params.id);
            const result = await eventService.deleteEvent(eventId);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    reciveInvitationRequest: async (req, res) => {
        try {
            const eventId = req.params.id;
            const username = req.user.username;
            const result = await eventService.reciveInvitationRequest(eventId, username);
            res.status(200).send({message: "Invitation received"});
        } catch (error) {
            res.status(400).send(error);
        }
    },
    acceptRequest: async (req, res) => {
        console.log("hello")
        try {
            console.log("Am intrat request")
            console.log(req.body)
            console.log(req.user)
            const eventId = req.body.eventId;
            const organizerId = req.user.id;
            const username = req.body.username;
            console.log(eventId, organizerId, username);
            const result = await eventService.acceptRequest(eventId, organizerId, username);
            res.status(200).send({invitationAccepted: result});
        } catch (error) {
            console.log(error);
            res.status(400).send({message: error});
        }
    },
    declineRequest: async (req, res) => {
        try {
            console.log("Am intrat request")
            console.log(req.body)
            console.log(req.user)
            const eventId = req.body.eventId;
            const organizerId = req.user.id;
            const username = req.body.username;
            console.log(eventId, organizerId, username);
            const result = await eventService.declineRequest(eventId, organizerId, username);
            res.status(200).send({invitationDeclined: result});
        } catch (error) {
            console.log(error);
            res.status(400).send({message: error});
        }
    }
}

module.exports = eventsController;