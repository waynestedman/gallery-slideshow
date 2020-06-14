var target = document.getElementById('gallery');
var slideIndex = 1;

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

; // Next/previous controls

function plusSlides(n) {
  showSlides(slideIndex += n);
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

function slideshowMode() {
  target.style.display = 'block';
  target.classList.add('slideshow');
  target.classList.remove('gallery');
  showSlides(slideIndex);
}

;