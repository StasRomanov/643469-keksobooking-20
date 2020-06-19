'use strict';

(function () {
  window.card = {
    getWordDeclension: function (n, textForms) {
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
    },

    getGuests: function (hotelGuests) {
      if (hotelGuests === 1 || hotelGuests === 21) {
        return ' гостя.';
      } else {
        return ' гостей.';
      }
    },

    renderHotelType: function (type, textBlock) {
      textBlock.textContent = {
        palace: 'Дворец',
        flat: 'Квартира',
        bungalo: 'Бунгало',
        house: 'Дом'
      }[type];
    },

    renderHotelFeatures: function (features, featuresBlock) {
      window.utilData.fragment = document.createDocumentFragment();
      for (var i = 0; i < features.length; i++) {
        var listItem = document.createElement('li');
        listItem.classList.add('popup__feature');
        listItem.classList.add('popup__feature--' + features[i]);
        listItem.textContent = features[i];
        window.utilData.fragment.appendChild(listItem);
      }
      featuresBlock.appendChild(window.utilData.fragment);
    },

    renderHotelPhoto: function (hotel, photosBlock, photo) {
      window.utilData.fragment = document.createDocumentFragment();
      for (var i = 0; i < hotel.offer.photos.length; i++) {
        while (photosBlock.firstChild) {
          photosBlock.removeChild(photosBlock.firstChild);
        }
        var img = photo.cloneNode(false);
        img.src = hotel.offer.photos[i];
        window.utilData.fragment.appendChild(img);
      }
      photosBlock.appendChild(window.utilData.fragment);
    }
  };
})();
