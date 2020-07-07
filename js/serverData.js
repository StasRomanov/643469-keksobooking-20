'use strict';

(function () {
  var DATA_LINK = 'https://javascript.pages.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    ok: 200
  };
  var JSON_TYPE = 'json';

  var loadData = function (url, dataType, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = dataType;
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.ok) {
        window.utilData.hotels = xhr.response;
        onSuccess();
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  var onSuccess = function () {
    window.main.startPassiveMode();
  };

  var onError = function () {
    window.upload.renderErrorBlock();
  };

  loadData(DATA_LINK, JSON_TYPE, onSuccess, onError);
})();
