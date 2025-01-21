
const nodemailer = require('nodemailer');
const userService = require("../services/users.service");

const mailService = {
    async sendEventEmail(user, event, isAccept = true) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'youreventinvites@gmail.com',
                pass: "pody kbsz ovik vakq"
            }
        });

        const mailOptions = {
            from: 'youreventinvites@gmail.com',
            to: "vlad.4est@gmail.com",
            subject: isAccept ? `Invitation to ${event.title}` : 'Invitation Declined',
            text: isAccept ?
                `Hi ${user.username},\n\nYou have been invited to the event "${event.title}".\n\n- Description: ${event.description || "No description provided"}\n- Location: ${event.location}\n- Time: ${event.time}\n\nBest regards,\nThe Events Team` :
                `Hi ${user.username},\n\nWe regret to inform you that your request to join the event "${event.title}" has been declined.`
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    reject(false);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true);
                }
            });
        });
    }
};

module.exports = mailService;