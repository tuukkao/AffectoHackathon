var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// =====config =====
const SERVER_PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/test';

// ===== Database connection =====
mongoose.connect(MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind('Connection error: '));

// ===== Models =====
var stopSchema = mongoose.Schema({
    time: Date,
    name: String,
    left: { type: Number, default: 0 }
});
var Stop = mongoose.model('Stop', stopSchema);

// ===== express config =====
var app = express()
app.use(bodyParser.json());
app.use(logger('dev'));

// ===== api routes =====
app.post('/register', function(req, res) {
    Stop.findOne({ time: new Date("2015-10-24T15:15:15") }, function(err, result) {
        if (err) {
            res.status(500).json({ error: err });
        }
        if (!result) {
            res.status(404).json({ error: "Stop not found." });
        }
        result.left += 1;
        result.save(function(err) {
            if (err) {
                res.status(500).json({ error: err });
            }
            res.json({ message: "Success." });
        });
    });
});

app.get('/stops', function(rec, res) {
    Stop.find({}).select('-_id')
    .exec(function(err, results) {
        if (err) {
            res.status(500).json({error: err });
        }
        res.json(results);
    });
});

app.listen(SERVER_PORT);
console.log("Listening...");
