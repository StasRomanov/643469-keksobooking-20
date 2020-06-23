'use strict';

(function () {
  var mainBlock = document.body.querySelector('main');
  var header = mainBlock.querySelector('.promo');
  var errorTemplate = document.querySelector('#error');
  var successTemplate = document.querySelector('#success');
  var DATA_LINK = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 30000;
  var StatusCode = {
    ok: 200
  };

  var sendFormData = function (url, onSuccess, onError) {
    window.utilData.addressInput.removeAttribute('disabled');
    window.utilData.activeStatus = false;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', url);
    xhr.send(new FormData(window.utilData.formBlock));
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

  var renderErrorBlock = function () {
    window.utilData.fragment = document.createDocumentFragment();
    var errorBlock = errorTemplate.content.cloneNode(true);
    window.utilData.fragment.appendChild(errorBlock);
    mainBlock.insertBefore(window.utilData.fragment, header);
  };

  var renderSuccessBlock = function () {
    window.utilData.fragment = document.createDocumentFragment();
    var successBlock = successTemplate.content.cloneNode(true);
    window.utilData.fragment.appendChild(successBlock);
    mainBlock.insertBefore(window.utilData.fragment, header);
  };

  var onDocumentClick = function (evt) {
    if (evt.button === window.utilData.LEFT_MOUSE_CODE) {
      if (mainBlock.querySelector('.success')) {
        mainBlock.querySelector('.success').remove();
      } else {
        mainBlock.querySelector('.error').remove();
      }
      document.removeEventListener('click', onDocumentClick, false);
    }
  };

  var onDocumentKeydown = function (evt) {
    if (evt.code === window.utilData.ESC_KEY_CODE) {
      if (mainBlock.querySelector('.success')) {
        mainBlock.querySelector('.success').remove();
      } else {
        mainBlock.querySelector('.error').remove();
      }
      document.removeEventListener('keydown', onDocumentKeydown, false);
    }
  };

  var onSuccess = function () {
    window.utilData.addressInput.setAttribute('disabled', 'true');
    renderSuccessBlock();
    window.main.startPassiveMode();
    document.addEventListener('click', onDocumentClick, false);
    document.addEventListener('keydown', onDocumentKeydown, false);
  };

  var onError = function (message) {
    window.utilData.addressInput.setAttribute('disabled', 'true');
    renderErrorBlock();
    document.addEventListener('click', onDocumentClick, false);
    document.addEventListener('keydown', onDocumentKeydown, false);
    throw new Error('\n' + 'something wrong.' + '\n' + message + '\n' +
      'Please reload page or check your internet connection.');
  };

  window.onFormBlockSubmit = function (evt) {
    evt.preventDefault();
    sendFormData(DATA_LINK, onSuccess, onError);
  };

})();
