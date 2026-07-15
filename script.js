/*=========================

LOADER

==========================*/

document.addEventListener("DOMContentLoaded", () => {

  const loader = document.getElementById("loader");

  if (loader) {

    setTimeout(() => {

      loader.style.opacity = "0";

      loader.style.visibility = "hidden";

    }, 1500);

  }

});

/*=========================

MODAL / AUTH FLOW

==========================*/

const authButtons = document.querySelectorAll("[data-open-modal]");
const modalOverlays = document.querySelectorAll(".modal-overlay");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const navAuthButton = document.getElementById("navAuthButton");
const profileMenuWrapper = document.getElementById("profileMenuWrapper");
const profileDropdown = document.getElementById("profileDropdown");
const logoutButton = document.getElementById("logoutButton");
const toast = document.getElementById("toastMessage");
const submitLoader = document.getElementById("submitLoader");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const registerModal = document.getElementById("registerModal");
const loginModal = document.getElementById("loginModal");
const successModal = document.getElementById("successModal");
const profileModal = document.getElementById("profileModal");
const dashboardModal = document.getElementById("dashboardModal");
const settingsModal = document.getElementById("settingsModal");
const jobDetailModal = document.getElementById("jobDetailModal");
const goHomeButton = document.getElementById("goHomeButton");
const goDashboardButton = document.getElementById("goDashboardButton");
const applyButton = document.getElementById("applyButton");
const detailJobTitle = document.getElementById("detailJobTitle");
const detailJobDescription = document.getElementById("detailJobDescription");
const detailJobCompany = document.getElementById("detailJobCompany");
const detailJobPay = document.getElementById("detailJobPay");
const detailJobCity = document.getElementById("detailJobCity");
const detailJobType = document.getElementById("detailJobType");
const jobsData = [
  {
    title: "Desarrollo Web para PyME",
    description: "Proyecto de creación de un sitio institucional, desarrollo de landing page y mejora de conversión para una empresa en crecimiento.",
    company: "NovaLabs",
    pay: "$1.200.000",
    city: "Cali",
    type: "Desarrollo Web"
  },
  {
    title: "Diseño de Logotipo",
    description: "Diseño de identidad visual y propuesta de marca para una nueva startup colombiana.",
    company: "Aural Studio",
    pay: "$450.000",
    city: "Medellín",
    type: "Diseño"
  },
  {
    title: "Instalación Eléctrica Residencial",
    description: "Instalación completa de cableado, enchufes y puntos eléctricos para vivienda nueva.",
    company: "Volt House",
    pay: "$700.000",
    city: "Bogotá",
    type: "Servicios"
  }
];
let currentJobId = 0;
let isLoggedIn = false;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  document.body.classList.add("modal-open");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  const focusable = modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
  if (focusable.length) focusable[0].focus();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  if (document.querySelectorAll(".modal-overlay.active").length === 0) {
    document.body.classList.remove("modal-open");
  }
}

function closeAllModals() {
  modalOverlays.forEach(modal => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  });
  document.body.classList.remove("modal-open");
}

function setAuthStateLoggedIn() {
  isLoggedIn = true;
  if (navAuthButton) {
    navAuthButton.innerHTML = '<i class="fa-solid fa-user" aria-hidden="true"></i> Mi Perfil';
    navAuthButton.classList.add("profile-active");
    navAuthButton.setAttribute("data-open-modal", "profileModal");
  }
}

function setAuthStateLoggedOut() {
  isLoggedIn = false;
  if (navAuthButton) {
    navAuthButton.innerHTML = 'Comenzar';
    navAuthButton.classList.remove("profile-active");
    navAuthButton.setAttribute("data-open-modal", "registerModal");
  }
  if (profileDropdown) {
    profileDropdown.classList.remove("active");
  }
}

function validateField(name, value, fieldError) {
  switch (name) {
    case "fullName":
      return value.trim().length >= 3 || "Ingresa tu nombre completo.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Ingresa un correo válido.";
    case "password":
      return value.length >= 8 || "La contraseña debe tener al menos 8 caracteres.";
    case "confirmPassword":
      return value === document.getElementById("password").value || "Las contraseñas no coinciden.";
    case "city":
      return value.trim().length >= 2 || "Ingresa tu ciudad.";
    case "specialty":
      return value.trim().length >= 2 || "Ingresa tu especialidad.";
    case "terms":
      return document.getElementById("terms").checked || "Debes aceptar los términos.";
    case "loginEmail":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Ingresa un correo válido.";
    case "loginPassword":
      return value.trim().length >= 1 || "Ingresa tu contraseña.";
    default:
      return true;
  }
}

function validateForm(form) {
  const fields = form.querySelectorAll("input, select, textarea");
  let isValid = true;
  fields.forEach(field => {
    const errorElement = form.querySelector(`[data-error-for="${field.id}"]`);
    if (!errorElement) return;
    const result = validateField(field.name || field.id, field.value, errorElement);
    if (result !== true) {
      errorElement.textContent = result;
      isValid = false;
    } else {
      errorElement.textContent = "";
    }
  });
  return isValid;
}

function showLoader() {
  if (submitLoader) {
    submitLoader.classList.add("active");
  }
}

function hideLoader() {
  if (submitLoader) {
    submitLoader.classList.remove("active");
  }
}

function populateJobDetail(jobId) {
  const job = jobsData[jobId];
  if (!job) return;
  currentJobId = jobId;
  detailJobTitle.textContent = job.title;
  detailJobDescription.textContent = job.description;
  detailJobCompany.textContent = job.company;
  detailJobPay.textContent = job.pay;
  detailJobCity.textContent = job.city;
  detailJobType.textContent = job.type;
}

authButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-open-modal");
    if (!modalId) return;
    if (modalId === "profileModal" && !isLoggedIn) {
      openModal("registerModal");
      return;
    }
    openModal(modalId);
  });
});

closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-close-modal");
    closeModal(modalId);
  });
});

modalOverlays.forEach(modal => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal.id);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllModals();
  }
});

registerForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = validateForm(registerForm);
  if (!isValid) {
    showToast("Revisa los campos obligatorios.");
    return;
  }
  showLoader();
  setTimeout(() => {
    hideLoader();
    closeModal("registerModal");
    openModal("successModal");
    setAuthStateLoggedIn();
  }, 1500);
});

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = validateForm(loginForm);
  if (!isValid) {
    showToast("Completa tus credenciales.");
    return;
  }
  closeModal("loginModal");
  setAuthStateLoggedIn();
  openModal("profileModal");
  showToast("Bienvenido de nuevo.");
});

logoutButton?.addEventListener("click", () => {
  setAuthStateLoggedOut();
  closeAllModals();
  showToast("Sesión cerrada.");
});

profileMenuWrapper?.addEventListener("click", () => {
  if (!isLoggedIn) return;
  profileDropdown?.classList.toggle("active");
});

goHomeButton?.addEventListener("click", () => {
  closeAllModals();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

goDashboardButton?.addEventListener("click", () => {
  closeModal("successModal");
  openModal("dashboardModal");
});

applyButton?.addEventListener("click", () => {
  showToast("Tu solicitud fue enviada correctamente.");
  closeModal("jobDetailModal");
});

document.querySelectorAll("[data-open-modal='jobDetailModal']").forEach(button => {
  button.addEventListener("click", () => {
    const jobId = Number(button.getAttribute("data-job-id") || 0);
    populateJobDetail(jobId);
  });
});

setAuthStateLoggedOut();

/*=========================

NAVBAR

==========================*/

const navbar = document.getElementById("navbar");

let navbarScrollScheduled = false;

window.addEventListener("scroll", () => {

  if (!navbarScrollScheduled) {

    navbarScrollScheduled = true;

    requestAnimationFrame(() => {

      if (window.scrollY > 50) {

        navbar?.classList.add("scrolled");

      } else {

        navbar?.classList.remove("scrolled");

      }

      navbarScrollScheduled = false;

    });

  }

}, { passive: true });

/*=========================

REVEAL

==========================*/

const reveals = document.querySelectorAll(".reveal");

let revealScheduled = false;

function reveal() {

  reveals.forEach(section => {

    const top = section.getBoundingClientRect().top;

    const visible = window.innerHeight - 120;

    if (top < visible) {

      section.classList.add("active");

    }

  });

  revealScheduled = false;

}

function scheduleReveal() {

  if (!revealScheduled) {

    revealScheduled = true;

    requestAnimationFrame(reveal);

  }

}

window.addEventListener("scroll", scheduleReveal, { passive: true });

reveal();

/*=========================

COUNTER

==========================*/

let countersStarted = false;

function startCounters() {

  if (countersStarted) return;

  countersStarted = true;

  const counters = document.querySelectorAll(".stats h2, .benchmark-stats .counter-value");

  counters.forEach(counter => {

    const update = () => {

      const target = counter.getAttribute("data-value");

      let value = parseInt(target) || 0;

      let current = parseInt(counter.innerText) || 0;

      let increment = value / 80;

      if (current < value) {

        counter.innerText = Math.ceil(current + increment);

        setTimeout(update, 25);

      } else {

        counter.innerText = target;

      }

    };

    update();

  });

}

// Detectar cuando la sección stats es visible

const statsSection = document.querySelector(".stats");

if (statsSection) {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        startCounters();

        observer.unobserve(entry.target);

      }

    });

  }, { threshold: 0.5 });

  observer.observe(statsSection);

}

/*=========================

CURSOR LIGHT

==========================*/

const light = document.getElementById("cursor-light");

let cursorActive = true;

document.addEventListener("mousemove", (e) => {

  if (!light || !cursorActive) return;

  cursorActive = false;

  light.style.left = e.clientX + "px";

  light.style.top = e.clientY + "px";

  setTimeout(() => {

    cursorActive = true;

  }, 8);

});

/*=========================

TOP BUTTON

==========================*/

const topButton = document.getElementById("topButton");

let topButtonScheduled = false;

window.addEventListener("scroll", () => {

  if (!topButtonScheduled) {

    topButtonScheduled = true;

    requestAnimationFrame(() => {

      if (topButton) {

        topButton.style.display = window.scrollY > 500 ? "block" : "none";

      }

      topButtonScheduled = false;

    });

  }

}, { passive: true });

if (topButton) {

  topButton.addEventListener("click", () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  });

}

/*=========================

PARALLAX HERO

==========================*/

const hero = document.querySelector(".hero");

let parallaxActive = true;

document.addEventListener("mousemove", (e) => {

  if (!hero || !parallaxActive) return;

  parallaxActive = false;

  let x = (window.innerWidth / 2 - e.pageX) / 45;

  let y = (window.innerHeight / 2 - e.pageY) / 45;

  hero.style.transform = `translate(${x}px,${y}px)`;

  setTimeout(() => {

    parallaxActive = true;

  }, 16);

});

/*=========================

TYPEWRITER

==========================*/

const title = document.querySelector(".hero h1");

if (title) {

  const original = title.textContent;

  title.textContent = "";

  let i = 0;

  function typing() {

    if (i < original.length) {

      title.textContent += original.charAt(i);

      i++;

      setTimeout(typing, 35);

    }

  }

  typing();

}
/*=========================

TESTIMONIOS

==========================*/

const testimonials = document.querySelectorAll(".testimonial");

if (testimonials.length > 0) {

  let current = 0;

  setInterval(() => {

    testimonials[current].classList.remove("active");

    current = (current + 1) % testimonials.length;

    testimonials[current].classList.add("active");

  }, 5000);

}