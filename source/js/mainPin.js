'use strict';

(function () {
  var safeZone = {
    bottom: 630,
    top: 130
  };

  window.onMainPinMove = function (evt) {
    var onMouseUp = function () {
      if (!window.data.activeStatus && !window.data.loadStatus) {
        window.main.dataLoader(true);
      } else {
        window.main.dataLoader(false);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.data.mapPinMain.style.left = (window.data.mapPinMain.offsetLeft - shift.x) + 'px';
        window.data.mapPinMain.style.top = (window.data.mapPinMain.offsetTop - shift.y) + 'px';
        window.data.addressInput.value = String(Math.round(window.data.mapPinMain.offsetLeft - shift.x + window.data.mapPinMain.offsetWidth / 2)) + ', '
        + String(window.data.mapPinMain.offsetTop - shift.y + window.data.mapPinMain.offsetHeight + window.data.MAP_PIN_TRIANGLE_HEIGHT);

        while (window.data.mapPinMain.offsetLeft + window.data.mapPinMain.offsetWidth >
        window.data.mapOverlay.offsetWidth) {
          window.data.mapPinMain.style.left = (window.data.mapPinMain.offsetLeft - window.data.MAP_SAFE_BORDER_ZONE) + 'px';
        }
        while (window.data.mapPinMain.offsetTop + window.data.mapPinMain.offsetHeight + window.data.MAP_PIN_TRIANGLE_HEIGHT >=
          safeZone.bottom) {
          window.data.mapPinMain.style.top = (window.data.mapPinMain.offsetTop - window.data.MAP_SAFE_BORDER_ZONE) + 'px';
        }
        while (window.data.mapPinMain.offsetLeft < 0) {
          window.data.mapPinMain.style.left = (window.data.mapPinMain.offsetLeft + window.data.MAP_SAFE_BORDER_ZONE) + 'px';
        }
        while (window.data.mapPinMain.offsetTop + window.data.mapPinMain.offsetHeight +
        window.data.MAP_PIN_TRIANGLE_HEIGHT <= safeZone.top) {
          window.data.mapPinMain.style.top = (window.data.mapPinMain.offsetTop + window.data.MAP_SAFE_BORDER_ZONE) + 'px';
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
})();
