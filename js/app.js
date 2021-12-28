/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navBar = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function deacitvateNavBarElement(event){
    // Make sure the pointer moved away from is a list element not the container 
    if(event.target.tagName === 'LI'){
        event.target.style.backgroundColor = '#000';
        event.target.style.color = '#fff';
    }
}
function activateNavBarElement(event){
    if(event.target.tagName === 'LI'){
        event.target.style.cursor = 'pointer';
        event.target.style.backgroundColor = '#fff';
        event.target.style.color = '#000';
    }
}
// build the nav

function buildNavBar(){
    // Create document fragment
    const fragment = document.createDocumentFragment();
    // Create li elements for the navBar and append them to document fragament
    for(let i = 0; i < sections.length; i++){
        const newListEl = document.createElement('li');
        newListEl.textContent = sections[i].dataset.nav;
        // Create id for each li to link with corresponding section
        newListEl.setAttribute('id', sections[i].id + 'nv');
        fragment.appendChild(newListEl);
    }
    // Append the document fragment to the navBar ul
    navBar.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport

function addClassActive(event){
    for(let i = 0; i < sections.length; i++){
        //Get section boundries
        const rect = sections[i].getBoundingClientRect();
        // If section is active deactivate
        if(sections[i].classList.contains('your-active-class')){
            sections[i].classList.remove('your-active-class');
        }

        // Get li id which is linked to this section
        const navBarElId = '#' + sections[i].id + 'nv';
        const targetNav = document.querySelector(navBarElId);
        // If the li is active deactivate
        if(targetNav.classList.contains('your-active-class')){
            targetNav.classList.remove('your-active-class');
        }
        // Check if section in viewport
        if ((rect.top >= 0 && rect.top <= window.innerHeight/2) || 
        (rect.bottom > window.innerHeight/2 && rect.bottom < window.innerHeight) || 
        (rect.top < 0 && rect.bottom >= window.innerHeight)){
            // If in viewport
            // Activate section
            sections[i].classList.add('your-active-class');
            // Activate li
            targetNav.classList.add('your-active-class');
        }
    }
    
}

// Scroll to anchor ID using scrollTO event

function scrollToAnchor(event){
    // Make sure li is clicked not container
    if(event.target.tagName === 'LI'){
        //Get section id from corresponding li id
        const targetSecId = '#' + event.target.id.substring(0, event.target.id.length - 2);
        const targetSection = document.querySelector(targetSecId);
        // Smooth scroll to the begining of the section
        targetSection.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }  
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

document.addEventListener('DOMContentLoaded', buildNavBar);

// Scroll to section on link click

navBar.addEventListener('click', scrollToAnchor);

// Set sections as active

document.addEventListener('scroll', addClassActive);

// Change navigation bar element style when pointer is over element

document.addEventListener('pointerover', activateNavBarElement);

// Return navigation bar element style back when pointer is out of element

navBar.addEventListener('pointerout', deacitvateNavBarElement);