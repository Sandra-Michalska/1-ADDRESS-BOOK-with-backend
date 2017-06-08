// Show/hide HTML elements, disable/enable buttons
function toggles(toggleAddressForm, firstAddressTextToggle, buttonsDisable, fillFieldsTextToggle) {
      $('#addAddressForm').css('display', toggleAddressForm);
      $('#addFirstAddressText').css('display', firstAddressTextToggle);
      $('#button-add-address, .button-edit, .button-delete').prop('disabled', buttonsDisable);
      $('#fill-in-fields-text').css('display', fillFieldsTextToggle);
}

// Clear text input fields
function clearFields() {
    $('#add-address-name, #add-address-phone, #add-address-address').val('');
}

// Display a form for adding addresses
function addAddress() {
    toggles('block', 'none', true, 'none');
}

// Cancel adding an address
function addAddressCancel() {
    function firstAddressTextToggle() {
        if($('#address-wrapper').children().length) { // todo
            return 'none';
        } else {
            return 'block';
        }
    }

    toggles('none', firstAddressTextToggle() , false, 'none');
    clearFields();
    displayOnce = 0;
}

// Save an address
var displayOnce = 0;
function saveAddress(e) {
    displayOnce = 0;
    var name = $('#add-address-name').val();
    var phone = $('#add-address-phone').val();
    var address = $('#add-address-address').val();

    if(name == '' || phone == '' || address == '') { // todo
        if(displayOnce <= 0) {
            toggles('block', 'none', true, 'block');
            displayOnce++;
        }
        e.preventDefault();
    } else {
        toggles('none', 'none', false, 'none');
        $('#add-address-name, #add-address-phone, #add-address-address').val('');

        var addressData = {
            name: name,
            phone: phone,
            address: address
        }

        serverCommunication(addressData);
    }
}

// Delete an address
function deleteAddress() {

}

// Edit an address
function editAddress() {

}

// Save an edited address
function editAddressSave() {

}

// Cancel editing an address
function editAddressCancel() {

}

// Send address data to the server
function serverCommunication(addressData) {
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000',
        data: addressData,
        dataType: 'text', // todo
        error: function() {
            console.log('error');
        },
        success: function(addressDataDiv) {
            console.log(addressDataDiv);
            $('#address-wrapper').prepend(addressDataDiv);
        }
    });
}

$(document).ready(function() {
    $('#button-add-address').on('click', addAddress);
    $('.button-delete').on('click', deleteAddress);
    $('.button-edit').on('click', editAddress);
    $('#addAddressForm').children('.button-save').on('click', saveAddress);
    $('#addAddressForm').children('.button-cancel').on('click', addAddressCancel);
});
