'use strict';

(function () {
  var MAP_PIN_DEFAULT_LOCATION_X = 570;
  var MAP_PIN_DEFAULT_LOCATION_Y = 375;
  var MAP_SAFE_ZONE_WIDTH = window.utilData.mapOverlay.offsetWidth / 100 * 5;
  var MAP_SAFE_ZONE_HEIGHT = window.utilData.mapOverlay.offsetHeight / 100 * 5;
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#pin').content;
  var templateMapPin = template.querySelector('.map__pin');
  var mapPinPhoto = template.querySelector('img');
  var mapPinMainWidth = window.utilData.mapPinMain.offsetWidth;
  var mapPinMainHeight = window.utilData.mapPinMain.offsetHeight;
  var mapPinMainLocationX = mapPinMainHeight / 2;
  var mapPinMainLocationY = mapPinMainWidth + 22;

  window.pin = {
    createLocation: function () {
      var mainPinLocationX = Math.round(mapPinMainLocationX + MAP_PIN_DEFAULT_LOCATION_X);
      var mainPinLocationY = Math.round(mapPinMainLocationY + MAP_PIN_DEFAULT_LOCATION_Y);
      if (window.utilData.activeStatus) {
        mainPinLocationY = Math.round(mapPinMainLocationY + MAP_PIN_DEFAULT_LOCATION_Y + window.utilData.MAP_PIN_TRIANGLE_HEIGHT);
      }
      window.utilData.addressInput.value = mainPinLocationX + ', ' + mainPinLocationY;
    },

    render: function (hotels, count) {
      fragment = document.createDocumentFragment();
      if (count > window.utilData.HOTEL_COUNTER) {
        count = window.utilData.HOTEL_COUNTER;
      }
      for (var i = 0; i < count; i++) {
        var photoElement = mapPinPhoto.cloneNode(false);
        var element = templateMapPin.cloneNode(false);
        element.style.left = hotels[i].location.x + 'px';
        element.style.top = hotels[i].location.y + 'px';
        if (hotels[i].location.x > window.utilData.mapOverlay.offsetWidth - MAP_SAFE_ZONE_WIDTH) {
          element.style.left = window.utilData.mapOverlay.offsetWidth - MAP_SAFE_ZONE_WIDTH + 'px';
        }
        if (hotels[i].location.x < 0) {
          element.style.left = window.utilData.MAP_SAFE_BORDER_ZONE + 'px';
        }
        if (hotels[i].location.y > window.utilData.mapOverlay.offsetHeight - MAP_SAFE_ZONE_HEIGHT) {
          element.style.top = window.utilData.mapOverlay.offsetHeight - MAP_SAFE_ZONE_HEIGHT + 'px';
        }
        if (hotels[i].location.y < 0) {
          element.style.top = window.utilData.MAP_SAFE_BORDER_ZONE + 'px';
        }
        photoElement.src = hotels[i].author.avatar;
        element.setAttribute('data-id', i);
        element.appendChild(photoElement);
        fragment.appendChild(element);
      }
      window.utilData.mapPin.appendChild(fragment);
    },

    delete: function () {
      while (document.querySelector('.map__pin:not(.map__pin--main)')) {
        var currentPin = document.querySelector('.map__pin:not(.map__pin--main)');
        currentPin.remove();
      }
    }
  };
})();
