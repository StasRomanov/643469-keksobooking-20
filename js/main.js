'use strict';

(function () {
  var formHeader = document.querySelector('.ad-form-header');
  var form = document.querySelector('.ad-form');

  var startPassiveMode = function () {
    if (window.utilData.activeStatus === false) {
      formHeader.setAttribute('disabled', 'true');
      for (var i = 0; i < window.utilData.formsMain.length; i++) {
        window.utilData.formsMain[i].setAttribute('disabled', 'true');
      }
      window.establishLimitsOnRooms();
    }
  };

  window.startActiveMode = function () {
    window.utilData.activeStatus = true;
    for (var i = 0; i < window.utilData.formsMain.length; i++) {
      window.utilData.formsMain[i].removeAttribute('disabled');
    }
    formHeader.removeAttribute('disabled');
    window.renderMapPins();
    window.utilData.map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.createMainPinLocation();
  };

  startPassiveMode();
})();
