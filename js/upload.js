'use strict';

(function () {
  var DATA_LINK = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 30000;
  var StatusCode = {
    ok: 200
  };

  var sendFormData = function (url, onSuccess, onError) {
    window.utilData.activeStatus = false;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', url);
    xhr.send(new FormData(window.formBlock));
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.ok) {
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
    console.log('okey');
    window.main.startPassiveMode();
  };

  var onError = function (message) {
    throw new Error('\n' + 'something wrong.' + '\n' + message + '\n' +
      'Please reload page or check your internet connection.');
  };

  window.submitHandler = function (evt) {
    evt.preventDefault();
    sendFormData(DATA_LINK, onSuccess, onError);
  };

})();
