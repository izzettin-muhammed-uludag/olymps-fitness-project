
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