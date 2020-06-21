'use strict';

(function () {
  var HOTEL_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOTEL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ROOMS_DECLENSION = ['комната', 'комнаты', 'комнат'];
  var GUEST_DECLENSION = ['гостя', 'гостей', 'гостей'];

  window.data = {
    HOTEL_TYPES: HOTEL_TYPES,
    TIMES: TIMES,
    FEATURES: FEATURES,
    HOTEL_PHOTOS: HOTEL_PHOTOS,
    ROOMS_DECLENSION: ROOMS_DECLENSION,
    GUEST_DECLENSION: GUEST_DECLENSION,
  };
})();
