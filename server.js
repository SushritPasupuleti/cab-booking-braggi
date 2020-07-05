require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
//var server = require('http').Server(app);
app.use(bodyParser.json());
const cors = require('cors');
const port = process.env.PORT
const routes = require('./routes');

app.use(cors());
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //frontend if any
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

app.use('/add-api', routes.addAPI);
app.use('/book-api', routes.bookAPI);

app.get('/', (req, res) => res.send({ "response": "Hello World!" }))

//// <<<<<------ IGNORE CODE BELOW --------->>>> ////

app.get('/get-cabs', (req, res) => res.send({ "response": "Available Cabs: \n - SUV \n - XL \n - Sedan \n - Micro \n - Nano" }))

app.post('/book', (req, res) => {
    console.log(req.body)
    response = "Booked a " + req.body.slots.CAB_TYPE + ", with " + req.body.slots.SEATCOUNT + " seat(s). Your cab will arrive " + req.body.slots.CAB_BOOK_TIME
    console.log("Response: " + response)
    res.send(
        {
            "responses": response,
            "cards": createTicket(req.body.slots.DEST_TO, req.body.slots.DEST_FROM, req.body.slots.CAB_TYPE),
        }
    )
})

app.post('/get-to', (req, res) => {
    console.log(req.body)
    response = "Booked a " + req.body.slots.CAB_TYPE + ", with " + req.body.slots.SEATCOUNT + " seat(s). Your cab will arrive " + req.body.slots.CAB_BOOK_TIME
    console.log("Response: " + response)
    res.send(
        {
            "responses": "Where would you like to go ? (Web)",
            "entities": [{
                "DEST_TO": ["Gotham", "Metropolis", "Shadow Realm", "Nether", "Tatooine", "Alderan"]
            }],
            "prompts": ["Gotham", "Metropolis", "Shadow Realm", "Nether", "Tatooine", "Alderan"]
        }
    )
})

app.post('/get-from', (req, res) => {
    console.log(req.body)
    response = "Booked a " + req.body.slots.CAB_TYPE + ", with " + req.body.slots.SEATCOUNT + " seat(s). Your cab will arrive " + req.body.slots.CAB_BOOK_TIME
    console.log("Response: " + response)
    res.send(
        {
            "responses": "Where would you like to go ? (Web)",
            "entities": [{
                "DEST_FROM": ["Place1", "Place2", "Place3", "Place4", "Place5"]
            }],
            "prompts": ["Place1", "Place2", "Place3", "Place4", "Place5"]
        }
    )
})

var server = app.listen(port, () => console.log(`Demo server listening on port ${port}!`))

var io = require('socket.io')(server);

let interval;

io.on('connection', function (socket) {
    console.log("New client connected")
    if (interval) {
        clearInterval(interval);
      }
    interval = setInterval(() => getApiAndEmit(socket), 10000);
    socket.on("hello", function(data){
      console.log(data, "Hello");
    })
    // socket.emit('news', { hello: 'world' });
    // socket.on('my other event', function (data) {
    //   console.log(data);
    // });
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

const getApiAndEmit = async socket => {
  try {
    // Getting the data from DarkSky
    socket.emit("FromAPI", "30"); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};  

const createTicket = (DEST_TO, DEST_FROM, CAB_TYPE) => {
  var d = new Date();
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var n = month[d.getMonth()];
  return {
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "Container",
                            "backgroundImage": "http://messagecardplayground.azurewebsites.net/assets/TxP_Background.png",
                            "items": [
                                {
                                    "type": "Image",
                                    "horizontalAlignment": "Center",
                                    "url": "https://images.pexels.com/photos/982106/pexels-photo-982106.jpeg?cs=srgb&dl=yellow-and-black-coupe-982106.jpg&fm=jpg"
                                }
                            ],
                            "bleed": true
                        },
                        {
                            "type": "Container",
                            "spacing": "None",
                            "style": "emphasis",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "ExtraLarge",
                                    "weight": "Lighter",
                                    "color": "Accent",
                                    "text": CAB_TYPE + " to " + DEST_TO,
                                    "wrap": true
                                },
                                {
                                    "type": "TextBlock",
                                    "spacing": "Small",
                                    "text": "Totally Not Fake Cabs",
                                    "wrap": true,
                                    "size": "Medium"
                                },
                                {
                                    "type": "TextBlock",
                                    "spacing": "None",
                                    "text": "Confirmation code: ABCDEF",
                                    "wrap": true
                                }
                            ],
                            "bleed": true,
                            "height": "stretch"
                        }
                    ],
                    "width": 45,
                    "height": "stretch"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "Container",
                            "height": "stretch",
                            "items": [
                                {
                                    "type": "ColumnSet",
                                    "columns": [
                                        {
                                            "type": "Column",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "size": "Large",
                                                    "text": DEST_FROM,
                                                    "weight": "Bolder"
                                                }
                                            ],
                                            "width": 1
                                        },
                                        {
                                            "type": "Column",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "horizontalAlignment": "Right",
                                                    "size": "Large",
                                                    "text": DEST_TO,
                                                    "weight": "Bolder"
                                                }
                                            ],
                                            "width": 1
                                        }
                                    ]
                                },
                                {
                                    "type": "ColumnSet",
                                    "spacing": "None",
                                    "columns": [
                                        {
                                            "type": "Column",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "text": "November 12, 2017",
                                                    "isSubtle": true,
                                                    "wrap": true
                                                }
                                            ],
                                            "width": 1
                                        },
                                        {
                                            "type": "Column",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "horizontalAlignment": "Right",
                                                    "text": "November 12, 2017",
                                                    "isSubtle": true,
                                                    "wrap": true
                                                }
                                            ],
                                            "width": 1
                                        }
                                    ]
                                },
                                {
                                    "type": "ColumnSet",
                                    "spacing": "None",
                                    "columns": [
                                        {
                                            "type": "Column",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "text": DEST_FROM,
                                                    "isSubtle": true
                                                }
                                            ],
                                            "width": 1
                                        },
                                        {
                                            "type": "Column",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "horizontalAlignment": "Right",
                                                    "text": DEST_TO,
                                                    "isSubtle": true
                                                }
                                            ],
                                            "width": 1
                                        }
                                    ],
                                    "height": "stretch"
                                },
                                {
                                    "type": "ActionSet",
                                    "separator": true,
                                    "actions": [
                                        {
                                            "type": "Action.Submit",
                                            "title": "Check in",
                                            "style": "positive"
                                        }
                                    ],
                                    "spacing": "Medium"
                                }
                            ]
                        }
                    ],
                    "width": 55
                }
            ],
            "height": "stretch"
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.0"
}
}