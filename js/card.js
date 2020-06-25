'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.cloneNode(true);
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var popupClose = null;
  var popupCard = null;
  var onPopupCloseClick = function (evt) {
    removePopupListener();
    if (evt.button === window.utilData.LEFT_MOUSE_CODE && window.utilData.activeStatus === true) {
      window.utilData.map.removeChild(popupCard);
    }
  };

  var onPopupCloseKeydown = function (evt) {
    removePopupListener();
    if (evt.code === window.utilData.ENTER_KEY_CODE && window.utilData.activeStatus === true) {
      window.utilData.map.removeChild(popupCard);
    }
  };

  var onDocumentKeydown = function (evt) {
    removePopupListener();
    if (evt.code === window.utilData.ESC_KEY_CODE && window.utilData.activeStatus === true) {
      window.utilData.map.removeChild(popupCard);
    }
  };

  var removePopupListener = function () {
    popupClose.removeEventListener('click', onPopupCloseClick, false);
    popupClose.removeEventListener('keydown', onPopupCloseKeydown, false);
    document.removeEventListener('keydown', onDocumentKeydown, false);
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

  var renderHotelType = function (type, textBlock) {
    textBlock.textContent = {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом'
    }[type];
  };

  var renderHotelFeatures = function (features, featuresBlock) {
    window.utilData.fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature');
      listItem.classList.add('popup__feature--' + features[i]);
      listItem.textContent = features[i];
      window.utilData.fragment.appendChild(listItem);
    }
    featuresBlock.appendChild(window.utilData.fragment);
  };

  var renderHotelPhoto = function (hotel, photosBlock, photo) {
    window.utilData.fragment = document.createDocumentFragment();
    for (var i = 0; i < hotel.offer.photos.length; i++) {
      while (photosBlock.firstChild) {
        photosBlock.removeChild(photosBlock.firstChild);
      }
      var img = photo.cloneNode(false);
      img.src = hotel.offer.photos[i];
      window.utilData.fragment.appendChild(img);
    }
    photosBlock.appendChild(window.utilData.fragment);
  };

  window.card = {
    renderHotelInfo: function (hotel) {
      var cloneCardTemplate = cardTemplate.cloneNode(true);
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
      var card = document.querySelector('.popup');
      var rooms = hotel.offer.rooms + ' ' + getWordDeclension(hotel.offer.rooms, window.utilData.ROOMS_DECLENSION) + ' для '
        + hotel.offer.guests + ' ' + getGuests(hotel.offer.guests, window.utilData.GUESTS_DECLENSION);
      var time = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
      if (card) {
        card.remove();
      }
      window.utilData.fragment = document.createDocumentFragment();
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
      window.utilData.map.insertBefore(cloneCardTemplate, mapFiltersContainer);
      popupClose = document.querySelector('.popup__close');
      popupCard = document.querySelector('.popup');
      popupClose.addEventListener('click', onPopupCloseClick, false);
      popupClose.addEventListener('keydown', onPopupCloseKeydown, false);
      document.addEventListener('keydown', onDocumentKeydown, false);
    },
    deleteHotelCard: function () {
      if (popupClose !== null) {
        window.utilData.map = document.querySelector('.map');
        window.utilData.map.removeChild(popupCard);
        popupClose.removeEventListener('click', onPopupCloseClick, false);
        popupClose.removeEventListener('keydown', onPopupCloseKeydown, false);
        document.removeEventListener('keydown', onDocumentKeydown, false);
      }
    }
  };
})();
