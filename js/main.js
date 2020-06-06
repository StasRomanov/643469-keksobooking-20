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
var MAX_LOCATION_X = MAP_X_SIZE - PIN_WIDTH;
var MIN_LOCATION_Y = PIN_HEIGHT + SKY_HEIGHT;
var MAX_LOCATION_Y = MAP_Y_SIZE - MAP_MENU_HEIGHT - PIN_HEIGHT;
var cardBlock = document.createElement('article');
var cardTemplate = document.querySelector('#card').content;
var hotelHeaderBlock = cardTemplate.querySelector('.popup__title');
var hotelAddressBlock = cardTemplate.querySelector('.popup__text--address');
var hotelPriceBlock = cardTemplate.querySelector('.popup__text--price');
var hotelTypeBlock = cardTemplate.querySelector('.popup__type');
var hotelRoomsBlock = cardTemplate.querySelector('.popup__text--capacity');
var hotelTimeBlock = cardTemplate.querySelector('.popup__text--time');
var hotelFeaturesBlock = cardTemplate.querySelector('.popup__features');
var hotelDescriptionBlock = cardTemplate.querySelector('.popup__description');
var hotelPhotosBlock = cardTemplate.querySelector('.popup__photos');
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
  return array[getRandomInteger(0, array.length)];
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
    xLocations[i] = getLocations(PIN_WIDTH, MAX_LOCATION_X);
    yLocations[i] = getLocations(MIN_LOCATION_Y, MAX_LOCATION_Y);
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
  getLocations(xLocations, PIN_WIDTH, MAX_LOCATION_X);
  getLocations(yLocations, MIN_LOCATION_Y, MAX_LOCATION_Y);
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

var renderHotelType = function () {
  if (hotels[0].offer.type === 'palace' || hotels[0].offer.type === 'house') {
    if (hotels[0].offer.type === 'palace') {
      hotelTypeBlock.textContent = 'Дворец';
    } else {
      hotelTypeBlock.textContent = 'Дом';
    }
  } else if (hotels[0].offer.type === 'bungalo' || hotels[0].offer.type === 'flat') {
    if (hotels[0].offer.type === 'bungalo') {
      hotelTypeBlock.textContent = 'Бунгало';
    } else {
      hotelTypeBlock.textContent = 'Квартира';
    }
  }
};

var renderHotelFeatures = function () {
  fragment = document.createDocumentFragment();
  for (var i = 0; i < hotels[0].offer.features.length; i++) {
    var listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add('popup__feature--' + hotels[0].offer.features[i]);
    listItem.textContent = hotels[0].offer.features[i];
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
    var img = document.createElement('img');
    img.setAttribute('width', '45');
    img.setAttribute('height', '40');
    img.setAttribute('alt', 'Фотография жилья');
    img.src = hotels[0].offer.photos[i];
    fragment.appendChild(img);
  }
  hotelPhotosBlock.appendChild(fragment);
};

var renderCard = function () {
  fragment = document.createDocumentFragment();
  var cardArray = [hotelHeaderBlock, hotelAddressBlock, hotelPriceBlock, hotelTypeBlock, hotelRoomsBlock,
    hotelRoomsBlock, hotelTimeBlock, hotelFeaturesBlock, hotelDescriptionBlock, hotelPhotosBlock];
  for (var j = 0; j < cardArray.length; j++) {
    cardBlock.appendChild(cardArray[j]);
  }
  map.insertBefore(cardBlock, mapFiltersContainer);
};

var renderHotelInfo = function () {
  fragment = document.createDocumentFragment();
  cardBlock.classList.add('map__card');
  cardBlock.classList.add('popup');
  hotelHeaderBlock.textContent = hotels[0].offer.title;
  hotelAddressBlock.textContent = hotels[0].offer.address;
  hotelPriceBlock.textContent = hotels[0].offer.price;
  renderHotelType();
  hotelRoomsBlock.textContent = hotels[0].offer.rooms + ' комнаты для ' + hotels[0].offer.guests;
  hotelTimeBlock.textContent = 'Заезд после ' + hotels[0].offer.checkin + ', выезд до ' + hotels[0].offer.checkout;
  hotelFeaturesBlock.innerHTML = '';
  renderHotelFeatures();
  hotelDescriptionBlock.textContent = hotels[0].offer.description;
  renderHotelPhoto();
  hotelAvatarBlock.src = hotels[0].author.avatar;
  renderCard();
};

map.classList.remove('map--faded');
renderMapPins();
renderHotelInfo();
