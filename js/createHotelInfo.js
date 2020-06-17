'use strict';

(function () {
  var createHotelInfo = function (avatar, title, address, price, type, rooms, guests,
      checkin, checkout, features, description, photos, x, y) {
    return {
      author: {
        avatar: avatar
      },
      offer: {
        title: title,
        address: address,
        price: price,
        type: type,
        rooms: rooms,
        guests: guests,
        checkin: checkin,
        checkout: checkout,
        features: features,
        description: description,
        photos: photos
      },
      location: {
        x: x,
        y: y
      }
    };
  };

  window.createAllHotelInfo = function () {
    window.getHotelOrder(window.data.HOTEL_COUNTER);
    window.shuffle(window.data.hotelsSequence);
    for (var i = 0; i < window.data.HOTEL_COUNTER; i++) {
      window.data.xLocations[i] = window.getLocations(window.data.minLocationX, window.data.maxLocationX);
      window.data.yLocations[i] = window.getLocations(window.data.minLocationY, window.data.maxLocationY);
      var HOTEL_DESCRIPTION = 'any looooooooooong text';
      var hotelAvatar = 'img/avatars/user0' + window.data.hotelsSequence[i] + '.png';
      var hotelTitle = 'hotel' + i;
      var hotelAddress = 'x:' + window.data.xLocations[i] + ' y:' + window.data.yLocations[i];
      var hotelPrice = window.getRandomInteger(1000, 80000) + '₽/ночь';
      var hotelType = window.getRandomArrayElement(window.data.HOTEL_TYPES);
      var hotelRooms = window.getRandomInteger(1, 6);
      var hotelCheckin = window.getRandomArrayElement(window.data.TIMES);
      var hotelCheckout = window.getRandomArrayElement(window.data.TIMES);
      var hotelFeatures = window.getRandomArrayLength(window.data.FEATURES);
      var hotelPhoto = window.getRandomArrayLength(window.data.HOTEL_PHOTOS);
      var hotelGuests = hotelRooms * window.getRandomInteger(1, 4);
      window.data.hotels.splice(0, 0, createHotelInfo(
          hotelAvatar, hotelTitle, hotelAddress, hotelPrice, hotelType, hotelRooms, hotelGuests, hotelCheckin,
          hotelCheckout, hotelFeatures, HOTEL_DESCRIPTION, hotelPhoto, window.data.xLocations[i], window.data.yLocations[i]
      ));
    }
  };
})();
