'use strict';

(function () {
  var lastTimeout;

  window.debounce = function (callback, timer, immediately) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    if (immediately) {
      lastTimeout = window.setTimeout(callback, 0);
      return;
    }
    lastTimeout = window.setTimeout(callback, timer);
  };
})();
