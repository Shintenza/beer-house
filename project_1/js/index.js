import AppearOnScroll from './appearOnScroll.js'
import HeroHandler from './heroHandler.js'



new HeroHandler("carousel_slides");
new AppearOnScroll("features_ft", "slide_from_left");
new AppearOnScroll("beers_container", "slide_from_right", 0.2);
new AppearOnScroll("reviews_container", "slide_from_left");
new AppearOnScroll("visit_container", "slide_from_right", 0.3);
