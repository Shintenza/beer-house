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

class appearOnScroll {
  #observer = null;
  #elements = null;
  #startingClass = "";
  #threshold = 0.5;

  constructor(elementsName, startingClass, threshold=0.5) {
    this.#threshold = threshold;
    this.#elements = document.querySelectorAll(`.${elementsName}`);
    this.#startingClass = startingClass;
    this.#makeElementsHidden();
    this.#createObserver();
    this.#addObserverToElements();
  }

  #createObserver() {
    this.#observer = new IntersectionObserver((e) => this.#observerCallback(e),
      { threshold: this.#threshold },
    );
  }

  #observerCallback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.toggle("show", entry.isIntersecting);
        this.#observer.unobserve(entry.target);
      }
    })
  }

  #addObserverToElements() {
    for (const element of this.#elements) {
      this.#observer.observe(element);
    }
  }

  #makeElementsHidden() {
    this.#elements.forEach((element) => {
      element.classList.add(this.#startingClass);
    });
  }
}

const carouselHandler = new CarouselHandler("carousel_slides");
const featuresAppear = new appearOnScroll("features_ft", "slide_from_left");
const beersAppear = new appearOnScroll("beers_container", "slide_from_right", 0.2);
const reviesAppear = new appearOnScroll("reviews_container", "slide_from_left");
const visitContainer = new appearOnScroll("visit_container", "slide_from_right", 0.3);
