/*=========================

LOADER

==========================*/

window.addEventListener("load", () => {

  setTimeout(() => {

    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

  }, 1500);

});

/*=========================

NAVBAR

==========================*/

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {

    navbar.classList.add("scrolled");

  } else {

    navbar.classList.remove("scrolled");

  }

});

/*=========================

REVEAL

==========================*/

const reveals = document.querySelectorAll(".reveal");

function reveal() {

  reveals.forEach(section => {

    const top = section.getBoundingClientRect().top;

    const visible = window.innerHeight - 120;

    if (top < visible) {

      section.classList.add("active");

    }

  });

}

window.addEventListener("scroll", reveal);

reveal();

/*=========================

COUNTER

==========================*/

const counters = document.querySelectorAll(".stats h2");

counters.forEach(counter => {

  const update = () => {

    const target = counter.innerText;

    let value = parseInt(counter.getAttribute("data-value"));

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

/*=========================

CURSOR LIGHT

==========================*/

const light = document.getElementById("cursor-light");

document.addEventListener("mousemove", (e) => {

  light.style.left = e.clientX + "px";

  light.style.top = e.clientY + "px";

});

/*=========================

TOP BUTTON

==========================*/

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {

    topButton.style.display = "block";

  } else {

    topButton.style.display = "none";

  }

});

topButton.onclick = () => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

};

/*=========================

PARALLAX HERO

==========================*/

const hero = document.querySelector(".hero");

document.addEventListener("mousemove", (e) => {

  let x = (window.innerWidth / 2 - e.pageX) / 45;

  let y = (window.innerHeight / 2 - e.pageY) / 45;

  hero.style.transform = `translate(${x}px,${y}px)`;

});

/*=========================

TYPEWRITER

==========================*/

const title = document.querySelector(".hero h1");

const original = title.innerHTML;

title.innerHTML = "";

let i = 0;

function typing() {

  if (i < original.length) {

    title.innerHTML += original.charAt(i);

    i++;

    setTimeout(typing, 35);

  }

}

typing();
/*=========================

TESTIMONIOS

==========================*/

const testimonials = document.querySelectorAll(".testimonial");

let current = 0;

setInterval(() => {

  testimonials[current].classList.remove("active");

  current++;

  if (current >= testimonials.length) {

    current = 0;

  }

  testimonials[current].classList.add("active");

}, 5000);