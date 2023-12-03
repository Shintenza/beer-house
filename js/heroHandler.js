/**
  * class responsible for handling a hero section on the main page
  * @class
  */
class HeroHandler {
  #avaliableSlides = [];
  #currentSlide = 0;
  #slidesList = null;

  /**
  * @constructor
  * @param {string} - hero section class name
  */
  constructor(heroSectionClass) {
    this.#slidesList = document.querySelector(`.${heroSectionClass}`);
    this.#avaliableSlides = [...this.#slidesList.children];

    this.#handleHeroSlides();
    setInterval(this.#handleHeroSlides.bind(this), 7000);
  }

  /**
   * method responsible for changing images in hero section
   * @method
  */
  #handleHeroSlides() {
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

export default HeroHandler;
