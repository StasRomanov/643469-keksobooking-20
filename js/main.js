'use strict';
var array = [];
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

var xLocation = randomInteger(130, 630);
var yLocation = randomInteger(130, 630);

var randomArray = function (array) {
  var newArray = [];
  for (var i = 0; i < array.length || newArray.length === 0; i++) {
    if (randomInteger(1, 2) === 2) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};

var objectHotel = {
  author: {
    avatar: 'img/avatars/user0' + randomInteger(1, 8) + '.png'
  },
  offer: {
    title: 'hotel' + '',
    address: 'x:' + xLocation + ' y:' + yLocation,
    price: randomInteger(1000, 80000),
    type: hotelType[randomInteger(0, 3)],
    rooms: randomInteger(1, 6),
    guests: randomInteger(1, 6) * 3,
    checkin: time[randomInteger(0, 2)],
    checkout: time[randomInteger(0, 2)],
    features: randomArray(featuresAll),
    description: 'so looooooooooooooooooong text',
    photos: randomArray(photoHotel)
  },
  location: {
    x: xLocation,
    y: yLocation
  }
};

var arrayCreator = function () {
  for (var i = 0; i <= 8; i++) {
    array.splice(0, 0, objectHotel);
  }
};

map.classList.remove('map--faded');
arrayCreator();
console.log(array);
