'use strict';

(function () {
  window.main = {
    startActiveMode: function () {
      window.utilData.activeStatus = true;
      window.form.enable();
      window.pin.render(window.utilData.hotels, window.utilData.HOTEL_COUNTER);
      window.map.enable();
      window.pin.createLocation();
    },
    startPassiveMode: function () {
      if (window.utilData.activeStatus === false) {
        window.form.disable();
        window.map.disable();
        window.pin.delete();
        window.utilData.filterStatus = false;
      }
    }
  };
})();
