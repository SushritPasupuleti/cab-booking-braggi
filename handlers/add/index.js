const db = require('../../models');

exports.addUser = async (req, res, next) => {
    console.log(req.body)
    try {
        new db.User({
            "displayName": req.body.displayName,
            "email": req.body.email,
        }).save().then((newUser) => {
            console.log("Added new User");
            res.send('Added new User ' + newUser.displayName)
        })
    }

    catch (err) {
        console.log("Error")
        return res.status(400).json(err);
    }
}

exports.addCab = async (req, res, next) => {
    try {
        console.log(req.body)
        new db.User({
            "displayName": req.body.displayName,
            "email": req.body.email,
            "cab.cabLocation": req.body.location,
            "cab.cabModelName": req.body.model,
            "cab.cabColor": req.body.color,
            "cab.cabNo": req.body.cabNo,
        }).save().then((newUser) => {
            console.log("Added new User");
            res.send('Added new User ' + newUser.displayName)
        })
    }

    catch (err) {
        console.log("Error")
        return res.status(400).json(err);
    }
}