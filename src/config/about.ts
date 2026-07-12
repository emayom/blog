import type { ActivityEntry, EducationEntry, ExperienceEntry } from '@/types/about'

// 경험 — 여기만 편집하면 소개 페이지에 반영된다
export const experience: ExperienceEntry[] = [
  {
    period: '2025.06 ~',
    role: '프론트엔드 개발자',
    org: '위엠비',
    image: '/images/about/wemb.jpg',
  },
  {
    period: '2021. 10 ~ 2023. 11',
    role: '웹 개발자',
    org: '하람아이',
    image: '/images/about/haramai-v3.jpg',
  },
]

// 활동 — 부트캠프·멘토링·커뮤니티 등
export const activities: ActivityEntry[] = [
  {
    period: '2024. 03 ~ 2024. 09',
    title: 'Prography 9th',
    role: '프론트엔드 개발자',
    image: '/images/about/prography.jpg',
  },
]

// 교육 — 학력·부트캠프·멘토링
export const education: EducationEntry[] = [
  {
    period: '2023. 09 ~ 2024. 01',
    school: 'F-Lab',
    degree: '멘토링, 프론트엔드 개발',
    image: '/images/about/f-lab.png',
  },
  {
    period: '2021. 04 ~ 2021. 10',
    school: '한국소프트웨어인재개발원',
    degree: '부트캠프, 웹앱 개발',
  },
  {
    period: '2016. 03 ~ 2021. 02',
    school: '상명대학교(천안)',
    degree: '학사, 산업디자인',
    image: '/images/about/sangmyung.jpg',
  },
]
