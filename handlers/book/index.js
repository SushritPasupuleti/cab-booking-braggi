const db = require('../../models');

exports.book = async (req, res, next) => {
    console.log(req.body)

    try {
        const user = await db.User.updateOne({
            "cab.cabNo": req.body.slot.cabNo,
        },
            {
                "cab.cabSlot": {
                    "cabTo": req.body.slot.DEST_TO,
                    "cabFrom": req.body.slot.DEST_FROM,
                    "cabBookie": req.body.slot.EMAIL,
                    "cabTime": req.body.slot.CAB_BOOK_TIME,
                    "tripDone": false
                }
            })

        const cab = await db.Cab.updateOne({
            "cab.cabNo": req.body.slot.cabNo,
        },
            {
                "cab.cabSlot": {
                    "cabTo": req.body.slot.DEST_TO,
                    "cabFrom": req.body.slot.DEST_FROM,
                    "cabBookie": req.body.slot.EMAIL,
                    "cabTime": req.body.slot.CAB_BOOK_TIME,
                    "tripDone": false
                }
            })

        response = "Booked a " + req.body.slots.CAB_TYPE + " . Your cab will arrive " + req.body.slots.CAB_BOOK_TIME

        return res.send({
            "responses": response,
            //generate Ticket
        });
    }

    catch (err) {
        console.log("Error")
        return res.status(400).json(err);
    }

}



exports.tripDone = async (req, res, next) => {

    try {
        console.log(req.body)

        const user = await db.User.updateOne({
            "cab.cabNo": req.body.slot.cabNo,
        },
            {
                "cab.cabSlot": {
                    "cabTo": req.body.slot.DEST_TO,
                    "cabFrom": req.body.slot.DEST_FROM,
                    "cabBookie": req.body.slot.EMAIL,
                    "cabTime": req.body.slot.CAB_BOOK_TIME,
                    "tripDone": true
                }
            })

        const cab = await db.Cab.updateOne({
            "cab.cabNo": req.body.slot.cabNo,
        },
            {
                "cab.cabSlot": {
                    "cabTo": "",
                    "cabFrom": "",
                    "cabBookie": "",
                    "cabTime": "",
                    "tripDone": true
                }
            })
    }

    catch (err) {
        console.log("Error")
        return res.status(400).json(err);
    }
}

exports.getCabs = async (req, res, next) => {
    try {
        console.log(req.body)

        const list = await db.User.find({
            "cab.cabSlot.tripDone": false
        })

        return res.send({
            //generate Card with List,
            "prompts": list,
            "entities": [{
                "CAB_TYPE": list
            }]
        });
    }

    catch (err) {
        console.log("Error")
        return res.status(400).json(err);
    }
}

exports.getTo = async (req, res, next) => {
    const list = ["Gotham", "Metropolis", "Shadow Realm", "Nether", "Tatooine", "Alderan"]///Would normally use some API Ex: Maps
    console.log(req.body)
    response = "Booked a " + req.body.slots.CAB_TYPE + ", with " + req.body.slots.SEATCOUNT + " seat(s). Your cab will arrive " + req.body.slots.CAB_BOOK_TIME
    console.log("Response: " + response)
    res.send(
        {
            "responses": "Where would you like to go ? (Web)",
            "entities": [{
                "DEST_TO": list
            }],
            "prompts": list
        }
    )
}

exports.getFrom = async (req, res, next) => {
    const list = ["Place1", "Place2", "Place3", "Place4", "Place5"]///Would normally use some API Ex: Maps
    console.log(req.body)
    response = "Booked a " + req.body.slots.CAB_TYPE + ", with " + req.body.slots.SEATCOUNT + " seat(s). Your cab will arrive " + req.body.slots.CAB_BOOK_TIME
    console.log("Response: " + response)
    res.send(
        {
            "responses": "Where would you like to go ? (Web)",
            "entities": [{
                "DEST_FROM": list
            }],
            "prompts": list
        }
    )
}