# Design Document: UI Style Guide

## Overview

프론트엔드 개발자를 위한 UI 스타일 가이드 웹 페이지입니다. 순수 HTML, CSS, JavaScript로 구현하여 별도의 프레임워크 의존성 없이 동작합니다. 최신 CSS 기능(CSS Variables, Flexbox, Grid, Container Queries)을 활용하고, 글래스모피즘, 뉴모피즘 등 현대적인 디자인 트렌드를 샘플로 제공합니다.

### 핵심 설계 원칙

1. **프레임워크 독립성**: 순수 HTML/CSS/JS로 구현하여 어떤 프로젝트에서도 참고 가능
2. **모듈화**: 각 컴포넌트 섹션을 독립적으로 구성
3. **인터랙티브**: 실제 동작하는 샘플로 즉각적인 피드백 제공
4. **복사 용이성**: 원클릭 코드 복사 기능

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      index.html                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Header                                ││
│  │  [Logo] [Navigation] [Theme Toggle]                     ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌──────────────┐ ┌────────────────────────────────────────┐│
│  │   Sidebar    │ │              Main Content              ││
│  │              │ │  ┌──────────────────────────────────┐  ││
│  │ - Tokens     │ │  │         Section Header           │  ││
│  │ - Buttons    │ │  ├──────────────────────────────────┤  ││
│  │ - Forms      │ │  │      Interactive Samples         │  ││
│  │ - Cards      │ │  ├──────────────────────────────────┤  ││
│  │ - Navigation │ │  │        Code Snippets             │  ││
│  │ - Feedback   │ │  ├──────────────────────────────────┤  ││
│  │ - Trends     │ │  │          Usage Tips              │  ││
│  │              │ │  └──────────────────────────────────┘  ││
│  └──────────────┘ └────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 파일 구조

```
ui-style-guide/
├── index.html              # 메인 HTML 파일
├── css/
│   ├── variables.css       # CSS 변수 (디자인 토큰)
│   ├── base.css            # 기본 스타일, 리셋
│   ├── layout.css          # 레이아웃 스타일
│   ├── components.css      # 컴포넌트 스타일
│   └── themes.css          # 라이트/다크 테마
└── js/
    ├── main.js             # 메인 스크립트
    ├── theme.js            # 테마 전환 로직
    ├── code-copy.js        # 코드 복사 기능
    └── navigation.js       # 네비게이션 로직
```

## Components and Interfaces

### 1. 디자인 토큰 시스템

#### 색상 팔레트 구조

```css
:root {
  /* Primary Colors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  
  /* Neutral Colors */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f4f4f5;
  --color-neutral-200: #e4e4e7;
  --color-neutral-500: #71717a;
  --color-neutral-800: #27272a;
  --color-neutral-900: #18181b;
  
  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

#### 타이포그래피 스케일

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Fira Code', 'Consolas', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

#### 간격 시스템

```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
}
```

### 2. 버튼 컴포넌트

#### 버튼 변형

| 변형 | 용도 | 스타일 특징 |
|------|------|-------------|
| Primary | 주요 액션 | 채워진 배경, 흰색 텍스트 |
| Secondary | 보조 액션 | 연한 배경, 진한 텍스트 |
| Outline | 대안 액션 | 테두리만, 투명 배경 |
| Ghost | 최소 강조 | 테두리 없음, 호버 시 배경 |
| Destructive | 삭제/위험 | 빨간색 계열 |

#### 버튼 크기

```css
.btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
.btn-md { padding: 0.75rem 1.5rem; font-size: 1rem; }
.btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
```

### 3. 폼 컴포넌트

#### 입력 필드 상태

- **Default**: 기본 테두리, 중립 색상
- **Focus**: 프라이머리 색상 테두리, 포커스 링
- **Error**: 빨간색 테두리, 에러 메시지
- **Disabled**: 회색 배경, 커서 변경

#### 폼 컴포넌트 목록

1. Text Input
2. Textarea
3. Select
4. Checkbox
5. Radio Button
6. Toggle Switch

### 4. 카드 컴포넌트

#### 카드 변형

```css
/* 기본 카드 */
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

/* 호버 효과 카드 */
.card-hover {
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* 글래스모피즘 카드 */
.card-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 5. 네비게이션 컴포넌트

- **Top Navigation Bar**: 로고, 메뉴 링크, 액션 버튼
- **Sidebar**: 섹션별 링크, 활성 상태 표시
- **Tabs**: 콘텐츠 전환용 탭
- **Breadcrumb**: 현재 위치 표시

### 6. 피드백 컴포넌트

#### Toast 알림

```javascript
// Toast 인터페이스
function showToast(message, type = 'info', duration = 3000) {
  // type: 'success' | 'info' | 'warning' | 'error'
}
```

#### Modal 다이얼로그

```html
<dialog class="modal">
  <div class="modal-header">제목</div>
  <div class="modal-body">내용</div>
  <div class="modal-footer">액션 버튼</div>
</dialog>
```

### 7. 트렌드 섹션 컴포넌트

#### 글래스모피즘 (Glassmorphism)

```css
.glassmorphism {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

#### 뉴모피즘 (Neumorphism)

```css
.neumorphism {
  background: #e0e5ec;
  border-radius: 16px;
  box-shadow: 
    8px 8px 16px #b8bec7,
    -8px -8px 16px #ffffff;
}
```

## Data Models

### 컴포넌트 샘플 데이터 구조

```javascript
// 컴포넌트 샘플 정의
const componentSample = {
  id: 'btn-primary',
  name: 'Primary Button',
  category: 'buttons',
  description: '주요 액션에 사용하는 기본 버튼',
  html: '<button class="btn btn-primary">버튼</button>',
  css: '.btn-primary { ... }',
  variants: ['sm', 'md', 'lg'],
  states: ['default', 'hover', 'active', 'disabled']
};

// 디자인 토큰 정의
const designToken = {
  name: '--color-primary-500',
  value: '#3b82f6',
  category: 'color',
  description: '프라이머리 색상'
};
```

### 테마 설정 구조

```javascript
const themeConfig = {
  current: 'light', // 'light' | 'dark' | 'system'
  colors: {
    light: { /* 라이트 모드 색상 */ },
    dark: { /* 다크 모드 색상 */ }
  }
};
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: 코드 복사 기능 동작

*For any* 코드 스니펫 또는 디자인 토큰 요소에서 복사 버튼을 클릭하면, 해당 요소의 코드/값이 클립보드에 복사되고 성공 피드백이 표시되어야 한다.

**Validates: Requirements 1.4, 8.1**

### Property 2: 코드 스니펫 표시 기능

*For any* 컴포넌트 샘플의 코드 버튼을 클릭하면, 해당 컴포넌트의 HTML/CSS 코드 스니펫이 표시되어야 한다.

**Validates: Requirements 2.4, 3.4**

### Property 3: 호버 상태 스타일 적용

*For any* 인터랙티브 컴포넌트(버튼, 카드, 네비게이션)에 마우스를 올리면, 정의된 호버 스타일(색상 변화, 그림자, 스케일 등)이 적용되어야 한다.

**Validates: Requirements 2.3, 4.3, 5.2**

### Property 4: 폼 컴포넌트 상태 변화

*For any* 폼 컴포넌트와 상호작용(포커스, 입력, 블러)하면, 해당 상태에 맞는 스타일이 실시간으로 적용되어야 한다.

**Validates: Requirements 3.3**

### Property 5: 피드백 컴포넌트 데모 동작

*For any* 피드백 컴포넌트(토스트, 모달, 툴팁)의 데모 버튼을 클릭하면, 해당 컴포넌트가 실제로 화면에 표시되어야 한다.

**Validates: Requirements 6.3**

### Property 6: 구문 하이라이팅 적용

*For any* 코드 스니펫 영역에서, 코드는 언어에 맞는 구문 하이라이팅이 적용되어 표시되어야 한다.

**Validates: Requirements 8.2**

### Property 7: 코드 탭 전환

*For any* 코드 스니펫 영역에서 HTML/CSS 탭을 전환하면, 해당 언어의 코드가 표시되어야 한다.

**Validates: Requirements 8.3**

### Property 8: 테마 전환 일관성

*For any* 테마 토글 버튼 클릭 시, 페이지의 모든 컴포넌트가 선택된 테마(라이트/다크)에 맞게 일관되게 업데이트되어야 한다.

**Validates: Requirements 9.1, 9.2**

### Property 9: 시스템 테마 자동 감지

*For any* 시스템 테마 설정(prefers-color-scheme)이 있는 환경에서, 페이지 로드 시 시스템 테마에 맞게 초기 테마가 자동 설정되어야 한다.

**Validates: Requirements 9.3**

## Error Handling

### 클립보드 복사 실패

```javascript
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('복사되었습니다!', 'success');
  } catch (err) {
    // Fallback: 구형 브라우저 지원
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('복사되었습니다!', 'success');
  }
}
```

### 테마 저장 실패

```javascript
function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (err) {
    // localStorage 사용 불가 시 세션 동안만 유지
    console.warn('테마 저장 실패, 세션 동안만 유지됩니다.');
  }
}
```

### 브라우저 호환성

- `backdrop-filter` 미지원 브라우저: 대체 배경색 제공
- CSS Variables 미지원 브라우저: 폴백 값 제공

```css
.glassmorphism {
  /* Fallback */
  background: rgba(255, 255, 255, 0.9);
  /* Modern browsers */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
}
```

## Testing Strategy

### Unit Tests

단위 테스트는 특정 예제와 엣지 케이스를 검증합니다:

1. **DOM 구조 테스트**
   - 각 섹션에 필요한 컴포넌트가 존재하는지 확인
   - 버튼 섹션: 5가지 변형, 3가지 크기
   - 폼 섹션: 6가지 컴포넌트, 4가지 상태
   - 카드 섹션: 4가지 변형
   - 네비게이션 섹션: 4가지 컴포넌트
   - 피드백 섹션: 4가지 컴포넌트, 4가지 변형

2. **초기 상태 테스트**
   - 페이지 로드 시 기본 테마 적용 확인
   - 시스템 테마 감지 동작 확인

### Property-Based Tests

속성 기반 테스트는 모든 입력에 대해 보편적인 속성을 검증합니다:

- **테스트 프레임워크**: Jest + fast-check
- **최소 반복 횟수**: 100회

1. **Property 1 테스트**: 모든 복사 가능 요소에 대해 복사 기능 동작 검증
2. **Property 2 테스트**: 모든 컴포넌트 샘플에 대해 코드 스니펫 표시 검증
3. **Property 3 테스트**: 모든 인터랙티브 요소에 대해 호버 스타일 적용 검증
4. **Property 8 테스트**: 테마 전환 시 모든 컴포넌트 스타일 일관성 검증

### 테스트 환경

```javascript
// Jest 설정
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy'
  }
};
```

### 접근성 테스트

- 키보드 네비게이션 테스트
- 스크린 리더 호환성 테스트
- 색상 대비 검증 (WCAG 2.1 AA 기준)
