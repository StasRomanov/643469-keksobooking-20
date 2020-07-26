'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var mainBlock = document.body.querySelector('main');
  var header = mainBlock.querySelector('.promo');
  var errorTemplate = document.querySelector('#error');
  var successTemplate = document.querySelector('#success');
  var reloadButton = null;

  var onDocumentClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      if (mainBlock.querySelector('.success')) {
        mainBlock.querySelector('.success').remove();
        window.serverInfo.successListener(false);
      } else if (mainBlock.querySelector('.error')) {
        mainBlock.querySelector('.error').remove();
        errorListener(false, reloadButton);
      }
    }
  };

  var onDocumentKeydown = function (evt) {
    if (evt.code === window.data.ESC_KEY_CODE) {
      if (mainBlock.querySelector('.success')) {
        mainBlock.querySelector('.success').remove();
        window.serverInfo.successListener(false);
      } else {
        mainBlock.querySelector('.error').remove();
        errorListener(false, reloadButton);
      }
    }
  };

  var onReloadButtonClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      if (mainBlock.querySelector('.success')) {
        mainBlock.querySelector('.success').remove();
        window.serverInfo.successListener(false);
      } else {
        mainBlock.querySelector('.error').remove();
        location.reload();
      }
    }
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

  window.serverInfo = {
    renderSuccessBlock: function () {
      var successBlock = successTemplate.content.cloneNode(true);
      fragment = document.createDocumentFragment();
      fragment.appendChild(successBlock);
      mainBlock.insertBefore(fragment, header);
    },

    successListener: function (toggle) {
      if (toggle) {
        document.addEventListener('click', onDocumentClick, false);
        document.addEventListener('keydown', onDocumentKeydown, false);
      } else {
        document.removeEventListener('click', onDocumentClick, false);
        document.removeEventListener('keydown', onDocumentKeydown, false);
      }
    },

    renderErrorBlock: function () {
      var errorBlock = errorTemplate.content.cloneNode(true);
      fragment = document.createDocumentFragment();
      fragment.appendChild(errorBlock);
      mainBlock.insertBefore(fragment, header);
      reloadButton = document.querySelector('.error__button');
      errorListener(true, reloadButton);
    }
  };
})();
