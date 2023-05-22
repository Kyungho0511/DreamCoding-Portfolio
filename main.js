'use strict';

// Make navbar transparnet when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// navbar menu item buttons scroll to the section
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', event => {
    const menu = event.target.dataset.menu;
    document.querySelector('.navbar__menu__item.active').classList.remove('active');
    event.target.classList.add('active');
    if (!menu) return;
    scrollIntoView(menu);
});

// contact me button scroll to the section
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
    scrollIntoView('#contact');
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
}