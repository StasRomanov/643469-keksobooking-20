'use strict';

(function () {
  var PIN_DEFAULT_LEFT_POSITION = 570;
  var PIN_DEFAULT_TOP_POSITION = 375;
  var MAX_GUEST_NUMBER = 100;
  var MIN_GUEST_VALUE = 0;
  var priceInput = document.querySelector('#price');
  var guestNumberInput = document.querySelector('#capacity');
  var guestNumberInputValues = guestNumberInput.querySelectorAll('option');
  var formHeader = document.querySelector('.ad-form-header');
  var timeInInput = document.querySelector('#timein');
  var typeInput = document.querySelector('#type');
  var timeOutInput = document.querySelector('#timeout');
  var roomNumberInput = document.querySelector('#room_number');
  var featuresCheckbox = document.querySelectorAll('.feature__checkbox');
  var formFields = document.querySelectorAll('.ad-form__element');
  var resetButton = document.querySelector('.ad-form__reset');

  var enableNumberInput = function (childrenNumber) {
    guestNumberInput.children[childrenNumber].removeAttribute('disabled');
  };

  var syncTimeIn = function () {
    timeOutInput.value = timeInInput.value;
  };

  var syncTimeOut = function () {
    timeInInput.value = timeOutInput.value;
  };

  var createInputSettings = function () {
    var minValue = {
      'bungalo': '0',
      'flat': '1000',
      'house': '5000',
      'palace': '10000'
    }[typeInput.value];
    priceInput.setAttribute('min', minValue);
    priceInput.setAttribute('placeholder', minValue);
  };

  typeInput.addEventListener('change', function () {
    createInputSettings();
  });

  timeInInput.addEventListener('change', function () {
    syncTimeIn();
  });

  timeOutInput.addEventListener('change', function () {
    syncTimeOut();
  });

  roomNumberInput.addEventListener('change', function () {
    window.form.setLimitsOnRooms();
  }, false);

  var setDefaultValue = function () {
    priceInput.setAttribute('placeholder', '1000');
    window.utilData.mapPinMain.style.left = PIN_DEFAULT_LEFT_POSITION + 'px';
    window.utilData.mapPinMain.style.top = PIN_DEFAULT_TOP_POSITION + 'px';
    window.pin.createLocation();
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    if (evt.button === window.utilData.LEFT_MOUSE_CODE && window.utilData.activeStatus === true) {
      window.utilData.formBlock.reset();

      featuresCheckbox.forEach(function (item) {
        item.checked = false;
      });
      setDefaultValue();
      window.form.setLimitsOnRooms();
    }
  };

  resetButton.addEventListener('click', onResetButtonClick, false);

  window.utilData.formBlock.addEventListener('submit', window.backend.send, false);

  window.form = {
    setLimitsOnRooms: function () {
      guestNumberInputValues.forEach(function (item) {
        item.setAttribute('disabled', 'true');
      });
      guestNumberInput.value = guestNumberInput.value < MAX_GUEST_NUMBER ? roomNumberInput.value : String(MIN_GUEST_VALUE);
      guestNumberInputValues.forEach(function (item, index) {
        if (item.getAttribute('value') <= roomNumberInput.value) {
          enableNumberInput(index);
        }
        if (roomNumberInput.value === String(MAX_GUEST_NUMBER)) {
          guestNumberInputValues.forEach(function (children) {
            children.setAttribute('disabled', 'true');
            guestNumberInput.value = '0';
          });
        }
        if (index === guestNumberInput.length - 1) {
          item.setAttribute('disabled', 'true');
        }
      });
    },

    enable: function () {
      window.utilData.formsMain.forEach(function (item) {
        item.removeAttribute('disabled');
      });
      formHeader.removeAttribute('disabled');
      window.utilData.formBlock.classList.remove('ad-form--disabled');
      window.formFilter.enable();
    },

    disable: function () {
      window.utilData.formBlock.classList.add('ad-form--disabled');
      featuresCheckbox.forEach(function (item) {
        item.checked = false;
      });
      formHeader.setAttribute('disabled', 'true');
      formFields.forEach(function (item) {
        item.setAttribute('disabled', 'true');
      });
      window.utilData.formBlock.reset();
      setDefaultValue();
      window.form.setLimitsOnRooms();
      window.formFilter.disable();
    }
  };
})();
