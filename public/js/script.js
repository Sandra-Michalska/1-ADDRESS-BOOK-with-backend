var displayOnce = 0;

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
function saveAddress(e) {
    var addressData = {
        name: $('#add-address-name').val(),
        phone: $('#add-address-phone').val(),
        address: $('#add-address-address').val()
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
    console.log('delete');
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
function sendDataToServer(addressData) {
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000',
        data: addressData,
        dataType: 'json',
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + '\n' + errorThrown);
        },
        success: function(serverData) {
            $('#address-wrapper').prepend(serverData.addressDataDiv);
            var addressDivPlusCounter = '#address-div-' + serverData.addressDivCounter;
            $(addressDivPlusCounter).children('.button-edit').on('click', editAddress); // templates!!!
            $(addressDivPlusCounter).children('.button-delete').on('click', deleteAddress); // templates!!!
        }
    });
}

$(document).ready(function() {
    $('#button-add-address').on('click', addAddress);
    $('.button-delete').on('click', deleteAddress);
    $('.button-edit').on('click', editAddress);
    $('.button-save').on('click', saveAddress); // another button-save and button-cancel in edit? templates!
    $('.button-cancel').on('click', addAddressCancel);
});
