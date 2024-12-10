/**
* Template Name: Vesperr
* Template URL: https://bootstrapmade.com/vesperr-free-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort
        });
    });

    // Portfolio filters with animation
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
            isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
            this.classList.add('filter-active');
            initIsotope.arrange({
                filter: this.getAttribute('data-filter')
            });

            // Optional: Add animation on the filtered items
            let filteredItems = isotopeItem.querySelectorAll('.isotope-item');
            filteredItems.forEach(item => {
                item.style.opacity = '0'; // Hide items with a fade-out effect
            });

            setTimeout(() => {
                filteredItems.forEach(item => {
                    item.style.transition = 'opacity 0.3s ease';
                    item.style.opacity = '1'; // Fade-in items
                });
            }, 300);

            if (typeof aosInit === 'function') {
                aosInit(); // Reinitialize animations if necessary
            }
        }, false);
    });

    // Search functionality with smooth filtering and fade effects
    document.getElementById('portfolio-search').addEventListener('input', function(event) {
        let searchQuery = event.target.value.toLowerCase(); // Get the search query

        // Filter items based on the search query
        let filteredItems = isotopeItem.querySelectorAll('.isotope-item');

        filteredItems.forEach(function(item) {
            let title = item.querySelector('.portfolio-info h4').textContent.toLowerCase();
            let description = item.querySelector('.portfolio-info p').textContent.toLowerCase();

            // Apply smooth hide/show transition based on search query match
            if (title.includes(searchQuery) || description.includes(searchQuery)) {
                item.style.display = "block"
                item.style.opacity = '1'; // Show item with a fade-in effect
                item.style.transition = 'opacity 0.3s ease-in-out';
            } else {
                item.style.display = "none"
                item.style.opacity = '0'; // Hide item with a fade-out effect
                item.style.transition = 'opacity 0.3s ease-in-out';
            }
        });

        // Re-arrange the Isotope layout after filtering
        initIsotope.arrange();

        if (typeof aosInit === 'function') {
            aosInit(); // Reinitialize animations if necessary
        }
    });
});


  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener("DOMContentLoaded", () => {
  // Select all theme items
  const themeItems = document.querySelectorAll('.dropdown-item');

  // Add event listeners to each theme item
  themeItems.forEach((item) => {
      item.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default link behavior

          // Remove any previously applied background color classes
          document.body.classList.remove('bg-color-1', 'bg-color-2', 'bg-color-3', 'bg-color-4', 'bg-color-5');

          // Get the theme's class and add it to the body
          const themeClass = item.classList[1]; // e.g. 'color-1'
          const bgClass = 'bg-' + themeClass.split('-')[1]; // e.g. 'bg-1'
          document.body.classList.add(bgClass);
      });
  });
});



const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
// Attach click listeners to all portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', function () {
    const title = this.querySelector('h4').innerText;
    const description = this.querySelector('p').innerText;
    const imageSrc = this.querySelector('img').getAttribute('src');

    // Save data to localStorage for universal use in card.html
    localStorage.setItem('cardTitle', title);
    localStorage.setItem('cardDescription', description);
    localStorage.setItem('cardImage', imageSrc);

    // Redirect to card.html
    window.location.href = 'card.html';
  });
});




const toggleButton = document.getElementById("darkModeToggle");
const body = document.body;

// Check for saved user preference in localStorage
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "☀️";
}

// Event listener for toggle button
toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode"); // Toggle the .dark-mode class on the body

    // Update button text and save preference
    if (body.classList.contains("dark-mode")) {
        toggleButton.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggleButton.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});