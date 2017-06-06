// Express
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// configure Express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
    // res.send('Hello!');
    // res.sendFile('index.html');
    res.sendFile('public/index.html', {'root': __dirname});
});

app.post('/', function(req, res) {
    var name1 = req.body.name1;
    var password1 = req.body.password1;

    var name1changed = name1 + ' changed';
    var password1changed = password1 + ' changed';

    var dataServer = {
        name1: name1changed,
        password1: password1changed
    };

    res.send(dataServer);

    var dataServerEx = [];

    dataServer.name1;
    console.log(dataServerEx);

    // SQLite - example 1
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('database/db');

    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS exampleData (column1 TEXT)");

        db.run("INSERT INTO exampleData (column1) VALUES (?)", dataServerEx);

        db.each("SELECT column1 FROM exampleData", function(err, row) {
            dataServerEx.push(row.column1);
            console.log(dataServerEx);
        });
    });

    db.close();







});

app.listen(3000, function() {
    console.log('The app is listening on port 3000!');
});



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
