// 서울메이트 (Seoulmate) - K-뷰티 버티컬 커머스 모바일 웹 애플리케이션
// - 상단 체계적 쇼핑 GNB (투데이 · 베스트 · 스킨케어 · 메이크업 · 브랜드 · 루틴특가)
// - 하단 5대 쇼핑 탭바 (홈 · 카테고리 · 크리에이터 · 찜 · 마이) - 상하단 메뉴 중복 제로
// - 화장품 쇼핑 시 피부고민·피부타입·퍼스널컬러 카테고리 필터 및 정렬 지원
// - 다국어 (RO / EN / 한국어) 실시간 전환, easybox 락커 배송, EU CPNP 정품 보증

document.addEventListener("DOMContentLoaded", () => {
  const data = window.SEOULMATE_DATA;
  const i18n = window.SEOULMATE_I18N;

  // 인라인 SVG 벡터 아이콘 시스템
  const ICONS = {
    back: `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`,
    search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    bag: `<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    heart: `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    home: `<svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20V9.5z"/><polyline points="9 21.5 9 13 15 13 15 21.5"/></svg>`,
    category: `<svg viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="14" y2="18"/></svg>`,
    feed: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor"/></svg>`,
    user: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    shield: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    droplet: `<svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    flask: `<svg viewBox="0 0 24 24"><path d="M9 3h6"/><path d="M10 9l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3h-4v6z"/></svg>`,
    cream: `<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="3"/><path d="M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/><line x1="4" y1="14" x2="20" y2="14"/></svg>`,
    sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></svg>`,
    bubbles: `<svg viewBox="0 0 24 24"><circle cx="9.5" cy="14.5" r="5.5"/><circle cx="16.5" cy="7.5" r="3.5"/><circle cx="18" cy="16.5" r="2"/></svg>`,
    lipstick: `<svg viewBox="0 0 24 24"><path d="M9 11h6v10H9z"/><path d="M10 11V5.5c0-1.5 4-2.5 4 0V11"/><line x1="8" y1="21" x2="16" y2="21"/></svg>`,
    mask: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="8" ry="9.5"/><circle cx="9" cy="10.5" r="1.2"/><circle cx="15" cy="10.5" r="1.2"/><path d="M9.5 15.5c1.5 1 3.5 1 5 0"/></svg>`,
    gift: `<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>`,
    sparkle: `<svg viewBox="0 0 24 24"><path d="M12 2l2.6 5.8L20.5 10l-5.9 2.2L12 18l-2.6-5.8L3.5 10l5.9-2.2L12 2z"/></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`
  };

  // 애플리케이션 전역 상태
  const savedViewMode = localStorage.getItem("seoulmate_view_mode") || (window.innerWidth >= 992 ? "pc" : "mobile");
  const state = {
    viewMode: savedViewMode, // 'pc' | 'mobile'
    lang: "ro", // 'ro' | 'en' | 'ko'
    activeTab: "home", // 'home' | 'category' | 'creators' | 'wishlist' | 'my' | 'shop' | 'auth' | 'seller'
    homeSubTab: "today", // 'today' | 'best' | 'skincare' | 'makeup' | 'brands' | 'sets'
    historyStack: ["home"],

    // 히어로 배너 슬라이더
    currentSlide: 0,
    totalSlides: data.heroSlides.length,
    slideInterval: null,

    // 실시간 검색어
    searchQuery: "",

    // 홈 & 버티컬 탭별 필터 상태
    homeConcern: "all", // 'all' | 'soothing' | 'pores' | 'hydration' | 'glow'
    bestCategory: "all",
    bestSkinType: "all", // 'all' | 'Mixt' | 'Gras' | 'Sensibil' | 'Uscat'
    skincareCategory: "all",
    skincareConcern: "all",
    skincareSkinType: "all",
    makeupSub: "all", // 'all' | 'base' | 'lip'
    makeupTone: "all", // 'all' | 'Rece' | 'Cald' | 'Neutru'
    selectedBrand: "all",
    setsSkinType: "all",
    creatorSkinFilter: "all",

    // 상품 목록(shop) 필터 및 정렬 상태
    selectedCategory: "all",
    shopConcern: "all",
    shopSkinType: "all",
    shopBrand: "all",
    sortBy: "popular", // 'popular' | 'reviews' | 'priceLow' | 'discount'

    // 회원, 크리에이터 및 판매자(Creator Commerce) 파트너
    authRole: "consumer", // 'consumer' | 'creator'
    authSubmitted: false,
    // 기본 상태: 항상 비로그인(게스트) 상태로 시작
    currentUser: null,
    // 현재 로그인된 크리에이터 정보 (null이면 일반 모드)
    currentCreator: null,
    creatorProducts: [], // 크리에이터가 직접 큐레이션/업로드한 상품 목록
    sellerProfile: {
      isSeller: true,
      companyName: "ANUA Official Partner (Romania)",
      brandName: "Anua",
      bizNumber: "RO-29384910",
      cpnpNumber: "CPNP-EU-3984021",
      contactName: "Elena Popescu",
      contactEmail: "partner@seoulmate.ro",
      contactPhone: "+40 721 123 456",
      myProducts: []
    },

    // 장바구니 / 찜 / 팔로우
    cart: [],
    wishlist: new Set(["anua-toner-77", "skin1004-centella-ampoule", "boj-relief-sun"]),
    followedCreators: new Set(["mariazvinca"]),

    // 물류 / 결제
    selectedLocker: data.easyboxLockers[0],
    paymentMethod: "ramburs",
    lastOrder: null,

    // 모달 및 토스트
    activeModal: null,
    selectedProduct: null,
    toastMessage: null,
    toastTimer: null
  };

  // 초기 뷰 모드 클래스 설정
  if (state.viewMode === "pc") {
    document.body.classList.add("is-pc-mode");
  } else {
    document.body.classList.remove("is-pc-mode");
  }

  function t(key) {
    const dict = i18n[state.lang] || i18n.ro;
    return dict[key] !== undefined ? dict[key] : key;
  }

  function tr(roText, enText, koText) {
    if (state.lang === "ko") return koText;
    if (state.lang === "en") return enText;
    return roText;
  }

  // ==========================================================================
  // [크리에이터 커머스(판매자=크리에이터) 인증 및 세션 관리]
  // ==========================================================================
  function isCreatorLoggedIn() {
    return state.currentUser && state.currentUser.role === "creator" && state.currentCreator !== null;
  }

  function isConsumerLoggedIn() {
    return state.currentUser !== null;
  }

  function loginAsConsumer(name, email, city) {
    state.currentUser = {
      isLoggedIn: true,
      role: "consumer",
      name: name || "Elena Popescu",
      email: email || "elena.popescu@gmail.com",
      city: city || "București"
    };
    state.currentCreator = null;
    showToast(tr("Autentificat ca Utilizator!", "Logged in as Consumer!", "일반 회원으로 로그인되었습니다!"));
  }

  function loginAsCreator(creatorId) {
    const creator = data.creators.find((c) => c.id === creatorId) || data.creators[0];
    state.currentUser = {
      isLoggedIn: true,
      role: "creator",
      name: creator.name,
      email: `${creator.id}@creator.seoulmate.ro`,
      city: creator.city || "București"
    };
    state.currentCreator = creator;
    // 기존 크리에이터의 루틴 상품이 있으면 큐레이션 목록으로 초기 동기화
    if (!state.creatorProducts || state.creatorProducts.length === 0) {
      const routineProdIds = creator.routine?.productIds || [];
      state.creatorProducts = data.products.filter((p) => routineProdIds.includes(p.id));
    }
    showToast(
      tr(
        `Autentificat ca ${creator.name} (${creator.handle})`,
        `Logged in as ${creator.name} (${creator.handle})`,
        `${creator.name} (${creator.handle}) 크리에이터 계정으로 로그인되었습니다!`
      )
    );
  }

  function logoutUser() {
    state.currentUser = null;
    state.currentCreator = null;
    showToast(tr("Te-ai deconectat.", "Logged out successfully.", "로그아웃되었습니다."));
  }

  function logoutCreator() {
    logoutUser();
  }

  function registerNewCreator(name, handle, city, skinType) {
    const cleanHandle = handle.trim().startsWith("@") ? handle.trim() : `@${handle.trim()}`;
    const id = cleanHandle.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || `creator_${Date.now()}`;
    const newCreator = {
      id: id,
      handle: cleanHandle,
      name: name.trim(),
      city: city || "București",
      followers: "50K+",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      skinProfile: {
        type: skinType || "Mixt",
        concerns: ["Pori", "Calmare"],
        undertone: "Neutru",
        style: "Natural"
      },
      routine: {
        titleKo: `${name}의 K-뷰티 데일리 큐레이션 세트`,
        titleEn: `${name}'s Daily K-Beauty Curation Set`,
        title: `Rutina lui ${name}: K-Beauty Glow`,
        productIds: []
      }
    };
    data.creators.unshift(newCreator);
    state.currentUser = {
      isLoggedIn: true,
      role: "creator",
      name: newCreator.name,
      email: `${id}@creator.seoulmate.ro`,
      city: newCreator.city
    };
    state.currentCreator = newCreator;
    state.creatorProducts = [];
    showToast(tr("Bun venit în Creator Studio!", "Welcome to Creator Studio!", "크리에이터 스튜디오 입점을 환영합니다!"));
  }

  function getProductDisplayName(prod) {
    if (state.lang === "ko") return prod.koreanName || prod.name;
    if (state.lang === "en") return prod.englishName || prod.name;
    return prod.name;
  }

  function getSkinTypeLabel(typeKey) {
    const map = {
      all: t("skinAll"),
      Mixt: t("skinMixt"),
      Gras: t("skinGras"),
      Sensibil: t("skinSensibil"),
      Uscat: t("skinUscat")
    };
    return map[typeKey] || typeKey;
  }

  function getConcernLabel(concernKey) {
    const map = {
      all: t("concernAll"),
      soothing: t("concernSoothing"),
      pores: t("concernPores"),
      hydration: t("concernHydration"),
      glow: t("concernGlow")
    };
    return map[concernKey] || concernKey;
  }

  function getUndertoneLabel(toneKey) {
    const map = {
      all: t("toneAll"),
      Rece: t("toneCool"),
      Cald: t("toneWarm"),
      Neutru: t("toneNeutral")
    };
    return map[toneKey] || toneKey;
  }

  function getCategoriesMeta() {
    return [
      {
        key: "all",
        label: t("catAllSkincare"),
        shortLabel: t("concernAll"),
        iconSvg: ICONS.sparkle,
        count: data.products.length
      },
      {
        key: "Toner & Tampoane",
        label: t("quickToners"),
        shortLabel: t("quickToners"),
        iconSvg: ICONS.droplet,
        count: data.products.filter((p) => p.category === "Toner & Tampoane").length
      },
      {
        key: "Serum & Fiole",
        label: t("quickSerums"),
        shortLabel: t("quickSerums"),
        iconSvg: ICONS.flask,
        count: data.products.filter((p) => p.category === "Serum & Fiole").length
      },
      {
        key: "Creme & Hidratare",
        label: t("quickCreams"),
        shortLabel: t("quickCreams"),
        iconSvg: ICONS.cream,
        count: data.products.filter((p) => p.category === "Creme & Hidratare").length
      },
      {
        key: "Protecție Solară",
        label: t("quickSPF"),
        shortLabel: t("quickSPF"),
        iconSvg: ICONS.sun,
        count: data.products.filter((p) => p.category === "Protecție Solară").length
      },
      {
        key: "Curățare",
        label: t("quickCleanser"),
        shortLabel: t("quickCleanser"),
        iconSvg: ICONS.bubbles,
        count: data.products.filter((p) => p.category === "Curățare").length
      },
      {
        key: "Machiaj",
        label: t("quickMakeup"),
        shortLabel: t("quickMakeup"),
        iconSvg: ICONS.lipstick,
        count: data.products.filter((p) => p.category === "Machiaj").length
      },
      {
        key: "Măști & Tampoane",
        label: t("quickMask"),
        shortLabel: t("quickMask"),
        iconSvg: ICONS.mask,
        count: data.products.filter((p) => p.category === "Măști & Tampoane").length
      }
    ];
  }

  function sortProducts(list, sortKey) {
    const cloned = [...list];
    if (sortKey === "reviews") {
      cloned.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sortKey === "priceLow") {
      cloned.sort((a, b) => a.price - b.price);
    } else if (sortKey === "discount") {
      cloned.sort((a, b) => b.discount - a.discount || b.reviewsCount - a.reviewsCount);
    } else {
      // popular (기본)
      cloned.sort((a, b) => (b.rating * 120 + b.reviewsCount) - (a.rating * 120 + a.reviewsCount));
    }
    return cloned;
  }

  function filterBySearch(query) {
    const q = (query || "").trim().toLowerCase();
    if (!q) return data.products;
    return data.products.filter((p) => {
      const haystack = [
        p.name,
        p.koreanName,
        p.romanianName,
        p.englishName,
        p.brand,
        p.category,
        ...(p.concerns || []).map((c) => getConcernLabel(c)),
        ...(p.skinTypes || []).map((s) => getSkinTypeLabel(s))
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  function showToast(msg) {
    if (state.toastTimer) clearTimeout(state.toastTimer);
    state.toastMessage = msg;
    state.toastTimer = setTimeout(() => {
      state.toastMessage = null;
      const el = document.querySelector(".ably-toast");
      if (el) el.remove();
    }, 2200);
  }

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
    } else if (tab === "home") {
      state.homeSubTab = "today";
      state.searchQuery = "";
      render();
      resetScroll();
    }
  }

  function setViewMode(mode) {
    state.viewMode = mode === "pc" ? "pc" : "mobile";
    try {
      localStorage.setItem("seoulmate_view_mode", state.viewMode);
    } catch (_) {}
    if (document.body) {
      document.body.classList.toggle("is-pc-mode", state.viewMode === "pc");
    }
    render();
  }

  function openShopWithFilters({ category = "all", concern = "all", skinType = "all", brand = "all" } = {}) {
    state.selectedCategory = category;
    state.shopConcern = concern;
    state.shopSkinType = skinType;
    state.shopBrand = brand;
    if (state.activeTab !== "shop") {
      state.historyStack.push("shop");
      state.activeTab = "shop";
    }
    render();
    resetScroll();
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
      counter.innerText = `${state.currentSlide + 1} / ${state.totalSlides} ›`;
    }
  }

  function startAutoSlide() {
    if (state.slideInterval) clearInterval(state.slideInterval);
    state.slideInterval = setInterval(() => {
      if (state.activeTab === "home" && state.homeSubTab === "today" && !state.searchQuery.trim()) {
        nextSlide();
      }
    }, 4500);
  }

  startAutoSlide();

  const appContainer = document.getElementById("app-root");

  function getHeaderTitle() {
    if (state.activeTab === "shop") {
      if (state.shopBrand !== "all") return state.shopBrand;
      if (state.selectedCategory !== "all") {
        const found = getCategoriesMeta().find((c) => c.key === state.selectedCategory);
        if (found) return found.label;
      }
      if (state.shopConcern !== "all") return getConcernLabel(state.shopConcern);
      if (state.shopSkinType !== "all") return getSkinTypeLabel(state.shopSkinType);
      return t("tabShop");
    }
    const map = {
      category: t("tabCategory"),
      creators: t("tabCreators"),
      wishlist: t("tabWishlist"),
      my: t("tabMy"),
      auth: t("tabAuth"),
      seller: tr("Creator Studio", "Creator Studio", "크리에이터 스튜디오 (Creator Studio)")
    };
    return map[state.activeTab] || "";
  }

  function render() {
    const isHome = state.activeTab === "home";
    const cartQty = state.cart.reduce((acc, item) => acc + item.qty, 0);
    const wishCount = state.wishlist.size;

    appContainer.innerHTML = `
      <div class="seoulmate-wrapper">
        ${state.toastMessage ? `<div class="ably-toast">${state.toastMessage}</div>` : ""}

        <div class="phone-frame">
          <!-- 상단 스토어 헤더 -->
          <header class="ably-header">
            <div class="ably-header-top">
              <div class="ably-header-left">
                ${
                  !isHome
                    ? `
                  <button class="ably-back-btn" id="btn-global-back" title="${t("backBtn")}">
                    ${ICONS.back}
                    <span class="ably-page-title">${getHeaderTitle()}</span>
                  </button>
                `
                    : `
                  <div class="ably-logo" id="btn-logo-home">
                    SEOULMATE<span class="logo-dot">.</span>
                  </div>
                `
                }
              </div>

              <div class="ably-header-actions">
                ${
                  isCreatorLoggedIn()
                    ? `
                  <!-- 크리에이터 로그인 시에만 노출되는 스튜디오 바로가기 -->
                  <button class="btn-seller-hub" id="btn-header-seller" data-tab="seller" title="크리에이터 스튜디오 (Creator Studio)">
                    🌸 ${tr("Studio", "Studio", "스튜디오")}
                  </button>
                `
                    : ""
                }

                <div class="lang-selector" role="group" aria-label="Language">
                  <button class="lang-pill ${state.lang === "ro" ? "active" : ""}" data-set-lang="ro">RO</button>
                  <button class="lang-pill ${state.lang === "en" ? "active" : ""}" data-set-lang="en">EN</button>
                  <button class="lang-pill ${state.lang === "ko" ? "active" : ""}" data-set-lang="ko">한국어</button>
                </div>

                <!-- 인라인 뷰모드 토글 버튼 -->
                <button class="view-mode-pill" id="btn-toggle-viewmode" title="PC 전체화면 / 모바일 뷰 전환 (Alt+P)">
                  ${state.viewMode === "pc" ? "📱 모바일" : "🖥️ PC모드"}
                </button>

                <button class="icon-btn" id="btn-nav-search" aria-label="Search">${ICONS.search}</button>
                <button class="icon-btn" id="btn-header-cart" aria-label="Cart">
                  ${ICONS.bag}
                  ${cartQty > 0 ? `<span class="icon-badge">${cartQty}</span>` : ""}
                </button>
              </div>
            </div>

            ${
              isHome
                ? `
              <div class="ably-search-bar">
                ${ICONS.search}
                <input type="text" id="main-search-input" placeholder="${t("searchPlaceholder")}" value="${state.searchQuery.replace(/"/g, "&quot;")}" autocomplete="off" />
                <button class="btn-clear-search ${state.searchQuery ? "" : "hidden"}" id="btn-clear-search" aria-label="Clear">✕</button>
              </div>

              <!-- 에이블리·올리브영형 상단 버티컬 쇼핑 GNB (하단 탭바와 중복 제로) -->
              <div class="ably-subnav-container">
                <nav class="ably-subnav" id="subnav-scroll">
                  <button class="subnav-tab ${state.homeSubTab === "today" ? "active" : ""}" data-subtab="today">${t("gnbToday")}</button>
                  <button class="subnav-tab ${state.homeSubTab === "best" ? "active" : ""}" data-subtab="best">${t("gnbBest")}</button>
                  <button class="subnav-tab ${state.homeSubTab === "skincare" ? "active" : ""}" data-subtab="skincare">${t("gnbSkincare")}</button>
                  <button class="subnav-tab ${state.homeSubTab === "makeup" ? "active" : ""}" data-subtab="makeup">${t("gnbMakeup")}</button>
                  <button class="subnav-tab ${state.homeSubTab === "brands" ? "active" : ""}" data-subtab="brands">${t("gnbBrands")}</button>
                  <button class="subnav-tab ${state.homeSubTab === "sets" ? "active" : ""}" data-subtab="sets">${t("gnbSets")}</button>
                </nav>
              </div>
            `
                : ""
            }

            <div class="ably-trust-strip" id="btn-show-trust">
              <div class="trust-strip-left">
                <span class="trust-badge-mini">CPNP</span>
                <span class="trust-strip-text">${t("trustTicker")}</span>
              </div>
              <span class="trust-strip-arrow">›</span>
            </div>
          </header>

          <!-- 메인 스크롤 영역 -->
          <main class="app-main-content" id="main-scroll-area">
            ${renderActiveView()}
          </main>

          <!-- 하단 고정 4대 쇼핑 탭바 (홈 · 카테고리 · 찜 · 마이) -->
          <nav class="app-bottom-nav">
            <button class="nav-item ${state.activeTab === "home" ? "active" : ""}" data-bottom-tab="home">
              ${ICONS.home}
              <span class="nav-label">${t("tabHome")}</span>
            </button>
            <button class="nav-item ${state.activeTab === "category" || state.activeTab === "shop" ? "active" : ""}" data-bottom-tab="category">
              ${ICONS.category}
              <span class="nav-label">${t("tabCategory")}</span>
            </button>
            <button class="nav-item ${state.activeTab === "wishlist" ? "active" : ""}" data-bottom-tab="wishlist">
              <span class="nav-icon-wrap">
                ${ICONS.heart}
                ${wishCount > 0 ? `<span class="nav-dot-badge">${wishCount}</span>` : ""}
              </span>
              <span class="nav-label">${t("tabWishlist")}</span>
            </button>
            <button class="nav-item ${state.activeTab === "my" || state.activeTab === "auth" || state.activeTab === "seller" ? "active" : ""}" data-bottom-tab="my">
              ${ICONS.user}
              <span class="nav-label">${t("tabMy")}</span>
            </button>
          </nav>
        </div>

        <!-- 모달 / 바텀시트 컨테이너 -->
        <div id="modal-container">
          ${renderActiveModal()}
        </div>
      </div>
    `;

    attachEventListeners();
  }

  function renderActiveView() {
    switch (state.activeTab) {
      case "home":
        return `<div class="ably-home-page" id="home-dynamic-body">${renderHomeBody()}</div>`;
      case "category":
        return renderCategoryTab();
      case "shop":
        return renderShopTab();
      case "creators":
        return renderCreatorsTab();
      case "wishlist":
        return renderWishlistTab();
      case "my":
        return renderMyTab();
      case "auth":
        return renderAuthTab();
      case "seller":
        return renderSellerStudioTab();
      default:
        return `<div class="ably-home-page" id="home-dynamic-body">${renderHomeBody()}</div>`;
    }
  }

  // ==========================================================================
  // [홈 & 상단 6대 쇼핑 GNB 버티컬]
  // ==========================================================================
  function renderHomeBody() {
    if (state.searchQuery.trim()) {
      return renderSearchResultsView();
    }
    switch (state.homeSubTab) {
      case "best":
        return renderHomeBestSubTab();
      case "skincare":
        return renderHomeSkincareSubTab();
      case "makeup":
        return renderHomeMakeupSubTab();
      case "brands":
        return renderHomeBrandsSubTab();
      case "sets":
        return renderHomeSetsSubTab();
      case "today":
      default:
        return renderHomeTodaySubTab();
    }
  }

  function renderSearchResultsView() {
    const results = filterBySearch(state.searchQuery);
    const popularKeywords = ["Anua", "SKIN1004", "SPF", "PDRN", "Cushion", "Rom&nd"];
    return `
      <section class="ably-section">
        <div class="sort-toolbar" style="margin-bottom:14px;">
          <span class="sort-count">
            <strong>"${state.searchQuery.replace(/</g, "&lt;")}"</strong> · ${results.length} ${t("totalCountSuffix")}
          </span>
          <button class="filter-reset-inline" id="btn-reset-search-inline">
            ${tr("Șterge căutarea ✕", "Clear search ✕", "검색 초기화 ✕")}
          </button>
        </div>

        ${
          results.length > 0
            ? `<div class="ably-product-grid">
                ${results.map((prod, idx) => renderProductCard(prod, idx + 1, false)).join("")}
              </div>`
            : `<div class="empty-state-box">
                <p class="empty-state-text">${tr("Niciun produs găsit pentru această căutare.", "No matching products found.", "일치하는 상품이 없습니다. 추천 키워드로 검색해 보세요.")}</p>
                <div class="keyword-suggest-row">
                  ${popularKeywords.map((kw) => `<button class="filter-chip" data-search-kw="${kw}">#${kw}</button>`).join("")}
                </div>
              </div>`
        }
      </section>
    `;
  }

  // 1) 투데이 (메인 스토어 홈)
  function renderHomeTodaySubTab() {
    const concernFiltered =
      state.homeConcern === "all"
        ? data.products
        : data.products.filter((p) => (p.concerns || []).includes(state.homeConcern));

    const bestTop6 = [...data.products].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 6);
    const featuredCreator = data.creators[0];
    const featuredRoutine = featuredCreator.routine;
    const routineTitle = tr(featuredRoutine.title, featuredRoutine.titleEn, featuredRoutine.titleKo || featuredRoutine.titleEn);

    return `
      <!-- 1. 인터랙티브 히어로 배너 슬라이더 -->
      <section class="hero-slider-wrap" id="hero-slider-section">
        <div class="hero-slider-track" id="hero-track" style="transform: translateX(-${state.currentSlide * 100}%);">
          ${data.heroSlides
            .map((slide, idx) => {
              const tag = tr(slide.tagRo, slide.tagEn, slide.tagKo || slide.tagEn);
              const headline = tr(slide.headlineRo, slide.headlineEn, slide.headlineKo || slide.headlineEn);
              const subline = tr(slide.sublineRo, slide.sublineEn, slide.sublineKo || slide.sublineEn);
              const cleanHeadline = headline.replace(/<br\s*\/?>/gi, " ").replace(/'/g, "\\'");
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
            })
            .join("")}
        </div>
        <button class="hero-arrow-btn prev" id="btn-hero-prev" aria-label="Previous">${ICONS.chevronLeft}</button>
        <button class="hero-arrow-btn next" id="btn-hero-next" aria-label="Next">${ICONS.chevronRight}</button>
        <div class="hero-counter-badge" id="hero-counter-num">${state.currentSlide + 1} / ${state.totalSlides} ›</div>
      </section>

      <!-- 2. 에이블리·올리브영 스타일 4x2 품목 퀵 카테고리 그리드 -->
      <section class="quick-cat-section">
        <div class="quick-cat-grid">
          <button class="quick-cat-item" data-open-cat="Toner & Tampoane">
            <div class="quick-cat-icon tone-blue">${ICONS.droplet}</div>
            <span class="quick-cat-label">${t("quickToners")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Serum & Fiole">
            <div class="quick-cat-icon tone-rose">${ICONS.flask}</div>
            <span class="quick-cat-label">${t("quickSerums")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Creme & Hidratare">
            <div class="quick-cat-icon tone-green">${ICONS.cream}</div>
            <span class="quick-cat-label">${t("quickCreams")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Protecție Solară">
            <div class="quick-cat-icon tone-amber">${ICONS.sun}</div>
            <span class="quick-cat-label">${t("quickSPF")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Curățare">
            <div class="quick-cat-icon tone-purple">${ICONS.bubbles}</div>
            <span class="quick-cat-label">${t("quickCleanser")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Machiaj">
            <div class="quick-cat-icon tone-pink">${ICONS.lipstick}</div>
            <span class="quick-cat-label">${t("quickMakeup")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Măști & Tampoane">
            <div class="quick-cat-icon tone-cyan">${ICONS.mask}</div>
            <span class="quick-cat-label">${t("quickMask")}</span>
          </button>
          <button class="quick-cat-item" data-subtab="sets">
            <div class="quick-cat-icon tone-coral featured">${ICONS.gift}</div>
            <span class="quick-cat-label accent">${t("quickSets")}</span>
          </button>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- 3. 피부고민별 맞춤 추천 (별도 퀴즈 탭 대신 직관적인 쇼핑 카테고리 필터로 제공) -->
      <section class="ably-section">
        <div class="ably-section-head">
          <div class="section-title-wrap">
            <h3>${t("concernSectionTitle")}</h3>
            <p>${t("concernSectionSub")}</p>
          </div>
          <button class="section-more-link" id="btn-more-concern">${t("seeAll")}</button>
        </div>

        <div class="filter-chips-scroll" style="margin-bottom:14px;">
          ${["all", "soothing", "pores", "hydration", "glow"]
            .map(
              (ck) => `
              <button class="filter-chip ${state.homeConcern === ck ? "active" : ""}" data-home-concern="${ck}">
                ${getConcernLabel(ck)}
              </button>
            `
            )
            .join("")}
        </div>

        <div class="ably-product-grid">
          ${concernFiltered.slice(0, 6).map((prod, idx) => renderProductCard(prod, idx + 1, false)).join("")}
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- 4. 실시간 인기 베스트 랭킹 -->
      <section class="ably-section">
        <div class="ably-section-head">
          <div class="section-title-wrap">
            <h3>${t("trendingTitle")}</h3>
            <p>${t("trendingSub")}</p>
          </div>
          <button class="section-more-link" data-subtab="best">${t("seeAll")}</button>
        </div>

        <div class="ably-product-grid">
          ${bestTop6.map((prod, idx) => renderProductCard(prod, idx + 1, true)).join("")}
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- 5. 크리에이터 3단계 루틴 세트 특가 -->
      <section class="ably-section">
        <div class="ably-section-head">
          <div class="section-title-wrap">
            <h3>${t("spotlightTitle")}</h3>
            <p>${t("spotlightSub")}</p>
          </div>
          <button class="section-more-link" data-subtab="sets">${t("seeAll")}</button>
        </div>

        ${renderRoutineBundleCard(featuredCreator, routineTitle)}
      </section>

      <div class="section-divider"></div>

      <!-- 6. EU CPNP 공식 정품 보증 배너 -->
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
    `;
  }

  // 2) 베스트 (실시간 판매/리뷰 랭킹 + 품목·피부타입별 랭킹 필터)
  function renderHomeBestSubTab() {
    const categories = getCategoriesMeta();
    let list = [...data.products];
    if (state.bestCategory !== "all") {
      list = list.filter((p) => p.category === state.bestCategory);
    }
    if (state.bestSkinType !== "all") {
      list = list.filter((p) => (p.skinTypes || []).includes(state.bestSkinType));
    }
    list.sort((a, b) => b.reviewsCount - a.reviewsCount || b.rating - a.rating);

    return `
      <div class="subtab-sticky-filters">
        <div class="filter-chips-scroll">
          ${categories
            .map(
              (c) => `
              <button class="filter-chip ${state.bestCategory === c.key ? "active" : ""}" data-best-cat="${c.key}">
                ${c.key === "all" ? t("concernAll") : c.shortLabel}
              </button>
            `
            )
            .join("")}
        </div>
        <div class="filter-chips-scroll sub-row">
          ${["all", "Mixt", "Gras", "Sensibil", "Uscat"]
            .map(
              (st) => `
              <button class="sub-filter-pill ${state.bestSkinType === st ? "active" : ""}" data-best-skin="${st}">
                ${getSkinTypeLabel(st)}
              </button>
            `
            )
            .join("")}
        </div>
      </div>

      <section class="ably-section" style="padding-top:14px;">
        <div class="sort-toolbar">
          <span class="sort-count">${list.length} ${t("totalCountSuffix")}</span>
          <span class="ranking-meta-badge">${tr("Actualizat după recenzii & vânzări", "Ranked by verified reviews & sales", "실시간 판매·리뷰 랭킹 기준")}</span>
        </div>
        <div class="ably-product-grid">
          ${list.map((prod, idx) => renderProductCard(prod, idx + 1, true)).join("")}
        </div>
      </section>
    `;
  }

  // 3) 스킨케어 버티컬 (스킨케어 세부 품목 + 피부고민 + 피부타입 + 정렬)
  function renderHomeSkincareSubTab() {
    const skincareCats = getCategoriesMeta().filter((c) => c.key !== "Machiaj");
    let list = data.products.filter((p) => p.category !== "Machiaj");

    if (state.skincareCategory !== "all") {
      list = list.filter((p) => p.category === state.skincareCategory);
    }
    if (state.skincareConcern !== "all") {
      list = list.filter((p) => (p.concerns || []).includes(state.skincareConcern));
    }
    if (state.skincareSkinType !== "all") {
      list = list.filter((p) => (p.skinTypes || []).includes(state.skincareSkinType));
    }
    list = sortProducts(list, state.sortBy);

    return `
      <div class="subtab-sticky-filters">
        <div class="filter-chips-scroll">
          ${skincareCats
            .map(
              (c) => `
              <button class="filter-chip ${state.skincareCategory === c.key ? "active" : ""}" data-skincare-cat="${c.key}">
                ${c.key === "all" ? t("concernAll") : c.shortLabel}
              </button>
            `
            )
            .join("")}
        </div>
        <div class="filter-chips-scroll sub-row">
          ${["all", "soothing", "pores", "hydration", "glow"]
            .map(
              (ck) => `
              <button class="sub-filter-pill ${state.skincareConcern === ck ? "active" : ""}" data-skincare-concern="${ck}">
                ${ck === "all" ? tr("Toate nevoile", "All Concerns", "고민 전체") : getConcernLabel(ck)}
              </button>
            `
            )
            .join("")}
        </div>
        <div class="filter-chips-scroll sub-row">
          ${["all", "Mixt", "Gras", "Sensibil", "Uscat"]
            .map(
              (st) => `
              <button class="sub-filter-pill ${state.skincareSkinType === st ? "active" : ""}" data-skincare-skin="${st}">
                ${getSkinTypeLabel(st)}
              </button>
            `
            )
            .join("")}
        </div>
      </div>

      <section class="ably-section" style="padding-top:12px;">
        ${renderSortToolbar(list.length)}
        ${
          list.length > 0
            ? `<div class="ably-product-grid">
                ${list.map((prod, idx) => renderProductCard(prod, idx + 1, false)).join("")}
              </div>`
            : renderFilterEmptyState("reset-skincare-filters")
        }
      </section>
    `;
  }

  // 4) 메이크업 버티컬 (쿠션·베이스 / 립·틴트 + 퍼스널컬러 쿨톤·웜톤·뉴트럴 필터)
  function renderHomeMakeupSubTab() {
    let list = data.products.filter((p) => p.category === "Machiaj");
    if (state.makeupSub !== "all") {
      list = list.filter((p) => p.subMakeup === state.makeupSub);
    }
    if (state.makeupTone !== "all") {
      list = list.filter((p) => p.undertone === state.makeupTone);
    }
    list = sortProducts(list, state.sortBy);

    const makeupTabs = [
      { key: "all", label: t("makeupAll") },
      { key: "base", label: t("makeupBase") },
      { key: "lip", label: t("makeupLip") }
    ];

    return `
      <div class="subtab-sticky-filters">
        <div class="filter-chips-scroll">
          ${makeupTabs
            .map(
              (mt) => `
              <button class="filter-chip ${state.makeupSub === mt.key ? "active" : ""}" data-makeup-sub="${mt.key}">
                ${mt.label}
              </button>
            `
            )
            .join("")}
        </div>
        <div class="filter-chips-scroll sub-row">
          ${["all", "Rece", "Cald", "Neutru"]
            .map(
              (tn) => `
              <button class="sub-filter-pill ${state.makeupTone === tn ? "active" : ""}" data-makeup-tone="${tn}">
                ${getUndertoneLabel(tn)}
              </button>
            `
            )
            .join("")}
        </div>
      </div>

      <section class="ably-section" style="padding-top:12px;">
        ${renderSortToolbar(list.length)}
        ${
          list.length > 0
            ? `<div class="ably-product-grid">
                ${list.map((prod, idx) => renderProductCard(prod, idx + 1, false)).join("")}
              </div>`
            : renderFilterEmptyState("reset-makeup-filters")
        }
      </section>
    `;
  }

  // 5) 브랜드관 (공식 입점 9대 K-뷰티 브랜드 디렉토리 및 브랜드별 상품관)
  function renderHomeBrandsSubTab() {
    const activeBrandObj = data.brands.find((b) => b.id === state.selectedBrand);
    let list =
      state.selectedBrand === "all"
        ? [...data.products]
        : data.products.filter((p) => p.brand === state.selectedBrand);
    list = sortProducts(list, state.sortBy);

    return `
      <div class="subtab-sticky-filters">
        <div class="filter-chips-scroll">
          <button class="filter-chip ${state.selectedBrand === "all" ? "active" : ""}" data-select-brand="all">
            ${t("concernAll")} (${data.brands.length})
          </button>
          ${data.brands
            .map(
              (b) => `
              <button class="filter-chip ${state.selectedBrand === b.id ? "active" : ""}" data-select-brand="${b.id}">
                ${b.name}
              </button>
            `
            )
            .join("")}
        </div>
      </div>

      <section class="ably-section" style="padding-top:14px;">
        ${
          activeBrandObj
            ? `
          <div class="brand-hero-card">
            <div class="brand-hero-top">
              <div>
                <span class="brand-official-pill">✓ CPNP OFFICIAL PARTNER</span>
                <h3 class="brand-hero-name">${activeBrandObj.name}</h3>
                <p class="brand-hero-tag">${tr(activeBrandObj.tagRo, activeBrandObj.tagEn, activeBrandObj.tagKo)}</p>
              </div>
              <button class="filter-reset-inline" data-select-brand="all">${tr("Toate brandurile", "All Brands", "전체 브랜드")}</button>
            </div>
          </div>
        `
            : `
          <div class="brand-pavilion-grid" style="margin-bottom:18px;">
            ${data.brands
              .map((b) => {
                const count = data.products.filter((p) => p.brand === b.id).length;
                return `
                  <button class="brand-pavilion-card" data-select-brand="${b.id}">
                    <span class="bp-name">${b.name}</span>
                    <span class="bp-desc">${tr(b.tagRo, b.tagEn, b.tagKo)}</span>
                    <span class="bp-count">${count} ${t("totalCountSuffix")} ›</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        `
        }

        ${renderSortToolbar(list.length)}
        <div class="ably-product-grid">
          ${list.map((prod, idx) => renderProductCard(prod, idx + 1, false)).join("")}
        </div>
      </section>
    `;
  }

  // 6) 루틴특가 (피부타입별 3단계 검증 세트 할인)
  function renderHomeSetsSubTab() {
    const creatorsList =
      state.setsSkinType === "all"
        ? data.creators
        : data.creators.filter((c) => c.skinProfile.type === state.setsSkinType);

    return `
      <div class="subtab-sticky-filters">
        <div class="filter-chips-scroll">
          ${["all", "Mixt", "Sensibil", "Gras", "Uscat"]
            .map(
              (st) => `
              <button class="filter-chip ${state.setsSkinType === st ? "active" : ""}" data-sets-skin="${st}">
                ${getSkinTypeLabel(st)}
              </button>
            `
            )
            .join("")}
        </div>
      </div>

      <section class="ably-section" style="padding-top:14px;">
        <div class="ably-section-head" style="margin-bottom:14px;">
          <div class="section-title-wrap">
            <h3>${t("spotlightTitle")}</h3>
            <p>${t("spotlightSub")}</p>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:14px;">
          ${creatorsList
            .map((creator) => {
              const rTitle = tr(creator.routine.title, creator.routine.titleEn, creator.routine.titleKo || creator.routine.titleEn);
              return renderRoutineBundleCard(creator, rTitle);
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderRoutineBundleCard(creator, routineTitle) {
    const routine = creator.routine;
    const routineDesc = tr(routine.description, routine.descriptionEn, routine.descriptionKo || routine.descriptionEn);
    return `
      <div class="creator-match-box">
        <div class="cm-header">
          <img src="${creator.avatar}" class="cm-avatar" alt="${creator.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getAvatar('${creator.name.replace(/'/g, "\\'")}','${creator.handle}')" />
          <div class="cm-info">
            <div class="cm-name-row">
              <span class="cm-name">${creator.name}</span>
              <span class="cm-badge">-${routine.discountPercent}% SET</span>
            </div>
            <p class="cm-meta">${creator.handle} · ${creator.city}</p>
            <div class="cm-chips">
              <span class="cm-chip highlight">${getSkinTypeLabel(creator.skinProfile.type)}</span>
              <span class="cm-chip">${getUndertoneLabel(creator.skinProfile.undertone)}</span>
            </div>
          </div>
        </div>

        <div class="routine-bundle-card">
          <div class="rb-title-row">
            <span class="rb-title">${routineTitle}</span>
            <div class="rb-pricing">
              <span class="rb-discount">-${routine.discountPercent}%</span>
              <span class="rb-price">${routine.bundlePrice} lei</span>
              <span class="rb-original">${routine.originalPrice} lei</span>
            </div>
          </div>
          <p class="rb-desc">${routineDesc}</p>

          <div class="rb-items-grid">
            ${routine.productIds
              .map((pid) => {
                const p = data.products.find((item) => item.id === pid);
                if (!p) return "";
                const pName = getProductDisplayName(p);
                return `
                  <div class="rb-item-thumb" data-product-id="${p.id}">
                    <img src="${p.image}" alt="${pName}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${p.category}','${p.brand}','${p.name.replace(/'/g, "\\'")}')" />
                    <span class="rb-item-brand">${p.brand}</span>
                    <span class="rb-item-name">${pName}</span>
                  </div>
                `;
              })
              .join("")}
          </div>

          <button class="btn-bundle-order" data-creator-id="${creator.id}">
            ${t("buyBundleInstant")} · ${routine.bundlePrice} lei
          </button>
        </div>
      </div>
    `;
  }



  // ==========================================================================
  // [하단 탭 2: 카테고리 디렉토리 (품목별 · 피부고민별 · 피부타입별 · 공식 브랜드관)]
  // ==========================================================================
  function renderCategoryTab() {
    const categories = getCategoriesMeta();
    const concerns = [
      {
        key: "soothing",
        label: t("concernSoothing"),
        desc: tr("Centella · Heartleaf · Anti-roșeață", "Centella · Heartleaf · Redness Care", "어성초 · 시카 · 붉은기 진정"),
        toneClass: "tone-green",
        count: data.products.filter((p) => (p.concerns || []).includes("soothing")).length
      },
      {
        key: "pores",
        label: t("concernPores"),
        desc: tr("AHA/BHA · Curățare pori & sebum", "AHA/BHA · Pore Tightening & Sebum", "모공 수렴 · 피지 · 블랙헤드"),
        toneClass: "tone-blue",
        count: data.products.filter((p) => (p.concerns || []).includes("pores")).length
      },
      {
        key: "hydration",
        label: t("concernHydration"),
        desc: tr("Acid Hialuronic 5D · Colagen · Ceramide", "5D Hyaluronic · Collagen · Barrier", "저분자 히알루론산 · 세라마이드"),
        toneClass: "tone-cyan",
        count: data.products.filter((p) => (p.concerns || []).includes("hydration")).length
      },
      {
        key: "glow",
        label: t("concernGlow"),
        desc: tr("Orez · PDRN · Vitamina & Glass Skin", "Rice · Salmon PDRN · Glass Skin", "쌀 추출물 · 연어 PDRN · 윤광"),
        toneClass: "tone-rose",
        count: data.products.filter((p) => (p.concerns || []).includes("glow")).length
      }
    ];

    const skinTypes = [
      { key: "Mixt", label: t("skinMixt") },
      { key: "Gras", label: t("skinGras") },
      { key: "Sensibil", label: t("skinSensibil") },
      { key: "Uscat", label: t("skinUscat") }
    ];

    return `
      <div class="category-directory-page">
        <!-- 1. 품목별 카테고리 -->
        <section class="ably-section">
          <h3 class="cat-dir-heading">${t("catSecProduct")}</h3>
          <div class="cat-product-grid">
            ${categories
              .map(
                (c) => `
                <button class="cat-product-row" data-dir-cat="${c.key}">
                  <div class="cat-row-left">
                    <span class="cat-row-icon">${c.iconSvg}</span>
                    <span class="cat-row-name">${c.label}</span>
                  </div>
                  <span class="cat-row-right">${c.count} ›</span>
                </button>
              `
              )
              .join("")}
          </div>
        </section>

        <div class="section-divider"></div>

        <!-- 2. 피부고민별 찾기 (화장품 선택 시 피부고민 카테고리 분류) -->
        <section class="ably-section">
          <h3 class="cat-dir-heading">${t("catSecConcern")}</h3>
          <div class="cat-concern-grid">
            ${concerns
              .map(
                (item) => `
                <button class="cat-concern-card ${item.toneClass}" data-dir-concern="${item.key}">
                  <div class="cc-top">
                    <strong>${item.label}</strong>
                    <span class="cc-count">${item.count}</span>
                  </div>
                  <p class="cc-desc">${item.desc}</p>
                </button>
              `
              )
              .join("")}
          </div>
        </section>

        <div class="section-divider"></div>

        <!-- 3. 피부타입별 찾기 -->
        <section class="ably-section">
          <h3 class="cat-dir-heading">${t("catSecSkinType")}</h3>
          <div class="cat-skintype-row">
            ${skinTypes
              .map((st) => {
                const cnt = data.products.filter((p) => (p.skinTypes || []).includes(st.key)).length;
                return `
                  <button class="cat-skintype-btn" data-dir-skin="${st.key}">
                    <strong>${st.label}</strong>
                    <span>${cnt} ${t("totalCountSuffix")}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>

        <div class="section-divider"></div>

        <!-- 4. 공식 입점 브랜드관 -->
        <section class="ably-section">
          <h3 class="cat-dir-heading">${t("catSecBrand")}</h3>
          <div class="brand-pavilion-grid">
            ${data.brands
              .map((b) => {
                const count = data.products.filter((p) => p.brand === b.id).length;
                return `
                  <button class="brand-pavilion-card" data-dir-brand="${b.id}">
                    <span class="bp-name">${b.name}</span>
                    <span class="bp-desc">${tr(b.tagRo, b.tagEn, b.tagKo)}</span>
                    <span class="bp-count">${count} ${t("totalCountSuffix")} ›</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
      </div>
    `;
  }

  // ==========================================================================
  // [상품 목록 뷰 (shop): 품목 · 피부고민 · 피부타입 · 브랜드 다중 필터 + 정렬]
  // ==========================================================================
  function renderShopTab() {
    const categories = getCategoriesMeta();
    let list = [...data.products];

    if (state.selectedCategory !== "all") {
      list = list.filter((p) => p.category === state.selectedCategory);
    }
    if (state.shopConcern !== "all") {
      list = list.filter((p) => (p.concerns || []).includes(state.shopConcern));
    }
    if (state.shopSkinType !== "all") {
      list = list.filter((p) => (p.skinTypes || []).includes(state.shopSkinType));
    }
    if (state.shopBrand !== "all") {
      list = list.filter((p) => p.brand === state.shopBrand);
    }

    list = sortProducts(list, state.sortBy);

    const hasSubFilter =
      state.selectedCategory !== "all" ||
      state.shopConcern !== "all" ||
      state.shopSkinType !== "all" ||
      state.shopBrand !== "all";

    return `
      <div class="shop-tab-container">
        <div class="subtab-sticky-filters">
          <div class="filter-chips-scroll">
            ${categories
              .map(
                (c) => `
                <button class="filter-chip ${state.selectedCategory === c.key ? "active" : ""}" data-shop-cat="${c.key}">
                  ${c.key === "all" ? t("concernAll") : c.shortLabel}
                </button>
              `
              )
              .join("")}
          </div>
          <div class="filter-chips-scroll sub-row">
            ${["all", "soothing", "pores", "hydration", "glow"]
              .map(
                (ck) => `
                <button class="sub-filter-pill ${state.shopConcern === ck ? "active" : ""}" data-shop-concern="${ck}">
                  ${ck === "all" ? tr("Toate nevoile", "All Concerns", "고민 전체") : getConcernLabel(ck)}
                </button>
              `
              )
              .join("")}
          </div>
          <div class="filter-chips-scroll sub-row">
            ${["all", "Mixt", "Gras", "Sensibil", "Uscat"]
              .map(
                (st) => `
                <button class="sub-filter-pill ${state.shopSkinType === st ? "active" : ""}" data-shop-skin="${st}">
                  ${getSkinTypeLabel(st)}
                </button>
              `
              )
              .join("")}
          </div>
          ${
            state.shopBrand !== "all"
              ? `
            <div class="active-brand-bar">
              <span>${tr("Brand selectat:", "Selected Brand:", "선택 브랜드:")} <strong>${state.shopBrand}</strong></span>
              <button class="filter-reset-inline" id="btn-clear-shop-brand">✕</button>
            </div>
          `
              : ""
          }
        </div>

        <div class="ably-section" style="padding-top:12px;">
          ${renderSortToolbar(list.length, hasSubFilter ? "btn-reset-shop-all" : null)}
          ${
            list.length > 0
              ? `<div class="ably-product-grid">
                  ${list.map((prod, idx) => renderProductCard(prod, idx + 1, false)).join("")}
                </div>`
              : renderFilterEmptyState("btn-reset-shop-all")
          }
        </div>
      </div>
    `;
  }



  function renderSortToolbar(count, resetBtnId = null) {
    const sorts = [
      { key: "popular", label: t("sortPopular") },
      { key: "reviews", label: t("sortReviews") },
      { key: "priceLow", label: t("sortPriceLow") },
      { key: "discount", label: t("sortDiscount") }
    ];
    return `
      <div class="sort-toolbar">
        <div class="sort-left">
          <span class="sort-count"><strong>${count}</strong> ${t("totalCountSuffix")}</span>
          ${
            resetBtnId
              ? `<button class="filter-reset-inline" id="${resetBtnId}">${tr("Resetează", "Reset", "초기화")}</button>`
              : ""
          }
        </div>
        <div class="sort-options">
          ${sorts
            .map(
              (s) => `
              <button class="sort-opt-btn ${state.sortBy === s.key ? "active" : ""}" data-sort-by="${s.key}">
                ${s.label}
              </button>
            `
            )
            .join("")}
        </div>
      </div>
    `;
  }



  function renderFilterEmptyState(resetId) {
    return `
      <div class="empty-state-box">
        <p class="empty-state-text">${tr("Nu există produse pentru combinația de filtre aleasă.", "No items match the selected filter combination.", "선택하신 필터 조건에 맞는 상품이 없습니다.")}</p>
        <button class="btn-secondary-pill" id="${resetId}">${tr("Resetează Filtrele", "Reset Filters", "필터 전체 초기화")}</button>
      </div>
    `;
  }

  // ==========================================================================
  // [하단 탭 3: 크리에이터 룩북 & 루틴 피드 (피부타입별 필터 지원)]
  // ==========================================================================
  function renderCreatorsTab() {
    const filteredCreators =
      state.creatorSkinFilter === "all"
        ? data.creators
        : data.creators.filter((c) => c.skinProfile.type === state.creatorSkinFilter);

    return `
      <div class="feed-container">
        <!-- 상단 피부타입별 크리에이터 필터 -->
        <div class="subtab-sticky-filters">
          <div style="padding:10px 16px 4px;">
            <h3 style="font-size:15px; font-weight:800;">${t("creatorsTitle")}</h3>
            <p style="font-size:11px; color:#777; margin-top:2px;">${t("creatorsSub")}</p>
          </div>
          <div class="filter-chips-scroll" style="padding-top:6px;">
            ${["all", "Mixt", "Sensibil", "Gras", "Uscat"]
              .map(
                (st) => `
                <button class="filter-chip ${state.creatorSkinFilter === st ? "active" : ""}" data-creator-skin="${st}">
                  ${getSkinTypeLabel(st)}
                </button>
              `
              )
              .join("")}
          </div>
        </div>

        ${filteredCreators
          .map((creator) => {
            const routine = creator.routine;
            const post = creator.feedPost;
            const caption = tr(post.caption, post.captionEn, post.captionKo || post.captionEn);
            const routineTitle = tr(routine.title, routine.titleEn, routine.titleKo || routine.titleEn);
            const isFollowed = state.followedCreators.has(creator.id);
            const followLabel = isFollowed
              ? tr("✓ Urmărit", "✓ Following", "✓ 팔로잉")
              : t("filterFollow");

            return `
              <article class="feed-card">
                <div class="feed-head">
                  <div class="feed-author">
                    <img src="${creator.avatar}" class="feed-avatar" alt="${creator.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getAvatar('${creator.name.replace(/'/g, "\\'")}','${creator.handle}')" />
                    <div>
                      <div style="display:flex; align-items:center; gap:6px;">
                        <h4 class="feed-author-name">${creator.name}</h4>
                        <span class="cm-chip highlight">${getSkinTypeLabel(creator.skinProfile.type)}</span>
                      </div>
                      <span class="feed-author-city">${creator.handle} · ${creator.city} (${creator.followers})</span>
                    </div>
                  </div>
                  <button class="btn-follow-pill ${isFollowed ? "following" : ""}" data-follow-id="${creator.id}">
                    ${followLabel}
                  </button>
                </div>

                <div class="feed-media">
                  <img src="${post.image}" alt="${creator.name} Look" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getFeed('${creator.name.replace(/'/g, "\\'")}','${creator.skinProfile.type}')" />
                </div>

                <div class="feed-body">
                  <p class="feed-caption">${caption}</p>
                  <div class="feed-tags">
                    ${post.tags.map((tg) => `<span class="feed-tag-item">#${tg}</span>`).join(" ")}
                  </div>

                  <div class="routine-bundle-card">
                    <div class="rb-title-row">
                      <span class="rb-title">${routineTitle}</span>
                      <div class="rb-pricing">
                        <span class="rb-discount">-${routine.discountPercent}%</span>
                        <span class="rb-price">${routine.bundlePrice} lei</span>
                      </div>
                    </div>

                    <div class="rb-items-grid">
                      ${routine.productIds
                        .map((pid) => {
                          const p = data.products.find((item) => item.id === pid);
                          if (!p) return "";
                          return `
                            <div class="rb-item-thumb" data-product-id="${p.id}">
                              <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${p.category}','${p.brand}','${p.name.replace(/'/g, "\\'")}')" />
                              <span class="rb-item-brand">${p.brand}</span>
                              <span class="rb-item-name">${getProductDisplayName(p)}</span>
                            </div>
                          `;
                        })
                        .join("")}
                    </div>

                    <button class="btn-bundle-order" data-creator-id="${creator.id}">
                      ${t("buyRoutinePrice")} · ${routine.bundlePrice} lei
                    </button>
                  </div>
                </div>
              </article>
            `;
          })
          .join("")}

        <div class="feed-partner-cta" id="banner-join-creator">
          <div class="fp-left">
            <strong>${t("becomeCreatorBannerTitle")}</strong>
            <p>${t("becomeCreatorBannerSub")}</p>
          </div>
          <button class="fp-btn">${t("becomeCreatorBannerBtn")}</button>
        </div>
      </div>
    `;
  }



  // ==========================================================================
  // [하단 탭 4: 찜한 상품 (Wishlist)]
  // ==========================================================================
  function renderWishlistTab() {
    const wishedProducts = data.products.filter((p) => state.wishlist.has(p.id));

    return `
      <section class="ably-section">
        <div class="sort-toolbar" style="margin-bottom:14px;">
          <span class="sort-count"><strong>${wishedProducts.length}</strong> ${t("totalCountSuffix")}</span>
        </div>

        ${
          wishedProducts.length === 0
            ? `
          <div class="empty-state-box" style="padding:48px 16px;">
            <div style="font-size:32px; margin-bottom:8px;">🤍</div>
            <p class="empty-state-text">${t("wishlistEmpty")}</p>
            <button class="btn-secondary-pill" id="btn-wish-go-best">${t("wishlistGoBest")}</button>
          </div>
        `
            : `
          <div class="ably-product-grid">
            ${wishedProducts
              .map(
                (prod, idx) => `
                <div class="wishlist-card-wrap">
                  ${renderProductCard(prod, idx + 1, false)}
                  <button class="wishlist-quick-cart-btn" data-quick-cart-id="${prod.id}">
                    ${t("btnQuickCart")}
                  </button>
                </div>
              `
              )
              .join("")}
          </div>
        `
        }
      </section>
    `;
  }

  // ==========================================================================
  // [하단 탭 5: 마이페이지 (My)]
  // ==========================================================================
  function renderMyTab() {
    const cartQty = state.cart.reduce((acc, item) => acc + item.qty, 0);
    const isCr = isCreatorLoggedIn();
    const cr = state.currentCreator;
    const user = state.currentUser;
    const isLoggedIn = Boolean(user);

    return `
      <div class="ably-section">
        <!-- 프로필 카드 (로그인 / 게스트 대응) -->
        <div class="my-profile-card">
          <div class="my-profile-left">
            ${
              isCr && cr
                ? `<img src="${cr.avatar}" style="width:48px; height:48px; border-radius:50%; object-fit:cover; border:2.5px solid #FF3F6C;" alt="${cr.name}" />`
                : isLoggedIn
                  ? `<div class="my-avatar-circle">${ICONS.user}</div>`
                  : `<div class="my-avatar-circle" style="background:#F0F0F4; color:#888;">${ICONS.user}</div>`
            }
            <div>
              <h4 style="font-size:15px; font-weight:800; display:flex; align-items:center; gap:6px;">
                ${
                  isCr && cr
                    ? `${cr.name} <span style="font-size:11px; background:#FFE0E7; color:#FF3F6C; padding:1px 6px; border-radius:10px; font-weight:800;">🌸 Creator</span>`
                    : isLoggedIn
                      ? user.name
                      : tr("Autentificare Necesară", "Login Required", "로그인이 필요합니다")
                }
              </h4>
              <p style="font-size:12px; color:#777; margin-top:2px;">
                ${
                  isCr && cr
                    ? `${cr.handle} · ${cr.followers} 팔로워 · ${cr.city}`
                    : isLoggedIn
                      ? `${user.city || "București"} · ${user.email}`
                      : tr("Conectează-te pentru cupon 10% reducere", "Log in for 10% first-order discount", "로그인하고 첫 구매 10% 할인 쿠폰을 받으세요")
                }
              </p>
            </div>
          </div>
          <button class="btn-open-cert" data-tab="auth">
            ${isLoggedIn ? (isCr ? "계정정보 ›" : `${t("tabAuth")} ›`) : tr("Autentificare ›", "Login / Sign Up ›", "로그인 / 가입 ›")}
          </button>
        </div>

        ${
          !isLoggedIn
            ? `
          <!-- 발표 및 시연용 1초 빠른 로그인 안내 카드 -->
          <div style="background:#FFF8F9; border:1.5px dashed #FFB8CA; border-radius:12px; padding:14px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:12px; font-weight:800; color:#D31745;">⚡ 발표·시연용 빠른 데모 로그인</span>
              <span style="font-size:10.5px; background:#FFE0E7; color:#FF3F6C; font-weight:700; padding:2px 6px; border-radius:8px;">데모 계정</span>
            </div>
            <p style="font-size:11.5px; color:#555; line-height:1.45; margin-bottom:10px;">
              ${tr(
                "Alege un profil demonstrativ pentru a testa imediat experiența de cumpărător sau creator de conținut:",
                "Select a demo account to instantly test consumer or creator workflow:",
                "원하시는 시연 모드를 클릭하시면 즉시 해당 권한으로 전환됩니다:"
              )}
            </p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <button id="btn-quick-consumer" style="background:#FFFFFF; border:1.5px solid #222; color:#222; border-radius:8px; padding:8px 6px; font-size:12px; font-weight:800; cursor:pointer;">
                🛍️ 일반 고객(Elena)
              </button>
              <button id="btn-quick-creator" style="background:linear-gradient(135deg, #FF3F6C, #FF1E56); border:none; color:#FFFFFF; border-radius:8px; padding:8px 6px; font-size:12px; font-weight:800; cursor:pointer; box-shadow:0 2px 8px rgba(255,63,108,0.25);">
                🌸 크리에이터(Maria)
              </button>
            </div>
          </div>
        `
            : ""
        }

        <!-- 쇼핑 요약 대시보드 (쿠폰 · 찜 · 장바구니) -->
        <div class="my-summary-grid">
          <button class="my-summary-cell" data-tab="auth">
            <strong class="my-summary-num accent">10%</strong>
            <span class="my-summary-label">${t("myCouponTitle")}</span>
          </button>
          <button class="my-summary-cell" data-bottom-tab="wishlist">
            <strong class="my-summary-num">${state.wishlist.size}</strong>
            <span class="my-summary-label">${t("tabWishlist")}</span>
          </button>
          <button class="my-summary-cell" id="btn-my-open-cart">
            <strong class="my-summary-num">${cartQty}</strong>
            <span class="my-summary-label">${tr("Coș", "Cart", "장바구니")}</span>
          </button>
        </div>

        <!-- 크리에이터 로그인 시에만 노출되는 스튜디오 진입 배너 카드 -->
        ${
          isCr
            ? `
          <div style="background:linear-gradient(135deg, #2A1424 0%, #171724 100%); color:#FFFFFF; border-radius:12px; padding:16px; margin:16px 0; box-shadow:0 6px 20px rgba(0,0,0,0.12);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size:11px; background:#FF3F6C; color:#FFFFFF; font-weight:800; padding:2px 8px; border-radius:10px;">🌸 CREATOR COMMERCE</span>
              <span style="font-size:11px; color:#FFB8CA; font-weight:700;">Live Hub</span>
            </div>
            <h4 style="font-size:16px; font-weight:800; margin-bottom:4px;">${cr?.name || "크리에이터"} 파트너 스튜디오</h4>
            <p style="font-size:11.5px; color:#D0C0D0; line-height:1.4; margin-bottom:12px;">
              ${tr(
                "Gestionează produsele tale K-Beauty curate, setează rutine pentru fani și verifică comisioanele.",
                "Curate your K-Beauty products, configure fan routines, and check live earnings.",
                "내 추천 상품 큐레이션 등록, 팬 루틴 세트 설정 및 판매 커미션(15%) 정산 내역을 관리하세요."
              )}
            </p>
            <button class="btn-primary-auth" data-tab="seller" style="margin:0; background:#FF3F6C; padding:10px 14px; font-size:13px;">
              🚀 ${tr("Deschide Creator Studio", "Open Creator Studio", "크리에이터 스튜디오 입장하기 ›")}
            </button>
          </div>
        `
            : ""
        }

        <h4 style="font-size:14px; font-weight:800; margin:18px 0 10px;">${t("myOrdersTitle")}</h4>
        ${
          state.lastOrder
            ? `
          <div class="my-order-box">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <strong style="font-size:12px;">#${state.lastOrder.id}</strong>
              <span style="font-size:11px; color:#1976D2; font-weight:700;">📦 ${t("profileActiveDelivery")}</span>
            </div>
            <p style="font-size:11px; color:#555;">${state.lastOrder.locker.name}</p>
            <div class="my-pin-highlight">
              ${t("profilePinLabel")} ${state.lastOrder.pinCode}
            </div>
          </div>
        `
            : `
          <div class="empty-state-box" style="margin-bottom:18px;">
            <p class="empty-state-text">${t("profileEmptyOrder")}</p>
            <button class="btn-secondary-pill" id="btn-my-go-best">${t("profileStartShop")}</button>
          </div>
        `
        }

        <!-- 고객 서비스 메뉴 -->
        <div class="my-menu-list">
          ${
            isCr
              ? `
            <button class="my-menu-item" data-tab="seller" style="background:#FFF5F7; border:1px solid #FFD3DC; border-radius:8px; margin-bottom:8px; padding:12px 14px;">
              <span style="font-weight:700; color:var(--ably-red);">
                🌸 ${tr("Studio Creatori Parteneri (Gestionează Produse)", "Creator Partner Studio (Manage Products)", "크리에이터 스튜디오 (내 큐레이션 상품 등록·관리)")}
              </span>
              <span class="my-menu-arrow" style="color:var(--ably-red); font-weight:800;">›</span>
            </button>
          `
              : ""
          }
          <button class="my-menu-item" id="prof-menu-cert">
            <span>🛡️ ${t("menuCert")}</span>
            <span class="my-menu-arrow">›</span>
          </button>
          <button class="my-menu-item" id="prof-menu-lockers">
            <span>📦 ${t("menuLockers")}</span>
            <span class="my-menu-arrow">›</span>
          </button>
          <button class="my-menu-item" data-tab="auth">
            <span>👤 ${t("menuAuthManage")}</span>
            <span class="my-menu-arrow">›</span>
          </button>
          ${
            isLoggedIn
              ? `
            <button class="my-menu-item" id="btn-user-logout" style="color:#D32F2F;">
              <span>🚪 ${tr("Deconectare", "Logout", "로그아웃")}</span>
              <span class="my-menu-arrow">›</span>
            </button>
          `
              : ""
          }
        </div>
      </div>
    `;
  }



  // ==========================================================================
  // [회원가입 및 크리에이터 파트너 입점 신청 (Auth)]
  // ==========================================================================
  function renderAuthTab() {
    if (state.authSubmitted) {
      const isConsumer = state.authRole === "consumer";
      const isCreator = state.authRole === "creator";
      const isSeller = state.authRole === "seller";

      return `
        <div class="auth-container">
          <div class="creator-match-box" style="text-align:center; padding:30px 16px;">
            <div style="font-size:36px; margin-bottom:10px;">${isConsumer ? "🎉" : isCreator ? "🚀" : "🏢"}</div>
            <h3 style="font-size:17px; font-weight:800; margin-bottom:6px;">
              ${
                isConsumer
                  ? tr("Cont Creat cu Succes!", "Account Created Successfully!", "회원가입이 완료되었습니다!")
                  : isCreator
                    ? tr("Cerere Partener Înregistrată!", "Partner Application Submitted!", "크리에이터 파트너 신청 완료!")
                    : tr("Înregistrare Vânzător Aprobată!", "Seller Partner Approved!", "공식 판매자 파트너 등록 완료!")
              }
            </h3>
            <p style="font-size:12px; color:#666; margin-bottom:16px;">
              ${
                isConsumer
                  ? tr(
                      "Cuponul tău de 10% reducere (SEOULMATE10) a fost activat.",
                      "Your 10% discount voucher (SEOULMATE10) has been activated.",
                      "첫 구매 10% 할인 쿠폰(SEOULMATE10)이 계정에 즉시 발급되었습니다."
                    )
                  : isCreator
                    ? tr(
                        "Echipa Seoulmate va analiza contul tău și va expedia kitul de mostre în 24 de ore.",
                        "Our team will review your channel and dispatch your K-Beauty PR kit within 24 hours.",
                        "담당팀에서 채널 확인 후 24시간 이내 시딩 키트 발송 안내를 드립니다."
                      )
                    : tr(
                        "Contul de vânzător oficial a fost activat. Poți adăuga produse K-Beauty cu verificare CPNP.",
                        "Your seller partner account is active. Start uploading CPNP verified K-Beauty items.",
                        "공식 판매자 계정이 승인되었습니다. 지금 바로 CPNP 정품 상품을 등록하고 스토어에 실시간 노출해 보세요."
                      )
              }
            </p>
            <button class="btn-primary-auth" id="btn-auth-finish">
              ${
                isConsumer
                  ? tr("Începe Cumpărăturile", "Start Shopping", "쇼핑 시작하기")
                  : isCreator || isSeller
                    ? tr("Deschide Creator Studio", "Open Creator Studio", "크리에이터 스튜디오로 입장")
                    : tr("Începe Cumpărăturile", "Start Shopping", "쇼핑 시작하기")
              }
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="auth-container">
        <!-- 상단 시연용 빠른 데모 로그인 박스 -->
        <div style="background:#FFF8F9; border:1.5px dashed #FFB8CA; border-radius:12px; padding:12px 14px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:11.5px; font-weight:800; color:#D31745;">⚡ 발표·시연용 1초 빠른 로그인</span>
            <span style="font-size:10px; background:#FFE0E7; color:#FF3F6C; font-weight:700; padding:1px 6px; border-radius:6px;">데모</span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <button id="btn-auth-demo-consumer" style="background:#FFFFFF; border:1.5px solid #222; color:#222; border-radius:8px; padding:7px 6px; font-size:11.5px; font-weight:800; cursor:pointer;">
              🛍️ 일반 고객(Elena)
            </button>
            <button id="btn-auth-demo-creator" style="background:linear-gradient(135deg, #FF3F6C, #FF1E56); border:none; color:#FFFFFF; border-radius:8px; padding:7px 6px; font-size:11.5px; font-weight:800; cursor:pointer;">
              🌸 크리에이터(Maria)
            </button>
          </div>
        </div>

        <div class="auth-subnav">
          <button class="auth-subnav-btn ${state.authRole === "consumer" ? "active" : ""}" data-role-tab="consumer">
            🛍️ ${t("tabConsumerAuth")}
          </button>
          <button class="auth-subnav-btn ${state.authRole === "creator" || state.authRole === "seller" ? "active" : ""}" data-role-tab="creator">
            🌸 ${tr("Creator Partener (Vânzător)", "Creator Partner (Seller)", "크리에이터 파트너 (판매자)")}
          </button>
        </div>

        <div class="auth-form-card">
          ${
            state.authRole === "consumer"
              ? `
            <div class="auth-title-row">
              <h3>${t("consumerWelcomeTitle")}</h3>
              <p>${t("consumerWelcomeSub")}</p>
            </div>

            <div class="auth-coupon-banner">
              🎁 ${t("myCouponTitle")}
            </div>

            <form class="auth-form-body" id="consumer-register-form">
              <div>
                <label class="field-label">${t("inputName")}</label>
                <input type="text" id="reg-name" class="input-box" value="${state.currentUser?.name || "Elena Popescu"}" required />
              </div>
              <div>
                <label class="field-label">${t("inputEmail")}</label>
                <input type="email" id="reg-email" class="input-box" value="${state.currentUser?.email || "elena.popescu@gmail.com"}" required />
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
          `
              : state.authRole === "creator"
                ? `
            <div class="auth-title-row">
              <h3>${t("creatorPartnerTitle")}</h3>
              <p>${t("creatorPartnerSub")}</p>
            </div>

            <div style="background:#FAFAFB; border:1px solid #EEEEEE; border-radius:8px; padding:12px; margin-bottom:14px; font-size:11px; color:#444; line-height:1.6;">
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
                  <option value="5k-20k">5,000 ~ 20,000 (Nano)</option>
                  <option value="20k-50k" selected>20,000 ~ 50,000 (Micro)</option>
                  <option value="50k+">50,000+ (Macro)</option>
                </select>
              </div>
              <div>
                <label class="field-label">${t("inputIban")}</label>
                <input type="text" class="input-box" value="RO88 BTRL 0300 1234 5678 99XX" required />
              </div>
              <button type="submit" class="btn-primary-auth">${t("btnCreatorSubmit")}</button>
            </form>
          `
                : `
            <!-- 판매자 (Seller) 전용 입점 폼 -->
            <div class="auth-title-row">
              <h3>${tr("Înregistrare Vânzător Oficial K-Beauty", "Official K-Beauty Seller Partner", "공식 판매자/브랜드 입점 신청")}</h3>
              <p>${tr("Distribuie produse 100% autentice cu CPNP către clienții din România prin easybox.", "Supply 100% authentic CPNP products to Romanian beauty shoppers via easybox.", "루마니아 및 동유럽 시장에 100% 공식 CPNP 인증 정품을 공급하고 판매하세요.")}</p>
            </div>

            <div style="background:#FFF8F9; border:1px solid #FFD8E0; border-radius:8px; padding:12px; margin-bottom:14px; font-size:11.5px; color:#333; line-height:1.6;">
              ✓ ${tr("Comision redus 5% la vânzare (Livrare directă easybox inclusă)", "Low 5% platform commission with automated easybox logistics", "최저 판매 수수료 5% (루마니아 전역 10,000+ easybox 무인함 자동 배송)")}<br/>
              ✓ ${tr("Verificare oficială EU CPNP și trasabilitate anti-contrafacere", "EU CPNP authenticity certification & anti-counterfeit guarantee", "EU CPNP 공식 정품 인증 마크 및 바코드 로트 추적 시스템 제공")}<br/>
              ✓ ${tr("Expunere garantată în feed-urile creatorilor locali", "Instant exposure across Romanian beauty creator feeds", "루마니아 현지 뷰티 인플루언서 큐레이션 룩북 자동 매칭 및 노출")}
            </div>

            <form class="auth-form-body" id="seller-register-form">
              <div>
                <label class="field-label">${tr("Nume Companie / Brand", "Company / Brand Name", "회사명 / 브랜드 상호명")} *</label>
                <input type="text" id="seller-reg-company" class="input-box" value="${state.sellerProfile.companyName || "ANUA Global Logistics"}" required />
              </div>
              <div>
                <label class="field-label">${tr("Număr Registrul Comerțului / CUI", "Business Registration / Tax ID", "사업자 등록번호")} *</label>
                <input type="text" id="seller-reg-biznum" class="input-box" value="${state.sellerProfile.bizNumber || "RO-29384910"}" required />
              </div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
                <div>
                  <label class="field-label">${tr("Nume Contact", "Contact Name", "담당자 성함")} *</label>
                  <input type="text" id="seller-reg-name" class="input-box" value="${state.sellerProfile.contactName || "Elena Popescu"}" required />
                </div>
                <div>
                  <label class="field-label">${tr("E-mail Oficial", "Official Email", "공식 이메일")} *</label>
                  <input type="email" id="seller-reg-email" class="input-box" value="${state.sellerProfile.contactEmail || "partner@seoulmate.ro"}" required />
                </div>
              </div>
              <div>
                <label class="field-label">${tr("Număr Înregistrare EU CPNP", "EU CPNP Portal Registration Number", "EU CPNP 정품 허가 번호")} *</label>
                <input type="text" id="seller-reg-cpnp" class="input-box" value="${state.sellerProfile.cpnpNumber || "CPNP-EU-3984021"}" required />
              </div>
              <button type="submit" class="btn-primary-auth" style="background:var(--ably-red);">${tr("Finalizează Înregistrarea ca Vânzător", "Complete Seller Partner Application", "공식 판매자 입점 신청 완료")}</button>
            </form>
          `
          }
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // [크리에이터 스튜디오 & 파트너 게이트 (판매자=크리에이터)]
  // ==========================================================================
  function renderSellerStudioTab() {
    if (!isCreatorLoggedIn()) {
      return renderCreatorGate();
    }
    return renderCreatorStudioView();
  }

  function renderCreatorGate() {
    return `
      <div class="creator-gate-page">
        <div class="creator-gate-card">
          <div class="creator-gate-badge">🌸 SEOULMATE CREATOR COMMERCE PARTNER</div>
          <h2 class="creator-gate-title">
            ${tr("Portal Exclusiv Creatori K-Beauty", "K-Beauty Creator Partner Portal", "K-뷰티 공식 크리에이터 스튜디오")}
          </h2>
          <p class="creator-gate-sub">
            ${tr(
              "Acest studio este dedicat exclusiv creatorilor oficiali de conținut Seoulmate. Autentifică-te pentru a curatoria produse, seta rutine și câștiga comisioane din vânzări directe.",
              "This studio is exclusively for verified Seoulmate K-Beauty creators. Log in to curate skincare routines, upload products, and earn sales commissions.",
              "본 스튜디오는 Seoulmate 공식 인증 K-뷰티 크리에이터 파트너 전용 공간입니다. 크리에이터 계정으로 로그인하여 본인의 피부타입에 맞는 제품을 큐레이션하고 루마니아 팬들에게 직접 판매하세요."
            )}
          </p>

          <!-- 발표 및 심사위원용 원클릭 데모 로그인 -->
          <div class="creator-gate-demo-box">
            <div class="creator-gate-demo-header">
              <span class="demo-badge">⚡ 심사위원 & 발표 시연용 원클릭 입장</span>
              <p style="font-size:12px; color:#666; margin-top:4px;">
                별도 타이핑 없이 실제 활동 중인 대표 K-뷰티 크리에이터 계정으로 즉시 스튜디오에 입장합니다.
              </p>
            </div>
            <div class="creator-demo-grid">
              <div class="creator-demo-card">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" class="demo-avatar" alt="Maria" />
                <div class="demo-info">
                  <div class="demo-name">Maria Zvinca <span class="v-badge">✓ Verified</span></div>
                  <div class="demo-meta">@mariazvinca · 245K 팔로워 · 복합성·모공케어</div>
                </div>
                <button type="button" class="btn-demo-login" data-creator-demo-login="mariazvinca">
                  🌸 마리아 계정으로 스튜디오 즉시 입장
                </button>
              </div>

              <div class="creator-demo-card">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" class="demo-avatar" alt="Ioana" />
                <div class="demo-info">
                  <div class="demo-name">Ioana Dumitru <span class="v-badge">✓ Verified</span></div>
                  <div class="demo-meta">@ioana.dumitru · 189K 팔로워 · 건성·글래스스킨</div>
                </div>
                <button type="button" class="btn-demo-login" data-creator-demo-login="ioana.dumitru">
                  ✨ 이오아나 계정으로 스튜디오 즉시 입장
                </button>
              </div>
            </div>
          </div>

          <!-- 신규 크리에이터 파트너 가입 및 로그인 -->
          <div class="creator-manual-login-card">
            <h3 style="font-size:14px; font-weight:800; margin-bottom:10px; color:#1A1A24;">
              ✍️ ${tr("Sau Conectează-te cu Contul tău de Creator", "Or Log In / Apply as Creator Partner", "또는 신규 크리에이터 파트너 계정으로 로그인")}
            </h3>
            <form id="creator-manual-login-form">
              <div class="seller-form-grid-2">
                <div class="seller-input-group">
                  <label class="field-label">${tr("Nume Creator", "Creator Name", "크리에이터 성함")} *</label>
                  <input type="text" id="cr-login-name" class="input-box" placeholder="예: Andreea Popa" value="Andreea Popa" required />
                </div>
                <div class="seller-input-group">
                  <label class="field-label">${tr("Handle Instagram / TikTok", "Social Handle", "SNS 계정 핸들")} *</label>
                  <input type="text" id="cr-login-handle" class="input-box" placeholder="@andreea.kbeauty" value="@andreea.kbeauty" required />
                </div>
              </div>
              <div class="seller-form-grid-2">
                <div class="seller-input-group">
                  <label class="field-label">${tr("Oraș", "City", "활동 지역")}</label>
                  <input type="text" id="cr-login-city" class="input-box" value="București" />
                </div>
                <div class="seller-input-group">
                  <label class="field-label">${tr("Tip de Ten Principal", "Main Skin Type", "주 피부타입")}</label>
                  <select id="cr-login-skintype" class="input-box">
                    <option value="Mixt">복합성 (Mixt)</option>
                    <option value="Gras">지성·여드름 (Gras)</option>
                    <option value="Uscat">건성·민감 (Uscat)</option>
                    <option value="Sensibil">민감성 (Sensibil)</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn-seller-submit" style="margin-top:10px;">
                🚀 ${tr("Intră în Creator Studio", "Enter Creator Studio", "크리에이터 계정으로 스튜디오 입장")}
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  function renderCreatorStudioView() {
    const cr = state.currentCreator || data.creators[0];
    const myProds = state.creatorProducts || [];

    return `
      <div class="seller-studio-page">
        <!-- 상단 크리에이터 프로필 헤더 배너 -->
        <div class="seller-hero-banner" style="background: linear-gradient(135deg, #2A1424 0%, #171724 100%);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:14px; position:relative; z-index:2;">
            <div style="display:flex; align-items:center; gap:14px;">
              <img src="${cr.avatar}" style="width:68px; height:68px; border-radius:50%; object-fit:cover; border:3px solid #FF3F6C; box-shadow:0 4px 14px rgba(255,63,108,0.35);" alt="${cr.name}" />
              <div>
                <div class="seller-hero-tag" style="background:#FF3F6C;">🌸 SEOULMATE VERIFIED CREATOR</div>
                <h2 class="seller-hero-title" style="margin-top:4px; font-size:22px; color:#FFFFFF;">
                  ${cr.name} <span style="font-size:14px; font-weight:600; color:#FFB8CA;">(${cr.handle})</span>
                </h2>
                <p class="seller-hero-sub" style="font-size:12px; color:#E0D0DC; margin-top:2px;">
                  📍 ${cr.city} · 👥 <strong>${cr.followers}</strong> Urmăritori · ${tr("Tip de Ten", "Skin Type", "피부타입")}: <strong>${cr.skinProfile?.type || "Mixt"}</strong> (${(cr.skinProfile?.concerns || []).join(", ") || "Calmare"})
                </p>
              </div>
            </div>

            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <button id="btn-creator-go-store" class="btn-seller-action-view" style="background:#FFFFFF; color:#1A1A24; font-size:12.5px; padding:7px 14px; font-weight:800; border:none; border-radius:8px; cursor:pointer;">
                🏬 ${tr("Vezi Magazinul Live", "View Live Storefront", "쇼핑몰에서 내 상품 보기")}
              </button>
              <button id="btn-seller-help-cert" class="btn-seller-action-view" style="background:rgba(255,255,255,0.15); color:#FFFFFF; border:1px solid rgba(255,255,255,0.3); font-size:12.5px; padding:7px 14px; border-radius:8px; cursor:pointer;">
                🛡️ ${tr("Certificare CPNP", "CPNP Guide", "정품 인증 안내")}
              </button>
              <button id="btn-creator-logout" class="btn-seller-action-view" style="background:rgba(255,255,255,0.1); color:#FFB8CA; border:1px solid rgba(255,255,255,0.2); font-size:12.5px; padding:7px 14px; border-radius:8px; cursor:pointer;">
                🚪 ${tr("Deconectare", "Logout", "로그아웃")}
              </button>
            </div>
          </div>
        </div>

        <!-- 크리에이터 판매 & 정산 지표 카드 -->
        <div class="seller-metrics-grid">
          <div class="seller-metric-card">
            <div class="seller-metric-val">${myProds.length} <small style="font-size:12px; font-weight:600;">SKU</small></div>
            <div class="seller-metric-label">${tr("Produse Curate Active", "Active Curated SKUs", "내 큐레이션 판매 상품")}</div>
          </div>
          <div class="seller-metric-card">
            <div class="seller-metric-val accent">48 <small style="font-size:12px; font-weight:600;">${tr("comenzi", "orders", "건")}</small></div>
            <div class="seller-metric-label">${tr("Vânzări Rutină Fani", "Fans Routine Orders", "루틴 세트 누적 판매")}</div>
          </div>
          <div class="seller-metric-card">
            <div class="seller-metric-val" style="color:#059669;">1,420 <small style="font-size:12px; font-weight:600;">lei</small></div>
            <div class="seller-metric-label">${tr("Comision Estimativ (15%)", "Estimated Commission (15%)", "정산 예정 커미션 (15%)")}</div>
          </div>
        </div>

        <!-- 신규 큐레이션 상품 등록 카드 -->
        <div class="seller-form-card">
          <div class="seller-form-header">
            <div>
              <h3 style="font-size:16px; font-weight:800;">✨ ${tr(`Înregistrare Produs Curat de ${cr.name}`, `Curate & Upload New Product (${cr.name})`, `${cr.name}의 K-뷰티 큐레이션 상품 등록`)}</h3>
              <p style="font-size:11.5px; color:#777; margin-top:2px;">
                ${tr(
                  "Produsele adăugate vor apărea live în magazin și pe pagina ta de profil cu insigna oficială de recomandare.",
                  "Items added will appear live in the store and your creator profile with an official curated badge.",
                  `등록한 상품은 쇼핑몰 홈 피드 및 크리에이터 룩북에 <strong>${cr.name}'s Pick</strong> 뱃지와 함께 실시간 진열됩니다.`
                )}
              </p>
            </div>
            <span style="font-size:11.5px; color:var(--ably-red); font-weight:800; white-space:nowrap;">● Live Instant Sync</span>
          </div>

          <div style="margin-bottom:14px;">
            <span style="font-size:11.5px; font-weight:700; color:var(--ably-gray-medium); display:block; margin-bottom:6px;">
              ${tr("Preseturi Rapide de Mostre (Click pentru completare automată):", "Quick Sample Presets (Click to autofill):", "빠른 샘플 채우기 (클릭 시 자동 입력):")}
            </span>
            <div class="seller-sample-chips-row">
              <button type="button" class="seller-sample-chip" data-sample="sunscreen">☀️ ${tr("Joseon Rice Sunscreen", "Joseon Rice SPF", "조선미녀 맑은쌀선크림")}</button>
              <button type="button" class="seller-sample-chip" data-sample="cream">💧 ${tr("RoundLab Birch Cream", "RoundLab Cream", "라운드랩 자작나무크림")}</button>
              <button type="button" class="seller-sample-chip" data-sample="serum">🌿 ${tr("Centella Ampoule", "Centella Serum", "스킨1004 센텔라 앰플")}</button>
              <button type="button" class="seller-sample-chip" data-sample="toner">🍃 ${tr("Anua 77 Toner", "Anua 77 Toner", "아누아 어성초 토너")}</button>
            </div>
          </div>

          <form id="seller-upload-form">
            <div class="seller-form-grid-2">
              <div class="seller-input-group">
                <label class="field-label">${tr("Brand Producător", "Brand Name", "브랜드명")} *</label>
                <input type="text" id="seller-prod-brand" class="input-box" value="Beauty of Joseon" required />
              </div>
              <div class="seller-input-group">
                <label class="field-label">${tr("Categorie Produs", "Product Category", "상품 카테고리")} *</label>
                <select id="seller-prod-cat" class="input-box" required>
                  <option value="Protecție Solară" selected>${tr("Protecție Solară (SPF)", "Sun Care & SPF", "선크림·선케어")}</option>
                  <option value="Serum & Fiole">${tr("Seruri & Fiole", "Serums & Ampoules", "세럼·앰플")}</option>
                  <option value="Creme & Hidratare">${tr("Creme Hidratante", "Moisturizers & Creams", "수분·영양크림")}</option>
                  <option value="Toner & Tampoane">${tr("Tonere & Pads", "Toner & Pads", "토너·패드")}</option>
                  <option value="Curățare">${tr("Curățare & Demachiere", "Cleansers", "클렌징·오일")}</option>
                  <option value="Măști & Tampoane">${tr("Măști Faciale", "Masks & Treatments", "마스크팩·패치")}</option>
                  <option value="Machiaj">${tr("Machiaj & Lip", "Makeup & Lips", "메이크업·립")}</option>
                </select>
              </div>
            </div>

            <div class="seller-input-group">
              <label class="field-label">${tr("Nume Produs (Română / English / 한국어)", "Product Name (Global / Korean)", "상품명 (글로벌 / 한국어)")} *</label>
              <input type="text" id="seller-prod-name" class="input-box" placeholder="${tr("ex: Beauty of Joseon Relief Sun : Rice + Probiotics 50ml", "ex: Beauty of Joseon Relief Sun 50ml", "예: 조선미녀 맑은쌀선크림 (SPF50+ PA++++)")}" required />
            </div>

            <div class="seller-form-grid-2">
              <div class="seller-input-group">
                <label class="field-label">${tr("Preț Vânzare (lei)", "Selling Price (RON)", "판매 가격 (RON lei)")} *</label>
                <input type="number" id="seller-prod-price" class="input-box" min="1" max="999" value="65" required />
              </div>
              <div class="seller-input-group">
                <label class="field-label">${tr("Preț Recomandat (lei)", "Original Price (RON)", "정상 가격 (RON lei)")}</label>
                <input type="number" id="seller-prod-origprice" class="input-box" min="1" max="999" value="80" />
              </div>
            </div>

            <div class="seller-form-grid-2">
              <div class="seller-input-group">
                <label class="field-label">${tr("Nevoie Principală (Concern)", "Primary Skin Concern", "주요 피부고민")}</label>
                <select id="seller-prod-concern" class="input-box">
                  <option value="hydration" selected>${tr("Hidratare & Barieră", "Hydration & Barrier", "수분·속건조")}</option>
                  <option value="soothing">${tr("Calmare & Iritații", "Soothing & Calming", "진정·트러블")}</option>
                  <option value="pores">${tr("Pori & Sebum", "Pores & Sebum", "모공·피지")}</option>
                  <option value="glow">${tr("Luminozitate & Pete", "Brightening & Glow", "미백·잡티케어")}</option>
                </select>
              </div>
              <div class="seller-input-group">
                <label class="field-label">${tr("Cod EU CPNP Oficial", "EU CPNP Certificate", "EU CPNP 정품 허가번호")} *</label>
                <input type="text" id="seller-prod-cpnp" class="input-box" value="CPNP-EU-3984021" required />
              </div>
            </div>

            <div class="seller-input-group">
              <label class="field-label">${tr("Recomandarea Creatorului (Tips & Routine)", "Creator's Recommendation & Routine Tip", "크리에이터 한줄 추천평 & 루틴 팁")} *</label>
              <input type="text" id="seller-prod-creator-tip" class="input-box" value="${tr("Produsul meu preferat de dimineață pentru un glow natural fără senzație grasă!", "My morning favorite for natural glow with zero greasiness!", "백탁 없이 산뜻하게 스며들어 아침마다 사용하는 제 인생 선크림이에요!")}" placeholder="${tr("ex: Rutina mea zilnică pentru ten luminos...", "ex: My daily routine for glass skin...", "예: 지성 피부도 산뜻하게 쓸 수 있는 수분 진정 앰플!")}" required />
            </div>

            <div class="seller-input-group">
              <label class="field-label">${tr("Imagine Produs (Fișier Local sau URL Web)", "Product Image (Local File or Web URL)", "상품 대표 이미지 (로컬 사진 파일 또는 웹 URL)")} *</label>
              <div class="seller-image-upload-zone">
                <input type="file" id="seller-file-input" accept="image/*" style="display:none;" />
                <button type="button" id="btn-seller-pick-file" class="btn-seller-action-view" style="margin-bottom:8px; padding:7px 14px; background:#FFFFFF;">
                  📁 ${tr("Alege Fișier din PC", "Choose Image File from PC", "내 PC에서 사진 파일 선택")}
                </button>
                <span style="display:block; font-size:11px; color:var(--ably-gray-medium); margin-bottom:8px;">${tr("sau inserează URL mai jos:", "or paste image URL below:", "또는 이미지 웹 URL을 입력하세요:")}</span>
                <input type="url" id="seller-img-url" class="input-box" placeholder="https://images.unsplash.com/..." />
              </div>
              <div id="seller-preview-wrap" class="seller-preview-container" style="display:none;">
                <img id="seller-preview-img" class="seller-preview-img" src="" alt="Preview" />
                <div class="seller-preview-meta">
                  <span style="font-size:11px; font-weight:700; color:#2E7D32;">✓ ${tr("Imagine selectată", "Image selected", "이미지 준비 완료")}</span>
                  <span id="seller-preview-text" style="display:block; font-size:11px; color:var(--ably-gray-medium); word-break:break-all;"></span>
                </div>
              </div>
            </div>

            <div class="seller-input-group">
              <label class="field-label">${tr("Descriere Scurtă Produs", "Product Short Description", "상품 상세 유효성분 및 설명")}</label>
              <textarea id="seller-prod-desc" class="input-box" rows="2" placeholder="${tr("Descrie ingredientele active și modul de utilizare...", "Describe active ingredients and how to use...", "유효 성분과 사용 방법을 적어주세요...")}"></textarea>
            </div>

            <button type="submit" class="btn-seller-submit">
              🚀 ${tr("Publică Produsul Curatat în Magazin", "Publish Curated Product to Live Storefront", "크리에이터 큐레이션 상품 즉시 등록 및 공식 매장 진열")}
            </button>
          </form>
        </div>

        <div class="seller-products-list-header">
          <h3>📦 ${tr(`Produsele Curatate de ${cr.name}`, `${cr.name}'s Curated Products`, `${cr.name}의 등록 큐레이션 상품 목록`)}</h3>
          <span style="font-size:12px; font-weight:700; color:var(--ably-gray-medium);">${myProds.length} ${tr("articole", "items", "개")}</span>
        </div>
        <div id="seller-products-container">
          ${renderSellerProductsList()}
        </div>
      </div>
    `;
  }

  function renderSellerProductsList() {
    const myProds = state.creatorProducts || [];
    if (!myProds || myProds.length === 0) {
      return `
        <div style="background:#FFFFFF; border:1px dashed #D0D0DE; border-radius:var(--radius-sm); padding:28px 20px; text-align:center;">
          <span style="font-size:32px; display:block; margin-bottom:8px;">📦</span>
          <p style="font-weight:700; font-size:13px; color:var(--ably-black); margin-bottom:4px;">
            ${tr("Nu ai înregistrat încă niciun produs.", "No products registered yet.", "아직 등록된 큐레이션 상품이 없습니다.")}
          </p>
          <p style="font-size:11.5px; color:var(--ably-gray-medium);">
            ${tr("Folosește formularul de mai sus sau alege un preset rapid pentru a publica primul tău articol K-Beauty.", "Use the form above or click a preset chip to publish your first K-Beauty item.", "위의 등록 폼을 작성하거나 빠른 샘플 칩을 눌러 상품을 즉시 등록해보세요.")}
          </p>
        </div>
      `;
    }

    return `
      <div>
        ${myProds
          .map((p) => {
            const displayName = getProductDisplayName(p);
            return `
              <div class="seller-prod-card" data-seller-prod-id="${p.id}">
                <img class="seller-prod-thumb" src="${p.image}" alt="${displayName}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${p.category}','${p.brand}','${p.name.replace(/'/g, "\\'")}')" />
                <div class="seller-prod-info">
                  <span class="seller-prod-badge">🌸 ${p.badge || "Creator Pick"}</span>
                  <h4 class="seller-prod-title">${displayName}</h4>
                  <div class="seller-prod-price">
                    ${p.price} lei 
                    ${p.originalPrice ? `<small style="color:#999; font-weight:400; text-decoration:line-through; font-size:11px; margin-left:4px;">${p.originalPrice} lei</small>` : ""}
                    ${p.discount ? `<span style="font-size:11px; color:var(--ably-red); margin-left:4px;">-${p.discount}%</span>` : ""}
                  </div>
                  ${p.creatorComment ? `<p style="font-size:11px; color:#666; margin-top:2px; font-style:italic;">"${p.creatorComment}"</p>` : ""}
                </div>
                <div class="seller-prod-actions">
                  <button class="btn-seller-action-view" data-view-product-id="${p.id}">🔍 ${tr("Vezi", "View", "보기")}</button>
                  <button class="btn-seller-action-del" data-del-product-id="${p.id}">🗑️ ${tr("Șterge", "Delete", "삭제")}</button>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }



  // ==========================================================================
  // [공통 상품 카드]
  // ==========================================================================
  function renderProductCard(prod, rank, showRank = false) {
    const isWished = state.wishlist.has(prod.id);
    const prodName = getProductDisplayName(prod);
    const primaryConcern = prod.concerns && prod.concerns[0] ? getConcernLabel(prod.concerns[0]) : "";

    return `
      <div class="ably-prod-card" data-product-id="${prod.id}">
        <div class="ably-prod-imgwrap">
          <img src="${prod.image}" alt="${prodName}" loading="lazy" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${prod.category}','${prod.brand}','${prod.name.replace(/'/g, "\\'")}')" />
          ${showRank ? `<span class="ably-rank-num ${rank <= 3 ? "top-rank" : ""}">${rank}</span>` : ""}
          ${prod.isAntiFakeHighlight ? `<span class="ably-prod-badge-auth">CPNP</span>` : ""}
          <button class="ably-wish-btn ${isWished ? "wished" : ""}" data-wish-id="${prod.id}" aria-label="Save">
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
          ${primaryConcern ? `<div class="ably-prod-concern-tag">${primaryConcern}</div>` : ""}
        </div>
      </div>
    `;
  }



  // ==========================================================================
  // [모달 & 바텀시트 렌더링]
  // ==========================================================================
  function renderActiveModal() {
    if (!state.activeModal) return "";

    // 1. 상품 상세 바텀시트
    if (state.activeModal === "product" && state.selectedProduct) {
      const p = state.selectedProduct;
      const title = getProductDisplayName(p);
      const subName = state.lang === "ko" ? p.englishName : p.romanianName;
      const desc = tr(p.descriptionRo, p.descriptionEn, p.descriptionKo || p.descriptionEn);
      const cpnpLabel = tr("Verificare Oficială EU CPNP:", "Official EU CPNP Verification:", "EU CPNP 공식 정품 인증번호:");
      const lotLabel = tr("Lot Trasabilitate:", "Traceability Lot Number:", "공식 수입 유통 로트 번호:");

      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-sheet">
            <div class="sheet-header-bar">
              <h4>${p.brand}</h4>
              <button class="sheet-close-x" id="sheet-close">✕</button>
            </div>
            <div class="sheet-body-scroll">
              <img src="${p.image}" alt="${title}" style="width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:10px; margin-bottom:12px;" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${p.category}','${p.brand}','${p.name.replace(/'/g, "\\'")}')" />
              <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px;">
                ${(p.concerns || []).map((c) => `<span class="cm-chip highlight">${getConcernLabel(c)}</span>`).join("")}
                ${(p.skinTypes || []).map((s) => `<span class="cm-chip">${getSkinTypeLabel(s)}</span>`).join("")}
                ${p.undertone ? `<span class="cm-chip">${getUndertoneLabel(p.undertone)}</span>` : ""}
              </div>
              ${
                p.creatorName
                  ? `
                <div style="background:#FFF0F5; border:1px solid #FFD3DC; border-radius:8px; padding:9px 12px; margin-bottom:12px; display:flex; align-items:center; gap:10px;">
                  <span style="font-size:20px;">🌸</span>
                  <div style="font-size:11.5px; line-height:1.4;">
                    <div style="font-weight:800; color:#FF3F6C;">${p.creatorName} (${p.creatorHandle || ""}) 큐레이션 Pick</div>
                    <div style="color:#555; margin-top:2px;">"${p.creatorComment || "루틴 필수 추천 아이템"}"</div>
                  </div>
                </div>
              `
                  : ""
              }
              <h3 style="font-size:16px; font-weight:800; margin-bottom:4px;">${title}</h3>
              <p style="font-size:12px; color:#666; margin-bottom:12px;">${subName}</p>

              <div style="display:flex; align-items:baseline; gap:8px; margin-bottom:16px;">
                <span style="color:#FA3E4C; font-size:18px; font-weight:900;">${p.discount}%</span>
                <span style="font-size:22px; font-weight:900;">${p.price} lei</span>
                <span style="font-size:12px; color:#999; text-decoration:line-through;">${p.originalPrice} lei</span>
              </div>

              <div style="background:#FAFAFB; border:1px solid #EEEEEE; border-radius:8px; padding:10px; margin-bottom:14px; font-size:11px; line-height:1.5;">
                <strong>${cpnpLabel}</strong> ${p.cpnpNumber}<br/>
                <strong>${lotLabel}</strong> ${p.lotNumber}
              </div>

              <p style="font-size:12px; color:#444; line-height:1.5;">${desc}</p>
            </div>
            <div class="sheet-footer-action">
              <button class="btn-sheet-cart" id="btn-sheet-add-cart" data-prod-id="${p.id}">${t("sheetAddToCart")}</button>
              <button class="btn-sheet-order" id="btn-sheet-instant-buy" data-prod-id="${p.id}">${t("sheetInstantBuy")}</button>
            </div>
          </div>
        </div>
      `;
    }

    // 2. EU CPNP 정품 인증서 모달
    if (state.activeModal === "authenticity") {
      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-center-modal">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h3 style="font-size:16px; font-weight:800;">
                ${tr("Certificat de Autenticitate", "Authenticity Certificate", "EU CPNP 정품 보증 안내")}
              </h3>
              <button class="sheet-close-x" id="modal-close">✕</button>
            </div>
            <div style="background:#F0FDF4; border:1px solid #DCFCE7; border-radius:8px; padding:12px; margin-bottom:12px; font-size:11px; color:#166534; line-height:1.5;">
              <strong>${tr("Garanția Seoulmate România:", "Seoulmate Romania Guarantee:", "서울메이트 루마니아 공식 보증:")}</strong><br/>
              ${tr(
                "Toate produsele sunt importate direct prin reprezentanți autorizați (RP) înregistrați pe portalul CPNP al Comisiei Europene. Zero contrafaceri.",
                "All cosmetics are imported strictly through EU-responsible persons (RP) officially registered with the EU CPNP portal. Zero counterfeit risk.",
                "전 상품 유럽연합 집행위원회 CPNP 포털에 정식 등록된 책임판매업자(RP)를 통해 공식 직수입됩니다. 가품 위험 제로."
              )}
            </div>
            <div style="font-size:11px; color:#555; line-height:1.6; margin-bottom:14px;">
              • ${tr("Producător Oficial Seul, Coreea de Sud", "Official Brand Headquarters (Seoul, Korea)", "한국 본사 공식 정품 출고 (로트 추적 지원)")}<br/>
              • ${tr("Notificare CPNP & Verificare Vamală UE", "EU CPNP Notification & Customs Clearance", "EU CPNP 성분·안전성 등록 및 정식 통관")}<br/>
              • ${tr("Livrare Sigilată în Rețeaua Sameday easybox", "Tamper-Evident Delivery via Sameday easybox", "루마니아 전역 Sameday easybox 안심 밀봉 배송")}
            </div>
            <button class="btn-primary-auth" id="modal-close-btn" style="margin:0;">
              ${tr("Am Înțeles", "Got It", "확인")}
            </button>
          </div>
        </div>
      `;
    }

    // 3. 장바구니 & 주문서 바텀시트
    if (state.activeModal === "checkout" || state.activeModal === "cart") {
      const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
      const isFreeShipping = subtotal >= data.platform.freeShippingThreshold;
      const shippingFee = state.cart.length === 0 ? 0 : isFreeShipping ? 0 : 12;
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
                <span style="font-size:12px; font-weight:800;">
                  ${tr("Produse în Coș", "Cart Items", "장바구니 상품")} (${state.cart.length})
                </span>
                ${state.cart.length === 0 ? `<p style="font-size:12px; color:#888; padding:12px 0;">${t("cartEmpty")}</p>` : ""}
                ${state.cart
                  .map(
                    (item, i) => `
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #EEE;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src=window.SEOULMATE_FALLBACK ? window.SEOULMATE_FALLBACK.getProduct('', '${(item.brand || "").replace(/'/g, "\\'")}', '${(item.name || "").replace(/'/g, "\\'")}') : '';" style="width:38px; height:38px; border-radius:6px; object-fit:cover;" />
                      <div>
                        <strong style="font-size:11px; display:block;">${item.name}</strong>
                        <span style="font-size:10px; color:#888;">${item.price} lei × ${item.qty}</span>
                      </div>
                    </div>
                    <button class="btn-remove-cart" data-cart-index="${i}" style="border:none; background:none; color:#888; cursor:pointer; padding:4px;">✕</button>
                  </div>
                `
                  )
                  .join("")}
              </div>

              <!-- easybox 락커 -->
              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px; margin-bottom:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <strong style="font-size:11px; color:#1976D2;">${t("cartLockerLabel")}</strong>
                  <button id="btn-change-locker" style="background:none; border:none; color:#1976D2; font-size:11px; font-weight:700; cursor:pointer;">${t("btnChangeLocker")}</button>
                </div>
                <div style="font-size:12px; font-weight:800;">${state.selectedLocker.name}</div>
                <div style="font-size:11px; color:#666;">${state.selectedLocker.address}</div>
              </div>

              <!-- 결제 수단 -->
              <div style="margin-bottom:16px;">
                <span style="font-size:12px; font-weight:800; display:block; margin-bottom:8px;">${t("paymentTitle")}</span>
                <label style="display:flex; align-items:center; gap:8px; padding:10px; border:1.5px solid ${state.paymentMethod === "ramburs" ? "#FA3E4C" : "#DDD"}; border-radius:8px; margin-bottom:6px; cursor:pointer;">
                  <input type="radio" name="pay" value="ramburs" ${state.paymentMethod === "ramburs" ? "checked" : ""} />
                  <div>
                    <strong style="font-size:12px;">${t("payRambursTitle")}</strong>
                    <p style="font-size:10px; color:#777;">${t("payRambursSub")}</p>
                  </div>
                </label>
                <label style="display:flex; align-items:center; gap:8px; padding:10px; border:1.5px solid ${state.paymentMethod === "card" ? "#FA3E4C" : "#DDD"}; border-radius:8px; cursor:pointer;">
                  <input type="radio" name="pay" value="card" ${state.paymentMethod === "card" ? "checked" : ""} />
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
                  <span>${t("shippingFee")}</span><strong>${shippingFee === 0 ? t("shippingFree") : "12 lei"}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:15px; font-weight:900; border-top:1px solid #EEE; padding-top:8px;">
                  <span>${t("totalPay")}</span><span style="color:#FA3E4C;">${total} lei</span>
                </div>
              </div>
            </div>
            <div class="sheet-footer-action">
              <button class="btn-sheet-order" id="btn-submit-order" style="flex:1;" ${state.cart.length === 0 ? "disabled" : ""}>
                ${state.paymentMethod === "ramburs" ? t("btnSubmitOrderRamburs") : t("btnSubmitOrderCard")} (${total} lei)
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 4. easybox 락커 선택 모달
    if (state.activeModal === "easybox") {
      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-center-modal" style="max-height:80vh; display:flex; flex-direction:column;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <h3 style="font-size:15px; font-weight:800;">
                ${tr("Alege Locker Sameday easybox", "Select Sameday easybox Locker", "Sameday easybox 보관함 선택")}
              </h3>
              <button class="sheet-close-x" id="modal-close">✕</button>
            </div>
            <div style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:6px;">
              ${data.easyboxLockers
                .map(
                  (l) => `
                <div class="locker-choice-card ${l.id === state.selectedLocker.id ? "selected" : ""}" data-locker-id="${l.id}">
                  <strong style="font-size:12px; display:block;">${l.name}</strong>
                  <span style="font-size:11px; color:#666;">${l.address} (${l.distance})</span>
                </div>
              `
                )
                .join("")}
            </div>
            <button class="btn-primary-auth" id="btn-confirm-locker" style="margin-top:10px;">
              ${tr("Confirmă Locker", "Confirm Locker", "보관함 선택 완료")}
            </button>
          </div>
        </div>
      `;
    }

    // 5. 주문 완료 모달
    if (state.activeModal === "orderSuccess" && state.lastOrder) {
      const order = state.lastOrder;
      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-center-modal" style="text-align:center;">
            <div style="font-size:36px; margin-bottom:8px;">📦</div>
            <h3 style="font-size:17px; font-weight:800; margin-bottom:4px;">${t("orderSuccessTitle")}</h3>
            <p style="font-size:11px; color:#666; margin-bottom:12px;">${t("orderSuccessSub")}</p>

            <div style="background:#FAFAFB; border:1px solid #EEE; border-radius:8px; padding:12px; text-align:left; font-size:11px; margin-bottom:14px; line-height:1.6;">
              <div>${tr("Comandă:", "Order ID:", "주문번호:")} <strong>#${order.id}</strong></div>
              <div>Locker: <strong>${order.locker.name}</strong></div>
              <div>Total: <strong>${order.total} lei (${order.paymentMethod === "ramburs" ? "Ramburs" : "Card"})</strong></div>
              <div class="my-pin-highlight">
                ${t("profilePinLabel")} ${order.pinCode}
              </div>
            </div>

            <button class="btn-primary-auth" id="btn-finish-order" style="margin:0;">${t("orderSuccessFinish")}</button>
          </div>
        </div>
      `;
    }

    return "";
  }

  // ==========================================================================
  // [이벤트 바인딩]
  // ==========================================================================
  function attachEventListeners() {
    // PC / 모바일 뷰모드 전환 (헤더 토글 버튼)
    const toggleVm = document.getElementById("btn-toggle-viewmode");
    if (toggleVm) {
      toggleVm.addEventListener("click", () => {
        setViewMode(state.viewMode === "pc" ? "mobile" : "pc");
      });
    }

    // 크리에이터 센터 / 스튜디오 이동
    const headerSeller = document.getElementById("btn-header-seller");
    if (headerSeller) {
      headerSeller.addEventListener("click", () => {
        navigateTo("seller");
      });
    }

    document.querySelectorAll("[data-nav-seller]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigateTo("seller");
      });
    });

    // 크리에이터 게이트: 원클릭 데모 로그인
    document.querySelectorAll("[data-creator-demo-login]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cid = btn.getAttribute("data-creator-demo-login");
        loginAsCreator(cid);
        showToast(tr("Autentificat în Creator Studio!", "Logged into Creator Studio!", "크리에이터 스튜디오에 입장했습니다!"));
        render();
      });
    });

    // 크리에이터 게이트: 수동 로그인 / 등록 폼
    const manualCreatorForm = document.getElementById("creator-manual-login-form");
    if (manualCreatorForm) {
      manualCreatorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("cr-login-name")?.value.trim() || "K-Beauty Creator";
        const handle = document.getElementById("cr-login-handle")?.value.trim() || "@k_creator";
        const city = document.getElementById("cr-login-city")?.value.trim() || "București";
        const skin = document.getElementById("cr-login-skintype")?.value || "Mixt";
        registerNewCreator(name, handle, city, skin);
        showToast(tr("Cont de Creator activat!", "Creator account activated!", "크리에이터 계정으로 로그인되었습니다!"));
        render();
      });
    }

    // 크리에이터 스튜디오: 로그아웃
    const creatorLogout = document.getElementById("btn-creator-logout");
    if (creatorLogout) {
      creatorLogout.addEventListener("click", () => {
        logoutCreator();
        showToast(tr("Deconectat din Creator Studio.", "Logged out of Creator Studio.", "크리에이터 스튜디오에서 로그아웃되었습니다."));
        render();
      });
    }

    // 크리에이터 스튜디오: 매장 가기
    const creatorGoStore = document.getElementById("btn-creator-go-store");
    if (creatorGoStore) {
      creatorGoStore.addEventListener("click", () => {
        state.homeSubTab = "today";
        navigateTo("home");
      });
    }

    // 뒤로가기 및 홈 로고
    const backBtn = document.getElementById("btn-global-back");
    if (backBtn) backBtn.addEventListener("click", () => goBack());

    const logoBtn = document.getElementById("btn-logo-home");
    if (logoBtn) {
      logoBtn.addEventListener("click", () => {
        state.homeSubTab = "today";
        state.searchQuery = "";
        render();
        resetScroll();
      });
    }

    // 언어 전환 (RO / EN / 한국어)
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const l = btn.getAttribute("data-set-lang");
        if (l && l !== state.lang) {
          state.lang = l;
          render();
        }
      });
    });

    // 검색 아이콘 버튼 & 실시간 검색어 입력 (IME 포커스 유지)
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

    const searchInput = document.getElementById("main-search-input");
    const clearSearchBtn = document.getElementById("btn-clear-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle("hidden", !state.searchQuery);
        }
        const homeBody = document.getElementById("home-dynamic-body");
        if (homeBody) {
          homeBody.innerHTML = renderHomeBody();
          attachDynamicBodyListeners();
        }
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        state.searchQuery = "";
        render();
        const inp = document.getElementById("main-search-input");
        if (inp) inp.focus();
      });
    }

    // 하단 5대 탭바 이동
    document.querySelectorAll("[data-bottom-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-bottom-tab");
        navigateTo(target);
      });
    });

    // 일반 data-tab 이동
    document.querySelectorAll("[data-tab]").forEach((el) => {
      el.addEventListener("click", () => {
        navigateTo(el.getAttribute("data-tab"));
      });
    });

    // 장바구니 열기
    document.querySelectorAll("#btn-header-cart, #btn-my-open-cart").forEach((b) => {
      b.addEventListener("click", () => {
        state.activeModal = "checkout";
        render();
      });
    });

    // 정품 인증 모달 열기
    document.querySelectorAll("#btn-show-trust, #prof-menu-cert").forEach((b) => {
      b.addEventListener("click", () => {
        state.activeModal = "authenticity";
        render();
      });
    });

    // 마이페이지 보관함 설정
    const profLockers = document.getElementById("prof-menu-lockers");
    if (profLockers) {
      profLockers.addEventListener("click", () => {
        state.activeModal = "easybox";
        render();
      });
    }

    // 빈 상태에서 베스트 보러가기
    document.querySelectorAll("#btn-wish-go-best, #btn-my-go-best").forEach((b) => {
      b.addEventListener("click", () => {
        state.homeSubTab = "best";
        navigateTo("home");
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

    document.querySelectorAll("#modal-close, #modal-close-btn, #sheet-close").forEach((b) => {
      b.addEventListener("click", () => {
        state.activeModal = null;
        render();
      });
    });

    // 상세 시트 장바구니 담기 / 바로구매
    const sheetAdd = document.getElementById("btn-sheet-add-cart");
    if (sheetAdd) {
      sheetAdd.addEventListener("click", () => {
        const p = data.products.find((item) => item.id === sheetAdd.getAttribute("data-prod-id"));
        if (p) {
          const ex = state.cart.find((c) => c.id === p.id);
          if (ex) ex.qty++;
          else state.cart.push({ ...p, name: getProductDisplayName(p), qty: 1 });
          state.activeModal = null;
          showToast(t("toastCartAdded"));
          render();
        }
      });
    }

    const sheetBuy = document.getElementById("btn-sheet-instant-buy");
    if (sheetBuy) {
      sheetBuy.addEventListener("click", () => {
        const p = data.products.find((item) => item.id === sheetBuy.getAttribute("data-prod-id"));
        if (p) {
          state.cart = [{ ...p, name: getProductDisplayName(p), qty: 1 }];
          state.activeModal = "checkout";
          render();
        }
      });
    }

    // 장바구니 삭제
    document.querySelectorAll(".btn-remove-cart").forEach((b) => {
      b.addEventListener("click", () => {
        state.cart.splice(parseInt(b.getAttribute("data-cart-index"), 10), 1);
        render();
      });
    });

    // easybox 락커 변경
    const changeLocker = document.getElementById("btn-change-locker");
    if (changeLocker) {
      changeLocker.addEventListener("click", () => {
        state.activeModal = "easybox";
        render();
      });
    }

    document.querySelectorAll(".locker-choice-card[data-locker-id]").forEach((card) => {
      card.addEventListener("click", () => {
        const l = data.easyboxLockers.find((loc) => loc.id === card.getAttribute("data-locker-id"));
        if (l) {
          state.selectedLocker = l;
          render();
        }
      });
    });

    const confirmLocker = document.getElementById("btn-confirm-locker");
    if (confirmLocker) {
      confirmLocker.addEventListener("click", () => {
        state.activeModal = state.cart.length > 0 ? "checkout" : null;
        render();
      });
    }

    // 결제 방식 선택
    document.querySelectorAll("input[name='pay']").forEach((r) => {
      r.addEventListener("change", (e) => {
        state.paymentMethod = e.target.value;
        render();
      });
    });

    // 주문 완료 제출
    const submitOrder = document.getElementById("btn-submit-order");
    if (submitOrder) {
      submitOrder.addEventListener("click", () => {
        const subtotal = state.cart.reduce((a, b) => a + b.price * b.qty, 0);
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
        navigateTo("my");
      });
    }

    // 회원가입 / 입점 신청
    document.querySelectorAll("[data-role-tab]").forEach((b) => {
      b.addEventListener("click", () => {
        state.authRole = b.getAttribute("data-role-tab");
        render();
      });
    });

    // 발표·시연용 빠른 원클릭 데모 로그인 (My페이지 & Auth페이지)
    const quickConsumer = document.getElementById("btn-quick-consumer") || document.getElementById("btn-auth-demo-consumer");
    if (quickConsumer) {
      quickConsumer.addEventListener("click", () => {
        loginAsConsumer("Elena Popescu", "elena.popescu@gmail.com", "București");
        render();
      });
    }
    const quickCreator = document.getElementById("btn-quick-creator") || document.getElementById("btn-auth-demo-creator");
    if (quickCreator) {
      quickCreator.addEventListener("click", () => {
        loginAsCreator("mariazvinca");
        render();
      });
    }
    const authDemoConsumer = document.getElementById("btn-auth-demo-consumer");
    if (authDemoConsumer && authDemoConsumer !== quickConsumer) {
      authDemoConsumer.addEventListener("click", () => {
        loginAsConsumer("Elena Popescu", "elena.popescu@gmail.com", "București");
        render();
      });
    }
    const authDemoCreator = document.getElementById("btn-auth-demo-creator");
    if (authDemoCreator && authDemoCreator !== quickCreator) {
      authDemoCreator.addEventListener("click", () => {
        loginAsCreator("mariazvinca");
        render();
      });
    }

    // 마이페이지 로그아웃
    const userLogout = document.getElementById("btn-user-logout");
    if (userLogout) {
      userLogout.addEventListener("click", () => {
        logoutUser();
        render();
      });
    }

    const cForm = document.getElementById("consumer-register-form");
    if (cForm) {
      cForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("reg-name")?.value || "Elena Popescu";
        const email = document.getElementById("reg-email")?.value || "elena.popescu@gmail.com";
        const city = document.getElementById("reg-city")?.value || "București";
        loginAsConsumer(name, email, city);
        state.authSubmitted = true;
        render();
      });
    }

    const crForm = document.getElementById("creator-register-form");
    if (crForm) {
      crForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const handle = document.getElementById("reg-handle")?.value.trim() || "@k_creator";
        const name = handle.replace("@", "");
        registerNewCreator(name, handle, "București", "Mixt");
        state.authRole = "creator";
        state.authSubmitted = true;
        render();
      });
    }

    const selForm = document.getElementById("seller-register-form");
    if (selForm) {
      selForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const brand = document.getElementById("seller-reg-company")?.value || "K-Beauty Brand";
        const email = document.getElementById("seller-reg-email")?.value || "partner@brand.kr";
        const cpnp = document.getElementById("seller-reg-cpnp")?.value || "CPNP-EU-3984021";
        state.sellerProfile.brandName = brand;
        state.sellerProfile.sellerEmail = email;
        state.sellerProfile.cpnpNumber = cpnp;
        state.sellerProfile.isVerified = true;
        registerNewCreator(brand, "@" + brand.toLowerCase().replace(/\s+/g, ""), "București", "Mixt");
        state.authRole = "creator";
        state.authSubmitted = true;
        render();
      });
    }

    const authFinish = document.getElementById("btn-auth-finish");
    if (authFinish) {
      authFinish.addEventListener("click", () => {
        let target = "home";
        if (state.authRole === "creator" || state.authRole === "seller") target = "seller";
        state.authSubmitted = false;
        navigateTo(target);
      });
    }

    // 판매자 스튜디오 이벤트 리스너
    const goStore = document.getElementById("btn-seller-go-store");
    if (goStore) {
      goStore.addEventListener("click", () => {
        state.homeSubTab = "today";
        navigateTo("home");
      });
    }

    const helpCert = document.getElementById("btn-seller-help-cert");
    if (helpCert) {
      helpCert.addEventListener("click", () => {
        state.activeModal = "authenticity";
        render();
      });
    }

    // 샘플 칩 빠른 자동완성
    document.querySelectorAll(".seller-sample-chip[data-sample]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sampleKey = btn.getAttribute("data-sample");
        const brandInp = document.getElementById("seller-prod-brand");
        const catInp = document.getElementById("seller-prod-cat");
        const nameInp = document.getElementById("seller-prod-name");
        const priceInp = document.getElementById("seller-prod-price");
        const origInp = document.getElementById("seller-prod-origprice");
        const concernInp = document.getElementById("seller-prod-concern");
        const urlInp = document.getElementById("seller-img-url");
        const descInp = document.getElementById("seller-prod-desc");
        const previewWrap = document.getElementById("seller-preview-wrap");
        const previewImg = document.getElementById("seller-preview-img");
        const previewText = document.getElementById("seller-preview-text");

        const presets = {
          sunscreen: {
            brand: "Beauty of Joseon",
            cat: "Protecție Solară",
            name: "Beauty of Joseon Relief Sun : Rice + Probiotics (SPF50+ PA++++)",
            price: 65,
            orig: 80,
            concern: "hydration",
            url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80",
            desc: "Cremă de protecție solară organică lejeră cu 30% extract de orez și probiotice fermentate pentru un glow natural."
          },
          cream: {
            brand: "Round Lab",
            cat: "Creme & Hidratare",
            name: "Round Lab Birch Juice Moisturizing Cream 80ml",
            price: 92,
            orig: 110,
            concern: "hydration",
            url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80",
            desc: "Cremă hidratantă răcoritoare cu sevă de mesteacăn din Inje și capsule de acid hialuronic."
          },
          serum: {
            brand: "SKIN1004",
            cat: "Serum & Fiole",
            name: "SKIN1004 Madagascar Centella Asiatica 100 Ampoule 100ml",
            price: 82,
            orig: 99,
            concern: "soothing",
            url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80",
            desc: "Ampulă hipoalergenică cu 100% extract pur de Centella Asiatica pentru calmarea roșeții și refacerea barierei."
          },
          toner: {
            brand: "Anua",
            cat: "Toner & Tampoane",
            name: "Anua Heartleaf 77% Clear Pad (70 buc)",
            price: 89,
            orig: 105,
            concern: "pores",
            url: "https://images.unsplash.com/photo-1608248597359-28c045b8fb32?auto=format&fit=crop&w=500&q=80",
            desc: "Tampoane tonice hipoalergenice cu 77% Houttuynia Cordata și PHA pentru curățarea porilor și netezirea tenului."
          }
        };

        const p = presets[sampleKey];
        if (p) {
          if (brandInp) brandInp.value = p.brand;
          if (catInp) catInp.value = p.cat;
          if (nameInp) nameInp.value = p.name;
          if (priceInp) priceInp.value = p.price;
          if (origInp) origInp.value = p.orig;
          if (concernInp) concernInp.value = p.concern;
          if (urlInp) urlInp.value = p.url;
          if (descInp) descInp.value = p.desc;
          if (previewWrap && previewImg && previewText) {
            previewImg.src = p.url;
            previewText.textContent = p.name;
            previewWrap.style.display = "flex";
          }
        }
      });
    });

    // 파일 업로드 및 URL 미리보기
    const pickFileBtn = document.getElementById("btn-seller-pick-file");
    const fileInp = document.getElementById("seller-file-input");
    const urlInp = document.getElementById("seller-img-url");
    const previewWrap = document.getElementById("seller-preview-wrap");
    const previewImg = document.getElementById("seller-preview-img");
    const previewText = document.getElementById("seller-preview-text");

    if (pickFileBtn && fileInp) {
      pickFileBtn.addEventListener("click", () => fileInp.click());
    }

    if (fileInp) {
      fileInp.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(evt) {
            const dataUrl = evt.target.result;
            if (urlInp) urlInp.value = dataUrl;
            if (previewWrap && previewImg && previewText) {
              previewImg.src = dataUrl;
              previewText.textContent = file.name;
              previewWrap.style.display = "flex";
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (urlInp) {
      urlInp.addEventListener("input", (e) => {
        const val = e.target.value.trim();
        if (val && previewWrap && previewImg && previewText) {
          previewImg.src = val;
          previewText.textContent = val.length > 40 ? val.substring(0, 38) + "..." : val;
          previewWrap.style.display = "flex";
        }
      });
    }

    // 신규 크리에이터 큐레이션 상품 등록 폼 제출
    const uploadForm = document.getElementById("seller-upload-form");
    if (uploadForm) {
      uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const brandVal = document.getElementById("seller-prod-brand")?.value.trim() || "Anua";
        const catVal = document.getElementById("seller-prod-cat")?.value || "Serum & Fiole";
        const nameVal = document.getElementById("seller-prod-name")?.value.trim() || "K-Beauty Item";
        const priceVal = parseFloat(document.getElementById("seller-prod-price")?.value) || 80;
        const origVal = parseFloat(document.getElementById("seller-prod-origprice")?.value) || Math.round(priceVal * 1.2);
        const concernVal = document.getElementById("seller-prod-concern")?.value || "hydration";
        const cpnpVal = document.getElementById("seller-prod-cpnp")?.value.trim() || state.sellerProfile.cpnpNumber || "CPNP-EU-3984021";
        const tipVal = document.getElementById("seller-prod-creator-tip")?.value.trim() || "Recomandat cu căldură!";
        const urlVal = document.getElementById("seller-img-url")?.value.trim();
        const descVal = document.getElementById("seller-prod-desc")?.value.trim();

        const img = urlVal || window.SEOULMATE_FALLBACK.getProduct(catVal, brandVal, nameVal);
        const discountVal = Math.round(((origVal - priceVal) / origVal) * 100);

        const cr = state.currentCreator || (data.creators && data.creators[0]) || { id: "mariazvinca", name: "Maria Zvinca", handle: "@mariazvinca" };

        const newProd = {
          id: `cr-prod-${Date.now()}`,
          name: nameVal,
          koreanName: nameVal,
          romanianName: nameVal,
          englishName: nameVal,
          brand: brandVal,
          category: catVal,
          concerns: [concernVal],
          skinTypes: ["Mixt", "Sensibil"],
          price: priceVal,
          originalPrice: origVal,
          discount: discountVal > 0 ? discountVal : 15,
          rating: 5.0,
          reviewsCount: 1,
          image: img,
          badge: `${cr.name}'s Pick`,
          creatorId: cr.id,
          creatorName: cr.name,
          creatorHandle: cr.handle,
          creatorComment: tipVal,
          isAntiFakeHighlight: true,
          cpnpNumber: cpnpVal,
          lotNumber: `LOT-SE${Date.now().toString().slice(-6)}`,
          descriptionRo: descVal || "Produs K-Beauty oficial verificat EU CPNP.",
          descriptionEn: descVal || "Official K-Beauty product verified with EU CPNP.",
          descriptionKo: descVal || "EU CPNP 공식 등록 안심 K-뷰티 상품입니다."
        };

        data.products.unshift(newProd);
        if (!state.creatorProducts) state.creatorProducts = [];
        state.creatorProducts.unshift(newProd);
        state.sellerProfile.myProducts.unshift(newProd);

        showToast(tr("Produsul a fost publicat în magazin!", "Product published to live store!", "크리에이터 큐레이션 상품이 공식 매장에 성공적으로 진열되었습니다!"));
        render();
      });
    }

    // 등록 상품 미리보기 및 삭제
    document.querySelectorAll(".btn-seller-action-view[data-view-product-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pid = btn.getAttribute("data-view-product-id");
        const prod = data.products.find((p) => p.id === pid);
        if (prod) {
          state.selectedProduct = prod;
          state.activeModal = "product";
          render();
        }
      });
    });

    document.querySelectorAll(".btn-seller-action-del[data-del-product-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pid = btn.getAttribute("data-del-product-id");
        state.creatorProducts = (state.creatorProducts || []).filter((p) => p.id !== pid);
        state.sellerProfile.myProducts = state.sellerProfile.myProducts.filter((p) => p.id !== pid);
        const idx = data.products.findIndex((p) => p.id === pid);
        if (idx !== -1) data.products.splice(idx, 1);
        showToast(tr("Produsul a fost șters.", "Product removed.", "상품이 삭제되었습니다."));
        render();
      });
    });

    attachDynamicBodyListeners();
  }

  function attachDynamicBodyListeners() {
    // 상단 GNB 서브탭 전환 (투데이 · 베스트 · 스킨케어 · 메이크업 · 브랜드 · 루틴특가)
    document.querySelectorAll("[data-subtab]").forEach((el) => {
      el.addEventListener("click", () => {
        const sub = el.getAttribute("data-subtab");
        state.homeSubTab = sub;
        state.searchQuery = "";
        if (state.activeTab !== "home") {
          navigateTo("home");
        } else {
          render();
          resetScroll();
        }
      });
    });

    // 히어로 슬라이더 컨트롤
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

    // 홈 CPNP 인증서 버튼
    const certBtn = document.getElementById("btn-cert-modal");
    if (certBtn) {
      certBtn.addEventListener("click", () => {
        state.activeModal = "authenticity";
        render();
      });
    }

    // 검색 초기화 및 추천 검색어 클릭
    const resetSearchInline = document.getElementById("btn-reset-search-inline");
    if (resetSearchInline) {
      resetSearchInline.addEventListener("click", () => {
        state.searchQuery = "";
        render();
      });
    }

    document.querySelectorAll("[data-search-kw]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.searchQuery = btn.getAttribute("data-search-kw");
        render();
      });
    });

    // 홈 퀵 카테고리 그리드 -> 상품 목록(shop) 오픈
    document.querySelectorAll("[data-open-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openShopWithFilters({ category: btn.getAttribute("data-open-cat") });
      });
    });

    // 홈 피부고민 필터 칩 & 전체보기
    document.querySelectorAll("[data-home-concern]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.homeConcern = btn.getAttribute("data-home-concern");
        render();
      });
    });

    const moreConcernBtn = document.getElementById("btn-more-concern");
    if (moreConcernBtn) {
      moreConcernBtn.addEventListener("click", () => {
        openShopWithFilters({ concern: state.homeConcern });
      });
    }

    // 베스트 서브탭 필터
    document.querySelectorAll("[data-best-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.bestCategory = btn.getAttribute("data-best-cat");
        render();
      });
    });
    document.querySelectorAll("[data-best-skin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.bestSkinType = btn.getAttribute("data-best-skin");
        render();
      });
    });

    // 스킨케어 서브탭 필터
    document.querySelectorAll("[data-skincare-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.skincareCategory = btn.getAttribute("data-skincare-cat");
        render();
      });
    });
    document.querySelectorAll("[data-skincare-concern]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.skincareConcern = btn.getAttribute("data-skincare-concern");
        render();
      });
    });
    document.querySelectorAll("[data-skincare-skin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.skincareSkinType = btn.getAttribute("data-skincare-skin");
        render();
      });
    });
    const resetSkincareBtn = document.getElementById("reset-skincare-filters");
    if (resetSkincareBtn) {
      resetSkincareBtn.addEventListener("click", () => {
        state.skincareCategory = "all";
        state.skincareConcern = "all";
        state.skincareSkinType = "all";
        render();
      });
    }

    // 메이크업 서브탭 필터
    document.querySelectorAll("[data-makeup-sub]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.makeupSub = btn.getAttribute("data-makeup-sub");
        render();
      });
    });
    document.querySelectorAll("[data-makeup-tone]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.makeupTone = btn.getAttribute("data-makeup-tone");
        render();
      });
    });
    const resetMakeupBtn = document.getElementById("reset-makeup-filters");
    if (resetMakeupBtn) {
      resetMakeupBtn.addEventListener("click", () => {
        state.makeupSub = "all";
        state.makeupTone = "all";
        render();
      });
    }

    // 브랜드관 서브탭 선택
    document.querySelectorAll("[data-select-brand]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedBrand = btn.getAttribute("data-select-brand");
        render();
        resetScroll();
      });
    });

    // 루틴특가 서브탭 필터
    document.querySelectorAll("[data-sets-skin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.setsSkinType = btn.getAttribute("data-sets-skin");
        render();
      });
    });

    // 카테고리 디렉토리 탭 -> 상품 목록(shop) 오픈
    document.querySelectorAll("[data-dir-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openShopWithFilters({ category: btn.getAttribute("data-dir-cat") });
      });
    });
    document.querySelectorAll("[data-dir-concern]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openShopWithFilters({ concern: btn.getAttribute("data-dir-concern") });
      });
    });
    document.querySelectorAll("[data-dir-skin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openShopWithFilters({ skinType: btn.getAttribute("data-dir-skin") });
      });
    });
    document.querySelectorAll("[data-dir-brand]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openShopWithFilters({ brand: btn.getAttribute("data-dir-brand") });
      });
    });

    // 상품 목록(shop) 내 필터 전환
    document.querySelectorAll("[data-shop-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedCategory = btn.getAttribute("data-shop-cat");
        render();
      });
    });
    document.querySelectorAll("[data-shop-concern]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.shopConcern = btn.getAttribute("data-shop-concern");
        render();
      });
    });
    document.querySelectorAll("[data-shop-skin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.shopSkinType = btn.getAttribute("data-shop-skin");
        render();
      });
    });
    const clearShopBrand = document.getElementById("btn-clear-shop-brand");
    if (clearShopBrand) {
      clearShopBrand.addEventListener("click", () => {
        state.shopBrand = "all";
        render();
      });
    }
    const resetShopAll = document.getElementById("btn-reset-shop-all");
    if (resetShopAll) {
      resetShopAll.addEventListener("click", () => {
        state.selectedCategory = "all";
        state.shopConcern = "all";
        state.shopSkinType = "all";
        state.shopBrand = "all";
        render();
      });
    }

    // 정렬 옵션
    document.querySelectorAll("[data-sort-by]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.sortBy = btn.getAttribute("data-sort-by");
        render();
      });
    });

    // 크리에이터 탭 피부타입 필터 & 팔로우 & 입점 배너
    document.querySelectorAll("[data-creator-skin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.creatorSkinFilter = btn.getAttribute("data-creator-skin");
        render();
      });
    });

    document.querySelectorAll("[data-follow-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cid = btn.getAttribute("data-follow-id");
        if (state.followedCreators.has(cid)) {
          state.followedCreators.delete(cid);
        } else {
          state.followedCreators.add(cid);
          showToast(tr("Urmărești acest creator!", "Following creator!", "크리에이터를 팔로우했습니다."));
        }
        render();
      });
    });

    const joinBanner = document.getElementById("banner-join-creator");
    if (joinBanner) {
      joinBanner.addEventListener("click", () => {
        state.authRole = "creator";
        navigateTo("auth");
      });
    }

    // 루틴 세트 바로구매
    document.querySelectorAll(".btn-bundle-order[data-creator-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const cid = btn.getAttribute("data-creator-id");
        const creator = data.creators.find((c) => c.id === cid);
        if (creator) {
          const rTitle = tr(creator.routine.title, creator.routine.titleEn, creator.routine.titleKo || creator.routine.titleEn);
          state.cart = [
            {
              id: `bundle-${creator.id}`,
              name: rTitle,
              brand: creator.name,
              price: creator.routine.bundlePrice,
              qty: 1,
              image: creator.avatar
            }
          ];
          state.activeModal = "checkout";
          render();
        }
      });
    });

    // 찜 탭 빠른 장바구니 담기
    document.querySelectorAll("[data-quick-cart-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute("data-quick-cart-id");
        const prod = data.products.find((p) => p.id === pid);
        if (prod) {
          const ex = state.cart.find((c) => c.id === prod.id);
          if (ex) ex.qty++;
          else state.cart.push({ ...prod, name: getProductDisplayName(prod), qty: 1 });
          showToast(t("toastCartAdded"));
          render();
        }
      });
    });

    // 상품 카드 클릭 & 찜 토글
    document.querySelectorAll("[data-wish-id]").forEach((btn) => {
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

    document.querySelectorAll(".ably-prod-card[data-product-id], .rb-item-thumb[data-product-id]").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".ably-wish-btn")) return;
        const id = card.getAttribute("data-product-id");
        const prod = data.products.find((p) => p.id === id);
        if (prod) {
          state.selectedProduct = prod;
          state.activeModal = "product";
          render();
        }
      });
    });
  }

  render();

  // 외부 호스팅 자동 주입 배지(Powered by Netlify 등) 자동 제거
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

      const attrText = Array.from(el.attributes || [])
        .map((a) => `${a.name}=${a.value}`)
        .join(" ");
      const shadowText = el.shadowRoot ? el.shadowRoot.innerHTML || "" : "";
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

  // 발표용 뷰모드 전환 단축키 (Alt+P)
  window.addEventListener("keydown", (e) => {
    if ((e.altKey && (e.key === "p" || e.key === "P")) || (e.ctrlKey && e.altKey && (e.key === "p" || e.key === "P"))) {
      e.preventDefault();
      setViewMode(state.viewMode === "pc" ? "mobile" : "pc");
    }
  });

  removeInjectedHostBadges();
  window.addEventListener("load", removeInjectedHostBadges);
  [250, 800, 2000].forEach((ms) => setTimeout(removeInjectedHostBadges, ms));

  if (typeof MutationObserver !== "undefined") {
    const badgeObserver = new MutationObserver(() => removeInjectedHostBadges());
    if (document.documentElement) badgeObserver.observe(document.documentElement, { childList: true });
    if (document.body) badgeObserver.observe(document.body, { childList: true });
  }
});
