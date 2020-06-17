'use strict';

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
