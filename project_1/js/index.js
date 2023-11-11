const slidesList = document.querySelector(".carousel_slides");

// Slides handler
let currentSlide = 0;
const avaliableSlides = [...slidesList.children];

const handleCarousel = () => {
  const currentActiveElement = document.querySelector(".active_slide");

  if (currentActiveElement) {
    currentActiveElement.classList.remove("active_slide");
  }

  const currentSlideElement = avaliableSlides[currentSlide];
  currentSlideElement.classList.add("active_slide");

  currentSlide = (currentSlide + 1) % avaliableSlides.length;
};

handleCarousel();
setInterval(handleCarousel, 7000);

