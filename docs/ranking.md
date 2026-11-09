# 랭킹과 저장

[README로 돌아가기](../README.md)

## 랭킹 메뉴

| 항목 | 표시되는 내용 |
|---|---|
| PvP 레이팅 | 대인전 레이팅과 전적 |
| 랭크전 | AI 랭크전 점수·부수·전적 |
| 레벨 | 누적 경험치와 레벨 |
| 출석왕 | 출석일수와 가장 많이 플레이한 캐릭터 |
| 플레이 캐릭터 순위 | 캐릭터별 판수, 라켓과 러버 정보 |
| 대회 진행 | 지역 대회 우승 수·최고 진출 라운드·승수 |
| AI전 승리 | 난이도, 승점 차, 투터치, 무실점, 연승을 반영한 점수와 연승 정보 |
| 세계제패 | 이름, 정복한 나라 목록, 제패 수/22, 기록 날짜·시간 |
| 보스 클리어 | 보스와 우주전쟁 시리즈 클리어 기록, 날짜·시간. 항목 선택 메뉴로 필터링 |

생존 랠리와 스테이지 돌파의 전체 기록은 해당 모드의 랭킹 화면에서 확인합니다. 네트워크나 Firestore 읽기에 실패하면 내 기기 기록이 표시될 수 있습니다.

## Firebase 기록

| 컬렉션 | 용도 |
|---|---|
| `progress`, `settings` | 개인 진행도와 설정 |
| `character_achievements` | 캐릭터 전용 업적 누적 횟수와 달성 상태 |
| `achievements` | UID별 전체 업적: 유저 이름, 업적 종류, 조건, 진행 횟수·목표, 달성·보상 수령 상태 |
| `attendance_records`, `attendance_leaderboard` | 개인 출석 기록과 공개 출석왕 순위 |
| `trophies` | 보유 지역 트로피 정보 |
| `world_conquest`, `tournament_progress` | 세계제패와 지역 대회 공개 진행도 |
| `wins`, `boss`, `arank`, `players`, `levels` | AI 승리, 보스, 랭크전, PvP, 레벨 |
| `character_usage`, `presence` | 캐릭터별 사용 기록과 최근 접속 상태 |
| `rally_survival`, `rally_stage` | 생존 랠리와 스테이지 돌파 기록 |

Google 로그인 후 계정 기록과 전체 랭킹이 동기화됩니다. 혼자 하는 경기의 중간 점수 이어하기는 기기에 저장됩니다. Firestore 규칙은 저장소의 [`firestore.rules`](../firestore.rules)에서 확인하세요.
