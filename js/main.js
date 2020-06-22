'use strict';

(function () {
  window.main = {
    startActiveMode: function () {
      window.utilData.activeStatus = true;
      window.form.formEnable();
      window.pin.renderMapPins();
      window.map.mapEnable();
      window.pin.createMainPinLocation();
    },
    startPassiveMode: function () {
      if (window.utilData.activeStatus === false) {
        window.form.formDisable();
        window.map.mapDisable();
        window.pin.deleteMapPins();
      }
    }
  };
})();
