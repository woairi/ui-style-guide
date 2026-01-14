/**
 * 테마 전환 로직
 * - 라이트/다크 모드 전환 UI
 * - 시스템 테마 감지 (prefers-color-scheme)
 * - localStorage 저장
 * 
 * Requirements: 9.1, 9.2, 9.3
 */

(function() {
  'use strict';

  // DOM 요소
  let themeToggle = null;
  const htmlElement = document.documentElement;

  // 테마 상수
  const THEME_KEY = 'ui-style-guide-theme';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
  };

  // 현재 적용된 실제 테마 (light 또는 dark)
  let currentEffectiveTheme = THEMES.LIGHT;

  /**
   * 시스템 테마 감지
   * @returns {string} 'light' 또는 'dark'
   */
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    return THEMES.LIGHT;
  }

  /**
   * 저장된 테마 가져오기
   * @returns {string|null} 저장된 테마 또는 null
   */
  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      console.warn('localStorage 접근 불가:', e);
      return null;
    }
  }

  /**
   * 테마 저장
   * @param {string} theme - 저장할 테마
   */
  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('테마 저장 실패, 세션 동안만 유지됩니다:', e);
    }
  }

  /**
   * 테마 적용
   * @param {string} theme - 적용할 테마 ('light', 'dark', 'system')
   * @param {boolean} save - localStorage에 저장할지 여부
   */
  function applyTheme(theme, save = false) {
    let effectiveTheme = theme;
    
    // 시스템 테마인 경우 실제 테마 결정
    if (theme === THEMES.SYSTEM) {
      effectiveTheme = getSystemTheme();
      // 시스템 테마 사용 시 data-theme 속성 제거하여 CSS 미디어 쿼리가 동작하도록 함
      htmlElement.removeAttribute('data-theme');
    } else {
      // 명시적 테마 설정
      htmlElement.setAttribute('data-theme', theme);
    }

    // 현재 적용된 실제 테마 저장
    currentEffectiveTheme = effectiveTheme;

    // 토글 버튼 aria-label 업데이트
    updateToggleButton(effectiveTheme);

    // 테마 변경 이벤트 발생 (다른 컴포넌트에서 사용 가능)
    dispatchThemeChangeEvent(effectiveTheme, theme);

    // 저장 옵션이 true인 경우 localStorage에 저장
    if (save) {
      saveTheme(theme);
    }
  }

  /**
   * 토글 버튼 상태 업데이트
   * @param {string} effectiveTheme - 실제 적용된 테마
   */
  function updateToggleButton(effectiveTheme) {
    if (!themeToggle) return;

    const label = effectiveTheme === THEMES.DARK 
      ? '라이트 모드로 전환' 
      : '다크 모드로 전환';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
    
    // 버튼에 현재 테마 상태 표시 (CSS 스타일링용)
    themeToggle.setAttribute('data-current-theme', effectiveTheme);
  }

  /**
   * 테마 변경 커스텀 이벤트 발생
   * @param {string} effectiveTheme - 실제 적용된 테마
   * @param {string} savedTheme - 저장된 테마 설정
   */
  function dispatchThemeChangeEvent(effectiveTheme, savedTheme) {
    const event = new CustomEvent('themechange', {
      detail: {
        theme: effectiveTheme,
        savedPreference: savedTheme,
        isSystemTheme: savedTheme === THEMES.SYSTEM || !savedTheme
      }
    });
    document.dispatchEvent(event);
  }

  /**
   * 현재 저장된 테마 설정 가져오기
   * @returns {string} 저장된 테마 또는 'system'
   */
  function getSavedPreference() {
    const savedTheme = getSavedTheme();
    if (savedTheme && (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK)) {
      return savedTheme;
    }
    return THEMES.SYSTEM;
  }

  /**
   * 현재 실제 적용된 테마 가져오기
   * @returns {string} 'light' 또는 'dark'
   */
  function getEffectiveTheme() {
    return currentEffectiveTheme;
  }

  /**
   * 테마 토글 (라이트 <-> 다크)
   */
  function toggleTheme() {
    // 현재 실제 적용된 테마의 반대 테마로 전환
    const newTheme = currentEffectiveTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    
    applyTheme(newTheme, true);
  }

  /**
   * 시스템 테마 변경 감지 핸들러
   * @param {MediaQueryListEvent} event - 미디어 쿼리 이벤트
   */
  function handleSystemThemeChange(event) {
    const savedPreference = getSavedPreference();
    
    // 저장된 테마가 시스템 테마인 경우에만 자동 변경
    if (savedPreference === THEMES.SYSTEM) {
      const newSystemTheme = event.matches ? THEMES.DARK : THEMES.LIGHT;
      currentEffectiveTheme = newSystemTheme;
      
      // data-theme 속성은 제거된 상태 유지 (CSS 미디어 쿼리 사용)
      updateToggleButton(newSystemTheme);
      dispatchThemeChangeEvent(newSystemTheme, THEMES.SYSTEM);
    }
  }

  /**
   * 이벤트 리스너 초기화
   */
  function initEventListeners() {
    // 테마 토글 버튼 클릭
    themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
      
      // 키보드 접근성 (Enter, Space)
      themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      });
    }

    // 시스템 테마 변경 감지
    if (window.matchMedia) {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // 최신 브라우저
      if (darkModeMediaQuery.addEventListener) {
        darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);
      } 
      // 구형 브라우저 (Safari < 14)
      else if (darkModeMediaQuery.addListener) {
        darkModeMediaQuery.addListener(handleSystemThemeChange);
      }
    }
  }

  /**
   * 초기 테마 설정
   * Requirements 9.3: 시스템 테마 자동 감지
   */
  function initializeTheme() {
    const savedPreference = getSavedPreference();
    
    if (savedPreference === THEMES.SYSTEM) {
      // 시스템 테마 사용 - CSS 미디어 쿼리가 동작하도록 data-theme 제거
      currentEffectiveTheme = getSystemTheme();
      htmlElement.removeAttribute('data-theme');
    } else {
      // 저장된 테마 적용
      currentEffectiveTheme = savedPreference;
      htmlElement.setAttribute('data-theme', savedPreference);
    }

    // 토글 버튼 초기 상태 설정
    updateToggleButton(currentEffectiveTheme);
  }

  /**
   * 초기화
   */
  function init() {
    // 초기 테마 설정
    initializeTheme();
    
    // 이벤트 리스너 설정
    initEventListeners();
    
    // 초기화 완료 이벤트
    dispatchThemeChangeEvent(currentEffectiveTheme, getSavedPreference());
  }

  // DOM 로드 후 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 전역 API 노출 (다른 스크립트에서 사용 가능)
  window.ThemeManager = {
    toggle: toggleTheme,
    apply: function(theme) { applyTheme(theme, true); },
    getEffective: getEffectiveTheme,
    getSavedPreference: getSavedPreference,
    setTheme: function(theme) { applyTheme(theme, true); },
    THEMES: THEMES
  };
})();
