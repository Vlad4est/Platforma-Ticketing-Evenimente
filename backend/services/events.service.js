const EventModel = require("../data/events.model");
const userService = require("./users.service");
const mailService = require("./mail.service");
//const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

const eventService = {
    getEvents: async () => {
        return await EventModel.find();
    },
    getEvent: async (eventId) => {
        const foundEvent = await EventModel.findOne({id: eventId});
        return foundEvent;
    },
    getEventsByOrganizerId: async (organizerId) => {
      const events = await EventModel.find({organizerId: organizerId});
      return events;
    },

    createEvent: async (eventData) =>{
        eventData.id = uuidv4();
        const event = await EventModel.create(eventData);
        await userService.updateEventList(eventData.organizerId, eventData.id);
        return event;
        console.log(event);
    },

    deleteEvent: async(eventId) =>{
        return await EventModel.deleteOne({ id: eventId });
    },
    reciveInvitationRequest: async(eventId, username) =>{
      const event = await eventService.getEvent(eventId);
      if(event.participants.includes(username)) {
        await EventModel.updateOne({ id: eventId }, {$pull:  {pendingInvitations: username} });}
      else {
        await EventModel.updateOne({ id: eventId }, {$push:  {pendingInvitations: username} });
        return
      }
  },
  acceptRequest: async (eventId, organizerId, username) => {
    console.log("am intrat service")
   // console.log(eventId, organizerId, username);
    const organizer = await userService.getUserById(organizerId);
    const event = await eventService.getEvent(eventId);
    const user = await userService.getUser(username);
    if(organizer.isOrganizer && event.pendingInvitations.includes(username) && event.organizerId === organizerId) {
      console.log("test-1")
      await EventModel.updateOne({ id: eventId }, {$push:  {participants: username} });
      await EventModel.updateOne({ id: eventId }, {$pull:  {pendingInvitations: username} });
      console.log("test-2")
      return await mailService.sendAcceptMail(username, eventId);
    }
    else{
      console.log("test-3")
    }
    return false;
  },
  declineRequest: async (eventId, organizerId, username) => {
    const organizer = await await userService.getUserById(organizerId);
    const event = await eventService.getEvent(eventId);
    const user = await userService.getUser(username);
    if(organizer.isOrganizer && event.pendingInvitations.includes(username) && event.organizerId === organizerId){
      await EventModel.updateOne({ id: eventId }, {$pull:  {pendingInvitations: username} });
      await EventModel.updateOne({ id: eventId }, {$push:  {declinedInvitations: username} });
      await mailService.sendDeclineMail(username, eventId);
    }
    
  }
    

}

module.exports = eventService;