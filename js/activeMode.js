'use strict';

(function () {
  var createMainPinLocation = function () {
    var mainPinLocationX = Math.round(window.data.mapPinMainLocationX + window.data.mapPinDefaultLocationX);
    var mainPinLocationY = Math.round(window.data.mapPinMainLocationY + window.data.mapPinDefaultLocationY);
    if (window.data.activeStatus) {
      mainPinLocationY = Math.round(window.data.mapPinMainLocationY + window.data.mapPinDefaultLocationY + window.data.MAP_PIN_TRIANGLE_HEIGHT);
    }
    window.data.addressInput.value = mainPinLocationX + ', ' + mainPinLocationY;
  };

  window.startActiveMode = function () {
    window.data.activeStatus = true;
    for (var i = 0; i < window.data.formsMain.length; i++) {
      window.data.formsMain[i].removeAttribute('disabled');
    }
    window.data.formHeader.removeAttribute('disabled');
    window.renderMapPins();
    window.data.map.classList.remove('map--faded');
    window.data.form.classList.remove('ad-form--disabled');
    createMainPinLocation();
  };
})();
