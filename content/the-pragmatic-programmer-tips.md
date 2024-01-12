---
title: 실용주의 프로그래머 수록 팁 모음 
description: 읽으면서 업데이트하는 `실용주의 프로그래머(The Pragmatic Programmer)` 수록 팁 모음집.
date: '2023-11-22'
categories:
  - The Pragmatic Programmer
  - Book
published: true
---

#### 목차
1. [자신의 기예에 관심을 가져라.](#tip-1-자신의-기예craft에-관심을-가져라)
1. [자기 일에 대해 생각하라.](#tip-2-자기-일에-대해-생각하라)
1. [당신에게는 에이전시가 있다.](#tip-3-당신에게는-에이전시agency가-있다)
1. [어설픈 변경 말고 대안을 제시하라.](#tip-4-어설픈-변경-말고-대안을-제시하라)
1. [깨진 창문을 내버려 두지 말라.](#tip-5-깨진-창문을-내버려-두지-말라)
1. [변화의 촉매가 되라.](#tip-6-변화의-촉매가-되라)
1. [큰 그림을 기억하라.](#tip-7-큰-그림을-기억하라)
1. [품질을 요구 사항으로 만들어라.](#tip-8-품질을-요구-사항으로-만들어라)
1. [지식 포트폴리오에 주기적으로 투자하라.](#tip-9-지식-포트폴리오에-주기적으로-투자하라)
1. [읽고 듣는 것을 비판적으로 분석하라.](#tip-10-읽고-듣는-것을-비판적으로-분석하라)
1. [한국어든 영어든 하나의 프로그래밍 언어일 뿐이다.](#tip-11-한국어든-영어든-하나의-프로그래밍-언어일-뿐이다)
1. [무엇을 말하는가와 어떻게 말하는가 모두 중요하다.](#tip-12-무엇을-말하는가와-어떻게-말하는가-모두-중요하다)
1. [문서를 애초부터 포함하고, 나중에 집어 넣으려고 하지 말라.](#tip-13-문서를-애초부터-포함하고-나중에-집어-넣으려고-하지-말라)
1. [좋은 설계는 나쁜 설계보다 바꾸기 쉽다.](#tip-14-좋은-설계는-나쁜-설계보다-바꾸기-쉽다)
1. [DRY: 반복하지 말라](#tip-15-dry-반복하지-말라dont-repeat-yourself)
1. [재사용하기 쉽게 만들어라.](#tip-16-재사용하기-쉽게-만들어라)
1. [관련 없는 것들 간에 서로 영향이 없도록 하라.](#tip-17-관련-없는-것들-간에-서로-영향이-없도록-하라)
1. [최종 결정이란 없다.](#tip-18-최종-결정이란-없다)
1. [유행을 좇지 말라.](#tip-19-유행을-좇지-말라)
1. [목표물을 찾기 위해 예광탄을 써라.](#tip-20-목표물을-찾기-위해-예광탄을-써라)
1. [프로토타이핑으로 학습하라.](#tip-21-프로토타이핑으로-학습하라)
1. [문제 도메인에 가깝게 프로그래밍하라.](#tip-22-문제-도메인에-가깝게-프로그래밍하라)
1. [추정으로 놀람을 피하라.](#tip-23-추정으로-놀람을-피하라)
1. [코드와 함께 일정도 반복하여 조정하라.](#tip-24-코드와-함께-일정도-반복하여-조정하라)
1. [지식을 일반 텍스트로 저장하라.](#tip-25-지식을-일반-텍스트로-저장하라)
1. [명령어 셸의 힘을 사용하라.](#tip-26-명령어-셸의-힘을-사용하라)
1. [에디터를 유창하게 쓸 수 있게 하라.](#tip-27-에디터를-유창하게fluency쓸-수-있게-하라)
1. [언제나 버전 관리 시스템을 사용하라.](#tip-28-언제나-버전-관리-시스템을-사용하라)
1. [비난 대신 문제를 해결하라.](#tip-29-비난-대신-문제를-해결하라)
1. [당황하지 말라.](#tip-30-당황하지-말라)
1. [코드를 고치기 전 실패하는 테스트부터.](#tip-31-코드를-고치기-전-실패하는-테스트부터)
1. [그놈의 오류 메세지 좀 읽어라.](#tip-32-그놈의damn-오류-메세지-좀-읽어라)
1. ["select"는 망가지지 않았다.](#tip-33-select는-망가지지-않았다)
1. [가정하지 말라. 증명하라.](#tip-34-가정하지-말라-증명하라)
1. [텍스트 처리 언어를 익혀라.](#tip-35-텍스트-처리-언어를-익혀라)
1. [여러분은 완벽한 소프트웨어를 만들 수 없다.](#tip-36-여러분은-완벽한-소프트웨어를-만들-수-없다)

<br>

## Tip 1. 자신의 기예<sub style="color: #656D76">Craft</sub>에 관심을 가져라.
> 소프트웨어 개발을 잘하고 싶지 않다면 왜 여기에 인생을 바치고 있는가?  

여러분이 소프트웨어 개발을 잘하는 것에 관심이 없다면, 이 일을 하는 의미가 없다고 생각한다. 

<br>

## Tip 2. 자기 일에 대해 생각하라. 
> 자동 조종 장치를 끄고 직접 조종 하라. 자신의 작업을 끊임없이 비판적으로 살펴보라.  

절대 기계적으로 일하지 말라.  언제나 일하면서 동시에 생각하고, 자기 일을 비평하라.  
오래된 IBM의 표어 '생각하라!<sub style="color: #656D76">Think!</sub>가 실용주의 프로그래머의 계명이다.

<br>

## Tip 3. 당신에게는 에이전시<sub style="color: #656D76">agency</sub>가 있다. 
> 당신의 인생이다. 꽉 움켜쥐고, 원하는 바를 이뤄라.  

당신은 당신의 조직을 바꾸거나, 당신의 조직을 바꿀 수 있다.<sup>[_ChangeYourOrganization_](https://wiki.c2.com/?ChangeYourOrganization)</sup>

<br>

## Tip 4. 어설픈 변경 말고 대안을 제시하라. 
> 변명하는 대신 대안을 제시하라. 그 일은 할 수 없다고만 말하지 말고, 무엇을 할 수 있는지 설명하라.  

<br>

## Tip 5. 깨진 창문을 내버려 두지 말라.
> 나쁜 설계, 잘못된 결정, 혹은 형편없는 코드 등이 모두 깨진 창문이다.  

발견하자마자 고쳐라. 적절히 고칠 시간이 없다면 일단 판자로 덮는 것 만이라도 하라.  
엔트로피가 우리를 지배하도록 내버려두지 말라. 

<br>

## Tip 6. 변화의 촉매가 되라. 
> 사람들에게 변화를 강요할 수는 없다. 대신 미래가 어떤 모습일지 보여주고, 미래를 만드는 일에 그들이 참여하도록 하라.   

계속되는 성공에 합류하기란 쉽다.

<br>

## Tip 7. 큰 그림을 기억하라.
> 주변에 무슨 일이 일어나는지 점검하는 걸 잊을 정도로 세부사항에 빠지지 말라.  

주변을 살피고 의식하는 습관을 들여라. 그리고 여러분의 프로젝트에 대해서도 똑같이하라.<sup style="color: #656D76">상황인식</sup>

<br>

## Tip 8. 품질을 요구 사항으로 만들어라. 
> 프로젝트의 진짜 품질 요구 사항을 결정하는 자리에 사용자를 참여시켜라.   

오늘의 훌륭한 소프트웨어는 많은 경우 환상에 불과한 내일의 완벽한 소프트웨어보다 낫다.  
사용자에게 뭔가 직접 만져볼 수 있는 것을 일찍 준다면, 피드백을 통해 종국에는 더 나은 해결책에 도달할 수 있을 것이다. 

<br>

## Tip 9. 지식 포트폴리오에 주기적으로 투자하라. 
> 학습을 습관화 하라.  
> 모든 지침 중에 제일 중요한 것은 가장 간단하게 실행할 수 있는 것이다. 

사고 간의 교접<sup style="color: #656D76">cross-pollination</sup>

<br>

## Tip 10. 읽고 듣는 것을 비판적으로 분석하라. 
> 벤더, 매채들의 야단법석, 도그마<sup style="color: #656D76">dogma</sup>에 흔들리지 말라. 여러분과 여러분 프로젝트의 관점에서 정보를 분석하라.  

상업주의의 힘을 절대 과소 평가하지 말라. 웹 검색 엔진의 첫 머리에 나온 결과라고 해서 그것이 최선이라는 의미는 아니다. 

##### 비판적 사고를 위한 질문
- 왜냐고 다섯 번 묻기<sub style="color: #656D76">Five Whys</sub>
- 누구에게 이익이 되나?
- 어떤 맥락인가?
- 언제 혹은 어디서 효과가 있을까?
- 왜 이것이 문제일까?

<br>

## Tip 11. 한국어든 영어든 하나의 프로그래밍 언어일 뿐이다.
> 한국어든 영어든 하나의 프로그래밍 언어인 것 처럼 다뤄라. 문서 작성도 코드를 작성하듯이 하라.  
> DRY 원칙, ETC<sub style="color: #656D76">Easier to Change</sub>, 자동화 등을 지켜라. 

<br>

## Tip 12. 무엇을 말하는가와 어떻게 말하는가 모두 중요하다.
> 효과적으로 전달하지 못하면 좋은 생각이 있어 봐야 소용없다.

소설가는 글쓰기 전에 책의 줄거리를 먼저 구성한다. 반면에 기술 문서를 작성하는 사람들은 종종 키보드 앞에 앉아서 "1. 서론"을 쳐 넣고는 무엇이건 머리에 떠오르는 대로 입력해 나가는 방식에 안주하고 만다. 

<br>

## Tip 13. 문서를 애초부터 포함하고, 나중에 집어 넣으려고 하지 말라. 
> 코드와 별개로 만든 문서가 정확하거나 최신 정보를 잘 반영하기는 힘들다.  

<br>

## Tip 14. 좋은 설계는 나쁜 설계보다 바꾸기 쉽다. 
> 어떤 게 잘 설계되었다는 건 그 물건이 사용하는 사람에게 적응하여 맞춰진다는 것이다.  
> 이 말을 코드에 적용해 보면, 잘 설계된 코드는 바뀜으로써 사용하느느 사람에게 맞춰져야한다.

바꾸기 더 쉽게<sub style="color: #656D76">Easier to Change.</sub> ETC. 이게 전부다.  
파일을 저장할 때마다 "ETC?"

<br>

## Tip 15. DRY: 반복하지 말라<sub style="color: #656D76">Don't Repeat Yourself</sub>
> 모든 지식은 시스템 내에서 단 한 번만, 애매하지 않고, 권위있게 표현되어야 한다. 

- 코드의 중복
- 문서화 중복
- 데이터의 DRY 위반
- 표현상의 중복
- 개발자 간의 중복

<br>

## Tip 16. 재사용하기 쉽게 만들어라. 
> 재사용하기 쉽다면 사람들이 재사용할 것이다. 재사용을 촉진하는 환경을 만들어라. 

여러분은 뭔가를 직접 만드는 것보다 기존의 것을 찾아내고 재사용하기 쉬운 환경을 조성해야 한다. 

<br>

## Tip 17. 관련 없는 것들 간에 서로 영향이 없도록 하라. 
> 컴포넌트를 자족적<sub style="color: #656D76">self-contained</sub>이고, 독립적이며 단 하나의 잘 정의된 목적만 갖도록 설계하라.  

응집<sub style="color: #656D76">cohension</sub>  

직교성의 장점
- 생산성 향상
- 리스크 감소 

<br>

## Tip 18. 최종 결정이란 없다. 
> 돌에 새겨진 것처럼 바뀌지 않는 결정이란 없다.  
> 모든 결정이 바닷가의 모래 위에 쓰인 글씨라고 생각하고 변화에 대비하라. 

<br>

## Tip 19. 유행을 좇지 말라.
> 닐 포드가 말했다. "어제의 모범 사례는 내일의 나쁜 사례가 된다."  
> 유행이 아니라 본질을 보고 아키텍처를 선택하라. 

roll with punch.

<br>

## Tip 20. 목표물을 찾기 위해 예광탄을 써라. 
> 예광탄은 일을 시도해 보고 그것들이 목표와 얼마나 가까운 곳에 떨어지는지 봄으로써 목표를 정확하게 맞히게 해 준다.

개발 우선순위를 정하라. 

예광탄은 지금 맞히고 있는 것이 무언인지 보여준다. 그러나 그것이 꼭 목표물이라는 보장은 없다.  
그럴 경우 목표물에 맞을 때까지 조준을 옮겨야 한다. 

<br>

## Tip 21. 프로토타이핑으로 학습하라.
> 프로토타이핑은 학습 경험이다.  
> 프로토타이핑의 가치는 생산한 코드에 있는 것이 아니라 이를 통해 배우는 교훈에 있다. 

- 주요 영역의 책임이 잘 정의되었고 적절한가?
- 주요 컴포넌트 간의 협력 관계가 잘 정의되었는가?
- 결합도는 최소화했는가?
- 중복이 발생할 만한 곳은 있는가?
- 정의된 인터페이스와 제약 사항은 수용할 만한가?
- **각 모듈이 실행 중에 필요한 데이터에 접근할 수 있는 경로를 갖고 있는가? 모듈에 데이터가 필요한 시점에 데이터 접근이 가능한가?**

<br>

## Tip 22. 문제 도메인에 가깝게 프로그래밍하라.
> 사용자의 언어를 사용해서 설계하고 코딩하라.  

**도메인 특화 언어**는 응용 프로그램 도메인 내의 특정 문제를 해결하도록 설계된, 제한된 범위의 컴퓨터 언어 유형

- DSL<sub style="color: #656D76">Domain-Specific Language</sub>   
    - 내부<sub style="color: #656D76">internal</sub> 도메인 언어
    - 외부<sub style="color: #656D76">external</sub> 도메인 언어 
- GSL<sub style="color: #656D76">General Purpose Language</sub>  

<br>

## Tip 23. 추정으로 놀람을 피하라. 
> 시작하기 전에 추정부터 하라. 잠재적인 문제점을 미리 발견할 수 있을 것이다.

**기본적인 추정의 비법**: 이미 그 일을 해본 사람에게 물어보라. 

**추정치는 어디서 나오는가?**
- 무엇을 묻고 있는지 이해하라
- 시스템의 모델을 만들어라
- 모델을 컴포넌트로 나눠라
- 각 매개변수에 값을 할당하라
- 답을 계산하라
- 여러분의 추정 실력을 기록하라   
    추정치가 틀렸다고 움츠리거나 도망가지 말라. 왜 틀렸는지 찾아라.  
    다음 추정치는 훨씬 나아질 것이다. 

<br>

## Tip 24. 코드와 함께 일정도 반복하여 조정하라. 
> 구현하면서 얻는 경험을 바탕으로 프로젝트의 소요 시간을 재조정하라. 

<br>

## Tip 25. 지식을 일반 텍스트로 저장하라.
> 일반 텍스트의 형식은 시간이 지나도 못 쓰게 되는 일이 없다.  
> 일반 텍스트 형식은 기존 도구를 사용할 수 있고 디버깅과 테스트를 쉽게 만든다. 

HTML, JSON, YAML 등은 모두 일반 텍스트다.  
HTTP, SMTP, IMAP 등 인터넷에서 사용되는 핵심 프로토콜도 대부분 일반 텍스트다. 

- 지원 중단에 대한 보험
- 기존 도구의 활용
- 더 쉬운 테스트 

<br>

## Tip 26. 명령어 셸의 힘을 사용하라. 
> 그래픽 사용자 인터페이스<sub style="color: #656D76">GUI</sub>로는 할 수 없는 일에 셸을 이용하라. 

모든 작업을 GUI로만 하면 여러분이 가진 환경의 능력을 전부 이용할 수 없다.  
일반적인 작업을 자동화할 수 없고, 가용한 도구의 역량을 온전히 사용할 수 없다.  

GUI의 장점은 WYSIWYG<sub style="color: #656D76">What You See Is What You Get,</sub>  
GUI의 단점은 WYSIAYG<sub style="color: #656D76">What You See Is All You Get,</sub>

<br>

## Tip 27. 에디터를 유창하게<sub style="color: #656D76">Fluency</sub>쓸 수 있게 하라. 
> 에디터는 가장 중요한 도구다. 필요한 일을 빠르고 정확하게 하는 방법을 익혀라. 

삶이 편해지는 방법은 꽤 간단하다.   
무언가 같은 일을 반복하는 것을 발견할 때 마다 이렇게 생각하는 습관을 들여라.   
`'분명 더 나은 방법이 있을 텐데.'` 그리고 더 나은 방법이 있는지 찾아보라.  

<br>

## Tip 28. 언제나 버전 관리 시스템을 사용하라. 
> 버전 관리 시스템은 여러분의 작업을 위한 타임머신이다. 언제라도 과거로 돌아갈 수 있게 해준다. 

<br>

## Tip 29. 비난 대신 문제를 해결하라. 
> 버그가 여러분의 잘못인지 다른 사람의 잘못인지는 중요치 않다.  
> 어쨌거나 그 버그는 여러분의 문제고, 고쳐야만 한다. 

디버깅의 심리 

<br>

## Tip 30. 당황하지 말라.
> 숨을 깊게 들이쉬고, 무엇이 버그의 문제인지 생각하라.  

디버깅을 할 때 근시안의 함정에 주의하라. 표면에만 보이는 증상만 고치려는 욕구를 이겨내라.   
실제 문제는 여러분 눈앞에 있는 것에서 몇 단계 떨어져있고, 또 다른 여러가지와 연관되어 있을 확률이 다분하다. 

<br>

## Tip 31. 코드를 고치기 전 실패하는 테스트부터.  
> 코드를 고치기 전에 버그 재현에 초점을 둔 테스트부터 만들어라. 

재현할 수 없다면 어떻게 그 버그를 고쳤다는 것을 확인할 수 있는가?  
우리는 '명령 하나'로 재현할 수 있기를 바란다. 

<br>

## Tip 32. 그놈의<sub style="color: #656D76">damn</sub> 오류 메세지 좀 읽어라. 
> 대부분의 예외는 무엇이 어디서 실패했는지 알려준다. 운이 좋으면 어떤 매개 변수가 쓰였는지도 알 수 있다. 

<br>

## Tip 33. "select"는 망가지지 않았다. 
> OS나 컴파일러의 버그를 만나는 일은 정말 드물다. 심지어 외부제품이나 라이브러리일지라도 드문 일이다.  
> 버그는 여러분의 애플리케이션에 있을 가능성이 가장 크다. 

OS나 컴파일러 혹은 외부 제품에 버그가 있을 수도 있다. 하지만 처음부터 그런 생각을 하지는 말라.  

설사 외부 제품에 문제가 있더라도 버그 리포트를 제출하기 전에 여러분의 코드에 문제가 없다는 것을 확인해야 하는 것은 마찬가지이다. 

<br>

## Tip 34. 가정하지 말라. 증명하라. 
> 진짜 데이터와 경계 조건을 사용하여 실제 환경에서 여러분의 가정을 증명하라. 

어떤 일이 일어났든지 간에 똑같은 일이 다시 발생하면 그 사실을 알 수 있도록 하라. 

<br>

## Tip 35. 텍스트 처리 언어를 익혀라. 
> 여러분은 매일 많은 시간을 텍스트와 씨름하며 보낸다. 왜 그중 일부를 컴퓨터에서 맡기지 않는가?

<br>

## Tip 36. 여러분은 완벽한 소프트웨어를 만들 수 없다. 
> 소프트웨어는 완벽할 수 없다.   
> 불가피한 오류로부터 여러분의 코드와 사용자를 보호하라. 

그래서 우리는 방어적으로 운전한다.  
우리는 문제가 생기기 전에 주의하고, 일어나지 않을 법한 일에 대비하며, 절대 자신을 모면하기 힘든 곤경으로 몰아넣지 않는다.  

이 이야기와 코딩에는 분명히 비슷한 면이 있다.  

어느 누구도, 심지어는 자기 자신도 완벽한 코드를 작성할 수 없음을 알기에  
자신의 실수에 대비한 방어책을 마련한다. 