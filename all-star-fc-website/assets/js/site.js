(function () {
  const content = window.clubContent;
  if (!content) {
    return;
  }

  const page = document.body.dataset.page || "home";
  const root = document.querySelector("[data-page-root]");
  const headerRoot = document.querySelector("[data-site-header]");
  const footerRoot = document.querySelector("[data-site-footer]");
  const sponsorFallback = "assets/images/sponsor-placeholder.svg";
  const tournamentFallback = "assets/images/tournament-placeholder.svg";
  const navItems = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "about", label: "About", href: "about.html" },
    { key: "executive", label: "Executive", href: "about.html#executive-panel" },
    { key: "teams", label: "Teams & Academy", href: "teams.html" },
    { key: "fixtures", label: "Tournaments", href: "fixtures.html" },
    { key: "gallery", label: "Gallery", href: "gallery.html" },
    { key: "contact", label: "Contact / Join", href: "contact.html" }
  ];
  const utilityLinks = [
    { label: "ALLSTARFC.COM", href: "index.html" },
    { label: "Join Us", href: "contact.html" },
    { label: "Academy", href: "teams.html" },
    { label: "Fixtures", href: "fixtures.html" }
  ];

  function socialIcon(label) {
    const key = String(label || "").toLowerCase();
    if (key.includes("instagram")) {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"></rect>
          <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.8"></circle>
          <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor"></circle>
        </svg>
      `;
    }
    if (key.includes("facebook")) {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M13.4 8.2h2.4V5h-2.8c-3 0-4.8 1.8-4.8 4.9v2H6v3.2h2.2V20h3.5v-4.9h2.7l.5-3.2h-3.2v-1.6c0-1.1.4-2.1 1.7-2.1z"></path>
        </svg>
      `;
    }
    if (key.includes("youtube")) {
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M20.9 7.3c-.2-1-.9-1.7-1.9-1.9C17.4 5 12 5 12 5s-5.4 0-7 .4c-1 .2-1.7.9-1.9 1.9C2.7 8.9 2.7 12 2.7 12s0 3.1.4 4.7c.2 1 .9 1.7 1.9 1.9 1.6.4 7 .4 7 .4s5.4 0 7-.4c1-.2 1.7-.9 1.9-1.9.4-1.6.4-4.7.4-4.7s0-3.1-.4-4.7zM10.4 15.2V8.8l5.3 3.2-5.3 3.2z"></path>
        </svg>
      `;
    }
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9"></circle>
      </svg>
    `;
  }

  function renderHeader() {
    headerRoot.innerHTML = `
      <div class="site-border"></div>
      <div class="top-utility">
        <div class="section-shell utility-shell">
          <div class="utility-links utility-left">
            ${utilityLinks.map((item, index) => `
              <a class="${index === 0 ? "utility-home-link" : ""}" href="${item.href}">${item.label}</a>
            `).join("")}
          </div>
          <div class="utility-links utility-right utility-socials" aria-label="Club social links">
            ${content.clubMeta.socialLinks.map((social) => `
              <a class="social-logo-link" href="${social.href}" target="_blank" rel="noreferrer" aria-label="${social.label}">
                ${socialIcon(social.label)}
                <span class="sr-only">${social.label}</span>
              </a>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="masthead-shell section-shell">
        <div class="masthead-meta">
          <p class="official-pill">Official All Star FC Website</p>
          <p class="masthead-note">${content.clubMeta.city} | Founded ${content.clubMeta.founded}</p>
        </div>
        <div class="header-shell">
          <a class="brand" href="index.html" aria-label="${content.clubMeta.name}">
            <img src="${content.clubMeta.badge}" alt="${content.clubMeta.shortName} badge">
            <div class="brand-meta">
              <strong>${content.clubMeta.shortName}</strong>
            </div>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
            Menu
          </button>
          <nav class="site-nav" id="primary-navigation" aria-label="Primary navigation">
            ${navItems.map((item) => `
              <a href="${item.href}" ${item.key === page ? 'aria-current="page"' : ""}>${item.label}</a>
            `).join("")}
          </nav>
        </div>
      </div>
    `;

    const toggle = headerRoot.querySelector(".nav-toggle");
    const nav = headerRoot.querySelector(".site-nav");
    const navLinks = headerRoot.querySelectorAll(".site-nav a");
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "Close" : "Menu";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "Menu";
        }
      });
    });
  }

  function renderFooter() {
    footerRoot.innerHTML = `
      <section class="footer-cta">
        <div class="section-shell footer-cta-shell">
          <div>
            <p class="eyebrow">All Star FC Helsinki</p>
            <h2>Built on Nepalese values. Driven by football excellence.</h2>
          </div>
          <a class="button button-light" href="contact.html">Join / Contact</a>
        </div>
      </section>
      <div class="site-footer-inner section-shell">
        <div class="footer-brand">
          <img src="${content.clubMeta.badge}" alt="${content.clubMeta.shortName} badge">
          <div>
            <strong>${content.clubMeta.name}</strong>
            <p>${content.clubMeta.tagline}</p>
          </div>
        </div>
        <div class="footer-meta">
          <p>${content.contact.addressLines.join(", ")}</p>
          <p><a href="mailto:${content.contact.email}">${content.contact.email}</a></p>
        </div>
        <div class="social-list">
          ${content.clubMeta.socialLinks.map((social) => `
            <a href="${social.href}" target="_blank" rel="noreferrer">${social.label}</a>
          `).join("")}
        </div>
      </div>
    `;
  }

  function sectionHeading(eyebrow, title, copy) {
    return `
      <div class="section-heading">
        <p class="eyebrow">${eyebrow}</p>
        <h2>${title}</h2>
        ${copy ? `<p>${copy}</p>` : ""}
      </div>
    `;
  }

  function sponsorCard(sponsor) {
    const logo = sponsor.logo || sponsorFallback;
    const tierClass = sponsor.tier
      ? `tier-${sponsor.tier.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`
      : "";
    const linkStart = sponsor.link ? `<a class="sponsor-card-link" href="${sponsor.link}" target="_blank" rel="noreferrer" aria-label="Visit ${sponsor.name}">` : "";
    const linkEnd = sponsor.link ? "</a>" : "";
    return `
      <article class="sponsor-card ${tierClass}">
        ${linkStart}
          <div class="sponsor-logo-shell">
            <img src="${logo}" alt="${sponsor.name}">
          </div>
          <p class="eyebrow">${sponsor.tier}</p>
          <h3>${sponsor.name}</h3>
        ${linkEnd}
      </article>
    `;
  }

  function galleryCard(item) {
    return `
      <article class="gallery-card" data-gallery-card data-category="${item.category}">
        <a class="gallery-card-link" href="${item.image}" target="_blank" rel="noopener noreferrer" aria-label="Open full photo: ${item.title}">
          <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/tournament-placeholder.svg'">
          <div class="gallery-copy">
            <div class="card-topline">
              <span class="pill">${item.category}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.caption}</p>
          </div>
        </a>
      </article>
    `;
  }

  function futureTournamentCard(slot) {
    const image = slot.image || tournamentFallback;
    const folderSlug = slot.slug || "";
    const folderHref = folderSlug
      ? `gallery.html?folder=${encodeURIComponent(folderSlug)}#gallery-folder-view`
      : "gallery.html#gallery-folder-view";
    return `
      <article class="future-tournament-card">
        <a class="future-card-link" href="${folderHref}" aria-label="Open ${slot.name} folder">
          <div class="future-cover">
            <img src="${image}" alt="${slot.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/tournament-placeholder.svg'">
            <span class="media-status">${slot.status}</span>
          </div>
          <div class="future-copy">
            <p class="eyebrow">${slot.date}</p>
            <h3>${slot.name}</h3>
            <p>${slot.description}</p>
          </div>
        </a>
      </article>
    `;
  }

  function inferFolderSlug(value) {
    const raw = String(value || "").toLowerCase();
    if (raw.includes("manse")) {
      return "manse-nepal-cup";
    }
    if (raw.includes("himalayan")) {
      return "himalayan-cup";
    }
    if (raw.includes("gurka") || raw.includes("gurkha")) {
      return "gurka-cup-2026";
    }
    if (raw.includes("gaule")) {
      return "gaule-cup";
    }
    if (raw.includes("manoj")) {
      return "manoj-aryal-memorial-cup";
    }
    return "";
  }

  function boardCard(member, index) {
    const names = String(member.name || "")
      .split(",")
      .flatMap((chunk) => chunk.split(/\s+and\s+/i))
      .map((name) => name.trim())
      .filter(Boolean);

    const namesMarkup = names.length > 1
      ? `
        <ul class="exec-name-list" aria-label="${member.role} members">
          ${names.map((name) => `<li class="exec-name-item">${name}</li>`).join("")}
        </ul>
      `
      : `<p class="exec-single">${member.name}</p>`;

    return `
      <article class="info-card exec-card">
        <div class="exec-card-head">
          <span class="exec-rank">${String(index + 1).padStart(2, "0")}</span>
          <span class="exec-role">${member.role}</span>
        </div>
        <div class="exec-body">
          ${namesMarkup}
        </div>
      </article>
    `;
  }

  function tickerMarkup(upcoming) {
    const labels = upcoming.map((fixture) => `${fixture.opponent} | ${fixture.date}`);
    const repeated = labels.concat(labels);
    return repeated.map((label) => `<span class="ticker-item">${label}</span>`).join("");
  }
  function setupRevealAnimations() {
    const revealTargets = root.querySelectorAll(
      ".content-section .info-card, .content-section .team-card, .content-section .program-card, .content-section .table-card, .content-section .gallery-card, .content-section .future-tournament-card, .content-section .sponsor-card, .content-section .emphasis-card"
    );

    if (!revealTargets.length) {
      return;
    }

    revealTargets.forEach((target, index) => {
      target.classList.add("reveal");
      target.style.setProperty("--reveal-delay", `${Math.min(index * 40, 260)}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach((target) => observer.observe(target));
  }

  function setupGalleryFilters() {
    const filterRoot = root.querySelector("[data-gallery-filters]");
    if (!filterRoot) {
      return;
    }

    const filterButtons = Array.from(filterRoot.querySelectorAll("[data-gallery-filter]"));
    const cards = Array.from(root.querySelectorAll("[data-gallery-card]"));

    function applyFilter(category) {
      filterButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.galleryFilter === category);
      });

      cards.forEach((card) => {
        const isVisible = category === "All" || card.dataset.category === category;
        card.classList.toggle("is-hidden", !isVisible);
      });
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        applyFilter(button.dataset.galleryFilter || "All");
      });
    });

    applyFilter("All");
  }

  function setupGalleryFolders() {
    const folderButtons = Array.from(root.querySelectorAll("[data-gallery-folder]"));
    const galleryGrid = root.querySelector("[data-gallery-grid]");
    const folderTitle = root.querySelector("[data-folder-title]");
    const folderNote = root.querySelector("[data-folder-note]");
    if (!folderButtons.length || !galleryGrid || !folderTitle || !folderNote) {
      return;
    }

    const folderMeta = (content.futureTournamentGallery || []).map((slot) => ({
      slug: slot.slug || inferFolderSlug(slot.name),
      name: slot.name,
      description: slot.description
    }));

    const photosByFolder = (content.galleryItems || []).map((item) => ({
      ...item,
      folder: item.folder || inferFolderSlug(item.category || item.title)
    }));

    function renderFolder(folderSlug, updateUrl = true) {
      const selectedFolder = folderMeta.find((folder) => folder.slug === folderSlug) || folderMeta[0];
      if (!selectedFolder) {
        return;
      }

      folderButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.galleryFolder === selectedFolder.slug);
      });

      const folderPhotos = photosByFolder.filter((item) => item.folder === selectedFolder.slug);
      folderTitle.textContent = `All Star FC | ${selectedFolder.name}`;
      folderNote.textContent = folderPhotos.length
        ? `Showing ${folderPhotos.length} photo${folderPhotos.length > 1 ? "s" : ""} from ${selectedFolder.name}.`
        : `No photos uploaded yet for ${selectedFolder.name}.`;

      galleryGrid.innerHTML = folderPhotos.length
        ? folderPhotos.map((item) => galleryCard(item)).join("")
        : `
          <article class="info-card gallery-empty-card">
            <h3>${selectedFolder.name}</h3>
            <p>Folder created. Upload photos for this tournament and they will appear here automatically.</p>
          </article>
        `;

      if (updateUrl) {
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set("folder", selectedFolder.slug);
        window.history.replaceState({}, "", `${nextUrl.pathname}${nextUrl.search}`);
      }
    }

    folderButtons.forEach((button) => {
      button.addEventListener("click", () => {
        renderFolder(button.dataset.galleryFolder || "", true);
      });
    });

    const folderFromQuery = new URLSearchParams(window.location.search).get("folder");
    const hasQueryFolder = folderFromQuery && folderMeta.some((folder) => folder.slug === folderFromQuery);
    const defaultFolder = hasQueryFolder
      ? folderFromQuery
      : (folderMeta.find((folder) => photosByFolder.some((photo) => photo.folder === folder.slug)) || folderMeta[0])?.slug;
    renderFolder(defaultFolder || "", false);
  }

  function setupGalleryLightbox() {
    const lightbox = root.querySelector("[data-lightbox]");
    if (!lightbox) {
      return;
    }

    const lightboxImage = lightbox.querySelector("[data-lightbox-image]");
    const lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
    const closeButton = lightbox.querySelector("[data-lightbox-close]");
    const clickableCards = root.querySelectorAll("[data-gallery-card], [data-future-gallery-card]");

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
    }

    function openLightbox(source, caption) {
      if (!source) {
        return;
      }
      lightboxImage.src = source;
      lightboxImage.alt = caption || "All Star FC gallery image";
      lightboxCaption.textContent = caption || "";
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
    }

    clickableCards.forEach((card) => {
      card.addEventListener("click", () => {
        const src = card.dataset.lightboxSrc;
        const caption = card.dataset.lightboxCaption;
        openLightbox(src, caption);
      });
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          const src = card.dataset.lightboxSrc;
          const caption = card.dataset.lightboxCaption;
          openLightbox(src, caption);
        }
      });
    });

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }

  function setupContactForm() {
    const form = root.querySelector("[data-contact-form]");
    if (!form) {
      return;
    }

    const statusBox = root.querySelector("[data-form-status]");
    const submitButton = form.querySelector("[data-form-submit]");

    function setStatus(message, type) {
      statusBox.textContent = message;
      statusBox.dataset.state = type;
      statusBox.hidden = false;
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const subject = String(data.get("subject") || "").trim();
      const message = String(data.get("message") || "").trim();
      const website = String(data.get("website") || "").trim();

      if (website) {
        setStatus("Message blocked.", "error");
        return;
      }

      if (!name || !email || !subject || !message) {
        setStatus("Please fill in name, email, subject, and message.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        setStatus("Please use a valid email address.", "error");
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      const payload = {
        name,
        email,
        phone,
        subject,
        message,
        _subject: `All Star FC: ${subject}`,
        _captcha: "false"
      };

      try {
        const response = await fetch(content.contact.form.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error("submit_failed");
        }

        form.reset();
        const defaultSubject = form.querySelector("input[name='subject']");
        if (defaultSubject) {
          defaultSubject.checked = true;
        }
        setStatus(content.contact.form.successMessage, "success");
      } catch (error) {
        const fallbackSubject = encodeURIComponent(`All Star FC: ${subject}`);
        const fallbackBody = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:${content.contact.email}?subject=${fallbackSubject}&body=${fallbackBody}`;
        setStatus(content.contact.form.fallbackMessage, "info");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    });
  }
  function renderHome() {
    const upcoming = content.fixtures.upcoming.slice(0, 5);
    const honourWins = content.honours.filter((honour) => honour.result === "Winner").length;
    const futurePreview = (content.futureTournamentGallery || []).slice(0, 3);

    root.innerHTML = `
      <section class="hero-section">
        <div class="section-shell hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">All Star FC | Helsinki Since ${content.clubMeta.founded}</p>
            <h1>${content.hero.title}</h1>
            <p class="hero-text">${content.hero.subtitle}</p>
            <div class="button-row">
              <a class="button" href="${content.hero.primaryCta.href}">${content.hero.primaryCta.label}</a>
              <a class="button button-secondary" href="${content.hero.secondaryCta.href}">${content.hero.secondaryCta.label}</a>
            </div>
            <div class="stat-grid">
              ${content.hero.stats.map((stat) => `
                <article class="stat-card">
                  <strong>${stat.value}</strong>
                  <span>${stat.label}</span>
                </article>
              `).join("")}
            </div>
          </div>
          <article class="hero-panel">
            <img class="hero-photo" src="${content.hero.image}" alt="${content.hero.imageAlt}">
            <div class="hero-panel-content">
              <p class="eyebrow">Tournament pulse</p>
              <h2>All Star FC 2026 Competition Window</h2>
              <ul class="feature-list">
                ${upcoming.map((fixture) => `
                  <li>
                    <strong>${fixture.opponent}</strong>
                    <span>${fixture.date}</span>
                  </li>
                `).join("")}
              </ul>
              <a class="text-link" href="fixtures.html">View full tournament schedule</a>
            </div>
          </article>
        </div>
      </section>

      <section class="ticker-section">
        <div class="section-shell">
          <div class="ticker-shell">
            <span class="ticker-label">Tournament pulse</span>
            <div class="ticker-track">
              ${tickerMarkup(upcoming)}
            </div>
          </div>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Club profile", "Progressive football with Nepalese values at the core.", content.about.intro)}
          <div class="split-layout">
            <div class="rich-copy">
              ${content.about.story.map((paragraph) => `<p>${paragraph}</p>`).join("")}
              <p><strong>Vision:</strong> ${content.about.vision}</p>
              <p><strong>Mission:</strong> ${content.about.mission}</p>
            </div>
            <div class="stack-grid">
              ${content.about.pillars.map((pillar) => `
                <article class="info-card">
                  <h3>${pillar.title}</h3>
                  <p>${pillar.body}</p>
                </article>
              `).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="content-section tint-section">
        <div class="section-shell split-layout">
          <div>
            ${sectionHeading("Next match windows", "Upcoming tournaments and competition status.", "Simple high-trust scheduling for players, families, and supporters.")}
            <div class="table-card">
              <table>
                <caption class="sr-only">Upcoming tournaments</caption>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Tournament</th>
                    <th>Status</th>
                    <th>Venue</th>
                  </tr>
                </thead>
                <tbody>
                  ${upcoming.map((fixture) => `
                    <tr>
                      <td>${fixture.date}</td>
                      <td>${fixture.opponent}</td>
                      <td>${fixture.competition}</td>
                      <td>${fixture.venue}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
          <article class="info-card emphasis-card">
            <p class="eyebrow">Honours snapshot</p>
            <h3>${honourWins} tournament wins recorded</h3>
            <p>All Star FC continues to represent culture, community, and unity with disciplined football standards.</p>
            <div class="values-strip-inner">
              ${content.clubMeta.values.map((value) => `<span>${value}</span>`).join("")}
            </div>
          </article>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Future tournament media vault", "A dedicated gallery system ready for upcoming cup photos.", "Each tournament now has a prepared visual block so you can keep building the club archive season by season.")}
          <div class="card-grid three-up future-grid">
            ${futurePreview.map((slot) => futureTournamentCard(slot)).join("")}
          </div>
        </div>
      </section>

      <section class="content-section tint-section" id="executive-panel">
        <div class="section-shell">
          ${sectionHeading("Executive committee", "Leadership panel for All Star FC.", "")}
          <div class="card-grid two-up exec-grid">
            ${content.board.map((member, index) => boardCard(member, index)).join("")}
          </div>
        </div>
      </section>

      <section class="content-section sponsors-section">
        <div class="section-shell">
          ${sectionHeading("Sponsors", "Partners currently backing All Star FC.", "")}
          <div class="card-grid sponsors-grid">
            ${content.sponsors.map((sponsor) => sponsorCard(sponsor)).join("")}
          </div>
        </div>
      </section>
    `;
  }
  function renderAbout() {
    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">About the club</p>
          <h1>A Nepalese football club in Helsinki with a long-term development mindset.</h1>
          <p>${content.about.story[0]}</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell split-layout">
          <div>
            ${sectionHeading("Club story", "Built on community, discipline, and football ambition.", content.about.intro)}
          </div>
          <div class="rich-copy">
            ${content.about.story.map((paragraph) => `<p>${paragraph}</p>`).join("")}
            <p><strong>Vision:</strong> ${content.about.vision}</p>
            <p><strong>Mission:</strong> ${content.about.mission}</p>
          </div>
        </div>
      </section>

      <section class="content-section tint-section">
        <div class="section-shell">
          ${sectionHeading("Core values", "Values used as practical standards across all teams.", "")}
          <div class="values-strip-inner">
            ${content.clubMeta.values.map((value) => `<span>${value}</span>`).join("")}
          </div>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Selected honours", "A record of wins and finals across key community tournaments.", "")}
          <div class="table-card">
            <table>
              <caption class="sr-only">Selected honours and recent record</caption>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Competition</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                ${content.honours.map((honour) => `
                  <tr>
                    <td>${honour.year}</td>
                    <td>${honour.competition}</td>
                    <td>${honour.result}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="content-section tint-section" id="executive-panel">
        <div class="section-shell">
          ${sectionHeading("Executive committee", "Leadership structure guiding All Star FC operations.", "")}
          <div class="card-grid two-up exec-grid">
            ${content.board.map((member, index) => boardCard(member, index)).join("")}
          </div>
        </div>
      </section>
    `;
  }
  function renderTeams() {
    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">Teams and academy</p>
          <h1>One pathway from U8-U13 academy to senior team integration.</h1>
          <p>All teams operate with clear identity, training discipline, and values-based representation.</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Team structure", "From academy development to representative senior football.", "")}
          <div class="card-grid two-up">
            ${content.teams.map((team) => `
              <article class="team-card">
                <div class="card-topline">
                  <span class="pill">${team.stage}</span>
                  <span>${team.venue}</span>
                </div>
                <h3>${team.name}</h3>
                <p>${team.focus}</p>
                <ul class="detail-list">
                  <li><strong>Coach</strong><span>${team.coach}</span></li>
                  <li><strong>Training</strong><span>${team.training}</span></li>
                </ul>
              </article>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="content-section tint-section">
        <div class="section-shell split-layout">
          <div>
            ${sectionHeading("Academy program", "Focused U8-U13 foundation with clear progression.", content.academyPrograms[0].summary)}
            <article class="info-card emphasis-card">
              <p class="eyebrow">${content.academyPrograms[0].ages}</p>
              <h3>${content.academyPrograms[0].name}</h3>
              <p>${content.academyPrograms[0].emphasis}</p>
            </article>
          </div>
          <article class="program-card">
            <p class="eyebrow">Pathway model</p>
            <h3>Academy to senior transition</h3>
            <p>After the U8-U13 stage, players move into structured assessment and integration blocks aligned with senior standards.</p>
            <div class="values-strip-inner">
              <span>Technical growth</span>
              <span>Discipline</span>
              <span>Match readiness</span>
              <span>Team integration</span>
            </div>
          </article>
        </div>
      </section>
    `;
  }

  function renderFixtures() {
    const futureSlots = content.futureTournamentGallery || [];

    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">Upcoming tournaments</p>
          <h1>Competition schedule and future tournament media planning.</h1>
          <p>All Star FC is participating in the tournaments listed below, with a dedicated media archive prepared for each event.</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Tournament schedule", "Upcoming cups and key dates.", "")}
          <div class="table-card">
            <table>
              <caption class="sr-only">Upcoming tournament schedule</caption>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Tournament</th>
                  <th>Status</th>
                  <th>Kick-off</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                ${content.fixtures.upcoming.map((fixture) => `
                  <tr>
                    <td>${fixture.date}</td>
                    <td>${fixture.opponent}</td>
                    <td>${fixture.competition}</td>
                    <td>${fixture.kickOff}</td>
                    <td>${fixture.venue}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="content-section tint-section">
        <div class="section-shell">
          ${sectionHeading("Future tournament media vault", "Prepared gallery slots for every major competition.", "Once each tournament is played, photos can be added quickly without redesigning the site.")}
          <div class="card-grid three-up future-grid">
            ${futureSlots.map((slot) => futureTournamentCard(slot)).join("")}
          </div>
          <p class="section-note">Tip: upload tournament photos with consistent names and replace the placeholder slots from the shared content file.</p>
        </div>
      </section>
    `;
  }
  function renderGallery() {
    const folders = (content.futureTournamentGallery || []).map((slot) => ({
      slug: slot.slug || inferFolderSlug(slot.name),
      name: slot.name,
      image: slot.image || tournamentFallback,
      status: slot.status
    }));

    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">Tournament gallery</p>
          <h1>Tournament folders and visual archive</h1>
          <p>Select a tournament folder. Photos appear only after clicking the folder name.</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Tournament folders", "Click Manse Nepal folder to open Manse photos.", "")}
          <div class="folder-grid">
            ${folders.map((folder) => `
              <button class="folder-card" type="button" data-gallery-folder="${folder.slug}" aria-label="Open ${folder.name} folder">
                <img src="${folder.image}" alt="${folder.name}">
                <div class="folder-card-body">
                  <p class="folder-card-name">${folder.name}</p>
                  <p class="folder-card-status">${folder.status}</p>
                </div>
              </button>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="content-section tint-section">
        <div class="section-shell" id="gallery-folder-view">
          <div class="section-heading">
            <p class="eyebrow">Cup archive</p>
            <h2 data-folder-title>All Star FC | Tournament Folder</h2>
            <p data-folder-note>Select a folder to view photos.</p>
          </div>
          <div class="gallery-grid manse-grid" data-gallery-grid></div>
        </div>
      </section>
    `;
  }

  function renderContact() {
    const publicChannels = [];
    publicChannels.push(`
      <article class="info-card">
        <h2>Email</h2>
        <p><a href="mailto:${content.contact.email}">${content.contact.email}</a></p>
        <p>${content.contact.officeHours}</p>
      </article>
    `);

    if (content.contact.phone) {
      publicChannels.push(`
        <article class="info-card">
          <h2>Phone</h2>
          <p><a href="tel:${content.contact.phone.replace(/\s+/g, "")}">${content.contact.phone}</a></p>
        </article>
      `);
    }

    if (content.contact.whatsapp) {
      publicChannels.push(`
        <article class="info-card">
          <h2>WhatsApp</h2>
          <p><a href="${content.contact.whatsapp}" target="_blank" rel="noreferrer">Message on WhatsApp</a></p>
        </article>
      `);
    }

    publicChannels.push(`
      <article class="info-card">
        <h2>Location</h2>
        <p>${content.contact.addressLines.join("<br>")}</p>
        <p><a href="${content.contact.mapLink}" target="_blank" rel="noreferrer">Open map</a></p>
      </article>
    `);

    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">Contact and join</p>
          <h1>Reach All Star FC directly from one dynamic contact panel.</h1>
          <p>For player pathways, academy interest, and sponsorship, use the form below.</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell card-grid three-up">
          ${publicChannels.join("")}
        </div>
      </section>

      <section class="content-section tint-section">
        <div class="section-shell split-layout">
          <div>
            ${sectionHeading("Dynamic enquiry form", "Send a message directly to All Star FC.", "")}
            <form class="contact-form-card" data-contact-form novalidate>
              <div class="form-grid two-col">
                <label class="form-field">
                  <span>Name *</span>
                  <input type="text" name="name" autocomplete="name" required>
                </label>
                <label class="form-field">
                  <span>Email *</span>
                  <input type="email" name="email" autocomplete="email" required>
                </label>
              </div>
              <div class="form-grid two-col">
                <label class="form-field">
                  <span>Phone</span>
                  <input type="tel" name="phone" autocomplete="tel">
                </label>
                <fieldset class="form-field radio-group-field">
                  <legend>Subject *</legend>
                  <div class="radio-group">
                    ${content.contact.form.subjects.map((option, index) => `
                      <label class="radio-option">
                        <input type="radio" name="subject" value="${option}" ${index === 0 ? "checked" : ""} required>
                        <span>${option}</span>
                      </label>
                    `).join("")}
                  </div>
                </fieldset>
              </div>
              <label class="form-field">
                <span>Message *</span>
                <textarea name="message" rows="6" required></textarea>
              </label>
              <label class="form-honeypot" aria-hidden="true">
                <span>Website</span>
                <input type="text" name="website" tabindex="-1" autocomplete="off">
              </label>
              <div class="form-actions">
                <button class="button" type="submit" data-form-submit>Send Message</button>
                <p class="form-status" data-form-status hidden></p>
              </div>
            </form>
          </div>
          <article class="info-card emphasis-card">
            <p class="eyebrow">Response flow</p>
            <h3>Fastest way to hear back</h3>
            <p>Use a clear subject and include age group or purpose in your message.</p>
            <p><a class="text-link" href="mailto:${content.contact.email}">${content.contact.email}</a></p>
          </article>
        </div>
      </section>
    `;

    setupContactForm();
  }

  function setupInteractions() {
    setupRevealAnimations();
    if (page === "gallery") {
      setupGalleryFilters();
      setupGalleryFolders();
    }
  }

  renderHeader();
  renderFooter();

  const pageRenderers = {
    home: renderHome,
    about: renderAbout,
    teams: renderTeams,
    fixtures: renderFixtures,
    gallery: renderGallery,
    contact: renderContact
  };

  (pageRenderers[page] || renderHome)();
  setupInteractions();
})();
