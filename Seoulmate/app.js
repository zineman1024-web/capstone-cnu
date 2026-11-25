// 서울메이트 (Seoulmate) - K-뷰티 버티컬 커머스 모바일 웹 애플리케이션
// - 화이트 & 스카이블루 클린 뷰티 인터페이스
// - 올리브영 스타일 풀페이지 상품 상세페이지 (옵션·성분·제형지표·사용법·실구매 리뷰·Q&A·구매바)
// - 상단 체계적 쇼핑 GNB (투데이 · 베스트 · 스킨케어 · 메이크업 · 브랜드 · 루틴특가)
// - 하단 5대 탭바 (홈 · 카테고리 · 크리에이터 · 찜 · 마이) - 메뉴 중복 제로

document.addEventListener("DOMContentLoaded", () => {
  const data = window.SEOULMATE_DATA;
  const i18n = window.SEOULMATE_I18N;
  const pdpProvider = window.SEOULMATE_PDP;

  // 정제된 1.75px 모노라인 SVG 아이콘 시스템 (이모지 배제)
  const ICONS = {
    back: `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`,
    search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    bag: `<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    heart: `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    share: `<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    home: `<svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20V9.5z"/><polyline points="9 21.5 9 13 15 13 15 21.5"/></svg>`,
    category: `<svg viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="14" y2="18"/></svg>`,
    feed: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor"/></svg>`,
    user: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    shield: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    box: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    check: `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
    thumbUp: `<svg viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,
    ticket: `<svg viewBox="0 0 24 24"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>`,
    droplet: `<svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    flask: `<svg viewBox="0 0 24 24"><path d="M9 3h6"/><path d="M10 9l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3h-4v6z"/></svg>`,
    cream: `<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="3"/><path d="M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/><line x1="4" y1="14" x2="20" y2="14"/></svg>`,
    sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></svg>`,
    bubbles: `<svg viewBox="0 0 24 24"><circle cx="9.5" cy="14.5" r="5.5"/><circle cx="16.5" cy="7.5" r="3.5"/><circle cx="18" cy="16.5" r="2"/></svg>`,
    lipstick: `<svg viewBox="0 0 24 24"><path d="M9 11h6v10H9z"/><path d="M10 11V5.5c0-1.5 4-2.5 4 0V11"/><line x1="8" y1="21" x2="16" y2="21"/></svg>`,
    mask: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="8" ry="9.5"/><circle cx="9" cy="10.5" r="1.1"/><circle cx="15" cy="10.5" r="1.1"/><path d="M9.5 15.5c1.5 1 3.5 1 5 0"/></svg>`,
    gift: `<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>`,
    sparkle: `<svg viewBox="0 0 24 24"><path d="M12 2l2.6 5.8L20.5 10l-5.9 2.2L12 18l-2.6-5.8L3.5 10l5.9-2.2L12 2z"/></svg>`,
    monitor: `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    phone: `<svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    logout: `<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    studio: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`,
    chevronRight: `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`
  };

  // 애플리케이션 전역 상태
  let savedViewMode = "mobile";
  try {
    savedViewMode = localStorage.getItem("seoulmate_view_mode") || (window.innerWidth >= 992 ? "pc" : "mobile");
  } catch (_) {
    savedViewMode = window.innerWidth >= 992 ? "pc" : "mobile";
  }

  const state = {
    viewMode: savedViewMode, // 'pc' | 'mobile'
    lang: "ro", // 'ro' | 'en' | 'ko'
    activeTab: "home", // 'home' | 'category' | 'creators' | 'wishlist' | 'my' | 'shop' | 'auth' | 'product' | 'seller'
    homeSubTab: "today", // 'today' | 'best' | 'skincare' | 'makeup' | 'brands' | 'sets'
    historyStack: [{ tab: "home", productId: null }],

    // 상세페이지 (PDP) 상태
    selectedProductId: null,
    pdpTab: "detail", // 'detail' | 'ingredients' | 'reviews' | 'delivery'
    pdpGalleryIndex: 0,
    pdpOptionId: null,
    pdpQty: 1,
    pdpReviewSkinFilter: "all",
    helpfulReviews: new Set(),

    // 히어로 배너 슬라이더
    currentSlide: 0,
    totalSlides: data.heroSlides.length,
    slideInterval: null,

    // 실시간 검색어
    searchQuery: "",

    // 홈 & 버티컬 탭별 필터 상태
    homeConcern: "all",
    bestCategory: "all",
    bestSkinType: "all",
    skincareCategory: "all",
    skincareConcern: "all",
    skincareSkinType: "all",
    makeupSub: "all",
    makeupTone: "all",
    selectedBrand: "all",
    setsSkinType: "all",
    creatorSkinFilter: "all",

    // 상품 목록(shop) 필터 및 정렬
    selectedCategory: "all",
    shopConcern: "all",
    shopSkinType: "all",
    shopBrand: "all",
    sortBy: "popular",

    // 회원 및 크리에이터 파트너 (기본 비로그인 게스트 상태)
    authRole: "consumer",
    authSubmitted: false,
    currentUser: null,
    currentCreator: null,
    creatorProducts: [],
    sellerProfile: {
      brandName: "Anua",
      companyName: "ANUA Official Partner (Romania)",
      bizNumber: "RO-29384910",
      cpnpNumber: "CPNP-EU-3984021",
      contactName: "Elena Popescu",
      contactEmail: "partner@seoulmate.ro",
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
    zoomImageUrl: null,
    zoomImageCaption: "",
    toastMessage: null,
    toastTimer: null
  };

  if (document.body) {
    document.body.classList.toggle("is-pc-mode", state.viewMode === "pc");
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

  function isCreatorLoggedIn() {
    return Boolean(state.currentUser && state.currentUser.role === "creator" && state.currentCreator);
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
    showToast(tr("Autentificat ca Utilizator.", "Logged in as Consumer.", "일반 회원으로 로그인되었습니다."));
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
    if (!state.creatorProducts || state.creatorProducts.length === 0) {
      const routineProdIds = (creator.routine && creator.routine.productIds) || [];
      state.creatorProducts = data.products.filter((p) => routineProdIds.includes(p.id));
    }
    showToast(tr(`Autentificat ca ${creator.name}`, `Logged in as ${creator.name}`, `${creator.name} 크리에이터로 로그인되었습니다.`));
  }

  function logoutUser() {
    state.currentUser = null;
    state.currentCreator = null;
    showToast(tr("Te-ai deconectat.", "Logged out.", "로그아웃되었습니다."));
  }

  function registerNewCreator(name, handle, city, skinType) {
    const cleanHandle = handle.trim().startsWith("@") ? handle.trim() : `@${handle.trim()}`;
    const id = cleanHandle.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || `creator_${Date.now()}`;
    const newCreator = {
      id,
      handle: cleanHandle,
      name: name.trim(),
      city: city || "București",
      followers: "50K+",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      skinProfile: { type: skinType || "Mixt", concerns: ["Pori", "Calmare"], undertone: "Neutru", style: "Natural" },
      routine: {
        titleKo: `${name}의 K-뷰티 데일리 큐레이션 세트`,
        titleEn: `${name}'s Daily K-Beauty Curation Set`,
        title: `Rutina ${name}: K-Beauty Glow`,
        description: "Rutina zilnică K-Beauty verificată.",
        descriptionEn: "Verified daily K-Beauty routine.",
        descriptionKo: "검증된 데일리 K-뷰티 루틴입니다.",
        productIds: [],
        originalPrice: 220,
        bundlePrice: 185,
        discountPercent: 16
      },
      feedPost: {
        id: `post-${Date.now()}`,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
        caption: "Selecția mea K-Beauty oficială pe Seoulmate.",
        captionEn: "My curated K-Beauty picks on Seoulmate.",
        captionKo: "서울메이트에서 직접 큐레이션한 K-뷰티 추천템입니다.",
        tags: ["Seoulmate", "KBeauty"]
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
    showToast(tr("Bun venit în Creator Studio!", "Welcome to Creator Studio!", "크리에이터 스튜디오에 입장했습니다."));
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

  function getOptionPrice(prod, optionObj) {
    if (!optionObj) return prod.price;
    if (optionObj.priceMultiplier) return Math.round(prod.price * optionObj.priceMultiplier);
    if (optionObj.priceDelta) return Math.max(15, prod.price + optionObj.priceDelta);
    return prod.price;
  }

  function getCategoriesMeta() {
    return [
      { key: "all", label: t("catAllSkincare"), shortLabel: t("concernAll"), iconSvg: ICONS.sparkle, count: data.products.length },
      { key: "Toner & Tampoane", label: t("quickToners"), shortLabel: t("quickToners"), iconSvg: ICONS.droplet, count: data.products.filter((p) => p.category === "Toner & Tampoane").length },
      { key: "Serum & Fiole", label: t("quickSerums"), shortLabel: t("quickSerums"), iconSvg: ICONS.flask, count: data.products.filter((p) => p.category === "Serum & Fiole").length },
      { key: "Creme & Hidratare", label: t("quickCreams"), shortLabel: t("quickCreams"), iconSvg: ICONS.cream, count: data.products.filter((p) => p.category === "Creme & Hidratare").length },
      { key: "Protecție Solară", label: t("quickSPF"), shortLabel: t("quickSPF"), iconSvg: ICONS.sun, count: data.products.filter((p) => p.category === "Protecție Solară").length },
      { key: "Curățare", label: t("quickCleanser"), shortLabel: t("quickCleanser"), iconSvg: ICONS.bubbles, count: data.products.filter((p) => p.category === "Curățare").length },
      { key: "Machiaj", label: t("quickMakeup"), shortLabel: t("quickMakeup"), iconSvg: ICONS.lipstick, count: data.products.filter((p) => p.category === "Machiaj").length },
      { key: "Măști & Tampoane", label: t("quickMask"), shortLabel: t("quickMask"), iconSvg: ICONS.mask, count: data.products.filter((p) => p.category === "Măști & Tampoane").length }
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
      state.historyStack.push({ tab, productId: null });
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

  function openProductDetail(productId) {
    const prod = data.products.find((p) => p.id === productId);
    if (!prod) return;
    const detail = pdpProvider.getDetail(prod);
    state.selectedProductId = prod.id;
    state.pdpTab = "detail";
    state.pdpGalleryIndex = 0;
    state.pdpOptionId = detail.options[0] ? detail.options[0].id : null;
    state.pdpQty = 1;
    state.pdpReviewSkinFilter = "all";
    state.activeTab = "product";
    state.historyStack.push({ tab: "product", productId: prod.id });
    render();
    resetScroll();
  }

  function openShopWithFilters({ category = "all", concern = "all", skinType = "all", brand = "all" } = {}) {
    state.selectedCategory = category;
    state.shopConcern = concern;
    state.shopSkinType = skinType;
    state.shopBrand = brand;
    if (state.activeTab !== "shop") {
      state.historyStack.push({ tab: "shop", productId: null });
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
      const prev = state.historyStack[state.historyStack.length - 1];
      state.activeTab = prev.tab;
      if (prev.tab === "product" && prev.productId) {
        state.selectedProductId = prev.productId;
      }
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
    if (track) track.style.transform = `translateX(-${state.currentSlide * 100}%)`;
    if (counter) counter.innerText = `${state.currentSlide + 1} / ${state.totalSlides}`;
  }

  function startAutoSlide() {
    if (state.slideInterval) clearInterval(state.slideInterval);
    state.slideInterval = setInterval(() => {
      if (state.activeTab === "home" && state.homeSubTab === "today" && !state.searchQuery.trim()) {
        nextSlide();
      }
    }, 4800);
  }

  startAutoSlide();

  const appContainer = document.getElementById("app-root");

  function getHeaderTitle() {
    if (state.activeTab === "product") {
      const prod = data.products.find((p) => p.id === state.selectedProductId);
      return prod ? prod.brand : "";
    }
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
      seller: tr("Creator Studio", "Creator Studio", "크리에이터 스튜디오")
    };
    return map[state.activeTab] || "";
  }

  function render() {
    const isHome = state.activeTab === "home";
    const isProductPage = state.activeTab === "product";
    const cartQty = state.cart.reduce((acc, item) => acc + item.qty, 0);
    const wishCount = state.wishlist.size;

    appContainer.innerHTML = `
      <div class="seoulmate-wrapper">
        ${state.toastMessage ? `<div class="ably-toast">${state.toastMessage}</div>` : ""}

        <div class="phone-frame">
          <!-- 상단 스토어 헤더 -->
          <header class="ably-header ${isProductPage ? "is-pdp-header" : ""}">
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
                  !isProductPage && isCreatorLoggedIn()
                    ? `
                  <button class="btn-seller-hub" id="btn-header-seller" data-tab="seller">
                    ${ICONS.studio}
                    <span>${tr("Studio", "Studio", "스튜디오")}</span>
                  </button>
                `
                    : ""
                }
                ${
                  isProductPage
                    ? `
                  <button class="icon-btn" id="btn-pdp-home" aria-label="Home">${ICONS.home}</button>
                  <button class="icon-btn" id="btn-pdp-share" aria-label="Share">${ICONS.share}</button>
                `
                    : `
                  <div class="lang-selector" role="group" aria-label="Language">
                    <button class="lang-pill ${state.lang === "ro" ? "active" : ""}" data-set-lang="ro">RO</button>
                    <button class="lang-pill ${state.lang === "en" ? "active" : ""}" data-set-lang="en">EN</button>
                    <button class="lang-pill ${state.lang === "ko" ? "active" : ""}" data-set-lang="ko">한국어</button>
                  </div>
                  <button class="view-mode-pill" id="btn-toggle-viewmode" title="PC / Mobile (Alt+P)">
                    ${state.viewMode === "pc" ? `${ICONS.phone}<span>Mobile</span>` : `${ICONS.monitor}<span>PC</span>`}
                  </button>
                  <button class="icon-btn" id="btn-nav-search" aria-label="Search">${ICONS.search}</button>
                `
                }
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

            ${
              !isProductPage
                ? `
              <div class="ably-trust-strip" id="btn-show-trust">
                <div class="trust-strip-left">
                  <span class="trust-badge-mini">CPNP</span>
                  <span class="trust-strip-text">${t("trustTicker")}</span>
                </div>
                <span class="trust-strip-arrow">›</span>
              </div>
            `
                : ""
            }
          </header>

          <!-- 메인 스크롤 영역 -->
          <main class="app-main-content ${isProductPage ? "is-pdp-scroll" : ""}" id="main-scroll-area">
            ${renderActiveView()}
          </main>

          <!-- 하단 고정 영역: 상세페이지에서는 올리브영형 구매 바 / 그 외 5대 탭바 -->
          ${isProductPage ? renderPdpBottomBar() : renderBottomNav(wishCount)}
        </div>

        <!-- 모달 / 바텀시트 컨테이너 -->
        <div id="modal-container">
          ${renderActiveModal()}
        </div>
      </div>
    `;

    attachEventListeners();
  }

  function renderBottomNav(wishCount) {
    return `
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
    `;
  }

  function renderActiveView() {
    switch (state.activeTab) {
      case "product":
        return renderProductDetailPage();
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
  // [올리브영 스타일 풀페이지 상품 상세 페이지 (PDP)]
  // ==========================================================================
  function renderProductDetailPage() {
    const prod = data.products.find((p) => p.id === state.selectedProductId) || data.products[0];
    const detail = pdpProvider.getDetail(prod);
    const activeOpt = detail.options.find((o) => o.id === state.pdpOptionId) || detail.options[0];
    const unitPrice = getOptionPrice(prod, activeOpt);
    const unitOriginal = activeOpt && activeOpt.priceMultiplier ? Math.round(prod.originalPrice * activeOpt.priceMultiplier) : prod.originalPrice;
    const estCouponPrice = Math.round(unitPrice * 0.9);
    const eurPrice = (unitPrice / data.platform.exchangeRateEUR).toFixed(1);
    const title = getProductDisplayName(prod);
    const subTitle = state.lang === "ko" ? prod.englishName : prod.romanianName;
    const desc = tr(prod.descriptionRo, prod.descriptionEn, prod.descriptionKo || prod.descriptionEn);

    // 함께 쓰면 좋은 추천 상품 (같은 고민 또는 보완 카테고리)
    const relatedProducts = data.products
      .filter((item) => item.id !== prod.id)
      .sort((a, b) => {
        const aMatch = (a.concerns || []).some((c) => (prod.concerns || []).includes(c)) ? 1 : 0;
        const bMatch = (b.concerns || []).some((c) => (prod.concerns || []).includes(c)) ? 1 : 0;
        return bMatch - aMatch || b.reviewsCount - a.reviewsCount;
      })
      .slice(0, 4);

    const isWished = state.wishlist.has(prod.id);
    const totalPrice = unitPrice * state.pdpQty;

    const totalGallerySlides = detail.galleryPhotos.length + 1;
    const currentPhotoSlide = detail.galleryPhotos[state.pdpGalleryIndex];

    return `
      <div class="pdp-page">
        <div class="pdp-top-layout">
          <!-- 1. 멀티 포토 상품 갤러리 & 썸네일 스트립 -->
          <section class="pdp-gallery-column">
            <div class="pdp-gallery-wrap">
              ${
                currentPhotoSlide
                  ? `
                <div class="pdp-hero-media" data-zoom-img="${currentPhotoSlide.url}" data-zoom-caption="${title}">
                  <img src="${currentPhotoSlide.url}" alt="${title}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${prod.category}','${prod.brand}','${prod.name.replace(/'/g, "\\'")}')" />
                  <span class="pdp-cpnp-tag">EU CPNP</span>
                  <span class="pdp-photo-caption-pill">${tr(currentPhotoSlide.captionRo, currentPhotoSlide.captionEn, currentPhotoSlide.captionKo)}</span>
                </div>
              `
                  : `
                <div class="pdp-spec-slide">
                  <span class="pdp-spec-slide-kicker">${prod.brand} · OFFICIAL SPEC</span>
                  <h4>${title}</h4>
                  <div class="pdp-spec-slide-grid">
                    <div class="pdp-spec-mini">
                      <span>${tr("Volum", "Volume", "용량")}</span>
                      <strong>${detail.volume}</strong>
                    </div>
                    <div class="pdp-spec-mini">
                      <span>CPNP</span>
                      <strong>${prod.cpnpNumber}</strong>
                    </div>
                    <div class="pdp-spec-mini">
                      <span>${tr("Lot Oficial", "Batch Lot", "정품 로트")}</span>
                      <strong>${prod.lotNumber}</strong>
                    </div>
                    <div class="pdp-spec-mini">
                      <span>PAO</span>
                      <strong>${detail.pao}</strong>
                    </div>
                  </div>
                  <p class="pdp-spec-slide-note">${desc}</p>
                </div>
              `
              }

              <button class="hero-arrow-btn prev" id="btn-pdp-prev" aria-label="Previous photo">${ICONS.chevronLeft}</button>
              <button class="hero-arrow-btn next" id="btn-pdp-next" aria-label="Next photo">${ICONS.chevronRight}</button>

              <div class="pdp-gallery-controls">
                <div class="pdp-gallery-dots">
                  ${Array.from({ length: totalGallerySlides })
                    .map((_, i) => `<button class="pdp-dot ${state.pdpGalleryIndex === i ? "active" : ""}" data-pdp-slide="${i}" aria-label="Slide ${i + 1}"></button>`)
                    .join("")}
                </div>
                <span class="pdp-gallery-counter">${state.pdpGalleryIndex + 1} / ${totalGallerySlides}</span>
              </div>
            </div>

            <!-- 클릭 가능한 4컷 썸네일 갤러리 스트립 -->
            <div class="pdp-thumb-strip">
              ${detail.galleryPhotos
                .map(
                  (ph, idx) => `
                  <button class="pdp-thumb-btn ${state.pdpGalleryIndex === idx ? "active" : ""}" data-pdp-slide="${idx}">
                    <img src="${ph.url}" alt="${tr(ph.captionRo, ph.captionEn, ph.captionKo)}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${prod.category}','${prod.brand}','${prod.name.replace(/'/g, "\\'")}')" />
                  </button>
                `
                )
                .join("")}
              <button class="pdp-thumb-btn pdp-thumb-spec ${state.pdpGalleryIndex === detail.galleryPhotos.length ? "active" : ""}" data-pdp-slide="${detail.galleryPhotos.length}">
                <span>CPNP</span>
                <small>SPEC</small>
              </button>
            </div>
          </section>

        <!-- 2. 핵심 상품 정보 & 가격 블록 -->
        <section class="pdp-header-info">
          <div class="pdp-brand-row">
            <button class="pdp-brand-link" data-pdp-open-brand="${prod.brand}">
              ${prod.brand} <span>›</span>
            </button>
            <span class="pdp-volume-pill">${detail.volume}</span>
          </div>

          <h1 class="pdp-title">${title}</h1>
          <p class="pdp-subtitle">${subTitle}</p>

          <div class="pdp-rating-row">
            <button class="pdp-rating-jump" data-pdp-tab="reviews">
              <span class="ably-stars">★★★★★</span>
              <strong>${prod.rating}</strong>
              <span class="pdp-review-count-link">(${prod.reviewsCount} ${t("pdpTabReviews")}) ›</span>
            </button>
          </div>

          <div class="pdp-price-block">
            <div class="pdp-price-original">${unitOriginal} lei</div>
            <div class="pdp-price-main-row">
              <span class="pdp-discount">${prod.discount}%</span>
              <span class="pdp-price">${unitPrice}<small> lei</small></span>
              <span class="pdp-eur-ref">≈ €${eurPrice}</span>
            </div>

            <div class="pdp-benefit-box">
              <div class="pdp-benefit-left">
                <span class="pdp-benefit-icon">${ICONS.ticket}</span>
                <span>${t("pdpMaxBenefit")}</span>
              </div>
              <strong class="pdp-benefit-price">${estCouponPrice} lei</strong>
            </div>
          </div>

          <!-- 3. 옵션 및 수량 선택 -->
          <div class="pdp-option-section">
            <div class="pdp-option-head">
              <span>${t("pdpOptionTitle")}</span>
            </div>
            <div class="pdp-option-list">
              ${detail.options
                .map((opt) => {
                  const optLabel = tr(opt.labelRo, opt.labelEn, opt.labelKo);
                  const optPrice = getOptionPrice(prod, opt);
                  const isActive = activeOpt && activeOpt.id === opt.id;
                  return `
                    <button class="pdp-option-pill ${isActive ? "active" : ""}" data-pdp-opt="${opt.id}">
                      <span class="opt-name">${optLabel}</span>
                      <span class="opt-price">${optPrice} lei</span>
                    </button>
                  `;
                })
                .join("")}
            </div>

            <div class="pdp-qty-row">
              <span class="pdp-qty-label">${t("pdpQuantityLabel")}</span>
              <div class="pdp-qty-right">
                <div class="pdp-stepper">
                  <button class="stepper-btn" id="btn-pdp-qty-minus" aria-label="Decrease">−</button>
                  <span class="stepper-val">${state.pdpQty}</span>
                  <button class="stepper-btn" id="btn-pdp-qty-plus" aria-label="Increase">+</button>
                </div>
                <strong class="pdp-qty-subtotal">${unitPrice * state.pdpQty} lei</strong>
              </div>
            </div>
          </div>

          <!-- 4. 올리브영 스타일 배송 / 결제 / 정품 / 피부추천 정보 표 -->
          <div class="pdp-info-table">
            <div class="pdp-info-row">
              <span class="pdp-info-key">${t("pdpDeliveryLabel")}</span>
              <span class="pdp-info-val"><strong>${t("pdpDeliveryDesc")}</strong></span>
            </div>
            <div class="pdp-info-row">
              <span class="pdp-info-key">${t("pdpPaymentLabel")}</span>
              <span class="pdp-info-val">${t("pdpPaymentDesc")}</span>
            </div>
            <div class="pdp-info-row">
              <span class="pdp-info-key">${t("pdpAuthLabel")}</span>
              <span class="pdp-info-val">
                ${prod.cpnpNumber}
                <button class="pdp-inline-link" id="btn-pdp-cert">${t("verifyCertBtn")}</button>
              </span>
            </div>
            <div class="pdp-info-row">
              <span class="pdp-info-key">${t("pdpSkinFitLabel")}</span>
              <span class="pdp-info-val pdp-tag-wrap">
                ${(prod.concerns || []).map((c) => `<span class="cm-chip highlight">${getConcernLabel(c)}</span>`).join("")}
                ${(prod.skinTypes || []).map((s) => `<span class="cm-chip">${getSkinTypeLabel(s)}</span>`).join("")}
                ${prod.undertone ? `<span class="cm-chip">${getUndertoneLabel(prod.undertone)}</span>` : ""}
              </span>
            </div>
          </div>

          <!-- PC 와이드 전용 인라인 구매 액션 바 -->
          <div class="pdp-pc-actions">
            <button class="pdp-wish-action ${isWished ? "wished" : ""}" data-wish-id="${prod.id}" aria-label="Wishlist">
              ${ICONS.heart}
            </button>
            <button class="pdp-btn-cart" data-pdp-add-cart="1">${t("sheetAddToCart")}</button>
            <button class="pdp-btn-buy" data-pdp-buy-now="1">${t("sheetInstantBuy")} · ${totalPrice} lei</button>
          </div>
        </section>
        </div>

        <div class="section-divider"></div>

        <!-- 5. 스티키 4대 상세 탭 (상품설명 · 성분·정보 · 리뷰 · 배송·Q&A) -->
        <nav class="pdp-sticky-tabs" id="pdp-tabs-anchor">
          <button class="pdp-tab-btn ${state.pdpTab === "detail" ? "active" : ""}" data-pdp-tab="detail">${t("pdpTabDetail")}</button>
          <button class="pdp-tab-btn ${state.pdpTab === "ingredients" ? "active" : ""}" data-pdp-tab="ingredients">${t("pdpTabIngredients")}</button>
          <button class="pdp-tab-btn ${state.pdpTab === "reviews" ? "active" : ""}" data-pdp-tab="reviews">${t("pdpTabReviews")} <small>${prod.reviewsCount}</small></button>
          <button class="pdp-tab-btn ${state.pdpTab === "delivery" ? "active" : ""}" data-pdp-tab="delivery">${t("pdpTabDelivery")}</button>
        </nav>

        <!-- 6. 활성 탭별 상세 콘텐츠 -->
        <div class="pdp-tab-content">
          ${renderPdpTabContent(prod, detail, desc, relatedProducts)}
        </div>
      </div>
    `;
  }

  function renderPdpTabContent(prod, detail, desc, relatedProducts) {
    // 탭 1: 상품설명 (올리브영 스타일 제품 화보 · 텍스처 컷 · 체크포인트 · 성분 · 사용법 · 포토 리뷰)
    if (state.pdpTab === "detail") {
      const p0 = detail.galleryPhotos[0];
      const p1 = detail.galleryPhotos[1];
      const p2 = detail.galleryPhotos[2];

      return `
        <section class="pdp-block">
          <!-- 에디토리얼 제품 화보 배너 -->
          <div class="pdp-visual-story">
            <div class="pdp-story-imgwrap" data-zoom-img="${p0.url}" data-zoom-caption="${getProductDisplayName(prod)}">
              <img src="${p0.url}" alt="${getProductDisplayName(prod)}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${prod.category}','${prod.brand}','${prod.name.replace(/'/g, "\\'")}')" />
            </div>
            <div class="pdp-story-caption">
              <span class="pdp-eyebrow">${prod.brand} · OFFICIAL CARE</span>
              <h4 class="pdp-story-headline">${getProductDisplayName(prod)}</h4>
              <p class="pdp-lead-copy">${desc}</p>
            </div>
          </div>

          <h3 class="pdp-sec-title">${t("pdpWhyLove")}</h3>
          <ul class="pdp-check-list">
            ${detail.highlights
              .map(
                (h) => `
                <li>
                  <span class="pdp-check-icon">${ICONS.check}</span>
                  <span>${tr(h.ro, h.en, h.ko)}</span>
                </li>
              `
              )
              .join("")}
          </ul>
        </section>

        <div class="section-divider"></div>

        <section class="pdp-block">
          <h3 class="pdp-sec-title">${t("pdpTextureTitle")}</h3>
          <div class="pdp-texture-split">
            <div class="pdp-texture-photo" data-zoom-img="${p1.url}" data-zoom-caption="${tr(p1.captionRo, p1.captionEn, p1.captionKo)}">
              <img src="${p1.url}" alt="${tr(p1.captionRo, p1.captionEn, p1.captionKo)}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${prod.category}','${prod.brand}','${prod.name.replace(/'/g, "\\'")}')" />
              <span class="pdp-mini-cap">${tr(p1.captionRo, p1.captionEn, p1.captionKo)}</span>
            </div>
            <div class="pdp-meter-list">
              ${detail.texture
                .map(
                  (item) => `
                  <div class="pdp-meter-row">
                    <span class="pdp-meter-label">${tr(item.labelRo, item.labelEn, item.labelKo)}</span>
                    <div class="pdp-meter-track">
                      <div class="pdp-meter-fill" style="width:${item.score}%"></div>
                    </div>
                    <span class="pdp-meter-score">${item.score}%</span>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>
        </section>

        <div class="section-divider"></div>

        <section class="pdp-block">
          <div class="ably-section-head">
            <h3 class="pdp-sec-title" style="margin:0;">${t("pdpIngredientsTitle")}</h3>
            <button class="section-more-link" data-pdp-tab="ingredients">${t("seeAll")}</button>
          </div>
          <div class="pdp-ingredient-cards">
            ${detail.ingredients
              .map(
                (ing, idx) => `
                <div class="pdp-ing-card">
                  <span class="pdp-ing-num">0${idx + 1}</span>
                  <div>
                    <strong class="pdp-ing-name">${ing.name}</strong>
                    <p class="pdp-ing-role">${tr(ing.roleRo, ing.roleEn, ing.roleKo)}</p>
                  </div>
                </div>
              `
              )
              .join("")}
          </div>
        </section>

        <div class="section-divider"></div>

        <section class="pdp-block">
          <h3 class="pdp-sec-title">${t("pdpHowToTitle")}</h3>
          <div class="pdp-visual-duo">
            <div class="pdp-duo-card" data-zoom-img="${p1.url}" data-zoom-caption="${tr(p1.captionRo, p1.captionEn, p1.captionKo)}">
              <img src="${p1.url}" alt="${tr(p1.captionRo, p1.captionEn, p1.captionKo)}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${prod.category}','${prod.brand}','${prod.name.replace(/'/g, "\\'")}')" />
              <span>${tr(p1.captionRo, p1.captionEn, p1.captionKo)}</span>
            </div>
            <div class="pdp-duo-card" data-zoom-img="${p2.url}" data-zoom-caption="${tr(p2.captionRo, p2.captionEn, p2.captionKo)}">
              <img src="${p2.url}" alt="${tr(p2.captionRo, p2.captionEn, p2.captionKo)}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${prod.category}','${prod.brand}','${prod.name.replace(/'/g, "\\'")}')" />
              <span>${tr(p2.captionRo, p2.captionEn, p2.captionKo)}</span>
            </div>
          </div>

          <div class="pdp-steps-list">
            ${detail.howToUse
              .map(
                (st, i) => `
                <div class="pdp-step-item">
                  <span class="pdp-step-badge">STEP 0${i + 1}</span>
                  <p>${tr(st.ro, st.en, st.ko)}</p>
                </div>
              `
              )
              .join("")}
          </div>

          <h3 class="pdp-sec-title" style="margin-top:22px;">${t("pdpSuitabilityTitle")}</h3>
          <div class="pdp-suit-grid">
            ${["Mixt", "Gras", "Sensibil", "Uscat"]
              .map((skin) => {
                const matched = (prod.skinTypes || []).includes(skin);
                return `
                  <div class="pdp-suit-cell ${matched ? "matched" : ""}">
                    <strong>${getSkinTypeLabel(skin)}</strong>
                    <span>${matched ? tr("Recomandat", "Best Fit", "추천") : tr("Potrivit", "Good", "무난")}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
        </section>

        <div class="section-divider"></div>

        <!-- 리뷰 미리보기 -->
        <section class="pdp-block">
          <div class="ably-section-head">
            <h3 class="pdp-sec-title" style="margin:0;">${t("pdpReviewSummaryTitle")} (${prod.reviewsCount})</h3>
            <button class="section-more-link" data-pdp-tab="reviews">${t("seeAll")}</button>
          </div>
          <div class="pdp-review-list">
            ${detail.reviews.slice(0, 2).map((rev) => renderReviewCard(rev)).join("")}
          </div>
        </section>

        <div class="section-divider"></div>

        <!-- 함께 쓰면 좋은 상품 -->
        <section class="pdp-block">
          <h3 class="pdp-sec-title">${t("pdpRelatedTitle")}</h3>
          <div class="ably-product-grid">
            ${relatedProducts.map((item, idx) => renderProductCard(item, idx + 1, false)).join("")}
          </div>
        </section>
      `;
    }

    // 탭 2: 성분 · 상품정보 제공고시
    if (state.pdpTab === "ingredients") {
      return `
        <section class="pdp-block">
          <h3 class="pdp-sec-title">${t("pdpIngredientsTitle")}</h3>
          <div class="pdp-ingredient-cards" style="margin-bottom:18px;">
            ${detail.ingredients
              .map(
                (ing, idx) => `
                <div class="pdp-ing-card">
                  <span class="pdp-ing-num">0${idx + 1}</span>
                  <div>
                    <strong class="pdp-ing-name">${ing.name}</strong>
                    <p class="pdp-ing-role">${tr(ing.roleRo, ing.roleEn, ing.roleKo)}</p>
                  </div>
                </div>
              `
              )
              .join("")}
          </div>

          <h3 class="pdp-sec-title">INCI (${tr("Listă Completă Ingrediente", "Full Ingredient List", "전성분 표시")})</h3>
          <div class="pdp-inci-box">${detail.inci}</div>

          <h3 class="pdp-sec-title" style="margin-top:22px;">${t("pdpSpecTableTitle")}</h3>
          <div class="pdp-spec-table">
            <div class="pdp-spec-row"><span>${tr("Brand", "Brand", "브랜드")}</span><strong>${prod.brand}</strong></div>
            <div class="pdp-spec-row"><span>${tr("Volum / Greutate", "Volume / Weight", "용량 / 중량")}</span><strong>${detail.volume}</strong></div>
            <div class="pdp-spec-row"><span>${tr("Țara de Origine", "Country of Origin", "제조국")}</span><strong>${detail.origin}</strong></div>
            <div class="pdp-spec-row"><span>${tr("Valabilitate după deschidere", "Period After Opening", "개봉 후 사용기한")}</span><strong>${detail.pao}</strong></div>
            <div class="pdp-spec-row"><span>EU CPNP No.</span><strong>${prod.cpnpNumber}</strong></div>
            <div class="pdp-spec-row"><span>${tr("Cod Lot Trasabil", "Traceable Batch Lot", "공식 수입 로트")}</span><strong>${prod.lotNumber}</strong></div>
          </div>
        </section>
      `;
    }

    // 탭 3: 실구매자 리뷰 (올리브영 평점 분포 + 만족도 지표 + 피부타입 필터 + 리뷰 리스트)
    if (state.pdpTab === "reviews") {
      const filteredReviews =
        state.pdpReviewSkinFilter === "all"
          ? detail.reviews
          : detail.reviews.filter((r) => r.skinType === state.pdpReviewSkinFilter);

      return `
        <section class="pdp-block">
          <div class="pdp-review-dashboard">
            <div class="pdp-score-left">
              <strong class="pdp-big-score">${prod.rating}</strong>
              <span class="ably-stars">★★★★★</span>
              <span class="pdp-score-total">${prod.reviewsCount} ${t("pdpTabReviews")}</span>
            </div>
            <div class="pdp-score-bars">
              ${detail.ratingBreakdown
                .map(
                  (row) => `
                  <div class="score-bar-row">
                    <span>${row.star}${tr("★", "★", "점")}</span>
                    <div class="score-bar-track"><div class="score-bar-fill" style="width:${row.pct}%"></div></div>
                    <span class="score-bar-pct">${row.pct}%</span>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>

          <!-- 올리브영 스타일 항목별 평가 지표 -->
          <div class="pdp-survey-card">
            ${detail.surveyMetrics
              .map(
                (m) => `
                <div class="survey-row">
                  <span class="survey-label">${tr(m.labelRo, m.labelEn, m.labelKo)}</span>
                  <span class="survey-val">${tr(m.valueRo, m.valueEn, m.valueKo)}</span>
                  <strong class="survey-pct">${m.pct}%</strong>
                </div>
              `
              )
              .join("")}
          </div>

          <!-- 포토 리뷰 모아보기 스트립 -->
          <div class="pdp-photo-reviews-strip">
            <span class="pdp-photo-strip-title">${tr("Fotografii de la clienți", "Customer Photos", "포토 리뷰 모아보기")}</span>
            <div class="pdp-photo-strip-grid">
              ${detail.reviews
                .filter((r) => r.photo)
                .map(
                  (r) => `
                  <button class="pdp-rev-photo-tile" data-zoom-img="${r.photo}" data-zoom-caption="${r.author}">
                    <img src="${r.photo}" alt="Review photo by ${r.author}" />
                  </button>
                `
                )
                .join("")}
            </div>
          </div>

          <!-- 피부타입별 리뷰 필터 -->
          <div class="filter-chips-scroll" style="padding:0; margin:16px 0 12px;">
            ${["all", "Mixt", "Sensibil", "Gras", "Uscat"]
              .map(
                (st) => `
                <button class="sub-filter-pill ${state.pdpReviewSkinFilter === st ? "active" : ""}" data-pdp-rev-skin="${st}">
                  ${getSkinTypeLabel(st)}
                </button>
              `
              )
              .join("")}
          </div>

          <div class="pdp-review-list">
            ${
              filteredReviews.length > 0
                ? filteredReviews.map((rev) => renderReviewCard(rev)).join("")
                : `<div class="empty-state-box"><p class="empty-state-text">${tr("Încă nu există recenzii pentru acest filtru.", "No reviews for this skin type filter yet.", "해당 피부타입 필터의 리뷰가 아직 없습니다.")}</p></div>`
            }
          </div>
        </section>
      `;
    }

    // 탭 4: 배송 및 Q&A
    return `
      <section class="pdp-block">
        <h3 class="pdp-sec-title">${tr("Informații Livrare & Retur", "Shipping & Return Policy", "배송 및 교환·반품 안내")}</h3>
        <div class="pdp-spec-table" style="margin-bottom:22px;">
          <div class="pdp-spec-row"><span>${tr("Curier", "Carrier", "배송 방법")}</span><strong>Sameday easybox (10,000+ Lockers)</strong></div>
          <div class="pdp-spec-row"><span>${tr("Cost Transport", "Shipping Fee", "배송비")}</span><strong>${tr("12 lei (GRATUIT peste 150 lei)", "12 lei (FREE over 150 lei)", "12 lei (150 lei 이상 무료배송)")}</strong></div>
          <div class="pdp-spec-row"><span>${tr("Timp Livrare", "Delivery Time", "예상 소요")}</span><strong>${tr("1–2 zile lucrătoare", "1–2 business days", "출고 후 영업일 1~2일 이내")}</strong></div>
          <div class="pdp-spec-row"><span>${tr("Retur", "Returns", "반품 안내")}</span><strong>${tr("14 zile pentru produse sigilate", "14 days for unopened items", "미개봉 상품 수령 후 14일 이내")}</strong></div>
        </div>

        <h3 class="pdp-sec-title">${t("pdpQaTitle")}</h3>
        <div class="pdp-qa-list">
          ${detail.qaList
            .map(
              (qa) => `
              <div class="pdp-qa-card">
                <div class="qa-q"><span class="qa-badge-q">Q</span><strong>${tr(qa.qRo, qa.qEn, qa.qKo)}</strong></div>
                <div class="qa-a"><span class="qa-badge-a">A</span><p>${tr(qa.aRo, qa.aEn, qa.aKo)}</p></div>
              </div>
            `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderReviewCard(rev) {
    const isHelpful = state.helpfulReviews.has(rev.id);
    const count = rev.helpful + (isHelpful ? 1 : 0);
    return `
      <article class="pdp-review-card">
        <div class="rev-top">
          <div class="rev-author-wrap">
            <strong>${rev.author}</strong>
            <span class="rev-verified">${t("pdpWriteVerify")}</span>
          </div>
          <span class="rev-date">${rev.date}</span>
        </div>
        <div class="rev-meta">
          <span class="ably-stars">${"★".repeat(rev.rating)}</span>
          <span class="cm-chip">${getSkinTypeLabel(rev.skinType)}</span>
        </div>
        <div class="rev-content-row">
          <p class="rev-body">${tr(rev.textRo, rev.textEn, rev.textKo)}</p>
          ${
            rev.photo
              ? `<button class="rev-photo-thumb" data-zoom-img="${rev.photo}" data-zoom-caption="${rev.author}">
                  <img src="${rev.photo}" alt="Customer review" />
                </button>`
              : ""
          }
        </div>
        <button class="rev-helpful-btn ${isHelpful ? "active" : ""}" data-helpful-id="${rev.id}">
          ${ICONS.thumbUp}
          <span>${t("pdpHelpful")} ${count}</span>
        </button>
      </article>
    `;
  }

  function renderPdpBottomBar() {
    const prod = data.products.find((p) => p.id === state.selectedProductId) || data.products[0];
    const detail = pdpProvider.getDetail(prod);
    const activeOpt = detail.options.find((o) => o.id === state.pdpOptionId) || detail.options[0];
    const totalPrice = getOptionPrice(prod, activeOpt) * state.pdpQty;
    const isWished = state.wishlist.has(prod.id);

    return `
      <div class="pdp-bottom-bar">
        <button class="pdp-wish-action ${isWished ? "wished" : ""}" data-wish-id="${prod.id}" aria-label="Wishlist">
          ${ICONS.heart}
        </button>
        <button class="pdp-btn-cart" data-pdp-add-cart="1">${t("sheetAddToCart")}</button>
        <button class="pdp-btn-buy" data-pdp-buy-now="1">${t("sheetInstantBuy")} · ${totalPrice} lei</button>
      </div>
    `;
  }

  // ==========================================================================
  // [홈 & 상단 6대 쇼핑 GNB 버티컬]
  // ==========================================================================
  function renderHomeBody() {
    if (state.searchQuery.trim()) return renderSearchResultsView();
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
            ${tr("Șterge căutarea ✕", "Clear ✕", "검색 초기화 ✕")}
          </button>
        </div>

        ${
          results.length > 0
            ? `<div class="ably-product-grid">
                ${results.map((prod, idx) => renderProductCard(prod, idx + 1, false)).join("")}
              </div>`
            : `<div class="empty-state-box">
                <p class="empty-state-text">${tr("Niciun produs găsit pentru această căutare.", "No matching products found.", "일치하는 상품이 없습니다. 인기 키워드로 검색해 보세요.")}</p>
                <div class="keyword-suggest-row">
                  ${popularKeywords.map((kw) => `<button class="filter-chip" data-search-kw="${kw}">#${kw}</button>`).join("")}
                </div>
              </div>`
        }
      </section>
    `;
  }

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
      <!-- 1. 인터랙티브 히어로 배너 -->
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
        <div class="hero-counter-badge" id="hero-counter-num">${state.currentSlide + 1} / ${state.totalSlides}</div>
      </section>

      <!-- 2. 클린 스카이블루 4x2 품목 퀵 카테고리 -->
      <section class="quick-cat-section">
        <div class="quick-cat-grid">
          <button class="quick-cat-item" data-open-cat="Toner & Tampoane">
            <div class="quick-cat-icon">${ICONS.droplet}</div>
            <span class="quick-cat-label">${t("quickToners")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Serum & Fiole">
            <div class="quick-cat-icon">${ICONS.flask}</div>
            <span class="quick-cat-label">${t("quickSerums")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Creme & Hidratare">
            <div class="quick-cat-icon">${ICONS.cream}</div>
            <span class="quick-cat-label">${t("quickCreams")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Protecție Solară">
            <div class="quick-cat-icon">${ICONS.sun}</div>
            <span class="quick-cat-label">${t("quickSPF")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Curățare">
            <div class="quick-cat-icon">${ICONS.bubbles}</div>
            <span class="quick-cat-label">${t("quickCleanser")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Machiaj">
            <div class="quick-cat-icon">${ICONS.lipstick}</div>
            <span class="quick-cat-label">${t("quickMakeup")}</span>
          </button>
          <button class="quick-cat-item" data-open-cat="Măști & Tampoane">
            <div class="quick-cat-icon">${ICONS.mask}</div>
            <span class="quick-cat-label">${t("quickMask")}</span>
          </button>
          <button class="quick-cat-item" data-subtab="sets">
            <div class="quick-cat-icon featured">${ICONS.gift}</div>
            <span class="quick-cat-label accent">${t("quickSets")}</span>
          </button>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- 3. 피부고민별 추천 -->
      <section class="ably-section">
        <div class="ably-section-head">
          <div class="section-title-wrap">
            <h3>${t("concernSectionTitle")}</h3>
            <p>${t("concernSectionSub")}</p>
          </div>
          <button class="section-more-link" id="btn-more-concern">${t("seeAll")}</button>
        </div>

        <div class="filter-chips-scroll" style="padding:0; margin-bottom:14px;">
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

      <!-- 4. 실시간 인기 베스트 -->
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

      <!-- 5. 크리에이터 3단계 루틴 세트 -->
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

      <!-- 6. EU CPNP 공식 정품 보증 안내 -->
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

  function renderHomeBestSubTab() {
    const categories = getCategoriesMeta();
    let list = [...data.products];
    if (state.bestCategory !== "all") list = list.filter((p) => p.category === state.bestCategory);
    if (state.bestSkinType !== "all") list = list.filter((p) => (p.skinTypes || []).includes(state.bestSkinType));
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
          <span class="sort-count"><strong>${list.length}</strong> ${t("totalCountSuffix")}</span>
          <span class="ranking-meta-badge">${tr("Actualizat după recenzii & vânzări", "Ranked by verified reviews & sales", "실시간 판매·리뷰 랭킹 기준")}</span>
        </div>
        <div class="ably-product-grid">
          ${list.map((prod, idx) => renderProductCard(prod, idx + 1, true)).join("")}
        </div>
      </section>
    `;
  }

  function renderHomeSkincareSubTab() {
    const skincareCats = getCategoriesMeta().filter((c) => c.key !== "Machiaj");
    let list = data.products.filter((p) => p.category !== "Machiaj");

    if (state.skincareCategory !== "all") list = list.filter((p) => p.category === state.skincareCategory);
    if (state.skincareConcern !== "all") list = list.filter((p) => (p.concerns || []).includes(state.skincareConcern));
    if (state.skincareSkinType !== "all") list = list.filter((p) => (p.skinTypes || []).includes(state.skincareSkinType));
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

  function renderHomeMakeupSubTab() {
    let list = data.products.filter((p) => p.category === "Machiaj");
    if (state.makeupSub !== "all") list = list.filter((p) => p.subMakeup === state.makeupSub);
    if (state.makeupTone !== "all") list = list.filter((p) => p.undertone === state.makeupTone);
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
                <span class="brand-official-pill">EU CPNP OFFICIAL PARTNER</span>
                <h3 class="brand-hero-name">${activeBrandObj.name}</h3>
                <p class="brand-hero-tag">${tr(activeBrandObj.tagRo, activeBrandObj.tagEn, activeBrandObj.tagKo)}</p>
              </div>
              <button class="filter-reset-inline" data-select-brand="all">${tr("Toate", "All Brands", "전체 브랜드")}</button>
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
          <img src="${creator.avatar}" class="cm-avatar" alt="${creator.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getAvatar('${creator.name.replace(/'/g, "\\'")}')" />
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
  // [하단 탭 2: 카테고리 디렉토리]
  // ==========================================================================
  function renderCategoryTab() {
    const categories = getCategoriesMeta();
    const concerns = [
      { key: "soothing", label: t("concernSoothing"), desc: tr("Centella · Heartleaf · Calmare", "Centella · Heartleaf · Redness", "어성초 · 시카 · 붉은기 진정"), count: data.products.filter((p) => (p.concerns || []).includes("soothing")).length },
      { key: "pores", label: t("concernPores"), desc: tr("AHA/BHA · Pori & Sebum", "AHA/BHA · Pore & Sebum", "모공 수렴 · 피지 · 블랙헤드"), count: data.products.filter((p) => (p.concerns || []).includes("pores")).length },
      { key: "hydration", label: t("concernHydration"), desc: tr("Acid Hialuronic 5D · Barieră", "5D Hyaluronic · Barrier", "저분자 히알루론산 · 장벽 보습"), count: data.products.filter((p) => (p.concerns || []).includes("hydration")).length },
      { key: "glow", label: t("concernGlow"), desc: tr("Orez · PDRN · Luminozitate", "Rice · Salmon PDRN · Glow", "쌀 추출물 · 연어 PDRN · 윤광"), count: data.products.filter((p) => (p.concerns || []).includes("glow")).length }
    ];

    const skinTypes = [
      { key: "Mixt", label: t("skinMixt") },
      { key: "Gras", label: t("skinGras") },
      { key: "Sensibil", label: t("skinSensibil") },
      { key: "Uscat", label: t("skinUscat") }
    ];

    return `
      <div class="category-directory-page">
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

        <section class="ably-section">
          <h3 class="cat-dir-heading">${t("catSecConcern")}</h3>
          <div class="cat-concern-grid">
            ${concerns
              .map(
                (item) => `
                <button class="cat-concern-card" data-dir-concern="${item.key}">
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
  // [상품 목록 (shop)]
  // ==========================================================================
  function renderShopTab() {
    const categories = getCategoriesMeta();
    let list = [...data.products];

    if (state.selectedCategory !== "all") list = list.filter((p) => p.category === state.selectedCategory);
    if (state.shopConcern !== "all") list = list.filter((p) => (p.concerns || []).includes(state.shopConcern));
    if (state.shopSkinType !== "all") list = list.filter((p) => (p.skinTypes || []).includes(state.shopSkinType));
    if (state.shopBrand !== "all") list = list.filter((p) => p.brand === state.shopBrand);

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
              <span>${tr("Brand:", "Brand:", "선택 브랜드:")} <strong>${state.shopBrand}</strong></span>
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
          ${resetBtnId ? `<button class="filter-reset-inline" id="${resetBtnId}">${tr("Resetează", "Reset", "초기화")}</button>` : ""}
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
        <button class="btn-secondary-pill" id="${resetId}">${tr("Resetează Filtrele", "Reset Filters", "필터 초기화")}</button>
      </div>
    `;
  }

  // ==========================================================================
  // [하단 탭 3: 크리에이터]
  // ==========================================================================
  function renderCreatorsTab() {
    const filteredCreators =
      state.creatorSkinFilter === "all"
        ? data.creators
        : data.creators.filter((c) => c.skinProfile.type === state.creatorSkinFilter);

    return `
      <div class="feed-container">
        <div class="subtab-sticky-filters">
          <div style="padding:8px 16px 4px;">
            <h3 style="font-size:15px; font-weight:800;">${t("creatorsTitle")}</h3>
            <p style="font-size:11px; color:#64748B; margin-top:2px;">${t("creatorsSub")}</p>
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
            const followLabel = isFollowed ? tr("Urmărit", "Following", "팔로잉") : t("filterFollow");

            return `
              <article class="feed-card">
                <div class="feed-head">
                  <div class="feed-author">
                    <img src="${creator.avatar}" class="feed-avatar" alt="${creator.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getAvatar('${creator.name.replace(/'/g, "\\'")}')" />
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
                  <img src="${post.image}" alt="${creator.name} Look" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getFeed('${creator.name.replace(/'/g, "\\'")}')" />
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
  // [하단 탭 4: 찜]
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
            <div class="empty-icon-circle">${ICONS.heart}</div>
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
  // [하단 탭 5: 마이 (게스트 · 일반 회원 · 크리에이터 파트너 통합)]
  // ==========================================================================
  function renderMyTab() {
    const cartQty = state.cart.reduce((acc, item) => acc + item.qty, 0);
    const isCr = isCreatorLoggedIn();
    const cr = state.currentCreator;
    const user = state.currentUser;
    const isLoggedIn = Boolean(user);

    return `
      <div class="ably-section">
        <div class="my-profile-card">
          <div class="my-profile-left">
            ${
              isCr && cr
                ? `<img src="${cr.avatar}" class="my-creator-avatar" alt="${cr.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getAvatar('${cr.name.replace(/'/g, "\\'")}')" />`
                : `<div class="my-avatar-circle">${ICONS.user}</div>`
            }
            <div style="min-width:0;">
              <h4 style="font-size:15px; font-weight:700; display:flex; align-items:center; gap:6px;">
                ${
                  isCr && cr
                    ? `${cr.name} <span class="cm-chip highlight">Creator</span>`
                    : isLoggedIn
                      ? user.name
                      : tr("Autentificare Necesară", "Sign In Required", "로그인이 필요합니다")
                }
              </h4>
              <p style="font-size:12px; color:#64748B; margin-top:2px;">
                ${
                  isCr && cr
                    ? `${cr.handle} · ${cr.followers} · ${cr.city}`
                    : isLoggedIn
                      ? `${user.city} · ${user.email}`
                      : tr("Conectează-te pentru cupon 10% reducere", "Sign in for 10% first-order discount", "로그인하고 첫 구매 10% 쿠폰을 받아보세요")
                }
              </p>
            </div>
          </div>
          <button class="btn-open-cert" data-tab="auth">
            ${isLoggedIn ? `${t("tabAuth")} ›` : tr("Autentificare ›", "Sign In ›", "로그인 · 가입 ›")}
          </button>
        </div>

        ${
          !isLoggedIn
            ? `
          <div class="demo-login-card">
            <div class="demo-login-head">
              <strong>${tr("Acces Rapid Demo", "Quick Demo Switch", "빠른 시연 로그인")}</strong>
              <span>Demo</span>
            </div>
            <div class="demo-login-actions">
              <button type="button" class="demo-btn-outline" id="btn-quick-consumer">
                ${tr("Client (Elena)", "Shopper (Elena)", "일반 고객 (Elena)")}
              </button>
              <button type="button" class="demo-btn-sky" id="btn-quick-creator">
                ${tr("Creator (Maria)", "Creator (Maria)", "크리에이터 (Maria)")}
              </button>
            </div>
          </div>
        `
            : ""
        }

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

        ${
          isCr && cr
            ? `
          <div class="creator-studio-banner">
            <div class="csb-top">
              <span class="csb-pill">CREATOR PARTNER HUB</span>
              <span class="csb-status">Live</span>
            </div>
            <h4>${cr.name} · ${tr("Creator Studio", "Creator Studio", "크리에이터 스튜디오")}</h4>
            <p>${tr("Gestionează produsele tale K-Beauty curate și verifică comisioanele.", "Curate K-Beauty items, publish live picks, and track 15% commissions.", "추천 K-뷰티 상품 등록·관리 및 루틴 세트 판매 정산(15%)을 확인하세요.")}</p>
            <button class="btn-primary-auth" data-tab="seller" style="margin:0;">
              ${tr("Deschide Creator Studio ›", "Open Creator Studio ›", "크리에이터 스튜디오 입장 ›")}
            </button>
          </div>
        `
            : ""
        }

        <h4 style="font-size:14px; font-weight:700; margin:20px 0 10px;">${t("myOrdersTitle")}</h4>
        ${
          state.lastOrder
            ? `
          <div class="my-order-box">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <strong style="font-size:12px;">#${state.lastOrder.id}</strong>
              <span class="my-order-status">${t("profileActiveDelivery")}</span>
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

        <div class="my-menu-list">
          ${
            isCr
              ? `
            <button class="my-menu-item" data-tab="seller">
              <span class="my-menu-left">${ICONS.studio}<span>${tr("Creator Studio (Produse Curate)", "Creator Studio (Manage Items)", "크리에이터 스튜디오 (상품 등록·관리)")}</span></span>
              <span class="my-menu-arrow">›</span>
            </button>
          `
              : ""
          }
          <button class="my-menu-item" id="prof-menu-cert">
            <span class="my-menu-left">${ICONS.shield}<span>${t("menuCert")}</span></span>
            <span class="my-menu-arrow">›</span>
          </button>
          <button class="my-menu-item" id="prof-menu-lockers">
            <span class="my-menu-left">${ICONS.box}<span>${t("menuLockers")}</span></span>
            <span class="my-menu-arrow">›</span>
          </button>
          <button class="my-menu-item" data-tab="auth">
            <span class="my-menu-left">${ICONS.user}<span>${t("menuAuthManage")}</span></span>
            <span class="my-menu-arrow">›</span>
          </button>
          ${
            isLoggedIn
              ? `
            <button class="my-menu-item" id="btn-user-logout">
              <span class="my-menu-left">${ICONS.logout}<span>${tr("Deconectare", "Log Out", "로그아웃")}</span></span>
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
  // [회원가입 & 입점 신청 (Auth)]
  // ==========================================================================
  function renderAuthTab() {
    if (state.authSubmitted) {
      const isConsumer = state.authRole === "consumer";
      return `
        <div class="auth-container">
          <div class="creator-match-box" style="text-align:center; padding:32px 16px;">
            <div class="empty-icon-circle accent">${ICONS.check}</div>
            <h3 style="font-size:17px; font-weight:800; margin-bottom:6px;">
              ${
                isConsumer
                  ? tr("Cont Creat cu Succes!", "Account Created Successfully!", "회원가입이 완료되었습니다")
                  : tr("Cont Creator Activat!", "Creator Partner Activated!", "크리에이터 파트너 등록 완료")
              }
            </h3>
            <p style="font-size:12px; color:#64748B; margin-bottom:18px; line-height:1.5;">
              ${
                isConsumer
                  ? tr(
                      "Cuponul tău de 10% reducere (SEOULMATE10) a fost activat.",
                      "Your 10% discount voucher (SEOULMATE10) has been activated.",
                      "첫 구매 10% 할인 쿠폰(SEOULMATE10)이 계정에 즉시 발급되었습니다."
                    )
                  : tr(
                      "Poți accesa acum Creator Studio pentru a curatoria produse K-Beauty.",
                      "You can now enter Creator Studio to curate and publish K-Beauty picks.",
                      "지금 바로 크리에이터 스튜디오에서 K-뷰티 상품을 큐레이션하고 등록할 수 있습니다."
                    )
              }
            </p>
            <button class="btn-primary-auth" id="btn-auth-finish">
              ${
                isConsumer
                  ? tr("Începe Cumpărăturile", "Start Shopping", "쇼핑 시작하기")
                  : tr("Deschide Creator Studio", "Open Creator Studio", "크리에이터 스튜디오 입장")
              }
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="auth-container">
        <div class="demo-login-card" style="margin-bottom:16px;">
          <div class="demo-login-head">
            <strong>${tr("Acces Rapid Demo", "Quick Demo Switch", "빠른 시연 로그인")}</strong>
            <span>Demo</span>
          </div>
          <div class="demo-login-actions">
            <button type="button" class="demo-btn-outline" id="btn-auth-demo-consumer">
              ${tr("Client (Elena)", "Shopper (Elena)", "일반 고객 (Elena)")}
            </button>
            <button type="button" class="demo-btn-sky" id="btn-auth-demo-creator">
              ${tr("Creator (Maria)", "Creator (Maria)", "크리에이터 (Maria)")}
            </button>
          </div>
        </div>

        <div class="auth-subnav">
          <button class="auth-subnav-btn ${state.authRole === "consumer" ? "active" : ""}" data-role-tab="consumer">
            ${t("tabConsumerAuth")}
          </button>
          <button class="auth-subnav-btn ${state.authRole === "creator" ? "active" : ""}" data-role-tab="creator">
            ${t("tabCreatorAuth")}
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
              ${ICONS.ticket}
              <span>${t("myCouponTitle")}</span>
            </div>

            <form class="auth-form-body" id="consumer-register-form">
              <div>
                <label class="field-label">${t("inputName")}</label>
                <input type="text" id="reg-name" class="input-box" value="${(state.currentUser && state.currentUser.name) || "Elena Popescu"}" required />
              </div>
              <div>
                <label class="field-label">${t("inputEmail")}</label>
                <input type="email" id="reg-email" class="input-box" value="${(state.currentUser && state.currentUser.email) || "elena.popescu@gmail.com"}" required />
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
              : `
            <div class="auth-title-row">
              <h3>${t("creatorPartnerTitle")}</h3>
              <p>${t("creatorPartnerSub")}</p>
            </div>

            <div class="auth-perk-box">
              <div>${ICONS.check}<span>${t("creatorPerk1")}</span></div>
              <div>${ICONS.check}<span>${t("creatorPerk2")}</span></div>
              <div>${ICONS.check}<span>${t("creatorPerk3")}</span></div>
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
          }
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // [크리에이터 스튜디오 (Creator Partner Studio)]
  // ==========================================================================
  function renderSellerStudioTab() {
    if (!isCreatorLoggedIn()) {
      return `
        <div class="seller-studio-page">
          <div class="creator-gate-card">
            <span class="brand-official-pill">CREATOR PARTNER PORTAL</span>
            <h2 style="font-size:20px; font-weight:800; margin:4px 0 8px;">${tr("Portal Exclusiv Creatori", "Creator Partner Studio", "크리에이터 파트너 스튜디오")}</h2>
            <p style="font-size:12.5px; color:#64748B; line-height:1.5; margin-bottom:18px;">
              ${tr("Autentifică-te cu un cont de creator verificat pentru a publica produse curate.", "Sign in with a verified creator account to publish curated K-Beauty picks.", "공식 인증 크리에이터 계정으로 로그인하여 큐레이션 상품을 등록·관리하세요.")}
            </p>
            <div class="demo-login-actions" style="margin-bottom:20px;">
              <button type="button" class="demo-btn-sky" data-creator-demo-login="mariazvinca">Maria Zvinca (@mariazvinca)</button>
              <button type="button" class="demo-btn-outline" data-creator-demo-login="ioana-skin">Ioana Dumitrescu (@ioana.skin)</button>
            </div>
            <form id="creator-manual-login-form" class="auth-form-body">
              <div>
                <label class="field-label">${tr("Nume Creator", "Creator Name", "크리에이터 이름")}</label>
                <input type="text" id="cr-login-name" class="input-box" value="Andreea Popa" required />
              </div>
              <div>
                <label class="field-label">${tr("Handle SNS", "Social Handle", "SNS 핸들")}</label>
                <input type="text" id="cr-login-handle" class="input-box" value="@andreea.kbeauty" required />
              </div>
              <button type="submit" class="btn-primary-auth">${tr("Intră în Studio", "Enter Studio", "스튜디오 입장")}</button>
            </form>
          </div>
        </div>
      `;
    }

    const cr = state.currentCreator;
    const myProds = state.creatorProducts || [];

    return `
      <div class="seller-studio-page">
        <div class="brand-hero-card">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${cr.avatar}" class="my-creator-avatar" style="width:56px; height:56px;" alt="${cr.name}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getAvatar('${cr.name.replace(/'/g, "\\'")}')" />
              <div>
                <span class="brand-official-pill">VERIFIED CREATOR</span>
                <h3 style="font-size:18px; font-weight:800;">${cr.name} <small style="font-size:12px; color:#64748B;">${cr.handle}</small></h3>
                <p style="font-size:11.5px; color:#64748B;">${cr.city} · ${cr.followers} · ${getSkinTypeLabel(cr.skinProfile?.type || "Mixt")}</p>
              </div>
            </div>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button class="btn-open-cert" id="btn-creator-go-store">${tr("Vezi Magazin", "Live Store", "스토어 보기")}</button>
              <button class="filter-reset-inline" id="btn-creator-logout">${tr("Deconectare", "Log Out", "로그아웃")}</button>
            </div>
          </div>
        </div>

        <div class="my-summary-grid" style="margin-bottom:18px;">
          <div class="my-summary-cell">
            <strong class="my-summary-num">${myProds.length}</strong>
            <span class="my-summary-label">${tr("Produse Active", "Curated SKUs", "큐레이션 상품")}</span>
          </div>
          <div class="my-summary-cell">
            <strong class="my-summary-num accent">48</strong>
            <span class="my-summary-label">${tr("Comenzi Rutină", "Routine Orders", "루틴 판매 건수")}</span>
          </div>
          <div class="my-summary-cell">
            <strong class="my-summary-num">1,420 lei</strong>
            <span class="my-summary-label">${tr("Comision (15%)", "Commission (15%)", "정산 예정 (15%)")}</span>
          </div>
        </div>

        <div class="creator-match-box" style="margin-bottom:20px;">
          <h3 class="pdp-sec-title">${tr("Publică Produs Curatat", "Upload Curated Product", "큐레이션 상품 등록")}</h3>
          <div class="filter-chips-scroll" style="padding:0; margin-bottom:12px;">
            <button type="button" class="sub-filter-pill" data-sample="sunscreen">${tr("Joseon SPF", "Joseon SPF", "조선미녀 선크림")}</button>
            <button type="button" class="sub-filter-pill" data-sample="cream">${tr("RoundLab Cream", "RoundLab Cream", "라운드랩 크림")}</button>
            <button type="button" class="sub-filter-pill" data-sample="serum">${tr("Centella Serum", "Centella Serum", "센텔라 앰플")}</button>
            <button type="button" class="sub-filter-pill" data-sample="toner">${tr("Anua 77 Pad", "Anua 77 Pad", "아누아 패드")}</button>
          </div>

          <form id="seller-upload-form" class="auth-form-body">
            <div class="seller-grid-2">
              <div>
                <label class="field-label">${tr("Brand", "Brand", "브랜드명")}</label>
                <input type="text" id="seller-prod-brand" class="input-box" value="Beauty of Joseon" required />
              </div>
              <div>
                <label class="field-label">${tr("Categorie", "Category", "카테고리")}</label>
                <select id="seller-prod-cat" class="select-box">
                  <option value="Protecție Solară" selected>${t("quickSPF")}</option>
                  <option value="Serum & Fiole">${t("quickSerums")}</option>
                  <option value="Creme & Hidratare">${t("quickCreams")}</option>
                  <option value="Toner & Tampoane">${t("quickToners")}</option>
                  <option value="Curățare">${t("quickCleanser")}</option>
                  <option value="Măști & Tampoane">${t("quickMask")}</option>
                  <option value="Machiaj">${t("quickMakeup")}</option>
                </select>
              </div>
            </div>
            <div>
              <label class="field-label">${tr("Nume Produs", "Product Name", "상품명")}</label>
              <input type="text" id="seller-prod-name" class="input-box" placeholder="Beauty of Joseon Relief Sun 50ml" required />
            </div>
            <div class="seller-grid-2">
              <div>
                <label class="field-label">${tr("Preț (lei)", "Price (lei)", "판매가 (lei)")}</label>
                <input type="number" id="seller-prod-price" class="input-box" value="65" min="1" required />
              </div>
              <div>
                <label class="field-label">${tr("Preț Normal (lei)", "Original Price", "정상가 (lei)")}</label>
                <input type="number" id="seller-prod-origprice" class="input-box" value="80" min="1" />
              </div>
            </div>
            <div class="seller-grid-2">
              <div>
                <label class="field-label">${tr("Nevoie Ten", "Skin Concern", "주요 피부고민")}</label>
                <select id="seller-prod-concern" class="select-box">
                  <option value="hydration" selected>${t("concernHydration")}</option>
                  <option value="soothing">${t("concernSoothing")}</option>
                  <option value="pores">${t("concernPores")}</option>
                  <option value="glow">${t("concernGlow")}</option>
                </select>
              </div>
              <div>
                <label class="field-label">EU CPNP No.</label>
                <input type="text" id="seller-prod-cpnp" class="input-box" value="CPNP-EU-3984021" required />
              </div>
            </div>
            <div>
              <label class="field-label">${tr("Imagine Produs (URL sau Fișier)", "Image URL or File", "상품 이미지 (파일 또는 URL)")}</label>
              <input type="file" id="seller-file-input" accept="image/*" style="display:none;" />
              <div style="display:flex; gap:8px;">
                <input type="url" id="seller-img-url" class="input-box" placeholder="https://images.unsplash.com/..." />
                <button type="button" id="btn-seller-pick-file" class="btn-open-cert">${tr("Fișier", "File", "파일선택")}</button>
              </div>
            </div>
            <div>
              <label class="field-label">${tr("Descriere", "Description", "상품 설명")}</label>
              <textarea id="seller-prod-desc" class="input-box" rows="2"></textarea>
            </div>
            <button type="submit" class="btn-primary-auth">${tr("Publică Produsul", "Publish Product", "스토어에 즉시 등록하기")}</button>
          </form>
        </div>

        <h3 class="pdp-sec-title">${tr("Produse Publicate", "Published Items", "등록된 큐레이션 상품")} (${myProds.length})</h3>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${myProds
            .map(
              (p) => `
              <div class="seller-prod-row">
                <img src="${p.image}" class="cart-item-thumb" alt="${getProductDisplayName(p)}" onerror="this.onerror=null; this.src=window.SEOULMATE_FALLBACK.getProduct('${p.category}','${p.brand}','${p.name.replace(/'/g, "\\'")}')" />
                <div style="flex:1; min-width:0;">
                  <strong class="cart-item-name">${getProductDisplayName(p)}</strong>
                  <span class="cart-item-price">${p.brand} · ${p.price} lei</span>
                </div>
                <button class="btn-open-cert" data-view-product-id="${p.id}">${tr("Detalii", "View", "상세보기")}</button>
                <button class="filter-reset-inline" data-del-product-id="${p.id}">${tr("Șterge", "Delete", "삭제")}</button>
              </div>
            `
            )
            .join("")}
        </div>
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
            <span class="ably-final-price">${prod.price}<small> lei</small></span>
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
  // [모달 (정품 인증서 · 장바구니/주문서 · easybox 락커 선택 · 주문 완료)]
  // ==========================================================================
  function renderActiveModal() {
    if (!state.activeModal) return "";

    if (state.activeModal === "photoZoom" && state.zoomImageUrl) {
      return `
        <div class="ably-backdrop photo-zoom-backdrop" id="modal-backdrop">
          <div class="photo-zoom-modal">
            <button class="photo-zoom-close" id="modal-close" aria-label="Close">✕</button>
            <img src="${state.zoomImageUrl}" alt="${state.zoomImageCaption || "Product photo"}" />
            ${state.zoomImageCaption ? `<p class="photo-zoom-cap">${state.zoomImageCaption}</p>` : ""}
          </div>
        </div>
      `;
    }

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
            <div class="cert-highlight-box">
              <strong>${tr("Garanția Seoulmate România", "Seoulmate Romania Guarantee", "서울메이트 루마니아 공식 보증")}</strong>
              <p>
                ${tr(
                  "Toate produsele sunt importate direct prin reprezentanți autorizați (RP) înregistrați pe portalul CPNP al Comisiei Europene.",
                  "All cosmetics are imported strictly through EU-responsible persons (RP) officially registered with the EU CPNP portal.",
                  "전 상품 유럽연합 집행위원회 CPNP 포털에 정식 등록된 책임판매업자(RP)를 통해 공식 직수입됩니다."
                )}
              </p>
            </div>
            <div style="font-size:11.5px; color:#475569; line-height:1.65; margin-bottom:16px;">
              • ${tr("Producător Oficial Seul, Coreea de Sud", "Official Brand Headquarters (Seoul, Korea)", "한국 본사 공식 정품 출고 및 로트 번호 추적")}<br/>
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
                ${state.cart.length === 0 ? `<p style="font-size:12px; color:#8B95A1; padding:14px 0;">${t("cartEmpty")}</p>` : ""}
                ${state.cart
                  .map(
                    (item, i) => `
                  <div class="cart-item-row">
                    <div style="display:flex; align-items:center; gap:10px; min-width:0;">
                      <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src=window.SEOULMATE_FALLBACK ? window.SEOULMATE_FALLBACK.getProduct('', '${(item.brand || "").replace(/'/g, "\\'")}', '${(item.name || "").replace(/'/g, "\\'")}') : '';" class="cart-item-thumb" />
                      <div style="min-width:0;">
                        <strong class="cart-item-name">${item.name}</strong>
                        ${item.optionLabel ? `<span class="cart-item-opt">${item.optionLabel}</span>` : ""}
                        <span class="cart-item-price">${item.price} lei × ${item.qty}</span>
                      </div>
                    </div>
                    <button class="btn-remove-cart" data-cart-index="${i}" aria-label="Remove">✕</button>
                  </div>
                `
                  )
                  .join("")}
              </div>

              <div class="checkout-locker-box">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <strong style="font-size:11px; color:#2282E2;">${t("cartLockerLabel")}</strong>
                  <button id="btn-change-locker" style="background:none; border:none; color:#2282E2; font-size:11px; font-weight:700; cursor:pointer;">${t("btnChangeLocker")}</button>
                </div>
                <div style="font-size:12px; font-weight:800;">${state.selectedLocker.name}</div>
                <div style="font-size:11px; color:#64748B;">${state.selectedLocker.address}</div>
              </div>

              <div style="margin-bottom:16px;">
                <span style="font-size:12px; font-weight:800; display:block; margin-bottom:8px;">${t("paymentTitle")}</span>
                <label class="pay-option-card ${state.paymentMethod === "ramburs" ? "selected" : ""}">
                  <input type="radio" name="pay" value="ramburs" ${state.paymentMethod === "ramburs" ? "checked" : ""} />
                  <div>
                    <strong style="font-size:12px;">${t("payRambursTitle")}</strong>
                    <p style="font-size:10.5px; color:#64748B;">${t("payRambursSub")}</p>
                  </div>
                </label>
                <label class="pay-option-card ${state.paymentMethod === "card" ? "selected" : ""}">
                  <input type="radio" name="pay" value="card" ${state.paymentMethod === "card" ? "checked" : ""} />
                  <div>
                    <strong style="font-size:12px;">${t("payCardTitle")}</strong>
                    <p style="font-size:10.5px; color:#64748B;">${t("payCardSub")}</p>
                  </div>
                </label>
              </div>

              <div class="checkout-summary">
                <div class="sum-row"><span>${t("subtotalProducts")}</span><strong>${subtotal} lei</strong></div>
                <div class="sum-row"><span>${t("shippingFee")}</span><strong>${shippingFee === 0 ? t("shippingFree") : "12 lei"}</strong></div>
                <div class="sum-total-row"><span>${t("totalPay")}</span><span>${total} lei</span></div>
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
                  <span style="font-size:11px; color:#64748B;">${l.address} (${l.distance})</span>
                </div>
              `
                )
                .join("")}
            </div>
            <button class="btn-primary-auth" id="btn-confirm-locker" style="margin-top:12px;">
              ${tr("Confirmă Locker", "Confirm Locker", "보관함 선택 완료")}
            </button>
          </div>
        </div>
      `;
    }

    if (state.activeModal === "orderSuccess" && state.lastOrder) {
      const order = state.lastOrder;
      return `
        <div class="ably-backdrop" id="modal-backdrop">
          <div class="ably-center-modal" style="text-align:center;">
            <div class="empty-icon-circle accent">${ICONS.check}</div>
            <h3 style="font-size:17px; font-weight:800; margin-bottom:4px;">${t("orderSuccessTitle")}</h3>
            <p style="font-size:11.5px; color:#64748B; margin-bottom:14px;">${t("orderSuccessSub")}</p>

            <div style="background:#F7FAFD; border:1px solid #E5EEF8; border-radius:10px; padding:12px; text-align:left; font-size:11.5px; margin-bottom:14px; line-height:1.65;">
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

    const pdpHomeBtn = document.getElementById("btn-pdp-home");
    if (pdpHomeBtn) pdpHomeBtn.addEventListener("click", () => navigateTo("home"));

    const pdpShareBtn = document.getElementById("btn-pdp-share");
    if (pdpShareBtn) {
      pdpShareBtn.addEventListener("click", () => {
        if (navigator.clipboard && window.location) {
          navigator.clipboard.writeText(window.location.href).catch(() => {});
        }
        showToast(t("pdpLinkCopied"));
        render();
      });
    }

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

    const navSearchBtn = document.getElementById("btn-nav-search");
    if (navSearchBtn) {
      navSearchBtn.addEventListener("click", () => {
        if (state.activeTab !== "home") navigateTo("home");
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
        if (clearSearchBtn) clearSearchBtn.classList.toggle("hidden", !state.searchQuery);
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

    document.querySelectorAll("[data-bottom-tab]").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo(btn.getAttribute("data-bottom-tab")));
    });

    document.querySelectorAll("[data-tab]").forEach((el) => {
      el.addEventListener("click", () => navigateTo(el.getAttribute("data-tab")));
    });

    document.querySelectorAll("#btn-header-cart, #btn-my-open-cart").forEach((b) => {
      b.addEventListener("click", () => {
        state.activeModal = "checkout";
        render();
      });
    });

    document.querySelectorAll("#btn-show-trust, #prof-menu-cert, #btn-pdp-cert").forEach((b) => {
      b.addEventListener("click", () => {
        state.activeModal = "authenticity";
        render();
      });
    });

    const profLockers = document.getElementById("prof-menu-lockers");
    if (profLockers) {
      profLockers.addEventListener("click", () => {
        state.activeModal = "easybox";
        render();
      });
    }

    document.querySelectorAll("#btn-wish-go-best, #btn-my-go-best").forEach((b) => {
      b.addEventListener("click", () => {
        state.homeSubTab = "best";
        navigateTo("home");
      });
    });

    // 상세페이지(PDP) 멀티 포토 갤러리 & 줌 & 인터랙션 바인딩
    document.querySelectorAll("[data-pdp-slide]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.pdpGalleryIndex = parseInt(btn.getAttribute("data-pdp-slide"), 10);
        render();
      });
    });

    const pdpPrev = document.getElementById("btn-pdp-prev");
    if (pdpPrev) {
      pdpPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        const prod = data.products.find((p) => p.id === state.selectedProductId);
        const total = prod ? pdpProvider.getDetail(prod).galleryPhotos.length + 1 : 4;
        state.pdpGalleryIndex = (state.pdpGalleryIndex - 1 + total) % total;
        render();
      });
    }

    const pdpNext = document.getElementById("btn-pdp-next");
    if (pdpNext) {
      pdpNext.addEventListener("click", (e) => {
        e.stopPropagation();
        const prod = data.products.find((p) => p.id === state.selectedProductId);
        const total = prod ? pdpProvider.getDetail(prod).galleryPhotos.length + 1 : 4;
        state.pdpGalleryIndex = (state.pdpGalleryIndex + 1) % total;
        render();
      });
    }

    document.querySelectorAll("[data-zoom-img]").forEach((el) => {
      el.addEventListener("click", () => {
        state.zoomImageUrl = el.getAttribute("data-zoom-img");
        state.zoomImageCaption = el.getAttribute("data-zoom-caption") || "";
        state.activeModal = "photoZoom";
        render();
      });
    });

    document.querySelectorAll("[data-pdp-open-brand]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedBrand = btn.getAttribute("data-pdp-open-brand");
        state.homeSubTab = "brands";
        navigateTo("home");
      });
    });

    document.querySelectorAll("[data-pdp-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.pdpOptionId = btn.getAttribute("data-pdp-opt");
        render();
      });
    });

    const qtyMinus = document.getElementById("btn-pdp-qty-minus");
    if (qtyMinus) {
      qtyMinus.addEventListener("click", () => {
        if (state.pdpQty > 1) {
          state.pdpQty--;
          render();
        }
      });
    }

    const qtyPlus = document.getElementById("btn-pdp-qty-plus");
    if (qtyPlus) {
      qtyPlus.addEventListener("click", () => {
        if (state.pdpQty < 20) {
          state.pdpQty++;
          render();
        }
      });
    }

    document.querySelectorAll("[data-pdp-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.pdpTab = btn.getAttribute("data-pdp-tab");
        render();
        const anchor = document.getElementById("pdp-tabs-anchor");
        if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    document.querySelectorAll("[data-pdp-rev-skin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.pdpReviewSkinFilter = btn.getAttribute("data-pdp-rev-skin");
        render();
      });
    });

    document.querySelectorAll("[data-helpful-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rid = btn.getAttribute("data-helpful-id");
        if (state.helpfulReviews.has(rid)) state.helpfulReviews.delete(rid);
        else state.helpfulReviews.add(rid);
        render();
      });
    });

    const toggleVm = document.getElementById("btn-toggle-viewmode");
    if (toggleVm) {
      toggleVm.addEventListener("click", () => setViewMode(state.viewMode === "pc" ? "mobile" : "pc"));
    }

    document.querySelectorAll("[data-pdp-add-cart]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const prod = data.products.find((p) => p.id === state.selectedProductId);
        if (!prod) return;
        const detail = pdpProvider.getDetail(prod);
        const opt = detail.options.find((o) => o.id === state.pdpOptionId) || detail.options[0];
        const optLabel = opt ? tr(opt.labelRo, opt.labelEn, opt.labelKo) : "";
        const price = getOptionPrice(prod, opt);
        const cartKey = `${prod.id}::${opt ? opt.id : "std"}`;
        const existing = state.cart.find((c) => c.cartKey === cartKey);
        if (existing) existing.qty += state.pdpQty;
        else {
          state.cart.push({
            ...prod,
            cartKey,
            name: getProductDisplayName(prod),
            optionLabel: optLabel,
            price,
            qty: state.pdpQty
          });
        }
        showToast(t("toastCartAdded"));
        render();
      });
    });

    document.querySelectorAll("[data-pdp-buy-now]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const prod = data.products.find((p) => p.id === state.selectedProductId);
        if (!prod) return;
        const detail = pdpProvider.getDetail(prod);
        const opt = detail.options.find((o) => o.id === state.pdpOptionId) || detail.options[0];
        const optLabel = opt ? tr(opt.labelRo, opt.labelEn, opt.labelKo) : "";
        const price = getOptionPrice(prod, opt);
        state.cart = [
          {
            ...prod,
            cartKey: `${prod.id}::${opt ? opt.id : "std"}`,
            name: getProductDisplayName(prod),
            optionLabel: optLabel,
            price,
            qty: state.pdpQty
          }
        ];
        state.activeModal = "checkout";
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

    document.querySelectorAll("#modal-close, #modal-close-btn, #sheet-close").forEach((b) => {
      b.addEventListener("click", () => {
        state.activeModal = null;
        render();
      });
    });

    document.querySelectorAll(".btn-remove-cart").forEach((b) => {
      b.addEventListener("click", () => {
        state.cart.splice(parseInt(b.getAttribute("data-cart-index"), 10), 1);
        render();
      });
    });

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

    document.querySelectorAll("input[name='pay']").forEach((r) => {
      r.addEventListener("change", (e) => {
        state.paymentMethod = e.target.value;
        render();
      });
    });

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

    // 회원가입 / 입점 신청 / 데모 로그인 / 크리에이터 스튜디오
    document.querySelectorAll("[data-role-tab]").forEach((b) => {
      b.addEventListener("click", () => {
        state.authRole = b.getAttribute("data-role-tab");
        render();
      });
    });

    document.querySelectorAll("#btn-quick-consumer, #btn-auth-demo-consumer").forEach((btn) => {
      btn.addEventListener("click", () => {
        loginAsConsumer("Elena Popescu", "elena.popescu@gmail.com", "București");
        render();
      });
    });

    document.querySelectorAll("#btn-quick-creator, #btn-auth-demo-creator").forEach((btn) => {
      btn.addEventListener("click", () => {
        loginAsCreator("mariazvinca");
        render();
      });
    });

    document.querySelectorAll("[data-creator-demo-login]").forEach((btn) => {
      btn.addEventListener("click", () => {
        loginAsCreator(btn.getAttribute("data-creator-demo-login"));
        render();
      });
    });

    const manualCreatorForm = document.getElementById("creator-manual-login-form");
    if (manualCreatorForm) {
      manualCreatorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("cr-login-name")?.value.trim() || "Andreea Popa";
        const handle = document.getElementById("cr-login-handle")?.value.trim() || "@andreea.kbeauty";
        registerNewCreator(name, handle, "București", "Mixt");
        render();
      });
    }

    document.querySelectorAll("#btn-user-logout, #btn-creator-logout").forEach((btn) => {
      btn.addEventListener("click", () => {
        logoutUser();
        if (state.activeTab === "seller") navigateTo("my");
        else render();
      });
    });

    const creatorGoStore = document.getElementById("btn-creator-go-store");
    if (creatorGoStore) {
      creatorGoStore.addEventListener("click", () => {
        state.homeSubTab = "today";
        navigateTo("home");
      });
    }

    const cForm = document.getElementById("consumer-register-form");
    if (cForm) {
      cForm.addEventListener("submit", (e) => {
        e.preventDefault();
        loginAsConsumer(
          document.getElementById("reg-name").value,
          document.getElementById("reg-email").value,
          document.getElementById("reg-city").value
        );
        state.authSubmitted = true;
        render();
      });
    }

    const crForm = document.getElementById("creator-register-form");
    if (crForm) {
      crForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const handle = document.getElementById("reg-handle")?.value.trim() || "@k_creator";
        registerNewCreator(handle.replace("@", ""), handle, "București", "Mixt");
        state.authSubmitted = true;
        render();
      });
    }

    const authFinish = document.getElementById("btn-auth-finish");
    if (authFinish) {
      authFinish.addEventListener("click", () => {
        const target = state.authRole === "creator" ? "seller" : "home";
        state.authSubmitted = false;
        navigateTo(target);
      });
    }

    // 크리에이터 스튜디오 샘플 프리셋 / 파일 업로드 / 상품 등록·삭제
    document.querySelectorAll("[data-sample]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const presets = {
          sunscreen: { brand: "Beauty of Joseon", cat: "Protecție Solară", name: "Beauty of Joseon Relief Sun 50ml", price: 65, orig: 80, concern: "hydration", url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80", desc: "Rice + Probiotics SPF50+ daily sunscreen." },
          cream: { brand: "Round Lab", cat: "Creme & Hidratare", name: "Round Lab Birch Juice Moisturizing Cream 80ml", price: 92, orig: 110, concern: "hydration", url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80", desc: "Inje Birch Sap deep moisture barrier cream." },
          serum: { brand: "SKIN1004", cat: "Serum & Fiole", name: "SKIN1004 Madagascar Centella Ampoule 100ml", price: 82, orig: 99, concern: "soothing", url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80", desc: "100% pure Madagascar Centella soothing ampoule." },
          toner: { brand: "Anua", cat: "Toner & Tampoane", name: "Anua Heartleaf 77% Clear Pad (70ea)", price: 89, orig: 105, concern: "pores", url: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80", desc: "77% Heartleaf PHA gentle pore care pads." }
        };
        const p = presets[btn.getAttribute("data-sample")];
        if (!p) return;
        const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
        setVal("seller-prod-brand", p.brand);
        setVal("seller-prod-cat", p.cat);
        setVal("seller-prod-name", p.name);
        setVal("seller-prod-price", p.price);
        setVal("seller-prod-origprice", p.orig);
        setVal("seller-prod-concern", p.concern);
        setVal("seller-img-url", p.url);
        setVal("seller-prod-desc", p.desc);
      });
    });

    const pickFileBtn = document.getElementById("btn-seller-pick-file");
    const fileInp = document.getElementById("seller-file-input");
    if (pickFileBtn && fileInp) {
      pickFileBtn.addEventListener("click", () => fileInp.click());
      fileInp.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const urlInp = document.getElementById("seller-img-url");
            if (urlInp) urlInp.value = evt.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

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
        const cpnpVal = document.getElementById("seller-prod-cpnp")?.value.trim() || "CPNP-EU-3984021";
        const urlVal = document.getElementById("seller-img-url")?.value.trim();
        const descVal = document.getElementById("seller-prod-desc")?.value.trim();
        const img = urlVal || window.SEOULMATE_FALLBACK.getProduct(catVal, brandVal, nameVal);
        const discountVal = origVal > priceVal ? Math.round(((origVal - priceVal) / origVal) * 100) : 15;
        const cr = state.currentCreator || data.creators[0];

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
          discount: discountVal,
          rating: 5.0,
          reviewsCount: 1,
          image: img,
          badge: `${cr.name}'s Pick`,
          isAntiFakeHighlight: true,
          cpnpNumber: cpnpVal,
          lotNumber: `LOT-SE${Date.now().toString().slice(-6)}`,
          descriptionRo: descVal || "Produs K-Beauty oficial verificat EU CPNP.",
          descriptionEn: descVal || "Official K-Beauty product verified with EU CPNP.",
          descriptionKo: descVal || "EU CPNP 공식 등록 안심 K-뷰티 상품입니다."
        };
        data.products.unshift(newProd);
        state.creatorProducts.unshift(newProd);
        showToast(tr("Produsul a fost publicat!", "Product published!", "큐레이션 상품이 스토어에 등록되었습니다."));
        render();
      });
    }

    document.querySelectorAll("[data-view-product-id]").forEach((btn) => {
      btn.addEventListener("click", () => openProductDetail(btn.getAttribute("data-view-product-id")));
    });

    document.querySelectorAll("[data-del-product-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pid = btn.getAttribute("data-del-product-id");
        state.creatorProducts = state.creatorProducts.filter((p) => p.id !== pid);
        const idx = data.products.findIndex((p) => p.id === pid);
        if (idx !== -1) data.products.splice(idx, 1);
        showToast(tr("Produsul a fost șters.", "Product removed.", "상품이 삭제되었습니다."));
        render();
      });
    });

    attachDynamicBodyListeners();
  }

  function attachDynamicBodyListeners() {
    document.querySelectorAll("[data-subtab]").forEach((el) => {
      el.addEventListener("click", () => {
        const sub = el.getAttribute("data-subtab");
        state.homeSubTab = sub;
        state.searchQuery = "";
        if (state.activeTab !== "home") navigateTo("home");
        else {
          render();
          resetScroll();
        }
      });
    });

    const prevBtn = document.getElementById("btn-hero-prev");
    if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); prevSlide(); });

    const nextBtn = document.getElementById("btn-hero-next");
    if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); nextSlide(); });

    const counterBadge = document.getElementById("hero-counter-num");
    if (counterBadge) counterBadge.addEventListener("click", (e) => { e.stopPropagation(); nextSlide(); });

    const certBtn = document.getElementById("btn-cert-modal");
    if (certBtn) {
      certBtn.addEventListener("click", () => {
        state.activeModal = "authenticity";
        render();
      });
    }

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

    document.querySelectorAll("[data-open-cat]").forEach((btn) => {
      btn.addEventListener("click", () => openShopWithFilters({ category: btn.getAttribute("data-open-cat") }));
    });

    document.querySelectorAll("[data-home-concern]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.homeConcern = btn.getAttribute("data-home-concern");
        render();
      });
    });

    const moreConcernBtn = document.getElementById("btn-more-concern");
    if (moreConcernBtn) moreConcernBtn.addEventListener("click", () => openShopWithFilters({ concern: state.homeConcern }));

    document.querySelectorAll("[data-best-cat]").forEach((btn) => {
      btn.addEventListener("click", () => { state.bestCategory = btn.getAttribute("data-best-cat"); render(); });
    });
    document.querySelectorAll("[data-best-skin]").forEach((btn) => {
      btn.addEventListener("click", () => { state.bestSkinType = btn.getAttribute("data-best-skin"); render(); });
    });

    document.querySelectorAll("[data-skincare-cat]").forEach((btn) => {
      btn.addEventListener("click", () => { state.skincareCategory = btn.getAttribute("data-skincare-cat"); render(); });
    });
    document.querySelectorAll("[data-skincare-concern]").forEach((btn) => {
      btn.addEventListener("click", () => { state.skincareConcern = btn.getAttribute("data-skincare-concern"); render(); });
    });
    document.querySelectorAll("[data-skincare-skin]").forEach((btn) => {
      btn.addEventListener("click", () => { state.skincareSkinType = btn.getAttribute("data-skincare-skin"); render(); });
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

    document.querySelectorAll("[data-makeup-sub]").forEach((btn) => {
      btn.addEventListener("click", () => { state.makeupSub = btn.getAttribute("data-makeup-sub"); render(); });
    });
    document.querySelectorAll("[data-makeup-tone]").forEach((btn) => {
      btn.addEventListener("click", () => { state.makeupTone = btn.getAttribute("data-makeup-tone"); render(); });
    });
    const resetMakeupBtn = document.getElementById("reset-makeup-filters");
    if (resetMakeupBtn) {
      resetMakeupBtn.addEventListener("click", () => {
        state.makeupSub = "all";
        state.makeupTone = "all";
        render();
      });
    }

    document.querySelectorAll("[data-select-brand]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedBrand = btn.getAttribute("data-select-brand");
        render();
        resetScroll();
      });
    });

    document.querySelectorAll("[data-sets-skin]").forEach((btn) => {
      btn.addEventListener("click", () => { state.setsSkinType = btn.getAttribute("data-sets-skin"); render(); });
    });

    document.querySelectorAll("[data-dir-cat]").forEach((btn) => {
      btn.addEventListener("click", () => openShopWithFilters({ category: btn.getAttribute("data-dir-cat") }));
    });
    document.querySelectorAll("[data-dir-concern]").forEach((btn) => {
      btn.addEventListener("click", () => openShopWithFilters({ concern: btn.getAttribute("data-dir-concern") }));
    });
    document.querySelectorAll("[data-dir-skin]").forEach((btn) => {
      btn.addEventListener("click", () => openShopWithFilters({ skinType: btn.getAttribute("data-dir-skin") }));
    });
    document.querySelectorAll("[data-dir-brand]").forEach((btn) => {
      btn.addEventListener("click", () => openShopWithFilters({ brand: btn.getAttribute("data-dir-brand") }));
    });

    document.querySelectorAll("[data-shop-cat]").forEach((btn) => {
      btn.addEventListener("click", () => { state.selectedCategory = btn.getAttribute("data-shop-cat"); render(); });
    });
    document.querySelectorAll("[data-shop-concern]").forEach((btn) => {
      btn.addEventListener("click", () => { state.shopConcern = btn.getAttribute("data-shop-concern"); render(); });
    });
    document.querySelectorAll("[data-shop-skin]").forEach((btn) => {
      btn.addEventListener("click", () => { state.shopSkinType = btn.getAttribute("data-shop-skin"); render(); });
    });
    const clearShopBrand = document.getElementById("btn-clear-shop-brand");
    if (clearShopBrand) clearShopBrand.addEventListener("click", () => { state.shopBrand = "all"; render(); });
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

    document.querySelectorAll("[data-sort-by]").forEach((btn) => {
      btn.addEventListener("click", () => { state.sortBy = btn.getAttribute("data-sort-by"); render(); });
    });

    document.querySelectorAll("[data-creator-skin]").forEach((btn) => {
      btn.addEventListener("click", () => { state.creatorSkinFilter = btn.getAttribute("data-creator-skin"); render(); });
    });

    document.querySelectorAll("[data-follow-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cid = btn.getAttribute("data-follow-id");
        if (state.followedCreators.has(cid)) state.followedCreators.delete(cid);
        else {
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

    document.querySelectorAll(".btn-bundle-order[data-creator-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const cid = btn.getAttribute("data-creator-id");
        const creator = data.creators.find((c) => c.id === cid);
        if (creator) {
          const rTitle = tr(creator.routine.title, creator.routine.titleEn, creator.routine.titleKo || creator.routine.titleEn);
          state.cart = [{
            id: `bundle-${creator.id}`,
            name: rTitle,
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

    // 상품 카드 및 루틴 썸네일 클릭 -> 풀페이지 상품 상세페이지(PDP)로 이동!
    document.querySelectorAll(".ably-prod-card[data-product-id], .rb-item-thumb[data-product-id]").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".ably-wish-btn")) return;
        openProductDetail(card.getAttribute("data-product-id"));
      });
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "p" || e.key === "P")) {
      e.preventDefault();
      setViewMode(state.viewMode === "pc" ? "mobile" : "pc");
    }
  });

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

  removeInjectedHostBadges();
  window.addEventListener("load", removeInjectedHostBadges);
  [250, 800, 2000].forEach((ms) => setTimeout(removeInjectedHostBadges, ms));

  if (typeof MutationObserver !== "undefined") {
    const badgeObserver = new MutationObserver(() => removeInjectedHostBadges());
    if (document.documentElement) badgeObserver.observe(document.documentElement, { childList: true });
    if (document.body) badgeObserver.observe(document.body, { childList: true });
  }
});
