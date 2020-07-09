'use strict';

(function () {
  var DATA_LINK = 'https://javascript.pages.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;
  var STATUS_CODE_OK = 200;
  var JSON_TYPE = 'json';

  var loadData = function (url, dataType, onSuccess, onError) {
    window.utilData.loadStatus = true;
    var xhr = new XMLHttpRequest();
    xhr.responseType = dataType;
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
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

  var onSuccess = function (data) {
    if (window.utilData.hotels.length === 0) {
      window.utilData.hotels = data;
    }
    window.main.startActiveMode();
  };

  var onError = function () {
    window.upload.renderErrorBlock();
  };

  window.serverData = {
    load: function () {
      loadData(DATA_LINK, JSON_TYPE, onSuccess, onError);
    }
  };
})();
