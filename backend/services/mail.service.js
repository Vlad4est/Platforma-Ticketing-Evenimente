const nodemailer = require('nodemailer');
const eventService = require("../services/events.service")
const userService = require("../services/users.service")

const mailService = {
    sendAcceptMail: async (username, eventId) => {
        console.log("am intrat mail")
        const user = await userService.getUser(username);
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
            subject: 'Invitation',
            text: `You have been invited to an event!`
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
            text: `Your request has been declined!`
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