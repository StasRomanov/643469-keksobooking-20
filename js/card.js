'use strict';

(function () {
  var mapOverlay = document.querySelector('.map__overlay');
  var MAP_SAFE_BORDER_ZONE = 10;

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

  window.onMainPinMove = function (evt) {
    if (evt.button === window.utilData.LEFT_MOUSE_CODE && window.utilData.activeStatus) {
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

        window.utilData.mapPinMain.style.left = (window.utilData.mapPinMain.offsetLeft - shift.x) + 'px';
        window.utilData.mapPinMain.style.top = (window.utilData.mapPinMain.offsetTop - shift.y) + 'px';
        window.utilData.addressInput.value = String(Math.round(window.utilData.mapPinMain.offsetLeft - shift.x + window.utilData.mapPinMain.offsetWidth / 2)) + ' '
            + String(window.utilData.mapPinMain.offsetTop - shift.y + window.utilData.mapPinMain.offsetHeight + window.utilData.MAP_PIN_TRIANGLE_HEIGHT);

        if (window.utilData.mapPinMain.offsetLeft - shift.x + window.utilData.mapPinMain.offsetWidth >
            mapOverlay.offsetWidth) {
          window.utilData.mapPinMain.style.left = (window.utilData.mapPinMain.offsetLeft - shift.x - MAP_SAFE_BORDER_ZONE) + 'px';
        }
        if (window.utilData.mapPinMain.offsetTop - shift.y + window.utilData.mapPinMain.offsetHeight + window.utilData.MAP_PIN_TRIANGLE_HEIGHT >
            mapOverlay.offsetHeight) {
          window.utilData.mapPinMain.style.top = (window.utilData.mapPinMain.offsetTop - shift.y - MAP_SAFE_BORDER_ZONE) + 'px';
        }
        if (window.utilData.mapPinMain.offsetLeft - shift.x < 0) {
          window.utilData.mapPinMain.style.left = (window.utilData.mapPinMain.offsetLeft - shift.x + MAP_SAFE_BORDER_ZONE) + 'px';
        }
        if (window.utilData.mapPinMain.offsetTop - shift.y - window.utilData.SKY_HEIGHT + window.utilData.mapPinMain.offsetHeight +
            window.utilData.MAP_PIN_TRIANGLE_HEIGHT < 0) {
          window.utilData.mapPinMain.style.top = (window.utilData.mapPinMain.offsetTop - shift.y + MAP_SAFE_BORDER_ZONE) + 'px';
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
