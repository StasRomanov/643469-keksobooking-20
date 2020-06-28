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

  var setDefaultValue = function (inCycle) {
    if (inCycle) {
      featuresCoincidence = true;
    } else {
      window.utilData.filterStatus = true;
      featuresCoincidence = false;
    }
    coincidence = true;
  };

  var filterType = function (iteration, filter) {
    if (filter.value !== filterData.valueAny) {
      coincidence = window.utilData.hotels[iteration].offer.type === houseTypeFilter.value;
    }
  };

  var filterMoney = function (iteration, filter, mode) {
    if (filter.value !== filterData.valueAny) {
      if (mode === 'low') {
        if (filter.value === filterData.moneyValueLow) {
          if (window.utilData.hotels[iteration].offer.price > filterData.moneyLow) {
            coincidence = false;
          }
        }
      }
      if (mode === 'middle') {
        if (filter.value === filterData.moneyValueMiddle) {
          if (window.utilData.hotels[iteration].offer.price <= filterData.moneyLow ||
            window.utilData.hotels[iteration].offer.price > filterData.moneyHigh) {
            coincidence = false;
          }
        }
      }
      if (mode === 'high') {
        if (filter.value === filterData.moneyValueHigh) {
          if (window.utilData.hotels[iteration].offer.price <= filterData.moneyHigh) {
            coincidence = false;
          }
        }
      }
    }
  };

  var filterRoomsGuests = function (iteration, filter, mode) {
    if (filter.value !== filterData.valueAny) {
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
    setDefaultValue(false);
    var filterHotels = [];
    for (var i = 0; i < window.utilData.hotels.length; i++) {
      setDefaultValue(true);
      filterType(i, houseTypeFilter);
      filterMoney(i, housePriceFilter, 'low');
      filterMoney(i, housePriceFilter, 'middle');
      filterMoney(i, housePriceFilter, 'high');
      filterRoomsGuests(i, houseRoomsFilter, 'room');
      filterRoomsGuests(i, houseGuestFilter, 'guest');
      filterFeature(i, filterData.featureWifi, wifiFilter);
      filterFeature(i, filterData.featureDishwasher, dishwasherFilter);
      filterFeature(i, filterData.featureParking, parkingFilter);
      filterFeature(i, filterData.featureWasher, washerFilter);
      filterFeature(i, filterData.featureElevator, elevatorFilter);
      filterFeature(i, filterData.featureConditioner, conditionerFilter);
      pushHotel(i, filterHotels);
    }
    window.filterHotels = filterHotels;
    window.card.removePopup();
    window.pin.deleteMapPins();
    window.pin.renderMapPins(filterHotels, filterHotels.length);
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
