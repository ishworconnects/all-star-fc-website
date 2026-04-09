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

  function renderHeader() {
    headerRoot.innerHTML = `
      <div class="site-border"></div>
      <div class="header-shell section-shell">
        <a class="brand" href="index.html" aria-label="${content.clubMeta.name}">
          <img src="${content.clubMeta.badge}" alt="${content.clubMeta.shortName} badge">
          <div>
            <strong>${content.clubMeta.shortName}</strong>
            <span>${content.clubMeta.city}</span>
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
    `;

    const toggle = headerRoot.querySelector(".nav-toggle");
    const nav = headerRoot.querySelector(".site-nav");
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
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
    return `
      <article class="sponsor-card ${tierClass}">
        <div class="sponsor-logo-shell">
          <img src="${logo}" alt="${sponsor.name}">
        </div>
        <p class="eyebrow">${sponsor.tier}</p>
        <h3>${sponsor.name}</h3>
      </article>
    `;
  }

  function galleryCard(item) {
    return `
      <article class="gallery-card" data-gallery-card data-category="${item.category}" data-lightbox-src="${item.image}" data-lightbox-caption="${item.title}" tabindex="0" role="button" aria-label="Open ${item.title}">
        <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/tournament-placeholder.svg'">
        <div class="gallery-copy">
          <div class="card-topline">
            <span class="pill">${item.category}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.caption}</p>
        </div>
      </article>
    `;
  }

  function futureTournamentCard(slot) {
    const image = slot.image || tournamentFallback;
    return `
      <article class="future-tournament-card" data-future-gallery-card data-lightbox-src="${image}" data-lightbox-caption="${slot.name}" tabindex="0" role="button" aria-label="Open ${slot.name}">
        <div class="future-cover">
          <img src="${image}" alt="${slot.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/tournament-placeholder.svg'">
          <span class="media-status">${slot.status}</span>
        </div>
        <div class="future-copy">
          <p class="eyebrow">${slot.date}</p>
          <h3>${slot.name}</h3>
          <p>${slot.description}</p>
        </div>
      </article>
    `;
  }

  function boardCard(member, index) {
    return `
      <article class="info-card exec-card">
        <div class="exec-card-head">
          <span class="exec-rank">${String(index + 1).padStart(2, "0")}</span>
          <span class="exec-role">${member.role}</span>
        </div>
        <h3>${member.name}</h3>
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
    const manseGallery = (content.galleryItems || []).filter((item) =>
      /manse nepal cup/i.test(item.title) || /manse nepal cup/i.test(item.category)
    );
    const galleryItems = manseGallery.length ? manseGallery : (content.galleryItems || []);

    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">Tournament gallery</p>
          <h1>Manse Nepal Cup 2024 Winning Moments</h1>
          <p>Only official Manse Nepal Cup photos are shown in this gallery. Click any photo to open a larger view.</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Cup archive", "All Star FC | Manse Nepal Cup 2024", "")}
          <div class="gallery-grid" data-gallery-grid>
            ${galleryItems.map((item) => galleryCard(item)).join("")}
          </div>
        </div>
      </section>

      <div class="lightbox" data-lightbox hidden>
        <button class="lightbox-close" type="button" data-lightbox-close aria-label="Close image">Close</button>
        <figure class="lightbox-figure">
          <img data-lightbox-image src="" alt="">
          <figcaption data-lightbox-caption></figcaption>
        </figure>
      </div>
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
      setupGalleryLightbox();
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
