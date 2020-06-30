'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var mapPinDefaultLocationX = 570;
  var mapPinDefaultLocationY = 375;
  var template = document.querySelector('#pin').content;
  var templateMapPin = template.querySelector('.map__pin');
  var mapPinPhoto = template.querySelector('img');
  var mapPinMainWidth = window.utilData.mapPinMain.offsetWidth;
  var mapPinMainHeight = window.utilData.mapPinMain.offsetHeight;
  var mapPinMainLocationX = mapPinMainHeight / 2;
  var mapPinMainLocationY = mapPinMainWidth + 22;

  window.pin = {
    createMainPinLocation: function () {
      var mainPinLocationX = Math.round(mapPinMainLocationX + mapPinDefaultLocationX);
      var mainPinLocationY = Math.round(mapPinMainLocationY + mapPinDefaultLocationY);
      if (window.utilData.activeStatus) {
        mainPinLocationY = Math.round(mapPinMainLocationY + mapPinDefaultLocationY + window.utilData.MAP_PIN_TRIANGLE_HEIGHT);
      }
      window.utilData.addressInput.value = mainPinLocationX + ', ' + mainPinLocationY;
    },

    renderMapPins: function (hotels, count) {
      fragment = document.createDocumentFragment();
      if (count > window.utilData.HOTEL_COUNTER) {
        count = window.utilData.HOTEL_COUNTER;
      }
      for (var i = 0; i < count; i++) {
        var photoElement = mapPinPhoto.cloneNode(false);
        var element = templateMapPin.cloneNode(false);
        element.style.left = hotels[i].location.x + 'px';
        element.style.top = hotels[i].location.y + 'px';
        if (hotels[i].location.x > window.utilData.mapOverlay.offsetWidth -
          window.utilData.mapOverlay.offsetWidth / 100 * 5) {
          element.style.left = window.utilData.mapOverlay.offsetWidth - window.utilData.mapOverlay.offsetWidth / 100 * 5 + 'px';
        }
        if (hotels[i].location.x < 0) {
          element.style.left = window.utilData.MAP_SAFE_BORDER_ZONE + 'px';
        }
        if (hotels[i].location.y > window.utilData.mapOverlay.offsetHeight -
          window.utilData.mapOverlay.offsetHeight / 100 * 5) {
          element.style.top = window.utilData.mapOverlay.offsetHeight - window.utilData.mapOverlay.offsetHeight / 100 * 5 + 'px';
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

    deleteMapPins: function () {
      window.utilData.mapPin = document.querySelector('.map__pins');
      for (var j = 0; j < window.utilData.mapPin.children.length; j++) {
        if (window.utilData.mapPin.children[2]) {
          if (!window.utilData.mapPin.children[2].classList.contains('map__pin--main') &&
            window.utilData.mapPin.children[j].classList.contains('map__pin')) {
            window.utilData.mapPin.children[2].remove();
            j--;
          }
        }
      }
    }
  };
})();
