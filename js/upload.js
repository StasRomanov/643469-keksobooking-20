'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var mainBlock = document.body.querySelector('main');
  var header = mainBlock.querySelector('.promo');
  var errorTemplate = document.querySelector('#error');
  var successTemplate = document.querySelector('#success');
  var DATA_LINK = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 30000;
  var statusCodeOk = 200;

  var sendFormData = function (url, onSuccess, onError) {
    window.utilData.addressInput.removeAttribute('disabled');
    window.utilData.activeStatus = false;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', url);
    xhr.send(new FormData(window.utilData.formBlock));
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCodeOk) {
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
    var successBlock = successTemplate.content.cloneNode(true);
    fragment = document.createDocumentFragment();
    fragment.appendChild(successBlock);
    mainBlock.insertBefore(fragment, header);
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
    window.upload.renderErrorBlock();
  };

  window.upload = {
    onFormBlockSubmit: function (evt) {
      evt.preventDefault();
      sendFormData(DATA_LINK, onSuccess, onError);
    },

    renderErrorBlock: function () {
      var errorBlock = errorTemplate.content.cloneNode(true);
      var reloadButton = document.querySelector('.error__button');
      fragment = document.createDocumentFragment();
      fragment.appendChild(errorBlock);
      mainBlock.insertBefore(fragment, header);
      reloadButton.addEventListener('click', onReloadButtonClick, false);
      document.addEventListener('click', onDocumentClick, false);
      document.addEventListener('keydown', onDocumentKeydown, false);
    }
  };
})();
