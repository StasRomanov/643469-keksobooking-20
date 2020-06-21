'use strict';

(function () {
  var mapPinDefaultLocationX = 570;
  var template = document.querySelector('#pin').content;
  var templateMapPin = template.querySelector('.map__pin');
  var mapPinPhoto = template.querySelector('img');
  var mapPinMainWidth = window.utilData.mapPinMain.offsetWidth;
  var mapPinMainHeight = window.utilData.mapPinMain.offsetHeight;
  var mapPinMainLocationX = mapPinMainHeight / 2;
  var mapPinMainLocationY = mapPinMainWidth + 22;
  var mapPinDefaultLocationY = 375;

  window.createMainPinLocation = function () {
    var mainPinLocationX = Math.round(mapPinMainLocationX + mapPinDefaultLocationX);
    var mainPinLocationY = Math.round(mapPinMainLocationY + mapPinDefaultLocationY);
    if (window.utilData.activeStatus) {
      mainPinLocationY = Math.round(mapPinMainLocationY + mapPinDefaultLocationY + window.utilData.MAP_PIN_TRIANGLE_HEIGHT);
    }
    window.utilData.addressInput.value = mainPinLocationX + ', ' + mainPinLocationY;
  };

  window.renderMapPins = function () {
    window.utilData.fragment = document.createDocumentFragment();
    window.createAllHotelInfo();
    for (var i = 0; i < window.utilData.HOTEL_COUNTER; i++) {
      var photoElement = mapPinPhoto.cloneNode(false);
      var element = templateMapPin.cloneNode(false);
      element.style.left = window.utilData.hotels[i].location.x + 'px';
      element.style.top = window.utilData.hotels[i].location.y + 'px';
      photoElement.src = window.utilData.hotels[i].author.avatar;
      element.setAttribute('data-id', i);
      element.appendChild(photoElement);
      window.utilData.fragment.appendChild(element);
    }
    window.utilData.mapPin.appendChild(window.utilData.fragment);
  };
})();

(function () {
  window.utilData.mapPin.addEventListener('click', window.onMapPinClick, false);

  window.utilData.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.utilData.LEFT_MOUSE_CODE && window.utilData.activeStatus === false) {
      window.startActiveMode();
    }
  });

  window.utilData.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.code === window.utilData.ENTER_KEY_CODE && window.utilData.activeStatus === false) {
      window.startActiveMode();
    }
  });
})();
