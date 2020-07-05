const db = require('../../models');

exports.generateOTP = async (req, res, next) => {
    console.log(req.body)

    let otp = Math.floor(100000 + Math.random() * 900000); //User a reliable 3rd party service
    let expiry = new Date(); expiry.setMinutes(expiry.getMinutes() + 2);
    console.log("Generated OTP: ", otp, " valid till: ", expiry)

    try {
        const user = await db.User.findOneAndUpdate({
            "email": req.body.slot.EMAIL,
        },
            {
                "otp.value": otp,
                "otp.expiry": expiry
            })


        console.log(
            "Expires By",
            user.otp.expiry
        )

        return res.send({
            otp: otp,
            expiry: expiry
            //generate Ticket
        });
    }

    catch (err) {
        console.log("Error", err)
        return res.status(400).json(err);
    }

}

exports.verifyOTP = async (req, res, next) => {
    console.log(req.body)

    try {
        const user = await db.User.findOne({
            "email": req.body.slot.EMAIL,

        })

        expiry = new Date(user.otp.expiry).getTime()
        now = new Date().getTime()

        console.log(now, expiry, " Difference: ", expiry - now, 120000)

        if (expiry - now > 0) {
            console.log("OTP Has not yet expired")

            if (user.otp.value === req.body.slot.OTP) {
                console.log("OTP Matched")
                return res.send({
                    success: true
                });
            }

            else {
                console.log("OTP Mismatch")
                return res.send({
                    success: false
                });
            }
        }

        else {
            console.log("OTP has expired")
        }

        return res.send({
            //generate Ticket
        });
    }

    catch (err) {
        console.log("Error", err)
        return res.status(400).json(err);
    }

}