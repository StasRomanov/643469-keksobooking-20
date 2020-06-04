'use strict';
var template = document.querySelector('#pin').content;
var mapPin = template.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var hotelArrays = [];
var hotelType = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var featuresAll = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoHotel = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
var mapYSize = mapPins.offsetHeight;
var mapXSize = mapPins.offsetWidth;
var xLocation = [randomInteger(50, mapXSize - 50), randomInteger(50, mapXSize - 50), randomInteger(50, mapXSize - 50), randomInteger(50, mapXSize - 50),
  randomInteger(50, mapXSize - 50), randomInteger(50, mapXSize - 50), randomInteger(50, mapXSize - 50), randomInteger(50, mapXSize - 50)];
var yLocation = [randomInteger(170, mapYSize - 46), randomInteger(170, mapYSize - 46), randomInteger(170, mapYSize - 46), randomInteger(170, mapYSize - 46),
  randomInteger(170, mapYSize - 46), randomInteger(170, mapYSize - 46), randomInteger(170, mapYSize - 46), randomInteger(170, mapYSize - 46)];

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
  for (var i = 0; i < 8; i++) {
    hotelArrays.splice(0, 0, getHotelInfo(
        'img/avatars/user0' + randomInteger(1, 8) + '.png', 'hotel' + '', 'x:' +
        xLocation[i] + ' y:' + yLocation[i], randomInteger(1000, 80000), hotelType[randomInteger(0, 3)], randomInteger(1, 6),
        randomInteger(1, 6) * 3, time[randomInteger(0, 2)], time[randomInteger(0, 2)], randomArray(featuresAll),
        'so looooooooooooooooooong text', randomArray(photoHotel), xLocation[i], yLocation[i]
    ));
  }
};

map.classList.remove('map--faded');
arrayCreator();

for (var i = 0; i < 8; i++) {
  var element = mapPin.cloneNode(true);
  element.style.left = xLocation[i] + 50 + 'px';
  element.style.top = yLocation[i] - 70 - 46 + 'px';
  mapPins.appendChild(element);
}
console.log(mapPins);
