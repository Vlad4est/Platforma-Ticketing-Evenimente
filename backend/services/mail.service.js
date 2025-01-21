const nodemailer = require('nodemailer');
const eventService = require("../services/events.service")
const userService = require("../services/users.service")

const mailService = {
    sendAcceptMail: async (username, eventId) => {
        console.log("am intrat mail")
        const user = await userService.getUser(username);
        const event = await eventService.getEvent(eventId);
        //const event = await eventService.getEvent(eventId);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'youreventinvites@gmail.com',
                pass: "pody kbsz ovik vakq"
            }
        })
    
        const mailOptions = {
            from: 'youreventinvites@gmail.com',
            to: "vlad.4est@gmail.com",
            subject: `Invitation to ${event.title}`,
            text: `Hi ${user.username},\n\nYou have been invited to the event "${event.title}".\n\n- Description: ${event.description || "No description provided"}\n- Location: ${event.location}\n- Time: ${event.time}\n\nBest regards,\nThe Events Team`
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log('Email sent: ' + info.response);
                return true;
            }
        })
    },
    sendDeclineMail: async (username, eventId) => {
        const user = await userService.getUser(username);
        const event = await eventService.getEvent(eventId);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'youreventinvites@gmail.com',
                pass: "pody kbsz ovik vakq"
            }
        })

        const mailOptions = {
            from: 'youreventinvites@gmail.com',
            to: "vlad.4est@gmail.com",
            subject: 'Invitation Declined',
            text: `Hi ${user.username},\n\nWe regret to inform you that your request to join the event "${event.title}" has been declined.`
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log('Email sent: ' + info.response);
                return true;
            }
        })
        
    }
}

module.exports = mailService