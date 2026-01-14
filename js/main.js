/**
 * 메인 스크립트
 * - 전역 초기화
 * - 공통 유틸리티
 * - 피드백 컴포넌트 데모
 */

(function() {
  'use strict';

  /**
   * 햄버거 메뉴 데모 토글
   */
  function initHamburgerDemo() {
    const hamburgerDemo = document.getElementById('hamburgerDemo1');
    if (hamburgerDemo) {
      hamburgerDemo.addEventListener('click', function() {
        this.classList.toggle('open');
      });
    }
  }

  /**
   * 탭 클릭 데모
   */
  function initTabsDemo() {
    document.querySelectorAll('.tabs, .tabs-boxed').forEach(tabContainer => {
      tabContainer.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
          tabContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        });
      });
    });
  }

  /**
   * 토스트 데모 표시
   * @param {string} type - 토스트 타입 (success, info, warning, error)
   */
  function showDemoToast(type) {
    const messages = {
      success: { title: '성공', message: '작업이 성공적으로 완료되었습니다.' },
      info: { title: '정보', message: '새로운 업데이트가 있습니다.' },
      warning: { title: '경고', message: '저장하지 않은 변경사항이 있습니다.' },
      error: { title: '오류', message: '요청을 처리하는 중 오류가 발생했습니다.' }
    };

    const msg = messages[type] || messages.info;
    
    // 기존 데모 토스트 제거
    const existingToast = document.querySelector('.demo-toast-live');
    if (existingToast) {
      existingToast.remove();
    }

    // 토스트 생성
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} demo-toast-live`;
    toast.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999; animation: slideIn 0.3s ease;';
    toast.innerHTML = `
      <div class="toast-icon">●</div>
      <div class="toast-content">
        <div class="toast-title">${msg.title}</div>
        <div class="toast-message">${msg.message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;

    document.body.appendChild(toast);

    // 3초 후 자동 제거
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 3000);
  }

  /**
   * 모달 데모 열기
   */
  function openDemoModal() {
    const backdrop = document.getElementById('demoModalBackdrop');
    if (backdrop) {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * 모달 데모 닫기
   */
  function closeDemoModal() {
    const backdrop = document.getElementById('demoModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /**
   * 피드백 데모 초기화
   */
  function initFeedbackDemo() {
    // 토스트 데모 버튼
    document.querySelectorAll('[data-toast-demo]').forEach(btn => {
      btn.addEventListener('click', function() {
        const type = this.getAttribute('data-toast-demo');
        showDemoToast(type);
      });
    });

    // 모달 데모 버튼
    const modalOpenBtn = document.getElementById('openModalDemo');
    if (modalOpenBtn) {
      modalOpenBtn.addEventListener('click', openDemoModal);
    }

    // 모달 닫기 버튼
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', closeDemoModal);
    });

    // 모달 백드롭 클릭으로 닫기
    const backdrop = document.getElementById('demoModalBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function(e) {
        if (e.target === this) {
          closeDemoModal();
        }
      });
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeDemoModal();
      }
    });
  }

  /**
   * 페이지 로드 완료 시 실행
   */
  function onPageLoad() {
    document.body.classList.add('loaded');
    
    // 데모 기능 초기화
    initHamburgerDemo();
    initTabsDemo();
    initFeedbackDemo();
    
    // 콘솔 환영 메시지
    console.log(
      '%c🎨 UI Style Guide',
      'font-size: 24px; font-weight: bold; color: #3b82f6;'
    );
    console.log(
      '%c프론트엔드 개발자를 위한 UI 스타일 가이드입니다.',
      'font-size: 14px; color: #71717a;'
    );
  }

  // DOM 로드 후 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onPageLoad);
  } else {
    onPageLoad();
  }

  // 전역 API 노출
  window.FeedbackDemo = {
    showToast: showDemoToast,
    openModal: openDemoModal,
    closeModal: closeDemoModal
  };
})();
