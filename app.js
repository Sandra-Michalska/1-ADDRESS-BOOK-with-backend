// Express
var express = require('express');
var app = express();

app.listen(3000, function() {
    console.log('The app is listening on port 3000!');
});

app.use(express.static('public'));

// app.get('/', function (req, res) {
//     res.send('Hello!');
// });


// SQLite - example 1
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/db');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS times (runtime REAL)");

    db.run("INSERT INTO times (runtime) VALUES (?)", new Date().getTime());

    db.each("SELECT runtime FROM times", function(err, row) {
        var runtime = row.runtime;
        console.log("This app was run at " + runtime);
    });
});

db.close();

// SQLite - example 2
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
//
// db.serialize(function() {
//     db.run("CREATE TABLE numbers (info TEXT)");
//
//     var stmt = db.prepare("INSERT INTO numbers VALUES (?)");
//     for (var i = 0; i < 10; i++) {
//         stmt.run("Number " + i);
//     }
//     stmt.finalize();
//
//     db.each("SELECT rowid AS id, info FROM numbers", function(err, row) {
//         console.log(row.id + ": " + row.info);
//     });
// });
//
// db.close();
