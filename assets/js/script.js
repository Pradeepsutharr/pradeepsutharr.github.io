// ("use strict");

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const btnicon = document.querySelector(".toggleBtn");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    btnicon.setAttribute("name", "close-outline");
  } else {
    btnicon.setAttribute("name", "layers-outline");
  }
});

// testimonials variables
// const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
// const modalContainer = document.querySelector("[data-modal-container]");
// const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
// const overlay = document.querySelector("[data-overlay]");

// // modal variable
// const modalImg = document.querySelector("[data-modal-img]");
// const modalTitle = document.querySelector("[data-modal-title]");
// const modalText = document.querySelector("[data-modal-text]");

// // modal toggle function
// const testimonialsModalFunc = function () {
//   modalContainer.classList.toggle("active");
//   overlay.classList.toggle("active");
// };

// // add click event to all modal items
// for (let i = 0; i < testimonialsItem.length; i++) {
//   testimonialsItem[i].addEventListener("click", function () {
//     modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
//     modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
//     modalTitle.innerHTML = this.querySelector(
//       "[data-testimonials-title]"
//     ).innerHTML;
//     modalText.innerHTML = this.querySelector(
//       "[data-testimonials-text]"
//     ).innerHTML;

//     testimonialsModalFunc();
//   });
// }

// // add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Typing Text Start----------
const span = document.querySelector(".typing_txt span");
const textArr = span.getAttribute("data-text").split(", ");
const maxTextIndex = textArr.length;
const sPerChar = 0.15;
const sBetweenWord = 1.5;
let textIndex = 0;

typing(textIndex, textArr[textIndex]);

function typing(textIndex, text) {
  let charIndex = 0;
  const typeInterval = setInterval(() => {
    span.innerHTML += text[charIndex];
    if (charIndex++ === text.length - 1) {
      clearInterval(typeInterval);
      setTimeout(() => deleting(textIndex, text), sBetweenWord * 700);
    }
  }, sPerChar * 300);
}

function deleting(textIndex, text) {
  let charIndex = text.length - 1;
  const typeInterval = setInterval(() => {
    span.innerHTML = text.substring(0, charIndex--);
    if (charIndex < 0) {
      clearInterval(typeInterval);
      textIndex = (textIndex + 1) % maxTextIndex;
      setTimeout(
        () => typing(textIndex, textArr[textIndex]),
        sBetweenWord * 300
      );
    }
  }, sPerChar * 300);
}

// Import skills and projects from Data.js
import { skills, projects } from "./Data.js";

// Ensure the DOM is loaded before executing script
window.addEventListener("DOMContentLoaded", function () {
  // Render Skills
  skills.map((skill, index) => {
    const skillElement = document.createElement("li");
    skillElement.classList.add("skills-item");

    skillElement.innerHTML = `<div class="title-wrapper">
                  <h5 class="h5">${skill.name}</h5>
                  <data value="${skill.progress}">${skill.progress}%</data>
                </div>

                <div class="skill-progress-bg">
                  <div class="skill-progress-fill" style="width:${skill.progress}%"></div>
                </div>`;

    document.querySelector(".skills-list").appendChild(skillElement);
  });

  // Render projects
  projects.forEach((project, index) => {
    const projectElement = document.createElement("li");
    projectElement.classList.add("project-item", "active"); // Ensure 'active' class is added
    projectElement.setAttribute("data-filter-item", "");
    projectElement.setAttribute("data-category", project.category);

    // Set the data-index attribute to use for modal referencing
    projectElement.innerHTML = `
      <a href="#">
        <figure class="project-img">
          <div class="project-item-icon-box" data-index="${index}">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${project.image}" alt="${project.alt}" loading="lazy" />
        </figure>
        <h3 class="project-title">${project.name}</h3>
        <p class="project-category">${project.category}</p>
      </a>`;
    document.querySelector(".project-list").appendChild(projectElement);
  });

  // Filter items based on selected value
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const filterFunc = function (selectedValue) {
    filterItems.forEach((item) => {
      if (
        selectedValue === "all" ||
        selectedValue === item.dataset.category.toLowerCase()
      ) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // Handle filter buttons (for larger screens)
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  let lastClickedBtn = filterBtn[0]; // Start with the first button as active

  filterBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      filterFunc(selectedValue);

      // Update active button styling
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // Handle select dropdown (for mobile screens)
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");

  select.addEventListener("click", function () {
    this.classList.toggle("active");
  });

  selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      select.classList.remove("active");
      filterFunc(selectedValue);
    });
  });

  // Modal functionality
  const modal = document.getElementById("modal");
  const modalOpen = document.querySelectorAll(".project-item-icon-box");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-img");
  const modalDetails = document.getElementById("modal-details");

  modalOpen.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      const index = this.getAttribute("data-index");
      const project = projects[index];

      // modalImage.setAttribute("src", project.image);
      modalTitle.innerText = project.name;
      modalDetails.innerText = project.description;

      modal.style.display = "flex";
    });
  });

  // Modal close button
  modalClose.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal on outside click
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
