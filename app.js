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
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var addressDivId = req.body.addressDivId;

    res.render('new-address', { addressDivId: addressDivId, name: name, phone: phone, address: address });
});

app.listen(3000, function() {
    console.log('The app is listening on port 3000!');
});
