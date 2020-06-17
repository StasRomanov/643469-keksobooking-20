'use strict';

(function () {
  window.onMapPinClick = function (evt) {
    if (window.data.activeStatus) {
      var target = evt.target;
      if (target.tagName === 'IMG') {
        target = target.closest('button');
        if (target.classList.contains('map__pin--main')) {
          return;
        }
      }
      if (target.tagName === 'BUTTON') {
        for (var i = 0; i < window.data.hotels.length; i++) {
          if (String(i) === target.getAttribute('data-id')) {
            window.renderHotelInfo(window.data.hotels[i]);
          }
        }
      }
    }
  };

  window.onPopupCloseClick = function (evt) {
    var popupCard = document.querySelector('.popup');
    var popupClose = document.querySelector('.popup__close');
    if (evt.button === window.data.LEFT_MOUSE_CODE && window.data.activeStatus === true) {
      window.data.map.removeChild(popupCard);
    }
    popupClose.removeEventListener('click', window.onPopupCloseClick, false);
    popupClose.removeEventListener('keydown', window.onPopupCloseKeydown, false);
    document.removeEventListener('keydown', window.onDocumentKeydown, false);
  };

  window.onPopupCloseKeydown = function (evt) {
    var popupCard = document.querySelector('.popup');
    var popupClose = document.querySelector('.popup__close');
    if (evt.code === window.data.ENTER_KEY_CODE && window.data.activeStatus === true) {
      window.data.map.removeChild(popupCard);
    }
    popupClose.removeEventListener('click', window.onPopupCloseClick, false);
    popupClose.removeEventListener('keydown', window.onPopupCloseKeydown, false);
    document.removeEventListener('keydown', window.onDocumentKeydown, false);
  };

  window.onDocumentKeydown = function (evt) {
    var popupCard = document.querySelector('.popup');
    var popupClose = document.querySelector('.popup__close');
    if (evt.code === window.data.ESC_KEY_CODE && window.data.activeStatus === true) {
      window.data.map.removeChild(popupCard);
    }
    popupClose.removeEventListener('click', window.onPopupCloseClick, false);
    popupClose.removeEventListener('keydown', window.onPopupCloseKeydown, false);
    document.removeEventListener('keydown', window.onDocumentKeydown, false);
  };

  window.data.mapPin.addEventListener('click', window.onMapPinClick, false);

  window.data.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE && window.data.activeStatus === false) {
      window.startActiveMode();
    }
  });

  window.data.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.code === window.data.ENTER_KEY_CODE && window.data.activeStatus === false) {
      window.startActiveMode();
    }
  });

  window.data.typeInput.addEventListener('change', function () {
    window.createInputSettings();
  });

  window.data.timeInInput.addEventListener('change', function () {
    window.syncTimeIn();
  });

  window.data.timeOutInput.addEventListener('change', function () {
    window.syncTimeOut();
  });

  window.data.roomNumberInput.addEventListener('change', function () {
    window.establishLimitsOnRooms();
  });
})();
