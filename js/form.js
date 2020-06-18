'use strict';

(function () {
  var enableNumberInput = function (childrenNumber) {
    window.data.guestNumberInput.children[childrenNumber].removeAttribute('disabled');
  };

  window.establishLimitsOnRooms = function () {
    for (var i = 0; i < window.data.guestNumberInput.length; i++) {
      window.data.guestNumberInput.children[i].setAttribute('disabled', 'true');
    }
    if (window.data.guestNumberInput.value < 100) {
      window.data.guestNumberInput.value = window.data.roomNumberInput.value;
    } else {
      window.data.guestNumberInput.value = '0';
    }
    for (var j = 0; j < window.data.guestNumberInput.length; j++) {
      if (window.data.guestNumberInput.children[j].getAttribute('value') <= window.data.roomNumberInput.value) {
        enableNumberInput(j);
      }
      if (window.data.roomNumberInput.value === '100') {
        for (var l = 0; l < window.data.guestNumberInput.length; l++) {
          window.data.guestNumberInput.children[l].setAttribute('disabled', 'true');
          window.data.guestNumberInput.value = '0';
        }
      }
      if (j === window.data.guestNumberInput.length - 1) {
        window.data.guestNumberInput.children[j].setAttribute('disabled', 'true');
      }
    }
  };

  window.syncTimeIn = function () {
    window.data.timeOutInput.value = window.data.timeInInput.value;
  };

  window.syncTimeOut = function () {
    window.data.timeInInput.value = window.data.timeOutInput.value;
  };

  window.createInputSettings = function () {
    var minValue = {
      bungalo: '0',
      flat: '1000',
      house: '5000',
      palace: '10000'
    }[window.data.typeInput.value];
    window.data.priceInput.setAttribute('min', minValue);
    window.data.priceInput.setAttribute('placeholder', minValue);
  };

  window.data.typeInput.addEventListener('change', function () {
    window.createInputSettings();
  });

  window.data.timeInInput.addEventListener('change', function () {
    window.syncTimeIn();
  });

  window.data.timeOutInput.addEventListener('change', function () {
    window.syncTimeOut();
  });

  window.data.roomNumberInput.addEventListener('change', function () {
    window.establishLimitsOnRooms();
  });
})();
