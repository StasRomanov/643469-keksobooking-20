'use strict';
var HOTEL_COUNTER = 8;
var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ROOMS_DECLENSION = ['комната', 'комнаты', 'комнат'];
var GUEST_DECLENSION = ['гостя', 'гостей', 'гостей'];
var ENTER = 'Enter';
var LEFT_MOUSE_CODE = 0;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var SKY_HEIGHT = 170;
var MAP_GAP = 25;
var MAP_MENU_HEIGHT = document.querySelector('.map__filters').offsetHeight;
var mapPins = document.querySelector('.map__pins');
var MAP_Y_SIZE = mapPins.offsetHeight;
var MAP_X_SIZE = mapPins.offsetWidth;
var minLocationX = PIN_WIDTH / 2 + MAP_GAP;
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
var hotelPhotoBlock = cardTemplate.querySelector('.popup__photo');
var hotelAvatarBlock = cardTemplate.querySelector('.popup__avatar');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var template = document.querySelector('#pin').content;
var mapPin = template.querySelector('.map__pin');
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
var formMain = document.querySelectorAll('.ad-form__element');
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

var createAllHotelInfo = function () {
  getHotelOrder(HOTEL_COUNTER);
  shuffle(hotelsSequence);
  for (var i = 0; i < HOTEL_COUNTER; i++) {
    xLocations[i] = getLocations(minLocationX, maxLocationX);
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
    hotels.splice(0, 0, createHotelInfo(
        hotelAvatar, hotelTitle, hotelAddress, hotelPrice, hotelType, hotelRooms, hotelGuests, hotelCheckin,
        hotelCheckout, hotelFeatures, HOTEL_DESCRIPTION, hotelPhoto, xLocations[i], yLocations[i]
    ));
  }
};

var renderMapPins = function () {
  fragment = document.createDocumentFragment();
  createAllHotelInfo();
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

var renderHotelType = function (type, textBlock) {
  textBlock.textContent = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  }[type];
};

var getWordDeclension = function (n, textForms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }
  return textForms[2];
};

var getGuests = function (hotelGuests) {
  if (hotelGuests === 1 || hotelGuests === 21) {
    return ' гостя.';
  } else {
    return ' гостей.';
  }
};

var renderHotelFeatures = function (features, featuresBlock) {
  fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add('popup__feature--' + features[i]);
    listItem.textContent = features[i];
    fragment.appendChild(listItem);
  }
  featuresBlock.appendChild(fragment);
};

var renderHotelPhoto = function () {
  fragment = document.createDocumentFragment();
  for (var i = 0; i < hotels[0].offer.photos.length; i++) {
    while (hotelPhotosBlock.firstChild) {
      hotelPhotosBlock.removeChild(hotelPhotosBlock.firstChild);
    }
    var img = hotelPhotoBlock.cloneNode(false);
    img.src = hotels[0].offer.photos[i];
    fragment.appendChild(img);
  }
  hotelPhotosBlock.appendChild(fragment);
};

var renderHotelInfo = function (hotel) {
  var rooms = hotel.offer.rooms + ' ' + getWordDeclension(hotel.offer.rooms, ROOMS_DECLENSION) + ' для '
    + hotel.offer.guests + ' ' + getGuests(hotel.offer.guests, GUEST_DECLENSION);
  var time = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
  fragment = document.createDocumentFragment();
  hotelHeaderBlock.textContent = hotel.offer.title;
  hotelAddressBlock.textContent = hotel.offer.address;
  hotelPriceBlock.textContent = hotel.offer.price;
  renderHotelType(hotel.offer.type, hotelTypeBlock);
  hotelRoomsBlock.textContent = rooms;
  hotelTimeBlock.textContent = time;
  hotelFeaturesBlock.innerHTML = '';
  renderHotelFeatures(hotel.offer.features, hotelFeaturesBlock);
  hotelDescriptionBlock.textContent = hotel.offer.description;
  renderHotelPhoto();
  hotelAvatarBlock.src = hotel.author.avatar;
  map.insertBefore(cardTemplate, mapFiltersContainer);
};

var createMainPinLocation = function () {
  var mainPinLocationX = Math.round(mapPinMainLocationX + mapPinDefaultLocationX);
  var mainPinLocationY = Math.round(mapPinMainLocationY + mapPinDefaultLocationY);
  if (activeStatus) {
    mainPinLocationY = Math.round(mapPinMainLocationY + mapPinDefaultLocationY + 22);
  }
  addressInput.value = mainPinLocationX + ', ' + mainPinLocationY;
};

var startActiveMode = function () {
  activeStatus = true;
  for (var i = 0; i < formMain.childNodes.length; i++) {
    formMain[i].removeAttribute('disabled');
  }
  formHeader.removeAttribute('disabled');
  renderMapPins();
  renderHotelInfo(hotels[0]);
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  createMainPinLocation();
};

var startPassiveMode = function () {
  if (activeStatus === false) {
    formHeader.setAttribute('disabled', 'true');
    for (var i = 0; i < formMain.length; i++) {
      formMain[i].setAttribute('disabled', 'true');
    }
  }
};

var enableNumberInput = function (childrenNumber) {
  guestNumberInput.children[childrenNumber].removeAttribute('disabled');
};

var establishLimitsOnRooms = function () {
  for (var i = 0; i < guestNumberInput.length; i++) {
    guestNumberInput.children[i].setAttribute('disabled', 'disabled');
  }
  guestNumberInput.value = {
    '1': '1',
    '2': '2',
    '3': '3',
    '100': '0'
  }[roomNumberInput.value];
  if (roomNumberInput.value === '1') {
    enableNumberInput(2);
  }
  if (roomNumberInput.value === '2') {
    enableNumberInput(1);
    enableNumberInput(2);
  }
  if (roomNumberInput.value === '3') {
    enableNumberInput(1);
    enableNumberInput(2);
    enableNumberInput(3);
  }
};

var syncTimeIn = function () {
  timeOutInput.value = timeInInput.value;
};

var syncTimeOut = function () {
  timeInInput.value = timeOutInput.value;
};

var createInputSettings = function () {
  var minValue = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  }[typeInput.value];
  priceInput.setAttribute('min', minValue);
  priceInput.setAttribute('placeholder', minValue);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_CODE && activeStatus === false) {
    startActiveMode();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.code === ENTER && activeStatus === false) {
    startActiveMode();
  }
});

typeInput.addEventListener('change', function () {
  createInputSettings();
});

timeInInput.addEventListener('change', function () {
  syncTimeIn();
});

timeOutInput.addEventListener('change', function () {
  syncTimeOut();
});

roomNumberInput.addEventListener('change', function () {
  establishLimitsOnRooms();
});

startPassiveMode();
createMainPinLocation();
