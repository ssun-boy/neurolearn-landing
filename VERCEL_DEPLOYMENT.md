# Vercel 배포 가이드

## 방법 1: GitHub 연동 (추천) ⭐

가장 간단하고 자동화된 방법입니다.

### 1단계: GitHub 저장소 생성 및 푸시

```bash
# landing 폴더로 이동
cd C:\00_NeuroLearn_MVP\landing

# Git 초기화
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: NeuroLearn landing page"

# GitHub에 새 저장소 생성 후 (https://github.com/new)
# 원격 저장소 연결
git remote add origin https://github.com/YOUR_USERNAME/neurolearn-landing.git

# 푸시
git branch -M main
git push -u origin main
```

### 2단계: Vercel에 배포

1. **Vercel 계정 생성**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 생성**
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 연결
   - `neurolearn-landing` 저장소 선택

3. **프로젝트 설정**
   ```
   Framework Preset: Other
   Root Directory: ./
   Build Command: (비워둠)
   Output Directory: ./
   Install Command: (비워둠)
   ```

4. **Deploy 클릭**
   - 자동으로 배포 시작
   - 2-3분 후 완료

5. **URL 확인**
   - 자동 생성된 URL: `https://neurolearn-landing-xxxx.vercel.app`

### 3단계: 커스텀 도메인 연결

1. Vercel 프로젝트 → "Settings" → "Domains"
2. "Add Domain" 클릭
3. `www.neurolearn.co.kr` 입력
4. DNS 설정 안내에 따라 도메인 제공업체에서 설정:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. DNS 전파 대기 (10분~48시간)

---

## 방법 2: Vercel CLI 사용

터미널에서 직접 배포하는 방법입니다.

### 1단계: Vercel CLI 설치

```bash
# npm 사용
npm i -g vercel

# 또는 yarn 사용
yarn global add vercel
```

### 2단계: 로그인

```bash
vercel login
```

이메일 입력 후 인증 메일 확인

### 3단계: 배포

```bash
# landing 폴더로 이동
cd C:\00_NeuroLearn_MVP\landing

# 배포 실행
vercel

# 질문에 답변
? Set up and deploy "landing"? [Y/n] y
? Which scope do you want to deploy to? (본인 계정 선택)
? Link to existing project? [y/N] n
? What's your project's name? neurolearn-landing
? In which directory is your code located? ./
```

### 4단계: 프로덕션 배포

```bash
# 테스트 후 프로덕션 배포
vercel --prod
```

---

## 방법 3: 드래그 앤 드롭 (가장 간단)

코드 없이 브라우저에서 바로 배포합니다.

### 단계

1. https://vercel.com/new 접속
2. "Browse" 클릭
3. `C:\00_NeuroLearn_MVP\landing` 폴더 선택
4. 드래그 앤 드롭
5. "Deploy" 클릭
6. 완료!

**주의**: 이 방법은 Git 연동이 안 되어 자동 배포가 불가능합니다.

---

## 환경 변수 설정 (선택사항)

나중에 API 키 등이 필요할 경우:

1. Vercel 프로젝트 → "Settings" → "Environment Variables"
2. 변수 추가:
   ```
   Name: API_KEY
   Value: your-api-key
   Environment: Production, Preview, Development
   ```

---

## 자동 배포 설정

GitHub 연동 시 자동으로 활성화됩니다:

- **main 브랜치 푸시** → 프로덕션 배포
- **다른 브랜치 푸시** → 프리뷰 배포
- **Pull Request** → 프리뷰 URL 생성

---

## 배포 후 확인사항

### 1. 성능 테스트
- https://pagespeed.web.dev 에서 테스트
- 목표: 90점 이상

### 2. 모바일 테스트
- 다양한 디바이스에서 확인
- 반응형 디자인 작동 확인

### 3. SEO 확인
- meta 태그 확인
- Open Graph 이미지 확인

### 4. 브라우저 호환성
- Chrome, Safari, Firefox, Edge 테스트

---

## Vercel 프로젝트 설정 최적화

### vercel.json 설명

현재 생성된 `vercel.json`:

```json
{
  "version": 2,
  "name": "neurolearn-landing",
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

**설정 설명**:
- `builds`: 정적 파일로 빌드
- `routes`: URL 라우팅 설정
- `headers`: 캐시 최적화 (CSS/JS는 1년, HTML은 즉시 업데이트)

---

## 커스텀 도메인 DNS 설정 예시

### 가비아 (gabia.com)
```
호스트: www
타입: CNAME
값: cname.vercel-dns.com
TTL: 3600
```

### 카페24 (cafe24.com)
```
레코드 타입: CNAME
호스트: www
값/포인트: cname.vercel-dns.com
```

### Cloudflare
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy status: DNS only (회색 구름)
```

---

## 문제 해결

### 배포가 안 될 때
```bash
# 로그 확인
vercel logs

# 캐시 클리어 후 재배포
vercel --force
```

### 도메인 연결이 안 될 때
- DNS 전파 확인: https://dnschecker.org
- Vercel 설정에서 도메인 제거 후 재추가
- TTL 낮추기 (3600 → 300)

### 파일이 업데이트 안 될 때
- 브라우저 캐시 클리어: Ctrl + Shift + R
- Vercel에서 "Redeploy" 클릭

---

## 예상 비용

### Vercel 무료 플랜
- ✅ 무제한 배포
- ✅ 자동 HTTPS
- ✅ 글로벌 CDN
- ✅ 커스텀 도메인
- ✅ 월 100GB 대역폭
- ✅ 월 1,000,000 Edge Function 호출

**결론**: 랜딩 페이지는 무료 플랜으로 충분합니다!

---

## 추가 최적화

### 이미지 최적화
```bash
# 이미지 압축
npm i -g sharp-cli
sharp -i input.jpg -o output.jpg --quality 80
```

### 분석 도구 연결
- Google Analytics
- Vercel Analytics (무료)
- Microsoft Clarity (무료)

---

## 다음 단계

1. ✅ Vercel 배포 완료
2. 🔄 커스텀 도메인 연결
3. 🔄 Google Analytics 추가
4. 🔄 SEO 최적화
5. 🔄 성능 모니터링

---

**배포 완료 후 URL 공유해 주세요!** 🚀
