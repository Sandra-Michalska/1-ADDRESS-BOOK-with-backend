// Show/hide HTML elements, disable/enable buttons (for adding addresses)
function togglesAdd(addressForm, buttons, text) {
    $('#address-form-add').css('display', addressForm);
    $('#fill-in-fields-text').css('display', text);
    $('#button-add-address, .button-edit, .button-delete').prop('disabled', buttons);
}

// Show/hide HTML elements, disable/enable buttons (for editing addresses)
function togglesEdit(editedAddress, editedAddressToggle, addressForm, buttons) {
    editedAddress.css('display', editedAddressToggle);
    $('#address-form-edit').css('display', addressForm);
    $('#button-add-address, .button-edit, .button-delete').prop('disabled', buttons);
}

// Show or hide the "Add your first address" text
function firstAddressTextToggle() {
    var textToggle = $('#address-form-add').css('display') == 'block' || $('#address-wrapper').find('.address-div').length ? 'none' : 'block';
    $('#addFirstAddressText').css('display', textToggle);
}

// Clear text input fields
function clearFields() {
    $('.add-address-fields').val('');
}

// Display a form for adding addresses
var displayOnce;
function addAddress() {
    displayOnce = 0;
    togglesAdd('block', true, 'none');
    firstAddressTextToggle();
}

// Cancel adding an address
function addAddressCancel() {
    clearFields();
    togglesAdd('none', false, 'none');
    firstAddressTextToggle();
}

// Save an address
var addressDivCounter = 0;
function saveAddress(e) {
    var addressData = {
        name: $('#add-address-name').val(),
        phone: $('#add-address-phone').val(),
        address: $('#add-address-address').val(),
        addressDivId: 'address-div-' + addressDivCounter
    }

    if(!addressData.name || !addressData.phone || !addressData.address) {
        if(displayOnce <= 0) {
            togglesAdd('block', true, 'block');
            displayOnce++;
        }
        e.preventDefault();
    } else {
        togglesAdd('none', false, 'none');
        clearFields();
        sendDataToServer(addressData);
    }
}

// Edit an address
var editedAddress;
function editAddress(event) {
    editedAddress = $(event.target).parent();

    var name = $(editedAddress).children('.address-div-name').text();
    var phone = $(editedAddress).children('.address-div-phone').text();
    var address = $(editedAddress).children('.address-div-address').text();

    $('#add-address-name-edit').val(name);
    $('#add-address-phone-edit').val(phone);
    $('#add-address-address-edit').val(address);

    $(editedAddress).before($('#address-form-edit'));
    togglesEdit(editedAddress, 'none', 'block', true);
}

// Save an edited address
function editAddressSave(editedAddress) {
    var nameChanged = $('#add-address-name-edit').val();
    var phoneChanged = $('#add-address-phone-edit').val();
    var addressChanged = $('#add-address-address-edit').val();

    $(editedAddress).children('p.address-div-name').text(nameChanged);
    $(editedAddress).children('p.address-div-phone').text(phoneChanged);
    $(editedAddress).children('p.address-div-address').text(addressChanged);

    togglesEdit(editedAddress, 'block', 'none', false);
}

// Cancel editing an address
function editAddressCancel(editedAddress) {
    togglesEdit(editedAddress, 'block', 'none', false);
}

// Delete an address
function deleteAddress(e) {
    $(e.target).parent().remove();
    firstAddressTextToggle();
}

// Send address data to the server
var addressDivId;
function sendDataToServer(addressData) {
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000',
        data: addressData,
        dataType: 'html',
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Ajax error: ' + textStatus + '\n' + errorThrown);
        },
        success: function(serverData) {
            console.log('Ajax success');
            $('#address-wrapper').prepend(serverData);

            addressDivId = '#address-div-' + addressDivCounter;
            $(addressDivId).children('.button-edit').on('click', editAddress);
            $(addressDivId).children('.button-delete').on('click', deleteAddress);
            addressDivCounter++;
        }
    });
}

$(document).ready(function() {
    $('#button-add-address').on('click', addAddress);
    $('.button-save').on('click', saveAddress);
    $('.button-cancel').on('click', addAddressCancel);
    $('.button-edit').on('click', editAddress);
    $('.button-edit-save').on('click', function() { editAddressSave(editedAddress); });
    $('.button-edit-cancel').on('click', function() { editAddressCancel(editedAddress); });
    $('.button-delete').on('click', deleteAddress);
});
