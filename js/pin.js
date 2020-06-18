'use strict';

(function () {
  window.createMainPinLocation = function () {
    var mainPinLocationX = Math.round(window.data.mapPinMainLocationX + window.data.mapPinDefaultLocationX);
    var mainPinLocationY = Math.round(window.data.mapPinMainLocationY + window.data.mapPinDefaultLocationY);
    if (window.data.activeStatus) {
      mainPinLocationY = Math.round(window.data.mapPinMainLocationY + window.data.mapPinDefaultLocationY + window.data.MAP_PIN_TRIANGLE_HEIGHT);
    }
    window.data.addressInput.value = mainPinLocationX + ', ' + mainPinLocationY;
  };

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
})();

(function () {
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
})();
