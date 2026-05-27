import {
  bookingCategories,
  eventFormats,
  galleryImages,
  lessonTopics,
  navItems,
  pathways,
  projects,
  recordings,
  rotatingLines,
  socialLinks,
  supportGoals,
} from "./data.js";

const root = document.getElementById("root");
let currentLang = localStorage.getItem("alex-parke-lang") || "en";
let line = 0;
let rotationTimer;

const i18n = {
  en: {
    nav: {
      Home: "Home",
      About: "About",
      Projects: "Projects",
      Lessons: "Lessons",
      "Shows & Events": "Shows & Events",
      Media: "Media",
      Support: "Support",
      Contact: "Contact",
    },
    brandSub: "Clarinetist / Ethnomusicologist",
    book: "Book",
    menu: "Menu",
    close: "Close",
    heroSubtitle: "Clarinetist, Ethnomusicologist & International Performer",
    rotating: [
      "Tradition, improvisation, and contemporary sound.",
      "From New York to Sao Paulo",
      "Performance, Tradition, Research & Education",
    ],
    ctaBook: "Book a Performance",
    ctaLessons: "Lessons",
    ctaProjects: "Projects",
    impact: "Tradition, improvisation, and music that brings people together.",
    portraitLabel: "Performer / Educator / Researcher",
    portraitCopy: "An artistic identity rooted in tradition, curiosity, and live musical encounter.",
    aboutLabel: "About",
    aboutTitle: "Music, research, teaching, and community work.",
    about1: "Alex Parke is a clarinetist, ethnomusicologist, composer, performer, educator, and researcher working between New York City and Sao Paulo, known especially for klezmer, Jewish music, Brazilian music, and cross-cultural performance.",
    about2: "He has performed with major figures in the klezmer world including Frank London, Michael Winograd, Jake Shulman-Ment, Christina Crowder, Ilya Shneyveys, Pete Rushefsky, and other leading artists. He has also appeared as a clarinet soloist with orchestras, bringing klezmer language into larger concert settings.",
    about3: "Specializing in klezmer and Jewish music, Alex also studies and draws inspiration from Turkish, Greek, Ottoman, Balkan, Thracian, and Brazilian musical traditions. His practice moves between concert stages, classrooms, festivals, cultural institutions, and community celebrations.",
    whatLabel: "What I Do",
    projectsLabel: "Projects",
    projectsTitle: "Multiple artistic worlds, one living tradition.",
    projectsLead: "Each project frames klezmer and related traditions through a different lens: concert music, theater, celebration, research, education, archives, and experimentation.",
    teachingLabel: "Teaching",
    lessonsTitle: "Lessons & Mentorship",
    lessonsLead: "Individual guidance for beginners, intermediate players, advanced musicians, and professionals looking for deeper style, sound, repertoire, and performance fluency.",
    languages: ["Portuguese BR", "English US", "Spanish ES"],
    lessonsPlace: "Online lessons and in-person lessons in Sao Paulo.",
    trial: "Schedule a Trial Lesson",
    whatsapp: "Ask on WhatsApp",
    quote: "Based out of New York City and Sao Paulo, Alex Parke strives to bring delight and joy to the hearts of his audience.",
    quoteBy: "",
    bookingsLabel: "Performance & Bookings",
    bookingsTitle: "Jewish music that makes a celebration unforgettable.",
    bookingsLead: "Available for weddings, b'nai mitzvot, cultural events, concerts, festivals, lectures, workshops, cultural consulting, and artist residencies. Jewish music is a strong part of the work, and Alex also performs artistic projects beyond the Jewish world, including Brazilian music, jazz, improvisation, and cross-cultural concert programs.",
    bookingInquiry: "Start a Booking Inquiry",
    mediaLabel: "Media",
    mediaTitle: "Recordings, sessions, and living archives.",
    mediaLead: "Selected recordings, sessions, photos, and archival projects, organized as a living portrait of Alex's work across performance, research, and community.",
    supportLabel: "Support",
    supportTitle: "Support.",
    supportLead: "Alex Parke works as a community builder and Jewish and Brazilian artist, developing art, building community, and bringing joy to people through klezmer, Brazilian music, archives, teaching, and live performance.",
    supportBody: "Patron support helps Alex keep these activities alive as a Jewish artist, while also supporting his family, health, and well-being.",
    supportCta: "Support / Become a Patron",
    contactLabel: "Contact",
    contactTitle: "Let's create something meaningful together.",
    contactLead: "For shows, lessons, festivals, workshops, cultural projects, and collaborations.",
    formName: "Name",
    formEmail: "Email",
    formInterest: "I'm interested in",
    formChoose: "Choose one",
    formPerformance: "Book a performance",
    formLessons: "Lessons",
    formSubject: "Subject",
    formMessage: "Message",
    formSend: "Send Message",
    formSending: "Sending...",
    formSuccess: "Thank you. Your message was sent.",
    formError: "The form could not send automatically. Please email Alex directly.",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    subjectPlaceholder: "Performance, lessons, workshop...",
    messagePlaceholder: "Tell me what you are imagining.",
    footer: "Alex Parke - Clarinetist, Ethnomusicologist & International Performer",
  },
  pt: {
    nav: {
      Home: "Início",
      About: "Sobre",
      Projects: "Projetos",
      Lessons: "Aulas",
      "Shows & Events": "Shows & Eventos",
      Media: "Mídia",
      Support: "Apoie",
      Contact: "Contato",
    },
    brandSub: "Clarinetista / Etnomusicólogo",
    book: "Contratar",
    menu: "Menu",
    close: "Fechar",
    heroSubtitle: "Clarinetista, Etnomusicólogo & Artista Internacional",
    rotating: [
      "Tradição, improvisação e som contemporâneo.",
      "De Nova York a São Paulo",
      "Performance, tradição, pesquisa e educação",
    ],
    ctaBook: "Contratar para Show",
    ctaLessons: "Aulas",
    ctaProjects: "Projetos",
    impact: "Tradição, improvisação e música que aproxima pessoas.",
    portraitLabel: "Artista / Educador / Pesquisador",
    portraitCopy: "Uma identidade artística enraizada em tradição, curiosidade e encontro musical.",
    aboutLabel: "Sobre",
    aboutTitle: "Música, pesquisa, ensino e trabalho comunitário.",
    about1: "Alex Parke é clarinetista, etnomusicólogo, compositor, performer, educador e pesquisador atuando entre Nova York e São Paulo, conhecido especialmente por seu trabalho com klezmer, música judaica, música brasileira e performance intercultural.",
    about2: "Já se apresentou com nomes importantes do mundo klezmer, incluindo Frank London, Michael Winograd, Jake Shulman-Ment, Christina Crowder, Ilya Shneyveys, Pete Rushefsky e outros artistas. Também atuou como solista de clarinete com orquestras, levando a linguagem klezmer para contextos de concerto.",
    about3: "Especializado em klezmer e música judaica, Alex também estuda e se inspira em tradições musicais turcas, gregas, otomanas, balcânicas, trácias e brasileiras. Seu trabalho passa por palcos, aulas, festivais, instituições culturais e celebrações comunitárias.",
    whatLabel: "O que faço",
    projectsLabel: "Projetos",
    projectsTitle: "Vários mundos artísticos, uma tradição viva.",
    projectsLead: "Cada projeto apresenta o klezmer e tradições relacionadas por um caminho diferente: concerto, teatro, celebração, pesquisa, educação, arquivos e experimentação.",
    teachingLabel: "Ensino",
    lessonsTitle: "Aulas & Mentoria",
    lessonsLead: "Acompanhamento individual para iniciantes, intermediários, músicos avançados e profissionais que buscam estilo, som, repertório, técnica e presença de palco.",
    languages: ["Português BR", "English US", "Español ES"],
    lessonsPlace: "Aulas online e presenciais em São Paulo.",
    trial: "Agendar Aula Experimental",
    whatsapp: "Perguntar no WhatsApp",
    quote: "Baseado em Nova York e São Paulo, Alex Parke busca levar encanto e alegria ao coração do público.",
    quoteBy: "",
    bookingsLabel: "Shows & Contratações",
    bookingsTitle: "Música judaica para tornar uma celebração inesquecível.",
    bookingsLead: "Disponível para casamentos, b'nai mitzvot, eventos culturais, concertos, festivais, palestras, workshops, consultoria cultural e residências artísticas. A música judaica é uma parte forte do trabalho, e Alex também realiza projetos artísticos fora do universo judaico, incluindo música brasileira, jazz, improvisação e programas interculturais.",
    bookingInquiry: "Iniciar Pedido de Contratação",
    mediaLabel: "Mídia",
    mediaTitle: "Gravações, sessões e arquivos vivos.",
    mediaLead: "Gravações, sessões, fotos e projetos de arquivo organizados como um retrato vivo do trabalho de Alex em performance, pesquisa e comunidade.",
    supportLabel: "Apoie",
    supportTitle: "Apoie.",
    supportLead: "Alex Parke atua como construtor de comunidade e artista judeu-brasileiro, desenvolvendo arte, fortalecendo comunidades e levando alegria às pessoas por meio do klezmer, da música brasileira, dos arquivos, do ensino e da performance ao vivo.",
    supportBody: "O apoio de patronos ajuda Alex a manter essas atividades vivas como artista judeu, além de apoiar sua família, saúde e bem-estar.",
    supportCta: "Apoiar / Tornar-se Patrono",
    contactLabel: "Contato",
    contactTitle: "Vamos criar algo significativo juntos.",
    contactLead: "Para shows, aulas, festivais, workshops, projetos culturais e colaborações.",
    formName: "Nome",
    formEmail: "Email",
    formInterest: "Tenho interesse em",
    formChoose: "Escolha uma opção",
    formPerformance: "Contratar uma apresentação",
    formLessons: "Aulas",
    formSubject: "Assunto",
    formMessage: "Mensagem",
    formSend: "Enviar Mensagem",
    formSending: "Enviando...",
    formSuccess: "Obrigado. Sua mensagem foi enviada.",
    formError: "O formulario nao conseguiu enviar automaticamente. Por favor, envie um email diretamente para Alex.",
    namePlaceholder: "Seu nome",
    emailPlaceholder: "voce@email.com",
    subjectPlaceholder: "Show, aulas, workshop...",
    messagePlaceholder: "Conte um pouco do que você está imaginando.",
    footer: "Alex Parke - Clarinetista, Etnomusicólogo & Artista Internacional",
  },
};

const pathwayPt = {
  "Shows & Concerts": ["Shows & Concertos", "Klezmer, música judaica, música brasileira, jazz, eventos culturais, casamentos, festivais e programas de concerto pensados para cada contexto."],
  "Lessons & Mentorship": ["Aulas & Mentoria", "Clarinete, saxofone, flauta, estilo klezmer, improvisação, repertório, técnica e preparação para performance."],
  "Community Building": ["Construção de Comunidade", "Ensaios, direção musical, concertos de casa e trabalho cultural de longo prazo para fortalecer comunidades de klezmer e world music em São Paulo e internacionalmente."],
  "Artistic Projects": ["Projetos Artísticos", "Ensembles e propostas de performance que conectam tradição, teatralidade, educação e som contemporâneo."],
};

const bookingPt = {
  Concerts: "Concertos",
  Festivals: "Festivais",
  "Jewish Events": "Eventos Judaicos",
  Weddings: "Casamentos",
  "B'nai Mitzvot": "B'nai Mitzvot",
  "Cultural Events": "Eventos Culturais",
  Workshops: "Workshops",
  "Educational Residencies": "Residências Artísticas",
  Masterclasses: "Masterclasses",
  Consulting: "Consultoria",
};

const eventPt = {
  "Custom repertoire for your event": "Repertório personalizado para seu evento",
  "Cocktail / lounge music": "Música para coquetel / recepção",
  "Party / dance floor": "Festa / pista de dança",
  Ceremony: "Cerimônia",
  "Dinner / reception": "Jantar / recepção",
};

const supportPt = {
  "Bloco Klezmer monthly rehearsals": "Ensaios mensais do Bloco Klezmer",
  "Monthly house concert series": "Série mensal de concertos de casa",
  "Honigsberg Archive": "Arquivo Honigsberg",
  "Stuart Manning Archive": "Arquivo Stuart Manning",
  "Many projects revolving around klezmer music": "Vários projetos em torno da música klezmer",
};

const lessonPt = {
  Clarinet: "Clarinete",
  Saxophone: "Saxofone",
  Flute: "Flauta",
  "Klezmer Style": "Estilo Klezmer",
  Improvisation: "Improvisação",
  Musicality: "Musicalidade",
  Repertoire: "Repertório",
  Technique: "Técnica",
  "Performance Coaching": "Preparação para Performance",
};

const projectPt = {
  "Klezmer Tres Rios": "Música klezmer tradicional e contemporânea com influência brasileira, improvisação e colaboração internacional.",
  "Klezmer Kabaret": "Uma exploração teatral e energética da música judaica, narrativa, humor e performance.",
  "SP Klezmer All Stars": "Ensemble klezmer de alto nível para concertos, festivais e eventos culturais.",
  "Orquestra Shoshana": "Ensemble elegante de música judaica e música do mundo para celebrações, concertos e eventos.",
  "Bloco Klezmer do Bom Retiro": "O desfile oficial de Klezmer Carnaval de São Paulo e um coletivo ativo durante o ano todo com tradição ídiche.",
  "Honigsberg Archives": "Arquivo cultural de Rosa Porozovska e Ernest Honigsberg, preservando composições e arranjos ídiches originais sob direção musical de Alex.",
  Marmelada: "Projeto musical experimental e criativo que explora mundos sonoros interculturais.",
  KlezMagica: "Uma aventura de palco com magicos e musicos klezmer, misturando musica ao vivo, encantamento e imaginacao teatral.",
  "Alex Parke NYC Kapelye": "Projeto klezmer de Nova York que interpreta repertório Titunshnayder, material do arquivo Honigsberg e composições klezmer contemporâneas originais.",
};

function tr() {
  return i18n[currentLang];
}

function button(label, href, primary = false) {
  return `<a class="btn ${primary ? "primary" : ""} focus-ring" href="${href}">${label} <span aria-hidden="true">-&gt;</span></a>`;
}

function label(text) {
  return `<p class="section-label">${text}</p>`;
}

function projectCard(project) {
  const cssImage = project.image.startsWith("assets/") ? `../${project.image}` : project.image;
  const description = currentLang === "pt" ? projectPt[project.title] || project.description : project.description;
  const fitClass = project.imageFit === "contain" ? " fit-contain" : "";
  return `
    <article class="card project reveal">
      <div class="project-img${fitClass}" style="--project-image: url('${cssImage}')" aria-hidden="true"></div>
      <div class="project-body">
        <p class="tag">${project.tag}</p>
        <h3>${project.title}</h3>
        <p>${description}</p>
      </div>
    </article>`;
}

function galleryCard(image, index) {
  return `
    <figure class="gallery-card reveal ${index === 3 ? "wide" : ""}">
      <img src="${image.src}" alt="${image.title}" loading="lazy">
    </figure>`;
}

function languageToggle() {
  return `
    <div class="lang-toggle" aria-label="Language">
      <button class="focus-ring ${currentLang === "en" ? "active" : ""}" type="button" data-lang="en">EN</button>
      <button class="focus-ring ${currentLang === "pt" ? "active" : ""}" type="button" data-lang="pt">PT</button>
    </div>`;
}

function localizedPathways() {
  if (currentLang === "en") return pathways;
  return pathways.map((item) => {
    const translated = pathwayPt[item.title];
    return translated ? { title: translated[0], copy: translated[1] } : item;
  });
}

function render() {
  const t = tr();
  const rotateText = t.rotating[line % t.rotating.length];
  document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";
  document.title = currentLang === "pt"
    ? "Alex Parke | Clarinetista, Etnomusicólogo & Artista"
    : "Alex Parke | Clarinetist, Ethnomusicologist & Performer";

  root.innerHTML = `
    <header class="site-header">
      <nav class="nav" aria-label="Main navigation">
        <a class="brand focus-ring" href="#home">
          <span class="mark">AP</span>
          <span><strong>Alex Parke</strong><span>${t.brandSub}</span></span>
        </a>
        <div class="nav-links">
          ${navItems.slice(1).map(([name, id]) => `<a class="focus-ring" href="#${id}">${t.nav[name]}</a>`).join("")}
        </div>
        ${languageToggle()}
        <a class="book-mini focus-ring" href="#contact" data-interest="Book a performance">${t.book}</a>
        <button class="menu-btn focus-ring" type="button" aria-label="Open menu" aria-expanded="false">${t.menu}</button>
      </nav>
      <div class="mobile-menu">
        ${languageToggle()}
        ${navItems.map(([name, id]) => `<a href="#${id}">${t.nav[name]}</a>`).join("")}
      </div>
    </header>

    <main>
      <section id="home" class="hero">
        <div class="hero-inner">
          <div class="reveal visible">
            <p class="kicker">Sao Paulo / New York</p>
            <h1>Alex Parke</h1>
            <p class="subtitle">${t.heroSubtitle}</p>
            <p class="rotating" aria-live="polite">${rotateText}</p>
            <div class="cta-row">
              ${button(t.ctaBook, "#bookings", true)}
              ${button(t.ctaLessons, "#lessons")}
              ${button(t.ctaProjects, "#projects")}
            </div>
          </div>
          <aside class="impact reveal visible">
            <p>${t.impact}</p>
          </aside>
        </div>
      </section>

      <section id="about" class="band">
        <div class="section-inner two-col">
          <div class="portrait reveal">
            <div class="portrait-copy">
              <p class="kicker">${t.portraitLabel}</p>
              <p>${t.portraitCopy}</p>
            </div>
          </div>
          <div class="reveal">
            ${label(t.aboutLabel)}
            <h2>${t.aboutTitle}</h2>
            <p class="lead">${t.about1}</p>
            <p class="body-copy">${t.about2}</p>
            <p class="body-copy">${t.about3}</p>
            <div class="cred-row"><span class="pill">Bard College</span><span class="pill">NYC Klezmer Scene</span><span class="pill">Sao Paulo</span><span class="pill">${currentLang === "pt" ? "Solista com Orquestras" : "Orchestral Soloist"}</span><span class="pill">${currentLang === "pt" ? "Compositor" : "Composer"}</span></div>
          </div>
        </div>
      </section>

      <section class="band alt">
        <div class="section-inner">
          ${label(t.whatLabel)}
          <div class="grid-4">
            ${localizedPathways().map((item, i) => `<article class="card reveal"><span class="number">0${i + 1}</span><h3>${item.title}</h3><p>${item.copy}</p></article>`).join("")}
          </div>
        </div>
      </section>

      <section id="projects" class="band">
        <div class="section-inner">
          <div class="section-head reveal">
            ${label(t.projectsLabel)}
            <h2>${t.projectsTitle}</h2>
            <p class="lead">${t.projectsLead}</p>
          </div>
          <div class="grid-3">${projects.map(projectCard).join("")}</div>
        </div>
      </section>

      <section id="lessons" class="band alt">
        <div class="section-inner two-col">
          <div class="reveal">
            ${label(t.teachingLabel)}
            <h2>${t.lessonsTitle}</h2>
            <p class="lead">${t.lessonsLead}</p>
            <div class="language-row">${t.languages.map((item) => `<span class="pill">${item}</span>`).join("")}</div>
            <p class="body-copy">${t.lessonsPlace}</p>
            <div class="cta-row"><a class="btn primary focus-ring" href="#contact" data-interest="Lessons">${t.trial} <span aria-hidden="true">-&gt;</span></a>${button(t.whatsapp, "https://wa.me/19172886450", false)}</div>
          </div>
          <div class="lesson-grid">
            ${lessonTopics.map((topic) => `<div class="lesson-chip reveal"><strong>${currentLang === "pt" ? lessonPt[topic] || topic : topic}</strong></div>`).join("")}
            <blockquote class="testimonial reveal">
              <span class="icon">"</span>
              <p>${t.quote}</p>
              ${t.quoteBy ? `<footer>${t.quoteBy}</footer>` : ""}
            </blockquote>
          </div>
        </div>
      </section>

      <section id="bookings" class="band">
        <div class="section-inner two-col">
          <div class="reveal">
            ${label(t.bookingsLabel)}
            <h2>${t.bookingsTitle}</h2>
            <p class="lead">${t.bookingsLead}</p>
            <div class="cta-row"><a class="btn primary focus-ring" href="#contact" data-interest="Book a performance">${t.bookingInquiry} <span aria-hidden="true">-&gt;</span></a></div>
          </div>
          <div>
            <div class="booking-grid">${bookingCategories.map((cat) => `<div class="booking reveal"><strong>${currentLang === "pt" ? bookingPt[cat] || cat : cat}</strong></div>`).join("")}</div>
            <div class="format-list reveal">${eventFormats.map((item) => `<span>${currentLang === "pt" ? eventPt[item] || item : item}</span>`).join("")}</div>
          </div>
        </div>
      </section>

      <section id="media" class="band alt">
        <div class="section-inner">
          ${label(t.mediaLabel)}
          <div class="section-head reveal">
            <h2>${t.mediaTitle}</h2>
            <p class="lead">${t.mediaLead}</p>
          </div>
          <div class="recording-grid">
            ${recordings.map((item) => `<a class="recording-card reveal focus-ring" href="${item.url}" target="_blank" rel="noreferrer"><p class="tag">${item.platform}</p><h3>${item.title}</h3><p>${item.description}</p><span>${currentLang === "pt" ? "Ouvir / ver -&gt;" : "Listen / view -&gt;"}</span></a>`).join("")}
          </div>
          <div class="gallery-grid">
            ${galleryImages.map(galleryCard).join("")}
          </div>
        </div>
      </section>

      <section id="support" class="band">
        <div class="section-inner two-col">
          <div class="reveal">
            ${label(t.supportLabel)}
            <h2>${t.supportTitle}</h2>
            <p class="lead">${t.supportLead}</p>
            <p class="body-copy">${t.supportBody}</p>
            <div class="cta-row">${button(t.supportCta, "./support.html", true)}</div>
          </div>
          <div class="support-list reveal">
            ${supportGoals.map((goal) => `<div><span></span><p>${currentLang === "pt" ? supportPt[goal] || goal : goal}</p></div>`).join("")}
          </div>
        </div>
      </section>

      <section id="contact" class="band">
        <div class="section-inner two-col">
          <div class="reveal">
            ${label(t.contactLabel)}
            <h2>${t.contactTitle}</h2>
            <p class="lead">${t.contactLead}</p>
            <div class="contact-methods">
              <a class="contact-method focus-ring" href="mailto:alexborgerparke@gmail.com">
                <span>Email</span>
                <strong>alexborgerparke@gmail.com</strong>
              </a>
              <a class="contact-method focus-ring" href="tel:+19172886450">
                <span>${currentLang === "pt" ? "Celular / WhatsApp" : "Phone / WhatsApp"}</span>
                <strong>+1 917-288-6450</strong>
              </a>
            </div>
            <div class="social-row">${socialLinks.map(([name, url]) => `<a class="pill" href="${url}" ${url.startsWith("#") ? "" : 'target="_blank" rel="noreferrer"'}>${name}</a>`).join("")}</div>
          </div>
          <form class="contact-form reveal" id="contact-form" action="https://formsubmit.co/ajax/alexborgerparke@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="New website inquiry for Alex Parke">
            <input type="hidden" name="_captcha" value="false">
            <input type="text" name="_honey" class="hidden-field" tabindex="-1" autocomplete="off">
            <label>${t.formName}<input required name="name" type="text" placeholder="${t.namePlaceholder}"></label>
            <label>${t.formEmail}<input required name="email" type="email" placeholder="${t.emailPlaceholder}"></label>
            <label>${t.formInterest}
              <select name="interest" required>
                <option value="">${t.formChoose}</option>
                <option value="Book a performance">${t.formPerformance}</option>
                <option value="Lessons">${t.formLessons}</option>
              </select>
            </label>
            <label>${t.formSubject}<input name="subject" type="text" placeholder="${t.subjectPlaceholder}"></label>
            <label>${t.formMessage}<textarea required name="message" rows="5" placeholder="${t.messagePlaceholder}"></textarea></label>
            <button class="btn primary focus-ring" type="submit">${t.formSend} <span aria-hidden="true">-&gt;</span></button>
            <p class="form-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </section>
    </main>

    <footer class="footer"><div class="footer-inner"><p>${t.footer}</p><p>Sao Paulo / New York</p></div></footer>
  `;

  wireInteractions();
}

function wireInteractions() {
  document.querySelectorAll("[data-lang]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => {
      currentLang = buttonEl.dataset.lang;
      localStorage.setItem("alex-parke-lang", currentLang);
      line = 0;
      render();
    });
  });

  const menuButton = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuButton.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuButton.textContent = open ? tr().close : tr().menu;
    menuButton.setAttribute("aria-expanded", String(open));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuButton.textContent = tr().menu;
    menuButton.setAttribute("aria-expanded", "false");
  }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  document.querySelectorAll("[data-interest]").forEach((link) => {
    link.addEventListener("click", () => {
      window.setTimeout(() => {
        const select = document.querySelector("select[name='interest']");
        if (select) select.value = link.dataset.interest;
      }, 80);
    });
  });

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = contactForm.querySelector(".form-status");
      const submit = contactForm.querySelector("button[type='submit']");
      const data = new FormData(contactForm);

      status.textContent = tr().formSending;
      submit.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Form submission failed");
        contactForm.reset();
        status.textContent = tr().formSuccess;
      } catch (error) {
        status.textContent = tr().formError;
        const subject = encodeURIComponent(data.get("subject") || data.get("interest") || "Website inquiry");
        const body = encodeURIComponent(
          `Name: ${data.get("name") || ""}\nEmail: ${data.get("email") || ""}\nInterest: ${data.get("interest") || ""}\n\n${data.get("message") || ""}`
        );
        window.location.href = `mailto:alexborgerparke@gmail.com?subject=${subject}&body=${body}`;
      } finally {
        submit.disabled = false;
      }
    });
  }
}

function startRotation() {
  window.clearInterval(rotationTimer);
  rotationTimer = window.setInterval(() => {
    line = (line + 1) % tr().rotating.length;
    const target = document.querySelector(".rotating");
    if (!target) return;
    target.style.opacity = "0";
    target.style.transform = "translateY(10px)";
    window.setTimeout(() => {
      target.textContent = tr().rotating[line];
      target.style.transition = ".45s ease";
      target.style.opacity = "1";
      target.style.transform = "translateY(0)";
    }, 190);
  }, 3400);
}

render();
startRotation();
