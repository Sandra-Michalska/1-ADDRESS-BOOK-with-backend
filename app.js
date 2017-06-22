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

app.post('/getdata', function(req, res) {
    var templateUpdated = '';
    db.each("SELECT rowid, * FROM addressData ORDER BY rowid DESC", function(err, row) {
        var addressData = row;
        var fn = pug.compileFile('./views/new-addresses.pug');
        templateUpdated = templateUpdated + fn({ addressData });
    }, function() {
        res.send( templateUpdated );
    });
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
            var fn = pug.compileFile('./views/new-address.pug');
            var templateUpdated = fn({ addressData });
            res.send( {templateUpdated: templateUpdated, rowid: addressData.rowid} );
        });
    });
});

app.post('/deleteaddress', function(req, res) {
    var idToDelete = req.body.idToDelete;
    db.run("DELETE FROM addressData WHERE rowid=?", idToDelete);
    res.send('The address was deleted from the db.');
});

app.post('/updateaddress', function(req, res) {
    var dataToUpdate = req.body;
    db.run("UPDATE addressData SET name=?, phone=?, address=? WHERE rowid=?", dataToUpdate.nameUpdated, dataToUpdate.phoneUpdated, dataToUpdate.addressUpdated, dataToUpdate.idToUpdate);
    res.send('The address was updated in the db.');
});

app.listen(3000, function() {
    console.log('The app is listening on port 3000!');
    db.run("CREATE TABLE IF NOT EXISTS addressData (rowid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, address TEXT)"); // text?
});
