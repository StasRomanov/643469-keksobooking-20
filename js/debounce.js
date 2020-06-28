'use strict';

(function () {
  var lastTimeout;

  window.debounce = function (callback, timer, immediately, backgroundTimer) {
    if (backgroundTimer) {
      if (window.currentTime + 1500 < Date.parse(new Date().toISOString())) {
        lastTimeout = window.setTimeout(callback, 0);
        return;
      }
    }
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
