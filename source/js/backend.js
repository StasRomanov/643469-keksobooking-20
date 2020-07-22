'use strict';

(function () {
  var DATA_LINK_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var DATA_LINK_SEND = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var STATUS_CODE_OK = 200;
  var JSON_TYPE = 'json';

  var serverData = function (url, onSuccess, onError, method, send) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = JSON_TYPE;
    xhr.open(method, url);
    xhr.send(send);
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

  var onSuccessLoad = function (data) {
    if (window.utilData.hotels.length === 0) {
      window.utilData.hotels = data;
    }
    window.main.startActiveMode();
  };

  var onErrorLoad = function () {
    window.serverInfo.renderErrorBlock();
  };

  var onSuccessSend = function () {
    window.utilData.loadStatus = true;
    window.utilData.addressInput.setAttribute('disabled', 'true');
    window.serverInfo.renderSuccessBlock();
    window.main.startPassiveMode();
    window.serverInfo.successListener(true);
  };

  var onErrorSend = function () {
    window.utilData.addressInput.setAttribute('disabled', 'true');
    window.serverInfo.renderErrorBlock();
  };

  window.backend = {
    load: function () {
      serverData(DATA_LINK_LOAD, onSuccessLoad, onErrorLoad, 'GET', '');
    },

    send: function (evt) {
      evt.preventDefault();
      window.utilData.addressInput.removeAttribute('disabled');
      window.utilData.activeStatus = false;
      serverData(DATA_LINK_SEND, onSuccessSend, onErrorSend, 'POST', new FormData(window.utilData.formBlock));
    }
  };
})();
