'use strict';

(function () {
  var PIN_DEFAULT_LEFT_POSITION = 570;
  var PIN_DEFAULT_TOP_POSITION = 375;
  var priceInput = document.querySelector('#price');
  var guestNumberInput = document.querySelector('#capacity');
  var formHeader = document.querySelector('.ad-form-header');
  var timeInInput = document.querySelector('#timein');
  var typeInput = document.querySelector('#type');
  var timeOutInput = document.querySelector('#timeout');
  var roomNumberInput = document.querySelector('#room_number');
  var featuresCheckbox = document.querySelectorAll('.feature__checkbox');
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

      for (var j = 0; j < featuresCheckbox.length; j++) {
        featuresCheckbox[j].checked = false;
      }
      setDefaultValue();
      window.form.setLimitsOnRooms();
    }
  };

  resetButton.addEventListener('click', onResetButtonClick, false);

  window.utilData.formBlock.addEventListener('submit', window.backend.send, false);

  window.form = {
    setLimitsOnRooms: function () {
      for (var i = 0; i < guestNumberInput.length; i++) {
        guestNumberInput.children[i].setAttribute('disabled', 'true');
      }
      guestNumberInput.value = guestNumberInput.value < 100 ? roomNumberInput.value : '0';
      for (var j = 0; j < guestNumberInput.length; j++) {
        if (guestNumberInput.children[j].getAttribute('value') <= roomNumberInput.value) {
          enableNumberInput(j);
        }
        if (roomNumberInput.value === '100') {
          for (var l = 0; l < guestNumberInput.length; l++) {
            guestNumberInput.children[l].setAttribute('disabled', 'true');
            guestNumberInput.value = '0';
          }
        }
        if (j === guestNumberInput.length - 1) {
          guestNumberInput.children[j].setAttribute('disabled', 'true');
        }
      }
    },

    enable: function () {
      for (var i = 0; i < window.utilData.formsMain.length; i++) {
        window.utilData.formsMain[i].removeAttribute('disabled');
      }
      formHeader.removeAttribute('disabled');
      window.utilData.formBlock.classList.remove('ad-form--disabled');
      window.formFilter.enable();
    },

    disable: function () {
      window.utilData.formBlock.classList.add('ad-form--disabled');
      for (var j = 0; j < featuresCheckbox.length; j++) {
        featuresCheckbox[j].checked = false;
      }
      formHeader.setAttribute('disabled', 'true');
      for (var i = 0; i < window.utilData.formsMain.length; i++) {
        window.utilData.formsMain[i].setAttribute('disabled', 'true');
      }
      window.utilData.formBlock.reset();
      setDefaultValue();
      window.form.setLimitsOnRooms();
      window.formFilter.disable();
    }
  };
})();
