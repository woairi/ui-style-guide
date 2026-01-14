/**
 * 네비게이션 로직
 * - 사이드바 네비게이션 활성 상태 관리
 * - 스크롤 스파이 기능
 * - 모바일 메뉴 토글
 */

(function() {
  'use strict';

  // DOM 요소
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
  const sections = document.querySelectorAll('.section[id]');

  // 상태
  let isMenuOpen = false;
  let scrollTimeout = null;

  /**
   * 모바일 메뉴 열기
   */
  function openMobileMenu() {
    isMenuOpen = true;
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    mobileMenuToggle.classList.add('active');
    mobileMenuToggle.setAttribute('aria-label', '메뉴 닫기');
    document.body.style.overflow = 'hidden';
  }

  /**
   * 모바일 메뉴 닫기
   */
  function closeMobileMenu() {
    isMenuOpen = false;
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-label', '메뉴 열기');
    document.body.style.overflow = '';
  }

  /**
   * 모바일 메뉴 토글
   */
  function toggleMobileMenu() {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  /**
   * 사이드바 링크 활성 상태 업데이트
   * @param {string} sectionId - 활성화할 섹션 ID
   */
  function setActiveLink(sectionId) {
    sidebarLinks.forEach(link => {
      const linkSection = link.getAttribute('data-section');
      if (linkSection === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * 스크롤 스파이 - 현재 보이는 섹션 감지
   */
  function handleScrollSpy() {
    // 스크롤 이벤트 디바운싱
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = requestAnimationFrame(() => {
      const scrollPosition = window.scrollY + 100; // 헤더 높이 + 여유 공간

      // 현재 보이는 섹션 찾기
      let currentSection = null;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      });

      // 페이지 맨 아래에서는 마지막 섹션 활성화
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        currentSection = sections[sections.length - 1]?.id;
      }

      // 활성 링크 업데이트
      if (currentSection) {
        setActiveLink(currentSection);
      }
    });
  }

  /**
   * 부드러운 스크롤로 섹션 이동
   * @param {string} sectionId - 이동할 섹션 ID
   */
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 64; // 헤더 높이
      const sectionTop = section.offsetTop - headerHeight - 16;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  }

  /**
   * 사이드바 링크 클릭 핸들러
   * @param {Event} event - 클릭 이벤트
   */
  function handleSidebarLinkClick(event) {
    event.preventDefault();
    
    const link = event.currentTarget;
    const sectionId = link.getAttribute('data-section');
    
    // 활성 상태 즉시 업데이트
    setActiveLink(sectionId);
    
    // 섹션으로 스크롤
    scrollToSection(sectionId);
    
    // 모바일에서 메뉴 닫기
    if (window.innerWidth <= 768) {
      closeMobileMenu();
    }
  }

  /**
   * 키보드 이벤트 핸들러 (ESC로 메뉴 닫기)
   * @param {KeyboardEvent} event - 키보드 이벤트
   */
  function handleKeydown(event) {
    if (event.key === 'Escape' && isMenuOpen) {
      closeMobileMenu();
    }
  }

  /**
   * 윈도우 리사이즈 핸들러
   */
  function handleResize() {
    // 데스크톱 크기로 변경 시 모바일 메뉴 상태 초기화
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMobileMenu();
    }
  }

  /**
   * 이벤트 리스너 초기화
   */
  function initEventListeners() {
    // 모바일 메뉴 토글
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // 오버레이 클릭으로 메뉴 닫기
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeMobileMenu);
    }

    // 사이드바 링크 클릭
    sidebarLinks.forEach(link => {
      link.addEventListener('click', handleSidebarLinkClick);
    });

    // 스크롤 스파이
    window.addEventListener('scroll', handleScrollSpy, { passive: true });

    // 키보드 이벤트
    document.addEventListener('keydown', handleKeydown);

    // 윈도우 리사이즈
    window.addEventListener('resize', handleResize);
  }

  /**
   * 초기화
   */
  function init() {
    initEventListeners();
    
    // 초기 스크롤 위치에 따른 활성 링크 설정
    handleScrollSpy();
    
    // URL 해시가 있으면 해당 섹션으로 이동
    if (window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      setTimeout(() => {
        scrollToSection(sectionId);
        setActiveLink(sectionId);
      }, 100);
    }
  }

  // DOM 로드 후 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
