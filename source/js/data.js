'use strict';

(function () {
  var HOTEL_COUNTER = 5;
  var MAP_PIN_TRIANGLE_HEIGHT = 22;
  var LEFT_MOUSE_CODE = 0;
  var MAP_SAFE_BORDER_ZONE = 70;
  var ENTER_KEY_CODE = 'Enter';
  var ESC_KEY_CODE = 'Escape';
  var ROOMS_DECLENSION = ['комната', 'комнаты', 'комнат'];
  var GUESTS_DECLENSION = ['гостя', 'гостей', 'гостей'];
  var mapPin = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');
  var formsMain = document.querySelectorAll('.ad-form__element');
  var addressInput = document.querySelector('#address');
  var formBlock = document.querySelector('.ad-form');
  var fragment = document.createDocumentFragment();
  var hotels = [];
  var hotelsSequence = [];
  var activeStatus = false;
  var filterStatus = false;
  var loadStatus = false;

  window.data = {
    HOTEL_COUNTER: HOTEL_COUNTER,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    ESC_KEY_CODE: ESC_KEY_CODE,
    LEFT_MOUSE_CODE: LEFT_MOUSE_CODE,
    MAP_PIN_TRIANGLE_HEIGHT: MAP_PIN_TRIANGLE_HEIGHT,
    mapPin: mapPin,
    map: map,
    mapPinMain: mapPinMain,
    addressInput: addressInput,
    fragment: fragment,
    hotels: hotels,
    hotelsSequence: hotelsSequence,
    activeStatus: activeStatus,
    formsMain: formsMain,
    ROOMS_DECLENSION: ROOMS_DECLENSION,
    GUESTS_DECLENSION: GUESTS_DECLENSION,
    mapOverlay: mapOverlay,
    MAP_SAFE_BORDER_ZONE: MAP_SAFE_BORDER_ZONE,
    formBlock: formBlock,
    filterStatus: filterStatus,
    loadStatus: loadStatus
  };
})();
