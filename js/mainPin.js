'use strict';

(function () {
  window.onMainPinMove = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE && window.data.activeStatus) {
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
        window.data.addressInput.value = String(window.data.mapPinMain.offsetLeft - shift.x + window.data.mapPinMain.offsetWidth / 2) + ' '
          + String(window.data.mapPinMain.offsetTop - shift.y + window.data.mapPinMain.offsetHeight + window.data.MAP_PIN_TRIANGLE_HEIGHT);

        if (window.data.mapPinMain.offsetLeft - shift.x + window.data.mapPinMain.offsetWidth >
          window.data.mapOverlay.offsetWidth) {
          onMouseUp();
          window.data.mapPinMain.style.left = (window.data.mapPinMain.offsetLeft - shift.x - 10) + 'px';
        }
        if (window.data.mapPinMain.offsetTop - shift.y + window.data.mapPinMain.offsetHeight + window.data.MAP_PIN_TRIANGLE_HEIGHT >
          window.data.mapOverlay.offsetHeight) {
          onMouseUp();
          window.data.mapPinMain.style.top = (window.data.mapPinMain.offsetTop - shift.y - 10) + 'px';
        }
        if (window.data.mapPinMain.offsetLeft - shift.x < 0) {
          onMouseUp();
          window.data.mapPinMain.style.left = (window.data.mapPinMain.offsetLeft - shift.x + 10) + 'px';
        }
        if (window.data.mapPinMain.offsetTop - shift.y - window.data.SKY_HEIGHT + window.data.mapPinMain.offsetHeight +
          window.data.MAP_PIN_TRIANGLE_HEIGHT < 0) {
          onMouseUp();
          window.data.mapPinMain.style.top = (window.data.mapPinMain.offsetTop - shift.y + 10) + 'px';
        }
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
})();
