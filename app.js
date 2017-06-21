var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var pug = require('pug');

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

app.post('/newaddress', function(req, res) {
    var addressData = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address
    }

    db.serialize(function() {
        db.run("INSERT INTO addressData (name, phone, address) VALUES (?, ?, ?)", (addressData.name), (addressData.phone), (addressData.address));
        db.each("SELECT rowid, * FROM addressData WHERE rowid=(SELECT MAX(rowid) FROM addressData)", function(err, row) {
            addressData.rowid = row.rowid;
            res.render('new-address', { addressData });
        });
    });
});

app.post('/newaddressid', function(req, res) {
    db.each("SELECT rowid, * FROM addressData WHERE rowid=(SELECT MAX(rowid) FROM addressData)", function(err, row) {
        res.json({ rowid: row.rowid });
    });
});

app.post('/getdata', function(req, res) {
    var addressDataRetrieved = [];
    var html = '';
    var counter = 0;

        db.each("SELECT rowid, * FROM addressData ORDER BY rowid DESC", function(err, row) {
            counter++;
            console.log(counter);
            addressDataRetrieved.address = row;
            var address = addressDataRetrieved.address;

            var fn = pug.compileFile('./views/new-addresses.pug', {});
            html = html + fn({ address });

        }, function() {
            console.log('counter: ', counter);
            res.send( html );
        });

});

app.listen(3000, function() {
    console.log('The app is listening on port 3000!');
    db.run("CREATE TABLE IF NOT EXISTS addressData (rowid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, address TEXT)"); // text?
});
