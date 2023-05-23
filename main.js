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

// Navbar menu item buttons scroll to the section
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', event => {
    const menu = event.target.dataset.menu;
    if (menu == null || menu == undefined) return;
    document.querySelector('.navbar__menu__item.active').classList.remove('active');
    event.target.classList.add('active');
    scrollIntoView(menu);
});

// Contact me button scroll to the section
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
    scrollIntoView('#contact');
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
}

// Scrolling down makes home section gradually transparent
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    let opacity = 1 - window.scrollY / homeHeight;
    home.style.opacity = opacity;
}); 

// Arrow up button scroll to home
const arrow = document.querySelector('.arrowup-btn');
arrow.addEventListener('click', () => {
    scrollIntoView('#home');
});

document.addEventListener('scroll', () => {
    if (window.scrollY / homeHeight > 0.5) {
        arrow.classList.add('visible');
    } else {
        arrow.classList.remove('visible');
    }
});

// Project filtering
const categories = document.querySelector('.work__categories');
const workProjects = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
categories.addEventListener('click', event => {
    const target = event.target;
    const category = target.dataset.category;
    if (category == null || category == undefined) return;
    document.querySelector('.category__btn.active').classList.remove('active');
    target.classList.add('active');
    workProjects.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach(project => {
            if (project.classList.contains(category)) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });
        workProjects.classList.remove('anim-out');
    }, 300);
});



