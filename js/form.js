'use strict';

(function () {
  var priceInput = document.querySelector('#price');
  var guestNumberInput = document.querySelector('#capacity');


  var timeInInput = document.querySelector('#timein');
  var typeInput = document.querySelector('#type');
  var timeOutInput = document.querySelector('#timeout');
  var roomNumberInput = document.querySelector('#room_number');

  var enableNumberInput = function (childrenNumber) {
    guestNumberInput.children[childrenNumber].removeAttribute('disabled');
  };

  window.establishLimitsOnRooms = function () {
    for (var i = 0; i < guestNumberInput.length; i++) {
      guestNumberInput.children[i].setAttribute('disabled', 'true');
    }
    if (guestNumberInput.value < 100) {
      guestNumberInput.value = roomNumberInput.value;
    } else {
      guestNumberInput.value = '0';
    }
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
  };

  var syncTimeIn = function () {
    timeOutInput.value = timeInInput.value;
  };

  var syncTimeOut = function () {
    timeInInput.value = timeOutInput.value;
  };

  var createInputSettings = function () {
    var minValue = {
      bungalo: '0',
      flat: '1000',
      house: '5000',
      palace: '10000'
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
    window.establishLimitsOnRooms();
  });
})();
