// Show/hide HTML elements, disable/enable buttons
function toggles(toggleAddressForm, firstAddressTextToggle, buttonsDisable, fillFieldsTextToggle) {
      $('#addressForm').css('display', toggleAddressForm);
      $('#addFirstAddressText').css('display', firstAddressTextToggle);
      $('#button-add-address, .button-edit, .button-delete').prop('disabled', buttonsDisable);
      $('#fill-in-fields-text').css('display', fillFieldsTextToggle);
}

// Show or hide the "Add your first address" text
function firstAddressTextToggle() {
    var firstAddressTextToggle = $('#address-wrapper').children().length ? 'none' : 'block';
    toggles('none', firstAddressTextToggle , false, 'none');
}

// Clear text input fields
function clearFields() {
    $('.add-address-fields').val('');
}

// Display a form for adding addresses
var displayOnce;
function addAddress() {
    displayOnce = 0;
    toggles('block', 'none', true, 'none');
}

// Cancel adding an address
function addAddressCancel() {
    clearFields();
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
            toggles('block', 'none', true, 'block');
            displayOnce++;
        }
        e.preventDefault();
    } else {
        toggles('none', 'none', false, 'none');
        clearFields();
        sendDataToServer(addressData);
    }
}

// Delete an address
function deleteAddress(e) {
    $(e.target).parent().remove();
    firstAddressTextToggle();
}

// Edit an address
function editAddress(e) {
    console.log('edit');
    // templates
}

// Save an edited address
function editAddressSave() {
    // templates
}

// Cancel editing an address
function editAddressCancel() {
    // templates
}

// Send address data to the server
var addressDivId;
function sendDataToServer(addressData) {
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000',
        data: addressData,
        dataType: 'text',
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Ajax error: ' + textStatus + '\n' + errorThrown);
        },
        success: function(serverData) {
            console.log('Ajax success');
            $('#address-wrapper').prepend(serverData);

            addressDivId = '#address-div-' + addressDivCounter;
            $(addressDivId).children('.button-edit').on('click', editAddress); // function?
            $(addressDivId).children('.button-delete').on('click', deleteAddress);
            addressDivCounter++;
        }
    });
}

$(document).ready(function() {
    $('#button-add-address').on('click', addAddress);
    $('.button-edit').on('click', editAddress);
    $('.button-delete').on('click', deleteAddress);
    $('.button-save').on('click', saveAddress);
    $('.button-cancel').on('click', addAddressCancel);
});
