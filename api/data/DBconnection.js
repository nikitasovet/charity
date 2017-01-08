var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://nikita:charityprojet@ds155718.mlab.com:55718/charity-projet';

var _connection = null;

var open = function() {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open");
    });
};

var get = function() {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};
