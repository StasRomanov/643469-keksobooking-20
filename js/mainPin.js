'use strict';

(function () {
  var safeZone = {
    bottom: 630,
    top: 130
  };

  window.onMainPinMove = function (evt) {
    var onMouseUp = function () {
      if (!window.utilData.activeStatus && !window.utilData.loadStatus) {
        window.serverData.load(true);
      } else {
        window.serverData.load(false);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (evt.button === window.utilData.LEFT_MOUSE_CODE) {
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

        window.utilData.mapPinMain.style.left = (window.utilData.mapPinMain.offsetLeft - shift.x) + 'px';
        window.utilData.mapPinMain.style.top = (window.utilData.mapPinMain.offsetTop - shift.y) + 'px';
        window.utilData.addressInput.value = String(Math.round(window.utilData.mapPinMain.offsetLeft - shift.x + window.utilData.mapPinMain.offsetWidth / 2)) + ', '
        + String(window.utilData.mapPinMain.offsetTop - shift.y + window.utilData.mapPinMain.offsetHeight + window.utilData.MAP_PIN_TRIANGLE_HEIGHT);

        while (window.utilData.mapPinMain.offsetLeft + window.utilData.mapPinMain.offsetWidth >
        window.utilData.mapOverlay.offsetWidth) {
          window.utilData.mapPinMain.style.left = (window.utilData.mapPinMain.offsetLeft - window.utilData.MAP_SAFE_BORDER_ZONE) + 'px';
        }
        while (window.utilData.mapPinMain.offsetTop + window.utilData.mapPinMain.offsetHeight + window.utilData.MAP_PIN_TRIANGLE_HEIGHT >=
          safeZone.bottom) {
          window.utilData.mapPinMain.style.top = (window.utilData.mapPinMain.offsetTop - window.utilData.MAP_SAFE_BORDER_ZONE) + 'px';
        }
        while (window.utilData.mapPinMain.offsetLeft < 0) {
          window.utilData.mapPinMain.style.left = (window.utilData.mapPinMain.offsetLeft + window.utilData.MAP_SAFE_BORDER_ZONE) + 'px';
        }
        while (window.utilData.mapPinMain.offsetTop + window.utilData.mapPinMain.offsetHeight +
        window.utilData.MAP_PIN_TRIANGLE_HEIGHT <= safeZone.top) {
          window.utilData.mapPinMain.style.top = (window.utilData.mapPinMain.offsetTop + window.utilData.MAP_SAFE_BORDER_ZONE) + 'px';
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
})();
