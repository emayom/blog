# 5. 댓글 시스템

Date: 2026-06-15

## Status

Accepted

## Context

블로그 댓글 시스템을 어떻게 구현할지 결정해야 한다. 주요 후보는 다음과 같다:

- **giscus** — GitHub Discussions 기반 오픈소스 댓글
- **Utterances** — GitHub Issues 기반 오픈소스 댓글, 기술 블로그에서 널리 사용됨
- **Disqus** — 광고 기반 댓글 SaaS
- **직접 구현** — DB + 인증 직접 개발
- **댓글 없음** — 댓글 기능 미도입

초기에는 기술 블로그에서 널리 사용되는 Utterances를 검토했다. 그러나 Utterances는 GitHub Issues에 댓글을 저장하는데, Issues는 버그 트래커로도 사용하므로 댓글이 쌓이면 관리가 번잡해질 수 있다. giscus는 GitHub Discussions에 저장하여 커뮤니티 대화 목적에 더 적합하고, 이모지 반응·다크모드·댓글 중첩 등 부가 기능도 지원한다.

## Decision

**giscus** 를 채택한다.

## Consequences

긍정적 결과:
- Disqus와 달리 광고가 없고 무료다
- 기술 블로그 독자 대부분이 GitHub 계정을 보유하고 있어 별도 회원가입 없이 댓글 작성이 가능하다
- 댓글이 GitHub Discussions에 저장되므로 별도 DB나 관리 대시보드가 필요 없다
- 코드가 공개되어 있어 신뢰할 수 있고, 서비스 종료 리스크가 낮다
- 블로그 테마에 맞게 다크/라이트 모드를 자동으로 전환한다

수용해야 할 결과:
- GitHub 계정이 없는 독자는 댓글을 작성할 수 없다
- GitHub 서비스 장애 시 댓글 기능이 동작하지 않는다
