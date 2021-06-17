const DEFAULT_DURATION = 300;

const carousel = ($container, images) => {
  const renderedImages = [images[images.length - 1], ...images, images[0]];
  let currentSlide = 1;
  let $carouselSlides;

  const throttle = (callback, delay) => {
    let timerId;

    return event => {
      if (timerId) return;
      timerId = setTimeout(
        event => {
          callback(event);
          timerId = null;
        },
        delay,
        event
      );
    };
  };

  const setCurrentSlide = slideNo => {
    currentSlide = slideNo;
    $carouselSlides.style.setProperty('--currentSlide', slideNo);
  };

  const setDuration = duration => {
    $carouselSlides.style.setProperty('--duration', duration);
  };

  const prev = () => {
    setCurrentSlide(currentSlide - 1);
    setDuration(DEFAULT_DURATION);
  };

  const next = () => {
    setCurrentSlide(currentSlide + 1);
    setDuration(DEFAULT_DURATION);
  };

  const render = () => {
    $carouselSlides = document.createElement('div');
    $carouselSlides.className = 'carousel-slides';
    $carouselSlides.innerHTML = renderedImages
      .map(src => `<img src=${src} />`)
      .join('');
    const $image = $carouselSlides.querySelector('img');
    $container.style.width = $image.naturalWidth + 10 + 'px';
    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
    $carouselSlides.style.setProperty('--duration', DEFAULT_DURATION);
    $container.prepend($carouselSlides);
    $container.style.opacity = 1;
  };

  window.addEventListener('load', render);

  window.addEventListener('transitionend', () => {
    if (currentSlide === renderedImages.length - 1) {
      setCurrentSlide(1);
      setDuration(0);
    }

    if (currentSlide === 0) {
      setCurrentSlide(renderedImages.length - 2);
      setDuration(0);
    }
  });

  document
    .querySelector('.prev')
    .addEventListener('click', throttle(prev, DEFAULT_DURATION + 50));

  document
    .querySelector('.next')
    .addEventListener('click', throttle(next, DEFAULT_DURATION + 50));
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
