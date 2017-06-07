// Express
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// Configure Express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
    // res.send('Hello!');
    // res.sendFile('index.html');
    res.sendFile('public/index.html', {'root': __dirname});
});

app.post('/', function(req, res) {
    var nameTest = req.body.nameTest;
    var passwordTest = req.body.passwordTest;

    var nameTestChanged = nameTest + ' changed';
    var passwordTestChanged = passwordTest + ' changed';

    var dataServer = {
        nameTest: nameTestChanged,
        passwordTest: passwordTestChanged
    };

    res.send(dataServer);

    // SQLite
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('database/db');

    // SQLite - EX
    // db.serialize(function() {
    //     db.run("CREATE TABLE IF NOT EXISTS dataServer (name, password)");
    //     db.run("INSERT INTO dataServer (name, password) VALUES (?, ?)", (dataServer.nameTest), (dataServer.passwordTest));
    //
    //     db.each("SELECT name, password FROM dataServer", function(err, row) {
    //         console.log('column name: ' + row.name + ' column password: ' + row.password);
    //     });
    // });

    // SQLite - EX
    // db.serialize(function() {
    //     db.run("CREATE TABLE IF NOT EXISTS dataServer (column1 TEXT)");
    //
    //     db.run("INSERT INTO dataServer (column1) VALUES (?)", "value1");
    //     db.run("INSERT INTO dataServer (column1) VALUES (?)", "value2");
    //
    //     db.each("SELECT column1 FROM dataServer", function(err, row) {
    //         console.log(row.column1);
    //     });
    // });

    // SQLite - EX
    // db.serialize(function() {
    //     db.run("CREATE TABLE IF NOT EXISTS dataServer (column1, column2)");
    //
    //     db.run("INSERT INTO dataServer (column1, column2) VALUES ('value1', 'value2'), ('value11', 'value22')");
    //
    //     db.each("SELECT column1, column2 FROM dataServer", function(err, row) {
    //         console.log('col1: ' + row.column1 + ', col2: ' + row.column2 + '\n');
    //     });
    // });

    // SQLite - EX
    // db.serialize(function() {
    //     db.run("CREATE TABLE IF NOT EXISTS numbers (number TEXT)");
    //
    //     var stmt = db.prepare("INSERT INTO numbers VALUES (?)");
    //     for (var i = 0; i < 10; i++) {
    //         stmt.run("Number " + i);
    //     }
    //     stmt.finalize();
    //
    //     db.each("SELECT rowid AS id, number FROM numbers", function(err, row) {
    //         console.log(row.id + ": " + row.number);
    //     });
    // });

    db.close();
});

app.listen(3000, function() {
    console.log('The app is listening on port 3000!');
});
