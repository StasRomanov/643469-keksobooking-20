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
        window.pictureUpload.disable();
        window.utilData.filterStatus = false;
      }
    },

    dataLoader: function (toggle) {
      if (toggle) {
        window.backend.load();
      } else if (window.utilData.hotels.length === 0 || !window.utilData.activeStatus) {
        window.main.startActiveMode();
      }
    }
  };

  window.main.startPassiveMode();
})();
