const EventModel = require("../data/events.model");
const userService = require("./users.service");
const mailService = require("./mail.service");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

const eventService = {
    async getEvents() {
        return await EventModel.find();
    },

    async getEvent(eventId) {
        return await EventModel.findOne({id: eventId});
    },

    async getEventsByOrganizerId(organizerId) {
        return await EventModel.find({organizerId: organizerId});
    },

    async createEvent(eventData) {
        eventData.id = uuidv4();
        const event = await EventModel.create(eventData);
        await userService.updateEventList(eventData.organizerId, eventData.id);
        return event;
    },

    async deleteEvent(eventId) {
        return await EventModel.deleteOne({ id: eventId });
    },

    async reciveInvitationRequest(eventId, username) {
        const event = await this.getEvent(eventId);
        if(event.participants.includes(username)) {
            await EventModel.updateOne(
                { id: eventId }, 
                { $pull: { pendingInvitations: username } }
            );
        } else {
            await EventModel.updateOne(
                { id: eventId }, 
                { $push: { pendingInvitations: username } }
            );
        }
    },

    async acceptRequest(eventId, organizerId, username) {
        const [organizer, event, user] = await Promise.all([
            userService.getUserById(organizerId),
            this.getEvent(eventId),
            userService.getUser(username)
        ]);

        if (organizer.isOrganizer && 
            event.pendingInvitations.includes(username) && 
            event.organizerId === organizerId) {
            
            await Promise.all([
                EventModel.updateOne(
                    { id: eventId }, 
                    {
                        $push: { participants: username },
                        $pull: { pendingInvitations: username }
                    }
                ),
                mailService.sendEventEmail(user, event, true)
            ]);
            return true;
        }
        return false;
    },

    async declineRequest(eventId, organizerId, username) {
        const [organizer, event, user] = await Promise.all([
            userService.getUserById(organizerId),
            this.getEvent(eventId),
            userService.getUser(username)
        ]);

        if (organizer.isOrganizer && 
            event.pendingInvitations.includes(username) && 
            event.organizerId === organizerId) {
            
            await Promise.all([
                EventModel.updateOne(
                    { id: eventId }, 
                    {
                        $pull: { pendingInvitations: username },
                        $push: { declinedInvitations: username }
                    }
                ),
                mailService.sendEventEmail(user, event, false)
            ]);
            return true;
        }
        return false;
    }
};

module.exports = eventService;