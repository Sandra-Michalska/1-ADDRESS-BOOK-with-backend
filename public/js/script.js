// Get current local storage values (if they are set)
if (localStorage.getItem('counter') === null) {
    var counter = 0;
} else {
    var counter = localStorage.getItem('counter');
}

if (localStorage.getItem('storedData') === null) {
    var storedData = {};
} else {
    var storedData = JSON.parse(localStorage.getItem('storedData'));
}

// Templates for adding addresses
var addAddressForm =
    '<div class="address-no" id="addAddressForm">' +
        '<img src="" alt="">' +
        '<p class="input-field">First and last name <input type="text" placeholder="First and last name" id="textinput-name"></p>' +
        '<p class="input-field">Phone <input type="text" placeholder="Phone" id="textinput-phone"></p>' +
        '<p class="input-field">Address <input type="text" placeholder="Address" id="textinput-address"></p>' +

        '<p>Group(s)</p>' +
        '<p class="checkbox"><input type="checkbox" name="group-checkbox" value="All groups" id="checkbox-all"> All addresses</p>' +
        '<p class="checkbox"><input type="checkbox" name="group-checkbox" value="Group 1" id="checkbox-group1"> Group 1</p>' +
        '<p class="checkbox"><input type="checkbox" name="group-checkbox" value="Group 2" id="checkbox-group2"> Group 2</p>' +
        '<p class="checkbox"><input type="checkbox" name="group-checkbox" value="Group 3" id="checkbox-group3"> Group 3</p>' +

        '<input type="image" src="img/save.png" alt="save" class="button-save">' +
        '<input type="image" src="img/cancel.jpg" alt="cancel" class="button-cancel">' +
    '</div>';

var addressDiv =
    '<div class="address-no" id="counter">' +
        '<img src="img/photo-name.png" alt="photo-alt">' +

        '<p>Name</p>' +
        '<p>Phone</p>' +
        '<p>Address</p>' +
        '<p>Groups</p>' +

        '<input type="image" src="img/edit.jpg" alt="edit" class="button-edit">' +
        '<input type="image" src="img/delete.jpg" alt="delete" class="button-delete">' +
    '</div>';

// Display addresses from local storage
function displayFromLocalStorage() {
    var storedData = JSON.parse(localStorage.getItem('storedData'));
    $.each(storedData, function(index, item) {
        var addressDivCounter = addressDiv.replace('counter', index);
        var addressDivUpdated = addressDivCounter.replace(/Name|Phone|Address/g, function(matched) {
            return item[matched];
        });
        $('#address-wrapper').prepend(addressDivUpdated);
    });
}

// Add the "Add your first address" text
function addFirstAddress() {
    var wrapperChildrenLength = $('#address-wrapper').children().length;
    var addAddressFormLength = $('#addAddressForm').length;

    if (wrapperChildrenLength == 0) {
        $('#address-wrapper').html('<p id="addFirstAddress">Add your first address...</p>');
    }

    if (addAddressFormLength > 0) {
        $('#addFirstAddress').remove();
    }
}

// Display a form for entering addresses
function addAddress() {
    $('#address-wrapper').prepend(addAddressForm);
    $('#button-add-address').prop('disabled', true);
    addFirstAddress();

    $('.button-save').on('click', function(e) {
        saveAddress(e);
    });

    $('.button-cancel').on('click', function() {
        cancel();
    });
}

// Hide the form for entering addresses
function cancel() {
    $('#addAddressForm').remove();
    $('#button-add-address').prop('disabled', false);
    displayOnce = 0;
    addFirstAddress();
}

// Get data entered; display the data; save the data in local storage
var displayOnce = 0;
function saveAddress(e) {
    var name = document.getElementById('textinput-name').value;
    var phone = document.getElementById('textinput-phone').value;
    var address = document.getElementById('textinput-address').value;

    if(name == '' || phone == '' || address == '') {
        if(displayOnce <= 0) {
            $('#addAddressForm').prepend('<p id="fill-in-fields">Please fill in all of the fields!</p>');
            displayOnce++;
        }
        e.preventDefault();
    } else {
        var items = {};
        items.Name = name;
        items.Phone = phone;
        items.Address = address;
        storedData[counter] = items;

        var addressDivCounter = addressDiv.replace('counter', counter);
        var addressDivUpdated = addressDivCounter.replace(/Name|Phone|Address/g, function(matched) {
            return items[matched];
        });
        $('#address-wrapper').prepend(addressDivUpdated);
        counter++;

        localStorage.setItem('counter', counter);
        localStorage.setItem('storedData', JSON.stringify(storedData));

        $('#addAddressForm').remove();
        $('#button-add-address').prop('disabled', false);
        displayOnce = 0;
    }

    $('.button-cancel').on('click', function() {
        cancel();
    });

    $('.button-delete').on('click', function(e) {
        deleteAddress(e);
    });

    $('.button-edit').on('click', function() {
        editAddress();
    });
}

// Delete an address
function deleteAddress(e) {
    var clickedButtonDiv = $(e.target).parent();
    clickedButtonDiv.remove();
    addFirstAddress();

    var storedData = JSON.parse(localStorage.getItem('storedData'));
    var clickedButtonDivId = clickedButtonDiv.attr('id');
    delete storedData[clickedButtonDivId];

    localStorage.setItem('storedData', JSON.stringify(storedData));
}

// Edit an address
function editAddress() {
    // TBC
    console.log('Edit an address');
}

$(document).ready(function() {
    displayFromLocalStorage();
    addFirstAddress();

    $('#button-add-address').on('click', function() {
        addAddress();
    });

    $('.button-delete').on('click', function(e) {
        deleteAddress(e);
    });

    $('.button-edit').on('click', function() {
        editAddress();
    });
});
