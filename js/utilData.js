'use strict';

(function () {
  var HOTEL_COUNTER = 8;
  var MAP_PIN_TRIANGLE_HEIGHT = 22;
  var MAP_SAFE_BORDER_ZONE = 10;
  var LEFT_MOUSE_CODE = 0;
  var ENTER_KEY_CODE = 'Enter';
  var ESC_KEY_CODE = 'Escape';
  var SKY_BLOCK = document.querySelector('.map__title');
  var SKY_HEIGHT = parseInt(getComputedStyle(SKY_BLOCK).marginTop.replace(/\D+/g, ''), 10);
  var mapPin = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var formsMain = document.querySelectorAll('.ad-form__element');
  var addressInput = document.querySelector('#address');
  var fragment = document.createDocumentFragment();
  var hotels = [];
  var hotelsSequence = [];
  var activeStatus = false;

  window.utilData = {
    HOTEL_COUNTER: HOTEL_COUNTER,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    ESC_KEY_CODE: ESC_KEY_CODE,
    LEFT_MOUSE_CODE: LEFT_MOUSE_CODE,
    SKY_HEIGHT: SKY_HEIGHT,
    MAP_PIN_TRIANGLE_HEIGHT: MAP_PIN_TRIANGLE_HEIGHT,
    MAP_SAFE_BORDER_ZONE: MAP_SAFE_BORDER_ZONE,
    mapPin: mapPin,
    map: map,
    mapPinMain: mapPinMain,
    addressInput: addressInput,
    fragment: fragment,
    hotels: hotels,
    hotelsSequence: hotelsSequence,
    activeStatus: activeStatus,
    formsMain: formsMain
  };
})();
