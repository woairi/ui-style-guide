# Changelog

이 프로젝트의 모든 주요 변경 사항을 기록합니다.

형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/)를 따르며,
버전 관리는 [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

## [1.0.0] - 2026-01-14

### 추가됨 (Added)

#### 디자인 토큰
- 색상 팔레트 (Primary, Secondary, Neutral, Semantic)
- 타이포그래피 스케일 (xs ~ 5xl)
- 4px 기반 간격 시스템
- 그림자 스케일 (xs ~ 2xl)
- 테두리 반경 스케일

#### 컴포넌트
- **버튼**: Primary, Secondary, Outline, Ghost, Destructive 변형
- **폼**: Input, Textarea, Select, Checkbox, Radio, Toggle Switch
- **카드**: 기본, 이미지, 호버 효과, 인터랙티브, 글래스모피즘
- **네비게이션**: Navbar, Sidebar, Tabs, Breadcrumb
- **피드백**: Toast, Alert, Modal, Tooltip

#### 기능
- 라이트/다크 테마 전환
- 시스템 테마 자동 감지 (prefers-color-scheme)
- localStorage 테마 저장
- 원클릭 코드 복사
- 스크롤 스파이 네비게이션
- 반응형 모바일 메뉴

#### 트렌드 섹션
- 글래스모피즘 샘플
- 뉴모피즘 샘플
- 마이크로 인터랙션 예제

#### 문서
- README.md
- STYLE-GUIDE.md (실용적인 팁 포함)
- CHANGELOG.md

### 접근성
- 키보드 네비게이션 지원
- ARIA 레이블 적용
- 포커스 상태 스타일
- 색상 대비 WCAG 2.1 AA 준수

---

## 버전 관리 규칙

- **Major (X.0.0)**: 호환되지 않는 API 변경
- **Minor (0.X.0)**: 하위 호환되는 기능 추가
- **Patch (0.0.X)**: 하위 호환되는 버그 수정

## 변경 유형

- **Added**: 새로운 기능
- **Changed**: 기존 기능 변경
- **Deprecated**: 곧 제거될 기능
- **Removed**: 제거된 기능
- **Fixed**: 버그 수정
- **Security**: 보안 취약점 수정
