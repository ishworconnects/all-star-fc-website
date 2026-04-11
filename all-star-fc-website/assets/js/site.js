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
  const i18n = {
    fi: {
      navHome: "Etusivu",
      navAbout: "Tietoa",
      navExecutive: "Johto",
      navTeams: "Joukkueet ja Akatemia",
      navFixtures: "Turnaukset",
      navGallery: "Galleria",
      navContact: "Yhteys / Liity",
      utilityHome: "ALLSTARFC.COM",
      utilityJoin: "Liity",
      utilityAcademy: "Akatemia",
      utilityFixtures: "Ottelut",
      officialSite: "All Star FC:n virallinen sivusto",
      mastheadNote: "{city} | Perustettu {year}",
      language: "Kieli",
      langEnglish: "English",
      langFinnish: "Suomi",
      langNepali: "Nepali",
      footerTitle: "Rakennettu nepaliarvoille. Jalkapalloa kohti huippua.",
      joinContact: "Liity / Yhteys",
      homeHeroEyebrow: "All Star FC | Helsinki vuodesta {year}",
      tournamentPulse: "Turnausnäkymä",
      competitionWindow: "All Star FC 2026 turnausikkuna",
      viewSchedule: "Katso koko turnauskalenteri",
      tournamentFoldersTitle: "Turnauskansiot ja visuaalinen arkisto",
      tournamentFoldersIntro: "Valitse turnauskansio. Kuvat näkyvät vasta, kun kansiota klikataan.",
      contactTitle: "Ota yhteyttä All Star FC:hen yhdestä paneelista.",
      contactIntro: "Pelaajapolut, akatemiakyselyt ja sponsorointi hoituvat alla olevan lomakkeen kautta."
    },
    ne: {
      navHome: "होम",
      navAbout: "क्लब परिचय",
      navExecutive: "कार्यसमिति",
      navTeams: "टोली र एकेडेमी",
      navFixtures: "प्रतियोगिता",
      navGallery: "ग्यालरी",
      navContact: "सम्पर्क / Join",
      utilityHome: "ALLSTARFC.COM",
      utilityJoin: "Join",
      utilityAcademy: "एकेडेमी",
      utilityFixtures: "प्रतियोगिता",
      officialSite: "All Star FC को आधिकारिक वेबसाइट",
      mastheadNote: "{city} | स्थापना {year}",
      language: "भाषा",
      langEnglish: "English",
      langFinnish: "Suomi",
      langNepali: "नेपाली",
      footerTitle: "नेपाली मूल्यमा आधारित, उत्कृष्ट फुटबलतर्फ अगाडि।",
      joinContact: "Join / सम्पर्क",
      homeHeroEyebrow: "All Star FC | Helsinki Since {year}",
      tournamentPulse: "टुर्नामेन्ट अपडेट",
      competitionWindow: "All Star FC 2026 प्रतियोगिता तालिका",
      viewSchedule: "पूरा प्रतियोगिता तालिका हेर्नुहोस्",
      tournamentFoldersTitle: "टुर्नामेन्ट फोल्डर र फोटो आर्काइभ",
      tournamentFoldersIntro: "टुर्नामेन्ट फोल्डर क्लिक गरेपछि मात्र फोटो देखिन्छ।",
      contactTitle: "All Star FC सँग एउटै सम्पर्क प्यानलबाट जोडिनुहोस्।",
      contactIntro: "खेलाडी विकास, एकेडेमी रुचि र स्पोन्सरशिपका लागि तलको फर्म प्रयोग गर्नुहोस्।"
    }
  };
  Object.assign(i18n.fi, {
    navHome: "Etusivu",
    navAbout: "Tietoa",
    navExecutive: "Johto",
    navTeams: "Joukkueet ja Akatemia",
    navFixtures: "Turnaukset",
    navGallery: "Galleria",
    navContact: "Yhteys / Liity",
    utilityHome: "ALLSTARFC.COM",
    utilityJoin: "Liity",
    utilityAcademy: "Akatemia",
    utilityFixtures: "Turnaukset",
    officialSite: "All Star FC:n virallinen sivusto",
    mastheadNote: "{city} | Perustettu {year}",
    language: "Kieli",
    langEnglish: "English",
    langFinnish: "Suomi",
    langNepali: "Nepali",
    footerTitle: "Rakennettu nepalilaisille arvoille. Jalkapalloa kohti huippua.",
    joinContact: "Liity / Yhteys",
    homeHeroEyebrow: "All Star FC | Helsinki vuodesta {year}",
    tournamentPulse: "Turnausnakyma",
    competitionWindow: "All Star FC 2026 turnausikkuna",
    viewSchedule: "Katso koko turnauskalenteri",
    tournamentFoldersTitle: "Turnauskansiot ja visuaalinen arkisto",
    tournamentFoldersIntro: "Valitse turnauskansio. Kuvat nakyvat vasta, kun kansiota klikataan.",
    contactTitle: "Ota yhteytta All Star FC:hen yhdesta paneelista.",
    contactIntro: "Pelaajapolut, akatemiakyselyt ja sponsorointi hoituvat alla olevan lomakkeen kautta.",
    menu: "Valikko",
    close: "Sulje",
    primaryNavigation: "Paavalikko",
    clubSocialLinks: "Seuran some-linkit",
    footerEyebrow: "All Star FC Helsinki",
    backToTop: "Takaisin ylos",
    topButton: "Ylos",
    openFullPhoto: "Avaa kuva: {title}",
    openFolder: "Avaa {name} kansio",
    visitSponsor: "Vieraile sivulla: {name}",
    clubProfileEyebrow: "Seuraprofiili",
    clubProfileTitle: "Kehittyvaa jalkapalloa Nepalin arvoilla.",
    visionLabel: "Visio",
    missionLabel: "Missio",
    nextMatchWindowsEyebrow: "Seuraavat turnausikkunat",
    nextMatchWindowsTitle: "Tulevat turnaukset ja status",
    nextMatchWindowsCopy: "Selkea aikataulu pelaajille, perheille ja tukijoille.",
    dateLabel: "Paiva",
    tournamentLabel: "Turnaus",
    statusLabel: "Tila",
    venueLabel: "Paikka",
    honoursSnapshot: "Saavutukset",
    tournamentWinsRecorded: "{count} turnausvoittoa kirjattu",
    honoursSnapshotCopy: "All Star FC edustaa kulttuuria, yhteisoa ja yhtenaisyytta kurinalaisella jalkapallolla.",
    futureVaultEyebrow: "Tulevien turnausten mediapankki",
    futureVaultTitle: "Valmis galleriarakenne tuleville turnauskuville.",
    futureVaultCopy: "Jokaiselle turnaukselle on oma lohko, jota voi paivittaa nopeasti.",
    executiveEyebrow: "Toimikunta",
    executiveTitle: "All Star FC:n johtoryhma",
    sponsorsEyebrow: "Sponsorit",
    sponsorsTitle: "All Star FC:n nykyiset kumppanit",
    aboutHeroEyebrow: "Tietoa seurasta",
    aboutHeroTitle: "Nepalilainen jalkapalloseura Helsingissa pitkalla kehitysnakymalla.",
    clubStoryEyebrow: "Seuran tarina",
    clubStoryTitle: "Yhteisollisyys, kuri ja urheilullinen kunnianhimo.",
    coreValuesEyebrow: "Ydinarvot",
    coreValuesTitle: "Arvot, joita kaytetaan kaytannon standardeina kaikissa joukkueissa.",
    selectedHonoursEyebrow: "Keskeiset saavutukset",
    selectedHonoursTitle: "Voitot ja finaalit eri yhteisoturnauksissa.",
    yearLabel: "Vuosi",
    competitionLabel: "Kilpailu",
    resultLabel: "Tulos",
    executiveStructureTitle: "Johtorakenne All Star FC:n toiminnan taustalla.",
    teamsHeroEyebrow: "Joukkueet ja akatemia",
    teamsHeroTitle: "Yksi polku U8-U13 akatemiasta seniorijoukkueeseen.",
    teamsHeroCopy: "Kaikki joukkueet toimivat selkealla identiteetilla, kurilla ja arvoilla.",
    teamStructureEyebrow: "Joukkuepolku",
    teamStructureTitle: "Akatemiasta edustusjalkapalloon.",
    coachLabel: "Valmentaja",
    trainingLabel: "Harjoittelu",
    academyProgramEyebrow: "Akatemiaohjelma",
    academyProgramTitle: "U8-U13 perusta ja selkea eteneminen.",
    pathwayModelEyebrow: "Polkumalli",
    pathwayModelTitle: "Akatemiasta seniorivaiheeseen",
    pathwayModelCopy: "U8-U13-vaiheen jalkeen pelaajat etenevat arviointiin ja senioriin integroituun kehitykseen.",
    technicalGrowth: "Tekninen kehitys",
    disciplineValue: "Kuri",
    matchReadiness: "Otteluvalmius",
    teamIntegration: "Joukkueintegraatio",
    fixturesHeroEyebrow: "Tulevat turnaukset",
    fixturesHeroTitle: "Kilpailukalenteri ja turnauskohtainen mediavaraus.",
    fixturesHeroCopy: "All Star FC osallistuu alla oleviin turnauksiin ja jokaiselle on valmis mediakansio.",
    tournamentScheduleEyebrow: "Turnauskalenteri",
    tournamentScheduleTitle: "Tulevat cupit ja paivamaarat.",
    kickOffLabel: "Aloitus",
    futureTournamentVaultEyebrow: "Tulevien turnausten mediapankki",
    futureTournamentVaultTitle: "Valmiit galleriaslotit kaikkiin paaturnauksiin.",
    futureTournamentVaultCopy: "Kun turnaus on pelattu, kuvat voi lisata ilman sivumuutoksia.",
    sectionTip: "Vinkki: paivita kuvat sisaltotiedostosta yhtenaisilla nimilla.",
    galleryHeroEyebrow: "Turnausgalleria",
    galleryHeroTitle: "Turnauskansiot ja visuaalinen arkisto",
    galleryHeroCopy: "Valitse turnauskansio. Kuvat naytetaan vasta kansion klikkauksen jalkeen.",
    tournamentFoldersEyebrow: "Turnauskansiot",
    folderTitleTemplate: "All Star FC | {name}",
    cupArchiveEyebrow: "Cup-arkisto",
    folderDefaultTitle: "All Star FC | Turnauskansio",
    folderDefaultNote: "Valitse kansio kuvia varten.",
    showingPhotosFrom: "Naytetaan {count} kuvaa turnauksesta {name}.",
    noPhotosFor: "Turnaukselle {name} ei ole viela lisatty kuvia.",
    folderCreatedCopy: "Kansio on valmis. Lataa turnauskuvat ja ne ilmestyvat automaattisesti.",
    contactHeroEyebrow: "Yhteys ja liittyminen",
    contactHeroTitle: "Ota yhteys All Star FC:hen yhdesta dynaamisesta paneelista.",
    contactHeroCopy: "Pelaajapolut, akatemia ja sponsorointi hoituvat alla olevalla lomakkeella.",
    emailLabel: "Sahkoposti",
    phoneLabel: "Puhelin",
    whatsappLabel: "WhatsApp",
    messageOnWhatsApp: "Laheta WhatsApp-viesti",
    locationLabel: "Sijainti",
    openMap: "Avaa kartta",
    dynamicEnquiryEyebrow: "Dynaaminen yhteyslomake",
    dynamicEnquiryTitle: "Laheta viesti suoraan All Star FC:lle.",
    nameLabel: "Nimi *",
    emailField: "Sahkoposti *",
    phoneField: "Puhelin",
    subjectLabel: "Aihe *",
    messageLabel: "Viesti *",
    websiteLabel: "Website",
    sendMessage: "Laheta viesti",
    sending: "Lahetetaan...",
    responseFlowEyebrow: "Vastausprosessi",
    fastestWayTitle: "Nopein tapa saada vastaus",
    fastestWayCopy: "Kirjoita selkea aihe ja mainitse ikaryhma tai viestin tarkoitus.",
    formStatusBlocked: "Viesti estettiin.",
    formStatusRequired: "Tayta nimi, sahkoposti, aihe ja viesti.",
    formStatusEmail: "Kayta kelvollista sahkopostiosoitetta.",
    formSuccess: "Kiitos! Viesti on lahetetty All Star FC:lle.",
    formFallback: "Avaamme sahkopostisovelluksen viestin lahettamista varten.",
    subjectAcademy: "Akatemiakysely",
    subjectSenior: "Seniorijoukkue",
    subjectSponsor: "Sponsorointi",
    subjectGeneral: "Yleinen"
  });

  Object.assign(i18n.ne, {
    navHome: "Ghar",
    navAbout: "Club Parichaya",
    navExecutive: "Karyasamiti",
    navTeams: "Toli ra Academy",
    navFixtures: "Pratiyogita",
    navGallery: "Gallery",
    navContact: "Samparka / Join",
    utilityHome: "ALLSTARFC.COM",
    utilityJoin: "Join",
    utilityAcademy: "Academy",
    utilityFixtures: "Pratiyogita",
    officialSite: "All Star FC ko Adhikarik Website",
    mastheadNote: "{city} | Sthapana {year}",
    language: "Bhasa",
    langEnglish: "English",
    langFinnish: "Suomi",
    langNepali: "Nepali",
    footerTitle: "Nepali mulyama aadharit, uttam football tira agadi.",
    joinContact: "Join / Samparka",
    homeHeroEyebrow: "All Star FC | Helsinki Since {year}",
    tournamentPulse: "Tournament Update",
    competitionWindow: "All Star FC 2026 Pratiyogita Talika",
    viewSchedule: "Pura tournament schedule hernuhos",
    tournamentFoldersTitle: "Tournament folder ra photo archive",
    tournamentFoldersIntro: "Tournament folder click garepachi matra photo dekhincha.",
    contactTitle: "All Star FC sanga eutai samparka panelbata jodinus.",
    contactIntro: "Kheladi bikas, academy ruchi ra sponsorship ko lagi tala ko form prayog garnuhos.",
    menu: "Menu",
    close: "Close",
    primaryNavigation: "Main Navigation",
    clubSocialLinks: "Club social links",
    footerEyebrow: "All Star FC Helsinki",
    backToTop: "Back to top",
    topButton: "Top",
    openFullPhoto: "Open full photo: {title}",
    openFolder: "Open {name} folder",
    visitSponsor: "Visit {name} website",
    clubProfileEyebrow: "Club Profile",
    clubProfileTitle: "Progressive football rooted in Nepali values.",
    visionLabel: "Vision",
    missionLabel: "Mission",
    nextMatchWindowsEyebrow: "Upcoming Tournaments",
    nextMatchWindowsTitle: "Upcoming cups and participation status",
    nextMatchWindowsCopy: "Clear schedule for players, families, and supporters.",
    dateLabel: "Date",
    tournamentLabel: "Tournament",
    statusLabel: "Status",
    venueLabel: "Venue",
    honoursSnapshot: "Honours Snapshot",
    tournamentWinsRecorded: "{count} tournament wins recorded",
    honoursSnapshotCopy: "All Star FC represents culture, community, and unity with discipline.",
    futureVaultEyebrow: "Future Tournament Media Vault",
    futureVaultTitle: "Prepared gallery system for upcoming cups.",
    futureVaultCopy: "Each tournament has its own block for easy photo updates.",
    executiveEyebrow: "Executive Committee",
    executiveTitle: "All Star FC leadership panel",
    sponsorsEyebrow: "Sponsors",
    sponsorsTitle: "Current partners supporting All Star FC",
    aboutHeroEyebrow: "About Club",
    aboutHeroTitle: "A Nepalese football club in Helsinki with long-term vision.",
    clubStoryEyebrow: "Club Story",
    clubStoryTitle: "Built on community, discipline, and football ambition.",
    coreValuesEyebrow: "Core Values",
    coreValuesTitle: "Practical standards used across all teams.",
    selectedHonoursEyebrow: "Selected Honours",
    selectedHonoursTitle: "Wins and finals across key community tournaments.",
    yearLabel: "Year",
    competitionLabel: "Competition",
    resultLabel: "Result",
    executiveStructureTitle: "Leadership structure guiding All Star FC operations.",
    teamsHeroEyebrow: "Teams and Academy",
    teamsHeroTitle: "One pathway from U8-U13 academy to senior integration.",
    teamsHeroCopy: "All teams operate with clear identity, discipline, and values.",
    teamStructureEyebrow: "Team Structure",
    teamStructureTitle: "From academy development to senior representation.",
    coachLabel: "Coach",
    trainingLabel: "Training",
    academyProgramEyebrow: "Academy Program",
    academyProgramTitle: "Focused U8-U13 foundation with clear progression.",
    pathwayModelEyebrow: "Pathway Model",
    pathwayModelTitle: "Academy to senior transition",
    pathwayModelCopy: "After U8-U13, players enter assessment and senior integration blocks.",
    technicalGrowth: "Technical growth",
    disciplineValue: "Discipline",
    matchReadiness: "Match readiness",
    teamIntegration: "Team integration",
    fixturesHeroEyebrow: "Upcoming Tournaments",
    fixturesHeroTitle: "Competition schedule and future media planning.",
    fixturesHeroCopy: "All Star FC is participating in these tournaments with dedicated media folders.",
    tournamentScheduleEyebrow: "Tournament Schedule",
    tournamentScheduleTitle: "Upcoming cups and key dates.",
    kickOffLabel: "Kick-off",
    futureTournamentVaultEyebrow: "Future Tournament Media Vault",
    futureTournamentVaultTitle: "Prepared gallery slots for every major competition.",
    futureTournamentVaultCopy: "Photos can be added quickly after each tournament.",
    sectionTip: "Tip: update photos from the shared content file with consistent naming.",
    galleryHeroEyebrow: "Tournament Gallery",
    galleryHeroTitle: "Tournament folders and visual archive",
    galleryHeroCopy: "Select a tournament folder. Photos appear after folder click.",
    tournamentFoldersEyebrow: "Tournament Folders",
    folderTitleTemplate: "All Star FC | {name}",
    cupArchiveEyebrow: "Cup Archive",
    folderDefaultTitle: "All Star FC | Tournament Folder",
    folderDefaultNote: "Select a folder to view photos.",
    showingPhotosFrom: "Showing {count} photos from {name}.",
    noPhotosFor: "No photos uploaded yet for {name}.",
    folderCreatedCopy: "Folder created. Upload photos and they will appear automatically.",
    contactHeroEyebrow: "Contact and Join",
    contactHeroTitle: "Reach All Star FC from one dynamic panel.",
    contactHeroCopy: "Use the form below for player pathways, academy interest, and sponsorship.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    whatsappLabel: "WhatsApp",
    messageOnWhatsApp: "Message on WhatsApp",
    locationLabel: "Location",
    openMap: "Open map",
    dynamicEnquiryEyebrow: "Dynamic Enquiry Form",
    dynamicEnquiryTitle: "Send a message directly to All Star FC.",
    nameLabel: "Name *",
    emailField: "Email *",
    phoneField: "Phone",
    subjectLabel: "Subject *",
    messageLabel: "Message *",
    websiteLabel: "Website",
    sendMessage: "Send Message",
    sending: "Sending...",
    responseFlowEyebrow: "Response Flow",
    fastestWayTitle: "Fastest way to hear back",
    fastestWayCopy: "Use a clear subject and include age group or purpose in your message.",
    formStatusBlocked: "Message blocked.",
    formStatusRequired: "Please fill in name, email, subject, and message.",
    formStatusEmail: "Please use a valid email address.",
    formSuccess: "Thanks! Your message has been sent to All Star FC.",
    formFallback: "Opening your email app to complete sending the message.",
    subjectAcademy: "Academy Enquiry",
    subjectSenior: "Senior Team Enquiry",
    subjectSponsor: "Sponsorship",
    subjectGeneral: "General"
  });

  Object.assign(i18n.fi, {
    playerProfilesEyebrow: "Pelaajaprofiilit",
    playerProfilesTitle: "Seniori- ja kehityspolun pelaajaprofiilit",
    playerProfilesCopy: "Manageri voi paivittaa profiilit nopeasti sisaltotiedoston kautta.",
    profileNameCol: "Nimi",
    profilePositionCol: "Pelipaikka",
    profilePathwayCol: "Polku",
    profileFootCol: "Jalka",
    profileStatusCol: "Tila",
    membershipEyebrow: "Jasenyys",
    membershipTitle: "Kolme jasenhakemusta eri tarkoituksiin",
    membershipCopy: "Valitse pelaaja-, akatemia- tai yhteisojasenyyshakemus ja laheta suoraan seuralle.",
    membershipPlayerTitle: "Pelaajajasenyys",
    membershipPlayerCopy: "Seniori- tai kilpailujoukkueeseen hakeville pelaajille.",
    membershipAcademyTitle: "Akatemiajasenyys",
    membershipAcademyCopy: "U8-U13 kehitysohjelmaan liittyville nuorille pelaajille.",
    membershipCommunityTitle: "Yhteisojasenyys",
    membershipCommunityCopy: "Vapaaehtoisille, tukijoille ja yhteisokumppaneille.",
    fullNameField: "Koko nimi *",
    ageGroupField: "Ikaryhma",
    preferredPositionField: "Toivottu pelipaikka",
    communityRoleField: "Yhteisorooli",
    notesField: "Lisatiedot",
    playerPositionPlaceholder: "Puolustaja / Keskikentta / Hyokkaaja",
    academyAgePlaceholder: "U8, U9, U10, U11, U12, U13",
    communityRolePlaceholder: "Vapaaehtoinen / Sponsori / Kannattaja",
    applyNow: "Laheta hakemus",
    applicationSent: "Hakemus lahetetty onnistuneesti.",
    applicationFailed: "Hakemuksen lahetys ei onnistunut. Avataan sahkoposti varavaihtoehtona.",
    membershipTypePlayer: "Pelaajajasenyys",
    membershipTypeAcademy: "Akatemiajasenyys",
    membershipTypeCommunity: "Yhteisojasenyys",
    portalEyebrow: "Seuraportaali",
    portalTitle: "Kirjaudu tai rekisteroidy roolin mukaan",
    portalCopy: "Managerit, pelaajat ja jasenet voivat kayttaa omaa kirjautumisnakymaa.",
    portalAccess: "Sign in / Sign up",
    closePortal: "Sulje portaali",
    portalLoginTitle: "Kirjaudu sisaan",
    portalSignupTitle: "Luo tunnus",
    roleField: "Rooli *",
    roleManager: "Manageri",
    rolePlayer: "Pelaaja",
    roleMember: "Jasen",
    passwordField: "Salasana *",
    confirmPasswordField: "Vahvista salasana *",
    loginButton: "Kirjaudu",
    signupButton: "Rekisteroidy",
    portalMissingFields: "Tayta kaikki pakolliset kentat.",
    portalPasswordMismatch: "Salasanat eivat tasmää.",
    portalPasswordRule: "Salasanassa tulee olla vahintaan 6 merkkia.",
    portalAccountExists: "Talla sahkopostilla on jo tunnus valitussa roolissa.",
    portalSignupSuccess: "Tunnus luotu. Voit nyt kirjautua sisaan.",
    portalSignupReady: "Tunnus luotu. Kirjautumistiedot on taytetty valmiiksi alle.",
    portalRecoveredProfile: "Kirjautuminen onnistui roolilla {role}. Profiili palautettiin automaattisesti.",
    portalLoginSuccess: "Kirjautuminen onnistui roolilla {role}.",
    portalLoginFailed: "Tili tai salasana ei tasmaa valitulle roolille.",
    portalAuthUnavailable: "Sahkoposti/salasana-kirjautuminen ei ole viela kaytossa Firebase-projektissa.",
    portalSignupFailed: "Tilin luonti ei onnistunut juuri nyt. Yrita uudelleen.",
    portalTooManyRequests: "Liian monta yritysta. Yrita hetken kuluttua uudelleen.",
    portalLoginError: "Kirjautuminen ei onnistunut juuri nyt. Yrita uudelleen.",
    portalBackendMissing: "Portaalia ei ole viela konfiguroitu. Lisaa Firebase-avaimet tiedostoon assets/js/firebase-config.js.",
    portalManagerRestricted: "Manageri-signup on rajattu. Kayta hyvaksyttya manageri-sahkopostia.",
    portalRoleNotFound: "Tilille ei loytynyt rooliprofiilia. Ota yhteys seuran adminiin.",
    portalRoleMismatch: "Tama tili on rekisteroity eri roolilla."
  });

  Object.assign(i18n.ne, {
    playerProfilesEyebrow: "खेलाडी प्रोफाइल",
    playerProfilesTitle: "सिनियर र विकास पाथवे खेलाडी प्रोफाइल",
    playerProfilesCopy: "प्रबन्धकले प्रोफाइल विवरण साझा सामग्री फाइलबाट छिट्टै अद्यावधिक गर्न सक्छ।",
    profileNameCol: "नाम",
    profilePositionCol: "पोजिसन",
    profilePathwayCol: "पाथवे",
    profileFootCol: "प्रिफर्ड फुट",
    profileStatusCol: "स्थिति",
    membershipEyebrow: "सदस्यता",
    membershipTitle: "तीन प्रकारका सदस्यता आवेदन फारम",
    membershipCopy: "खेलाडी, एकेडेमी वा समुदाय सदस्यता मध्ये उपयुक्त फारम भरेर सिधै क्लबमा पठाउनुहोस्।",
    membershipPlayerTitle: "खेलाडी सदस्यता",
    membershipPlayerCopy: "सिनियर वा प्रतिस्पर्धात्मक टोलीमा आबद्ध हुन चाहने खेलाडीका लागि।",
    membershipAcademyTitle: "एकेडेमी सदस्यता",
    membershipAcademyCopy: "U8-U13 विकास कार्यक्रममा सहभागी हुन चाहने खेलाडीका लागि।",
    membershipCommunityTitle: "समुदाय सदस्यता",
    membershipCommunityCopy: "स्वयंसेवक, समर्थक र समुदाय साझेदारहरूका लागि।",
    fullNameField: "पूरा नाम *",
    ageGroupField: "उमेर समूह",
    preferredPositionField: "प्राथमिक पोजिसन",
    communityRoleField: "समुदाय भूमिका",
    notesField: "थप विवरण",
    playerPositionPlaceholder: "Defender / Midfielder / Forward",
    academyAgePlaceholder: "U8, U9, U10, U11, U12, U13",
    communityRolePlaceholder: "Volunteer / Sponsor / Supporter",
    applyNow: "आवेदन पठाउनुहोस्",
    applicationSent: "आवेदन सफलतापूर्वक पठाइयो।",
    applicationFailed: "आवेदन पठाउन सकेन। वैकल्पिक रूपमा इमेल एप खोलिँदैछ।",
    membershipTypePlayer: "खेलाडी सदस्यता",
    membershipTypeAcademy: "एकेडेमी सदस्यता",
    membershipTypeCommunity: "समुदाय सदस्यता",
    portalEyebrow: "क्लब पोर्टल",
    portalTitle: "भूमिकाअनुसार लगइन वा साइनअप",
    portalCopy: "Manager, Player र Member का लागि छुट्टाछुट्टै पहुँच विकल्प उपलब्ध छ।",
    portalAccess: "Sign in / Sign up",
    closePortal: "Portal बन्द गर्नुहोस्",
    portalLoginTitle: "लगइन",
    portalSignupTitle: "साइनअप",
    roleField: "भूमिका *",
    roleManager: "Manager",
    rolePlayer: "Player",
    roleMember: "Member",
    passwordField: "पासवर्ड *",
    confirmPasswordField: "पासवर्ड पुष्टि *",
    loginButton: "लगइन गर्नुहोस्",
    signupButton: "साइनअप गर्नुहोस्",
    portalMissingFields: "कृपया सबै आवश्यक फिल्ड भर्नुहोस्।",
    portalPasswordMismatch: "पासवर्ड मिलेन।",
    portalPasswordRule: "पासवर्ड कम्तीमा ६ अक्षरको हुनुपर्छ।",
    portalAccountExists: "यो इमेल र भूमिकामा खाता पहिले नै छ।",
    portalSignupSuccess: "खाता सफलतापूर्वक बन्यो। अब लगइन गर्नुहोस्।",
    portalLoginSuccess: "{role} भूमिकाबाट लगइन सफल भयो।",
    portalLoginFailed: "यो भूमिकाका लागि इमेल वा पासवर्ड मिलेन।",
    portalAuthUnavailable: "Firebase मा email/password login enable गरिएको छैन।",
    portalSignupFailed: "खाता बनाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस्।",
    portalTooManyRequests: "धेरै प्रयास भयो। केही बेरपछि फेरि प्रयास गर्नुहोस्।",
    portalLoginError: "लगइन पूरा गर्न सकिएन। कृपया फेरि प्रयास गर्नुहोस्।",
    portalBackendMissing: "Portal auth setup भएको छैन। assets/js/firebase-config.js मा Firebase key हरु थप्नुहोस्।",
    portalManagerRestricted: "Manager signup restricted छ। स्वीकृत manager email प्रयोग गर्नुहोस्।",
    portalRoleNotFound: "यो खाताको role profile भेटिएन। club admin सँग सम्पर्क गर्नुहोस्।",
    portalRoleMismatch: "यो खाता फरक role मा register भएको छ।"
  });

  Object.assign(i18n.ne, {
    navHome: "होम",
    navAbout: "क्लब प्रोफाइल",
    navExecutive: "कार्यसमिति",
    navTeams: "टोली र एकेडेमी",
    navFixtures: "टुर्नामेन्ट",
    navGallery: "ग्यालरी",
    navContact: "सम्पर्क / Join",
    utilityJoin: "Join",
    utilityAcademy: "एकेडेमी",
    utilityFixtures: "टुर्नामेन्ट",
    officialSite: "All Star FC को आधिकारिक वेबसाइट",
    mastheadNote: "{city} | स्थापना {year}",
    language: "भाषा",
    langNepali: "नेपाली",
    footerTitle: "नेपाली मूल्यमा आधारित, उत्कृष्ट फुटबलतर्फ अघि बढ्दै।",
    joinContact: "Join / सम्पर्क",
    homeHeroEyebrow: "All Star FC | Helsinki Since {year}",
    tournamentPulse: "टुर्नामेन्ट अपडेट",
    competitionWindow: "All Star FC 2026 प्रतियोगिता विन्डो",
    viewSchedule: "पूरा टुर्नामेन्ट तालिका हेर्नुहोस्",
    clubProfileEyebrow: "क्लब प्रोफाइल",
    clubProfileTitle: "नेपाली मूल्यमा आधारित प्रगतिशील फुटबल यात्रा।",
    visionLabel: "Vision",
    missionLabel: "Mission",
    nextMatchWindowsEyebrow: "आगामी प्रतियोगिता",
    nextMatchWindowsTitle: "आगामी टुर्नामेन्ट र सहभागिता स्थिति",
    nextMatchWindowsCopy: "खेलाडी, परिवार र समर्थकका लागि स्पष्ट तालिका।",
    dateLabel: "मिति",
    tournamentLabel: "टुर्नामेन्ट",
    statusLabel: "स्थिति",
    venueLabel: "स्थान",
    honoursSnapshot: "सम्मान झलक",
    tournamentWinsRecorded: "{count} टुर्नामेन्ट जित दर्ता",
    honoursSnapshotCopy: "All Star FC ले संस्कृति, समुदाय र एकतालाई अनुशासित फुटबलसँग प्रतिनिधित्व गर्छ।",
    futureVaultEyebrow: "भविष्य टुर्नामेन्ट मिडिया भल्ट",
    futureVaultTitle: "आगामी कपका लागि तयार ग्यालरी संरचना",
    futureVaultCopy: "हरेक प्रतियोगिताका लागि छुट्टै दृश्य ब्लक तयार गरिएको छ।",
    executiveEyebrow: "कार्यसमिति",
    executiveTitle: "All Star FC नेतृत्व प्यानल",
    sponsorsEyebrow: "स्पोन्सर",
    sponsorsTitle: "All Star FC लाई साथ दिने साझेदार",
    aboutHeroEyebrow: "क्लब परिचय",
    aboutHeroTitle: "दीर्घकालीन विकास लक्ष्य भएको हेलसिन्कीस्थित नेपाली फुटबल क्लब।",
    clubStoryEyebrow: "क्लब कथा",
    clubStoryTitle: "समुदाय, अनुशासन र फुटबल महत्वाकांक्षामा आधारित।",
    coreValuesEyebrow: "मुख्य मूल्य",
    coreValuesTitle: "सबै टोलीमा प्रयोग हुने व्यावहारिक मापदण्ड।",
    selectedHonoursEyebrow: "मुख्य सम्मान",
    selectedHonoursTitle: "समुदायस्तरका प्रमुख प्रतियोगितामा जित र फाइनल रेकर्ड।",
    yearLabel: "वर्ष",
    competitionLabel: "प्रतियोगिता",
    resultLabel: "नतिजा",
    executiveStructureTitle: "All Star FC सञ्चालनमा मार्गदर्शन गर्ने नेतृत्व संरचना।",
    teamsHeroEyebrow: "टोली र एकेडेमी",
    teamsHeroTitle: "U8-U13 एकेडेमीदेखि सिनियर एकीकरणसम्म एक स्पष्ट पाथवे।",
    teamsHeroCopy: "सबै टोलीले स्पष्ट पहिचान, अनुशासन र मूल्यका साथ प्रतिनिधित्व गर्छन्।",
    teamStructureEyebrow: "टोली संरचना",
    teamStructureTitle: "एकेडेमी विकासदेखि सिनियर प्रतिनिधित्वसम्म।",
    coachLabel: "कोच",
    trainingLabel: "प्रशिक्षण",
    academyProgramEyebrow: "एकेडेमी कार्यक्रम",
    academyProgramTitle: "U8-U13 आधारभूत विकास र स्पष्ट प्रगति।",
    pathwayModelEyebrow: "पाथवे मोडेल",
    pathwayModelTitle: "एकेडेमीदेखि सिनियर ट्रान्जिसन",
    pathwayModelCopy: "U8-U13 चरणपछि खेलाडी संरचित मूल्यांकन र सिनियर एकीकरण ब्लकमा जान्छन्।",
    technicalGrowth: "प्राविधिक विकास",
    disciplineValue: "अनुशासन",
    matchReadiness: "म्याच तयारी",
    teamIntegration: "टोली एकीकरण",
    fixturesHeroEyebrow: "आगामी टुर्नामेन्ट",
    fixturesHeroTitle: "प्रतियोगिता तालिका र भविष्य मिडिया योजना",
    fixturesHeroCopy: "तलका प्रतियोगितामा All Star FC सहभागी हुँदैछ र प्रत्येकका लागि मिडिया फोल्डर तयार छ।",
    tournamentScheduleEyebrow: "टुर्नामेन्ट तालिका",
    tournamentScheduleTitle: "आगामी कप र प्रमुख मितिहरू",
    kickOffLabel: "किकअफ",
    futureTournamentVaultEyebrow: "भविष्य टुर्नामेन्ट मिडिया भल्ट",
    futureTournamentVaultTitle: "हरेक प्रमुख प्रतियोगिताका लागि तयार ग्यालरी स्लट",
    futureTournamentVaultCopy: "प्रतियोगिता सकिएपछि फोटो छिटो थप्न सकिन्छ।",
    sectionTip: "सुझाव: साझा सामग्री फाइलबाट एउटै नाम ढाँचामा फोटो अद्यावधिक गर्नुहोस्।",
    galleryHeroEyebrow: "टुर्नामेन्ट ग्यालरी",
    galleryHeroTitle: "टुर्नामेन्ट फोल्डर र दृश्य अभिलेख",
    galleryHeroCopy: "टुर्नामेन्ट फोल्डर चयन गर्नुहोस्। क्लिक गरेपछि फोटो देखिन्छ।",
    tournamentFoldersEyebrow: "टुर्नामेन्ट फोल्डर",
    folderTitleTemplate: "All Star FC | {name}",
    cupArchiveEyebrow: "कप अभिलेख",
    folderDefaultTitle: "All Star FC | Tournament Folder",
    folderDefaultNote: "फोटो हेर्न फोल्डर चयन गर्नुहोस्।",
    showingPhotosFrom: "{name} बाट {count} फोटो देखाइँदैछ।",
    noPhotosFor: "{name} का लागि अझै फोटो अपलोड गरिएको छैन।",
    folderCreatedCopy: "फोल्डर तयार छ। फोटो अपलोड गरेपछि यहाँ स्वतः देखिन्छ।",
    contactHeroEyebrow: "सम्पर्क र Join",
    contactHeroTitle: "एकै डायनामिक प्यानलबाट All Star FC सँग सम्पर्क गर्नुहोस्।",
    contactHeroCopy: "खेलाडी पाथवे, एकेडेमी रुचि र स्पोन्सरशिपका लागि तलको फारम प्रयोग गर्नुहोस्।",
    emailLabel: "इमेल",
    phoneLabel: "फोन",
    whatsappLabel: "WhatsApp",
    messageOnWhatsApp: "WhatsApp मा सन्देश पठाउनुहोस्",
    locationLabel: "स्थान",
    openMap: "नक्सा खोल्नुहोस्",
    dynamicEnquiryEyebrow: "डायनामिक सम्पर्क फारम",
    dynamicEnquiryTitle: "All Star FC लाई सिधै सन्देश पठाउनुहोस्।",
    nameLabel: "नाम *",
    emailField: "इमेल *",
    phoneField: "फोन",
    subjectLabel: "विषय *",
    messageLabel: "सन्देश *",
    websiteLabel: "Website",
    sendMessage: "सन्देश पठाउनुहोस्",
    sending: "पठाउँदै...",
    responseFlowEyebrow: "Response Flow",
    fastestWayTitle: "छिटो प्रतिक्रिया पाउने सजिलो तरिका",
    fastestWayCopy: "सन्देशमा स्पष्ट विषय र उमेर समूह वा उद्देश्य लेख्नुहोस्।",
    formStatusBlocked: "सन्देश रोकियो।",
    formStatusRequired: "कृपया नाम, इमेल, विषय र सन्देश भर्नुहोस्।",
    formStatusEmail: "मान्य इमेल ठेगाना प्रयोग गर्नुहोस्।",
    formSuccess: "धन्यवाद! सन्देश All Star FC मा सफलतापूर्वक पठाइयो।",
    formFallback: "सन्देश पूरा गर्न इमेल एप खोलिँदैछ।",
    subjectAcademy: "एकेडेमी सोधपुछ",
    subjectSenior: "सिनियर टोली सोधपुछ",
    subjectSponsor: "स्पोन्सरशिप",
    subjectGeneral: "सामान्य",
    roleManager: "व्यवस्थापक",
    rolePlayer: "खेलाडी",
    roleMember: "सदस्य"
  });

  const localizedData = {
    fi: {
      clubMeta: {
        city: "Helsinki, Suomi",
        tagline: "Edistyksellinen yhteisoseura, joka kehittaa pelaajia ja luo erinomaisuutta kentalla ja sen ulkopuolella.",
        values: ["Kuri", "Tiimityo", "Kunnioitus", "Sitoutuminen", "Erinomaisuus"]
      },
      hero: {
        title: "Helsingissa toimiva nepalilainen seura, joka edustaa kulttuuria, yhteisoa ja yhtenaisyytta.",
        subtitle: "All Star FC tarjoaa ammatillisen ja kannustavan ympariston, jossa pelaajat kasvavat teknisesti, taktisesti, fyysisesti ja henkisesti.",
        primaryCtaLabel: "Liity seuraan",
        secondaryCtaLabel: "Tutustu joukkueisiin",
        stats: [
          { label: "Perustettu" },
          { label: "Akatemia U8-U13" },
          { label: "Polku senioriin" }
        ]
      },
      about: {
        intro: "All Star FC on edistyksellinen yhteisoseura, joka kehittaa pelaajia, vaalii urheiluhenkea ja rakentaa erinomaisuutta kentalla ja sen ulkopuolella.",
        story: [
          "Seura tarjoaa ammattimaisen ja turvallisen toimintaympariston, jossa pelaajat kehittavat teknista osaamista, pelin ymmarrysta, fyysista valmiutta ja kurinalaisuutta.",
          "Perusarvoihin kuuluvat omistautuminen, tiimityo, kunnioitus, rehellisyys ja jatkuva kehittyminen. Tavoitteena on kasvattaa kilpailukykyisia mutta myos vastuullisia ja itsevarmoja yksiloita.",
          "Kaikissa kehitysvaiheissa tarjotaan selkeat harjoituspolut, laadukas valmennus ja mahdollisuus nousta akatemiasta senioritasolle."
        ],
        pillars: [
          {
            title: "Pelaajakehitys",
            body: "Kehitamme kokonaisvaltaisia pelaajia teknisesti, taktisesti, fyysisesti ja henkisesti."
          },
          {
            title: "Yhteisovaikutus",
            body: "Tuemme paikallista jalkapalloyhteisoa, tervehenkista kilpailua ja hyvää urheilukulttuuria."
          },
          {
            title: "Seurakulttuuri",
            body: "Edustamme All Star FC:ta nepalilaisilla arvoilla, yhtenaisyydella ja kunnianhimolla."
          }
        ],
        vision: "Tavoitteena on olla johtava seura, joka tunnetaan pelaajakehityksesta, ammattimaisuudesta ja positiivisesta yhteisovaikutuksesta.",
        mission: "Tarjoamme korkeatasoista valmennusta ja kehitysmahdollisuuksia, jotka kasvattavat pelaajia urheilijoina ja ihmisina."
      },
      teams: [
        {
          name: "All Star FC Seniorijoukkue",
          stage: "Edustusjoukkue",
          coach: "Seniorivalmentajat: Bichari Bhattarai ja Ashok Thapa",
          training: "Rakenteelliset viikkoharjoitukset ennen turnauksia",
          venue: "Talin Liikuntapuisto, Helsinki",
          focus: "Yksi virallinen seniorijoukkue edustaa All Star FC:ta nepalilaisilla arvoilla. Valinnat perustuvat kuntoon, kurinalaisuuteen ja osallistumiseen."
        },
        {
          name: "All Star FC Akatemia U8-U13",
          stage: "Yksi akatemian ikaryhma",
          coach: "Akatemiavalmennus",
          training: "Viikoittaiset pienryhmatreenit",
          venue: "Talin Liikuntapuisto, Helsinki",
          focus: "Turvallinen ja kurinalainen kasvuymparisto U8-U13-pelaajille tekniseen kehitykseen ja hyviin arvoihin."
        },
        {
          name: "Senioriin integroiva kehityspolku",
          stage: "Akatemian jalkeinen polku",
          coach: "Seniorivalmennustiimi",
          training: "Arviointijaksot ja integroidut kehitysblokit",
          venue: "Talin Liikuntapuisto, Helsinki",
          focus: "Akatemiavaiheen jalkeen pelaajat siirtyvat suunnitelmallisesti kohti senioriharjoittelua ja pitkaa kehityspolkua."
        }
      ],
      academyPrograms: [
        {
          name: "U8-U13 Akatemiaryhma",
          ages: "U8-U13",
          summary: "Yksi selkea akatemiaryhma, jossa rakennetaan teknista laatua, kuria ja itsevarmuutta.",
          emphasis: "U8-U13-vaiheen jalkeen polku etenee seniorijoukkueeseen."
        }
      ],
      board: [
        { role: "Puheenjohtaja" },
        { role: "Varapuheenjohtaja" },
        { role: "Sihteerit" },
        { role: "Rahastonhoitajat" },
        { role: "Johtokunnan jasenet" },
        { role: "Neuvonantajat" }
      ],
      playerProfiles: [
        { position: "Maalivahti", pathway: "Seniorijoukkue", preferredFoot: "Oikea", status: "Aktiivinen" },
        { position: "Puolustaja", pathway: "Seniorijoukkue", preferredFoot: "Oikea", status: "Aktiivinen" },
        { position: "Puolustaja", pathway: "U8-U13 > Seniori", preferredFoot: "Vasen", status: "Akatemiapolku" },
        { position: "Keskikentta", pathway: "Seniorijoukkue", preferredFoot: "Oikea", status: "Aktiivinen" },
        { position: "Hyokkaaja", pathway: "U8-U13 > Seniori", preferredFoot: "Oikea", status: "Akatemiapolku" }
      ],
      fixtures: {
        upcoming: [
          { competition: "Osallistujaseura", venue: "TBC", kickOff: "TBC" },
          { competition: "Osallistujaseura", venue: "TBC", kickOff: "TBC" },
          { date: "Tulossa", competition: "Osallistujaseura", venue: "TBC", kickOff: "TBC" },
          { date: "Tulossa", competition: "Osallistujaseura", venue: "TBC", kickOff: "TBC" },
          { date: "Tulossa", competition: "Osallistujaseura", venue: "TBC", kickOff: "TBC" }
        ]
      },
      futureTournamentGallery: [
        { status: "Media valmis", description: "Lisaa ottelupaivan kuvat, kokoonpanot ja juhlahetket turnauksen jalkeen." },
        { status: "Media valmis", description: "Varaa tama lohko turnauksen etenemis- ja finaalipaivan kuville." },
        { status: "Odottaa kuvia", description: "Valmis valokuvauslohko All Star FC:n tuleville paivityksille." },
        { status: "Odottaa kuvia", description: "Lisaa kokoonpano-, ottelu- ja palkintokuvat turnauksen paatyttya." },
        { status: "Odottaa kuvia", description: "Varattu media-alue Manoj Aryal Memorial Cup -osallistumiselle." }
      ],
      honours: [
        { result: "Voittaja" }, { result: "Voittaja" }, { result: "Voittaja" }, { result: "Voittaja" }, { result: "Voittaja" },
        { result: "Voittaja" }, { result: "Voittaja" }, { result: "Voittaja" }, { result: "Voittaja" }, { result: "Runner-up" },
        { result: "Voittaja" }, { result: "Runner-up" }, { result: "Runner-up" }, { result: "Runner-up" }, { result: "Voittaja" },
        { result: "Runner-up" }, { result: "Voittaja" }
      ],
      sponsors: [
        { tier: "Paasponsori" },
        { tier: "Toissijainen sponsori" },
        { tier: "Toissijainen sponsori" }
      ],
      galleryItems: [
        { title: "Manse Nepal Cup 2024 Voittava kokoonpano", caption: "All Star FC:n kokoonpano ennen ratkaisevia voittominuutteja.", category: "Manse Nepal Cup 2024" },
        { title: "Manse Nepal Cup 2024 Juhlahetki", caption: "Voitonjuhla cup-tuloksen varmistuttua.", category: "Manse Nepal Cup 2024" },
        { title: "Manse Nepal Cup 2024 Mitaliseremonia", caption: "Pelaajat mitaleiden ja pokaalin kanssa seremonian aikana.", category: "Manse Nepal Cup 2024" },
        { title: "Manse Nepal Cup 2024 Joukkue ja tukijat", caption: "Yhteiskuva pelaajista ja kannattajista voiton jalkeen.", category: "Manse Nepal Cup 2024" },
        { title: "Manse Nepal Cup 2024 Seuraperheen hetki", caption: "Pelaajat, perheet ja tukijat yhteisessa juhlahetkessa.", category: "Manse Nepal Cup 2024" },
        { title: "Manse Nepal Cup 2024 Pokaalimuotokuva", caption: "Edustava pokaalikuva voittopaivalta.", category: "Manse Nepal Cup 2024" }
      ],
      contact: {
        officeHours: "Seurakyselyt vastaanotetaan sahkopostilla, ja hallitus koordinoi jatkoviestinnan.",
        form: {
          subjects: ["Akatemiakysely", "Seniorijoukkue", "Sponsorointi", "Yleinen"],
          successMessage: "Kiitos! Viestisi on lahetetty All Star FC:lle.",
          fallbackMessage: "Avaamme sahkopostisovelluksen viestin lahettamista varten."
        }
      }
    },
    ne: {
      clubMeta: {
        city: "हेलसिन्की, फिनल्याण्ड",
        tagline: "खेलाडी विकास, खेल भावना र मैदानभित्र/बाहिर उत्कृष्टता निर्माणमा केन्द्रित एक प्रगतिशील समुदाय क्लब।",
        values: ["अनुशासन", "टिमवर्क", "सम्मान", "प्रतिबद्धता", "उत्कृष्टता"]
      },
      hero: {
        title: "हेलसिन्कीमा नेपाली संस्कृति, समुदाय र एकताको प्रतिनिधित्व गर्ने फुटबल क्लब।",
        subtitle: "All Star FC ले प्राविधिक क्षमता, खेल बुझाइ, फिटनेस र व्यक्तिगत अनुशासनमा विकास गर्ने व्यावसायिक वातावरण प्रदान गर्छ।",
        primaryCtaLabel: "क्लबमा Join गर्नुहोस्",
        secondaryCtaLabel: "टोली हेर्नुहोस्",
        stats: [
          { label: "स्थापना" },
          { label: "एकेडेमी U8-U13" },
          { label: "सिनियर पाथवे" }
        ]
      },
      about: {
        intro: "All Star FC एक प्रगतिशील र समुदाय-केन्द्रित फुटबल क्लब हो, जसले खेलाडी विकास र उत्कृष्टतामा ध्यान दिन्छ।",
        story: [
          "क्लबले खेलाडीलाई प्राविधिक सीप, ट्याक्टिकल बुझाइ, शारीरिक तयारी र अनुशासन मजबुत बनाउने सहयोगी वातावरण दिन्छ।",
          "समर्पण, टिमवर्क, सम्मान, इमानदारी र निरन्तर सुधारका मूल्यमा आधारित क्लबले प्रतिस्पर्धी मात्र होइन जिम्मेवार व्यक्तित्व पनि निर्माण गर्छ।",
          "एकेडेमीदेखि सिनियर एकीकरणसम्म स्पष्ट प्रशिक्षण संरचना, गुणस्तरीय कोचिङ र विकास अवसर उपलब्ध गराइन्छ।"
        ],
        pillars: [
          {
            title: "खेलाडी विकास",
            body: "प्राविधिक, ट्याक्टिकल, शारीरिक र व्यक्तिगत पक्षमा पूर्ण खेलाडी तयार गर्ने लक्ष्य।"
          },
          {
            title: "समुदाय प्रभाव",
            body: "प्रतिभा विकास, स्वस्थ प्रतिस्पर्धा र खेल संस्कृतिमार्फत फुटबल समुदायमा सकारात्मक योगदान।"
          },
          {
            title: "क्लब संस्कृति",
            body: "नेपाली मूल्य, एकता र महत्वाकांक्षासहित All Star FC को प्रतिनिधित्व।"
          }
        ],
        vision: "खेलाडी विकास, व्यावसायिकता र सकारात्मक समुदाय प्रभावका लागि परिचित अग्रणी क्लब बन्नु।",
        mission: "खेलाडीलाई खेल र व्यक्तिगत जीवन दुवैमा विकास गर्ने उच्चस्तरीय प्रशिक्षण अवसर उपलब्ध गराउनु।"
      },
      teams: [
        {
          name: "All Star FC Senior Team",
          stage: "प्रतिनिधि टोली",
          coach: "Senior Coaches: Bichari Bhattarai and Ashok Thapa",
          training: "मुख्य प्रतियोगिता अघि संरचित साप्ताहिक प्रशिक्षण",
          venue: "Talin Liikuntapuisto, Helsinki",
          focus: "नेपाली मूल्यसहित All Star FC लाई प्रतिनिधित्व गर्ने एक आधिकारिक सिनियर टोली। छनोट फिटनेस, अनुशासन र सहभागितामा आधारित।"
        },
        {
          name: "All Star FC Academy U8-U13",
          stage: "एकेडेमी एकल उमेर समूह",
          coach: "एकेडेमी कोचिङ स्टाफ",
          training: "साप्ताहिक साना समूह प्रशिक्षण",
          venue: "Talin Liikuntapuisto, Helsinki",
          focus: "U8-U13 खेलाडीका लागि सुरक्षित र अनुशासित विकास वातावरण।"
        },
        {
          name: "Senior Integration Pathway",
          stage: "एकेडेमीपछि पाथवे",
          coach: "सिनियर कोचिङ टिम",
          training: "मूल्यांकन सत्र र एकीकृत विकास ब्लक",
          venue: "Talin Liikuntapuisto, Helsinki",
          focus: "U8-U13 पछि खेलाडीलाई सिनियर प्रशिक्षणमा योजनाबद्ध रूपमा एकीकृत गरिन्छ।"
        }
      ],
      academyPrograms: [
        {
          name: "U8-U13 Academy Group",
          ages: "U8-U13",
          summary: "एक स्पष्ट एकेडेमी समूह जहाँ प्राविधिक गुण, अनुशासन र आत्मविश्वास विकास हुन्छ।",
          emphasis: "U8-U13 पछि खेलाडी सिनियर एकीकरण पाथवेतर्फ जान्छन्।"
        }
      ],
      board: [
        { role: "अध्यक्ष" },
        { role: "उपाध्यक्ष" },
        { role: "सचिव" },
        { role: "कोषाध्यक्ष" },
        { role: "कार्यसमिति सदस्य" },
        { role: "सल्लाहकार" }
      ],
      playerProfiles: [
        { position: "गोलकिपर", pathway: "सिनियर टोली", preferredFoot: "दायाँ", status: "सक्रिय" },
        { position: "डिफेन्डर", pathway: "सिनियर टोली", preferredFoot: "दायाँ", status: "सक्रिय" },
        { position: "डिफेन्डर", pathway: "U8-U13 > सिनियर", preferredFoot: "बायाँ", status: "एकेडेमी प्रगति" },
        { position: "मिडफिल्डर", pathway: "सिनियर टोली", preferredFoot: "दायाँ", status: "सक्रिय" },
        { position: "फरवार्ड", pathway: "U8-U13 > सिनियर", preferredFoot: "दायाँ", status: "एकेडेमी प्रगति" }
      ],
      fixtures: {
        upcoming: [
          { competition: "सहभागी प्रतियोगिता", venue: "TBC", kickOff: "TBC" },
          { competition: "सहभागी प्रतियोगिता", venue: "TBC", kickOff: "TBC" },
          { date: "आगामी", competition: "सहभागी प्रतियोगिता", venue: "TBC", kickOff: "TBC" },
          { date: "आगामी", competition: "सहभागी प्रतियोगिता", venue: "TBC", kickOff: "TBC" },
          { date: "आगामी", competition: "सहभागी प्रतियोगिता", venue: "TBC", kickOff: "TBC" }
        ]
      },
      futureTournamentGallery: [
        { status: "Media Slot Open", description: "कपपछि म्याचडे फोटो, लाइनअप र उत्सव क्षणहरू अपलोड गर्नुहोस्।" },
        { status: "Media Slot Open", description: "टुर्नामेन्ट प्रगति र फाइनल दिनका हाइलाइटका लागि यो ब्लक राख्नुहोस्।" },
        { status: "Waiting for Photos", description: "आगामी अपडेटका लागि फोटो स्पेस तयार गरिएको छ।" },
        { status: "Waiting for Photos", description: "प्रतियोगिता पछि टोली, म्याच र ट्रफी क्षणका फोटो थप्नुहोस्।" },
        { status: "Waiting for Photos", description: "Manoj Aryal Memorial Cup का लागि समर्पित ग्यालरी ब्लक।" }
      ],
      honours: [
        { result: "विजेता" }, { result: "विजेता" }, { result: "विजेता" }, { result: "विजेता" }, { result: "विजेता" },
        { result: "विजेता" }, { result: "विजेता" }, { result: "विजेता" }, { result: "विजेता" }, { result: "रनरअप" },
        { result: "विजेता" }, { result: "रनरअप" }, { result: "रनरअप" }, { result: "रनरअप" }, { result: "विजेता" },
        { result: "रनरअप" }, { result: "विजेता" }
      ],
      sponsors: [
        { tier: "मुख्य स्पोन्सर" },
        { tier: "सेकेन्डरी स्पोन्सर" },
        { tier: "सेकेन्डरी स्पोन्सर" }
      ],
      galleryItems: [
        { title: "Manse Nepal Cup 2024 विजेता टोली", caption: "निर्णायक जितअघि All Star FC को टिम फोटो।", category: "Manse Nepal Cup 2024" },
        { title: "Manse Nepal Cup 2024 उत्सव", caption: "कप नतिजापछि टोलीको विजयी उत्सव।", category: "Manse Nepal Cup 2024" },
        { title: "Manse Nepal Cup 2024 पदक समारोह", caption: "समारोहमा पदक र ट्रफीसहित खेलाडीहरू।", category: "Manse Nepal Cup 2024" },
        { title: "Manse Nepal Cup 2024 टोली र समर्थक", caption: "जितपछि खेलाडी र समर्थकहरूको संयुक्त क्षण।", category: "Manse Nepal Cup 2024" },
        { title: "Manse Nepal Cup 2024 क्लब परिवार क्षण", caption: "खेलाडी, परिवार र समर्थकसँगको उत्सव दृश्य।", category: "Manse Nepal Cup 2024" },
        { title: "Manse Nepal Cup 2024 ट्रफी पोर्ट्रेट", caption: "विजेता दिनको प्रतिनिधि ट्रफी फोटो।", category: "Manse Nepal Cup 2024" }
      ],
      contact: {
        officeHours: "क्लबसम्बन्धी सोधपुछ इमेलमार्फत स्वागत छ, आवश्यक परे बोर्डले फलो-अप गर्छ।",
        form: {
          subjects: ["एकेडेमी सोधपुछ", "सिनियर टोली सोधपुछ", "स्पोन्सरशिप", "सामान्य"],
          successMessage: "धन्यवाद! तपाईंको सन्देश All Star FC मा पठाइएको छ।",
          fallbackMessage: "सन्देश पठाउन इमेल एप खोलिँदैछ।"
        }
      }
    }
  };

  const supportedLanguages = ["en", "fi", "ne"];

  function resolveLanguage() {
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");
    if (supportedLanguages.includes(urlLanguage)) {
      return urlLanguage;
    }
    const storedLanguage = window.localStorage.getItem("allstarfc_language");
    if (supportedLanguages.includes(storedLanguage)) {
      return storedLanguage;
    }
    return "en";
  }

  const currentLanguage = resolveLanguage();
  document.documentElement.lang = currentLanguage;
  try {
    window.localStorage.setItem("allstarfc_language", currentLanguage);
  } catch (error) {
    // Ignore storage failures (private mode or browser restrictions).
  }

  function t(key, fallback) {
    return i18n[currentLanguage]?.[key] || fallback;
  }

  function tf(key, fallback, values = {}) {
    let translated = t(key, fallback);
    Object.entries(values).forEach(([name, value]) => {
      translated = translated.replace(new RegExp(`\\{${name}\\}`, "g"), String(value));
    });
    return translated;
  }

  const navItems = [
    { key: "home", label: "Home", labelKey: "navHome", href: "index.html" },
    { key: "about", label: "About", labelKey: "navAbout", href: "about.html" },
    { key: "executive", label: "Executive", labelKey: "navExecutive", href: "about.html#executive-panel" },
    { key: "teams", label: "Teams & Academy", labelKey: "navTeams", href: "teams.html" },
    { key: "fixtures", label: "Tournaments", labelKey: "navFixtures", href: "fixtures.html" },
    { key: "gallery", label: "Gallery", labelKey: "navGallery", href: "gallery.html" },
    { key: "contact", label: "Contact / Join", labelKey: "navContact", href: "contact.html" }
  ];
  const utilityLinks = [
    { label: "ALLSTARFC.COM", labelKey: "utilityHome", href: "index.html" },
    { label: "Join Us", labelKey: "utilityJoin", href: "contact.html" },
    { label: "Academy", labelKey: "utilityAcademy", href: "teams.html" },
    { label: "Fixtures", labelKey: "utilityFixtures", href: "fixtures.html" }
  ];

  function withLangParam(href) {
    const value = String(href || "").trim();
    if (!value || /^(https?:|mailto:|tel:|#|javascript:)/i.test(value)) {
      return value;
    }

    const [pathWithQuery, hash = ""] = value.split("#");
    const [path, query = ""] = pathWithQuery.split("?");
    const params = new URLSearchParams(query);
    params.set("lang", currentLanguage);
    const queryString = params.toString();

    return `${path}${queryString ? `?${queryString}` : ""}${hash ? `#${hash}` : ""}`;
  }

  function getSubjectLabel(subject) {
    const normalized = String(subject || "").toLowerCase();
    if (normalized.includes("academy")) {
      return t("subjectAcademy", subject);
    }
    if (normalized.includes("senior")) {
      return t("subjectSenior", subject);
    }
    if (normalized.includes("sponsor")) {
      return t("subjectSponsor", subject);
    }
    if (normalized.includes("general")) {
      return t("subjectGeneral", subject);
    }
    return subject;
  }

  function mergeLocalizedList(baseList, localizedList) {
    if (!Array.isArray(baseList)) {
      return [];
    }
    return baseList.map((item, index) => {
      if (Array.isArray(localizedList) && localizedList[index] && typeof localizedList[index] === "object") {
        return { ...item, ...localizedList[index] };
      }
      return { ...item };
    });
  }

  function buildLocalizedContent() {
    const data = localizedData[currentLanguage] || {};
    return {
      ...content,
      clubMeta: {
        ...content.clubMeta,
        city: data.clubMeta?.city || content.clubMeta.city,
        tagline: data.clubMeta?.tagline || content.clubMeta.tagline,
        values: Array.isArray(data.clubMeta?.values) ? data.clubMeta.values : content.clubMeta.values
      },
      hero: {
        ...content.hero,
        title: data.hero?.title || content.hero.title,
        subtitle: data.hero?.subtitle || content.hero.subtitle,
        primaryCta: {
          ...content.hero.primaryCta,
          label: data.hero?.primaryCtaLabel || content.hero.primaryCta.label
        },
        secondaryCta: {
          ...content.hero.secondaryCta,
          label: data.hero?.secondaryCtaLabel || content.hero.secondaryCta.label
        },
        stats: mergeLocalizedList(content.hero.stats, data.hero?.stats)
      },
      about: {
        ...content.about,
        intro: data.about?.intro || content.about.intro,
        story: Array.isArray(data.about?.story) ? data.about.story : content.about.story,
        pillars: mergeLocalizedList(content.about.pillars, data.about?.pillars),
        vision: data.about?.vision || content.about.vision,
        mission: data.about?.mission || content.about.mission
      },
      teams: mergeLocalizedList(content.teams, data.teams),
      academyPrograms: mergeLocalizedList(content.academyPrograms, data.academyPrograms),
      playerProfiles: mergeLocalizedList(content.playerProfiles || [], data.playerProfiles),
      board: mergeLocalizedList(content.board || [], data.board),
      fixtures: {
        ...content.fixtures,
        upcoming: mergeLocalizedList(content.fixtures?.upcoming || [], data.fixtures?.upcoming)
      },
      futureTournamentGallery: mergeLocalizedList(content.futureTournamentGallery || [], data.futureTournamentGallery),
      honours: mergeLocalizedList(content.honours || [], data.honours),
      galleryItems: mergeLocalizedList(content.galleryItems || [], data.galleryItems),
      sponsors: mergeLocalizedList(content.sponsors || [], data.sponsors),
      contact: {
        ...content.contact,
        officeHours: data.contact?.officeHours || content.contact.officeHours,
        addressLines: Array.isArray(data.contact?.addressLines) ? data.contact.addressLines : content.contact.addressLines,
        form: {
          ...content.contact.form,
          subjects: Array.isArray(data.contact?.form?.subjects) ? data.contact.form.subjects : content.contact.form.subjects,
          successMessage: data.contact?.form?.successMessage || content.contact.form.successMessage,
          fallbackMessage: data.contact?.form?.fallbackMessage || content.contact.form.fallbackMessage
        }
      }
    };
  }

  const localized = buildLocalizedContent();

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

  function portalAccessIcon() {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"></circle>
        <path d="M5.5 19c.8-3 3.4-5 6.5-5s5.7 2 6.5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        <path d="M18.6 5.6h-2.2m1.1-1.1v2.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
      </svg>
    `;
  }

  function renderHeader() {
    const languageOptions = [
      { value: "en", label: t("langEnglish", "English") },
      { value: "fi", label: t("langFinnish", "Suomi") },
      { value: "ne", label: t("langNepali", "Nepali") }
    ];
    const menuLabel = t("menu", "Menu");
    const closeLabel = t("close", "Close");

    headerRoot.innerHTML = `
      <div class="scroll-progress" aria-hidden="true">
        <span data-scroll-progress-bar></span>
      </div>
      <div class="site-border"></div>
      <div class="top-utility">
        <div class="section-shell utility-shell">
          <div class="utility-links utility-left">
            ${utilityLinks.map((item, index) => `
              <a class="${index === 0 ? "utility-home-link" : ""}" href="${withLangParam(item.href)}">${t(item.labelKey, item.label)}</a>
            `).join("")}
          </div>
          <div class="utility-links utility-right utility-socials" aria-label="${t("clubSocialLinks", "Club social links")}">
            <button class="auth-launch-button" type="button" data-auth-launch aria-haspopup="dialog" aria-expanded="false" aria-label="${t("signInHere", "Sign in here")}">
              ${portalAccessIcon()}
              <span>${t("signInHere", "Sign in here")}</span>
            </button>
            ${localized.clubMeta.socialLinks.map((social) => `
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
          <p class="official-pill">${t("officialSite", "Official All Star FC Website")}</p>
          <div class="masthead-meta-right">
            <p class="masthead-note">${tf("mastheadNote", `${localized.clubMeta.city} | Founded ${localized.clubMeta.founded}`, { city: localized.clubMeta.city, year: localized.clubMeta.founded })}</p>
            <label class="language-switch" for="language-switch">
              <span>${t("language", "Language")}</span>
              <select id="language-switch" data-language-switch aria-label="${t("language", "Language")}">
                ${languageOptions.map((option) => `
                  <option value="${option.value}" ${option.value === currentLanguage ? "selected" : ""}>${option.label}</option>
                `).join("")}
              </select>
            </label>
          </div>
        </div>
        <div class="header-shell">
          <a class="brand" href="${withLangParam("index.html")}" aria-label="${localized.clubMeta.name}">
            <img src="${localized.clubMeta.badge}" alt="${localized.clubMeta.shortName} badge">
            <div class="brand-meta">
              <strong>${localized.clubMeta.shortName}</strong>
            </div>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
            ${menuLabel}
          </button>
          <nav class="site-nav" id="primary-navigation" aria-label="${t("primaryNavigation", "Primary navigation")}">
            ${navItems.map((item) => `
              <a href="${withLangParam(item.href)}" ${item.key === page ? 'aria-current="page"' : ""}>${t(item.labelKey, item.label)}</a>
            `).join("")}
          </nav>
        </div>
      </div>
      <div class="portal-modal" data-auth-modal hidden>
        <button class="portal-modal-backdrop" type="button" data-auth-close tabindex="-1" aria-hidden="true"></button>
        <div class="portal-modal-panel" role="dialog" aria-modal="true" aria-labelledby="portal-modal-title">
          <button class="portal-modal-close" type="button" data-auth-close aria-label="${t("closePortal", "Close portal")}">&times;</button>
          <section class="portal-signin-block">
            <h2 id="portal-modal-title">${t("portalSigninHeadline", "Sign in to your All Star FC digital account")}</h2>
            <form class="portal-login-form" data-login-form novalidate>
              <label class="form-field">
                <span class="sr-only">${t("emailField", "Email *")}</span>
                <input type="email" name="email" placeholder="${t("portalEmailPlaceholder", "email")}" required>
              </label>
              <label class="form-field">
                <span class="sr-only">${t("passwordField", "Password *")}</span>
                <input type="password" name="password" minlength="6" placeholder="${t("portalPasswordPlaceholder", "password")}" required>
              </label>
              <label class="form-field portal-role-field">
                <span>${t("roleField", "Role *")}</span>
                <select name="role" required>
                  <option value="manager">${t("roleManager", "Manager")}</option>
                  <option value="player">${t("rolePlayer", "Player")}</option>
                  <option value="member">${t("roleMember", "Member")}</option>
                </select>
              </label>
              <p class="portal-signin-note">${t("portalSigninNote", "Use your registered role to access manager, player, or member area.")}</p>
              <div class="form-actions">
                <button class="portal-action-button" type="submit">${t("signInHere", "Sign in here")}</button>
                <p class="form-status" data-login-status hidden></p>
              </div>
            </form>
          </section>
          <section class="portal-register-banner">
            <h3>${t("portalRegisterHeadline", "Register for a free All Star FC digital account")}</h3>
            <p>${t("portalRegisterCopy", "Not got an account? Sign up now for your free All Star FC digital account.")}</p>
            <button class="portal-register-toggle" type="button" data-register-toggle aria-expanded="false">
              ${portalAccessIcon()}
              <span>${t("registerNow", "Register now")}</span>
            </button>
          </section>
          <section class="portal-register-panel" data-register-panel hidden>
            <h3>${t("portalSignupTitle", "Create account")}</h3>
            <form class="portal-signup-form" data-signup-form novalidate>
              <div class="form-grid">
                <label class="form-field">
                  <span>${t("fullNameField", "Full name *")}</span>
                  <input type="text" name="name" required>
                </label>
                <label class="form-field">
                  <span>${t("emailField", "Email *")}</span>
                  <input type="email" name="email" required>
                </label>
                <label class="form-field">
                  <span>${t("roleField", "Role *")}</span>
                  <select name="role" required>
                    <option value="manager">${t("roleManager", "Manager")}</option>
                    <option value="player">${t("rolePlayer", "Player")}</option>
                    <option value="member">${t("roleMember", "Member")}</option>
                  </select>
                </label>
                <label class="form-field">
                  <span>${t("passwordField", "Password *")}</span>
                  <input type="password" name="password" minlength="6" required>
                </label>
                <label class="form-field">
                  <span>${t("confirmPasswordField", "Confirm Password *")}</span>
                  <input type="password" name="confirmPassword" minlength="6" required>
                </label>
              </div>
              <div class="form-actions">
                <button class="portal-register-submit" type="submit">${t("registerNow", "Register now")}</button>
                <p class="form-status" data-signup-status hidden></p>
              </div>
            </form>
          </section>
        </div>
      </div>
    `;

    const toggle = headerRoot.querySelector(".nav-toggle");
    const nav = headerRoot.querySelector(".site-nav");
    const navLinks = headerRoot.querySelectorAll(".site-nav a");
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? closeLabel : menuLabel;
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = menuLabel;
        }
      });
    });

    const authLaunch = headerRoot.querySelector("[data-auth-launch]");
    const authModal = headerRoot.querySelector("[data-auth-modal]");
    const authCloseButtons = headerRoot.querySelectorAll("[data-auth-close]");
    const registerToggle = headerRoot.querySelector("[data-register-toggle]");
    const registerPanel = headerRoot.querySelector("[data-register-panel]");
    if (authLaunch && authModal) {
      const focusTarget = authModal.querySelector("[data-login-form] input[name='email']");
      const resetRegisterPanel = () => {
        if (registerPanel) {
          registerPanel.hidden = true;
        }
        if (registerToggle) {
          registerToggle.setAttribute("aria-expanded", "false");
        }
      };
      const isCompactPortalViewport = () => window.matchMedia("(max-width: 980px)").matches;
      const syncPortalViewportMode = () => {
        if (authModal.hidden) {
          document.body.classList.remove("auth-modal-open");
          return;
        }
        if (isCompactPortalViewport()) {
          document.body.classList.add("auth-modal-open");
        } else {
          document.body.classList.remove("auth-modal-open");
        }
      };
      const closePortal = () => {
        authModal.hidden = true;
        authLaunch.setAttribute("aria-expanded", "false");
        document.body.classList.remove("auth-modal-open");
        resetRegisterPanel();
      };
      const openPortal = () => {
        authModal.hidden = false;
        authLaunch.setAttribute("aria-expanded", "true");
        syncPortalViewportMode();
        if (focusTarget) {
          focusTarget.focus();
        }
      };

      authLaunch.addEventListener("click", () => {
        if (authModal.hidden) {
          openPortal();
        } else {
          closePortal();
        }
      });

      authCloseButtons.forEach((button) => {
        button.addEventListener("click", closePortal);
      });

      if (registerToggle && registerPanel) {
        registerToggle.addEventListener("click", () => {
          const isHidden = registerPanel.hidden;
          registerPanel.hidden = !isHidden;
          registerToggle.setAttribute("aria-expanded", String(isHidden));
        });
      }

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !authModal.hidden) {
          closePortal();
        }
      });

      document.addEventListener("click", (event) => {
        if (authModal.hidden) {
          return;
        }
        const target = event.target;
        if (!(target instanceof Node)) {
          return;
        }
        if (authModal.contains(target) || authLaunch.contains(target)) {
          return;
        }
        closePortal();
      });

      window.addEventListener("resize", syncPortalViewportMode);
    }
  }

  function setupLanguageSwitcher() {
    const languageSwitcher = headerRoot.querySelector("[data-language-switch]");
    if (!languageSwitcher) {
      return;
    }

    languageSwitcher.addEventListener("change", (event) => {
      const nextLanguage = String(event.target.value || "");
      if (!supportedLanguages.includes(nextLanguage)) {
        return;
      }

      try {
        window.localStorage.setItem("allstarfc_language", nextLanguage);
      } catch (error) {
        // Ignore storage failures and still update URL.
      }

      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("lang", nextLanguage);
      window.location.assign(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    });
  }

  function renderFooter() {
    footerRoot.innerHTML = `
      <section class="footer-cta">
        <div class="section-shell footer-cta-shell">
          <div>
            <p class="eyebrow">${t("footerEyebrow", "All Star FC Helsinki")}</p>
            <h2>${t("footerTitle", "Built on Nepalese values. Driven by football excellence.")}</h2>
          </div>
          <a class="button button-light" href="${withLangParam("contact.html")}">${t("joinContact", "Join / Contact")}</a>
        </div>
      </section>
      <div class="site-footer-inner section-shell">
        <div class="footer-brand">
          <img src="${localized.clubMeta.badge}" alt="${localized.clubMeta.shortName} badge">
          <div>
            <strong>${localized.clubMeta.name}</strong>
            <p>${localized.clubMeta.tagline}</p>
          </div>
        </div>
        <div class="footer-meta">
          <p>${localized.contact.addressLines.join(", ")}</p>
          <p><a href="mailto:${localized.contact.email}">${localized.contact.email}</a></p>
        </div>
        <div class="social-list">
          ${localized.clubMeta.socialLinks.map((social) => `
            <a href="${social.href}" target="_blank" rel="noreferrer">${social.label}</a>
          `).join("")}
        </div>
      </div>
      <button class="back-to-top" type="button" data-back-to-top aria-label="${t("backToTop", "Back to top")}">${t("topButton", "Top")}</button>
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
    const linkStart = sponsor.link ? `<a class="sponsor-card-link" href="${sponsor.link}" target="_blank" rel="noreferrer" aria-label="${tf("visitSponsor", `Visit ${sponsor.name}`, { name: sponsor.name })}">` : "";
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
        <a class="gallery-card-link" href="${item.image}" target="_blank" rel="noopener noreferrer" aria-label="${tf("openFullPhoto", `Open full photo: ${item.title}`, { title: item.title })}">
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
        <a class="future-card-link" href="${withLangParam(folderHref)}" aria-label="${tf("openFolder", `Open ${slot.name} folder`, { name: slot.name })}">
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
      ".content-section .info-card, .content-section .team-card, .content-section .program-card, .content-section .table-card, .content-section .gallery-card, .content-section .future-tournament-card, .content-section .sponsor-card, .content-section .membership-card, .content-section .emphasis-card"
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

    const folderMeta = (localized.futureTournamentGallery || []).map((slot) => ({
      slug: slot.slug || inferFolderSlug(slot.name),
      name: slot.name,
      description: slot.description
    }));

    const photosByFolder = (localized.galleryItems || []).map((item) => ({
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
      folderTitle.textContent = tf("folderTitleTemplate", "All Star FC | {name}", { name: selectedFolder.name });
      folderNote.textContent = folderPhotos.length
        ? tf("showingPhotosFrom", `Showing ${folderPhotos.length} photo${folderPhotos.length > 1 ? "s" : ""} from ${selectedFolder.name}.`, { count: folderPhotos.length, name: selectedFolder.name })
        : tf("noPhotosFor", `No photos uploaded yet for ${selectedFolder.name}.`, { name: selectedFolder.name });

      galleryGrid.innerHTML = folderPhotos.length
        ? folderPhotos.map((item) => galleryCard(item)).join("")
        : `
          <article class="info-card gallery-empty-card">
            <h3>${selectedFolder.name}</h3>
            <p>${t("folderCreatedCopy", "Folder created. Upload photos for this tournament and they will appear here automatically.")}</p>
          </article>
        `;
      setupInteractiveCards(galleryGrid);

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

  function setupScrollProgress() {
    const progressBar = document.querySelector("[data-scroll-progress-bar]");
    if (!progressBar) {
      return;
    }

    function updateProgress() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollHeight)) : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function setupBackToTop() {
    const button = document.querySelector("[data-back-to-top]");
    if (!button) {
      return;
    }

    function refreshButtonState() {
      const shouldShow = window.scrollY > 520;
      button.classList.toggle("is-visible", shouldShow);
    }

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    refreshButtonState();
    window.addEventListener("scroll", refreshButtonState, { passive: true });
    window.addEventListener("resize", refreshButtonState);
  }

  function setupInteractiveCards(scope = document) {
    const supportsPointerEffects = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!supportsPointerEffects) {
      return;
    }

    const cards = scope.querySelectorAll(
      ".info-card, .team-card, .program-card, .future-tournament-card, .gallery-card, .sponsor-card, .table-card, .contact-form-card, .membership-card"
    );

    cards.forEach((card) => {
      if (card.dataset.interactiveBound === "true") {
        return;
      }
      card.dataset.interactiveBound = "true";
      card.classList.add("premium-interactive-card");

      function resetCard() {
        card.style.transform = "";
      }

      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 4.5;
        const rotateX = (0.5 - y) * 4.5;
        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      });
      card.addEventListener("pointerleave", resetCard);
      card.addEventListener("blur", resetCard);
    });
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
        setStatus(t("formStatusBlocked", "Message blocked."), "error");
        return;
      }

      if (!name || !email || !subject || !message) {
        setStatus(t("formStatusRequired", "Please fill in name, email, subject, and message."), "error");
        return;
      }

      if (!isValidEmail(email)) {
        setStatus(t("formStatusEmail", "Please use a valid email address."), "error");
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = t("sending", "Sending...");

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
        const response = await fetch(localized.contact.form.endpoint, {
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
        setStatus(t("formSuccess", localized.contact.form.successMessage), "success");
      } catch (error) {
        const fallbackSubject = encodeURIComponent(`All Star FC: ${subject}`);
        const fallbackBody = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:${localized.contact.email}?subject=${fallbackSubject}&body=${fallbackBody}`;
        setStatus(t("formFallback", localized.contact.form.fallbackMessage), "info");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = t("sendMessage", "Send Message");
      }
    });
  }

  function setupMembershipForms() {
    const forms = Array.from(root.querySelectorAll("[data-membership-form]"));
    if (!forms.length) {
      return;
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    forms.forEach((form) => {
      const statusBox = form.querySelector("[data-membership-status]");
      const submitButton = form.querySelector("[data-membership-submit]");
      const membershipType = String(form.dataset.membershipType || "membership").trim();

      function setStatus(message, state) {
        if (!statusBox) {
          return;
        }
        statusBox.textContent = message;
        statusBox.dataset.state = state;
        statusBox.hidden = false;
      }

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const phone = String(data.get("phone") || "").trim();
        const ageGroup = String(data.get("ageGroup") || "").trim();
        const position = String(data.get("position") || "").trim();
        const communityRole = String(data.get("communityRole") || "").trim();
        const message = String(data.get("message") || "").trim();
        const website = String(data.get("website") || "").trim();

        if (website) {
          setStatus(t("formStatusBlocked", "Message blocked."), "error");
          return;
        }

        if (!name || !email) {
          setStatus(t("portalMissingFields", "Please fill in all required fields."), "error");
          return;
        }

        if (!isValidEmail(email)) {
          setStatus(t("formStatusEmail", "Please use a valid email address."), "error");
          return;
        }

        submitButton.disabled = true;
        submitButton.textContent = t("sending", "Sending...");

        const payload = {
          name,
          email,
          phone,
          ageGroup,
          preferredPosition: position,
          communityRole,
          message,
          membershipType,
          _subject: `All Star FC Membership: ${membershipType}`,
          _captcha: "false"
        };

        try {
          const response = await fetch(localized.contact.form.endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error("membership_submit_failed");
          }

          form.reset();
          setStatus(t("applicationSent", "Application sent successfully."), "success");
        } catch (error) {
          const fallbackSubject = encodeURIComponent(`All Star FC Membership: ${membershipType}`);
          const fallbackBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nAge Group: ${ageGroup || "N/A"}\nPreferred Position: ${position || "N/A"}\nCommunity Role: ${communityRole || "N/A"}\n\nMessage:\n${message || "N/A"}`
          );
          window.location.href = `mailto:${localized.contact.email}?subject=${fallbackSubject}&body=${fallbackBody}`;
          setStatus(t("applicationFailed", "Could not submit application. Opening email as fallback."), "info");
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = t("applyNow", "Apply now");
        }
      });
    });
  }

  function getFirebaseContext() {
    if (!window.firebase || typeof window.firebase.initializeApp !== "function") {
      return null;
    }

    const config = window.allStarFirebaseConfig;
    if (!config || !config.apiKey || !config.projectId || !config.appId) {
      return null;
    }

    const firebaseConfig = {
      apiKey: String(config.apiKey || ""),
      authDomain: String(config.authDomain || ""),
      projectId: String(config.projectId || ""),
      appId: String(config.appId || ""),
      storageBucket: String(config.storageBucket || ""),
      messagingSenderId: String(config.messagingSenderId || "")
    };

    try {
      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig);
      }

      const app = window.firebase.app();
      return {
        auth: app.auth(),
        db: app.firestore(),
        profileCollection: String(config.profileCollection || "club_users").trim() || "club_users",
        managerAllowlist: Array.isArray(config.managerAllowlist)
          ? config.managerAllowlist.map((email) => String(email || "").trim().toLowerCase()).filter(Boolean)
          : []
      };
    } catch (error) {
      return null;
    }
  }

  function setupPortalForms() {
    const signupForm = headerRoot.querySelector("[data-signup-form]") || root.querySelector("[data-signup-form]");
    const loginForm = headerRoot.querySelector("[data-login-form]") || root.querySelector("[data-login-form]");
    if (!signupForm && !loginForm) {
      return;
    }

    const signupStatus = signupForm?.querySelector("[data-signup-status]") || null;
    const loginStatus = loginForm?.querySelector("[data-login-status]") || null;

    function setStatus(node, message, state) {
      if (!node) {
        return;
      }
      node.textContent = message;
      node.dataset.state = state;
      node.hidden = false;
    }

    function setFormDisabled(form, disabled) {
      if (!form) {
        return;
      }
      form.querySelectorAll("input, select, button, textarea").forEach((field) => {
        field.disabled = disabled;
      });
    }

    function roleLabel(role) {
      if (role === "manager") {
        return t("roleManager", "Manager");
      }
      if (role === "player") {
        return t("rolePlayer", "Player");
      }
      if (role === "member") {
        return t("roleMember", "Member");
      }
      return role;
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function mapAuthError(error, mode) {
      const code = String(error?.code || "");
      if (mode === "signup") {
        if (code === "auth/email-already-in-use") {
          return t("portalAccountExists", "An account already exists for this email and role.");
        }
        if (code === "auth/weak-password") {
          return t("portalPasswordRule", "Password must be at least 6 characters.");
        }
        if (code === "auth/invalid-email") {
          return t("formStatusEmail", "Please use a valid email address.");
        }
        if (code === "auth/operation-not-allowed") {
          return t("portalAuthUnavailable", "Email/password authentication is not enabled yet.");
        }
        return t("portalSignupFailed", "Could not create account right now. Please try again.");
      }

      if (code === "auth/invalid-email") {
        return t("formStatusEmail", "Please use a valid email address.");
      }
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        return t("portalLoginFailed", "Account or password does not match this role.");
      }
      if (code === "auth/too-many-requests") {
        return t("portalTooManyRequests", "Too many attempts. Please wait a moment and try again.");
      }
      if (code === "auth/operation-not-allowed") {
        return t("portalAuthUnavailable", "Email/password authentication is not enabled yet.");
      }
      return t("portalLoginError", "Login could not be completed right now. Please try again.");
    }

    const firebaseContext = getFirebaseContext();
    if (!firebaseContext) {
      const missingMessage = t("portalBackendMissing", "Portal auth is not configured yet. Add Firebase keys in assets/js/firebase-config.js.");
      setStatus(signupStatus, missingMessage, "info");
      setStatus(loginStatus, missingMessage, "info");
      setFormDisabled(signupForm, true);
      setFormDisabled(loginForm, true);
      return;
    }

    const { auth, db, profileCollection, managerAllowlist } = firebaseContext;
    const usersRef = db.collection(profileCollection);
    const serverTimestamp = () => window.firebase.firestore.FieldValue.serverTimestamp();

    if (signupForm) {
      const signupButton = signupForm.querySelector("button[type='submit']");
      signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = new FormData(signupForm);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim().toLowerCase();
        const role = String(data.get("role") || "").trim().toLowerCase();
        const password = String(data.get("password") || "");
        const confirmPassword = String(data.get("confirmPassword") || "");

        if (!name || !email || !role || !password || !confirmPassword) {
          setStatus(signupStatus, t("portalMissingFields", "Please fill in all required fields."), "error");
          return;
        }

        if (!isValidEmail(email)) {
          setStatus(signupStatus, t("formStatusEmail", "Please use a valid email address."), "error");
          return;
        }

        if (password !== confirmPassword) {
          setStatus(signupStatus, t("portalPasswordMismatch", "Passwords do not match."), "error");
          return;
        }

        if (password.length < 6) {
          setStatus(signupStatus, t("portalPasswordRule", "Password must be at least 6 characters."), "error");
          return;
        }

        if (role === "manager" && managerAllowlist.length && !managerAllowlist.includes(email)) {
          setStatus(signupStatus, t("portalManagerRestricted", "Manager signup is restricted. Use an approved manager email."), "error");
          return;
        }

        if (signupButton) {
          signupButton.disabled = true;
          signupButton.textContent = t("sending", "Sending...");
        }

        try {
          const credential = await auth.createUserWithEmailAndPassword(email, password);
          const user = credential.user;
          if (!user) {
            throw new Error("portal_signup_user_missing");
          }

          await user.updateProfile({ displayName: name });
          await usersRef.doc(user.uid).set({
            name,
            email,
            role,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          }, { merge: true });

          const loginEmailField = loginForm?.querySelector("input[name='email']") || null;
          const loginPasswordField = loginForm?.querySelector("input[name='password']") || null;
          const loginRoleField = loginForm?.querySelector("select[name='role']") || null;
          if (loginEmailField) {
            loginEmailField.value = email;
          }
          if (loginPasswordField) {
            loginPasswordField.value = password;
          }
          if (loginRoleField) {
            loginRoleField.value = role;
          }
          if (registerPanel) {
            registerPanel.hidden = true;
          }
          if (registerToggle) {
            registerToggle.setAttribute("aria-expanded", "false");
          }
          signupForm.reset();
          setStatus(signupStatus, t("portalSignupSuccess", "Account created. You can now log in."), "success");
          setStatus(loginStatus, t("portalSignupReady", "Account created. Your login details are ready below."), "info");
        } catch (error) {
          const currentUser = auth.currentUser;
          if (
            currentUser &&
            currentUser.email &&
            String(currentUser.email).trim().toLowerCase() === email
          ) {
            try {
              await currentUser.delete();
            } catch (deleteError) {
              try {
                await auth.signOut();
              } catch (signOutError) {
                // Keep UI responsive even if cleanup fails.
              }
            }
          }
          setStatus(signupStatus, mapAuthError(error, "signup"), "error");
          try {
            if (auth.currentUser) {
              await auth.signOut();
            }
          } catch (signOutError) {
            // Keep UI responsive even if sign-out cleanup fails.
          }
        } finally {
          if (signupButton) {
            signupButton.disabled = false;
            signupButton.textContent = t("signupButton", "Sign up");
          }
        }
      });
    }

    if (loginForm) {
      const loginButton = loginForm.querySelector("button[type='submit']");
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = new FormData(loginForm);
        const email = String(data.get("email") || "").trim().toLowerCase();
        const role = String(data.get("role") || "").trim().toLowerCase();
        const password = String(data.get("password") || "");

        if (!email || !role || !password) {
          setStatus(loginStatus, t("portalMissingFields", "Please fill in all required fields."), "error");
          return;
        }

        if (!isValidEmail(email)) {
          setStatus(loginStatus, t("formStatusEmail", "Please use a valid email address."), "error");
          return;
        }

        if (loginButton) {
          loginButton.disabled = true;
          loginButton.textContent = t("sending", "Sending...");
        }

        try {
          const credential = await auth.signInWithEmailAndPassword(email, password);
          const user = credential.user;
          if (!user) {
            throw new Error("portal_login_user_missing");
          }

          const profileDoc = await usersRef.doc(user.uid).get();
          if (!profileDoc.exists) {
            if (role === "manager" && managerAllowlist.length && !managerAllowlist.includes(email)) {
              await auth.signOut();
              setStatus(loginStatus, t("portalManagerRestricted", "Manager signup is restricted. Use an approved manager email."), "error");
              return;
            }

            await usersRef.doc(user.uid).set({
              name: String(user.displayName || email.split("@")[0] || "").trim(),
              email,
              role,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }, { merge: true });

            setStatus(
              loginStatus,
              tf(
                "portalRecoveredProfile",
                "Login successful as {role}. Your profile was restored.",
                { role: roleLabel(role) }
              ),
              "success"
            );
            return;
          }

          const profileData = profileDoc.data() || {};
          const savedRole = String(profileData.role || "").trim().toLowerCase();
          if (!savedRole || savedRole !== role) {
            await auth.signOut();
            setStatus(loginStatus, t("portalRoleMismatch", "This account is registered with a different role."), "error");
            return;
          }

          setStatus(loginStatus, tf("portalLoginSuccess", "Login successful as {role}.", { role: roleLabel(savedRole) }), "success");
        } catch (error) {
          setStatus(loginStatus, mapAuthError(error, "login"), "error");
        } finally {
          if (loginButton) {
            loginButton.disabled = false;
            loginButton.textContent = t("loginButton", "Login");
          }
        }
      });
    }
  }
  function renderHome() {
    const upcoming = localized.fixtures.upcoming.slice(0, 5);
    const honourWins = content.honours.filter((honour) => String(honour.result || "").toLowerCase().includes("winner")).length;
    const futurePreview = (localized.futureTournamentGallery || []).slice(0, 3);

    root.innerHTML = `
      <section class="hero-section">
        <div class="section-shell hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">${tf("homeHeroEyebrow", `All Star FC | Helsinki Since ${localized.clubMeta.founded}`, { year: localized.clubMeta.founded })}</p>
            <h1>${localized.hero.title}</h1>
            <p class="hero-text">${localized.hero.subtitle}</p>
            <div class="button-row">
              <a class="button" href="${withLangParam(localized.hero.primaryCta.href)}">${localized.hero.primaryCta.label}</a>
              <a class="button button-secondary" href="${withLangParam(localized.hero.secondaryCta.href)}">${localized.hero.secondaryCta.label}</a>
            </div>
            <div class="stat-grid">
              ${localized.hero.stats.map((stat) => `
                <article class="stat-card">
                  <strong>${stat.value}</strong>
                  <span>${stat.label}</span>
                </article>
              `).join("")}
            </div>
          </div>
          <article class="hero-panel">
            <img class="hero-photo" src="${localized.hero.image}" alt="${localized.hero.imageAlt}">
            <div class="hero-panel-content">
              <p class="eyebrow">${t("tournamentPulse", "Tournament pulse")}</p>
              <h2>${t("competitionWindow", "All Star FC 2026 Competition Window")}</h2>
              <ul class="feature-list">
                ${upcoming.map((fixture) => `
                  <li>
                    <strong>${fixture.opponent}</strong>
                    <span>${fixture.date}</span>
                  </li>
                `).join("")}
              </ul>
              <a class="text-link" href="${withLangParam("fixtures.html")}">${t("viewSchedule", "View full tournament schedule")}</a>
            </div>
          </article>
        </div>
      </section>

      <section class="ticker-section">
        <div class="section-shell">
          <div class="ticker-shell">
            <span class="ticker-label">${t("tournamentPulse", "Tournament pulse")}</span>
            <div class="ticker-track">
              ${tickerMarkup(upcoming)}
            </div>
          </div>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading(t("clubProfileEyebrow", "Club profile"), t("clubProfileTitle", "Progressive football with Nepalese values at the core."), localized.about.intro)}
          <div class="split-layout">
            <div class="rich-copy">
              ${localized.about.story.map((paragraph) => `<p>${paragraph}</p>`).join("")}
              <p><strong>${t("visionLabel", "Vision")}:</strong> ${localized.about.vision}</p>
              <p><strong>${t("missionLabel", "Mission")}:</strong> ${localized.about.mission}</p>
            </div>
            <div class="stack-grid">
              ${localized.about.pillars.map((pillar) => `
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
            ${sectionHeading(t("nextMatchWindowsEyebrow", "Next match windows"), t("nextMatchWindowsTitle", "Upcoming tournaments and competition status."), t("nextMatchWindowsCopy", "Simple high-trust scheduling for players, families, and supporters."))}
            <div class="table-card">
              <table>
                <caption class="sr-only">${t("fixturesHeroEyebrow", "Upcoming tournaments")}</caption>
                <thead>
                  <tr>
                    <th>${t("dateLabel", "Date")}</th>
                    <th>${t("tournamentLabel", "Tournament")}</th>
                    <th>${t("statusLabel", "Status")}</th>
                    <th>${t("venueLabel", "Venue")}</th>
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
            <p class="eyebrow">${t("honoursSnapshot", "Honours snapshot")}</p>
            <h3>${tf("tournamentWinsRecorded", `${honourWins} tournament wins recorded`, { count: honourWins })}</h3>
            <p>${t("honoursSnapshotCopy", "All Star FC continues to represent culture, community, and unity with disciplined football standards.")}</p>
            <div class="values-strip-inner">
              ${localized.clubMeta.values.map((value) => `<span>${value}</span>`).join("")}
            </div>
          </article>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading(t("futureVaultEyebrow", "Future tournament media vault"), t("futureVaultTitle", "A dedicated gallery system ready for upcoming cup photos."), t("futureVaultCopy", "Each tournament now has a prepared visual block so you can keep building the club archive season by season."))}
          <div class="card-grid three-up future-grid">
            ${futurePreview.map((slot) => futureTournamentCard(slot)).join("")}
          </div>
        </div>
      </section>

      <section class="content-section tint-section" id="executive-panel">
        <div class="section-shell">
          ${sectionHeading(t("executiveEyebrow", "Executive committee"), t("executiveTitle", "Leadership panel for All Star FC."), "")}
          <div class="card-grid two-up exec-grid">
            ${localized.board.map((member, index) => boardCard(member, index)).join("")}
          </div>
        </div>
      </section>

      <section class="content-section sponsors-section">
        <div class="section-shell">
          ${sectionHeading(t("sponsorsEyebrow", "Sponsors"), t("sponsorsTitle", "Partners currently backing All Star FC."), "")}
          <div class="card-grid sponsors-grid">
            ${localized.sponsors.map((sponsor) => sponsorCard(sponsor)).join("")}
          </div>
        </div>
      </section>
    `;
  }
  function renderAbout() {
    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">${t("aboutHeroEyebrow", "About the club")}</p>
          <h1>${t("aboutHeroTitle", "A Nepalese football club in Helsinki with a long-term development mindset.")}</h1>
          <p>${localized.about.story[0]}</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell split-layout">
          <div>${sectionHeading(t("clubStoryEyebrow", "Club story"), t("clubStoryTitle", "Built on community, discipline, and football ambition."), localized.about.intro)}</div>
          <div class="rich-copy">
            ${localized.about.story.map((paragraph) => `<p>${paragraph}</p>`).join("")}
            <p><strong>${t("visionLabel", "Vision")}:</strong> ${localized.about.vision}</p>
            <p><strong>${t("missionLabel", "Mission")}:</strong> ${localized.about.mission}</p>
          </div>
        </div>
      </section>

      <section class="content-section tint-section">
        <div class="section-shell">
          ${sectionHeading(t("coreValuesEyebrow", "Core values"), t("coreValuesTitle", "Values used as practical standards across all teams."), "")}
          <div class="values-strip-inner">
            ${localized.clubMeta.values.map((value) => `<span>${value}</span>`).join("")}
          </div>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading(t("selectedHonoursEyebrow", "Selected honours"), t("selectedHonoursTitle", "A record of wins and finals across key community tournaments."), "")}
          <div class="table-card">
            <table>
              <caption class="sr-only">${t("selectedHonoursEyebrow", "Selected honours")}</caption>
              <thead>
                <tr>
                  <th>${t("yearLabel", "Year")}</th>
                  <th>${t("competitionLabel", "Competition")}</th>
                  <th>${t("resultLabel", "Result")}</th>
                </tr>
              </thead>
              <tbody>
                ${localized.honours.map((honour) => `
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
          ${sectionHeading(t("executiveEyebrow", "Executive committee"), t("executiveStructureTitle", "Leadership structure guiding All Star FC operations."), "")}
          <div class="card-grid two-up exec-grid">
            ${localized.board.map((member, index) => boardCard(member, index)).join("")}
          </div>
        </div>
      </section>
    `;
  }
  function renderTeams() {
    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">${t("teamsHeroEyebrow", "Teams and academy")}</p>
          <h1>${t("teamsHeroTitle", "One pathway from U8-U13 academy to senior team integration.")}</h1>
          <p>${t("teamsHeroCopy", "All teams operate with clear identity, training discipline, and values-based representation.")}</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading(t("teamStructureEyebrow", "Team structure"), t("teamStructureTitle", "From academy development to representative senior football."), "")}
          <div class="card-grid two-up">
            ${localized.teams.map((team) => `
              <article class="team-card">
                <div class="card-topline">
                  <span class="pill">${team.stage}</span>
                  <span>${team.venue}</span>
                </div>
                <h3>${team.name}</h3>
                <p>${team.focus}</p>
                <ul class="detail-list">
                  <li><strong>${t("coachLabel", "Coach")}</strong><span>${team.coach}</span></li>
                  <li><strong>${t("trainingLabel", "Training")}</strong><span>${team.training}</span></li>
                </ul>
              </article>
            `).join("")}
          </div>
        </div>
      </section>

      <section class="content-section tint-section">
        <div class="section-shell">
          ${sectionHeading(t("playerProfilesEyebrow", "Player profiles"), t("playerProfilesTitle", "Player profile table"), t("playerProfilesCopy", "Manager can update player slots from the shared content file."))}
          <div class="table-card profile-table-card">
            <table>
              <caption class="sr-only">${t("playerProfilesEyebrow", "Player profiles")}</caption>
              <thead>
                <tr>
                  <th>${t("profileNameCol", "Name")}</th>
                  <th>${t("profilePositionCol", "Position")}</th>
                  <th>${t("profilePathwayCol", "Pathway")}</th>
                  <th>${t("profileFootCol", "Preferred Foot")}</th>
                  <th>${t("profileStatusCol", "Status")}</th>
                </tr>
              </thead>
              <tbody>
                ${localized.playerProfiles.map((profile) => `
                  <tr>
                    <td>${profile.name}</td>
                    <td>${profile.position}</td>
                    <td>${profile.pathway}</td>
                    <td>${profile.preferredFoot}</td>
                    <td>${profile.status}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="content-section tint-section">
        <div class="section-shell split-layout">
          <div>
            ${sectionHeading(t("academyProgramEyebrow", "Academy program"), t("academyProgramTitle", "Focused U8-U13 foundation with clear progression."), localized.academyPrograms[0].summary)}
            <article class="info-card emphasis-card">
              <p class="eyebrow">${localized.academyPrograms[0].ages}</p>
              <h3>${localized.academyPrograms[0].name}</h3>
              <p>${localized.academyPrograms[0].emphasis}</p>
            </article>
          </div>
          <article class="program-card">
            <p class="eyebrow">${t("pathwayModelEyebrow", "Pathway model")}</p>
            <h3>${t("pathwayModelTitle", "Academy to senior transition")}</h3>
            <p>${t("pathwayModelCopy", "After the U8-U13 stage, players move into structured assessment and integration blocks aligned with senior standards.")}</p>
            <div class="values-strip-inner">
              <span>${t("technicalGrowth", "Technical growth")}</span>
              <span>${t("disciplineValue", "Discipline")}</span>
              <span>${t("matchReadiness", "Match readiness")}</span>
              <span>${t("teamIntegration", "Team integration")}</span>
            </div>
          </article>
        </div>
      </section>
    `;
  }

  function renderFixtures() {
    const futureSlots = localized.futureTournamentGallery || [];

    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">${t("fixturesHeroEyebrow", "Upcoming tournaments")}</p>
          <h1>${t("fixturesHeroTitle", "Competition schedule and future tournament media planning.")}</h1>
          <p>${t("fixturesHeroCopy", "All Star FC is participating in the tournaments listed below, with a dedicated media archive prepared for each event.")}</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading(t("tournamentScheduleEyebrow", "Tournament schedule"), t("tournamentScheduleTitle", "Upcoming cups and key dates."), "")}
          <div class="table-card">
            <table>
              <caption class="sr-only">${t("tournamentScheduleEyebrow", "Tournament schedule")}</caption>
              <thead>
                <tr>
                  <th>${t("dateLabel", "Date")}</th>
                  <th>${t("tournamentLabel", "Tournament")}</th>
                  <th>${t("statusLabel", "Status")}</th>
                  <th>${t("kickOffLabel", "Kick-off")}</th>
                  <th>${t("venueLabel", "Venue")}</th>
                </tr>
              </thead>
              <tbody>
                ${localized.fixtures.upcoming.map((fixture) => `
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
          ${sectionHeading(t("futureTournamentVaultEyebrow", "Future tournament media vault"), t("futureTournamentVaultTitle", "Prepared gallery slots for every major competition."), t("futureTournamentVaultCopy", "Once each tournament is played, photos can be added quickly without redesigning the site."))}
          <div class="card-grid three-up future-grid">
            ${futureSlots.map((slot) => futureTournamentCard(slot)).join("")}
          </div>
          <p class="section-note">${t("sectionTip", "Tip: upload tournament photos with consistent names and replace the placeholder slots from the shared content file.")}</p>
        </div>
      </section>
    `;
  }
  function renderGallery() {
    const folders = (localized.futureTournamentGallery || []).map((slot) => ({
      slug: slot.slug || inferFolderSlug(slot.name),
      name: slot.name,
      image: slot.image || tournamentFallback,
      status: slot.status
    }));

    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">${t("galleryHeroEyebrow", "Tournament gallery")}</p>
          <h1>${t("galleryHeroTitle", "Tournament folders and visual archive")}</h1>
          <p>${t("galleryHeroCopy", "Select a tournament folder. Photos appear only after clicking the folder name.")}</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading(t("tournamentFoldersEyebrow", "Tournament folders"), t("tournamentFoldersTitle", "Click Manse Nepal folder to open Manse photos."), "")}
          <div class="folder-grid">
            ${folders.map((folder) => `
              <button class="folder-card" type="button" data-gallery-folder="${folder.slug}" aria-label="${tf("openFolder", `Open ${folder.name} folder`, { name: folder.name })}">
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
            <p class="eyebrow">${t("cupArchiveEyebrow", "Cup archive")}</p>
            <h2 data-folder-title>${t("folderDefaultTitle", "All Star FC | Tournament Folder")}</h2>
            <p data-folder-note>${t("folderDefaultNote", "Select a folder to view photos.")}</p>
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
        <h2>${t("emailLabel", "Email")}</h2>
        <p><a href="mailto:${localized.contact.email}">${localized.contact.email}</a></p>
        <p>${localized.contact.officeHours}</p>
      </article>
    `);

    if (localized.contact.phone) {
      publicChannels.push(`
        <article class="info-card">
          <h2>${t("phoneLabel", "Phone")}</h2>
          <p><a href="tel:${localized.contact.phone.replace(/\s+/g, "")}">${localized.contact.phone}</a></p>
        </article>
      `);
    }

    if (localized.contact.whatsapp) {
      publicChannels.push(`
        <article class="info-card">
          <h2>${t("whatsappLabel", "WhatsApp")}</h2>
          <p><a href="${localized.contact.whatsapp}" target="_blank" rel="noreferrer">${t("messageOnWhatsApp", "Message on WhatsApp")}</a></p>
        </article>
      `);
    }

    publicChannels.push(`
      <article class="info-card">
        <h2>${t("locationLabel", "Location")}</h2>
        <p>${localized.contact.addressLines.join("<br>")}</p>
        <p><a href="${localized.contact.mapLink}" target="_blank" rel="noreferrer">${t("openMap", "Open map")}</a></p>
      </article>
    `);

    root.innerHTML = `
      <section class="page-hero">
        <div class="section-shell">
          <p class="eyebrow">${t("contactHeroEyebrow", "Contact and join")}</p>
          <h1>${t("contactHeroTitle", "Reach All Star FC directly from one dynamic contact panel.")}</h1>
          <p>${t("contactHeroCopy", "For player pathways, academy interest, and sponsorship, use the form below.")}</p>
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
            ${sectionHeading(t("dynamicEnquiryEyebrow", "Dynamic enquiry form"), t("dynamicEnquiryTitle", "Send a message directly to All Star FC."), "")}
            <form class="contact-form-card" data-contact-form novalidate>
              <div class="form-grid two-col">
                <label class="form-field">
                  <span>${t("nameLabel", "Name *")}</span>
                  <input type="text" name="name" autocomplete="name" required>
                </label>
                <label class="form-field">
                  <span>${t("emailField", "Email *")}</span>
                  <input type="email" name="email" autocomplete="email" required>
                </label>
              </div>
              <div class="form-grid two-col">
                <label class="form-field">
                  <span>${t("phoneField", "Phone")}</span>
                  <input type="tel" name="phone" autocomplete="tel">
                </label>
                <fieldset class="form-field radio-group-field">
                  <legend>${t("subjectLabel", "Subject *")}</legend>
                  <div class="radio-group">
                    ${localized.contact.form.subjects.map((option, index) => `
                      <label class="radio-option">
                        <input type="radio" name="subject" value="${option}" ${index === 0 ? "checked" : ""} required>
                        <span>${getSubjectLabel(option)}</span>
                      </label>
                    `).join("")}
                  </div>
                </fieldset>
              </div>
              <label class="form-field">
                <span>${t("messageLabel", "Message *")}</span>
                <textarea name="message" rows="6" required></textarea>
              </label>
              <label class="form-honeypot" aria-hidden="true">
                <span>${t("websiteLabel", "Website")}</span>
                <input type="text" name="website" tabindex="-1" autocomplete="off">
              </label>
              <div class="form-actions">
                <button class="button" type="submit" data-form-submit>${t("sendMessage", "Send Message")}</button>
                <p class="form-status" data-form-status hidden></p>
              </div>
            </form>
          </div>
          <article class="info-card emphasis-card">
            <p class="eyebrow">${t("responseFlowEyebrow", "Response flow")}</p>
            <h3>${t("fastestWayTitle", "Fastest way to hear back")}</h3>
            <p>${t("fastestWayCopy", "Use a clear subject and include age group or purpose in your message.")}</p>
            <p><a class="text-link" href="mailto:${localized.contact.email}">${localized.contact.email}</a></p>
          </article>
        </div>
      </section>

      <section class="content-section">
        <div class="section-shell">
          ${sectionHeading(t("membershipEyebrow", "Membership"), t("membershipTitle", "Membership forms"), t("membershipCopy", "Choose the membership application type that matches your role."))}
          <div class="card-grid three-up membership-grid">
            <article class="membership-card">
              <h3>${t("membershipPlayerTitle", "Player Membership")}</h3>
              <p>${t("membershipPlayerCopy", "For players applying to senior or competitive squads.")}</p>
              <form class="membership-form" data-membership-form data-membership-type="${t("membershipTypePlayer", "Player Membership")}" novalidate>
                <label class="form-field">
                  <span>${t("fullNameField", "Full name *")}</span>
                  <input type="text" name="name" required>
                </label>
                <label class="form-field">
                  <span>${t("emailField", "Email *")}</span>
                  <input type="email" name="email" required>
                </label>
                <label class="form-field">
                  <span>${t("phoneField", "Phone")}</span>
                  <input type="tel" name="phone">
                </label>
                <label class="form-field">
                  <span>${t("ageGroupField", "Age Group")}</span>
                  <input type="text" name="ageGroup" placeholder="U8-U13 / Senior">
                </label>
                <label class="form-field">
                  <span>${t("preferredPositionField", "Preferred Position")}</span>
                  <input type="text" name="position" placeholder="${t("playerPositionPlaceholder", "Defender / Midfielder / Forward")}">
                </label>
                <label class="form-field">
                  <span>${t("notesField", "Notes")}</span>
                  <textarea name="message" rows="4"></textarea>
                </label>
                <label class="form-honeypot" aria-hidden="true">
                  <span>${t("websiteLabel", "Website")}</span>
                  <input type="text" name="website" tabindex="-1" autocomplete="off">
                </label>
                <div class="form-actions">
                  <button class="button" type="submit" data-membership-submit>${t("applyNow", "Apply now")}</button>
                  <p class="form-status" data-membership-status hidden></p>
                </div>
              </form>
            </article>

            <article class="membership-card">
              <h3>${t("membershipAcademyTitle", "Academy Membership")}</h3>
              <p>${t("membershipAcademyCopy", "For youth players entering the U8-U13 academy pathway.")}</p>
              <form class="membership-form" data-membership-form data-membership-type="${t("membershipTypeAcademy", "Academy Membership")}" novalidate>
                <label class="form-field">
                  <span>${t("fullNameField", "Full name *")}</span>
                  <input type="text" name="name" required>
                </label>
                <label class="form-field">
                  <span>${t("emailField", "Email *")}</span>
                  <input type="email" name="email" required>
                </label>
                <label class="form-field">
                  <span>${t("phoneField", "Phone")}</span>
                  <input type="tel" name="phone">
                </label>
                <label class="form-field">
                  <span>${t("ageGroupField", "Age Group")}</span>
                  <input type="text" name="ageGroup" placeholder="${t("academyAgePlaceholder", "U8, U9, U10, U11, U12, U13")}">
                </label>
                <label class="form-field">
                  <span>${t("notesField", "Notes")}</span>
                  <textarea name="message" rows="4"></textarea>
                </label>
                <label class="form-honeypot" aria-hidden="true">
                  <span>${t("websiteLabel", "Website")}</span>
                  <input type="text" name="website" tabindex="-1" autocomplete="off">
                </label>
                <div class="form-actions">
                  <button class="button" type="submit" data-membership-submit>${t("applyNow", "Apply now")}</button>
                  <p class="form-status" data-membership-status hidden></p>
                </div>
              </form>
            </article>

            <article class="membership-card">
              <h3>${t("membershipCommunityTitle", "Community Membership")}</h3>
              <p>${t("membershipCommunityCopy", "For volunteers, supporters, and community partners.")}</p>
              <form class="membership-form" data-membership-form data-membership-type="${t("membershipTypeCommunity", "Community Membership")}" novalidate>
                <label class="form-field">
                  <span>${t("fullNameField", "Full name *")}</span>
                  <input type="text" name="name" required>
                </label>
                <label class="form-field">
                  <span>${t("emailField", "Email *")}</span>
                  <input type="email" name="email" required>
                </label>
                <label class="form-field">
                  <span>${t("phoneField", "Phone")}</span>
                  <input type="tel" name="phone">
                </label>
                <label class="form-field">
                  <span>${t("communityRoleField", "Community Role")}</span>
                  <input type="text" name="communityRole" placeholder="${t("communityRolePlaceholder", "Volunteer / Sponsor / Supporter")}">
                </label>
                <label class="form-field">
                  <span>${t("notesField", "Notes")}</span>
                  <textarea name="message" rows="4"></textarea>
                </label>
                <label class="form-honeypot" aria-hidden="true">
                  <span>${t("websiteLabel", "Website")}</span>
                  <input type="text" name="website" tabindex="-1" autocomplete="off">
                </label>
                <div class="form-actions">
                  <button class="button" type="submit" data-membership-submit>${t("applyNow", "Apply now")}</button>
                  <p class="form-status" data-membership-status hidden></p>
                </div>
              </form>
            </article>
          </div>
        </div>
      </section>

    `;

    setupContactForm();
    setupMembershipForms();
  }

  function setupInteractions() {
    setupScrollProgress();
    setupBackToTop();
    setupRevealAnimations();
    setupInteractiveCards(root);
    if (page === "gallery") {
      setupGalleryFilters();
      setupGalleryFolders();
    }
  }

  renderHeader();
  setupLanguageSwitcher();
  setupPortalForms();
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
