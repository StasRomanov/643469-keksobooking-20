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
      } else if (mainBlock.querySelector('.error')) {
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

  var onReloadButtonClick = function (evt) {
    if (evt.button === window.utilData.LEFT_MOUSE_CODE) {
      if (mainBlock.querySelector('.success')) {
        mainBlock.querySelector('.success').remove();
      } else {
        mainBlock.querySelector('.error').remove();
        location.reload();
      }
      document.removeEventListener('click', onDocumentClick, false);
    }
  };

  var onSuccess = function () {
    window.utilData.addressInput.setAttribute('disabled', 'true');
    renderSuccessBlock();
    window.main.startPassiveMode();
    document.addEventListener('click', onDocumentClick, false);
    document.addEventListener('keydown', onDocumentKeydown, false);
  };

  var onError = function () {
    window.utilData.addressInput.setAttribute('disabled', 'true');
    window.renderErrorBlock();
  };

  window.onFormBlockSubmit = function (evt) {
    evt.preventDefault();
    sendFormData(DATA_LINK, onSuccess, onError);
  };

  window.renderErrorBlock = function () {
    window.utilData.fragment = document.createDocumentFragment();
    var errorBlock = errorTemplate.content.cloneNode(true);
    window.utilData.fragment.appendChild(errorBlock);
    mainBlock.insertBefore(window.utilData.fragment, header);
    var reloadButton = document.querySelector('.error__button');
    reloadButton.addEventListener('click', onReloadButtonClick, false);
    document.addEventListener('click', onDocumentClick, false);
    document.addEventListener('keydown', onDocumentKeydown, false);
  };

})();
