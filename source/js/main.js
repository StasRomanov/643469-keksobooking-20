'use strict';

(function () {
  window.main = {
    startActiveMode: function () {
      window.data.activeStatus = true;
      window.form.enable();
      window.pin.render(window.data.hotels, window.data.HOTEL_COUNTER);
      window.map.enable();
      window.pin.createLocation();
    },

    startPassiveMode: function () {
      if (window.data.activeStatus === false) {
        window.form.disable();
        window.map.disable();
        window.pin.delete();
        window.pictureUpload.disable();
        window.data.filterStatus = false;
      }
    },

    dataLoader: function (toggle) {
      if (toggle) {
        window.backend.load();
      } else if (window.data.hotels.length === 0 || !window.data.activeStatus) {
        window.main.startActiveMode();
      }
    }
  };

  window.main.startPassiveMode();
})();
