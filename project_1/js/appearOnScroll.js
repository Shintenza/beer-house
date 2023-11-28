class AppearOnScroll {
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
export default AppearOnScroll;
