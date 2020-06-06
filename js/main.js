'use strict';
var HOTEL_COUNTER = 8;
var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
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
var maxLocationX = MAP_X_SIZE - PIN_WIDTH;
var minLocationY = PIN_HEIGHT + SKY_HEIGHT;
var maxLocationY = MAP_Y_SIZE - MAP_MENU_HEIGHT - PIN_HEIGHT;
var cardTemplate = document.querySelector('#card').content.cloneNode(true);
var hotelHeaderBlock = cardTemplate.querySelector('.popup__title');
var hotelAddressBlock = cardTemplate.querySelector('.popup__text--address');
var hotelPriceBlock = cardTemplate.querySelector('.popup__text--price');
var hotelTypeBlock = cardTemplate.querySelector('.popup__type');
var hotelRoomsBlock = cardTemplate.querySelector('.popup__text--capacity');
var hotelTimeBlock = cardTemplate.querySelector('.popup__text--time');
var hotelFeaturesBlock = cardTemplate.querySelector('.popup__features');
var hotelDescriptionBlock = cardTemplate.querySelector('.popup__description');
var hotelPhotosBlock = cardTemplate.querySelector('.popup__photos');
var hotelPhoto = cardTemplate.querySelector('.popup__photo');
var hotelAvatarBlock = cardTemplate.querySelector('.popup__avatar');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var template = document.querySelector('#pin').content;
var mapPin = template.querySelector('.map__pin');
var mapPinPhoto = template.querySelector('img');
var fragment = document.createDocumentFragment();
var hotels = [];
var hotelsSequence = [];
var map = document.querySelector('.map');
var xLocations = [];
var yLocations = [];

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
    hotelsSequence.splice(0, 0, i + 1);
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

var getAllHotelInfo = function () {
  getHotelOrder(HOTEL_COUNTER);
  shuffle(hotelsSequence);
  for (var i = 0; i < HOTEL_COUNTER; i++) {
    xLocations[i] = getLocations(PIN_WIDTH, maxLocationX);
    yLocations[i] = getLocations(minLocationY, maxLocationY);
    var HOTEL_DESCRIPTION = 'any looooooooooong text';
    var hotelAvatar = 'img/avatars/user0' + hotelsSequence[i] + '.png';
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
    hotels.splice(0, 0, getHotelInfo(
        hotelAvatar, hotelTitle, hotelAddress, hotelPrice, hotelType, hotelRooms, hotelGuests, hotelCheckin,
        hotelCheckout, hotelFeatures, HOTEL_DESCRIPTION, hotelPhoto, xLocations[i], yLocations[i]
    ));
  }
};

var renderMapPins = function () {
  fragment = document.createDocumentFragment();
  getAllHotelInfo();
  for (var i = 0; i < HOTEL_COUNTER; i++) {
    var photoElement = mapPinPhoto.cloneNode(false);
    var element = mapPin.cloneNode(false);
    element.style.left = hotels[i].location.x + 'px';
    element.style.top = hotels[i].location.y + 'px';
    photoElement.src = hotels[i].author.avatar;
    element.appendChild(photoElement);
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
};

var renderHotelType = function (type) {
  if (type === 'palace') {
    hotelTypeBlock.textContent = 'Дворец';
  }
  if (type === 'house') {
    hotelTypeBlock.textContent = 'Дом';
  }
  if (type === 'bungalo') {
    hotelTypeBlock.textContent = 'Бунгало';
  }
  if (type === 'house') {
    hotelTypeBlock.textContent = 'Дом';
  }
};

var renderHotelFeatures = function (currentHotel) {
  fragment = document.createDocumentFragment();
  for (var i = 0; i < hotels[currentHotel].offer.features.length; i++) {
    var listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add('popup__feature--' + hotels[currentHotel].offer.features[i]);
    listItem.textContent = hotels[currentHotel].offer.features[i];
    fragment.appendChild(listItem);
  }
  hotelFeaturesBlock.appendChild(fragment);
};

var renderHotelPhoto = function () {
  fragment = document.createDocumentFragment();
  for (var i = 0; i < hotels[0].offer.photos.length; i++) {
    while (hotelPhotosBlock.firstChild) {
      hotelPhotosBlock.removeChild(hotelPhotosBlock.firstChild);
    }
    var img = hotelPhoto.cloneNode(false);
    img.src = hotels[0].offer.photos[i];
    fragment.appendChild(img);
  }
  hotelPhotosBlock.appendChild(fragment);
};

var renderHotelInfo = function () {
  var rooms = hotels[0].offer.rooms + ' комнаты для ' + hotels[0].offer.guests + ' гостей.';
  var time = 'Заезд после ' + hotels[0].offer.checkin + ', выезд до ' + hotels[0].offer.checkout;
  fragment = document.createDocumentFragment();
  hotelHeaderBlock.textContent = hotels[0].offer.title;
  hotelAddressBlock.textContent = hotels[0].offer.address;
  hotelPriceBlock.textContent = hotels[0].offer.price;
  renderHotelType(hotels[0].offer.type);
  hotelRoomsBlock.textContent = rooms;
  hotelTimeBlock.textContent = time;
  hotelFeaturesBlock.innerHTML = '';
  renderHotelFeatures(0);
  hotelDescriptionBlock.textContent = hotels[0].offer.description;
  renderHotelPhoto();
  hotelAvatarBlock.src = hotels[0].author.avatar;
  map.insertBefore(cardTemplate, mapFiltersContainer);
};

map.classList.remove('map--faded');
renderMapPins();
renderHotelInfo();
