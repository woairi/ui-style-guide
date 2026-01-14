/**
 * 코드 복사 기능
 * - 디자인 토큰 클릭 시 CSS 변수 복사
 * - 코드 블록 복사 버튼
 * - 코드 탭 전환
 */

(function() {
  'use strict';

  // 토스트 요소
  let toastElement = null;
  let toastTimeout = null;

  /**
   * 토스트 요소 생성
   */
  function createToast() {
    if (toastElement) return;
    
    toastElement = document.createElement('div');
    toastElement.className = 'copy-toast';
    toastElement.setAttribute('role', 'status');
    toastElement.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastElement);
  }

  /**
   * 토스트 메시지 표시
   * @param {string} message - 표시할 메시지
   * @param {number} duration - 표시 시간 (ms)
   */
  function showToast(message, duration = 2000) {
    if (!toastElement) {
      createToast();
    }

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastElement.textContent = message;
    toastElement.classList.add('show');

    toastTimeout = setTimeout(() => {
      toastElement.classList.remove('show');
    }, duration);
  }

  /**
   * 클립보드에 텍스트 복사
   * @param {string} text - 복사할 텍스트
   * @returns {Promise<boolean>} 성공 여부
   */
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      return success;
    } catch (err) {
      console.error('복사 실패:', err);
      return false;
    }
  }

  /**
   * 복사 가능한 요소 클릭 핸들러 (data-copy)
   * @param {Event} event - 클릭 이벤트
   */
  async function handleCopyClick(event) {
    const target = event.target.closest('[data-copy]');
    if (!target) return;

    const textToCopy = target.getAttribute('data-copy');
    if (!textToCopy) return;

    const success = await copyToClipboard(textToCopy);
    
    if (success) {
      showToast(`복사됨: ${textToCopy}`);
      
      target.classList.add('copied');
      setTimeout(() => {
        target.classList.remove('copied');
      }, 1000);
    } else {
      showToast('복사에 실패했습니다');
    }
  }

  /**
   * 코드 블록 복사 버튼 클릭 핸들러
   * @param {Event} event - 클릭 이벤트
   */
  async function handleCodeCopyClick(event) {
    const btn = event.target.closest('.code-copy-btn');
    if (!btn) return;

    const codeBlock = btn.closest('.code-block');
    if (!codeBlock) return;

    // 활성화된 코드 패널의 코드 가져오기
    const activePanel = codeBlock.querySelector('.code-panel.active') || 
                        codeBlock.querySelector('.code-content');
    if (!activePanel) return;

    const codeElement = activePanel.querySelector('code');
    if (!codeElement) return;

    const code = codeElement.textContent;
    const success = await copyToClipboard(code);

    if (success) {
      showToast('코드가 복사되었습니다');
      
      btn.classList.add('copied');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ 복사됨';
      
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = originalText;
      }, 2000);
    } else {
      showToast('복사에 실패했습니다');
    }
  }

  /**
   * 코드 탭 클릭 핸들러
   * @param {Event} event - 클릭 이벤트
   */
  function handleCodeTabClick(event) {
    const tab = event.target.closest('.code-tab');
    if (!tab) return;

    const codeBlock = tab.closest('.code-block');
    if (!codeBlock) return;

    const tabId = tab.getAttribute('data-tab');
    if (!tabId) return;

    // 모든 탭 비활성화
    codeBlock.querySelectorAll('.code-tab').forEach(t => {
      t.classList.remove('active');
    });

    // 클릭한 탭 활성화
    tab.classList.add('active');

    // 모든 패널 숨기기
    codeBlock.querySelectorAll('.code-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    // 해당 패널 표시
    const targetPanel = codeBlock.querySelector(`[data-panel="${tabId}"]`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  }

  /**
   * 이벤트 리스너 초기화
   */
  function initEventListeners() {
    // data-copy 요소 클릭
    document.addEventListener('click', handleCopyClick);
    
    // 코드 복사 버튼 클릭
    document.addEventListener('click', handleCodeCopyClick);
    
    // 코드 탭 클릭
    document.addEventListener('click', handleCodeTabClick);
  }

  /**
   * 초기화
   */
  function init() {
    createToast();
    initEventListeners();
  }

  // DOM 로드 후 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 전역 API 노출
  window.CodeCopy = {
    copy: copyToClipboard,
    showToast: showToast
  };
})();
