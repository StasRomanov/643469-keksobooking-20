'use strict';

(function () {
  window.debounce = function (callback, time) {
    var lastTimeout = null;
    var interval = time;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        callback.apply(null, parameters);
      }, interval);
    };
  };
})();
