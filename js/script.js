import translations from './data/translations.js';


document.addEventListener('DOMContentLoaded', () => {
  const langOptions = document.querySelectorAll('.lang-switcher__option');
  let currentLang = localStorage.getItem('siteLang') || 'en';

  function setLanguage(lang) {
    
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    
    langOptions.forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('lang-switcher__option--active');
      } else {
        opt.classList.remove('lang-switcher__option--active');
      }
    });

    localStorage.setItem('siteLang', lang);
    currentLang = lang;
    document.documentElement.lang = lang;
  }

  setLanguage(currentLang);

  langOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      const selectedLang = e.target.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });
});


window.addEventListener("load", function () {
  setTimeout(function () {
    var loader = document.getElementById("pageLoader");
    if (loader) {
      loader.classList.add("hidden");
      loader.classList.add("page-loader--hidden");
    }
  }, 500);
});


(function () {
  var nav = document.querySelector(".olympsfitness-nav");
  
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.style.background = "rgba(13,13,13,0.98)";
      nav.classList.add("olympsfitness-nav--scrolled");
    } else {
      nav.style.background = "";
      nav.classList.remove("olympsfitness-nav--scrolled");
    }
  }
  
  window.addEventListener("scroll", onScroll);
  onScroll();
})();


(function () {
  var badges = document.querySelectorAll(".stat-badge");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("stat-badge--visible");
        }
      });
    },
    { threshold: 0.1 },
  );
  badges.forEach(function (badge) {
    observer.observe(badge);
  });
})();


function animateCounter(element, target, duration) {
  var start = 0;
  var increment = target / (duration / 16);
  var current = 0;
  var timer = setInterval(function () {
    current += increment;
    if (current >= target) {
      element.textContent =
        target +
        (element.textContent.includes("%") ? "%" : element.textContent.includes("+") ? "+" : element.textContent.includes("/") ? "/7" : "");
      clearInterval(timer);
    } else {
      var value = Math.floor(current);
      if (element.textContent.includes("%")) {
        element.textContent = value + "%";
      } else if (element.textContent.includes("+")) {
        element.textContent = "+" + value;
      } else if (element.textContent.includes("/")) {
        element.textContent = "24/7";
      } else {
        element.textContent = value;
      }
    }
  }, 16);
}

var statsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var statNums = entry.target.querySelectorAll(".stats-bar__num");
        statNums.forEach(function (stat) {
          var text = stat.textContent.trim();
          var num = parseInt(text.replace(/[^0-9]/g, ""));
          if (!stat.classList.contains("stats-bar__num--counted")) {
            stat.classList.add("stats-bar__num--counted", "stats-bar__num--counting");
            animateCounter(stat, num, 2000);
          }
        });
      }
    });
  },
  { threshold: 0.5 },
);

var statsBar = document.querySelector(".stats-bar");
if (statsBar) {
  statsObserver.observe(statsBar);
}


AOS.init({
  duration: 1000,
  once: false,
  mirror: true,
  offset: 100,
  easing: "ease-out-cubic",
  delay: 0,
});


document.querySelectorAll(".plan-tabs__tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".plan-tabs__tab").forEach(function (t) {
      t.classList.remove("plan-tabs__tab--active");
    });
    this.classList.add("plan-tabs__tab--active");
  });
});


document.querySelectorAll(".faq-list__question").forEach(function (question) {
  question.addEventListener("click", function () {
    var parentItem = this.parentElement;
    var isOpen = parentItem.classList.contains("faq-list__item--open");
    
    document.querySelectorAll(".faq-list__item").forEach(function (item) {
      item.classList.remove("faq-list__item--open");
    });

    if (!isOpen) {
      parentItem.classList.add("faq-list__item--open");
    }
  });
});


var authTabs = document.querySelectorAll(".auth-card__tab");
var nameField = document.getElementById("nameField");
var submitBtn = document.getElementById("submitBtn");


var authTabs = document.querySelectorAll(".auth-card__tab");
var nameField = document.getElementById("nameField");
var submitBtn = document.getElementById("submitBtn");

authTabs.forEach(function (tab, index) {
  tab.addEventListener("click", function () {
    authTabs.forEach(function (t) { t.classList.remove("auth-card__tab--active"); });
    this.classList.add("auth-card__tab--active");

    let currentLang = localStorage.getItem('siteLang') || 'en';

    if (index === 1) { 
      nameField.style.display = "none";
      submitBtn.setAttribute("data-i18n", "btnLogin");
      submitBtn.textContent = translations[currentLang]["btnLogin"];
    } else { 
      
      nameField.style.display = "block";
      submitBtn.setAttribute("data-i18n", "btnSignUp");
      submitBtn.textContent = translations[currentLang]["btnSignUp"];
    }
  });
});


var navSignUpBtn = document.querySelector(".olympsfitness-nav__btn-signup");
var navLoginBtn = document.querySelector(".olympsfitness-nav__btn-login");
var contactSection = document.getElementById("contact");


if (navSignUpBtn) {
  navSignUpBtn.addEventListener("click", function (e) {
    e.preventDefault(); 
    contactSection.scrollIntoView({ behavior: "smooth" }); 
    if (authTabs[0]) authTabs[0].click(); 
  });
}


if (navLoginBtn) {
  navLoginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    contactSection.scrollIntoView({ behavior: "smooth" }); 
    if (authTabs[1]) authTabs[1].click(); 
  });
}



window.addEventListener('scroll', () => {
  let currentSection = '';
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.olympsfitness-nav__link');

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      currentSection = section.getAttribute('id');
    }
  });

  
  navLinks.forEach((link) => {
    
    link.classList.remove('olympsfitness-nav__link--active');
    
    
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('olympsfitness-nav__link--active');
    }
  });
});