/**
 * class responsible for appearing a piece of content on scroll
 * @class
 */
class AppearOnScroll {
  #observer = null;
  #elements = null;
  #startingClass = "";
  #threshold = 0.5;

  /**
  * @constructor
  * @param {string} elementsName - class of the element that the animation should be attached to
  * @param {string} startingClass - starting state class name
  * @param {number} threshold - how much of an element should be visible for e.g. means 50% (range 0-1)
  */
  constructor(elementsName, startingClass, threshold=0.5) {
    this.#threshold = threshold;
    this.#elements = document.querySelectorAll(`.${elementsName}`);
    this.#startingClass = startingClass;
    this.#makeElementsHidden();
    this.#createObserver();
    this.#addObserverToElements();
  }
  /**
   * method creating the observer with the threshold given by user
   * @method
   */
  #createObserver() {
    this.#observer = new IntersectionObserver((e) => this.#observerCallback(e),
      { threshold: this.#threshold },
    );
  }

  /**
   * toggles "show" class when element is visible
   * @method
   */
  #observerCallback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.toggle("show", entry.isIntersecting);
        this.#observer.unobserve(entry.target);
      }
    })
  }

  /**
   * adds observer to each element that class name matches the className from the user
   * @method
   */
  #addObserverToElements() {
    for (const element of this.#elements) {
      this.#observer.observe(element);
    }
  }

  /**
   * adds starting class to specified elements
   * @method
   */
  #makeElementsHidden() {
    this.#elements.forEach((element) => {
      element.classList.add(this.#startingClass);
    });
  }
}
export default AppearOnScroll;
