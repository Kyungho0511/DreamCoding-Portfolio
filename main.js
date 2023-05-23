'use strict';

// Navbar becomes transparnet when it is on the top
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
    const target = event.target;
    const menu = target.dataset.menu;
    if (menu == null || menu == undefined) return;
    navbarMenu.classList.remove('active');
    scrollIntoView(menu);
});

// Navbar menu item is highlighted as user scrolls through sections
const sectionIds = [
    '#home', 
    '#about', 
    '#skills', 
    '#work', 
    '#testimonials', 
    '#contact',
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-menu="${id}"]`));

let selectedNavIndex;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // when scrolling down
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else { // when scrolling up
                selectedNavIndex = index - 1;
            }
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));
window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (window.scrollY + window.innerHeight === document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})

// Navbar toggle button for mobile screens
const toggleBtn = document.querySelector('.navbar__toggle-btn');
toggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// Contact me button scroll to the section
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
    scrollIntoView('#contact');
});

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

