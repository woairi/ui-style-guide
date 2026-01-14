# 프론트엔드 UI 스타일 가이드

실용적인 팁을 반영한 현대적인 웹 UI 스타일 가이드입니다.

---

## 📦 디자인 토큰

### 색상 시스템

```css
/* Primary - 주요 액션, 브랜드 색상 */
--color-primary-500: #3b82f6;
--color-primary-600: #2563eb;  /* 호버 상태 */
--color-primary-700: #1d4ed8;  /* 액티브 상태 */

/* Semantic - 상태 표현 */
--color-success: #22c55e;  /* 성공, 완료 */
--color-warning: #f59e0b;  /* 경고, 주의 */
--color-error: #ef4444;    /* 오류, 삭제 */
--color-info: #3b82f6;     /* 정보, 안내 */
```

💡 **팁**: 색상은 50~900 스케일로 정의하면 다크모드 대응이 쉬워집니다.

### 타이포그래피

```css
/* 폰트 스케일 */
--text-xs: 0.75rem;   /* 12px - 캡션, 라벨 */
--text-sm: 0.875rem;  /* 14px - 보조 텍스트 */
--text-base: 1rem;    /* 16px - 본문 기본 */
--text-lg: 1.125rem;  /* 18px - 강조 본문 */
--text-xl: 1.25rem;   /* 20px - 소제목 */
--text-2xl: 1.5rem;   /* 24px - 섹션 제목 */
--text-3xl: 1.875rem; /* 30px - 페이지 제목 */
```

💡 **팁**: 본문은 16px 이상, 줄 높이는 1.5~1.75를 유지하세요.

### 간격 시스템 (4px 기반)

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
```

💡 **팁**: 4px 또는 8px 배수로 통일하면 시각적 일관성이 높아집니다.

---

## 🔘 버튼

### 변형별 용도

| 변형 | 용도 | 예시 |
|------|------|------|
| Primary | 주요 액션 (페이지당 1개 권장) | 저장, 제출, 구매 |
| Secondary | 보조 액션 | 취소, 이전 |
| Outline | 대안 액션 | 더보기, 필터 |
| Ghost | 최소 강조 | 닫기, 메뉴 항목 |
| Destructive | 위험한 액션 | 삭제, 탈퇴 |

### 크기 가이드

```css
/* Small - 좁은 공간, 테이블 내 */
.btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }

/* Medium - 기본값 */
.btn-md { padding: 0.75rem 1.5rem; font-size: 1rem; }

/* Large - CTA, 모바일 터치 */
.btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
```

💡 **팁**: 모바일에서는 터치 영역 최소 44x44px을 확보하세요.

---

## 📝 폼 컴포넌트

### 입력 필드 상태

```css
/* 기본 */
border: 1px solid var(--color-border);

/* 포커스 - 명확한 피드백 */
border-color: var(--color-primary-500);
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);

/* 에러 */
border-color: var(--color-error);

/* 비활성화 */
background-color: var(--color-bg-secondary);
cursor: not-allowed;
```

### 폼 레이아웃 팁

- 라벨은 입력 필드 위에 배치 (모바일 친화적)
- 필수 필드는 `*` 표시
- 에러 메시지는 필드 바로 아래에
- 관련 필드는 그룹으로 묶기

💡 **팁**: placeholder는 힌트용으로만, 라벨 대체 금지!

---

## 🃏 카드

### 기본 구조

```html
<div class="card">
  <div class="card-header">제목</div>
  <div class="card-body">내용</div>
  <div class="card-footer">액션</div>
</div>
```

### 호버 효과

```css
.card-hover {
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

💡 **팁**: 클릭 가능한 카드에만 호버 효과를 적용하세요.

---

## 🧭 네비게이션

### 반응형 패턴

| 화면 크기 | 패턴 |
|----------|------|
| Desktop (>1024px) | 상단 네비게이션 + 사이드바 |
| Tablet (768-1024px) | 상단 네비게이션 + 접히는 사이드바 |
| Mobile (<768px) | 햄버거 메뉴 + 오버레이 |

### 활성 상태 표시

```css
.nav-link.active {
  color: var(--color-primary-600);
  border-left: 2px solid var(--color-primary-600);
  background-color: var(--color-primary-50);
}
```

💡 **팁**: 현재 위치를 항상 명확하게 표시하세요.

---

## 💬 피드백 컴포넌트

### 토스트 알림

- 성공/정보: 3초 후 자동 닫힘
- 경고/에러: 사용자가 직접 닫기
- 위치: 우상단 또는 하단 중앙

### 모달 다이얼로그

```css
/* 백드롭 */
background-color: rgba(0, 0, 0, 0.5);

/* 모달 */
max-width: 500px;
max-height: 90vh;
overflow-y: auto;
```

💡 **팁**: ESC 키와 백드롭 클릭으로 닫을 수 있게 하세요.

---

## 🎨 최신 트렌드

### 글래스모피즘

```css
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

⚠️ **주의**: backdrop-filter 미지원 브라우저용 폴백 필요

### 뉴모피즘

```css
.neumorphism {
  background: #e0e5ec;
  border-radius: 16px;
  box-shadow: 
    8px 8px 16px #b8bec7,
    -8px -8px 16px #ffffff;
}
```

⚠️ **주의**: 접근성 문제로 제한적 사용 권장

---

## 🌙 다크모드

### 구현 방법

```css
/* CSS 변수로 테마 정의 */
:root {
  --color-bg: #ffffff;
  --color-text: #18181b;
}

[data-theme="dark"] {
  --color-bg: #18181b;
  --color-text: #fafafa;
}

/* 시스템 테마 자동 감지 */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #18181b;
    --color-text: #fafafa;
  }
}
```

### 체크리스트

- [ ] 모든 색상을 CSS 변수로 정의
- [ ] 그림자 강도 조절 (다크모드에서 더 강하게)
- [ ] 이미지/아이콘 대비 확인
- [ ] localStorage에 사용자 선택 저장

---

## ♿ 접근성

### 필수 사항

1. **색상 대비**: WCAG 2.1 AA 기준 (4.5:1 이상)
2. **키보드 네비게이션**: Tab, Enter, ESC 지원
3. **포커스 표시**: 명확한 포커스 링
4. **ARIA 레이블**: 아이콘 버튼에 필수

```css
/* 포커스 링 */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

💡 **팁**: 키보드만으로 모든 기능을 사용할 수 있는지 테스트하세요.

---

## ⚡ 성능

### CSS 최적화

- CSS 변수 사용으로 중복 제거
- 불필요한 애니메이션 제거
- `will-change` 속성 신중하게 사용

### 애니메이션

```css
/* 부드러운 전환 */
transition: all 0.2s ease;

/* 복잡한 애니메이션은 transform 사용 */
transform: translateY(-4px);  /* ✅ 좋음 */
top: -4px;                    /* ❌ 피하기 */
```

💡 **팁**: `prefers-reduced-motion` 미디어 쿼리로 애니메이션 비활성화 옵션 제공

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📁 파일 구조

```
project/
├── css/
│   ├── variables.css   # 디자인 토큰
│   ├── base.css        # 리셋, 기본 스타일
│   ├── layout.css      # 레이아웃
│   ├── components.css  # 컴포넌트
│   └── themes.css      # 테마 (다크모드)
├── js/
│   ├── main.js         # 메인 스크립트
│   ├── theme.js        # 테마 전환
│   └── ...
└── index.html
```

---

## 🔗 참고 자료

- [Tailwind CSS](https://tailwindcss.com) - 유틸리티 클래스 참고
- [Radix UI](https://www.radix-ui.com) - 접근성 좋은 컴포넌트
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - 접근성 가이드라인
- [CSS Tricks](https://css-tricks.com) - CSS 팁과 트릭
