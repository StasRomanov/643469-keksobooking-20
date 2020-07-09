'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatar = {
    input: document.querySelector('.ad-form__field input[type=file]'),
    picture: document.querySelector('.ad-form-header__preview img'),
    pictureDefault: 'img/muffin-grey.svg'
  };
  var hotel = {
    input: document.querySelector('.ad-form__upload input[type=file]'),
    pictureBlock: document.querySelector('.ad-form__photo')
  };

  var onAvatarChange = function () {
    var file = avatar.input.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatar.picture.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var onHotelChange = function () {
    hotel.pictureBlock.innerHTML = '';
    var file = hotel.input.files[0];
    var fileName = file.name.toLowerCase();
    var photo = document.createElement('img');
    photo.setAttribute('alt', 'Hotel photo');
    photo.setAttribute('width', String(hotel.pictureBlock.offsetWidth));
    photo.setAttribute('height', String(hotel.pictureBlock.offsetHeight));
    photo.style.borderRadius = '5px';
    hotel.pictureBlock.appendChild(photo);
    var matches = FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        photo.setAttribute('src', String(reader.result));
      });
      reader.readAsDataURL(file);
    }
  };

  window.pictureUpload = {
    disable: function () {
      var hotelPhoto = hotel.pictureBlock.querySelector('img');
      avatar.picture.src = avatar.pictureDefault;
      if (hotelPhoto) {
        hotelPhoto.remove();
      }
    }
  };

  avatar.input.addEventListener('change', onAvatarChange, false);
  hotel.input.addEventListener('change', onHotelChange, false);
})();
