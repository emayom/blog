// next-env.d.ts(gitignore 대상)는 next/image 정적 import의 모듈 타입을 제공하지만
// CI는 build 전 tsc를 실행해 해당 파일이 없다. next의 이미지 타입 선언을 직접
// 참조해 정적 이미지 import 타입을 보장한다.
/// <reference types="next/image-types/global" />
