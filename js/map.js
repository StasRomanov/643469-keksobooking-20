'use strict';

(function () {
  var onMapPinClick = function (evt) {
    if (window.utilData.activeStatus) {
      var target = evt.target;
      if (target.tagName === 'IMG') {
        target = target.closest('button');
        if (target.classList.contains('map__pin--main')) {
          return;
        }
      }
      if (window.utilData.filterStatus) {
        if (target.tagName === 'BUTTON') {
          for (var i = 0; i < window.filterHotels.length; i++) {
            if (String(i) === target.getAttribute('data-id')) {
              window.card.renderHotelInfo(window.filterHotels[i]);
            }
          }
        }
      } else {
        for (var j = 0; j < window.utilData.hotels.length; j++) {
          if (String(j) === target.getAttribute('data-id')) {
            window.card.renderHotelInfo(window.utilData.hotels[j]);
          }
        }
      }
    }
  };

  window.map = {
    mapEnable: function () {
      window.utilData.map.classList.remove('map--faded');
    },
    mapDisable: function () {
      window.utilData.map.classList.add('map--faded');
      window.utilData.mapPinMain.addEventListener('mousedown', window.onMainPinMove, false);
      window.card.deleteHotelCard();
      window.utilData.mapPin.addEventListener('click', onMapPinClick, false);
      window.utilData.mapPinMain.addEventListener('mouseup', function (evt) {
        if (evt.button === window.utilData.LEFT_MOUSE_CODE && window.utilData.activeStatus === false) {
          window.main.startActiveMode();
        }
      });

      window.utilData.mapPinMain.addEventListener('keydown', function (evt) {
        if (evt.code === window.utilData.ENTER_KEY_CODE && window.utilData.activeStatus === false) {
          window.main.startActiveMode();
        }
      });
    },
  };
})();
