'use strict';

(function () {
  var DATA_LINK = 'https://javascript.pages.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    ok: 200
  };
  var JSON_TYPE = 'json';

  window.loadData = function (url, dataType, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = dataType;
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.ok) {
        window.utilData.hotels = xhr.response;
        onSuccess();
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  var onSuccess = function () {
    window.main.startPassiveMode();
  };

  var onError = function (message) {
    window.createAllHotelInfo();
    window.main.startPassiveMode();
    throw new Error('\n' + 'something wrong.' + '\n' + message + '\n' +
      'Please reload page or check your internet connection.' + '\n' + 'Local data will be used');
  };

  window.loadData(DATA_LINK, JSON_TYPE, onSuccess, onError);
})();
