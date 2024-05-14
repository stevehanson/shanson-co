const config = {
  root: null, // viewport
  rootMargin: '0px 0px 2000px 0px',
  threshold: 0,
};

function init() {
  const images = [].slice.call(document.querySelectorAll('img.lazy'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          setImageSource(image);
          observer.unobserve(image);
        }
      });
    }, config);

    for (let image of images) {
      observer.observe(image);
    }
  } else {
    for (let image of images) {
      setImageSource(image);
    }
  }
}

function setImageSource(image) {
  image.src = image.dataset.src;
  image.classList.remove('lazy');
}

window.addEventListener('load', init);
