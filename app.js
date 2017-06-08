// Express
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SQLite
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/db');

// Functions



// Gets & posts
app.get('/', function (req, res) {
    res.sendFile('public/index.html', {'root': __dirname});
});

app.post('/', function(req, res) {
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;

    // todo
    var addressDataDiv =
        '<div class="address-no" id="counter">' +
            '<img src="img/photo-name.png" alt="photo-alt">' +

            '<p>' + name + '</p>' +
            '<p>' + phone + '</p>' +
            '<p>' + address + '</p>' +
            '<p>Groups</p>' +

            '<input type="image" src="img/edit.jpg" alt="edit" class="button-edit">' +
            '<input type="image" src="img/delete.jpg" alt="delete" class="button-delete">' +
        '</div>';

    res.send(addressDataDiv);
});

// Run the server
app.listen(3000, function() {
    console.log('The app is listening on port 3000!');
});
