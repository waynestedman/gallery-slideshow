var target = document.getElementById('gallery');

function galleryMode() {
  var galleryItems = document.getElementsByClassName('gallery-item');
  var i;
  target.style.display = 'flex';
  target.classList.add('gallery');
  target.classList.remove('slideshow');

  for (i = 0; i < galleryItems.length; i++) {
    galleryItems[i].style.display = 'block';
  }
}

;

function slideshowMode() {
  var slideIndex = 1;
  target.style.display = 'block';
  target.classList.add('slideshow');
  target.classList.remove('gallery');
  showSlides(slideIndex); // Next/previous controls

  function plusSlides(n) {
    showSlides(slideIndex += n);
  } // Thumbnail image controls


  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('gallery-item');

    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[slideIndex - 1].style.display = 'block';
  }
}

;