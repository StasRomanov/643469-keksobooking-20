'use strict';

(function () {
  var FilterData = {
    MONEY_LOW: 10000,
    MONEY_HIGH: 50000
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
  var features = [wifiFilter.value, dishwasherFilter.value, parkingFilter.value, washerFilter.value, elevatorFilter.value, conditionerFilter.value];
  var featuresBlocks = [wifiFilter, dishwasherFilter, parkingFilter, washerFilter, elevatorFilter, conditionerFilter];
  var results = [];

  var filterFeature = function (currentHotel, filter) {
    var currentResult = currentHotel;
    features.forEach(function (item, i) {
      if (filter[i].checked) {
        currentResult = filterFeatureResult(currentResult, features, i);
      }
    });
    return currentResult;
  };

  var filterFeatureResult = function (currentHotels, data, iteration) {
    return currentHotels.filter(function (hotelInfo) {
      for (var i = 0; i < hotelInfo.offer.features.length; i++) {
        if (hotelInfo.offer.features[i] === data[iteration]) {
          return hotelInfo;
        }
      }
      return false;
    });
  };

  var onFilterBlockChange = window.debounce(function () {
    window.utilData.filterStatus = true;
    results = window.utilData.hotels;
    results = results.filter(function (hotelInfo) {
      if (houseTypeFilter.value !== 'any') {
        if (hotelInfo.offer.type !== houseTypeFilter.value) {
          return false;
        }
      }
      if (housePriceFilter.value !== 'any') {
        if (housePriceFilter.value === 'low') {
          if (hotelInfo.offer.price >= FilterData.MONEY_LOW) {
            return false;
          }
        } else if (housePriceFilter.value === 'middle') {
          if (hotelInfo.offer.price < FilterData.MONEY_LOW || hotelInfo.offer.price >= FilterData.MONEY_HIGH) {
            return false;
          }
        } else if (housePriceFilter.value === 'high') {
          if (hotelInfo.offer.price < FilterData.MONEY_HIGH) {
            return false;
          }
        }
      }
      if (houseRoomsFilter.value !== 'any') {
        if (String(houseRoomsFilter.value) !== String(hotelInfo.offer.rooms)) {
          return false;
        }
      }
      if (houseGuestFilter.value !== 'any') {
        if (String(houseGuestFilter.value) !== String(hotelInfo.offer.guests)) {
          return false;
        }
      }
      return true;
    });
    results = filterFeature(results, featuresBlocks);
    window.filterHotels = results;
    window.card.removePopup();
    window.pin.delete();
    window.pin.render(results, results.length);
  }, 500);

  filterBlock.addEventListener('change', onFilterBlockChange, false);

  window.formFilter = {
    disable: function () {
      filterBlock.reset();
      filterBlock.classList.add('ad-form--disabled');
      for (var k = 0; k < filterBlock.length; k++) {
        filterBlock[k].setAttribute('disabled', 'true');
      }
    },

    enable: function () {
      for (var k = 0; k < filterBlock.length; k++) {
        filterBlock[k].removeAttribute('disabled');
      }
      filterBlock.classList.remove('ad-form--disabled');
    }
  };
})();
