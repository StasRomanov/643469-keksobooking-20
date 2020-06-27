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

  var onFilterBlockChange = function () {
    window.utilData.filterStatus = true;
    coincidence = true;
    featuresCoincidence = false;
    var filterHotels = [];
    for (var i = 0; i < window.utilData.hotels.length; i++) {
      coincidence = true;
      featuresCoincidence = true;
      if (houseTypeFilter.value !== filterData.filterValueAny) {
        coincidence = window.utilData.hotels[i].offer.type === houseTypeFilter.value;
      }
      if (housePriceFilter.value !== filterData.filterValueAny) {
        if (housePriceFilter.value === filterData.filterMoneyValueLow) {
          if (window.utilData.hotels[i].offer.price > filterData.filterMoneyLow) {
            coincidence = false;
          }
        }
        if (housePriceFilter.value === filterData.filterMoneyValueMiddle) {
          if (window.utilData.hotels[i].offer.price <= filterData.filterMoneyLow || window.utilData.hotels[i].offer.price > filterData.filterMoneyLow) {
            coincidence = false;
          }
        }
        if (housePriceFilter.value === filterData.filterMoneyValueHigh) {
          if (window.utilData.hotels[i].offer.price <= filterData.filterMoneyLow) {
            coincidence = false;
          }
        }
      }
      if (houseRoomsFilter.value !== filterData.filterValueAny) {
        if (String(houseRoomsFilter.value) !== String(window.utilData.hotels[i].offer.rooms)) {
          coincidence = false;
        }
      }
      if (houseGuestFilter.value !== filterData.filterValueAny) {
        if (String(houseGuestFilter.value) !== String(window.utilData.hotels[i].offer.guests)) {
          coincidence = false;
        }
      }
      filterFeature(i, filterData.filterFeatureWifi, wifiFilter);
      filterFeature(i, filterData.filterFeatureDishwasher, dishwasherFilter);
      filterFeature(i, filterData.filterFeatureParking, parkingFilter);
      filterFeature(i, filterData.filterFeatureWasher, washerFilter);
      filterFeature(i, filterData.filterFeatureElevator, elevatorFilter);
      filterFeature(i, filterData.filterFeatureConditioner, conditionerFilter);

      if (coincidence) {
        filterHotels.push(window.utilData.hotels[i]);
      }
    }
    window.filterHotels = filterHotels;
    window.card.removePopup();
    window.pin.deleteMapPins();
    window.pin.renderMapPins(filterHotels, filterHotels.length);
  };

  filterBlock.addEventListener('change', onFilterBlockChange, false);
})();
