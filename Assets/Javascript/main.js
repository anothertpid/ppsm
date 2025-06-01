// Theme toggle logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Apply saved theme on load
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
    if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
} else {
    document.documentElement.classList.remove('dark');
    if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
    if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
        // toggle icons inside button
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
        if (themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');

        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
            // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    });
}


// Header scroll effect
window.addEventListener('scroll', function() {
    const navbarElement = document.getElementById('navbar');
    let pillNavContainer = null;
    if (navbarElement) {
        pillNavContainer = navbarElement.querySelector('div'); // Get the inner div
    }

    if (pillNavContainer) { // Check if pillNavContainer was found
        if (window.scrollY > 30) { // Adjusted threshold
            // Increase blur and shadow intensity on scroll
            pillNavContainer.classList.remove('backdrop-blur-lg', 'shadow-xl');
            pillNavContainer.classList.add('backdrop-blur-xl', 'shadow-2xl');
        } else {
            // Revert to initial blur and shadow intensity
            pillNavContainer.classList.remove('backdrop-blur-xl', 'shadow-2xl');
            pillNavContainer.classList.add('backdrop-blur-lg', 'shadow-xl');
        }
    }
});

// Header slide-in animation on page load
document.addEventListener('DOMContentLoaded', () => {
    const topHeader = document.getElementById('top-header');
    if (topHeader) {
        // Delay slightly to ensure styles are applied before transition starts
        setTimeout(() => {
            topHeader.classList.remove('-translate-y-full');
        }, 100);
    }

    // Sliding nav indicator logic
    const navLinksContainer = document.getElementById('nav-links-container');
    const navIndicator = document.getElementById('nav-indicator');

    if (navLinksContainer && navIndicator) { // Check if these elements exist
        const navLinks = navLinksContainer.querySelectorAll('[data-navlink]');

        function updateIndicator(targetLink, isPermanent = false) {
            if (!targetLink) return;
            navIndicator.style.width = `${targetLink.offsetWidth}px`;
            navIndicator.style.left = `${targetLink.offsetLeft}px`;

            navLinks.forEach(link => {
                link.classList.remove('text-white', 'font-semibold', 'text-gray-900');
                link.classList.add('text-gray-700');
            });
            targetLink.classList.remove('text-gray-700');
            targetLink.classList.add('text-white', 'font-semibold');

            if (isPermanent) {
                navLinksContainer.dataset.activeLinkIndex = Array.from(navLinks).indexOf(targetLink);
            }
        }

        if (navLinks.length > 0) {
            let activeLink = null;

            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            navLinks.forEach((link, index) => {
                const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
                if (linkPage === currentPage) {
                    activeLink = link;
                    navLinksContainer.dataset.activeLinkIndex = index;
                }
            });

            if (!activeLink && navLinks.length > 0) {
                activeLink = navLinks[0];
                navLinksContainer.dataset.activeLinkIndex = 0;
            }

            if (activeLink) {
                setTimeout(() => updateIndicator(activeLink, true), 50);
            }

            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => updateIndicator(link));
                link.addEventListener('focus', () => updateIndicator(link));
            });

            navLinksContainer.addEventListener('mouseleave', () => {
                const activeIndex = navLinksContainer.dataset.activeLinkIndex;
                if (activeIndex !== undefined && navLinks[activeIndex]) {
                    updateIndicator(navLinks[activeIndex], true);
                } else if (navLinks.length > 0) {
                    updateIndicator(navLinks[0], true);
                }
            });
        }
    }
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // !!! IMPORTANT: Replace with your actual email address !!!
            const recipientEmail = 'mahesh.placeholder@example.com';

            let mailtoLink = `mailto:${recipientEmail}`;
            mailtoLink += `?subject=${encodeURIComponent(subject + " - Portfolio Contact from " + name)}`;
            mailtoLink += `&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

            window.location.href = mailtoLink;

            // Optional: Clear form fields after attempting to open email client
            // contactForm.reset(); 
            // Or show a success message
            // alert('Your email client should now open to send the message. Thank you!');
        });
    }
    // Back to Top Button Logic
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) { // Show button after scrolling 50px
                backToTopButton.classList.remove('hidden', 'opacity-0');
                backToTopButton.classList.add('opacity-100');
            } else {
                backToTopButton.classList.add('opacity-0');
                // Delay hiding to allow fade-out transition
                setTimeout(() => {
                    if (window.pageYOffset <= 50) { // Re-check condition before hiding
                        backToTopButton.classList.add('hidden');
                    }
                }, 300); // Match transition duration
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
        });
    }
});