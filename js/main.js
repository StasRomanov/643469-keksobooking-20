'use strict';

(function () {
  window.getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  window.getLocations = function (minLocation, maxLocation) {
    var array = [];
    array.push(window.getRandomInteger(minLocation, maxLocation));
    return array;
  };

  window.getHotelOrder = function (count) {
    for (var i = 0; i < count; i++) {
      window.data.hotelsSequence.splice(0, 0, i + 1);
    }
  };

  window.shuffle = function (arr) {
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

  window.getRandomArrayLength = function (array) {
    var shuffled = array.slice();
    window.shuffle(shuffled);
    return shuffled.slice(0, window.getRandomInteger(1, array.length));
  };

  window.getRandomArrayElement = function (array) {
    return array[window.getRandomInteger(0, array.length - 1)];
  };
})();


(function () {
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

  window.createAllHotelInfo = function () {
    window.getHotelOrder(window.data.HOTEL_COUNTER);
    window.shuffle(window.data.hotelsSequence);
    for (var i = 0; i < window.data.HOTEL_COUNTER; i++) {
      window.data.xLocations[i] = window.getLocations(window.data.minLocationX, window.data.maxLocationX);
      window.data.yLocations[i] = window.getLocations(window.data.minLocationY, window.data.maxLocationY);
      var HOTEL_DESCRIPTION = 'any looooooooooong text';
      var hotelAvatar = 'img/avatars/user0' + window.data.hotelsSequence[i] + '.png';
      var hotelTitle = 'hotel' + i;
      var hotelAddress = 'x:' + window.data.xLocations[i] + ' y:' + window.data.yLocations[i];
      var hotelPrice = window.getRandomInteger(1000, 80000) + '₽/ночь';
      var hotelType = window.getRandomArrayElement(window.data.HOTEL_TYPES);
      var hotelRooms = window.getRandomInteger(1, 6);
      var hotelCheckin = window.getRandomArrayElement(window.data.TIMES);
      var hotelCheckout = window.getRandomArrayElement(window.data.TIMES);
      var hotelFeatures = window.getRandomArrayLength(window.data.FEATURES);
      var hotelPhoto = window.getRandomArrayLength(window.data.HOTEL_PHOTOS);
      var hotelGuests = hotelRooms * window.getRandomInteger(1, 4);
      window.data.hotels.splice(0, 0, createHotelInfo(
          hotelAvatar, hotelTitle, hotelAddress, hotelPrice, hotelType, hotelRooms, hotelGuests, hotelCheckin,
          hotelCheckout, hotelFeatures, HOTEL_DESCRIPTION, hotelPhoto, window.data.xLocations[i], window.data.yLocations[i]
      ));
    }
  };
})();


(function () {
  window.renderMapPins = function () {
    window.data.fragment = document.createDocumentFragment();
    window.createAllHotelInfo();
    for (var i = 0; i < window.data.HOTEL_COUNTER; i++) {
      var photoElement = window.data.mapPinPhoto.cloneNode(false);
      var element = window.data.templateMapPin.cloneNode(false);
      element.style.left = window.data.hotels[i].location.x + 'px';
      element.style.top = window.data.hotels[i].location.y + 'px';
      photoElement.src = window.data.hotels[i].author.avatar;
      element.setAttribute('data-id', i);
      element.appendChild(photoElement);
      window.data.fragment.appendChild(element);
    }
    window.data.mapPin.appendChild(window.data.fragment);
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
    window.data.fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature');
      listItem.classList.add('popup__feature--' + features[i]);
      listItem.textContent = features[i];
      window.data.fragment.appendChild(listItem);
    }
    featuresBlock.appendChild(window.data.fragment);
  };

  var renderHotelPhoto = function (hotel, photosBlock, photo) {
    window.data.fragment = document.createDocumentFragment();
    for (var i = 0; i < hotel.offer.photos.length; i++) {
      while (photosBlock.firstChild) {
        photosBlock.removeChild(photosBlock.firstChild);
      }
      var img = photo.cloneNode(false);
      img.src = hotel.offer.photos[i];
      window.data.fragment.appendChild(img);
    }
    photosBlock.appendChild(window.data.fragment);
  };

  window.renderHotelInfo = function (hotel) {
    var cloneCardTemplate = window.data.cardTemplate.cloneNode(true);
    var hotelHeaderBlock = cloneCardTemplate.querySelector(('.popup__title'));
    var hotelAddressBlock = cloneCardTemplate.querySelector('.popup__text--address');
    var hotelPriceBlock = cloneCardTemplate.querySelector('.popup__text--price');
    var hotelTypeBlock = cloneCardTemplate.querySelector('.popup__type');
    var hotelRoomsBlock = cloneCardTemplate.querySelector('.popup__text--capacity');
    var hotelTimeBlock = cloneCardTemplate.querySelector('.popup__text--time');
    var hotelFeaturesBlock = cloneCardTemplate.querySelector('.popup__features');
    var hotelDescriptionBlock = cloneCardTemplate.querySelector('.popup__description');
    var hotelPhotosBlock = cloneCardTemplate.querySelector('.popup__photos');
    var hotelPhotoBlock = cloneCardTemplate.querySelector('.popup__photo');
    var hotelAvatarBlock = cloneCardTemplate.querySelector('.popup__avatar');
    var rooms = hotel.offer.rooms + ' ' + getWordDeclension(hotel.offer.rooms, window.data.ROOMS_DECLENSION) + ' для '
      + hotel.offer.guests + ' ' + getGuests(hotel.offer.guests, window.data.GUEST_DECLENSION);
    var time = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    window.data.fragment = document.createDocumentFragment();
    hotelHeaderBlock.textContent = hotel.offer.title;
    hotelAddressBlock.textContent = hotel.offer.address;
    hotelPriceBlock.textContent = hotel.offer.price;
    renderHotelType(hotel.offer.type, hotelTypeBlock);
    hotelRoomsBlock.textContent = rooms;
    hotelTimeBlock.textContent = time;
    hotelFeaturesBlock.innerHTML = '';
    renderHotelFeatures(hotel.offer.features, hotelFeaturesBlock);
    hotelDescriptionBlock.textContent = hotel.offer.description;
    renderHotelPhoto(hotel, hotelPhotosBlock, hotelPhotoBlock);
    hotelAvatarBlock.src = hotel.author.avatar;
    window.data.map.insertBefore(cloneCardTemplate, window.data.mapFiltersContainer);
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', window.onPopupCloseClick, false);
    popupClose.addEventListener('keydown', window.onPopupCloseKeydown, false);
    document.addEventListener('keydown', window.onDocumentKeydown, false);
  };
})();


(function () {
  var createMainPinLocation = function () {
    var mainPinLocationX = Math.round(window.data.mapPinMainLocationX + window.data.mapPinDefaultLocationX);
    var mainPinLocationY = Math.round(window.data.mapPinMainLocationY + window.data.mapPinDefaultLocationY);
    if (window.data.activeStatus) {
      mainPinLocationY = Math.round(window.data.mapPinMainLocationY + window.data.mapPinDefaultLocationY + window.data.MAP_PIN_TRIANGLE_HEIGHT);
    }
    window.data.addressInput.value = mainPinLocationX + ', ' + mainPinLocationY;
  };

  window.startActiveMode = function () {
    window.data.activeStatus = true;
    for (var i = 0; i < window.data.formsMain.length; i++) {
      window.data.formsMain[i].removeAttribute('disabled');
    }
    window.data.formHeader.removeAttribute('disabled');
    window.renderMapPins();
    window.data.map.classList.remove('map--faded');
    window.data.form.classList.remove('ad-form--disabled');
    createMainPinLocation();
    window.data.mapPinMain.addEventListener('mousedown', window.onMainPinMove, false);
  };
})();


(function () {
  var enableNumberInput = function (childrenNumber) {
    window.data.guestNumberInput.children[childrenNumber].removeAttribute('disabled');
  };

  window.establishLimitsOnRooms = function () {
    for (var i = 0; i < window.data.guestNumberInput.length; i++) {
      window.data.guestNumberInput.children[i].setAttribute('disabled', 'true');
    }
    if (window.data.guestNumberInput.value < 100) {
      window.data.guestNumberInput.value = window.data.roomNumberInput.value;
    } else {
      window.data.guestNumberInput.value = '0';
    }
    for (var j = 0; j < window.data.guestNumberInput.length; j++) {
      if (window.data.guestNumberInput.children[j].getAttribute('value') <= window.data.roomNumberInput.value) {
        enableNumberInput(j);
      }
      if (window.data.roomNumberInput.value === '100') {
        for (var l = 0; l < window.data.guestNumberInput.length; l++) {
          window.data.guestNumberInput.children[l].setAttribute('disabled', 'true');
          window.data.guestNumberInput.value = '0';
        }
      }
      if (j === window.data.guestNumberInput.length - 1) {
        window.data.guestNumberInput.children[j].setAttribute('disabled', 'true');
      }
    }
  };

  window.startPassiveMode = function () {
    if (window.data.activeStatus === false) {
      window.data.formHeader.setAttribute('disabled', 'true');
      for (var i = 0; i < window.data.formsMain.length; i++) {
        window.data.formsMain[i].setAttribute('disabled', 'true');
      }
      window.establishLimitsOnRooms();
    }
  };

  window.syncTimeIn = function () {
    window.data.timeOutInput.value = window.data.timeInInput.value;
  };

  window.syncTimeOut = function () {
    window.data.timeInInput.value = window.data.timeOutInput.value;
  };

  window.createInputSettings = function () {
    var minValue = {
      bungalo: '0',
      flat: '1000',
      house: '5000',
      palace: '10000'
    }[window.data.typeInput.value];
    window.data.priceInput.setAttribute('min', minValue);
    window.data.priceInput.setAttribute('placeholder', minValue);
  };
})();


(function () {
  window.onMapPinClick = function (evt) {
    if (window.data.activeStatus) {
      var target = evt.target;
      if (target.tagName === 'IMG') {
        target = target.closest('button');
        if (target.classList.contains('map__pin--main')) {
          return;
        }
      }
      if (target.tagName === 'BUTTON') {
        for (var i = 0; i < window.data.hotels.length; i++) {
          if (String(i) === target.getAttribute('data-id')) {
            window.renderHotelInfo(window.data.hotels[i]);
          }
        }
      }
    }
  };

  window.onPopupCloseClick = function (evt) {
    var popupCard = document.querySelector('.popup');
    var popupClose = document.querySelector('.popup__close');
    if (evt.button === window.data.LEFT_MOUSE_CODE && window.data.activeStatus === true) {
      window.data.map.removeChild(popupCard);
    }
    popupClose.removeEventListener('click', window.onPopupCloseClick, false);
    popupClose.removeEventListener('keydown', window.onPopupCloseKeydown, false);
    document.removeEventListener('keydown', window.onDocumentKeydown, false);
  };

  window.onPopupCloseKeydown = function (evt) {
    var popupCard = document.querySelector('.popup');
    var popupClose = document.querySelector('.popup__close');
    if (evt.code === window.data.ENTER_KEY_CODE && window.data.activeStatus === true) {
      window.data.map.removeChild(popupCard);
    }
    popupClose.removeEventListener('click', window.onPopupCloseClick, false);
    popupClose.removeEventListener('keydown', window.onPopupCloseKeydown, false);
    document.removeEventListener('keydown', window.onDocumentKeydown, false);
  };

  window.onDocumentKeydown = function (evt) {
    var popupCard = document.querySelector('.popup');
    var popupClose = document.querySelector('.popup__close');
    if (evt.code === window.data.ESC_KEY_CODE && window.data.activeStatus === true) {
      window.data.map.removeChild(popupCard);
    }
    popupClose.removeEventListener('click', window.onPopupCloseClick, false);
    popupClose.removeEventListener('keydown', window.onPopupCloseKeydown, false);
    document.removeEventListener('keydown', window.onDocumentKeydown, false);
  };

  window.data.mapPin.addEventListener('click', window.onMapPinClick, false);

  window.data.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE && window.data.activeStatus === false) {
      window.startActiveMode();
    }
  });

  window.data.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.code === window.data.ENTER_KEY_CODE && window.data.activeStatus === false) {
      window.startActiveMode();
    }
  });

  window.data.typeInput.addEventListener('change', function () {
    window.createInputSettings();
  });

  window.data.timeInInput.addEventListener('change', function () {
    window.syncTimeIn();
  });

  window.data.timeOutInput.addEventListener('change', function () {
    window.syncTimeOut();
  });

  window.data.roomNumberInput.addEventListener('change', function () {
    window.establishLimitsOnRooms();
  });
})();


window.startPassiveMode();
