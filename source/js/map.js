'use strict';

(function () {
  var onMapPinClick = function (evt) {
    if (window.data.activeStatus) {
      var target = evt.target;
      if (target.tagName === 'IMG') {
        target = target.closest('button');
        if (target.classList.contains('map__pin--main')) {
          return;
        }
      }
      if (window.data.filterStatus) {
        if (target.tagName === 'BUTTON') {
          window.filterHotels.forEach(function (item, index) {
            if (String(index) === target.getAttribute('data-id')) {
              window.card.render(item);
            }
          });
        }
      } else {
        window.data.hotels.forEach(function (item, index) {
          if (String(index) === target.getAttribute('data-id')) {
            window.card.render(item);
          }
        });
      }
    }
  };

  window.map = {
    enable: function () {
      window.data.map.classList.remove('map--faded');
    },
    disable: function () {
      window.data.map.classList.add('map--faded');
      window.data.mapPinMain.addEventListener('mousedown', window.onMainPinMove, false);
      window.card.delete();
      window.data.mapPin.addEventListener('click', onMapPinClick, false);

      window.data.mapPinMain.addEventListener('keydown', function (evt) {
        if (evt.code === window.data.ENTER_KEY_CODE && window.data.activeStatus === false) {
          if (!window.data.loadStatus) {
            window.main.dataLoader(true);
          } else {
            window.main.dataLoader(false);
          }
        }
      });
    },
  };
})();
