var mongodb = require("mongodb");
var journeys = require("./journeys").body;

var client = mongodb.MongoClient,
    dburl = process.env.MONGODB_URI || 'mongodb://localhost/test';

client.connect(dburl, function(err, db) {
    if (err) {
        throw err;
    }
    var stops = db.collection('stops');
    journeys.filter(function(journey) {
        return journey.headSign === 'Janka';
    })
    .forEach(function(j) {
        j.calls.forEach(function(call) {
            stops.insert({ time: call.arrivalTime, name: call.stopPoint.name }, function(err) {
                if (err) {
                    throw err;
                }
            });
        });
    });
    db.close();
});