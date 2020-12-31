const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const register = async (req, res) => {
    try {
        const { name, surname, phone_number, email, address, status } = req.body;
        const targetUser = await db.User.findOne({ where: { name } });

        if (targetUser) {
            res.status(400).send({ message: "มี ชื่อนี้อยู่แล้ว" })
            console.log('err')
        } else {
            const newUser = await db.User.create({
                name,
                surname,
                phone_number,
                email,
                address
            });

            // setup mail transporter service
            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                // host: 'smtp.gmail.com',
                // port: 587,
                // secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_USER, // your email
                    pass: process.env.EMAIL_PASS              // your password
                },
            });

            const output = `
            <div style="background-color:black;">
                <img style="text-align: center; width:187px; height:115px;" src="https://s3-alpha-sig.figma.com/img/4851/1e74/2ada4a95a5db2c6b1a02e90b9e368579?Expires=1610323200&Signature=KFO8MqQppGUyIAa7JP7Frt11itw8~~7O1RJ~UGmLH-PHTgou-hQRj9ZPDNcz-265yqv94QGyscaA4i8O5ls3GPCf5TWfjPdZ3t8lByFZTnW12p8y476p1KoJiSLkGxAldIYaRr90AEqc31Gl67ommr5vuXNkXJiHeubqo2hcTsOTgWq8jYY9-cdRgBIVjeGRVgz4yWuBm9nbOkeSpanRxZ70TZcwFSFCms-1CHDIUva6OPnpq2APArQwT7PYq1nopwqE-XFyQOGR4EcM3Cjxl16jjjdyXGl77TR2mH5tFkhmv4P3hnYnoas6j2ZPxPFyHUEt2kAR5DWhQqhMoclPXQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="logo" />
                <div style="color:white; text-align:center"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                </div>
                <br/>
                <img style="display: flex; justify-content: center; width:185.12px; height:185.12px;" src="https://chart.googleapis.com/chart?cht=qr&chs=100x100&chl=http://http://doosoft.tech/" alt="">
                <br/>
                <div style="display: flex; justify-content: center;color:white;">You received this email to let you know about important changes to your account.</div>
            </div>
            `

            // setup email data with unicode symbols
            const mailOptions = {
                from: 'Doosoft <splewma2008@hotmail.com>',              // sender
                // to: 'ptatsanai@gmail.com,nee_plewma@hotmail.com, pimonpan.psp@gmail.com',              // list of receivers
                to: `${newUser.email}`,              // list of receivers
                subject: 'You Sign up to Doo soft',            // Mail subject
                html: `${output}`, // HTML body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });

            res.status(201).send({ message: "User has been created" });
        };

    } catch (err) {
        console.log(err);
        console.log("OK")
        res.status(500).send({ message: err.message })
    };
};

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await db.User.findAll();

        res.status(200).send(allUsers)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    };
}

module.exports = {
    register,
    getAllUsers
};