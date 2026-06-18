# 작성 워크플로우 (Runbook)

- **상태:** Draft
- **날짜:** 2026-06-15
- **참조:** `docs/content-model.md`(스키마), `docs/information-architecture.md`(라우트), `docs/accessibility-checklist.md`

새 글·감상 항목을 추가하는 절차. `content-model.md`의 *스키마*를 실제 *작성 손동작*으로 잇는다.

## 새 글 추가

1. **파일 생성** — `src/content/blog/<slug>.mdx`
   - `<slug>`는 소문자 케밥케이스, 영문·숫자·하이픈만. 이게 URL이 된다 → `/writing/<slug>`.
   - 예: `src/content/blog/react-server-components.mdx`

2. **frontmatter 작성** — 필수 `title`·`date`, 권장 `tags`·`description`.

   ```yaml
   ---
   title: React Server Components 정리
   date: 2026-06-15
   tags: [react, nextjs]
   description: RSC의 동작과 적용 기준을 정리한다.
   draft: true        # 작성 중에는 true
   # featured: true    # 목록 상단 고정(선택, m4)
   # series: react-basics  # 시리즈 묶기(선택, m2)
   ---
   ```
   필드 정의는 `content-model.md` 참조. 필수 누락 시 빌드 실패.

3. **본문 작성** (MDX)
   - 헤딩은 `##`(h2)부터 — `h1`은 `title`이 차지한다. 레벨 건너뛰지 않기.
   - 코드 펜스에는 언어 명시(```` ```ts ````) — 하이라이팅·복사 버튼 동작.
   - 이미지에는 의미 있는 `alt` 필수(장식은 `alt=""`).

4. **미리보기** — `npm run dev` → `http://localhost:3000/writing/<slug>`
   - `draft: true`는 **dev에서만** 보인다(프로덕션 제외).

5. **발행** — `draft`를 `false`로 바꾸거나 줄을 제거 → 커밋.
   - 커밋 예: `feat(content): React Server Components 글 추가`

6. **자동 반영 확인** — 별도 작업 없이 frontmatter에서 파생된다.
   - 목록(`/writing`) 노출 · 태그 페이지(`/tag/<tag>`) · 연도 아카이브(`/archive/<year>`) · 연관 글(태그 겹침).

7. **점검** — `accessibility-checklist.md`에서 해당 항목 확인(헤딩 순서·이미지 alt·코드블록), 링크/이미지 깨짐 확인.

## 새 감상 항목 추가

1. **파일 생성** — `src/content/library/<slug>.mdx`
2. **frontmatter** — 필수 `title`·`type`·`cover`.

   ```yaml
   ---
   title: 장송의 프리렌
   type: anime          # book | anime | movie
   cover: /library/frieren.jpg
   rating: 5            # 0~5, 0.5 단위(선택)
   date: 2026-05        # YYYY-MM(선택)
   ---
   ```

3. **확인** — 책장(`/library`)의 `type` 탭에 노출.

## 자주 하는 실수

- 한글/대문자 slug → URL 인코딩·일관성 깨짐. 영문 케밥케이스만.
- `date` 포맷 불일치(글 `YYYY-MM-DD`, 감상 `YYYY-MM`) → 파싱 에러.
- 본문에 `#`(h1) 사용 → 헤딩 구조 깨짐. `##`부터.
- 발행 시 `draft: true` 방치 → 프로덕션에 안 보임.

## 변경 이력

| 날짜 | 변경 내용 | 사유 |
|------|----------|------|
| 2026-06-15 | 작성 워크플로우 초기 정의 | 콘텐츠 모델을 운영 절차로 연결 |
