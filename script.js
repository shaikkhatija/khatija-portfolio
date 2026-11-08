/* ============ DATA ============ */
const ICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const techSkills = [
  { name: "HTML5",       logo: `${ICON}/html5/html5-original.svg` },
  { name: "CSS3",        logo: `${ICON}/css3/css3-original.svg` },
  { name: "JavaScript",  logo: `${ICON}/javascript/javascript-original.svg` },
  { name: "React.js",    logo: `${ICON}/react/react-original.svg` },
  { name: "Python",      logo: `${ICON}/python/python-original.svg` },
  { name: "SQLite",      logo: `${ICON}/sqlite/sqlite-original.svg` },
];

const tools = [
  { name: "GitHub", logo: `${ICON}/github/github-original.svg`, invert: true },
  { name: "VS Code", logo: `${ICON}/vscode/vscode-original.svg` },
];

/*
  PROJECTS
  The two projects below come from your resume. The "github" and "demo" links are
  PLACEHOLDERS (your resume PDF also has placeholder links) -- replace them with
  your real repository and live/video links.

  The checklist asks for 4-5 projects. Copy the template at the bottom, fill it in,
  and the "View more" button appears automatically once there are more than 3.
*/
const projects = [
  {
    title: "Brain Tumor Segmentation and Boundary Detection",
    cover: "assets/project-brain-tumor.jpg",
    fit: "contain",
    description:
      "Automated MATLAB image processing pipeline for brain MRI scans. Applies grayscale conversion, contrast enhancement and noise reduction, then threshold-based segmentation to localize tumor regions and trace their boundaries.",
    tech: ["MATLAB", "Image Processing"],
    github: "https://github.com/shaikkhatija/YOUR-REPO-NAME",
    demo: "https://your-live-project-url.com",
    demoLabel: "Live Demo",
  },
  {
    title: "Footstep Power Generation with Automatic Garden Watering System",
    cover: "assets/project-garden.jpg",
    description:
      "Dual-purpose green technology system that generates and stores electricity from footsteps, then uses automated sensor logic to power a micro-irrigation network for efficient watering and plant care.",
    tech: ["Embedded Systems", "Automation"],
    github: "https://github.com/shaikkhatija/YOUR-REPO-NAME",
    demo: "https://your-live-project-url.com",
    demoLabel: "Live Demo",
  },

  /* ---- TEMPLATE: copy, fill in, and remove the comment markers ----
  {
    title: "Your Project Title",
    cover: "assets/your-cover.jpg",
    description: "One or two lines about what it does and what you built.",
    tech: ["HTML5", "CSS3", "JavaScript", "React.js"],
    github: "https://github.com/shaikkhatija/your-repo",
    demo: "https://your-project.vercel.app",   // or a YouTube/Drive video link
    demoLabel: "Live Demo",                     // or "Watch Video"
  },
  ---- */
];

/* ============ RENDER SKILLS ============ */
function renderSkills(list, el) {
  el.innerHTML = list
    .map(
      (s) => `<li>
        <img src="${s.logo}" alt="${s.name} logo" loading="lazy" ${s.invert ? 'style="filter:invert(1)"' : ""} />
        <span>${s.name}</span>
      </li>`
    )
    .join("");
}
renderSkills(techSkills, document.getElementById("techGrid"));
renderSkills(tools, document.getElementById("toolGrid"));

/* ============ RENDER PROJECTS ============ */
const grid = document.getElementById("projectGrid");
const viewMore = document.getElementById("viewMore");

// A button is shown only when its link is real (not empty or a placeholder).
const isReal = (u) => u && !/your-|YOUR|example\.com/i.test(u);
function actions(p) {
  const btns = [];
  if (isReal(p.github)) btns.push(`<a class="btn btn-outline btn-sm" href="${p.github}" target="_blank" rel="noopener">GitHub</a>`);
  if (isReal(p.demo)) btns.push(`<a class="btn btn-primary btn-sm" href="${p.demo}" target="_blank" rel="noopener">${p.demoLabel || "Live Demo"}</a>`);
  return btns.length ? `<div class="card-actions">${btns.join("")}</div>` : "";
}

grid.innerHTML = projects
  .map(
    (p, i) => `
  <article class="project-card ${i >= 3 ? "extra" : ""}">
    <img class="${p.fit || ""}" src="${p.cover}" alt="${p.title} cover image" loading="lazy" />
    <div class="card-body">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <ul class="tags">${p.tech.map((t) => `<li>${t}</li>`).join("")}</ul>
      ${actions(p)}
    </div>
  </article>`
  )
  .join("");

if (projects.length > 3) {
  viewMore.hidden = false;
  viewMore.addEventListener("click", () => {
    const open = grid.classList.toggle("expanded");
    viewMore.textContent = open ? "View less" : "View more projects";
  });
}

/* ============ NAVBAR ============ */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
  })
);

// highlight the link of the section being viewed
const sections = [...document.querySelectorAll("main section[id]")];
const links = [...navLinks.querySelectorAll('a[href^="#"]')];
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      }
    }),
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => io.observe(s));

/* ============ CONTACT FORM ============ */
/*
  1. Create a free form at https://formspree.io and copy its ID.
  2. Replace YOUR_FORM_ID in the form's action attribute in index.html.
  Until then, the form falls back to opening your email app with the message filled in.
*/
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  if (form.action.includes("YOUR_FORM_ID")) {
    const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:shaikkhatija9999@gmail.com?subject=${subject}&body=${body}`;
    note.textContent = "Opening your email app…";
    return;
  }

  try {
    const res = await fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
    if (res.ok) { note.textContent = "Thank you! Your message has been sent."; form.reset(); }
    else { note.textContent = "Something went wrong. Please email me directly."; }
  } catch {
    note.textContent = "Network error. Please try again.";
  }
});

/* ============ GITHUB STATS + CALENDAR (live from your GitHub account) ============ */
const GH_USER = "shaikkhatija";
(async function loadGitHub() {
  const $ = (id) => document.getElementById(id);
  try {
    const [user, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${GH_USER}`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100`).then((r) => r.json()),
    ]);
    $("stRepos").textContent = user.public_repos ?? 0;
    $("stFollowers").textContent = user.followers ?? 0;
    $("stStars").textContent = Array.isArray(repos) ? repos.reduce((n, r) => n + (r.stargazers_count || 0), 0) : 0;
  } catch (e) { /* leaves the dashes in place */ }

  try {
    const data = await fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`).then((r) => r.json());
    const days = data.contributions;
    $("stCommits").textContent = (data.total && (data.total.lastYear ?? Object.values(data.total)[0])) ?? days.reduce((n, d) => n + d.count, 0);

    const grid = $("calGrid"), months = $("calMonths");
    const pad = new Date(days[0].date + "T00:00:00").getDay(); // Sunday = 0
    let html = "<i style='visibility:hidden'></i>".repeat(pad);
    html += days.map((d) => `<i class="l${d.level}" title="${d.count} contributions on ${d.date}"></i>`).join("");
    grid.innerHTML = html;

    const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let last = -1, out = "";
    days.forEach((d, i) => {
      const dt = new Date(d.date + "T00:00:00");
      const col = Math.floor((i + pad) / 7) + 1;
      if (dt.getMonth() !== last && dt.getDate() <= 7) { last = dt.getMonth(); out += `<span style="grid-column:${col}">${names[last]}</span>`; }
    });
    months.innerHTML = out;
  } catch (e) {
    $("calNote").textContent = "Calendar could not load right now. See the full activity on GitHub.";
  }
})();

document.getElementById("year").textContent = new Date().getFullYear();
