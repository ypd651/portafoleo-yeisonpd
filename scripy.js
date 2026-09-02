(function () {
    "use strict";
  
    /* ---------- Modo oscuro ---------- */
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const themeLabel = themeToggle.querySelector(".theme-toggle-label");
    const STORAGE_KEY = "portafolio-theme";
  
    function applyTheme(theme) {
      if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
        themeLabel.textContent = "Modo claro";
        themeToggle.setAttribute("aria-label", "Cambiar a modo claro");
      } else {
        root.removeAttribute("data-theme");
        themeLabel.textContent = "Modo oscuro";
        themeToggle.setAttribute("aria-label", "Cambiar a modo oscuro");
      }
    }
  
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  
    themeToggle.addEventListener("click", function () {
      const isDark = root.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  
    /* ---------- Menú móvil ---------- */
    const mobileToggle = document.getElementById("mobileToggle");
    const sidebar = document.getElementById("sidebar");
  
    mobileToggle.addEventListener("click", function () {
      const open = sidebar.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", String(open));
    });
  
    document.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        sidebar.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  
    /* ---------- Resaltar sección activa al hacer scroll ---------- */
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const sections = navLinks
      .map(function (link) { return document.querySelector(link.getAttribute("href")); })
      .filter(Boolean);
  
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
  
    sections.forEach(function (section) { observer.observe(section); });
  
    /* ---------- Repositorios de GitHub en vivo ---------- */
    const GITHUB_USER = "ypd651";
    const repoGrid = document.getElementById("repoGrid");
    const repoStatus = document.getElementById("repoStatus");
  
    fetch("https://api.github.com/users/" + GITHUB_USER + "/repos?sort=updated&per_page=6")
      .then(function (res) {
        if (!res.ok) throw new Error("No se pudo consultar GitHub");
        return res.json();
      })
      .then(function (repos) {
        if (!Array.isArray(repos) || repos.length === 0) {
          repoStatus.textContent = "Todavía no hay repositorios públicos — vuelve pronto.";
          return;
        }
        repoGrid.innerHTML = "";
        repos.forEach(function (repo) {
          const card = document.createElement("a");
          card.className = "repo-card";
          card.href = repo.html_url;
          card.target = "_blank";
          card.rel = "noopener noreferrer";
  
          const name = document.createElement("span");
          name.className = "repo-name";
          name.textContent = repo.name;
  
          const desc = document.createElement("span");
          desc.className = "repo-desc";
          desc.textContent = repo.description || "Sin descripción todavía.";
  
          const meta = document.createElement("span");
          meta.className = "repo-meta";
          const lang = repo.language ? "<span>" + repo.language + "</span>" : "";
          const stars = "<span>★ " + repo.stargazers_count + "</span>";
          meta.innerHTML = lang + stars;
  
          card.appendChild(name);
          card.appendChild(desc);
          card.appendChild(meta);
          repoGrid.appendChild(card);
        });
      })
      .catch(function () {
        repoStatus.textContent = "No se pudieron cargar los repositorios en este momento. Visita el perfil directamente en GitHub.";
      });
  
  })();
