import data from "./JS/data.js";
import languages from "./JS/languages.js";

const menuButton = document.querySelector("#menu-btn");
const navLinks = document.querySelector(".nav-links");
const closeBtn = document.querySelector("#close-btn");
const searchButton = document.querySelector("#search-btn");
const search = document.querySelector("#search");

function Navbar() {
  menuButton.addEventListener("click", () => {
    navLinks.style.left = "0px";
    closeBtn.addEventListener("click", () => {
      navLinks.style.left = "-150px";
    });
  });

  searchButton.addEventListener("click", () => {
    search.classList.toggle("active");
  });
}

function scrollBehavior() {
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth", // Smooth scroll behavior
        });
      }
    });
  });
}

function searchContent() {
  const searchInput = document.querySelector("#search");
  const jobCards = document.querySelectorAll(".jobs-card");

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const inputValue = searchInput.value.trim().toLowerCase();

      jobCards.forEach((jobCard) => {
        const jobTitle = jobCard
          .querySelector(".jobs-title")
          .textContent.toLowerCase();

        if (inputValue === "" || jobTitle.includes(inputValue)) {
          jobCard.style.display = "block";
        } else {
          jobCard.style.display = "none";
        }
      });
    }
  });
}

function filterJobs() {
  const filterInput = document.querySelector("#Jobs");
  const jobCards = document.querySelectorAll(".jobs-card");

  jobCards.forEach((jobCard) => {
    if (
      filterInput.value === "" ||
      jobCard.classList.contains(
        filterInput.value.replace(/\s+/g, "-").toLowerCase()
      )
    ) {
      jobCard.style.display = "block";
    } else {
      jobCard.style.display = "none";
    }
  });
}

document.querySelector("#Jobs").addEventListener("change", filterJobs);

function renderJobs() {
  const jobsContainer = document.querySelector("#job");
  jobsContainer.innerHTML = "";

  data.jobs.forEach((job) => {
    const jobsCard = document.createElement("div");
    jobsCard.classList.add(
      "jobs-card",
      job.title.replace(/\s+/g, "-").toLowerCase()
    );

    jobsCard.innerHTML = `
        <i class="fa-solid ${job.logo}"></i>
        <h1 class="jobs-title">${job.title}</h1>
        <p class="company">${job.company}</p>
        <p class="description">${job.description}</p>
        <a href="./pages/apply.html"><button class="btn apply">Apply</button></a>
      `;

    jobsContainer.appendChild(jobsCard);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  renderJobs();
  Navbar();
  scrollBehavior();
  searchContent();

  const languageSelect = document.querySelector("#language");
  languageSelect.addEventListener("change", () => {
    const selectedLanguage = languageSelect.value.toLowerCase();
    changeLanguage(selectedLanguage);
  });
});

function changeLanguage(selectedLanguage) {
  const languageData = languages[selectedLanguage];

  if (!languageData) {
    console.error(
      `Language data for '${selectedLanguage}' is undefined or null.`
    );
    return;
  }

  const titleElement = document.querySelector(".title");
  const subTitleElement = document.querySelector(".sub-title");
  const detailsElements = document.querySelectorAll(".details p");
  const mainBtnElements = document.querySelectorAll(".main-btn");

  if (titleElement) titleElement.textContent = languageData.title;
  if (subTitleElement) subTitleElement.textContent = languageData["sub-title"];
  if (detailsElements.length >= 3) {
    detailsElements[0].textContent = languageData.details;
    detailsElements[1].textContent = languageData.details2;
    detailsElements[2].textContent = languageData.details3;
  }
  if (mainBtnElements.length >= 2) {
    mainBtnElements[0].textContent = languageData["main-btn"];
    mainBtnElements[1].textContent = languageData["main-btn2"];
  }
  const btnElement = document.querySelector(".btn");
  if (btnElement) btnElement.textContent = languageData.btn;
}
