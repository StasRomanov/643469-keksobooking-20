'use strict';

(function () {
  window.map = {
    mapEnable: function () {
      window.utilData.map.classList.remove('map--faded');
      window.utilData.mapPinMain.addEventListener('mousedown', window.onMainPinMove, false);
    },
    mapDisable: function () {
      window.utilData.mapPin.addEventListener('click', window.map.onMapPinClick, false);
      window.utilData.mapPinMain.addEventListener('mousedown', function (evt) {
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
    onMapPinClick: function (evt) {
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
              window.card.renderHotelInfo(window.utilData.hotels[i]);
            }
          }
        }
      }
    }
  };
})();
