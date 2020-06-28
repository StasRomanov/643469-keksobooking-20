'use strict';

(function () {
  var filterData = {
    moneyLow: 10000,
    moneyHigh: 50000,
    valueAny: 'any',
    moneyValueLow: 'low',
    moneyValueMiddle: 'middle',
    moneyValueHigh: 'high',
    featureWifi: 'wifi',
    featureDishwasher: 'dishwasher',
    featureParking: 'parking',
    featureWasher: 'washer',
    featureElevator: 'elevator',
    featureConditioner: 'conditioner'
  };
  var houseTypeFilter = document.querySelector('#housing-type');
  var housePriceFilter = document.querySelector('#housing-price');
  var houseRoomsFilter = document.querySelector('#housing-rooms');
  var houseGuestFilter = document.querySelector('#housing-guests');
  var checkboxFilter = document.querySelector('#housing-features');
  var wifiFilter = checkboxFilter.querySelector('#filter-wifi');
  var dishwasherFilter = checkboxFilter.querySelector('#filter-dishwasher');
  var parkingFilter = checkboxFilter.querySelector('#filter-parking');
  var washerFilter = checkboxFilter.querySelector('#filter-washer');
  var elevatorFilter = checkboxFilter.querySelector('#filter-elevator');
  var conditionerFilter = checkboxFilter.querySelector('#filter-conditioner');
  var filterBlock = document.querySelector('.map__filters');
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var featuresBlocks = [wifiFilter, dishwasherFilter, parkingFilter, washerFilter, elevatorFilter, conditionerFilter];
  var result = [];

  var filterType = function () {
    if (houseTypeFilter.value !== filterData.valueAny) {
      result = result.filter(function (word) {
        return word.offer.type === houseTypeFilter.value;
      });
    }
  };

  var filterMoney = function () {
    if (housePriceFilter.value !== filterData.valueAny) {
      result = result.filter(function (word) {
        if (housePriceFilter.value === filterData.moneyValueLow) {
          return word.offer.price < filterData.moneyLow;
        } else if (housePriceFilter.value === filterData.moneyValueMiddle) {
          return word.offer.price >= filterData.moneyLow && word.offer.price < filterData.moneyHigh;
        } else if (housePriceFilter.value === filterData.moneyValueHigh) {
          return word.offer.price >= filterData.moneyHigh;
        }
        return null;
      });
    }
  };

  var filterRooms = function () {
    if (houseRoomsFilter.value !== filterData.valueAny) {
      result = result.filter(function (word) {
        if (String(houseRoomsFilter.value) === String(word.offer.rooms)) {
          return word;
        }
        return null;
      });
    }
  };

  var filterGuests = function () {
    if (houseGuestFilter.value !== filterData.valueAny) {
      result = result.filter(function (word) {
        if (String(houseGuestFilter.value) === String(word.offer.guests)) {
          return word;
        }
        return null;
      });
    }
  };

  var filterFeature = function (filter, data) {
    if (filter.checked) {
      result = result.filter(function (word) {
        for (var i = 0; i < word.offer.features.length; i++) {
          if (word.offer.features[i] === data) {
            return word;
          }
        }
        return null;
      });
    }
  };

  var onFilterBlockChange = function () {
    window.debounce(function () {
      window.utilData.filterStatus = true;
      var filterHotels;
      result = window.utilData.hotels;
      filterType();
      filterMoney();
      filterRooms();
      filterGuests();
      for (var i = 0; i < features.length; i++) {
        filterFeature(featuresBlocks[i], features[i]);
      }
      filterHotels = result;
      window.filterHotels = filterHotels;
      window.card.removePopup();
      window.pin.deleteMapPins();
      window.pin.renderMapPins(filterHotels, filterHotels.length);
    }, 1500, !window.utilData.filterStatus);
  };

  filterBlock.addEventListener('change', onFilterBlockChange, false);

  window.formFilter = {
    filterDisable: function () {
      filterBlock.reset();
      filterBlock.classList.add('ad-form--disabled');
      for (var k = 0; k < filterBlock.length; k++) {
        filterBlock[k].setAttribute('disabled', 'true');
      }
    },
    filterEnable: function () {
      for (var k = 0; k < filterBlock.length; k++) {
        filterBlock[k].removeAttribute('disabled');
      }
      filterBlock.classList.remove('ad-form--disabled');
    }
  };
})();
