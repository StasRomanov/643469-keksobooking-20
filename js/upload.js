'use strict';

(function () {
  var DATA_LINK = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 30000;

  var sendFormData = function (url, onSuccess) {
    window.utilData.activeStatus = false;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', url);
    xhr.send(new FormData(window.formBlock));
    xhr.addEventListener('load', function () {
      onSuccess();
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  var onSuccess = function () {
    console.log('okey');
    window.main.startPassiveMode();
  };

  window.submitHandler = function (evt) {
    sendFormData(DATA_LINK, onSuccess);
    evt.preventDefault();
  };

})();
