
// Sets up the Express App
// =============================================================
var express = require('express');
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservations array
// =============================================================
var reservations = [
    {
        name: "Alex Kelly",
        email: "itsalexkelly@gmail.com",
        phone: "716-867-5309",
        id: "AK"
    },
    {
        name: "Leroy Jenkins",
        email: "lj@wow.com",
        phone: "123-456-7890",
        id: "leroy"

    },
];

var resArr = reservations.filter(res => reservations.indexOf(res) < 5)
var waitList = reservations.filter(res => reservations.indexOf(res) >= 5)

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });
  
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  
  // Displays all reservations
  app.get("/reservation", function(req, res) {
    return res.json(reservations);
  });


  // Create New Reservation - takes in JSON input
  app.post("/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newReservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newReservation);
  
    reservations.push(newReservation);
  
    res.json(newReservation);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  