
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  // const select = (el, all = false) => {
  //   el = el.trim() 
  //   if (all) {
  //     return [...document.querySelectorAll(el)]
  //   } else {
  //     return document.querySelector(el)
  //   }
  // }

  function select(ex, all) {
    ex = ex.trim();

    if (all) {
        var elements = document.querySelectorAll(ex);
        var elementsArray = Array.prototype.slice.call(elements);
        return elementsArray;
    } else {
        return document.querySelector(ex);
    }
}


  /**
   * Easy event listener function
   */
  const on = (type, ex, listener, all = false) => {
    let selectEl = select(ex, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset(top of the elemet header)
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle(exit (x))
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 110,
      backSpeed: 70,
      backDelay: 1000
    });
  }

 

  /**
   * Porfolio filtering 
   */
 // Wait for the page to fully load before executing the script
window.addEventListener('load', () => {
  // Find the portfolio container element
  const portfolioContainer = document.querySelector('.portfolio-container');

  // Check if the portfolio container element exists
  if (portfolioContainer) {
    // Initialize Isotope for the image category
    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item'
    });

    // Select all filter items inside the #portfolio-filters list
    const portfolioFilters = document.querySelectorAll('#portfolio-flters li');

    // Add a click event listener to each filter item
    portfolioFilters.forEach(filterItem => {
      filterItem.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior

        // Remove 'filter-active' class from all filter items
        portfolioFilters.forEach(el => {
          el.classList.remove('filter-active');
        });

        // Add 'filter-active' class to the clicked filter item
        filterItem.classList.add('filter-active');

        // Get the filter value from the 'data-filter' attribute of the clicked item
        const filterValue = filterItem.getAttribute('data-filter');

        // Use Isotope to arrange the portfolio items based on the filter value
        portfolioIsotope.arrange({
          filter: filterValue
        });

        // If you're using AOS animations, refresh them after rearranging the items
        AOS.refresh();
      });
    });
  }
});


  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '100vh'
  });

  /**
   * Photograpgy details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


//loadibg anumation
  // document.addEventListener("DOMContentLoaded", function() {
  //   var natureProgressBar = document.querySelector('.nature-progress-bar');
  //   var natureSkillValue = natureProgressBar.getAttribute('aria-valuenow') + '%';
  //   natureProgressBar.style.width = natureSkillValue;
  // });



  // document.addEventListener("DOMContentLoaded", function() {
  //   var natureProgressBars = document.querySelectorAll('.nature-progress-bar');
  
  //   natureProgressBars.forEach(function(bar) {
  //     var skillValue = bar.getAttribute('aria-valuenow') + '%';
  //     var imageUrl=bar.getAttribute('data-image-url');
  //     bar.style.width = skillValue;
  //     bar.style.backgroundImage="url('" + imageUrl + "')";
  //     bar.style.backgroundSize='cover';
  //     bar.style.backgroundRepeat='no-repeat';
  //     bar.style.backgroundPosition='right';
  
  //   });
  // });
  document.addEventListener("DOMContentLoaded", function() {
    var natureProgressBars = document.querySelectorAll('.nature-progress-bar');

    // Function to animate the progress bar
    function animateProgressBar(bar) {
        var skillValue = bar.getAttribute('aria-valuenow') + '%';
        var imageUrl = bar.getAttribute('data-image-url');
        bar.style.backgroundImage = "url('" + imageUrl + "')";
        bar.style.backgroundSize = 'cover';
        bar.style.backgroundRepeat = 'no-repeat';
        bar.style.backgroundPosition = 'right';

        // Trigger the animation
        setTimeout(() => { // Timeout is used to ensure the transition occurs 
            bar.style.width = skillValue;
        }, 0);
    }

    // Intersection Observer to trigger animation when in view
    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
             observer.unobserve(entry.target); // to only allow the trigerng once 
            } else {
                entry.target.style.width = '0'; // Reset animation
            }
        });
    }, { threshold: 0.6 }); // Adjust threshold as needed

    // Observe each progress bar
    natureProgressBars.forEach(bar => {
        observer.observe(bar);
    });
});





  /**
   * smooth slding Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: false,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  // new PureCounter();

})()

document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('darkModeToggle');

  toggleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const images = ['pexels-marina-zvada-19562918.jpg', 'pexels-liszt-yu-59106.jpg', 'pexels-philip-ackermann-1666012.jpg','pexels-eberhard-grossgasteiger-691668.jpg']; 
  let currentImage = 0;
  const imgElement = document.querySelector('.img-fluid2');

  setInterval(() => {
    imgElement.style.opacity = 0;

    setTimeout(() => {
      currentImage = (currentImage + 1) % images.length;
      imgElement.src = images[currentImage];
      imgElement.style.opacity = 1;
    }, 1000);
  }, 4000); 



   // Disable right-click on images
   document.querySelectorAll('img').forEach(img => { //event list
    img.addEventListener('contextmenu', function(e) { //standard evennt when right clicked
        e.preventDefault();
    });
});
});
