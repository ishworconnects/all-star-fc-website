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
    const contactSummary = [];
    if (content.contact.email) {
      contactSummary.push(`<a href="mailto:${content.contact.email}">${content.contact.email}</a>`);
    }
    if (content.contact.phone) {
      contactSummary.push(`<a href="tel:${content.contact.phone.replace(/\s+/g, "")}">${content.contact.phone}</a>`);
    }

    footerRoot.innerHTML = `
      <section class="footer-cta">
        <div class="section-shell footer-cta-shell">
          <div>
            <p class="eyebrow">Build the next chapter</p>
            <h2>Join a club culture built on standards, growth, and community.</h2>
          </div>
          <a class="button button-light" href="contact.html">Contact the Club</a>
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
          <p>${contactSummary.length ? contactSummary.join(" | ") : content.contact.officeHours}</p>
        </div>
        <div class="social-list">
          ${content.clubMeta.socialLinks.map((social) => `<a href="${social.href}" target="_blank" rel="noreferrer">${social.label}</a>`).join("")}
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
    const linkMarkup = sponsor.link
      ? `<a class="text-link" href="${sponsor.link}" target="_blank" rel="noreferrer">Sponsor link</a>`
      : `<span class="sponsor-note">Proud club partner</span>`;
    return `
      <article class="sponsor-card ${tierClass}">
        <div class="sponsor-logo-shell">
          <img src="${logo}" alt="${sponsor.name}">
        </div>
        <p class="eyebrow">${sponsor.tier}</p>
        <h3>${sponsor.name}</h3>
        ${linkMarkup}
      </article>
    `;
  }

  function galleryCard(item) {
    return `
      <article class="gallery-card" data-gallery-card data-category="${item.category}">
        <img src="${item.image}" alt="${item.title}">
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
    const upcomingTournaments = content.fixtures.upcoming.slice(0, 5);
    const honourWinners = content.honours.filter((honour) => honour.result === "Winner");
    root.innerHTML = `
      <section class="hero-section">
        <div class="section-shell hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">All Star FC | Helsinki</p>
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
          <div class="hero-panel">
            <img class="hero-photo" src="${content.hero.image}" alt="${content.hero.imageAlt}">
            <div class="hero-panel-content">
              <p class="eyebrow">Upcoming tournaments</p>
              <h2>All Star FC tournament calendar</h2>
              <p>Key upcoming competitions for 2026 and beyond.</p>
              <ul class="feature-list">
                ${upcomingTournaments.map((tournament) => `
                  <li><strong>${tournament.opponent}</strong><span>${tournament.date}</span></li>
                `).join("")}
              </ul>
              <a class="text-link" href="fixtures.html">See full tournament page</a>
            </div>
          </div>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("About", "Club Profile", content.about.intro)}
          <div class="split-layout">
            <div class="rich-copy">
              ${content.about.story.map((paragraph) => `<p>${paragraph}</p>`).join("")}
              <p><strong>Vision:</strong> ${content.about.vision}</p>
              <p><strong>Mission:</strong> ${content.about.mission}</p>
            </div>
            <article class="info-card emphasis-card">
              <h3>Core values</h3>
              <div class="values-strip-inner">
                ${content.clubMeta.values.map((value) => `<span>${value}</span>`).join("")}
              </div>
              <p class="meta-line">Founded in ${content.clubMeta.founded} and built on Nepalese community pride in Helsinki.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Latest News", "Upcoming Tournaments", "All Star FC is participating in the following tournaments.")}
          <div class="table-card">
            <table>
              <caption class="sr-only">Upcoming tournament schedule</caption>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Tournament</th>
                  <th>Status</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                ${upcomingTournaments.map((fixture) => `
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
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Explore", "Quick Club Access", "Simple links to the most-used sections.")}
          <div class="card-grid three-up quick-link-grid">
            <article class="info-card quick-link-card">
              <h3>Teams & Academy</h3>
              <p>U8-U13 development and senior integration pathway.</p>
              <a class="button button-secondary" href="teams.html">View Teams</a>
            </article>
            <article class="info-card quick-link-card">
              <h3>Gallery</h3>
              <p>Winning moments, academy milestones, and sponsor updates.</p>
              <a class="button button-secondary" href="gallery.html">View Gallery</a>
            </article>
            <article class="info-card quick-link-card">
              <h3>Contact / Join</h3>
              <p>Reach All Star FC directly through the dynamic enquiry form.</p>
              <a class="button button-secondary" href="contact.html">Contact Club</a>
            </article>
          </div>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell card-grid two-up">
          <article class="info-card">
            <p class="eyebrow">Honours Snapshot</p>
            <h3>${honourWinners.length} tournament wins recorded</h3>
            <p>All Star FC continues to represent Nepalese values through disciplined and competitive football.</p>
          </article>
          <article class="info-card">
            <p class="eyebrow">Club Focus</p>
            <h3>One senior representative team with a clear U8-U13 pathway.</h3>
            <p>Simple structure, long-term player development, and strong club identity.</p>
          </article>
        </div>
      </section>

      <section class="content-section tint-section" id="executive-panel">
        <div class="section-shell">
          ${sectionHeading("Executive Committee", "Leadership panel for All Star FC.", "")}
          <div class="card-grid two-up exec-grid">
            ${content.board.map((member, index) => boardCard(member, index)).join("")}
          </div>
        </div>
      </section>

      <section class="content-section sponsors-section">
        <div class="section-shell">
          ${sectionHeading("Sponsors", "The businesses currently backing All Star FC.", "")}
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
          <h1>Representing Nepalese community pride through football in Helsinki.</h1>
          <p>${content.about.story[0]}</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell split-layout">
          <div>
            ${sectionHeading("Club profile", "All Star FC is a progressive and community-focused club in Helsinki.", content.about.intro)}
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
          ${sectionHeading("Core values", "The standards behind every team and session.", "")}
          <div class="values-strip-inner">
            ${content.clubMeta.values.map((value) => `<span>${value}</span>`).join("")}
          </div>
        </div>
      </section>

      <section class="content-section" id="executive-panel">
        <div class="section-shell">
          ${sectionHeading("Executive committee", "Leadership structure for All Star FC.", "")}
          <div class="card-grid two-up exec-grid">
            ${content.board.map((member, index) => boardCard(member, index)).join("")}
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
    `;
  }

  function renderTeams() {
    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">Teams and academy</p>
          <h1>Player pathways that connect development, competition, and community.</h1>
          <p>Every team shares one club identity, with age-appropriate coaching and clear behavioral expectations from first session to matchday.</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Teams", "From community entry point to senior competition.", "This structure gives the club a flexible but coherent pathway for new players and long-term development.")}
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
        <div class="section-shell">
          ${sectionHeading("Academy programs", "Coaching blocks for every stage of the journey.", "Program descriptions can be swapped for your exact curriculum, session count, and seasonal pathway details.")}
          <div class="card-grid three-up">
            ${content.academyPrograms.map((program) => `
              <article class="program-card">
                <span class="pill">${program.ages}</span>
                <h3>${program.name}</h3>
                <p>${program.summary}</p>
                <p class="meta-line">${program.emphasis}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderFixtures() {
    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">Upcoming tournaments</p>
          <h1>Follow the next tournaments All Star FC is participating in.</h1>
          <p>Schedules are maintained through the shared content file for fast updates.</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell table-section">
          ${sectionHeading("Tournament schedule", "Upcoming cups and key dates.", "")}
          <div class="table-card">
            <table>
              <caption class="sr-only">Upcoming fixtures</caption>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Opponent</th>
                  <th>Competition</th>
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
    `;
  }

  function renderGallery() {
    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">Club gallery</p>
          <h1>Winning, community, and academy moments.</h1>
          <p>A simple and clear gallery featuring selected real All Star FC highlights.</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading("Visual story", "Selected moments from All Star FC.", "These images highlight academy wins, sponsorship announcements, and first-team winning moments.")}
          <div class="gallery-grid" data-gallery-grid>
            ${content.galleryItems.map((item) => galleryCard(item)).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderContact() {
    const publicChannels = [];
    if (content.contact.email) {
      publicChannels.push(`
        <article class="info-card">
          <h2>Email</h2>
          <p><a href="mailto:${content.contact.email}">${content.contact.email}</a></p>
          <p>${content.contact.officeHours}</p>
        </article>
      `);
    }
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
        <p><a href="${content.contact.mapLink}" target="_blank" rel="noreferrer">Open the map</a></p>
      </article>
    `);

    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">Contact and join</p>
          <h1>Start the conversation with the club.</h1>
          <p>Players, parents, coaches, and sponsors can reach All Star FC directly here.</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell card-grid three-up">
          ${publicChannels.join("")}
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell split-layout">
          <div>
            ${sectionHeading("Contact form", "Send a direct enquiry to All Star FC.", "")}
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
            <h3>Fastest response</h3>
            <p>Email us at <a href="mailto:${content.contact.email}">${content.contact.email}</a> and include age group or enquiry type in the subject line.</p>
            <p>${content.contact.officeHours}</p>
          </article>
        </div>
      </section>
    `;

    setupContactForm();
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
})();
