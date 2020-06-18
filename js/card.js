'use strict';

(function () {
  window.getWordDeclension = function (n, textForms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) {
      return textForms[2];
    }
    if (n1 > 1 && n1 < 5) {
      return textForms[1];
    }
    if (n1 === 1) {
      return textForms[0];
    }
    return textForms[2];
  };

  window.getGuests = function (hotelGuests) {
    if (hotelGuests === 1 || hotelGuests === 21) {
      return ' гостя.';
    } else {
      return ' гостей.';
    }
  };
})();
