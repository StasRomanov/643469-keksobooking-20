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
          window.filterHotels.forEach(function (item, index) {
            if (String(index) === target.getAttribute('data-id')) {
              window.card.render(item);
            }
          });
        }
      } else {
        window.utilData.hotels.forEach(function (item, index) {
          if (String(index) === target.getAttribute('data-id')) {
            window.card.render(item);
          }
        });
      }
    }
  };

  window.map = {
    enable: function () {
      window.utilData.map.classList.remove('map--faded');
    },
    disable: function () {
      window.utilData.map.classList.add('map--faded');
      window.utilData.mapPinMain.addEventListener('mousedown', window.onMainPinMove, false);
      window.card.delete();
      window.utilData.mapPin.addEventListener('click', onMapPinClick, false);

      window.utilData.mapPinMain.addEventListener('keydown', function (evt) {
        if (evt.code === window.utilData.ENTER_KEY_CODE && window.utilData.activeStatus === false) {
          // window.main.startActiveMode();
          if (!window.utilData.loadStatus) {
            window.main.dataLoader(true);
          } else {
            window.main.dataLoader(false);
          }
        }
      });
    },
  };
})();
