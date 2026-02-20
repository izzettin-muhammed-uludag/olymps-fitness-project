
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
  
  var nav = document.querySelector(".fitmaker-nav") || document.querySelector(".navbar-fitmaker");
  
  function onScroll() {
    if (!nav) return;
    
    
    if (window.scrollY > 50) {
      nav.style.background = "rgba(13,13,13,0.98)";
      nav.classList.add("scrolled");
      nav.classList.add("fitmaker-nav--scrolled");
    } else {
      
      nav.style.background = "";
      nav.classList.remove("scrolled");
      nav.classList.remove("fitmaker-nav--scrolled");
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
        (element.textContent.includes("%")
          ? "%"
          : element.textContent.includes("+")
            ? "+"
            : element.textContent.includes("/")
              ? "/7"
              : "");
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

authTabs.forEach(function (tab, index) {
  tab.addEventListener("click", function () {
    
    authTabs.forEach(function (t) { t.classList.remove("auth-card__tab--active"); });
    this.classList.add("auth-card__tab--active");

    
    if (index === 1) {
      nameField.style.display = "none";
      submitBtn.textContent = "Login";
    } else {
      nameField.style.display = "block";
      submitBtn.textContent = "Sign Up";
    }
  });
});