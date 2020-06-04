'use strict';
var HOTEL_COUNTER = 8;
var TEMPLATE = document.querySelector('#pin').content;
var MAP_PIN = TEMPLATE.querySelector('.map__pin');
var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var SKY_HEIGHT = 170;
var MAP_MENU_HEIGHT = document.querySelector('.map__filters').offsetHeight;
var mapPins = document.querySelector('.map__pins');
var MAP_Y_SIZE = mapPins.offsetHeight;
var MAP_X_SIZE = mapPins.offsetWidth;
var MAX_LOCATION_X = MAP_X_SIZE - PIN_WIDTH;
var MIN_LOCATION_Y = PIN_HEIGHT + SKY_HEIGHT;
var MAX_LOCATION_Y = MAP_Y_SIZE - MAP_MENU_HEIGHT - PIN_HEIGHT;
var fragment = document.createDocumentFragment();
var hotelArrays = [];
var map = document.querySelector('.map');
var xLocations = [];
var yLocations = [];

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getLocations = function (array, minLocation, maxLocation) {
  for (var i = 0; i < HOTEL_COUNTER; i++) {
    array.push(randomInteger(minLocation, maxLocation));
  }
};

var randomArray = function (array) {
  var newArray = [];
  for (var i = 0; i < array.length || newArray.length === 0; i++) {
    if (randomInteger(1, 2) === 2) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};

var getHotelInfo = function (avatar, title, address, price, type, rooms, guests,
    checkin, checkout, features, description, photos, x, y) {
  return {
    author: {
      avatar: avatar
    },
    offer: {
      title: title,
      address: address,
      price: price,
      type: type,
      rooms: rooms,
      guests: guests,
      checkin: checkin,
      checkout: checkout,
      features: features,
      description: description,
      photos: photos
    },
    location: {
      x: x,
      y: y
    }
  };
};

var arrayCreator = function () {
  for (var i = 0; i < HOTEL_COUNTER; i++) {
    var HOTEL_DESCRIPTION = 'any looooooooooong text';
    var hotelAvatar = 'img/avatars/user0' + randomInteger(1, HOTEL_COUNTER) + '.png';
    var hotelTitle = 'hotel' + i;
    var hotelAddress = 'x:' + xLocations[i] + ' y:' + yLocations[i];
    var hotelPrice = randomInteger(1000, 80000) + '$';
    var hotelType = HOTEL_TYPES[randomInteger(0, 3)];
    var hotelRooms = randomInteger(1, 6);
    var hotelCheckin = TIME[randomInteger(0, TIME.length - 1)];
    var hotelCheckout = TIME[randomInteger(0, TIME.length - 1)];
    var hotelFeatures = randomArray(FEATURES);
    var hotelPhoto = randomArray(HOTEL_PHOTOS);
    hotelArrays.splice(0, 0, getHotelInfo(
        hotelAvatar, hotelTitle, hotelAddress, hotelPrice, hotelType, hotelRooms, hotelRooms * 3, hotelCheckin,
        hotelCheckout, hotelFeatures, HOTEL_DESCRIPTION, hotelPhoto, xLocations[i], yLocations[i]
    ));
  }
};

var renderMapPins = function () {
  map.classList.remove('map--faded');
  getLocations(xLocations, PIN_WIDTH, MAX_LOCATION_X);
  getLocations(yLocations, MIN_LOCATION_Y, MAX_LOCATION_Y);
  arrayCreator();
  for (var i = 0; i < HOTEL_COUNTER; i++) {
    var element = MAP_PIN.cloneNode(true);
    element.style.left = hotelArrays[i].location.x + 'px';
    element.style.top = hotelArrays[i].location.y + 'px';
    element.children[0].src = hotelArrays[i].author.avatar;
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
};

renderMapPins();
