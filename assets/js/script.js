/**
 * Institute of Accountancy Arusha (IAA) - Single Page Application Script
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. HERO SLIDER
     ========================================================================== */
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.arrow-left');
  const nextBtn = document.querySelector('.arrow-right');
  let currentSlide = 0;
  let slideInterval = null;
  const slideCount = slides.length;

  function updateSlide(index) {
    if (index >= slideCount) currentSlide = 0;
    else if (index < 0) currentSlide = slideCount - 1;
    else currentSlide = index;

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === currentSlide);
    });
  }

  function nextSlide() {
    updateSlide(currentSlide + 1);
  }

  function prevSlide() {
    updateSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (nextBtn && prevBtn && slider) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });

    slider.parentElement.addEventListener('mouseenter', stopAutoPlay);
    slider.parentElement.addEventListener('mouseleave', startAutoPlay);

    // Initial setup
    updateSlide(0);
    startAutoPlay();
  }

  /* ==========================================================================
     2. MEGA MENU / NAVIGATION DRAWER
     ========================================================================== */
  const menuTrigger = document.getElementById('iaa-menu');
  const megaMenu = document.getElementById('iaa-mega-menu');
  const megaMenuClose = document.getElementById('megaMenuClose');

  function openMegaMenu() {
    if (megaMenu) {
      megaMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMegaMenu() {
    if (megaMenu) {
      megaMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (menuTrigger) {
    menuTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openMegaMenu();
    });
  }

  if (megaMenuClose) {
    megaMenuClose.addEventListener('click', closeMegaMenu);
  }

  if (megaMenu) {
    megaMenu.addEventListener('click', (e) => {
      if (e.target === megaMenu) closeMegaMenu();
    });
  }

  /* ==========================================================================
     3. PROGRAMMES DATASET & LIVE SEARCH
     ========================================================================== */
  const programmesDataset = [
    // Bachelor Degrees
    { title: "Bachelor of Science in Computer Science (BSc CS)", category: "Bachelor Degree", campus: "Arusha, Dar es Salaam", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Science in Information Technology (BSc IT)", category: "Bachelor Degree", campus: "Arusha, Babati", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Science in Cyber Security and Digital Forensics", category: "Bachelor Degree", campus: "Arusha", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Science in Software Engineering (BSc SE)", category: "Bachelor Degree", campus: "Arusha", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Accountancy (BA)", category: "Bachelor Degree", campus: "All Campuses", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Finance and Banking (BFB)", category: "Bachelor Degree", campus: "Arusha, Dar es Salaam", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Procurement and Supply Chain Management (BPSCM)", category: "Bachelor Degree", campus: "Arusha, Dodoma", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Business Administration (BBA)", category: "Bachelor Degree", campus: "Arusha, Songea", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Science in Economics and Finance", category: "Bachelor Degree", campus: "Arusha", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Human Resource Management (BHRM)", category: "Bachelor Degree", campus: "Arusha, Babati", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Science in Tourism and Hospitality Management", category: "Bachelor Degree", campus: "Arusha", url: "https://iaa.ac.tz/programmes" },
    { title: "Bachelor of Science in Tax Management (BSTM)", category: "Bachelor Degree", campus: "Arusha, Dar es Salaam", url: "https://iaa.ac.tz/programmes" },

    // Masters Degrees
    { title: "Master of Science in Information Security", category: "Master Degree", campus: "Arusha, Dar es Salaam", url: "https://iaa.ac.tz/master-programmes" },
    { title: "Master of Science in Data Science and Analytics", category: "Master Degree", campus: "Arusha", url: "https://iaa.ac.tz/master-programmes" },
    { title: "Master of Science in Finance and Investment (MSFI)", category: "Master Degree", campus: "Arusha, Dar es Salaam", url: "https://iaa.ac.tz/master-programmes" },
    { title: "Master of Business Administration (MBA - Corporate Management)", category: "Master Degree", campus: "All Campuses", url: "https://iaa.ac.tz/master-programmes" },
    { title: "Master of Science in Procurement and Supply Management", category: "Master Degree", campus: "Arusha, Dodoma", url: "https://iaa.ac.tz/master-programmes" },
    { title: "Master of Science in Accounting and Finance (MSAF)", category: "Master Degree", campus: "Arusha, Dar es Salaam", url: "https://iaa.ac.tz/master-programmes" },

    // Ordinary Diploma
    { title: "Ordinary Diploma in Computer Science", category: "Diploma", campus: "Arusha, Babati", url: "https://iaa.ac.tz/diploma-programmes" },
    { title: "Ordinary Diploma in Information Technology", category: "Diploma", campus: "All Campuses", url: "https://iaa.ac.tz/diploma-programmes" },
    { title: "Ordinary Diploma in Accountancy", category: "Diploma", campus: "All Campuses", url: "https://iaa.ac.tz/diploma-programmes" },
    { title: "Ordinary Diploma in Banking and Finance", category: "Diploma", campus: "Arusha, Dar es Salaam", url: "https://iaa.ac.tz/diploma-programmes" },
    { title: "Ordinary Diploma in Procurement and Logistics Management", category: "Diploma", campus: "Arusha, Dodoma", url: "https://iaa.ac.tz/diploma-programmes" },

    // Basic Technician Certificates
    { title: "Basic Technician Certificate in Computing and Information Technology", category: "Certificate", campus: "All Campuses", url: "https://iaa.ac.tz/certificate-programmes" },
    { title: "Basic Technician Certificate in Accountancy", category: "Certificate", campus: "All Campuses", url: "https://iaa.ac.tz/certificate-programmes" },
    { title: "Basic Technician Certificate in Business Administration", category: "Certificate", campus: "All Campuses", url: "https://iaa.ac.tz/certificate-programmes" }
  ];

  const searchInput = document.getElementById('homeProgrammeSearchInput');
  const clearBtn = document.getElementById('homeProgrammeSearchClear');
  const suggestionsBox = document.getElementById('programmeSuggestions');
  const searchWrapper = document.getElementById('programmeLiveSearch');
  let selectedSuggestionIndex = -1;

  function filterProgrammes(query) {
    if (!query || query.trim().length < 2) {
      suggestionsBox.classList.remove('is-open');
      suggestionsBox.innerHTML = '';
      selectedSuggestionIndex = -1;
      return;
    }

    const cleanQuery = query.toLowerCase().trim();
    const matches = programmesDataset.filter(item => 
      item.title.toLowerCase().includes(cleanQuery) ||
      item.category.toLowerCase().includes(cleanQuery) ||
      item.campus.toLowerCase().includes(cleanQuery)
    );

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `
        <div class="suggestion-empty">
          <i class="fa fa-info-circle" style="margin-bottom: 6px; font-size: 1.4rem; color: var(--secondary);"></i>
          <p>No programmes found matching "<strong>${escapeHtml(query)}</strong>"</p>
          <small>Try searching for "Computer", "Accountancy", "Finance", or "Diploma"</small>
        </div>`;
      suggestionsBox.classList.add('is-open');
      return;
    }

    // Group matches by category
    const grouped = {};
    matches.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    let html = '';
    for (const [category, items] of Object.entries(grouped)) {
      html += `<div class="suggestion-category">${escapeHtml(category)} (${items.length})</div>`;
      items.forEach(p => {
        html += `
          <a href="${p.url}" target="_blank" rel="noopener" class="suggestion-item">
            <span><strong>${escapeHtml(p.title)}</strong><br><small style="color: #64748B;"><i class="fa fa-map-marker"></i> ${escapeHtml(p.campus)}</small></span>
            <span class="suggestion-badge">${escapeHtml(p.category)}</span>
          </a>
        `;
      });
    }

    suggestionsBox.innerHTML = html;
    suggestionsBox.classList.add('is-open');
    selectedSuggestionIndex = -1;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (searchInput && suggestionsBox) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (clearBtn) clearBtn.style.display = val.length > 0 ? 'block' : 'none';
      filterProgrammes(val);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        suggestionsBox.classList.remove('is-open');
        searchInput.focus();
      });
    }

    // Keyboard navigation in suggestions
    searchInput.addEventListener('keydown', (e) => {
      const items = suggestionsBox.querySelectorAll('.suggestion-item');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedSuggestionIndex = (selectedSuggestionIndex + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedSuggestionIndex = (selectedSuggestionIndex - 1 + items.length) % items.length;
      } else if (e.key === 'Enter') {
        if (selectedSuggestionIndex > -1 && items[selectedSuggestionIndex]) {
          e.preventDefault();
          window.open(items[selectedSuggestionIndex].href, '_blank');
        }
        return;
      } else if (e.key === 'Escape') {
        suggestionsBox.classList.remove('is-open');
        return;
      } else {
        return;
      }

      items.forEach((item, idx) => {
        item.classList.toggle('is-active', idx === selectedSuggestionIndex);
        if (idx === selectedSuggestionIndex) {
          item.scrollIntoView({ block: 'nearest' });
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (searchWrapper && !searchWrapper.contains(e.target)) {
        suggestionsBox.classList.remove('is-open');
      }
    });

    // Quick tag clicks
    document.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const query = tag.getAttribute('data-query');
        searchInput.value = query;
        if (clearBtn) clearBtn.style.display = 'block';
        filterProgrammes(query);
        searchInput.focus();
      });
    });
  }

  /* ==========================================================================
     4. HEADER SEARCH BUTTON TRIGGER
     ========================================================================== */
  const headerSearchBtn = document.querySelector('.header_search_btn');
  if (headerSearchBtn && searchInput) {
    headerSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => searchInput.focus(), 500);
    });
  }

  // Keyboard shortcut Ctrl+K or / to search
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
      e.preventDefault();
      if (searchInput) {
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        searchInput.focus();
      }
    }
    if (e.key === 'Escape') {
      closeMegaMenu();
      closeNewsModal();
    }
  });

  /* ==========================================================================
     5. NEWS PREVIEW MODAL
     ========================================================================== */
  const newsStories = {
    '1': {
      title: "IAA YANG'ARA C-CEOs FORUM 2026, YATWAA TUZO YA UFANISI KATIKA USIMAMIZI WA FEDHA",
      date: "28 September 2026",
      image: "assets/images/news1.jpg",
      text: [
        "Taasisi ya Uhasibu Arusha (IAA) imeng'ara katika kongamano kubwa la Wakurugenzi Wakuu (C-CEOs Forum 2026) lililofanyika jijini Dar es Salaam kwa kutwaa tuzo ya heshima ya ufanisi wa juu katika usimamizi na uwajibikaji wa fedha za umma.",
        "Akipokea tuzo hiyo kwa niaba ya taasisi, Mkuu wa Chuo aliwashukuru watumishi wote na bodi ya uongozi kwa ushirikiano dhabiti unaoendelea kuweka viwango vya juu vya weledi na uadilifu katika sekta ya elimu ya juu nchini.",
        "Tuzo hii inathibitisha dhamira ya IAA ya kuendelea kutoa wahitimu wenye umahiri na uaminifu unaokidhi mahitaji ya soko la ndani na kimataifa."
      ]
    },
    '2': {
      title: "WADAU WAHIMIZWA MATUMIZI SAHIHI YA AI KATIKA SEKTA YA UTALII",
      date: "25 September 2026",
      image: "assets/images/news2.png",
      text: [
        "Katika warsha ya kitaaluma iliyoandaliwa na Kitivo cha Usimamizi wa Biashara na Teknolojia cha IAA, wadau mbalimbali wa sekta ya utalii wamehimizwa kuchangamkia matumizi ya Akili Mnemba (Artificial Intelligence - AI) ili kuongeza ufanisi wa huduma na ushindani wa kimataifa.",
        "Wataalamu walisisitiza jinsi teknolojia za kisasa zinavyoweza kusaidia katika ubashiri wa mwenendo wa watalii, usimamizi wa rasilimali, na uboreshaji wa uzoefu wa wateja katika maeneo ya kitalii kote nchini.",
        "IAA inaendelea kuongoza katika kuingiza mafunzo ya teknolojia na AI kwenye mitaala yake ya shahada na stashahada ili kuandaa wataalamu walio tayari kwa mapinduzi ya nne ya viwanda."
      ]
    },
    '3': {
      title: "MKUU WA CHUO IAA AFAFANUA MKAKATI WA KUKUZA WATAALAM SEKTA YA UTALII",
      date: "25 September 2026",
      image: "assets/images/news3.png",
      text: [
        "Mkuu wa Chuo cha Uhasibu Arusha (IAA) amefafanua mkakati kabambe wa taasisi hiyo katika kuwajengea uwezo na kuwaandaa wataalamu mahiri watakaohudumu katika sekta ya utalii na ukarimu.",
        "Alibainisha kuwa kupitia mradi wa HEET na ushirikiano na wadau wa kimataifa, IAA inaendelea kuboresha miundombinu ya mafunzo kwa vitendo ikiwemo maabara za kisasa na mifumo ya mafunzo ya mtandaoni.",
        "Mkakati huo pia unajumuisha kuimarisha ushirikiano na makampuni ya utalii ili kuhakikisha wanafunzi wanapata mafunzo kwa vitendo (internships) na fursa za ajira mara tu baada ya kuhitimu masomo yao."
      ]
    }
  };

  const newsModalBackdrop = document.getElementById('newsModalBackdrop');
  const newsModalTitle = document.getElementById('newsModalTitle');
  const newsModalDate = document.getElementById('newsModalDate');
  const newsModalImage = document.getElementById('newsModalImage');
  const newsModalText = document.getElementById('newsModalText');
  const newsModalClose = document.getElementById('newsModalClose');

  function openNewsModal(newsId) {
    const story = newsStories[newsId];
    if (!story || !newsModalBackdrop) return;

    newsModalTitle.textContent = story.title;
    newsModalDate.innerHTML = `<i class="fa fa-calendar"></i> ${story.date}`;
    newsModalImage.src = story.image;
    newsModalImage.alt = story.title;
    newsModalText.innerHTML = story.text.map(p => `<p>${escapeHtml(p)}</p>`).join('');

    newsModalBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeNewsModal() {
    if (newsModalBackdrop) {
      newsModalBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.news-read-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const newsId = btn.getAttribute('data-news-id');
      openNewsModal(newsId);
    });
  });

  if (newsModalClose) {
    newsModalClose.addEventListener('click', closeNewsModal);
  }

  if (newsModalBackdrop) {
    newsModalBackdrop.addEventListener('click', (e) => {
      if (e.target === newsModalBackdrop) closeNewsModal();
    });
  }

  /* ==========================================================================
     6. SCROLL TO TOP & STICKY NAVBAR SHADOW
     ========================================================================== */
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const headerNavbar = document.querySelector('.header-navbar');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollToTopBtn) {
      if (scrollY > 350) {
        scrollToTopBtn.classList.add('is-visible');
      } else {
        scrollToTopBtn.classList.remove('is-visible');
      }
    }

    if (headerNavbar) {
      if (scrollY > 40) {
        headerNavbar.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.12)';
      } else {
        headerNavbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     7. PARTNERS CAROUSEL DUPLICATION FOR SMOOTH INFINITE MARQUEE
     ========================================================================== */
  const partnersTrack = document.getElementById('partnersTrack');
  if (partnersTrack) {
    // Clone children to ensure seamless continuous loop
    const clone = partnersTrack.innerHTML;
    partnersTrack.innerHTML += clone;
  }

});
