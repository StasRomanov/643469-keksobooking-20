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
      window.data.fragment = document.createDocumentFragment();
      for (var i = 0; i < features.length; i++) {
        var listItem = document.createElement('li');
        listItem.classList.add('popup__feature');
        listItem.classList.add('popup__feature--' + features[i]);
        listItem.textContent = features[i];
        window.data.fragment.appendChild(listItem);
      }
      featuresBlock.appendChild(window.data.fragment);
    },

    renderHotelPhoto: function (hotel, photosBlock, photo) {
      window.data.fragment = document.createDocumentFragment();
      for (var i = 0; i < hotel.offer.photos.length; i++) {
        while (photosBlock.firstChild) {
          photosBlock.removeChild(photosBlock.firstChild);
        }
        var img = photo.cloneNode(false);
        img.src = hotel.offer.photos[i];
        window.data.fragment.appendChild(img);
      }
      photosBlock.appendChild(window.data.fragment);
    }
  };
})();

(function () {
  window.onMainPinMove = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE && window.data.activeStatus) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.data.mapPinMain.style.left = (window.data.mapPinMain.offsetLeft - shift.x) + 'px';
        window.data.mapPinMain.style.top = (window.data.mapPinMain.offsetTop - shift.y) + 'px';
        window.data.addressInput.value = String(window.data.mapPinMain.offsetLeft - shift.x + window.data.mapPinMain.offsetWidth / 2) + ' '
            + String(window.data.mapPinMain.offsetTop - shift.y + window.data.mapPinMain.offsetHeight + window.data.MAP_PIN_TRIANGLE_HEIGHT);

        if (window.data.mapPinMain.offsetLeft - shift.x + window.data.mapPinMain.offsetWidth >
            window.data.mapOverlay.offsetWidth) {
          onMouseUp();
          window.data.mapPinMain.style.left = (window.data.mapPinMain.offsetLeft - shift.x - 10) + 'px';
        }
        if (window.data.mapPinMain.offsetTop - shift.y + window.data.mapPinMain.offsetHeight + window.data.MAP_PIN_TRIANGLE_HEIGHT >
            window.data.mapOverlay.offsetHeight) {
          onMouseUp();
          window.data.mapPinMain.style.top = (window.data.mapPinMain.offsetTop - shift.y - 10) + 'px';
        }
        if (window.data.mapPinMain.offsetLeft - shift.x < 0) {
          onMouseUp();
          window.data.mapPinMain.style.left = (window.data.mapPinMain.offsetLeft - shift.x + 10) + 'px';
        }
        if (window.data.mapPinMain.offsetTop - shift.y - window.data.SKY_HEIGHT + window.data.mapPinMain.offsetHeight +
            window.data.MAP_PIN_TRIANGLE_HEIGHT < 0) {
          onMouseUp();
          window.data.mapPinMain.style.top = (window.data.mapPinMain.offsetTop - shift.y + 10) + 'px';
        }
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
})();
