'use strict';

(function () {
  var DATA_LINK_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var DATA_LINK_SEND = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var STATUS_CODE_OK = 200;
  var JSON_TYPE = 'json';
  var fragment = document.createDocumentFragment();
  var mainBlock = document.body.querySelector('main');
  var header = mainBlock.querySelector('.promo');
  var errorTemplate = document.querySelector('#error');
  var successTemplate = document.querySelector('#success');
  var reloadButton = null;

  var serverData = function (url, dataType, onSuccess, onError, method, send) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = dataType;
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
    window.upload.renderErrorBlock();
  };

  var renderSuccessBlock = function () {
    var successBlock = successTemplate.content.cloneNode(true);
    fragment = document.createDocumentFragment();
    fragment.appendChild(successBlock);
    mainBlock.insertBefore(fragment, header);
  };

  var onDocumentClick = function (evt) {
    if (evt.button === window.utilData.LEFT_MOUSE_CODE) {
      if (mainBlock.querySelector('.success')) {
        mainBlock.querySelector('.success').remove();
        successListener(false);
      } else if (mainBlock.querySelector('.error')) {
        mainBlock.querySelector('.error').remove();
        errorListener(false, reloadButton);
      }
    }
  };

  var onDocumentKeydown = function (evt) {
    if (evt.code === window.utilData.ESC_KEY_CODE) {
      if (mainBlock.querySelector('.success')) {
        mainBlock.querySelector('.success').remove();
        successListener(false);
      } else {
        mainBlock.querySelector('.error').remove();
        errorListener(false, reloadButton);
      }
    }
  };

  var onReloadButtonClick = function (evt) {
    if (evt.button === window.utilData.LEFT_MOUSE_CODE) {
      if (mainBlock.querySelector('.success')) {
        mainBlock.querySelector('.success').remove();
        successListener(false);
      } else {
        mainBlock.querySelector('.error').remove();
        location.reload();
      }
    }
  };

  var onSuccessSend = function () {
    window.utilData.addressInput.setAttribute('disabled', 'true');
    renderSuccessBlock();
    window.main.startPassiveMode();
    successListener(true);
  };

  var onErrorSend = function () {
    window.utilData.addressInput.setAttribute('disabled', 'true');
    window.upload.renderErrorBlock();
  };

  var errorListener = function (toggle, element) {
    if (toggle) {
      element.addEventListener('click', onReloadButtonClick, false);
      document.addEventListener('click', onDocumentClick, false);
      document.addEventListener('keydown', onDocumentKeydown, false);
    } else {
      element.removeEventListener('click', onReloadButtonClick, false);
      document.removeEventListener('click', onDocumentClick, false);
      document.removeEventListener('keydown', onDocumentKeydown, false);
    }
  };

  var successListener = function (toggle) {
    if (toggle) {
      document.addEventListener('click', onDocumentClick, false);
      document.addEventListener('keydown', onDocumentKeydown, false);
    } else {
      document.removeEventListener('click', onDocumentClick, false);
      document.removeEventListener('keydown', onDocumentKeydown, false);
    }
  };

  window.backend = {
    load: function () {
      window.utilData.loadStatus = true;
      serverData(DATA_LINK_LOAD, JSON_TYPE, onSuccessLoad, onErrorLoad, 'GET', '');
    },

    send: function (evt) {
      evt.preventDefault();
      window.utilData.addressInput.removeAttribute('disabled');
      window.utilData.activeStatus = false;
      serverData(DATA_LINK_SEND, JSON_TYPE, onSuccessSend, onErrorSend, 'POST', new FormData(window.utilData.formBlock));
    },

    renderErrorBlock: function () {
      var errorBlock = errorTemplate.content.cloneNode(true);
      reloadButton = document.querySelector('.error__button');
      fragment = document.createDocumentFragment();
      fragment.appendChild(errorBlock);
      mainBlock.insertBefore(fragment, header);
      errorListener(true, reloadButton);
    }
  };

  // window.upload = {
  //   onFormBlockSubmit: function (evt) {
  //     evt.preventDefault();
  //     sendFormData(DATA_LINK, onSuccess, onError);
  //   }
  // };
})();
