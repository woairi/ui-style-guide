# UI Style Guide

프론트엔드 개발자를 위한 현대적인 UI 스타일 가이드입니다.

## 🎯 소개

순수 HTML, CSS, JavaScript로 구현된 UI 컴포넌트 라이브러리 및 스타일 가이드입니다. 프레임워크 의존성 없이 어떤 프로젝트에서도 참고하고 활용할 수 있습니다.

## ✨ 주요 기능

- **디자인 토큰**: 색상, 타이포그래피, 간격 시스템
- **컴포넌트**: 버튼, 폼, 카드, 네비게이션, 피드백
- **다크모드**: 라이트/다크 테마 전환 및 시스템 테마 자동 감지
- **코드 복사**: 원클릭 코드 스니펫 복사
- **반응형**: 모바일, 태블릿, 데스크톱 지원
- **접근성**: 키보드 네비게이션, ARIA 레이블

## 🚀 시작하기

### 로컬 실행

```bash
# 저장소 클론
git clone <repository-url>
cd ui-style-guide

# 브라우저에서 열기
open index.html
# 또는 Live Server 사용
```

### 파일 구조

```
ui-style-guide/
├── index.html          # 메인 페이지
├── css/
│   ├── variables.css   # 디자인 토큰 (CSS 변수)
│   ├── base.css        # 리셋, 기본 스타일
│   ├── layout.css      # 레이아웃
│   ├── components.css  # 컴포넌트 스타일
│   └── themes.css      # 다크모드 스타일
├── js/
│   ├── main.js         # 메인 스크립트
│   ├── theme.js        # 테마 전환
│   ├── code-copy.js    # 코드 복사
│   └── navigation.js   # 네비게이션
├── STYLE-GUIDE.md      # 스타일 가이드 문서
├── CHANGELOG.md        # 변경 이력
└── README.md           # 이 파일
```

## 📦 컴포넌트

### 디자인 토큰

| 카테고리 | 설명 |
|---------|------|
| 색상 | Primary, Secondary, Neutral, Semantic |
| 타이포그래피 | 폰트 크기, 굵기, 줄 높이 |
| 간격 | 4px 기반 간격 시스템 |
| 그림자 | xs ~ 2xl 그림자 스케일 |
| 반경 | sm ~ full 테두리 반경 |

### UI 컴포넌트

| 컴포넌트 | 변형 |
|---------|------|
| 버튼 | Primary, Secondary, Outline, Ghost, Destructive |
| 폼 | Input, Textarea, Select, Checkbox, Radio, Toggle |
| 카드 | 기본, 이미지, 호버, 인터랙티브, 글래스모피즘 |
| 네비게이션 | Navbar, Sidebar, Tabs, Breadcrumb |
| 피드백 | Toast, Alert, Modal, Tooltip |

## 🎨 테마

### 다크모드 사용

```javascript
// 테마 전환
ThemeManager.toggle();

// 특정 테마 설정
ThemeManager.setTheme('dark');
ThemeManager.setTheme('light');

// 현재 테마 확인
ThemeManager.getEffective(); // 'light' 또는 'dark'
```

### CSS 변수 활용

```css
/* 테마에 따라 자동 변경되는 변수 */
.my-component {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

## 🔧 커스터마이징

### 색상 변경

`css/variables.css`에서 색상 변수를 수정하세요:

```css
:root {
  --color-primary-500: #your-color;
  --color-primary-600: #your-hover-color;
}
```

### 컴포넌트 추가

1. `css/components.css`에 스타일 추가
2. `index.html`에 샘플 추가
3. 필요시 `css/themes.css`에 다크모드 스타일 추가

## 📱 브라우저 지원

| 브라우저 | 버전 |
|---------|------|
| Chrome | 최신 2개 버전 |
| Firefox | 최신 2개 버전 |
| Safari | 최신 2개 버전 |
| Edge | 최신 2개 버전 |

## 📄 라이선스

MIT License

## 🔗 참고 자료

- [STYLE-GUIDE.md](./STYLE-GUIDE.md) - 상세 스타일 가이드
- [Tailwind CSS](https://tailwindcss.com) - 디자인 토큰 참고
- [Radix UI](https://www.radix-ui.com) - 접근성 패턴 참고
