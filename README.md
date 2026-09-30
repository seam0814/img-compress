# 이미지 용량 줄이기 (img-compress)

원하는 KB로 이미지를 압축하는 100% 클라이언트 사이드 도구. 서버·빌드·의존성 없음.

## 파일
- `index.html`  — 도구 본체(단일 파일, 이걸 복제해 다른 툴로 확장)
- `privacy.html`— 개인정보처리방침(AdSense 승인 요건)
- `robots.txt` / `sitemap.xml` — SEO
- 배포 전 `example.com`을 실제 도메인으로 전부 치환할 것

## 로컬 미리보기 (Termux)
    cd ~/play/img-compress
    python -m http.server 8000
    # 폰 브라우저에서 http://localhost:8000 접속

## Cloudflare Pages 배포 (서버비 0)
1. 이 폴더를 GitHub 저장소로 push
2. Cloudflare 대시보드 → Workers & Pages → Create → Pages → Connect to Git
3. Build command: (비움)  /  Build output directory: `/`  (정적 파일 그대로)
4. 배포되면 `<프로젝트>.pages.dev` URL 발급 → 나중에 커스텀 도메인 연결(무료)

## 배포 후 체크리스트
- [ ] `example.com` → 실제 도메인 치환 (index/privacy/robots/sitemap)
- [ ] privacy.html 연락처 실제 이메일로 교체
- [ ] 트래픽 좀 붙으면 AdSense 신청
- [ ] 새 툴은 index.html 복제해서 `/heic-to-jpg/` 같은 경로로 추가
