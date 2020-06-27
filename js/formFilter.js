'use strict';

(function () {
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

  var onFilterBlockChange = function () {
    window.utilData.filterStatus = true;
    var coincidence = true;
    var featuresCoincidence = false;
    var filterHotels = [];
    for (var i = 0; i < window.utilData.hotels.length; i++) {
      coincidence = true;
      featuresCoincidence = true;
      if (houseTypeFilter.value !== 'any') {
        coincidence = window.utilData.hotels[i].offer.type === houseTypeFilter.value;
      }
      if (housePriceFilter.value !== 'any') {
        if (housePriceFilter.value === 'low') {
          if (window.utilData.hotels[i].offer.price > 10000) {
            coincidence = false;
          }
        }
        if (housePriceFilter.value === 'middle') {
          if (window.utilData.hotels[i].offer.price <= 10000 || window.utilData.hotels[i].offer.price > 50000) {
            coincidence = false;
          }
        }
        if (housePriceFilter.value === 'high') {
          if (window.utilData.hotels[i].offer.price <= 50000) {
            coincidence = false;
          }
        }
      }
      if (houseRoomsFilter.value !== 'any') {
        if (String(houseRoomsFilter.value) !== String(window.utilData.hotels[i].offer.rooms)) {
          coincidence = false;
        }
      }
      if (houseGuestFilter.value !== 'any') {
        if (String(houseGuestFilter.value) !== String(window.utilData.hotels[i].offer.guests)) {
          coincidence = false;
        }
      }
      if (wifiFilter.checked) {
        if (window.utilData.hotels[i].offer.features.length === 0) {
          coincidence = false;
        } else {
          featuresCoincidence = false;
          for (var j = 0; j < window.utilData.hotels[i].offer.features.length; j++) {
            if (window.utilData.hotels[i].offer.features[j] === 'wifi') {
              featuresCoincidence = true;
            }
          }
          if (!featuresCoincidence) {
            coincidence = false;
          }
        }
      }
      if (dishwasherFilter.checked) {
        j = 0;
        if (window.utilData.hotels[i].offer.features.length === 0) {
          coincidence = false;
        } else {
          featuresCoincidence = false;
          for (j = 0; j < window.utilData.hotels[i].offer.features.length; j++) {
            // console.log(j);
            if (window.utilData.hotels[i].offer.features[j] === 'dishwasher') {
              // console.log(window.utilData.hotels[i].offer.features[j]);
              featuresCoincidence = true;
            }
          }
          if (!featuresCoincidence) {
            coincidence = false;
          }
        }
      }
      if (parkingFilter.checked) {
        j = 0;
        if (window.utilData.hotels[i].offer.features.length === 0) {
          coincidence = false;
        } else {
          featuresCoincidence = false;
          for (j = 0; j < window.utilData.hotels[i].offer.features.length; j++) {
            if (window.utilData.hotels[i].offer.features[j] === 'parking') {
              featuresCoincidence = true;
            }
          }
          if (!featuresCoincidence) {
            coincidence = false;
          }
        }
      }
      if (washerFilter.checked) {
        j = 0;
        if (window.utilData.hotels[i].offer.features.length === 0) {
          coincidence = false;
        } else {
          featuresCoincidence = false;
          for (j = 0; j < window.utilData.hotels[i].offer.features.length; j++) {
            if (window.utilData.hotels[i].offer.features[j] === 'washer') {
              featuresCoincidence = true;
            }
          }
          if (!featuresCoincidence) {
            coincidence = false;
          }
        }
      }
      if (elevatorFilter.checked) {
        j = 0;
        if (window.utilData.hotels[i].offer.features.length === 0) {
          coincidence = false;
        } else {
          featuresCoincidence = false;
          for (j = 0; j < window.utilData.hotels[i].offer.features.length; j++) {
            if (window.utilData.hotels[i].offer.features[j] === 'elevator') {
              featuresCoincidence = true;
            }
          }
          if (!featuresCoincidence) {
            coincidence = false;
          }
        }
      }
      if (conditionerFilter.checked) {
        j = 0;
        if (window.utilData.hotels[i].offer.features.length === 0) {
          coincidence = false;
        } else {
          featuresCoincidence = false;
          for (j = 0; j < window.utilData.hotels[i].offer.features.length; j++) {
            if (window.utilData.hotels[i].offer.features[j] === 'conditioner') {
              featuresCoincidence = true;
            }
          }
          if (!featuresCoincidence) {
            coincidence = false;
          }
        }
      }
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
