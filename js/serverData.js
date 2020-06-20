'use strict';

(function () {
  var DATA_LINK = 'https://javascript.pages.academy/keksobooking/data';

  window.load = function (url, callBack) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {
      window.utilData.hotels = xhr.response;
      callBack();
    });
  };

  var callBack = function () {
    window.main.startPassiveMode();
  };

  window.load(DATA_LINK, callBack);
})();
