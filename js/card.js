'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.cloneNode(true);
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var card = document.querySelector('.popup');
  var onPopupCloseClick = function (evt) {
    removePopupListener();
    if (evt.button === window.utilData.LEFT_MOUSE_CODE && window.utilData.activeStatus === true) {
      window.utilData.map.removeChild(window.popupCard);
    }
  };

  var onPopupCloseKeydown = function (evt) {
    removePopupListener();
    if (evt.code === window.utilData.ENTER_KEY_CODE && window.utilData.activeStatus === true) {
      window.utilData.map.removeChild(window.popupCard);
    }
  };

  var onDocumentKeydown = function (evt) {
    removePopupListener();
    if (evt.code === window.utilData.ESC_KEY_CODE && window.utilData.activeStatus === true) {
      window.utilData.map.removeChild(window.popupCard);
    }
  };

  var removePopupListener = function () {
    window.popupClose.removeEventListener('click', onPopupCloseClick, false);
    window.popupClose.removeEventListener('keydown', onPopupCloseKeydown, false);
    document.removeEventListener('keydown', onDocumentKeydown, false);
  };

  window.card = {
    getWordDeclension: function (n, textForms) {
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
    },

    getGuests: function (hotelGuests) {
      if (hotelGuests === 1 || hotelGuests === 21) {
        return ' гостя.';
      } else {
        return ' гостей.';
      }
    },

    renderHotelType: function (type, textBlock) {
      textBlock.textContent = {
        palace: 'Дворец',
        flat: 'Квартира',
        bungalo: 'Бунгало',
        house: 'Дом'
      }[type];
    },

    renderHotelFeatures: function (features, featuresBlock) {
      window.utilData.fragment = document.createDocumentFragment();
      for (var i = 0; i < features.length; i++) {
        var listItem = document.createElement('li');
        listItem.classList.add('popup__feature');
        listItem.classList.add('popup__feature--' + features[i]);
        listItem.textContent = features[i];
        window.utilData.fragment.appendChild(listItem);
      }
      featuresBlock.appendChild(window.utilData.fragment);
    },

    renderHotelPhoto: function (hotel, photosBlock, photo) {
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
    },

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
      var rooms = hotel.offer.rooms + ' ' + window.card.getWordDeclension(hotel.offer.rooms, window.utilData.ROOMS_DECLENSION) + ' для '
        + hotel.offer.guests + ' ' + window.card.getGuests(hotel.offer.guests, window.utilData.GUESTS_DECLENSION);
      var time = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
      if (card) {
        card.remove();
      }
      window.utilData.fragment = document.createDocumentFragment();
      hotelHeaderBlock.textContent = hotel.offer.title;
      hotelAddressBlock.textContent = hotel.offer.address;
      hotelPriceBlock.textContent = hotel.offer.price;
      window.card.renderHotelType(hotel.offer.type, hotelTypeBlock);
      hotelRoomsBlock.textContent = rooms;
      hotelTimeBlock.textContent = time;
      hotelFeaturesBlock.innerHTML = '';
      window.card.renderHotelFeatures(hotel.offer.features, hotelFeaturesBlock);
      hotelDescriptionBlock.textContent = hotel.offer.description;
      window.card.renderHotelPhoto(hotel, hotelPhotosBlock, hotelPhotoBlock);
      hotelAvatarBlock.src = hotel.author.avatar;
      window.utilData.map.insertBefore(cloneCardTemplate, mapFiltersContainer);
      window.popupClose = document.querySelector('.popup__close');
      window.popupCard = document.querySelector('.popup');
      window.popupClose.addEventListener('click', onPopupCloseClick, false);
      window.popupClose.addEventListener('keydown', onPopupCloseKeydown, false);
      document.addEventListener('keydown', onDocumentKeydown, false);
    },
    deleteHotelCard: function () {
      if (window.popupClose) {
        window.utilData.map = document.querySelector('.map');
        window.utilData.map.removeChild(window.popupCard);
        window.popupClose.removeEventListener('click', onPopupCloseClick, false);
        window.popupClose.removeEventListener('keydown', onPopupCloseKeydown, false);
        document.removeEventListener('keydown', onDocumentKeydown, false);
      }
    }
  };
})();
