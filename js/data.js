'use strict';

(function () {
  var HOTEL_COUNTER = 8;
  var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ROOMS_DECLENSION = ['комната', 'комнаты', 'комнат'];
  var GUEST_DECLENSION = ['гостя', 'гостей', 'гостей'];
  var ENTER_KEY_CODE = 'Enter';
  var ESC_KEY_CODE = 'Escape';
  var LEFT_MOUSE_CODE = 0;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var SKY_HEIGHT = 170;
  var MAP_GAP = 25;
  var MAP_PIN_TRIANGLE_HEIGHT = 22;
  var MAP_MENU_HEIGHT = document.querySelector('.map__filters').offsetHeight;
  var mapPin = document.querySelector('.map__pins');
  var MAP_Y_SIZE = mapPin.offsetHeight;
  var MAP_X_SIZE = mapPin.offsetWidth;
  var minLocationX = PIN_WIDTH / 2 + MAP_GAP;
  var maxLocationX = MAP_X_SIZE - PIN_WIDTH;
  var minLocationY = PIN_HEIGHT + SKY_HEIGHT;
  var maxLocationY = MAP_Y_SIZE - MAP_MENU_HEIGHT - PIN_HEIGHT;
  var cardTemplate = document.querySelector('#card').content.cloneNode(true);
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var template = document.querySelector('#pin').content;
  var templateMapPin = template.querySelector('.map__pin');
  var mapPinPhoto = template.querySelector('img');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var roomNumberInput = document.querySelector('#room_number');
  var guestNumberInput = document.querySelector('#capacity');
  var formHeader = document.querySelector('.ad-form-header');
  var formsMain = document.querySelectorAll('.ad-form__element');
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var mapPinMainLocationX = mapPinMainHeight / 2;
  var mapPinMainLocationY = mapPinMainWidth + 22;
  var mapPinDefaultLocationX = 570;
  var mapPinDefaultLocationY = 375;
  var fragment = document.createDocumentFragment();
  var hotels = [];
  var hotelsSequence = [];
  var xLocations = [];
  var yLocations = [];
  var activeStatus = false;

  window.data = {
    HOTEL_COUNTER: HOTEL_COUNTER,
    HOTEL_TYPES: HOTEL_TYPES,
    TIMES: TIMES,
    FEATURES: FEATURES,
    HOTEL_PHOTOS: HOTEL_PHOTOS,
    ROOMS_DECLENSION: ROOMS_DECLENSION,
    GUEST_DECLENSION: GUEST_DECLENSION,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    ESC_KEY_CODE: ESC_KEY_CODE,
    LEFT_MOUSE_CODE: LEFT_MOUSE_CODE,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    SKY_HEIGHT: SKY_HEIGHT,
    MAP_GAP: MAP_GAP,
    MAP_PIN_TRIANGLE_HEIGHT: MAP_PIN_TRIANGLE_HEIGHT,
    MAP_MENU_HEIGHT: MAP_MENU_HEIGHT,
    mapPin: mapPin,
    MAP_Y_SIZE: MAP_Y_SIZE,
    MAP_X_SIZE: MAP_X_SIZE,
    minLocationX: minLocationX,
    maxLocationX: maxLocationX,
    minLocationY: minLocationY,
    maxLocationY: maxLocationY,
    cardTemplate: cardTemplate,
    mapFiltersContainer: mapFiltersContainer,
    template: template,
    templateMapPin: templateMapPin,
    mapPinPhoto: mapPinPhoto,
    map: map,
    mapPinMain: mapPinMain,
    form: form,
    addressInput: addressInput,
    priceInput: priceInput,
    typeInput: typeInput,
    timeInInput: timeInInput,
    timeOutInput: timeOutInput,
    roomNumberInput: roomNumberInput,
    guestNumberInput: guestNumberInput,
    formHeader: formHeader,
    formsMain: formsMain,
    mapPinMainWidth: mapPinMainWidth,
    mapPinMainHeight: mapPinMainHeight,
    mapPinMainLocationX: mapPinMainLocationX,
    mapPinMainLocationY: mapPinMainLocationY,
    mapPinDefaultLocationX: mapPinDefaultLocationX,
    mapPinDefaultLocationY: mapPinDefaultLocationY,
    fragment: fragment,
    hotels: hotels,
    hotelsSequence: hotelsSequence,
    xLocations: xLocations,
    yLocations: yLocations,
    activeStatus: activeStatus
  };
})();
