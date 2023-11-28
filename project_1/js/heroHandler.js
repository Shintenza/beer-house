class HeroHandler {
  #avaliableSlides = [];
  #currentSlide = 0;
  #slidesList = null;

  constructor(heroSectionClass) {
    this.#slidesList = document.querySelector(`.${heroSectionClass}`);
    this.#avaliableSlides = [...this.#slidesList.children];

    this.#handleHeroSlides();
    setInterval(this.#handleHeroSlides.bind(this), 7000);
  }

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
