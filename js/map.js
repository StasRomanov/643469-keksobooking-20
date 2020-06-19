'use strict';

(function () {
  window.renderHotelType = function (type, textBlock) {
    textBlock.textContent = {
      palace: 'Дворец',
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом'
    }[type];
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
    var rooms = hotel.offer.rooms + ' ' + window.getWordDeclension(hotel.offer.rooms, window.data.ROOMS_DECLENSION) + ' для '
      + hotel.offer.guests + ' ' + window.getGuests(hotel.offer.guests, window.data.GUEST_DECLENSION);
    var time = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    window.data.fragment = document.createDocumentFragment();
    hotelHeaderBlock.textContent = hotel.offer.title;
    hotelAddressBlock.textContent = hotel.offer.address;
    hotelPriceBlock.textContent = hotel.offer.price;
    window.renderHotelType(hotel.offer.type, hotelTypeBlock);
    hotelRoomsBlock.textContent = rooms;
    hotelTimeBlock.textContent = time;
    hotelFeaturesBlock.innerHTML = '';
    renderHotelFeatures(hotel.offer.features, hotelFeaturesBlock);
    hotelDescriptionBlock.textContent = hotel.offer.description;
    renderHotelPhoto(hotel, hotelPhotosBlock, hotelPhotoBlock);
    hotelAvatarBlock.src = hotel.author.avatar;
    window.data.map.insertBefore(cloneCardTemplate, window.data.mapFiltersContainer);
    window.popupClose = document.querySelector('.popup__close');
    window.popupCard = document.querySelector('.popup');
    window.popupClose.addEventListener('click', window.onPopupCloseClick, false);
    window.popupClose.addEventListener('keydown', window.onPopupCloseKeydown, false);
    document.addEventListener('keydown', window.onDocumentKeydown, false);
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

  var removePopupListener = function () {
    window.popupClose.removeEventListener('click', window.onPopupCloseClick, false);
    window.popupClose.removeEventListener('keydown', window.onPopupCloseKeydown, false);
    document.removeEventListener('keydown', window.onDocumentKeydown, false);
  };

  window.onPopupCloseClick = function (evt) {
    removePopupListener();
    if (evt.button === window.data.LEFT_MOUSE_CODE && window.data.activeStatus === true) {
      window.data.map.removeChild(window.popupCard);
    }
  };

  window.onPopupCloseKeydown = function (evt) {
    removePopupListener();
    if (evt.code === window.data.ENTER_KEY_CODE && window.data.activeStatus === true) {
      window.data.map.removeChild(window.popupCard);
    }
  };

  window.onDocumentKeydown = function (evt) {
    removePopupListener();
    if (evt.code === window.data.ESC_KEY_CODE && window.data.activeStatus === true) {
      window.data.map.removeChild(window.popupCard);
    }
  };
})();
