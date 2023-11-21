class Carousel {
  currentCarousellSize = 4;
  startingImgIndex = 0;
  slidesPadding = 0;

  constructor(carouselWrapperClass, slidesPadding = 10) {
    this.carouselWrapperElement = document.querySelector(
      `.${carouselWrapperClass}`,
    );
    this.slidesPadding = slidesPadding;

    this.carouselWrapperElement.style.gap = `${this.slidesPadding}px`;
    this.nextButton = this.carouselWrapperElement.querySelector(".next_btn");
    this.prevButton = this.carouselWrapperElement.querySelector(".prev_btn");

    this.updateCarouselSize();

    window.addEventListener("resize", this.updateCarouselSize.bind(this));
    this.nextButton.addEventListener("click", () => this.handleCarousel(1));
    this.prevButton.addEventListener("click", () => this.handleCarousel(-1));
  }

  updateCarouselSize() {
    const windowWidth = window.innerWidth;

    if (windowWidth > 1025) {
      this.currentCarousellSize = 4;
    } else if (windowWidth > 768) {
      this.currentCarousellSize = 2;
    } else {
      this.currentCarousellSize = 1;
    }

    this.resizeElements();
  }

  resizeElements() {
    const carouselParent = this.carouselWrapperElement.parentNode;
    const carouselParentWidth = carouselParent.children[0].offsetWidth;

    let slideSize =
      (carouselParentWidth -
        (this.currentCarousellSize - 1) * this.slidesPadding) /
      this.currentCarousellSize;

    for (let i = 2; i < this.carouselWrapperElement.children.length; i++) {
      const item = this.carouselWrapperElement.children[i];
      item.getElementsByTagName("img")[0].style.width = `${slideSize}px`;
      item.style.width = `${slideSize}px`;
    }
  }

  handleCarousel(direction) {
    const numberOfImages = this.carouselWrapperElement.children.length - 2;

    let numberOfImagesToSwipe = numberOfImages % this.currentCarousellSize;
    if (numberOfImagesToSwipe === 0) {
      numberOfImagesToSwipe = this.currentCarousellSize;
    }

    const lastImgIndex = this.startingImgIndex + this.currentCarousellSize - 1;

    if ((direction < 0 && this.startingImgIndex <= 0) ||
      (direction > 0 && lastImgIndex == numberOfImages - 1)
    )
      return;

    this.startingImgIndex = (this.startingImgIndex + direction * numberOfImagesToSwipe) % numberOfImages;

    for (let i = 0; i < numberOfImages; i++) {
      const item = this.carouselWrapperElement.children[i + 2];
      const itemWidth = item.offsetWidth;

      item.style.transform = `translateX(${(-itemWidth - this.slidesPadding) * this.startingImgIndex}px)`;
    }

  }
}

const imgCarousel = new Carousel("beers_imgs");
