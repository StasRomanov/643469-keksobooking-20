'use strict';
var HOTEL_COUNTER = 8;
var MAP_TEMPLATE = document.querySelector('#pin').content;
var CARD_TEMPLATE = document.querySelector('#card').content;
var MAP_PIN = MAP_TEMPLATE.querySelector('.map__pin');
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
var cardBlock = document.createElement('article');
var hotelHeaderBlock = CARD_TEMPLATE.querySelector('.popup__title');
var hotelAddressBlock = CARD_TEMPLATE.querySelector('.popup__text--address');
var hotelPriceBlock = CARD_TEMPLATE.querySelector('.popup__text--price');
var hotelTypeBlock = CARD_TEMPLATE.querySelector('.popup__type');
var hotelRoomsBlock = CARD_TEMPLATE.querySelector('.popup__text--capacity');
var hotelTimeBlock = CARD_TEMPLATE.querySelector('.popup__text--time');
var hotelFeaturesBlock = CARD_TEMPLATE.querySelector('.popup__features');
var hotelDescriptionBlock = CARD_TEMPLATE.querySelector('.popup__description');
var hotelPhotosBlock = CARD_TEMPLATE.querySelector('.popup__photos');
var hotelAvatarBlock = CARD_TEMPLATE.querySelector('.popup__avatar');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var fragment = document.createDocumentFragment();
var hotelArrays = [];
var map = document.querySelector('.map');
var xLocations = [];
var yLocations = [];

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getLocations = function (array, minLocation, maxLocation) {
  for (var i = 0; i < HOTEL_COUNTER; i++) {
    array.push(getRandomInteger(minLocation, maxLocation));
  }
};

var getRandomArrayLength = function (array) {
  var shuffled = array.slice(0);
  var i = array.length;
  while (i--) {
    var index = Math.floor((i + 1) * Math.random());
    var temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, getRandomInteger(1, array.length));
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
  for (var i = 0; i < HOTEL_COUNTER; i++) {
    var HOTEL_DESCRIPTION = 'any looooooooooong text';
    var hotelAvatar = 'img/avatars/user0' + getRandomInteger(1, HOTEL_COUNTER) + '.png';
    var hotelTitle = 'hotel' + i;
    var hotelAddress = 'x:' + xLocations[i] + ' y:' + yLocations[i];
    var hotelPrice = getRandomInteger(1000, 80000) + '$';
    var hotelType = HOTEL_TYPES[getRandomInteger(0, 3)];
    var hotelRooms = getRandomInteger(1, 6);
    var hotelCheckin = TIME[getRandomInteger(0, TIME.length - 1)];
    var hotelCheckout = TIME[getRandomInteger(0, TIME.length - 1)];
    var hotelFeatures = getRandomArrayLength(FEATURES);
    var hotelPhoto = getRandomArrayLength(HOTEL_PHOTOS);
    var hotelGuests = hotelRooms * getRandomInteger(1, 4);
    hotelArrays.splice(0, 0, getHotelInfo(
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
    var element = MAP_PIN.cloneNode(true);
    element.style.left = hotelArrays[i].location.x + 'px';
    element.style.top = hotelArrays[i].location.y + 'px';
    element.children[0].src = hotelArrays[i].author.avatar;
    fragment.appendChild(element);
  }
  mapPins.appendChild(fragment);
};

var renderHotelType = function () {
  if (hotelArrays[0].offer.type === 'palace' || hotelArrays[0].offer.type === 'house') {
    if (hotelArrays[0].offer.type === 'palace') {
      hotelTypeBlock.textContent = 'Дворец';
    } else {
      hotelTypeBlock.textContent = 'Дом';
    }
  } else if (hotelArrays[0].offer.type === 'bungalo' || hotelArrays[0].offer.type === 'flat') {
    if (hotelArrays[0].offer.type === 'bungalo') {
      hotelTypeBlock.textContent = 'Бунгало';
    } else {
      hotelTypeBlock.textContent = 'Квартира';
    }
  }
};

var renderHotelFeatures = function () {
  fragment = document.createDocumentFragment();
  for (var i = 0; i < hotelArrays[0].offer.features.length; i++) {
    var listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add('popup__feature--' + hotelArrays[0].offer.features[i]);
    listItem.textContent = hotelArrays[0].offer.features[i];
    fragment.appendChild(listItem);
  }
  hotelFeaturesBlock.appendChild(fragment);
};

var renderHotelPhoto = function () {
  fragment = document.createDocumentFragment();
  for (var i = 0; i < hotelArrays[0].offer.photos.length; i++) {
    while (hotelPhotosBlock.firstChild) {
      hotelPhotosBlock.removeChild(hotelPhotosBlock.firstChild);
    }
    var img = document.createElement('img');
    img.setAttribute('width', '45');
    img.setAttribute('height', '40');
    img.setAttribute('alt', 'Фотография жилья');
    img.src = hotelArrays[0].offer.photos[i];
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
  hotelHeaderBlock.textContent = hotelArrays[0].offer.title;
  hotelAddressBlock.textContent = hotelArrays[0].offer.address;
  hotelPriceBlock.textContent = hotelArrays[0].offer.price;
  renderHotelType();
  hotelRoomsBlock.textContent = hotelArrays[0].offer.rooms + ' комнаты для ' + hotelArrays[0].offer.guests;
  hotelTimeBlock.textContent = 'Заезд после ' + hotelArrays[0].offer.checkin + ', выезд до ' + hotelArrays[0].offer.checkout;
  hotelFeaturesBlock.innerHTML = '';
  renderHotelFeatures();
  hotelDescriptionBlock.textContent = hotelArrays[0].offer.description;
  renderHotelPhoto();
  hotelAvatarBlock.src = hotelArrays[0].author.avatar;
  renderCard();
};

map.classList.remove('map--faded');
renderMapPins();
renderHotelInfo();

