'use strict';

(function () {
  var filterData = {
    filterMoneyLow: 10000,
    filterMoneyHigh: 50000,
    filterValueAny: 'any',
    filterMoneyValueLow: 'low',
    filterMoneyValueMiddle: 'middle',
    filterMoneyValueHigh: 'high',
    filterFeatureWifi: 'wifi',
    filterFeatureDishwasher: 'dishwasher',
    filterFeatureParking: 'parking',
    filterFeatureWasher: 'washer',
    filterFeatureElevator: 'elevator',
    filterFeatureConditioner: 'conditioner'
  };
  var coincidence = true;
  var featuresCoincidence = false;
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

  var defaultValue = function (inCycle) {
    if (inCycle) {
      featuresCoincidence = true;
    } else {
      window.utilData.filterStatus = true;
      featuresCoincidence = false;
    }
    coincidence = true;
  };

  var filterType = function (iteration, filter) {
    if (filter.value !== filterData.filterValueAny) {
      coincidence = window.utilData.hotels[iteration].offer.type === houseTypeFilter.value;
    }
  };

  var filterMoney = function (iteration, filter, mode) {
    if (filter.value !== filterData.filterValueAny) {
      if (mode === 'low') {
        if (filter.value === filterData.filterMoneyValueLow) {
          if (window.utilData.hotels[iteration].offer.price > filterData.filterMoneyLow) {
            coincidence = false;
          }
        }
      }
      if (mode === 'middle') {
        if (filter.value === filterData.filterMoneyValueMiddle) {
          if (window.utilData.hotels[iteration].offer.price <= filterData.filterMoneyLow ||
            window.utilData.hotels[iteration].offer.price > filterData.filterMoneyHigh) {
            coincidence = false;
          }
        }
      }
      if (mode === 'high') {
        if (filter.value === filterData.filterMoneyValueHigh) {
          if (window.utilData.hotels[iteration].offer.price <= filterData.filterMoneyHigh) {
            coincidence = false;
          }
        }
      }
    }
  };

  var filterRoomsGuests = function (iteration, filter, mode) {
    if (filter.value !== filterData.filterValueAny) {
      if (mode === 'room') {
        if (String(filter.value) !== String(window.utilData.hotels[iteration].offer.rooms)) {
          coincidence = false;
        }
      } else if (mode === 'guest') {
        if (String(filter.value) !== String(window.utilData.hotels[iteration].offer.guests)) {
          coincidence = false;
        }
      }
    }
  };

  var filterFeature = function (iteration, data, filter) {
    if (filter.checked) {
      var j = 0;
      if (window.utilData.hotels[iteration].offer.features.length === 0) {
        coincidence = false;
      } else {
        featuresCoincidence = false;
        for (j = 0; j < window.utilData.hotels[iteration].offer.features.length; j++) {
          if (window.utilData.hotels[iteration].offer.features[j] === data) {
            featuresCoincidence = true;
          }
        }
        if (!featuresCoincidence) {
          coincidence = false;
        }
      }
    }
  };

  var pushHotel = function (iteration, hotels) {
    if (coincidence) {
      hotels.push(window.utilData.hotels[iteration]);
    }
  };

  var onFilterBlockChange = function () {
    defaultValue(false);
    var filterHotels = [];
    for (var i = 0; i < window.utilData.hotels.length; i++) {
      defaultValue(true);
      filterType(i, houseTypeFilter);
      filterMoney(i, housePriceFilter, 'low');
      filterMoney(i, housePriceFilter, 'middle');
      console.log(coincidence);
      filterMoney(i, housePriceFilter, 'high');
      filterRoomsGuests(i, houseRoomsFilter, 'room');
      filterRoomsGuests(i, houseGuestFilter, 'guest');
      filterFeature(i, filterData.filterFeatureWifi, wifiFilter);
      filterFeature(i, filterData.filterFeatureDishwasher, dishwasherFilter);
      filterFeature(i, filterData.filterFeatureParking, parkingFilter);
      filterFeature(i, filterData.filterFeatureWasher, washerFilter);
      filterFeature(i, filterData.filterFeatureElevator, elevatorFilter);
      filterFeature(i, filterData.filterFeatureConditioner, conditionerFilter);
      // if (coincidence) {
      //   filterHotels.push(window.utilData.hotels[i]);
      // }
      pushHotel(i, filterHotels);
    }
    window.filterHotels = filterHotels;
    window.card.removePopup();
    window.pin.deleteMapPins();
    window.pin.renderMapPins(filterHotels, filterHotels.length);
  };

  filterBlock.addEventListener('change', onFilterBlockChange, false);
})();
