// Burger menu handling

const burgerMenuElement = document.querySelector(".header_nav_burger");
burgerMenuElement.addEventListener("click", () => {
  const mobileMenuElement = document.querySelector(".header_menu_bg");
  let navigationElement = document.querySelector('.header_nav');
  let contactElement = document.querySelector('.header_contact');

  navigationElement = navigationElement.cloneNode(true);
  contactElement = contactElement.cloneNode(true);

  const isActive = mobileMenuElement.dataset.active;
  if (!isActive || isActive === "false") {
    mobileMenuElement.dataset.active = true;
    mobileMenuElement.appendChild(navigationElement);

    navigationElement.classList.remove('header_nav');
    navigationElement.classList.add('header_nav_mobile');

    contactElement.classList.remove('header_contact');
    contactElement.classList.add('header_contact_mobile');

    mobileMenuElement.appendChild(contactElement);
  }
});

const closeBurgerMenuBtn = document.querySelector(".header_menu_bg_exit_btn");
closeBurgerMenuBtn.addEventListener("click", () => {
  const mobileMenuElement = document.querySelector(".header_menu_bg");

  if (mobileMenuElement.dataset.active) {
    mobileMenuElement.dataset.active = false;
    mobileMenuElement.querySelector('.header_nav_mobile').remove();
  }
});
