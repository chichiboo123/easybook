# 📖 Easy book

PDF를 **진짜 책처럼** 넘겨 읽는 웹 뷰어입니다. 파일을 업로드하거나 Google Drive 공유 링크만 넣으면, 페이지 모서리를 잡아 끌면 종이가 휘어지며 넘어가는 아날로그 책 읽기 경험을 제공합니다.

🔗 **데모:** [easybook.chichiboo.link](https://easybook.chichiboo.link)

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📚 **두쪽/한쪽 보기** | 실제 책처럼 펼침면(spread) 표시. 표지·뒷표지는 자동으로 단면 처리 |
| 🍃 **진짜 종이 같은 페이지 넘김** | [StPageFlip](https://github.com/Nodlik/StPageFlip)(MIT) 기반 — 모서리를 끌면 종이가 휘어지고(curl), 손을 놓으면 관성으로 넘어감. 모서리에 마우스를 올리면 살짝 들춰짐 |
| 📕 **하드커버 · 책 두께** | 표지/뒷표지는 단단한 표지처럼 열리고, 읽은 만큼 왼쪽 종이 단면이 두꺼워짐. 제본선 음영·종이 결 표현 |
| 🔈 **넘김 소리** | Web Audio로 합성한 종이 넘기는 소리 (더보기 메뉴에서 켜기/끄기) |
| 🎚 **페이지 슬라이더 · 이어 읽기** | 하단 슬라이더로 원하는 쪽까지 한 번에 넘김. 같은 PDF를 다시 열면 마지막 읽던 쪽부터 |
| 🔍 **확대/축소·화면 맞춤** | 50%~300% 줌 (버튼 · Ctrl+휠 · 핀치), 확대 시 드래그 패닝 지원 |
| 🔗 **Google Drive 링크** | 공유 링크를 직접 붙여넣어 열기. 실패 시 Drive 임베드 뷰어로 자동 폴백 |
| 💾 **프로젝트 저장/불러오기** | 현재 PDF·보기 상태를 `.ebook` 파일로 저장하고 그대로 복원 |
| 📲 **공유 링크 생성** | URL로 연 문서는 같은 화면으로 바로 열리는 링크를 복사 |
| 🌗 **다크/라이트 테마** | KRDS(한국 정부 디자인 시스템) 토큰 기반 |
| 🌐 **다국어** | 한국어 · English · 日本語 |
| ⛶ **전체화면(슬라이드쇼)** | 발표·낭독용 몰입 모드 (컨트롤 자동 숨김, iPhone은 화면 내 전체화면으로 대체) |
| ⌨️ **키보드·터치 조작** | `← →` `Space` `PageUp/Down` `Home/End` 키, 모바일 스와이프·드래그 |

---

## 🚀 사용법

1. 상단 **파일 열기** 버튼으로 PDF를 선택하거나, 화면에 **드래그 앤 드롭**합니다.
2. 또는 URL 입력란에 **Google Drive 공유 링크** 또는 **PDF 직접 URL**을 넣고 **불러오기**를 누릅니다.
3. 페이지 **모서리를 잡아 끌거나**, 클릭 · 좌우 버튼 · 키보드 `← →` · 스와이프로 페이지를 넘깁니다. 하단 슬라이더로 빠르게 이동할 수 있습니다.
4. 상단 도구막대에서 보기 모드 전환, 확대/축소, 페이지 이동을 할 수 있습니다.
5. 추가 기능(넘김 소리·프로젝트 저장·공유 링크·언어·초기화·사용법)은 **⋮ 더보기** 메뉴에 모여 있습니다.

> **Google Drive 링크 팁:** 파일 공유 설정을 **"링크가 있는 모든 사용자"**로 바꿔야 열립니다.

---

## 🔒 개인정보 보호

PDF 파일과 URL 데이터는 **사용자 브라우저에서만** 처리됩니다. Easy book 서버에 파일을 업로드하거나 저장하지 않습니다. (Google Drive 링크는 CORS 우회를 위해 Cloudflare Worker 프록시를 거쳐 다운로드만 중계되며, 저장되지 않습니다.)

---

## 🛠 기술 스택

- **순수 HTML/CSS/JavaScript** — 빌드 도구·프레임워크 없음, `index.html` 단일 파일
- **[PDF.js](https://mozilla.github.io/pdf.js/) 2.16.105** — PDF 렌더링 및 텍스트 레이어
- **[StPageFlip](https://github.com/Nodlik/StPageFlip) 2.0.7 (MIT)** — 페이지 말림(curl) 넘김 엔진. `vendor/page-flip/`에 포함 (페이지는 보이는 쪽 주변만 지연 렌더링)
- **Cloudflare Workers** — Google Drive 등 CORS 차단 URL용 프록시 (`worker.js`)
- **Pretendard GOV / Material Symbols** — 글꼴·아이콘

---

## 📂 프로젝트 구조

```
easybook/
├── index.html   # 앱 전체 (UI · 스타일 · 로직)
├── worker.js    # Cloudflare Worker CORS 프록시
├── vendor/page-flip/  # StPageFlip 라이브러리 + LICENSE
├── CNAME        # GitHub Pages 커스텀 도메인
└── README.md
```

---

## ⚙️ 배포 / 개발

### 정적 호스팅
`index.html`은 어떤 정적 호스팅(GitHub Pages 등)에도 그대로 올릴 수 있습니다. 본 프로젝트는 GitHub Pages + 커스텀 도메인(`CNAME`)으로 배포됩니다.

### 로컬 실행
```bash
# 저장소 루트에서 정적 서버 실행 (예: Python)
python3 -m http.server 5500
# http://127.0.0.1:5500 접속
```
> 파일 업로드 기능은 로컬에서 바로 동작합니다. Google Drive 링크 기능은 프록시 Worker가 필요합니다.

### Cloudflare Worker 프록시
`worker.js`를 Cloudflare Workers에 배포한 뒤, `index.html`의 `PROXY_URL`을 배포 주소로 맞춥니다. Worker의 `ALLOWED_ORIGINS`에 앱 도메인(예: `https://easybook.chichiboo.link`, 로컬 개발 주소)을 추가해야 CORS가 허용됩니다.

```js
// worker.js
const ALLOWED_ORIGINS = new Set([
  "https://easybook.chichiboo.link",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
]);
```

---

## 🙌 만든이

**교육뮤지컬 꿈꾸는 치수쌤** — [litt.ly/chichiboo](https://litt.ly/chichiboo)
