window.addEventListener('load', () => {
  init();
});

const init = () => {
  const images = document.querySelectorAll('img.lazy');

  for (var i = 0; i < images.length; i++) {
    setImageSource(images[i]);
  }
};

const setImageSource = (image) => {
  image.src = image.dataset.src;
  image.classList.remove('lazy');
};
