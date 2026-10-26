# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- Primary: members of the owner's table-tennis club (동호회). Many characters are real club members' photo faces, so players recognise each other in the game.
- Also: anyone who receives the link (KakaoTalk shares) and plays as a newcomer.
- Device: mostly phones. Players open a KakaoTalk link and play with finger drag swings; PC with a mouse is secondary.

## Product Purpose
SPP — Snap Ping Pong: a browser table-tennis game where you swing by dragging. Success is a quick, satisfying rally on a phone, plus long-term progression (levels, unlocks, rankings) that keeps club members coming back and competing with each other.

## Positioning
A club in-joke turned into a real game: real club members as playable characters with their own quirks, PERFECT lines and traits, on top of a timing-based swing system (PERFECT / GREAT / GOOD, spin families, multi-touch balls, situational 필살기).

## Operating Context
- Entry: KakaoTalk link → prologue → Google login (required) → main screen. KakaoTalk / LINE in-app browsers are redirected to the system browser for Google login.
- Main loop: pick character → skill tree → 필살기 loadout → mode (AI 대전 by difficulty, 랭크전, 보스전, 복식, 3인, 연습, 온라인 1:1/복식/3인) → match → result popup (XP bar, retry / difficulty / mode / character).
- Progression: levels (tiered XP curve), character unlocks, skill tree (30 points per character), 56 필살기 in 8 tiers, 칭호 (achievements), quests, outfit customisation, unlock notes.
- Social: Firebase rankings, friends, online rooms, chat, offline messages.

## Capabilities and Constraints
- Single static `index.html` (plus prologue.js/css, face PNGs, sounds) on GitHub Pages; canvas game rendering; no build step.
- Firebase must stay on the free Spark plan; Firestore rules are published manually by the owner.
- Copyright-safe assets only: no copied art from other games/anime; real-person photos are face crops the owner supplies with consent.
- Korean-language UI.

## Brand Commitments
- Name: SPP — Snap Ping Pong (formerly MYS / SPIN LAB).
- Voice: playful Korean club banter (character PERFECT lines, toasts).
- Owner preference: no emoji in 필살기 names and skill-tree labels.
- Visual direction (chosen 2026-10-26): the mobile sports-game category standard, executed at full fidelity; quality bar = eFootball / FIFA Mobile.

## Evidence on Hand
- Character face photos in repo root (`*-face.png`), prologue art, sounds/.
- No testimonials, metrics or press exist; do not invent any.

## Product Principles
1. Phone first: everything reachable and readable with one thumb mid-match.
2. The rally is the hero; UI chrome never blocks the swing.
3. Club members should recognise themselves and each other.
4. Progression feels earned and visible (unlocks, tiers, notes).

## Accessibility & Inclusion
- Small phone screens in portrait and landscape; touch targets sized for thumbs.
