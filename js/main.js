(function () {
  "use strict";

  var formSection = document.getElementById("contatto");
  var leadForm = document.getElementById("lead-form");
  var experienceSelect = document.getElementById("esperienza");

  function scrollToForm(preselect) {
    if (preselect && experienceSelect) {
      experienceSelect.value = preselect;
    }
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  document.querySelectorAll("[data-scroll-form]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToForm(el.getAttribute("data-experience") || "");
    });
  });

  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!leadForm.checkValidity()) {
        leadForm.reportValidity();
        return;
      }

      var privacy = document.getElementById("privacy");
      if (privacy && !privacy.checked) {
        privacy.focus();
        return;
      }

      window.location.href = "/thank-you";
    });
  }

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (window.matchMedia("(max-width: 768px)").matches) {
    document.body.classList.add("has-sticky-cta");
  }

  window.matchMedia("(max-width: 768px)").addEventListener("change", function (e) {
    document.body.classList.toggle("has-sticky-cta", e.matches);
  });
})();
