const slidesList = document.querySelector(".carousel_slides");

class CarouselHandler {
  #avaliableSlides = [];
  #currentSlide = 0;
  #slidesList = null;

  constructor(carouselClassName) {
    this.#slidesList = document.querySelector(`.${carouselClassName}`);
    this.#avaliableSlides = [...this.#slidesList.children];

    this.#handleCarousel();
    setInterval(this.#handleCarousel.bind(this), 7000);
  }

  #handleCarousel() {
    const currentActiveElement = document.querySelector(".active_slide");

    if (currentActiveElement) {
      currentActiveElement.classList.remove("active_slide");
    }

    const currentSlideElement = this.#avaliableSlides[this.#currentSlide];
    currentSlideElement.classList.add("active_slide");

    this.#currentSlide =
      (this.#currentSlide + 1) % this.#avaliableSlides.length;
  }
}

const carouselHandler = new CarouselHandler("carousel_slides");
