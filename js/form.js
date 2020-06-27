'use strict';

(function () {
  var defaultPinPosition = '603 483';
  var pinDefaultLeftPosition = '570px';
  var pinDefaultTopPosition = '375px';
  var priceInput = document.querySelector('#price');
  var guestNumberInput = document.querySelector('#capacity');
  var formHeader = document.querySelector('.ad-form-header');
  var timeInInput = document.querySelector('#timein');
  var typeInput = document.querySelector('#type');
  var timeOutInput = document.querySelector('#timeout');
  var roomNumberInput = document.querySelector('#room_number');
  var featuresCheckbox = document.querySelectorAll('.feature__checkbox');
  var resetButton = document.querySelector('.ad-form__reset');
  var houseTypeFilter = document.querySelector('#housing-type');
  var housePriceFilter = document.querySelector('#housing-price');
  var houseRoomsFilter = document.querySelector('#housing-rooms');
  var filterBlock = document.querySelector('.map__filters');

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
    window.utilData.mapPinMain.style.left = pinDefaultLeftPosition;
    window.utilData.mapPinMain.style.top = pinDefaultTopPosition;
    window.utilData.addressInput.value = defaultPinPosition;
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

  houseTypeFilter.addEventListener('change', function () {
    createInputSettings();
  });

  window.utilData.formBlock.addEventListener('submit', window.onFormBlockSubmit, false);

  var onFilterBlockChange = function () {
    window.utilData.filterStatus = true;
    var coincidence = true;
    var filterHotels = [];
    for (var i = 0; i < window.utilData.hotels.length; i++) {
      coincidence = true;
      if (houseTypeFilter.value !== 'any') {
        coincidence = window.utilData.hotels[i].offer.type === houseTypeFilter.value;
      }
      if (housePriceFilter.value !== 'any') {
        if (housePriceFilter.value === 'low') {
          if (window.utilData.hotels[i].offer.price > 10000) {
            coincidence = false;
          }
        }
        if (housePriceFilter.value === 'middle') {
          if (window.utilData.hotels[i].offer.price <= 10000 || window.utilData.hotels[i].offer.price > 50000) {
            coincidence = false;
          }
        }
        if (housePriceFilter.value === 'high') {
          if (window.utilData.hotels[i].offer.price <= 50000) {
            coincidence = false;
          }
        }
      }
      if (houseRoomsFilter.value !== 'any') {
        if (String(houseRoomsFilter.value) !== String(window.utilData.hotels[i].offer.rooms)) {
          coincidence = false;
        }
      }
      if (coincidence) {
        filterHotels.push(window.utilData.hotels[i]);
      }
    }
    window.filterHotels = filterHotels;
    window.card.removePopup();
    window.pin.deleteMapPins();
    window.pin.renderMapPins(filterHotels, filterHotels.length);
  };

  filterBlock.addEventListener('change', onFilterBlockChange, false);

  window.form = {
    setLimitsOnRooms: function () {
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
    },

    formEnable: function () {
      for (var i = 0; i < window.utilData.formsMain.length; i++) {
        window.utilData.formsMain[i].removeAttribute('disabled');
      }
      formHeader.removeAttribute('disabled');
      window.utilData.formBlock.classList.remove('ad-form--disabled');
    },

    formDisable: function () {
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
    }
  };
})();
