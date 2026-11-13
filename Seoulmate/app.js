// 서울메이트 (Seoulmate) - 실제 에이블리(A-bly) 100% 이식 모바일 웹 엔진 (v3)
// - 인터랙티브 히어로 배너 슬라이더 (좌우 넘기기, 카운터, 자동 롤링)
// - 세부 페이지/모달 포함 100% 전역 영어(EN)/루마니아어(RO) 번역
// - 전역 뒤로가기(Back) 내비게이션 지원
// - 가로 스크롤 잘림 없는 슬라이더 (서브탭 & 퀵 카테고리)
// - 실시간 검색 및 토스트 피드백

document.addEventListener("DOMContentLoaded", () => {
  const data = window.SEOULMATE_DATA;
  const i18n = window.SEOULMATE_I18N;

  // 인라인 SVG 벡터 아이콘
  const ICONS = {
    back: `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`,
    search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    bag: `<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    heart: `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    home: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    feed: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    sparkle: `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    shop: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    user: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    shield: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    droplet: `<svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    flask: `<svg viewBox="0 0 24 24"><path d="M9 3h6"/><path d="M10 9l-6 10a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L14 9V3h-4v6z"/></svg>`,
    sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`
  };

  // 애플리케이션 상태
  const state = {
    lang: "ro", // 'ro' | 'en'
    activeTab: "home", // 'home' | 'creators' | 'diagnostic' | 'shop' | 'auth' | 'profile'
    homeSubTab: "today",
    viewMode: "mobile-frame",
    historyStack: ["home"], // 뒤로가기 스택
    
    // 배너 슬라이더
    currentSlide: 0,
    totalSlides: data.heroSlides.length,
    slideInterval: null,

    // 검색어
    searchQuery: "",

    // 회원가입 전용 상태
    authRole: "consumer",
    authSubmitted: false,
    currentUser: {
      isLoggedIn: true,
      name: "Elena Popescu",
      email: "elena.popescu@gmail.com",
      city: "București"
    },

    // 퀴즈 상태
    quizStep: 1,
    quizStatus: "idle",
    quizAnswers: {
      type: "Mixt",
      concern: "Pori",
      undertone: "Rece",
      style: "Natural",
      experience: "Intermediate",
      budget: "Mid"
    },
    matchedCreators: [],

    // 쇼핑 및 장바구니
    selectedCategory: "all",
    cart: [],
    wishlist: new Set(["anua-toner-77", "skin1004-centella-ampoule"]),
    followedCreators: new Set(["mariazvinca"]),
    
    // 물류/결제
    selectedLocker: data.easyboxLockers[0],
    paymentMethod: "ramburs",
    lastOrder: null,

    // 모달 및 토스트
    activeModal: null,
    selectedProduct: null,
    toastMessage: null,
    toastTimer: null
  };

  function t(key) {
    const dict = i18n[state.lang] || i18n.ro;
    return dict[key] !== undefined ? dict[key] : key;
  }

  // 토스트 메시지 함수
  function showToast(msg) {
    if (state.toastTimer) clearTimeout(state.toastTimer);
    state.toastMessage = msg;
    state.toastTimer = setTimeout(() => {
      state.toastMessage = null;
      const el = document.querySelector(".ably-toast");
      if (el) el.remove();
    }, 2200);
  }

  // 네비게이션 & 뒤로가기
  function resetScroll() {
    window.scrollTo(0, 0);
    const mainArea = document.getElementById("main-scroll-area");
    if (mainArea) mainArea.scrollTop = 0;
  }

  function navigateTo(tab) {
    if (state.activeTab !== tab) {
      state.historyStack.push(tab);
      state.activeTab = tab;
      state.authSubmitted = false;
      render();
      resetScroll();
    }
  }

  function goBack() {
    if (state.activeModal) {
      state.activeModal = null;
      render();
      return;
    }
    if (state.historyStack.length > 1) {
      state.historyStack.pop();
      state.activeTab = state.historyStack[state.historyStack.length - 1];
    } else {
      state.activeTab = "home";
    }
    render();
    resetScroll();
  }

  // 슬라이더 이동
  function nextSlide() {
    state.currentSlide = (state.currentSlide + 1) % state.totalSlides;
    updateSliderDOM();
  }

  function prevSlide() {
    state.currentSlide = (state.currentSlide - 1 + state.totalSlides) % state.totalSlides;
    updateSliderDOM();
  }

  function updateSliderDOM() {
    const track = document.getElementById("hero-track");
    const counter = document.getElementById("hero-counter-num");
    if (track) {
      track.style.transform = `translateX(-${state.currentSlide * 100}%)`;
    }
    if (counter) {
      counter.innerText = `${state.currentSlide + 1} / ${state.totalSlides} >`;
    }
  }

  // 매칭 알고리즘
  function calculateMatching() {
    const answers = state.quizAnswers;
    const scored = data.creators.map(c => {
      let score = 0;
      if (c.skinProfile.type === answers.type) score += 35;
      else if (answers.type === "Mixt") score += 24;
      else score += 10;

      if (c.skinProfile.concerns.includes(answers.concern)) score += 30;
      else score += 12;

      if (c.skinProfile.undertone === answers.undertone) score += 20;
      else score += 10;

      if (c.skinProfile.style === answers.style) score += 15;
      else score += 8;

      return {
        ...c,
        matchScore: Math.min(98, Math.max(74, score))
      };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    state.matchedCreators = scored;
    return scored;
  }

  calculateMatching();

  // 자동 배너 슬라이딩 (4초 간격)
  function startAutoSlide() {
    if (state.slideInterval) clearInterval(state.slideInterval);
    state.slideInterval = setInterval(() => {
      if (state.activeTab === "home") {
        nextSlide();
      }
    }, 4500);
  }

  startAutoSlide();

  const appContainer = document.getElementById("app-root");

  function render() {
    const isHome = state.activeTab === "home";
    const currentTabTitle = {
      creators: t("tabCreators"),
      diagnostic: t("tabDiagnostic"),
      shop: t("tabShop"),
      auth: t("tabAuth"),
      profile: t("tabProfile")
    }[state.activeTab] || "";

    appContainer.innerHTML = `
      <div class="seoulmate-wrapper ${state.viewMode === 'mobile-frame' ? 'mobile-mode' : 'desktop-mode'}">
        <!-- 토스트 알림 메시지 -->
        ${state.toastMessage ? `<div class="ably-toast">${state.toastMessage}</div>` : ''}

        <!-- 상단 툴바 -->
        <header class="capstone-bar">
          <div class="capstone-bar-left">
            <span class="brand-sub">Seoulmate</span>
          </div>
          <div class="capstone-bar-right">
            <div class="lang-selector" title="언어 선택 / Language / Limbă">
              <button class="lang-pill ${state.lang === 'ro' ? 'active' : ''}" data-set-lang="ro">RO</button>
              <button class="lang-pill ${state.lang === 'en' ? 'active' : ''}" data-set-lang="en">EN</button>
              <button class="lang-pill ${state.lang === 'ko' ? 'active' : ''}" data-set-lang="ko">한국어</button>
            </div>
            <button id="btn-toggle-view" class="capstone-btn view-toggle-btn" title="모바일/넓은 화면 전환">
              ${state.viewMode === 'mobile-frame' ? '넓게' : '모바일'}
            </button>
            <button id="btn-open-guide" class="capstone-btn highlight" title="심사위원 가이드">
              ${t("guideBtn")}
            </button>
          </div>
        </header>

        <!-- 에이블리 모바일 폰 뷰포트 -->
        <div class="phone-frame">
          <!-- 에이블리 헤더 (홈이 아닐 때는 뒤로가기 버튼 노출) -->
          <header class="ably-header">
            <div class="ably-header-top">
              <div class="ably-header-left">
                ${!isHome ? `
                  <button class="ably-back-btn" id="btn-global-back" title="${t("backBtn")}">
                    ${ICONS.back}
                    <span class="ably-page-title">${currentTabTitle}</span>
                  </button>
                ` : `
                  <div class="ably-logo" data-tab="home">
                    SEOULMATE<span class="logo-dot">.</span>
                  </div>
                `}
              </div>
              <div class="ably-header-actions">
                <button class="icon-btn" id="btn-nav-search" title="Caută">${ICONS.search}</button>
                <button class="icon-btn" id="btn-header-cart" title="Coș">
                  ${ICONS.bag}
                  ${state.cart.length > 0 ? `<span class="icon-badge">${state.cart.reduce((a, b) => a + b.qty, 0)}</span>` : ''}
                </button>
              </div>
            </div>

            <!-- 홈 탭일 때 노출되는 검색창 & 가로 스크롤 서브 탭 -->
            ${isHome ? `
              <div class="ably-search-bar">
                ${ICONS.search}
                <input type="text" id="main-search-input" placeholder="${t("searchPlaceholder")}" value="${state.searchQuery}" />
                ${state.searchQuery ? `<button class="btn-clear-search" id="btn-clear-search">✕</button>` : ''}
              </div>

              <!-- 가로 스크롤 서브 GNB (잘림 없이 부드러운 스크롤) -->
              <div class="ably-subnav-container">
                <nav class="ably-subnav" id="subnav-scroll">
                  <button class="subnav-tab ${state.homeSubTab === 'today' ? 'active' : ''}" data-subtab="today">${t("tabHome")}</button>
                  <button class="subnav-tab ${state.homeSubTab === 'best' ? 'active' : ''}" data-subtab="best">${t("trendingTitle")}</button>
                  <button class="subnav-tab" data-tab="creators">${t("tabCreators")}</button>
                  <button class="subnav-tab" data-tab="diagnostic">${t("tabDiagnostic")} ✨</button>
                  <button class="subnav-tab" id="btn-subnav-cert">100% CPNP</button>
                </nav>
              </div>
            ` : ''}

            <!-- 정품 및 easybox 신뢰 띠배너 -->
            <div class="ably-trust-strip" id="btn-show-trust">
              <div class="trust-strip-left">
                <span class="trust-badge-mini">CPNP</span>
                <span>${t("trustTicker")}</span>
              </div>
              <span class="trust-strip-arrow">›</span>
            </div>
          </header>

          <!-- 메인 스크롤 콘텐츠 영역 -->
          <main class="app-main-content" id="main-scroll-area">
            ${renderActiveTab()}
          </main>

          <!-- 하단 고정 5대 탭바 -->
          <nav class="app-bottom-nav">
            <button class="nav-item ${state.activeTab === 'home' ? 'active' : ''}" data-tab="home">
              ${ICONS.home}
              <span class="nav-label">${t("tabHome")}</span>
            </button>
            <button class="nav-item ${state.activeTab === 'creators' ? 'active' : ''}" data-tab="creators">
              ${ICONS.feed}
              <span class="nav-label">${t("tabCreators")}</span>
            </button>
            <button class="nav-item highlight ${state.activeTab === 'diagnostic' ? 'active' : ''}" data-tab="diagnostic">
              ${ICONS.sparkle}
              <span class="nav-label">${t("tabDiagnostic")}</span>
            </button>
            <button class="nav-item ${state.activeTab === 'shop' ? 'active' : ''}" data-tab="shop">
              ${ICONS.shop}
              <span class="nav-label">${t("tabShop")}</span>
            </button>
            <button class="nav-item ${(state.activeTab === 'auth' || state.activeTab === 'profile') ? 'active' : ''}" data-tab="${state.lastOrder ? 'profile' : 'auth'}">
              ${ICONS.user}
              <span class="nav-label">${state.lastOrder ? t("tabProfile") : t("tabAuth")}</span>
            </button>
          </nav>
        </div>

        <!-- 모달 컨테이너 -->
        <div id="modal-container">
          ${renderActiveModal()}
        </div>
      </div>
    `;

    attachEventListeners();
  }

  function renderActiveTab() {
    switch (state.activeTab) {
      case "home":
        return renderHomeTab();
      case "creators":
        return renderCreatorsTab();
      case "diagnostic":
        return renderDiagnosticTab();
      case "shop":
        return renderShopTab();
      case "auth":
        return renderAuthTab();
      case "profile":
        return renderProfileTab();
      default:
        return renderHomeTab();
    }
  }

  // [탭 1: Acasă]
  function renderHomeTab() {
    const topCreator = state.matchedCreators[0] || data.creators[0];
    const topRoutine = topCreator.routine;
    const routineTitle = state.lang === 'ko' ? (topRoutine.titleKo || topRoutine.titleEn) : (state.lang === 'en' ? topRoutine.titleEn : topRoutine.title);

    // 검색 필터링된 상품 목록
    const filteredProducts = state.searchQuery
      ? data.products.filter(p => 
          p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
      : data.products;

    return `
      <div class="ably-home-page">
        <!-- 1. 인터랙티브 히어로 롤링 배너 (좌우 버튼, 4개 슬라이드 전환) -->
        <section class="hero-slider-wrap" id="hero-slider-section">
          <div class="hero-slider-track" id="hero-track" style="transform: translateX(-${state.currentSlide * 100}%);">
            ${data.heroSlides.map((slide, idx) => {
              const tag = state.lang === 'ko' ? (slide.tagKo || slide.tagEn) : (state.lang === 'en' ? slide.tagEn : slide.tagRo);
              const headline = state.lang === 'ko' ? (slide.headlineKo || slide.headlineEn) : (state.lang === 'en' ? slide.headlineEn : slide.headlineRo);
              const subline = state.lang === 'ko' ? (slide.sublineKo || slide.sublineEn) : (state.lang === 'en' ? slide.sublineEn : slide.sublineRo);
              const cleanHeadline = headline.replace(/<br\s*\/?>/gi, ' ').replace(/'/g, "\\'");
              const cleanTag = tag.replace(/'/g, "\\'");
              return `
                <div class="hero-slide">
                  <img src="${slide.image}" alt="Slide ${idx + 1}" class="hero-slide-img" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getBanner('${cleanHeadline}','${cleanTag}')" />
                  <div class="hero-slide-overlay">
                    <span class="hero-tag">${tag}</span>
                    <h2 class="hero-headline">${headline}</h2>
                    <p class="hero-subline">${subline}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- 좌우 화살표 컨트롤 -->
          <button class="hero-arrow-btn prev" id="btn-hero-prev" title="Slide Anterior">${ICONS.chevronLeft}</button>
          <button class="hero-arrow-btn next" id="btn-hero-next" title="Slide Următor">${ICONS.chevronRight}</button>

          <!-- 클릭 시 다음 슬라이드로 넘어가는 1 / 4 카운터 -->
          <div class="hero-counter-badge" id="hero-counter-num" title="Click pentru următorul banner">
            ${state.currentSlide + 1} / ${state.totalSlides} >
          </div>
        </section>

        <!-- 2. 가로 스크롤 슬라이더 퀵 카테고리 (좌우 넘기기, 화살표 버튼, 마우스 드래그 & 휠) -->
        <section class="quick-slider-wrapper">
          <button class="quick-nav-arrow prev hidden" id="btn-quick-prev" aria-label="이전 카테고리">${ICONS.chevronLeft}</button>
          <div class="ably-quick-icons-slider" id="quick-icons-slider">
            <button class="quick-icon-btn" data-tab="diagnostic">
              <div class="quick-icon-circle featured">${ICONS.sparkle}</div>
              <span class="quick-icon-label">${t("quickDiagnostic")}</span>
            </button>
            <button class="quick-icon-btn" data-category="Toner & Tampoane">
              <div class="quick-icon-circle">${ICONS.droplet}</div>
              <span class="quick-icon-label">${t("quickToners")}</span>
            </button>
            <button class="quick-icon-btn" data-category="Serum & Fiole">
              <div class="quick-icon-circle">${ICONS.flask}</div>
              <span class="quick-icon-label">${t("quickSerums")}</span>
            </button>
            <button class="quick-icon-btn" data-category="Protecție Solară">
              <div class="quick-icon-circle">${ICONS.sun}</div>
              <span class="quick-icon-label">${t("quickSPF")}</span>
            </button>
            <button class="quick-icon-btn" data-category="Creme & Hidratare">
              <div class="quick-icon-circle">${ICONS.shield}</div>
              <span class="quick-icon-label">${t("quickCreams")}</span>
            </button>
            <button class="quick-icon-btn" data-category="Curățare">
              <div class="quick-icon-circle">${ICONS.droplet}</div>
              <span class="quick-icon-label">${t("quickCleanser")}</span>
            </button>
            <button class="quick-icon-btn" data-category="Machiaj">
              <div class="quick-icon-circle">${ICONS.sparkle}</div>
              <span class="quick-icon-label">${t("quickMakeup")}</span>
            </button>
            <button class="quick-icon-btn" data-category="Măști & Tampoane">
              <div class="quick-icon-circle">${ICONS.droplet}</div>
              <span class="quick-icon-label">${t("quickMask")}</span>
            </button>
            <button class="quick-icon-btn" data-tab="shop" data-subtab="best">
              <div class="quick-icon-circle">${ICONS.sparkle}</div>
              <span class="quick-icon-label">${t("quickBest")}</span>
            </button>
          </div>
          <button class="quick-nav-arrow next" id="btn-quick-next" aria-label="다음 카테고리">${ICONS.chevronRight}</button>
          <div class="slider-scroll-hint">
            <div class="scroll-track-mini" id="quick-scroll-track" title="좌우로 넘겨서 더 많은 카테고리 보기">
              <div class="scroll-thumb-mini" id="quick-scroll-thumb"></div>
            </div>
          </div>
        </section>

        <div class="section-divider"></div>

        <!-- 3. 나와 닮은 크리에이터 루틴 -->
        <section class="ably-section">
          <div class="ably-section-head">
            <div class="section-title-wrap">
              <h3>${t("spotlightTitle")}</h3>
              <p>${t("spotlightSub")}</p>
            </div>
            <button class="section-more-link" data-tab="creators">${t("seeAll")}</button>
          </div>

          <div class="creator-match-box">
            <div class="cm-header">
              <img src="${topCreator.avatar}" class="cm-avatar" alt="${topCreator.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getAvatar('${topCreator.name.replace(/'/g, "\\'")}','${topCreator.handle}')" />
              <div class="cm-info">
                <div class="cm-name-row">
                  <span class="cm-name">${topCreator.name}</span>
                  <span class="cm-badge">${topCreator.matchScore}% ${t("matchScoreSuffix")}</span>
                </div>
                <p class="cm-meta">${topCreator.handle} · ${topCreator.city}</p>
                <div class="cm-chips">
                  <span class="cm-chip">Ten ${topCreator.skinProfile.type}</span>
                  <span class="cm-chip">${topCreator.skinProfile.concerns.join(", ")}</span>
                  <span class="cm-chip">Subton ${topCreator.skinProfile.undertone}</span>
                </div>
              </div>
            </div>

            <!-- 루틴 3개 상품 번들 박스 -->
            <div class="routine-bundle-card">
              <div class="rb-title-row">
                <span class="rb-title">${routineTitle}</span>
                <div class="rb-pricing">
                  <span class="rb-discount">-${topRoutine.discountPercent}%</span>
                  <span class="rb-price">${topRoutine.bundlePrice} lei</span>
                  <span class="rb-original">${topRoutine.originalPrice} lei</span>
                </div>
              </div>

              <div class="rb-items-grid">
                ${topRoutine.productIds.map(pid => {
                  const p = data.products.find(item => item.id === pid);
                  const pName = state.lang === 'ko' ? (p.koreanName || p.name) : (state.lang === 'en' ? (p.englishName || p.name) : p.name);
                  return p ? `
                    <div class="rb-item-thumb" data-product-id="${p.id}">
                      <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${p.category}','${p.brand}','${p.name.replace(/'/g, "\\'")}')" />
                      <span class="rb-item-brand">${p.brand}</span>
                      <span class="rb-item-name">${pName}</span>
                    </div>
                  ` : '';
                }).join('')}
              </div>

              <button class="btn-bundle-order" data-creator-id="${topCreator.id}">
                ${t("buyBundleInstant")} (${topRoutine.bundlePrice} lei)
              </button>
            </div>
          </div>
        </section>

        <div class="section-divider"></div>

        <!-- 4. 정품 보증 신뢰 배너 -->
        <section class="ably-section">
          <div class="ably-trust-card">
            <div class="trust-head">
              ${ICONS.shield}
              <strong>${t("antiFakeTitle")}</strong>
            </div>
            <p class="trust-desc">${t("antiFakeDesc")}</p>
            <button class="btn-open-cert" id="btn-cert-modal">${t("verifyCertBtn")}</button>
          </div>
        </section>

        <div class="section-divider"></div>

        <!-- 5. 에이블리 2열 상품 그리드 (검색어 반영) -->
        <section class="ably-section" id="trending-section">
          <div class="ably-section-head">
            <div class="section-title-wrap">
              <h3>${t("trendingTitle")}</h3>
              <p>${t("trendingSub")}</p>
            </div>
            <button class="section-more-link" data-tab="shop">${state.lang === 'en' ? `All (${data.products.length})` : `Toate (${data.products.length})`} ›</button>
          </div>

          <div class="ably-product-grid">
            ${filteredProducts.slice(0, 8).map((prod, index) => renderProductCard(prod, index + 1)).join('')}
          </div>
        </section>
      </div>
    `;
  }

  // [탭 2: Creatori]
  function renderCreatorsTab() {
    return `
      <div class="feed-container">
        <div class="feed-partner-cta" id="banner-join-creator">
          <div class="fp-left">
            <strong>${t("becomeCreatorBannerTitle")}</strong>
            <p>${t("becomeCreatorBannerSub")}</p>
          </div>
          <button class="fp-btn">${t("becomeCreatorBannerBtn")}</button>
        </div>

        ${state.matchedCreators.map(creator => {
          const routine = creator.routine;
          const post = creator.feedPost;
          const caption = state.lang === 'ko' ? (post.captionEn || post.caption) : (state.lang === 'en' ? post.captionEn : post.caption);
          const routineTitle = state.lang === 'ko' ? (routine.titleKo || routine.titleEn) : (state.lang === 'en' ? routine.titleEn : routine.title);
          const isFollowed = state.followedCreators.has(creator.id);
          const followLabel = isFollowed 
            ? (state.lang === 'ko' ? '✓ 팔로잉' : (state.lang === 'en' ? '✓ Following' : '✓ Urmărit')) 
            : t("filterFollow");

          return `
            <article class="feed-card">
              <div class="feed-head">
                <div class="feed-author">
                  <img src="${creator.avatar}" class="feed-avatar" alt="${creator.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getAvatar('${creator.name.replace(/'/g, "\\'")}','${creator.handle}')" />
                  <div>
                    <h4 class="feed-author-name">${creator.name}</h4>
                    <span class="feed-author-city">${creator.handle} · ${creator.city} (${creator.followers})</span>
                  </div>
                </div>
                <button class="btn-open-cert" data-follow-id="${creator.id}">
                  ${followLabel}
                </button>
              </div>

              <div class="feed-media">
                <img src="${post.image}" alt="${creator.name} Look" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getFeed('${creator.name.replace(/'/g, "\\'")}','${creator.skinProfile.type}')" />
              </div>

              <div class="feed-body">
                <p class="feed-caption">${caption}</p>
                <div class="feed-tags">
                  ${post.tags.map(t => `<span class="feed-tag-item">#${t}</span>`).join(' ')}
                </div>

                <div class="routine-bundle-card">
                  <div class="rb-title-row">
                    <span class="rb-title">${routineTitle}</span>
                    <div class="rb-pricing">
                      <span class="rb-discount">-${routine.discountPercent}%</span>
                      <span class="rb-price">${routine.bundlePrice} lei</span>
                    </div>
                  </div>
                  <button class="btn-bundle-order" data-creator-id="${creator.id}">
                    ${t("buyRoutinePrice")} (${routine.bundlePrice} lei)
                  </button>
                </div>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;
  }

  // [탭 3: Diagnostic]
  function renderDiagnosticTab() {
    if (state.quizStatus === "analyzing") {
      return `
        <div class="quiz-container">
          <div class="quiz-analyzing-wrap">
            <div class="analyzing-ring"></div>
            <h3 style="font-size:16px; font-weight:800; margin-bottom:6px;">${t("analyzingTitle")}</h3>
            <p style="font-size:12px; color:#777;">${t("analyzingSub")}</p>
          </div>
        </div>
      `;
    }

    if (state.quizStatus === "completed") {
      const top3 = state.matchedCreators.slice(0, 3);
      return `
        <div class="quiz-container">
          <div style="background:#FAFAFB; border:1px solid #EEEEEE; border-radius:12px; padding:16px; margin-bottom:16px;">
            <span style="font-size:10px; font-weight:800; color:#FA3E4C;">${t("resultBadge")}</span>
            <h3 style="font-size:17px; font-weight:800; margin:4px 0 8px;">${t("resultTitle")}</h3>
            <div style="display:flex; flex-wrap:wrap; gap:4px;">
              <span class="cm-chip">Ten ${state.quizAnswers.type}</span>
              <span class="cm-chip">${state.quizAnswers.concern}</span>
              <span class="cm-chip">Subton ${state.quizAnswers.undertone}</span>
              <span class="cm-chip">${state.quizAnswers.style}</span>
            </div>
            <p style="font-size:11px; color:#666; margin-top:8px;">${t("resultDesc")}</p>
          </div>

          <h4 style="font-size:15px; font-weight:800; margin-bottom:12px;">${t("topCreatorsMatchTitle")}</h4>
          <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">
            ${top3.map((creator, i) => {
              const rTitle = state.lang === 'ko' ? (creator.routine.titleKo || creator.routine.titleEn) : (state.lang === 'en' ? creator.routine.titleEn : creator.routine.title);
              return `
                <div class="creator-match-box">
                  <div class="cm-header">
                    <img src="${creator.avatar}" class="cm-avatar" alt="${creator.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getAvatar('${creator.name.replace(/'/g, "\\'")}','${creator.handle}')" />
                    <div class="cm-info">
                      <div class="cm-name-row">
                        <span class="cm-name">#${i + 1} ${creator.name}</span>
                        <span class="cm-badge">${creator.matchScore}% ${t("matchScoreSuffix")}</span>
                      </div>
                      <p class="cm-meta">${creator.handle} · Set: ${rTitle}</p>
                      <button class="btn-bundle-order" data-creator-id="${creator.id}" style="margin-top:6px; padding:8px;">
                        ${t("btnBuyRoutine")} (${creator.routine.bundlePrice} lei)
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <button class="btn-quiz-back" id="btn-restart-quiz" style="width:100%;">${t("btnRestartQuiz")}</button>
        </div>
      `;
    }

    const currentQ = data.quizQuestions[state.quizStep - 1];
    const qTitle = state.lang === 'ko' ? (currentQ.titleKo || currentQ.titleEn) : (state.lang === 'en' ? currentQ.titleEn : currentQ.titleRo);
    const qSub = state.lang === 'ko' ? (currentQ.subtitleEn || currentQ.subtitleRo) : (state.lang === 'en' ? currentQ.subtitleEn : currentQ.subtitleRo);

    return `
      <div class="quiz-container">
        <div class="quiz-meter">
          <div class="quiz-meter-fill" style="width: ${(state.quizStep / 6) * 100}%"></div>
        </div>

        <span class="quiz-step-title">${t("questionPrefix")} ${state.quizStep} ${t("questionOf")} 6</span>
        <h2 class="quiz-question-text">${qTitle}</h2>
        ${state.lang !== 'ko' ? `<span class="quiz-sub-ko">${currentQ.titleKo}</span>` : ''}

        <div class="quiz-options-list">
          ${currentQ.options.map(opt => {
            const isSelected = state.quizAnswers[currentQ.key] === opt.value;
            const optLabel = state.lang === 'ko' ? (opt.labelKo || opt.labelEn) : (state.lang === 'en' ? opt.labelEn : opt.labelRo);
            const optDesc = state.lang === 'ko' ? (opt.descEn || opt.descRo) : (state.lang === 'en' ? opt.descEn : opt.descRo);
            return `
              <div class="quiz-choice-card ${isSelected ? 'selected' : ''}" data-value="${opt.value}" data-key="${currentQ.key}">
                <div class="choice-top">
                  <strong>${optLabel}</strong>
                  <span class="choice-ko">${opt.labelKo}</span>
                </div>
                <p class="choice-desc">${optDesc}</p>
              </div>
            `;
          }).join('')}
        </div>

        <div class="quiz-buttons-row">
          ${state.quizStep > 1 ? `<button class="btn-quiz-back" id="btn-quiz-prev">${t("quizPrev")}</button>` : ''}
          <button class="btn-quiz-proceed" id="btn-quiz-next">
            ${state.quizStep === 6 ? t("quizSubmit") : t("quizNext")}
          </button>
        </div>
      </div>
    `;
  }

  // [탭 4: Magazin]
  function renderShopTab() {
    const categories = [
      { 
        key: "all", 
        label: state.lang === 'ko' ? "전체" : (state.lang === 'en' ? "All" : "Toate"),
        shortLabel: state.lang === 'ko' ? "전체" : (state.lang === 'en' ? "All" : "Toate"),
        icon: "✨",
        count: data.products.length 
      },
      { 
        key: "Toner & Tampoane", 
        label: state.lang === 'ko' ? "토너·패드" : (state.lang === 'en' ? "Toners" : "Tonere"),
        shortLabel: state.lang === 'ko' ? "토너" : (state.lang === 'en' ? "Toners" : "Tonere"),
        icon: "💧",
        count: data.products.filter(p => p.category === "Toner & Tampoane").length 
      },
      { 
        key: "Serum & Fiole", 
        label: state.lang === 'ko' ? "세럼·앰플" : (state.lang === 'en' ? "Serums" : "Seruri"),
        shortLabel: state.lang === 'ko' ? "세럼" : (state.lang === 'en' ? "Serums" : "Seruri"),
        icon: "🧪",
        count: data.products.filter(p => p.category === "Serum & Fiole").length 
      },
      { 
        key: "Creme & Hidratare", 
        label: state.lang === 'ko' ? "크림·보습" : (state.lang === 'en' ? "Creams" : "Creme"),
        shortLabel: state.lang === 'ko' ? "크림" : (state.lang === 'en' ? "Creams" : "Creme"),
        icon: "🛡️",
        count: data.products.filter(p => p.category === "Creme & Hidratare").length 
      },
      { 
        key: "Protecție Solară", 
        label: state.lang === 'ko' ? "선케어·SPF" : (state.lang === 'en' ? "Sunscreen" : "SPF Coreean"),
        shortLabel: state.lang === 'ko' ? "선크림" : (state.lang === 'en' ? "SPF" : "SPF"),
        icon: "☀️",
        count: data.products.filter(p => p.category === "Protecție Solară").length 
      },
      { 
        key: "Curățare", 
        label: state.lang === 'ko' ? "클렌징" : (state.lang === 'en' ? "Cleansers" : "Curățare"),
        shortLabel: state.lang === 'ko' ? "클렌징" : (state.lang === 'en' ? "Cleanser" : "Curățare"),
        icon: "🫧",
        count: data.products.filter(p => p.category === "Curățare").length 
      },
      { 
        key: "Machiaj", 
        label: state.lang === 'ko' ? "메이크업" : (state.lang === 'en' ? "Makeup" : "Machiaj"),
        shortLabel: state.lang === 'ko' ? "메이크업" : (state.lang === 'en' ? "Makeup" : "Machiaj"),
        icon: "💄",
        count: data.products.filter(p => p.category === "Machiaj").length 
      }
    ];

    const currentCatObj = categories.find(c => c.key === state.selectedCategory) || categories[0];

    const filtered = state.selectedCategory === "all"
      ? data.products
      : data.products.filter(p => p.category === state.selectedCategory);

    return `
      <div class="shop-tab-container">
        <!-- 1. 상단 가로 스크롤 카테고리 칩 바 (상시 스티키, 좌우 넘기기 화살표 & 드래그) -->
        <div class="shop-category-header">
          <button class="shop-nav-arrow prev hidden" id="btn-shop-cat-prev" aria-label="이전 카테고리">${ICONS.chevronLeft}</button>
          <div class="shop-category-scroll" id="shop-cat-scroll">
            ${categories.map(c => `
              <button class="shop-cat-pill ${state.selectedCategory === c.key ? 'active' : ''}" data-category="${c.key}">
                <span class="cat-pill-icon">${c.icon}</span>
                <span class="cat-pill-label">${c.label}</span>
                <span class="cat-pill-count">${c.count}</span>
              </button>
            `).join('')}
          </div>
          <button class="shop-nav-arrow next" id="btn-shop-cat-next" aria-label="다음 카테고리">${ICONS.chevronRight}</button>
        </div>

        <div class="ably-section" style="padding-top:12px;">
          <!-- 2. 활성 카테고리 안내 및 다른 카테고리로의 빠른 점프 바 (좌우 넘기기/드래그 가능) -->
          <div class="active-category-banner">
            <div class="acb-title-row">
              <div class="acb-left">
                <span class="acb-badge">${currentCatObj.icon} ${currentCatObj.label}</span>
                <span class="acb-count">${filtered.length} ${state.lang === 'ko' ? '개 상품' : (state.lang === 'en' ? 'products' : 'produse')}</span>
              </div>
              ${state.selectedCategory !== 'all' ? `
                <button class="acb-reset-btn" data-category="all">
                  ${state.lang === 'ko' ? '전체보기 ✕' : (state.lang === 'en' ? 'View All ✕' : 'Toate ✕')}
                </button>
              ` : ''}
            </div>

            <div class="acb-quick-pills" id="shop-jump-scroll">
              <span class="acb-jump-label">${state.lang === 'ko' ? '빠른 이동:' : (state.lang === 'en' ? 'Jump to:' : 'Alte categorii:')}</span>
              ${categories.filter(c => c.key !== state.selectedCategory).map(c => `
                <button class="acb-jump-chip" data-category="${c.key}">
                  ${c.icon} ${c.shortLabel}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 3. 상품 2열 그리드 -->
          <div class="ably-product-grid">
            ${filtered.map((prod, i) => renderProductCard(prod, i + 1)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // [탭 5: Auth]
  function renderAuthTab() {
    if (state.authSubmitted) {
      const isConsumer = state.authRole === "consumer";
      return `
        <div class="auth-container">
          <div class="creator-match-box" style="text-align:center; padding:30px 16px;">
            <div style="font-size:36px; margin-bottom:10px;">${isConsumer ? '🎉' : '🚀'}</div>
            <h3 style="font-size:17px; font-weight:800; margin-bottom:6px;">
              ${isConsumer 
                ? (state.lang === 'en' ? 'Account Created Successfully!' : 'Cont Creat cu Succes!') 
                : (state.lang === 'en' ? 'Partner Application Submitted!' : 'Cerere Partener Înregistrată!')}
            </h3>
            <p style="font-size:12px; color:#666; margin-bottom:16px;">
              ${isConsumer 
                ? (state.lang === 'en' ? 'Your 10% discount voucher (SEOULMATE10) has been activated.' : 'Cuponul tău de 10% reducere (SEOULMATE10) a fost activat.')
                : (state.lang === 'en' ? 'Our team will review your channel and dispatch your PR sample kit (30 SKU) within 24 hours.' : 'Echipa Seoulmate va analiza contul tău și va expedia kitul de mostre (30 SKU) în 24 de ore.')
              }
            </p>
            <button class="btn-primary-auth" id="btn-auth-finish">
              ${isConsumer ? (state.lang === 'en' ? 'Start Shopping' : 'Începe Cumpărăturile') : (state.lang === 'en' ? 'Go to Feed' : 'Mergi la Feed')}
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="auth-container">
        <div style="display:flex; justify-content:space-between; align-items:center; background:#FAFAFB; border:1px solid #EEEEEE; border-radius:8px; padding:10px 12px; margin-bottom:14px;">
          <div style="font-size:11px; color:#444;">
            <strong>${state.currentUser.name}</strong> · ${state.currentUser.city}
          </div>
          <button class="btn-open-cert" data-tab="profile" style="padding:4px 8px;">
            ${t("tabProfile")} & easybox ›
          </button>
        </div>

        <div class="auth-subnav">
          <button class="auth-subnav-btn ${state.authRole === 'consumer' ? 'active' : ''}" data-role-tab="consumer">
            ${t("tabConsumerAuth")}
          </button>
          <button class="auth-subnav-btn ${state.authRole === 'creator' ? 'active' : ''}" data-role-tab="creator">
            ${t("tabCreatorAuth")}
          </button>
        </div>

        <div class="auth-form-card">
          ${state.authRole === 'consumer' ? `
            <div class="auth-title-row">
              <h3>${t("consumerWelcomeTitle")}</h3>
              <p>${t("consumerWelcomeSub")}</p>
            </div>

            <div class="auth-coupon-banner">
              🎁 ${state.lang === 'en' ? '10% Discount on First Order' : '10% Reducere la prima comandă K-Beauty'}
            </div>

            <form class="auth-form-body" id="consumer-register-form">
              <div>
                <label class="field-label">${t("inputName")}</label>
                <input type="text" id="reg-name" class="input-box" value="Elena Popescu" required />
              </div>
              <div>
                <label class="field-label">${t("inputEmail")}</label>
                <input type="email" id="reg-email" class="input-box" value="elena@example.ro" required />
              </div>
              <div>
                <label class="field-label">${t("inputPhone")}</label>
                <input type="tel" class="input-box" value="+40 721 345 678" required />
              </div>
              <div>
                <label class="field-label">${t("inputCity")}</label>
                <select class="select-box" id="reg-city">
                  <option value="București" selected>București</option>
                  <option value="Cluj-Napoca">Cluj-Napoca</option>
                  <option value="Timișoara">Timișoara</option>
                  <option value="Iași">Iași</option>
                </select>
              </div>
              <button type="submit" class="btn-primary-auth">${t("btnConsumerSubmit")}</button>
            </form>
          ` : `
            <div class="auth-title-row">
              <h3>${t("creatorPartnerTitle")}</h3>
              <p>${t("creatorPartnerSub")}</p>
            </div>

            <div style="background:#FAFAFB; border:1px solid #EEEEEE; border-radius:8px; padding:12px; margin-bottom:14px; font-size:11px; color:#444; line-height:1.5;">
              ✓ ${t("creatorPerk1")}<br/>
              ✓ ${t("creatorPerk2")}<br/>
              ✓ ${t("creatorPerk3")}
            </div>

            <form class="auth-form-body" id="creator-register-form">
              <div>
                <label class="field-label">${t("inputCreatorHandle")}</label>
                <input type="text" id="reg-handle" class="input-box" value="@andreea.skin" required />
              </div>
              <div>
                <label class="field-label">${t("inputFollowers")}</label>
                <select class="select-box">
                  <option value="5k-20k">5.000 ~ 20.000 (Nano)</option>
                  <option value="20k-50k" selected>20.000 ~ 50.000 (Micro)</option>
                  <option value="50k+">Peste 50.000 (Top)</option>
                </select>
              </div>
              <div>
                <label class="field-label">${t("inputIban")}</label>
                <input type="text" class="input-box" value="RO88 BTRL 0300 1234 5678 99XX" required />
              </div>
              <button type="submit" class="btn-primary-auth">${t("btnCreatorSubmit")}</button>
            </form>
          `}
        </div>
      </div>
    `;
  }

  // [탭 6: Profil]
  function renderProfileTab() {
    return `
      <div class="ably-section">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:48px; height:48px; border-radius:50%; background:#F2F2F4; display:flex; align-items:center; justify-content:center;">
              ${ICONS.user}
            </div>
            <div>
              <h4 style="font-size:15px; font-weight:800;">${state.currentUser.name}</h4>
              <p style="font-size:12px; color:#888;">${state.currentUser.city} · ${state.currentUser.email}</p>
            </div>
          </div>
          <button class="btn-open-cert" data-tab="auth">${t("tabAuth")} ›</button>
        </div>

        <div class="creator-match-box" style="margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:10px; font-weight:800; color:#FA3E4C;">${t("profilePassportTag")}</span>
            <button class="section-more-link" data-tab="diagnostic">${t("profileEdit")} ›</button>
          </div>
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; margin-top:8px; text-align:center;">
            <div><span style="font-size:9px; color:#888;">Ten</span><strong style="font-size:11px; display:block;">${state.quizAnswers.type}</strong></div>
            <div><span style="font-size:9px; color:#888;">Nevoie</span><strong style="font-size:11px; display:block;">${state.quizAnswers.concern}</strong></div>
            <div><span style="font-size:9px; color:#888;">Subton</span><strong style="font-size:11px; display:block;">${state.quizAnswers.undertone}</strong></div>
            <div><span style="font-size:9px; color:#888;">Stil</span><strong style="font-size:11px; display:block;">${state.quizAnswers.style}</strong></div>
          </div>
        </div>

        <h4 style="font-size:14px; font-weight:800; margin-bottom:10px;">${t("profileOrdersTitle")}</h4>
        ${state.lastOrder ? `
          <div style="background:#FAFAFB; border:1px solid #EEEEEE; border-radius:8px; padding:12px; margin-bottom:18px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <strong style="font-size:12px;">#${state.lastOrder.id}</strong>
              <span style="font-size:10px; color:#1976D2; font-weight:700;">📦 ${t("profileActiveDelivery")}</span>
            </div>
            <p style="font-size:11px; color:#555;">${state.lastOrder.locker.name}</p>
            <div style="background:white; border:1px dashed #FA3E4C; padding:6px; margin-top:8px; text-align:center; font-weight:900; font-size:15px; color:#FA3E4C;">
              ${t("profilePinLabel")} ${state.lastOrder.pinCode}
            </div>
          </div>
        ` : `
          <div style="background:#FAFAFB; border:1px solid #EEEEEE; border-radius:8px; padding:14px; margin-bottom:18px; text-align:center;">
            <p style="font-size:12px; color:#888; margin-bottom:10px;">${t("profileEmptyOrder")}</p>
            <button class="btn-bundle-order" data-tab="shop" style="width:auto; padding:8px 16px;">${t("profileStartShop")}</button>
          </div>
        `}

        <div style="border-top:1px solid #EEEEEE; padding-top:8px; display:flex; flex-direction:column;">
          <button id="prof-menu-cert" style="display:flex; justify-content:space-between; align-items:center; padding:12px 4px; background:none; border:none; border-bottom:1px solid #F4F4F5; font-size:12px; font-weight:600; cursor:pointer; text-align:left;">
            <span>🛡️ ${t("menuCert")}</span><span>›</span>
          </button>
          <button id="prof-menu-lockers" style="display:flex; justify-content:space-between; align-items:center; padding:12px 4px; background:none; border:none; border-bottom:1px solid #F4F4F5; font-size:12px; font-weight:600; cursor:pointer; text-align:left;">
            <span>📦 ${t("menuLockers")}</span><span>›</span>
          </button>
          <button id="prof-menu-guide" style="display:flex; justify-content:space-between; align-items:center; padding:12px 4px; background:none; border:none; border-bottom:1px solid #F4F4F5; font-size:12px; font-weight:600; cursor:pointer; text-align:left;">
            <span>💡 ${t("menuGuide")}</span><span>›</span>
          </button>
          <button data-tab="auth" style="display:flex; justify-content:space-between; align-items:center; padding:12px 4px; background:none; border:none; font-size:12px; font-weight:600; cursor:pointer; text-align:left;">
            <span>👤 ${t("menuAuthManage")}</span><span>›</span>
          </button>
        </div>
      </div>
    `;
  }

  // 상품 카드
  function renderProductCard(prod, rank) {
    const isWished = state.wishlist.has(prod.id);
    const prodName = state.lang === 'ko' ? (prod.koreanName || prod.name) : (state.lang === 'en' ? (prod.englishName || prod.name) : prod.name);
    return `
      <div class="ably-prod-card" data-product-id="${prod.id}">
        <div class="ably-prod-imgwrap">
          <img src="${prod.image}" alt="${prodName}" loading="lazy" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${prod.category}','${prod.brand}','${prod.name.replace(/'/g, "\\'")}')" />
          ${rank <= 3 ? `<span class="ably-rank-num">${rank}</span>` : ''}
          ${prod.isAntiFakeHighlight ? `<span class="ably-prod-badge-auth">CPNP</span>` : ''}
          <button class="ably-wish-btn ${isWished ? 'wished' : ''}" data-wish-id="${prod.id}">
            ${ICONS.heart}
          </button>
        </div>
        <div class="ably-prod-info">
          <span class="ably-prod-brand">${prod.brand}</span>
          <h4 class="ably-prod-title">${prodName}</h4>
          <div class="ably-prod-price-row">
            <span class="ably-discount-rate">${prod.discount}%</span>
            <span class="ably-final-price">${prod.price} <small style="font-size:10px;">lei</small></span>
            <span class="ably-original-price">${prod.originalPrice}</span>
          </div>
          <div class="ably-prod-meta-row">
            <span class="ably-stars">★</span>
            <span class="ably-rating-text">${prod.rating}</span>
            <span>(${prod.reviewsCount})</span>
            <span class="ably-tag-easybox">easybox</span>
          </div>
        </div>
      </div>
    `;
  }

  // 모달 렌더링
  function renderActiveModal() {
    if (!state.activeModal) return '';

    // [모달 1: 상품 상세 바텀시트]
    if (state.activeModal === "product" && state.selectedProduct) {
      const p = state.selectedProduct;
      const title = state.lang === 'ko' ? (p.koreanName || p.name) : (state.lang === 'en' ? (p.englishName || p.name) : p.name);
      const subName = state.lang === 'ko' ? p.englishName : (state.lang === 'en' ? p.romanianName : p.englishName);
      const desc = state.lang === 'ko' ? (p.descriptionKo || p.descriptionEn || p.descriptionRo) : (state.lang === 'en' ? p.descriptionEn : p.descriptionRo);
      const cpnpLabel = state.lang === 'ko' ? 'EU CPNP 공식 정품 인증번호:' : (state.lang === 'en' ? 'Official EU CPNP Verification:' : 'Verificare Oficială EU CPNP:');
      const lotLabel = state.lang === 'ko' ? '공식 수입 유통 로트 번호:' : (state.lang === 'en' ? 'Traceability Lot Number:' : 'Lot Trasabilitate:');

      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-sheet">
            <div class="sheet-header-bar">
              <h4>${p.brand}</h4>
              <button class="sheet-close-x" id="sheet-close">✕</button>
            </div>
            <div class="sheet-body-scroll">
              <img src="${p.image}" alt="${title}" style="width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:8px; margin-bottom:12px;" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${p.category}','${p.brand}','${p.name.replace(/'/g, "\\'")}')" />
              <h3 style="font-size:16px; font-weight:800; margin-bottom:4px;">${title}</h3>
              <p style="font-size:12px; color:#666; margin-bottom:12px;">${subName}</p>

              <div style="display:flex; align-items:baseline; gap:8px; margin-bottom:16px;">
                <span style="color:#FA3E4C; font-size:18px; font-weight:900;">${p.discount}%</span>
                <span style="font-size:22px; font-weight:900;">${p.price} lei</span>
                <span style="font-size:12px; color:#999; text-decoration:line-through;">${p.originalPrice} lei</span>
              </div>

              <div style="background:#FAFAFB; border:1px solid #EEEEEE; border-radius:8px; padding:10px; margin-bottom:14px; font-size:11px;">
                <strong>${cpnpLabel}</strong> ${p.cpnpNumber}<br/>
                <strong>${lotLabel}</strong> ${p.lotNumber}
              </div>

              <p style="font-size:12px; color:#444; line-height:1.45;">${desc}</p>
            </div>
            <div class="sheet-footer-action">
              <button class="btn-sheet-cart" id="btn-sheet-add-cart" data-prod-id="${p.id}">${t("sheetAddToCart")}</button>
              <button class="btn-sheet-order" id="btn-sheet-instant-buy" data-prod-id="${p.id}">${t("sheetInstantBuy")}</button>
            </div>
          </div>
        </div>
      `;
    }

    // [모달 2: CPNP 정품 보증서]
    if (state.activeModal === "authenticity") {
      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-center-modal">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h3 style="font-size:16px; font-weight:800;">${state.lang === 'en' ? 'Authenticity Certificate' : 'Certificat de Autenticitate'}</h3>
              <button class="sheet-close-x" id="modal-close">✕</button>
            </div>
            <div style="background:#F0FDF4; border:1px solid #DCFCE7; border-radius:8px; padding:12px; margin-bottom:12px; font-size:11px; color:#166534; line-height:1.4;">
              <strong>${state.lang === 'en' ? 'Seoulmate Romania Guarantee:' : 'Garanția Seoulmate România:'}</strong><br/>
              ${state.lang === 'en' 
                ? 'All cosmetics are imported strictly through EU-responsible persons (RP) officially registered with the EU CPNP portal. Zero counterfeit risk.'
                : 'Toate produsele sunt importate direct prin reprezentanți autorizați (RP) înregistrați pe portalul CPNP al Comisiei Europene. Zero contrafaceri.'}
            </div>
            <div style="font-size:11px; color:#666; line-height:1.5; margin-bottom:14px;">
              • ${state.lang === 'en' ? 'Official Brand Manufacturer (Seoul, South Korea)' : 'Producător Oficial Seul, Coreea de Sud'}<br/>
              • ${state.lang === 'en' ? 'CPNP Notification & EU Customs Verification' : 'Notificare CPNP & Verificare Vamală Otopeni'}<br/>
              • ${state.lang === 'en' ? 'Tamper-Evident Delivery via Sameday easybox' : 'Livrare Sigilată în Rețeaua Sameday easybox'}
            </div>
            <button class="btn-primary-auth" id="modal-close-btn" style="margin:0;">${state.lang === 'en' ? 'Understood' : 'Am Înțeles'}</button>
          </div>
        </div>
      `;
    }

    // [모달 3: 결제 주문서 바텀시트]
    if (state.activeModal === "checkout" || state.activeModal === "cart") {
      const subtotal = state.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
      const isFreeShipping = subtotal >= data.platform.freeShippingThreshold;
      const shippingFee = isFreeShipping ? 0 : 12;
      const total = subtotal + shippingFee;

      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-sheet">
            <div class="sheet-header-bar">
              <h4>${t("checkoutTitle")}</h4>
              <button class="sheet-close-x" id="sheet-close">✕</button>
            </div>
            <div class="sheet-body-scroll">
              <div style="margin-bottom:16px;">
                <span style="font-size:12px; font-weight:800;">${state.lang === 'en' ? 'Cart Items' : 'Produse în Coș'} (${state.cart.length})</span>
                ${state.cart.length === 0 ? `<p style="font-size:12px; color:#888; padding:10px 0;">${t("cartEmpty")}</p>` : ''}
                ${state.cart.map((item, i) => `
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #EEE;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src=window.SEOULMATE_FALLBACK ? window.SEOULMATE_FALLBACK.getProduct('', '${(item.brand || '').replace(/'/g, "\\'")}', '${(item.name || '').replace(/'/g, "\\'")}') : '';" style="width:36px; height:36px; border-radius:4px; object-fit:cover;" />
                      <div>
                        <strong style="font-size:11px; display:block;">${item.name}</strong>
                        <span style="font-size:10px; color:#888;">${item.price} lei × ${item.qty}</span>
                      </div>
                    </div>
                    <button class="btn-remove-cart" data-cart-index="${i}" style="border:none; background:none; color:#888; cursor:pointer;">✕</button>
                  </div>
                `).join('')}
              </div>

              <!-- easybox 락커 -->
              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px; margin-bottom:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <strong style="font-size:11px; color:#1976D2;">${t("cartLockerLabel")}</strong>
                  <button id="btn-change-locker" style="background:none; border:none; color:#1976D2; font-size:10px; font-weight:700; cursor:pointer;">${t("btnChangeLocker")}</button>
                </div>
                <div style="font-size:12px; font-weight:800;">${state.selectedLocker.name}</div>
                <div style="font-size:11px; color:#666;">${state.selectedLocker.address}</div>
              </div>

              <!-- 결제 수단 (착불 기본) -->
              <div style="margin-bottom:16px;">
                <span style="font-size:12px; font-weight:800; display:block; margin-bottom:8px;">${t("paymentTitle")}</span>
                <label style="display:flex; align-items:center; gap:8px; padding:10px; border:1.5px solid ${state.paymentMethod === 'ramburs' ? '#FA3E4C' : '#DDD'}; border-radius:8px; margin-bottom:6px; cursor:pointer;">
                  <input type="radio" name="pay" value="ramburs" ${state.paymentMethod === 'ramburs' ? 'checked' : ''} />
                  <div>
                    <strong style="font-size:12px;">${t("payRambursTitle")}</strong>
                    <p style="font-size:10px; color:#777;">${t("payRambursSub")}</p>
                  </div>
                </label>
                <label style="display:flex; align-items:center; gap:8px; padding:10px; border:1.5px solid ${state.paymentMethod === 'card' ? '#FA3E4C' : '#DDD'}; border-radius:8px; cursor:pointer;">
                  <input type="radio" name="pay" value="card" ${state.paymentMethod === 'card' ? 'checked' : ''} />
                  <div>
                    <strong style="font-size:12px;">${t("payCardTitle")}</strong>
                    <p style="font-size:10px; color:#777;">${t("payCardSub")}</p>
                  </div>
                </label>
              </div>

              <!-- 금액 요약 -->
              <div style="border-top:1px dashed #DDD; padding-top:10px; font-size:12px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                  <span>${t("subtotalProducts")}</span><strong>${subtotal} lei</strong>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                  <span>${t("shippingFee")}</span><strong>${isFreeShipping ? t("shippingFree") : '12 lei'}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:15px; font-weight:900; border-top:1px solid #EEE; padding-top:8px;">
                  <span>${t("totalPay")}</span><span style="color:#FA3E4C;">${total} lei</span>
                </div>
              </div>
            </div>
            <div class="sheet-footer-action">
              <button class="btn-sheet-order" id="btn-submit-order" style="flex:1;" ${state.cart.length === 0 ? 'disabled' : ''}>
                ${state.paymentMethod === 'ramburs' ? t("btnSubmitOrderRamburs") : t("btnSubmitOrderCard")} (${total} lei)
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // [모달 4: easybox 락커 선택]
    if (state.activeModal === "easybox") {
      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-center-modal" style="max-height:80vh; display:flex; flex-direction:column;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <h3 style="font-size:15px; font-weight:800;">${state.lang === 'en' ? 'Select Sameday easybox Locker' : 'Alege Locker Sameday easybox'}</h3>
              <button class="sheet-close-x" id="modal-close">✕</button>
            </div>
            <div style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:6px;">
              ${data.easyboxLockers.map(l => `
                <div class="quiz-choice-card ${l.id === state.selectedLocker.id ? 'selected' : ''}" data-locker-id="${l.id}">
                  <strong style="font-size:12px; display:block;">${l.name}</strong>
                  <span style="font-size:11px; color:#666;">${l.address}</span>
                </div>
              `).join('')}
            </div>
            <button class="btn-primary-auth" id="btn-confirm-locker" style="margin-top:10px;">${state.lang === 'en' ? 'Confirm Locker' : 'Confirmă Locker'}</button>
          </div>
        </div>
      `;
    }

    // [모달 5: 주문 완료 및 PIN 발급]
    if (state.activeModal === "orderSuccess" && state.lastOrder) {
      const order = state.lastOrder;
      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-center-modal" style="text-align:center;">
            <div style="font-size:36px; margin-bottom:8px;">📦</div>
            <h3 style="font-size:17px; font-weight:800; margin-bottom:4px;">${t("orderSuccessTitle")}</h3>
            <p style="font-size:11px; color:#666; margin-bottom:12px;">${t("orderSuccessSub")}</p>

            <div style="background:#FAFAFB; border:1px solid #EEE; border-radius:8px; padding:12px; text-align:left; font-size:11px; margin-bottom:14px;">
              <div>Comandă: <strong>#${order.id}</strong></div>
              <div>Locker: <strong>${order.locker.name}</strong></div>
              <div>Total: <strong>${order.total} lei (${order.paymentMethod === 'ramburs' ? 'Plată la locker' : 'Card'})</strong></div>
              <div style="background:#FFF0F2; border:1.5px dashed #FA3E4C; color:#FA3E4C; padding:8px; text-align:center; font-size:16px; font-weight:900; margin-top:8px;">
                ${t("profilePinLabel")} ${order.pinCode}
              </div>
            </div>

            <button class="btn-primary-auth" id="btn-finish-order" style="margin:0;">${t("orderSuccessFinish")}</button>
          </div>
        </div>
      `;
    }

    // [모달 6: 심사위원 가이드]
    if (state.activeModal === "guide") {
      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-center-modal" style="max-height:80vh; display:flex; flex-direction:column;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <h3 style="font-size:15px; font-weight:800;">💡 Seoulmate 캡스톤 기획 안내</h3>
              <button class="sheet-close-x" id="modal-close">✕</button>
            </div>
            <div style="flex:1; overflow-y:auto; font-size:12px; color:#333; line-height:1.5;">
              <p><strong>1. 모바일 최적화 크리에이터 커머스 UI:</strong><br/>
              화이트/소프트 그레이 베이스와 코랄 레드 액센트를 적용해 직관적이고 신뢰도 높은 K-뷰티 커머스 경험을 완성했습니다.</p>
              <br/>
              <p><strong>2. 편의 기능 완비:</strong><br/>
              • 상단 전역 뒤로가기(Back) 버튼 제공<br/>
              • 인터랙티브 4개 히어로 슬라이더 (좌우 화살표 및 카운터 클릭)<br/>
              • 가로 스크롤 잘림 없는 부드러운 퀵 카테고리 슬라이더<br/>
              • 상세 페이지/모달까지 100% 반영되는 다국어 (RO / EN / 한국어) 토글</p>
              <br/>
              <p><strong>3. 루마니아 현지화 핵심:</strong><br/>
              전국 1만 개 Sameday easybox 락커 선택 및 착불(Ramburs) 기본 결제 옵션을 제공합니다.</p>
            </div>
            <button class="btn-primary-auth" id="modal-close-btn" style="margin-top:10px;">닫기</button>
          </div>
        </div>
      `;
    }

    return '';
  }

  // 이벤트 바인딩
  function attachEventListeners() {
    // 1. 뒤로가기 버튼
    const backBtn = document.getElementById("btn-global-back");
    if (backBtn) {
      backBtn.addEventListener("click", () => goBack());
    }

    // 2. 언어 전환 (토글 및 3개국어 알약 버튼)
    const langBtn = document.getElementById("btn-toggle-lang");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        if (state.lang === "ro") state.lang = "en";
        else if (state.lang === "en") state.lang = "ko";
        else state.lang = "ro";
        render();
      });
    }

    document.querySelectorAll("[data-set-lang]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const l = btn.getAttribute("data-set-lang");
        if (l && l !== state.lang) {
          state.lang = l;
          render();
        }
      });
    });

    // 3. 뷰포트 전환
    const viewBtn = document.getElementById("btn-toggle-view");
    if (viewBtn) {
      viewBtn.addEventListener("click", () => {
        state.viewMode = state.viewMode === "mobile-frame" ? "desktop" : "mobile-frame";
        render();
      });
    }

    // 4. 슬라이더 넘기기 버튼 (Next, Prev, Counter Click)
    const prevBtn = document.getElementById("btn-hero-prev");
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        prevSlide();
      });
    }

    const nextBtn = document.getElementById("btn-hero-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        nextSlide();
      });
    }

    const counterBadge = document.getElementById("hero-counter-num");
    if (counterBadge) {
      counterBadge.addEventListener("click", (e) => {
        e.stopPropagation();
        nextSlide();
      });
    }

    // 4-1. 퀵 카테고리 가로 슬라이더 (좌우 화살표 넘기기, 마우스 드래그 앤 스와이프, 마우스 휠, 인디케이터 연동)
    const quickSlider = document.getElementById("quick-icons-slider");
    const quickPrevBtn = document.getElementById("btn-quick-prev");
    const quickNextBtn = document.getElementById("btn-quick-next");
    const quickThumb = document.getElementById("quick-scroll-thumb");
    const quickTrack = document.getElementById("quick-scroll-track");

    if (quickSlider) {
      const updateSliderNav = () => {
        const maxScroll = quickSlider.scrollWidth - quickSlider.clientWidth;
        if (maxScroll <= 0) {
          if (quickPrevBtn) quickPrevBtn.classList.add("hidden");
          if (quickNextBtn) quickNextBtn.classList.add("hidden");
          if (quickThumb) quickThumb.style.transform = "translateX(0px)";
          return;
        }

        const scrollLeft = quickSlider.scrollLeft;
        if (quickPrevBtn) {
          if (scrollLeft <= 4) quickPrevBtn.classList.add("hidden");
          else quickPrevBtn.classList.remove("hidden");
        }

        if (quickNextBtn) {
          if (scrollLeft >= maxScroll - 4) quickNextBtn.classList.add("hidden");
          else quickNextBtn.classList.remove("hidden");
        }

        if (quickThumb && quickTrack) {
          const trackWidth = quickTrack.clientWidth || 48;
          const thumbWidth = quickThumb.clientWidth || 19;
          const maxThumbTravel = Math.max(0, trackWidth - thumbWidth);
          const ratio = Math.min(1, Math.max(0, scrollLeft / maxScroll));
          quickThumb.style.transform = `translateX(${ratio * maxThumbTravel}px)`;
        }
      };

      // 좌우 화살표 클릭 넘기기
      if (quickPrevBtn) {
        quickPrevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          quickSlider.scrollBy({ left: -160, behavior: "smooth" });
        });
      }
      if (quickNextBtn) {
        quickNextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          quickSlider.scrollBy({ left: 160, behavior: "smooth" });
        });
      }

      // 인디케이터 트랙 클릭 시 해당 위치로 점프
      if (quickTrack) {
        quickTrack.addEventListener("click", (e) => {
          const rect = quickTrack.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          const maxScroll = quickSlider.scrollWidth - quickSlider.clientWidth;
          quickSlider.scrollTo({ left: ratio * maxScroll, behavior: "smooth" });
        });
      }

      // 마우스 휠 지원 (상하 휠을 가로 스크롤로 매끄럽게 변환)
      quickSlider.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          quickSlider.scrollLeft += e.deltaY;
          updateSliderNav();
        }
      }, { passive: false });

      // 마우스 드래그 앤 스와이프
      let isDown = false;
      let startX = 0;
      let scrollStart = 0;
      let hasDragged = false;

      quickSlider.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        isDown = true;
        hasDragged = false;
        startX = e.pageX - quickSlider.offsetLeft;
        scrollStart = quickSlider.scrollLeft;
        quickSlider.classList.add("is-dragging");
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        const x = e.pageX - quickSlider.offsetLeft;
        const walk = (x - startX) * 1.3;
        if (Math.abs(walk) > 4) {
          hasDragged = true;
        }
        quickSlider.scrollLeft = scrollStart - walk;
        updateSliderNav();
      });

      const handleDragEnd = () => {
        if (!isDown) return;
        isDown = false;
        quickSlider.classList.remove("is-dragging");
      };

      window.addEventListener("mouseup", handleDragEnd);

      // 드래그 후 클릭 트리거 방지
      quickSlider.addEventListener("click", (e) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopPropagation();
          hasDragged = false;
        }
      }, true);

      // 스크롤 이벤트 연동 (터치 스와이프 등)
      quickSlider.addEventListener("scroll", updateSliderNav);

      // 초기 위치 업데이트
      setTimeout(updateSliderNav, 50);
    }

    // 4-2. 스토어 탭 상단 카테고리 스크롤 (좌우 화살표 넘기기, 드래그 & 휠 지원)
    const shopCatScroll = document.getElementById("shop-cat-scroll");
    const shopCatPrevBtn = document.getElementById("btn-shop-cat-prev");
    const shopCatNextBtn = document.getElementById("btn-shop-cat-next");

    if (shopCatScroll) {
      const updateShopCatNav = () => {
        const maxScroll = shopCatScroll.scrollWidth - shopCatScroll.clientWidth;
        if (maxScroll <= 0) {
          if (shopCatPrevBtn) shopCatPrevBtn.classList.add("hidden");
          if (shopCatNextBtn) shopCatNextBtn.classList.add("hidden");
          return;
        }

        const scrollLeft = shopCatScroll.scrollLeft;
        if (shopCatPrevBtn) {
          if (scrollLeft <= 4) shopCatPrevBtn.classList.add("hidden");
          else shopCatPrevBtn.classList.remove("hidden");
        }

        if (shopCatNextBtn) {
          if (scrollLeft >= maxScroll - 4) shopCatNextBtn.classList.add("hidden");
          else shopCatNextBtn.classList.remove("hidden");
        }
      };

      if (shopCatPrevBtn) {
        shopCatPrevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          shopCatScroll.scrollBy({ left: -140, behavior: "smooth" });
        });
      }

      if (shopCatNextBtn) {
        shopCatNextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          shopCatScroll.scrollBy({ left: 140, behavior: "smooth" });
        });
      }

      shopCatScroll.addEventListener("scroll", updateShopCatNav);
      setTimeout(updateShopCatNav, 50);

      // 마우스 휠
      shopCatScroll.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          shopCatScroll.scrollLeft += e.deltaY;
          updateShopCatNav();
        }
      }, { passive: false });

      // 마우스 드래그 앤 스와이프
      let isShopDown = false;
      let shopStartX = 0;
      let shopScrollStart = 0;
      let shopDragged = false;

      shopCatScroll.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        isShopDown = true;
        shopDragged = false;
        shopStartX = e.pageX - shopCatScroll.offsetLeft;
        shopScrollStart = shopCatScroll.scrollLeft;
        shopCatScroll.classList.add("is-dragging");
      });

      window.addEventListener("mousemove", (e) => {
        if (!isShopDown) return;
        const x = e.pageX - shopCatScroll.offsetLeft;
        const walk = (x - shopStartX) * 1.3;
        if (Math.abs(walk) > 4) shopDragged = true;
        shopCatScroll.scrollLeft = shopScrollStart - walk;
        updateShopCatNav();
      });

      window.addEventListener("mouseup", () => {
        if (!isShopDown) return;
        isShopDown = false;
        shopCatScroll.classList.remove("is-dragging");
      });

      shopCatScroll.addEventListener("click", (e) => {
        if (shopDragged) {
          e.preventDefault();
          e.stopPropagation();
          shopDragged = false;
        }
      }, true);
    }

    // 4-3. 스토어 탭 "빠른 이동" 칩 영역 드래그 & 마우스 휠 지원
    const shopJumpScroll = document.getElementById("shop-jump-scroll");
    if (shopJumpScroll) {
      shopJumpScroll.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          shopJumpScroll.scrollLeft += e.deltaY;
        }
      }, { passive: false });

      let isJumpDown = false;
      let jumpStartX = 0;
      let jumpScrollStart = 0;
      let jumpDragged = false;

      shopJumpScroll.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        isJumpDown = true;
        jumpDragged = false;
        jumpStartX = e.pageX - shopJumpScroll.offsetLeft;
        jumpScrollStart = shopJumpScroll.scrollLeft;
        shopJumpScroll.classList.add("is-dragging");
      });

      window.addEventListener("mousemove", (e) => {
        if (!isJumpDown) return;
        const x = e.pageX - shopJumpScroll.offsetLeft;
        const walk = (x - jumpStartX) * 1.3;
        if (Math.abs(walk) > 4) jumpDragged = true;
        shopJumpScroll.scrollLeft = jumpScrollStart - walk;
      });

      window.addEventListener("mouseup", () => {
        if (!isJumpDown) return;
        isJumpDown = false;
        shopJumpScroll.classList.remove("is-dragging");
      });

      shopJumpScroll.addEventListener("click", (e) => {
        if (jumpDragged) {
          e.preventDefault();
          e.stopPropagation();
          jumpDragged = false;
        }
      }, true);
    }

    // 5. 검색창 실시간 필터링
    const searchInput = document.getElementById("main-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        const filtered = data.products.filter(p => 
          p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
        const grid = document.querySelector(".ably-product-grid");
        if (grid) {
          grid.innerHTML = filtered.map((prod, i) => renderProductCard(prod, i + 1)).join('');
          attachProductCardListeners();
        }
      });
    }

    const navSearchBtn = document.getElementById("btn-nav-search");
    if (navSearchBtn) {
      navSearchBtn.addEventListener("click", () => {
        if (state.activeTab !== "home") {
          navigateTo("home");
        }
        setTimeout(() => {
          const inp = document.getElementById("main-search-input");
          if (inp) inp.focus();
        }, 30);
      });
    }

    const clearSearchBtn = document.getElementById("btn-clear-search");
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        state.searchQuery = "";
        render();
      });
    }

    // 6. 전역 data-tab 이동 (하단 탭, 로고, 서브탭, 더보기 버튼 등 모두 지원)
    document.querySelectorAll("[data-tab]").forEach(el => {
      el.addEventListener("click", () => {
        navigateTo(el.getAttribute("data-tab"));
      });
    });

    // 서브탭
    document.querySelectorAll("[data-subtab]").forEach(el => {
      el.addEventListener("click", () => {
        const sub = el.getAttribute("data-subtab");
        state.homeSubTab = sub;
        render();
        if (sub === "best") {
          setTimeout(() => {
            const sec = document.getElementById("trending-section");
            if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 30);
        } else {
          resetScroll();
        }
      });
    });

    // 장바구니 열기
    const cartBtn = document.getElementById("btn-header-cart");
    if (cartBtn) {
      cartBtn.addEventListener("click", () => {
        state.activeModal = "checkout";
        render();
      });
    }

    // 정품 인증 팝업
    document.querySelectorAll("#btn-show-trust, #btn-cert-modal, #btn-subnav-cert, #prof-menu-cert").forEach(b => {
      b.addEventListener("click", () => {
        state.activeModal = "authenticity";
        render();
      });
    });

    // 프로필 락커 네트워크 팝업
    const profLockers = document.getElementById("prof-menu-lockers");
    if (profLockers) {
      profLockers.addEventListener("click", () => {
        state.activeModal = "easybox";
        render();
      });
    }

    // 가이드 모달
    document.querySelectorAll("#btn-open-guide, #prof-menu-guide").forEach(guideBtn => {
      guideBtn.addEventListener("click", () => {
        state.activeModal = "guide";
        render();
      });
    });

    // 모달 닫기
    const backdrop = document.getElementById("modal-backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          state.activeModal = null;
          render();
        }
      });
    }

    document.querySelectorAll("#modal-close, #modal-close-btn, #sheet-close").forEach(b => {
      b.addEventListener("click", () => {
        state.activeModal = null;
        render();
      });
    });

    // 크리에이터 팔로우 버튼
    document.querySelectorAll("[data-follow-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        const cid = btn.getAttribute("data-follow-id");
        if (state.followedCreators.has(cid)) {
          state.followedCreators.delete(cid);
        } else {
          state.followedCreators.add(cid);
          showToast(state.lang === "en" ? "Following creator!" : "Urmărești acest creator!");
        }
        render();
      });
    });

    // 상품 카드 및 찜하기 리스너 바인딩
    attachProductCardListeners();

    // 카테고리 퀵 버튼 & 스토어 서브탭 필터 (토너 클릭 시 및 다른 카테고리 즉시 전환)
    document.querySelectorAll("[data-category]").forEach(b => {
      b.addEventListener("click", () => {
        const cat = b.getAttribute("data-category");
        state.selectedCategory = cat;
        if (state.activeTab === "shop") {
          render();
        } else {
          navigateTo("shop");
        }
        // 활성화된 카테고리 탭으로 부드럽게 가로 스크롤 이동
        setTimeout(() => {
          const activePill = document.querySelector(`.shop-cat-pill[data-category="${cat}"]`);
          if (activePill) {
            activePill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          }
        }, 60);
      });
    });

    // 번들 세트 구매
    document.querySelectorAll(".btn-bundle-order[data-creator-id]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const cid = btn.getAttribute("data-creator-id");
        const creator = data.creators.find(c => c.id === cid);
        if (creator) {
          state.cart = [{
            id: `bundle-${creator.id}`,
            name: `${creator.routine.title}`,
            brand: creator.name,
            price: creator.routine.bundlePrice,
            qty: 1,
            image: creator.avatar
          }];
          state.activeModal = "checkout";
          render();
        }
      });
    });

    // 퀴즈 옵션 선택
    document.querySelectorAll(".quiz-choice-card[data-key]").forEach(card => {
      card.addEventListener("click", () => {
        state.quizAnswers[card.getAttribute("data-key")] = card.getAttribute("data-value");
        render();
      });
    });

    // 퀴즈 다음/이전
    const qNext = document.getElementById("btn-quiz-next");
    if (qNext) {
      qNext.addEventListener("click", () => {
        if (state.quizStep < 6) {
          state.quizStep++;
          render();
        } else {
          state.quizStatus = "analyzing";
          render();
          setTimeout(() => {
            calculateMatching();
            state.quizStatus = "completed";
            render();
          }, 1200);
        }
      });
    }

    const qPrev = document.getElementById("btn-quiz-prev");
    if (qPrev) {
      qPrev.addEventListener("click", () => {
        if (state.quizStep > 1) {
          state.quizStep--;
          render();
        }
      });
    }

    const qRestart = document.getElementById("btn-restart-quiz");
    if (qRestart) {
      qRestart.addEventListener("click", () => {
        state.quizStep = 1;
        state.quizStatus = "idle";
        render();
      });
    }

    // 회원가입 역할 전환
    document.querySelectorAll("[data-role-tab]").forEach(b => {
      b.addEventListener("click", () => {
        state.authRole = b.getAttribute("data-role-tab");
        render();
      });
    });

    // 크리에이터 입점 배너
    const joinBanner = document.getElementById("banner-join-creator");
    if (joinBanner) {
      joinBanner.addEventListener("click", () => {
        state.authRole = "creator";
        navigateTo("auth");
      });
    }

    // 소비자 가입 제출
    const cForm = document.getElementById("consumer-register-form");
    if (cForm) {
      cForm.addEventListener("submit", (e) => {
        e.preventDefault();
        state.currentUser.name = document.getElementById("reg-name").value;
        state.currentUser.email = document.getElementById("reg-email").value;
        state.authSubmitted = true;
        render();
      });
    }

    // 판매자 가입 제출
    const crForm = document.getElementById("creator-register-form");
    if (crForm) {
      crForm.addEventListener("submit", (e) => {
        e.preventDefault();
        state.authSubmitted = true;
        render();
      });
    }

    const authFinish = document.getElementById("btn-auth-finish");
    if (authFinish) {
      authFinish.addEventListener("click", () => {
        state.authSubmitted = false;
        navigateTo("home");
      });
    }

    // 상세 시트 담기/구매
    const sheetAdd = document.getElementById("btn-sheet-add-cart");
    if (sheetAdd) {
      sheetAdd.addEventListener("click", () => {
        const p = data.products.find(item => item.id === sheetAdd.getAttribute("data-prod-id"));
        if (p) {
          const ex = state.cart.find(c => c.id === p.id);
          if (ex) ex.qty++;
          else state.cart.push({ ...p, qty: 1 });
          state.activeModal = null;
          showToast(t("toastCartAdded"));
          render();
        }
      });
    }

    const sheetBuy = document.getElementById("btn-sheet-instant-buy");
    if (sheetBuy) {
      sheetBuy.addEventListener("click", () => {
        const p = data.products.find(item => item.id === sheetBuy.getAttribute("data-prod-id"));
        if (p) {
          state.cart = [{ ...p, qty: 1 }];
          state.activeModal = "checkout";
          render();
        }
      });
    }

    // 장바구니 삭제
    document.querySelectorAll(".btn-remove-cart").forEach(b => {
      b.addEventListener("click", () => {
        state.cart.splice(parseInt(b.getAttribute("data-cart-index"), 10), 1);
        render();
      });
    });

    // 락커 모달
    const changeLocker = document.getElementById("btn-change-locker");
    if (changeLocker) {
      changeLocker.addEventListener("click", () => {
        state.activeModal = "easybox";
        render();
      });
    }

    document.querySelectorAll(".quiz-choice-card[data-locker-id]").forEach(card => {
      card.addEventListener("click", () => {
        const l = data.easyboxLockers.find(loc => loc.id === card.getAttribute("data-locker-id"));
        if (l) {
          state.selectedLocker = l;
          render();
        }
      });
    });

    const confirmLocker = document.getElementById("btn-confirm-locker");
    if (confirmLocker) {
      confirmLocker.addEventListener("click", () => {
        state.activeModal = "checkout";
        render();
      });
    }

    // 결제 라디오
    document.querySelectorAll("input[name='pay']").forEach(r => {
      r.addEventListener("change", (e) => {
        state.paymentMethod = e.target.value;
        render();
      });
    });

    // 주문 제출
    const submitOrder = document.getElementById("btn-submit-order");
    if (submitOrder) {
      submitOrder.addEventListener("click", () => {
        const subtotal = state.cart.reduce((a, b) => a + (b.price * b.qty), 0);
        const fee = subtotal >= data.platform.freeShippingThreshold ? 0 : 12;
        state.lastOrder = {
          id: `SM-${Math.floor(1000 + Math.random() * 9000)}`,
          locker: state.selectedLocker,
          paymentMethod: state.paymentMethod,
          total: subtotal + fee,
          pinCode: `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`
        };
        state.cart = [];
        state.activeModal = "orderSuccess";
        render();
      });
    }

    const finishOrder = document.getElementById("btn-finish-order");
    if (finishOrder) {
      finishOrder.addEventListener("click", () => {
        state.activeModal = null;
        navigateTo("profile");
      });
    }
  }

  function attachProductCardListeners() {
    document.querySelectorAll("[data-wish-id]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-wish-id");
        if (state.wishlist.has(id)) {
          state.wishlist.delete(id);
          showToast(t("toastWishlistRemoved"));
        } else {
          state.wishlist.add(id);
          showToast(t("toastWishlistAdded"));
        }
        render();
      });
    });

    document.querySelectorAll(".ably-prod-card[data-product-id], .rb-item-thumb[data-product-id]").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".ably-wish-btn")) return;
        const id = card.getAttribute("data-product-id");
        const prod = data.products.find(p => p.id === id);
        if (prod) {
          state.selectedProduct = prod;
          state.activeModal = "product";
          render();
        }
      });
    });
  }

  render();

  // 호스팅 외부 주입 배지(Powered by Netlify 등) 자동 제거
  function removeInjectedHostBadges() {
    const candidates = [
      ...Array.from(document.body ? document.body.children : []),
      ...Array.from(document.documentElement ? document.documentElement.children : [])
    ];

    candidates.forEach((el) => {
      if (!el || el.id === "app-root") return;
      const tag = (el.tagName || "").toUpperCase();
      if (["HEAD", "BODY", "SCRIPT", "STYLE", "LINK", "META", "NOSCRIPT"].includes(tag)) return;
      const cls = typeof el.className === "string" ? el.className : "";
      if (/goog|skiptranslate/i.test((el.id || "") + " " + cls)) return;

      const attrText = Array.from(el.attributes || []).map((a) => `${a.name}=${a.value}`).join(" ");
      const shadowText = el.shadowRoot ? (el.shadowRoot.innerHTML || "") : "";
      const htmlSample = (el.outerHTML || "").slice(0, 2000);
      const textSample = (el.textContent || "").slice(0, 500);
      const cs = window.getComputedStyle ? window.getComputedStyle(el) : null;
      const bottomVal = cs ? parseFloat(cs.bottom) : NaN;
      const rightVal = cs ? parseFloat(cs.right) : NaN;
      const isFixedBottomRight =
        cs &&
        cs.position === "fixed" &&
        !Number.isNaN(bottomVal) &&
        bottomVal >= 0 &&
        bottomVal <= 80 &&
        !Number.isNaN(rightVal) &&
        rightVal >= 0 &&
        rightVal <= 80;
      const isEmptyShadowHost = el.children.length === 0 && textSample.trim() === "";

      if (
        /netlify/i.test(tag + " " + attrText + " " + htmlSample + " " + textSample + " " + shadowText) ||
        isFixedBottomRight ||
        isEmptyShadowHost
      ) {
        if (el.shadowRoot) {
          const hideStyle = document.createElement("style");
          hideStyle.textContent = "* { display: none !important; visibility: hidden !important; opacity: 0 !important; }";
          el.shadowRoot.appendChild(hideStyle);
        }
        el.style.setProperty("display", "none", "important");
        el.style.setProperty("visibility", "hidden", "important");
        el.style.setProperty("opacity", "0", "important");
        el.style.setProperty("pointer-events", "none", "important");
        el.remove();
      }
    });
  }

  removeInjectedHostBadges();
  window.addEventListener("load", removeInjectedHostBadges);
  [250, 800, 2000].forEach((ms) => setTimeout(removeInjectedHostBadges, ms));

  if (typeof MutationObserver !== "undefined") {
    const badgeObserver = new MutationObserver(() => removeInjectedHostBadges());
    if (document.documentElement) badgeObserver.observe(document.documentElement, { childList: true });
    if (document.body) badgeObserver.observe(document.body, { childList: true });
  }
});
