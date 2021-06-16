const $carousel = document.querySelector('.carousel');

const carousel = ($container, images) => {
  const $prevBtn = document.querySelector('.prev');
  const $nextBtn = document.querySelector('.next');

  let currentImageIdx = 0;

  const imageNodes = images.map((src, idx) => [
    idx === 0 ? images[images.length - 1] : images[idx - 1], // pre
    src, // cur
    idx === images.length - 1 ? images[0] : images[idx + 1] // next
  ]);

  const next = () => {
    currentImageIdx =
      currentImageIdx === images.length - 1 ? 0 : currentImageIdx + 1;
  };

  const prev = () => {
    currentImageIdx =
      currentImageIdx === 0 ? images.length - 1 : currentImageIdx - 1;
  };

  const render = () => {
    const $carouselSlides = document.createElement('div');
    $carouselSlides.className = 'carousel-slides';
    $carouselSlides.innerHTML = imageNodes[currentImageIdx]
      .map(src => `<img src=${src} />`)
      .join('');
    $container.style.width = $carouselSlides.querySelector('img').width + 'px';
    $carouselSlides.style.setProperty('--currentSlide', 1);
    $container.appendChild($carouselSlides);
  };

  $prevBtn.addEventListener('click', prev);

  $nextBtn.addEventListener('click', next);

  render();
};

carousel($carousel, [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
