# NeuroLearn Landing Page

> 독립적인 랜딩 페이지 - www.neurolearn.co.kr

## 📁 파일 구조

```
landing/
├── index.html              # 메인 HTML
├── style.css               # 스타일시트
├── script.js               # JavaScript 인터랙션
├── README.md               # 이 파일
├── VERCEL_DEPLOYMENT.md    # Vercel 배포 가이드 ⭐
├── vercel.json             # Vercel 설정
├── .gitignore              # Git 무시 파일
└── assets/
    ├── videos/             # 배경 영상 (추가 예정)
    └── images/             # 이미지 파일
```

## 🚀 실행 방법

### 방법 1: 브라우저에서 직접 열기
```
C:\00_NeuroLearn_MVP\landing\index.html 파일을 더블클릭
```

### 방법 2: 로컬 서버 실행 (권장)

#### Python 사용
```bash
cd C:\00_NeuroLearn_MVP\landing
python -m http.server 8080
```
그 후 브라우저에서 `http://localhost:8080` 접속

#### Node.js 사용
```bash
cd C:\00_NeuroLearn_MVP\landing
npx http-server -p 8080
```
그 후 브라우저에서 `http://localhost:8080` 접속

#### VS Code Live Server 확장 사용
1. VS Code에서 `index.html` 열기
2. 우클릭 → "Open with Live Server"

## 🎨 주요 기능

### 1. Hero Section
- **배경**: 애니메이션 그라데이션 (영상으로 교체 가능)
- **메인 메시지**: "당신의 뇌가 기억하는 방식으로 합격하세요"
- **CTA 버튼**: "무료로 시작하기"

### 2. Features Section
- 🧠 학습과학 기반
- 🤖 AI 맞춤 학습
- 📊 실시간 진도 추적

### 3. Process Timeline
진단 → 맞춤 커리큘럼 → 학습 & 복습 → 합격

### 4. Statistics
- 합격자 수: 1,234명
- 평균 합격률: 89%
- 학습 세션: 25,000+

### 5. Modal
"학습 시작하기" 버튼 클릭 시 "준비 중" 모달 표시

## 🎬 배경 영상 추가하기

### 실제 영상 파일 사용
1. 영상 파일을 `assets/videos/` 폴더에 추가
2. `index.html`에서 주석 해제:

```html
<!-- 현재 (주석 처리됨) -->
<!-- <video autoplay muted loop playsinline>
    <source src="assets/videos/hero-background.mp4" type="video/mp4">
</video> -->
<div class="video-placeholder"></div>

<!-- 영상 추가 후 -->
<video autoplay muted loop playsinline>
    <source src="assets/videos/hero-background.mp4" type="video/mp4">
</video>
<!-- <div class="video-placeholder"></div> -->
```

### YouTube 영상 임베드 (배경)
```html
<div class="video-background">
    <iframe
        src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=VIDEO_ID"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        style="width: 100%; height: 100%; object-fit: cover;">
    </iframe>
</div>
```

## 🎬 "영상으로 미리 만나보기" 섹션 설정

메인 페이지에 유튜브 소개 영상 섹션이 추가되어 있습니다!

### 유튜브 영상 ID 변경 방법

1. `index.html` 파일 열기
2. Line 83에서 `YOUR_VIDEO_ID` 부분 찾기
3. 실제 유튜브 영상 ID로 교체

**예시**:
```html
<!-- 현재 -->
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ...>

<!-- 변경 후 (예: https://youtu.be/dQw4w9WgXcQ 영상) -->
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" ...>
```

**유튜브 영상 ID 찾는 방법**:
- 일반 URL: `https://www.youtube.com/watch?v=VIDEO_ID` → VIDEO_ID 부분 복사
- 단축 URL: `https://youtu.be/VIDEO_ID` → VIDEO_ID 부분 복사

## 🛠️ 커스터마이징

### 색상 변경
`style.css`의 최상단에서 CSS 변수 수정:

```css
:root {
    --primary: #2563eb;        /* 메인 컬러 */
    --secondary: #7c3aed;      /* 보조 컬러 */
    --accent: #10b981;         /* 강조 컬러 */
    --dark: #1f2937;           /* 다크 컬러 */
    --gray: #6b7280;           /* 회색 */
}
```

### 통계 수치 변경
`index.html`의 `data-count` 속성 수정:

```html
<div class="stat-number" data-count="1234">0</div>  <!-- 합격자 수 -->
<div class="stat-number" data-count="89">0</div>    <!-- 합격률 -->
<div class="stat-number" data-count="25000">0</div> <!-- 학습 세션 -->
```

### CTA 버튼 동작 변경
`script.js`의 `showModal()` 함수 수정 또는:

```javascript
// 외부 링크로 이동
function showModal() {
    window.location.href = 'https://neurolearn.co.kr/signup';
}

// 또는 이메일 수집 폼 표시
function showModal() {
    // 이메일 수집 로직
}
```

### 모달 메시지 변경
`index.html`의 modal 섹션 수정:

```html
<div class="modal-content">
    <span class="modal-close" onclick="closeModal()">&times;</span>
    <div class="modal-icon">🚀</div>
    <h3>원하는 제목</h3>
    <p>원하는 내용</p>
    <div class="modal-info">
        <p><strong>추가 정보</strong></p>
    </div>
</div>
```

## 📱 반응형 디자인

자동으로 다양한 화면 크기에 대응:
- 데스크톱 (1200px+)
- 태블릿 (768px ~ 1199px)
- 모바일 (~ 767px)

## 🌐 배포

### Vercel (추천) ⭐
**상세 가이드**: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) 참고

**빠른 시작**:
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
cd C:\00_NeuroLearn_MVP\landing
vercel

# 프로덕션 배포
vercel --prod
```

또는 GitHub 연동으로 자동 배포:
1. GitHub 저장소에 푸시
2. Vercel에서 저장소 연결
3. 자동 배포 완료!

### GitHub Pages
1. GitHub 저장소 생성
2. `landing` 폴더 내용을 저장소에 푸시
3. Settings → Pages → Source: main branch
4. 커스텀 도메인 설정: `www.neurolearn.co.kr`

### Netlify
1. 저장소 연결
2. Build command: (없음)
3. Publish directory: `landing`
4. 커스텀 도메인 설정

### 일반 호스팅
FTP로 `landing` 폴더 내용을 웹 서버에 업로드

## 🔧 최적화 권장사항

### 성능
- [ ] 배경 영상 최적화 (H.264, 최대 10MB)
- [ ] 이미지 WebP 포맷 사용
- [ ] CSS/JS 압축 (배포 시)

### SEO
- [ ] `meta` 태그 추가 (description, keywords)
- [ ] Open Graph 태그 추가 (SNS 공유)
- [ ] Google Analytics 연결
- [ ] sitemap.xml 생성

### 접근성
- [ ] 이미지 alt 속성 추가
- [ ] ARIA 레이블 추가
- [ ] 키보드 네비게이션 테스트

## 📞 연락처

프로젝트 관련 문의: NeuroLearn 팀

---

**Last Updated**: 2025-01-07
