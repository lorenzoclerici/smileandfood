(function () {
  "use strict";

  // Paste here the Web App URL from Google Apps Script (Deploy → New deployment)
  var GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxWZzhAs-MzOV4UXXGHHvr2dW_E229PA4Iod6nyflyDuYiQce9hGom6RziGuitCIm4Z/exec";

  var formSection = document.getElementById("contatto");
  var leadForm = document.getElementById("lead-form");
  var experienceSelect = document.getElementById("esperienza");

  var experienceLabels = {
    "cooking-class": "Cooking Class",
    "foodtour": "Food Tour",
    "private-chef": "Private Chef",
    "non-so": "Not sure yet — help me choose"
  };

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

      if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.indexOf("PASTE_YOUR_") === 0) {
        console.error("Google Script URL missing. Set GOOGLE_SCRIPT_URL in js/main.js");
        window.location.href = "/thank-you";
        return;
      }

      var submitBtn = leadForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      var formData = new FormData(leadForm);
      var esperienzaValue = formData.get("esperienza") || "";
      formData.set(
        "esperienza",
        experienceLabels[esperienzaValue] || esperienzaValue
      );
      formData.delete("privacy");

      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      })
        .then(function () {
          window.location.href = "/thank-you";
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send request →";
          }
          alert("Something went wrong while sending the form. Please try again or contact us directly.");
        });
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
