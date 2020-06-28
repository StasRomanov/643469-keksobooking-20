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

  var filterType = function (currentHotel) {
    if (houseTypeFilter.value !== filterData.valueAny) {
      return currentHotel.filter(function (hotelInfo) {
        return hotelInfo.offer.type === houseTypeFilter.value;
      });
    }
    return currentHotel;
  };

  var filterMoney = function (currentHotel) {
    if (housePriceFilter.value !== filterData.valueAny) {
      return currentHotel.filter(function (hotelInfo) {
        if (housePriceFilter.value === filterData.moneyValueLow) {
          return hotelInfo.offer.price < filterData.moneyLow;
        } else if (housePriceFilter.value === filterData.moneyValueMiddle) {
          return hotelInfo.offer.price >= filterData.moneyLow && hotelInfo.offer.price < filterData.moneyHigh;
        } else if (housePriceFilter.value === filterData.moneyValueHigh) {
          return hotelInfo.offer.price >= filterData.moneyHigh;
        }
        return false;
      });
    }
    return currentHotel;
  };

  var filterRooms = function (currentHotel) {
    if (houseRoomsFilter.value !== filterData.valueAny) {
      return currentHotel.filter(function (hotelInfo) {
        if (String(houseRoomsFilter.value) === String(hotelInfo.offer.rooms)) {
          return hotelInfo;
        }
        return false;
      });
    }
    return currentHotel;
  };

  var filterGuests = function (currentHotel) {
    if (houseGuestFilter.value !== filterData.valueAny) {
      return currentHotel.filter(function (hotelInfo) {
        if (String(houseGuestFilter.value) === String(hotelInfo.offer.guests)) {
          return hotelInfo;
        }
        return false;
      });
    }
    return currentHotel;
  };

  var filterFeature = function (currentHotel, filter, data) {
    if (filter.checked) {
      return currentHotel.filter(function (hotelInfo) {
        for (var i = 0; i < hotelInfo.offer.features.length; i++) {
          if (hotelInfo.offer.features[i] === data) {
            return hotelInfo;
          }
        }
        return false;
      });
    }
    return currentHotel;
  };

  var onFilterBlockChange = function () {
    window.debounce(function () {
      window.utilData.filterStatus = true;
      var filterHotels;
      result = window.utilData.hotels;
      result = filterType(result);
      result = filterMoney(result);
      result = filterRooms(result);
      result = filterGuests(result);
      for (var i = 0; i < features.length; i++) {
        result = filterFeature(result, featuresBlocks[i], features[i]);
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
