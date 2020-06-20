'use strict';

(function () {
  var DATA_LINK = 'https://javascript.pages.academy/keksobooking/data';

  window.load = function (url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {
      window.utilData.hotels = xhr.response;
      console.log(window.utilData.hotels[0].author);
      return window.utilData.hotels;
    });
  };

  window.load(DATA_LINK);
})();
