var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('database/db');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.sendFile('public/index.html', {'root': __dirname});
});

app.post('/', function(req, res) {
    var addressData = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        addressDivId: req.body.addressDivId
    }
    res.render('new-address', { addressData });


    // sqlite
    db.serialize(function() {
        // create table
        db.run("CREATE TABLE IF NOT EXISTS addressData (name, phone, address, addressDivId)"); // text?

        // create statement and add values
        var stmt = db.prepare("INSERT INTO addressData VALUES (?, ?, ?, ?)");
        stmt.run(addressData.name, addressData.phone, addressData.address, addressData.addressDivId);
        stmt.finalize();

        // retrieve values
        db.each("SELECT name, phone, address, addressDivId FROM addressData", function(err, row) {
            console.log(row);
        });
    });
});

app.listen(3000, function() {
    console.log('The app is listening on port 3000!');
});
