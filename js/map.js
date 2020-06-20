'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.cloneNode(true);
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var renderHotelInfo = function (hotel) {
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
      + hotel.offer.guests + ' ' + window.card.getGuests(hotel.offer.guests, window.utilData.GUEST_DECLENSION);
    var time = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
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
  };

  window.onMapPinClick = function (evt) {
    if (window.utilData.activeStatus) {
      var target = evt.target;
      if (target.tagName === 'IMG') {
        target = target.closest('button');
        if (target.classList.contains('map__pin--main')) {
          return;
        }
      }
      if (target.tagName === 'BUTTON') {
        for (var i = 0; i < window.utilData.hotels.length; i++) {
          if (String(i) === target.getAttribute('data-id')) {
            renderHotelInfo(window.utilData.hotels[i]);
          }
        }
      }
    }
  };

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
})();
