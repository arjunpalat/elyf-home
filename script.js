// DOM elements
let slider = document.querySelector(".slider");
let dots = Array.from(document.querySelectorAll(".dot"));
let slideWidth = document.querySelector(".slide").offsetWidth;
let totalScrollToCover = slider.scrollWidth - slider.offsetWidth + 2;
let projects = Array.from(document.querySelectorAll(".project"));
let projectImage = document.querySelector(".project-image");
let selectedProject = document.querySelector(".project.active");
let contactBtn = document.querySelector(".contact-btn");
let overlay = document.querySelector(".overlay");
let modal = overlay.querySelector(".modal");
let form = document.querySelector("#form");
let firstNameInput = document.querySelector("#first-name-input");
let lastNameInput = document.querySelector("#last-name-input");
let emailInput = document.querySelector("#email-input");
let termsCheckbox = document.querySelector("#tc-checkbox");
let formError = document.querySelector(".form-error");

// Interval ID for slider
let intervalId;

// Function to update dots based on current page
function updateDots() {
  let currentPage = Math.floor((3 * slider.scrollLeft) / totalScrollToCover);
  dots.forEach((dot, index) => {
    const dotCircle = dot.querySelector(".circle");
    if (index === currentPage) {
      dot.classList.add("active");
      dotCircle.classList.add("active");
    } else {
      dot.classList.remove("active");
      dotCircle.classList.remove("active");
    }
  });
}

// Function to move slider
function moveSlider() {
  slider.scrollLeft += 1;
  if (Math.ceil(slider.scrollLeft) >= slider.scrollWidth - slider.offsetWidth) {
    slider.scrollLeft = 0;
  }
  updateDots();
}

// Slider event listeners
slider.addEventListener("mouseover", (e) => {
  clearInterval(intervalId);
  if (e.target.classList.value === "slide") {
    e.target.parentNode.querySelector(".slide-details").classList.add("active");
  } else if (e.target.parentNode.classList.value === "slide-details") {
    e.target.parentNode.classList.add("active");
  } else if (
    e.target.parentNode.parentNode.classList.value === "slide-details"
  ) {
    e.target.parentNode.parentNode.classList.add("active");
  } else if (e.target.classList.value === "slide-details") {
    e.target.classList.add("active");
  }
});

slider.addEventListener("mouseout", (e) => {
  intervalId = setInterval(moveSlider, 20);
  if (e.target.classList.value === "slide-details active") {
    e.target.classList.remove("active");
  }
});

slider.addEventListener("scroll", updateDots);

// Start slider movement
intervalId = setInterval(moveSlider, 20);

// Project click event listeners
projects.forEach((project, index) => {
  project.addEventListener("click", () => {
    selectedProject.classList.remove("active");
    projectImage.src = `images/image${index}.png`;
    project.classList.add("active");
    selectedProject = project;
  });
});

// Function to close overlay
let closeOverlay = (e) => {
  if (!modal.contains(e.target) && e.target !== modal) {
    overlay.style.display = "none";
    document.querySelector("html").style.overflow = "auto";
    resetForm();
    document.removeEventListener("click", closeOverlay);
  }
};

// Contact button click event listener
contactBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  overlay.style.display = "block";
  document.querySelector("html").style.overflow = "hidden";
  document.addEventListener("click", closeOverlay);
});

// Function to reset form
const resetForm = () => {
  formError.innerHTML = "";
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  termsCheckbox.checked = false;
};

// Function to check form errors
const checkErrors = (formData) => {
  if (formData.firstName.trim() === "") return "First name is required";
  if (formData.lastName.trim() === "") return "Last name is required";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
    return "Email is not valid";
  if (!formData.terms) return "You must accept the terms and conditions";
  return null;
};

// Form submit event listener
form.addEventListener("submit", (e) => {
  const formData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    terms: termsCheckbox.checked,
  };

  const error = checkErrors(formData);

  if (error) {
    e.preventDefault();
    formError.innerHTML = error;
  }
});
