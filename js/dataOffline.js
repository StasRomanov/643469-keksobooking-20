'use strict';

(function () {
  var DESCRIPTION = 'there should be a description but you do not have internet so rate by photo';
  var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MAP_GAP = 25;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var MAP_MENU_HEIGHT = document.querySelector('.map__filters').offsetHeight;
  var minLocationY = PIN_HEIGHT + window.utilData.SKY_HEIGHT;
  var MAP_Y_SIZE = window.utilData.mapPin.offsetHeight;
  var MAP_X_SIZE = window.utilData.mapPin.offsetWidth;
  var maxLocationY = MAP_Y_SIZE - MAP_MENU_HEIGHT - PIN_HEIGHT;
  var maxLocationX = MAP_X_SIZE - PIN_WIDTH;
  var minLocationX = PIN_WIDTH / 2 + MAP_GAP;
  var xLocations = [];
  var yLocations = [];

  var createHotelInfo = function (avatar, title, address, price, type, rooms, guests,
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

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getLocations = function (minLocation, maxLocation) {
    var array = [];
    array.push(getRandomInteger(minLocation, maxLocation));
    return array;
  };

  var getHotelOrder = function (count) {
    for (var i = 0; i < count; i++) {
      window.utilData.hotelsSequence.splice(0, 0, i + 1);
    }
  };

  var shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var getRandomArrayLength = function (array) {
    var shuffled = array.slice();
    shuffle(shuffled);
    return shuffled.slice(0, getRandomInteger(1, array.length));
  };

  var getRandomArrayElement = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };
  window.createAllHotelInfo = function () {
    getHotelOrder(window.utilData.HOTEL_COUNTER);
    shuffle(window.utilData.hotelsSequence);
    for (var i = 0; i < window.utilData.HOTEL_COUNTER; i++) {
      xLocations[i] = getLocations(minLocationX, maxLocationX);
      yLocations[i] = getLocations(minLocationY, maxLocationY);
      var HOTEL_DESCRIPTION = DESCRIPTION;
      var hotelAvatar = 'img/avatars/user0' + window.utilData.hotelsSequence[i] + '.png';
      var hotelTitle = 'hotel' + i;
      var hotelAddress = 'x:' + xLocations[i] + ' y:' + yLocations[i];
      var hotelPrice = getRandomInteger(1000, 80000) + '₽/ночь';
      var hotelType = getRandomArrayElement(HOTEL_TYPES);
      var hotelRooms = getRandomInteger(1, 6);
      var hotelCheckin = getRandomArrayElement(TIMES);
      var hotelCheckout = getRandomArrayElement(TIMES);
      var hotelFeatures = getRandomArrayLength(FEATURES);
      var hotelPhoto = getRandomArrayLength(HOTEL_PHOTOS);
      var hotelGuests = hotelRooms * getRandomInteger(1, 4);
      window.utilData.hotels.splice(0, 0, createHotelInfo(
          hotelAvatar, hotelTitle, hotelAddress, hotelPrice, hotelType, hotelRooms, hotelGuests, hotelCheckin,
          hotelCheckout, hotelFeatures, HOTEL_DESCRIPTION, hotelPhoto, xLocations[i], yLocations[i]
      ));
    }
  };
})();
