'use strict';

(function () {
  window.getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  window.getLocations = function (minLocation, maxLocation) {
    var array = [];
    array.push(window.getRandomInteger(minLocation, maxLocation));
    return array;
  };

  window.getHotelOrder = function (count) {
    for (var i = 0; i < count; i++) {
      window.data.hotelsSequence.splice(0, 0, i + 1);
    }
  };

  window.shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  window.getRandomArrayLength = function (array) {
    var shuffled = array.slice();
    window.shuffle(shuffled);
    return shuffled.slice(0, window.getRandomInteger(1, array.length));
  };

  window.getRandomArrayElement = function (array) {
    return array[window.getRandomInteger(0, array.length - 1)];
  };
})();
