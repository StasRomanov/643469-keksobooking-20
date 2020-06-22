'use strict';

(function () {
  var passiveMode = function () {

  };

  window.sendFormData = function (evt) {
    evt.preventDefault();
    window.utilData.activeStatus = false;
    window.main.startPassiveMode();
  };
})();
