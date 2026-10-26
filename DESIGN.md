---
name: SPP — Snap Ping Pong
description: Night-stadium broadcast UI for a phone-first table-tennis game, in the eFootball / FIFA Mobile category standard.
colors:
  stadium-void: "#05091a"
  stadium-navy: "#0b1226"
  panel-raised: "#111a35"
  panel-lifted: "#18244a"
  hairline: "rgba(150,180,255,.14)"
  hairline-strong: "rgba(150,180,255,.24)"
  ink: "#eef3ff"
  muted: "#93a4cc"
  electric-cyan: "#14e0ff"
  cyan-glow: "#7df0ff"
  cyan-ink: "#00131c"
  trophy-gold: "#ffc94a"
  gold-light: "#ffe39a"
  gold-ink: "#2a1700"
  opponent-red: "#ff3b5c"
  tier-bronze: "#d08a4e"
  tier-silver: "#c9d3e6"
  tier-gold: "#ffc94a"
  tier-special: "#ff5c8a"
  tier-default: "#9aa7c7"
typography:
  display:
    fontFamily: "'Barlow Condensed', 'Pretendard Variable', Pretendard, sans-serif"
    fontSize: "34px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: ".01em"
  score:
    fontFamily: "'Barlow Condensed', 'Pretendard Variable', Pretendard, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    letterSpacing: "0"
  headline:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
    fontWeight: 800
    letterSpacing: "-.02em"
  body:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
    fontWeight: 400
    letterSpacing: "-.01em"
  label:
    fontFamily: "'Barlow Condensed', 'Pretendard Variable', Pretendard, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: ".06em"
rounded:
  sm: "8px"
  md: "10px"
  card: "12px"
  panel: "14px"
  dialog: "16px"
  pill: "999px"
  chamfer: "0"
components:
  button-primary:
    backgroundColor: "{colors.electric-cyan}"
    textColor: "{colors.cyan-ink}"
    rounded: "{rounded.chamfer}"
    padding: "0 20px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.cyan-glow}"
  button-secondary:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  button-secondary-hover:
    backgroundColor: "{colors.panel-lifted}"
  button-reward:
    backgroundColor: "{colors.trophy-gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.chamfer}"
  lobby-tile:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 12px 0 40px"
    height: "48px"
  player-card:
    backgroundColor: "{colors.stadium-navy}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "10px 4px 8px"
    height: "96px"
  player-card-selected:
    backgroundColor: "#3a2c0a"
    textColor: "{colors.gold-light}"
  dialog:
    backgroundColor: "{colors.stadium-navy}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
  segmented:
    backgroundColor: "{colors.stadium-navy}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
  segmented-active:
    backgroundColor: "{colors.panel-lifted}"
    textColor: "#ffffff"
  input:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  header-pill:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
---

# Design System: SPP — Snap Ping Pong

## Overview

**Creative North Star: "The Night-Match Broadcast"**

SPP dresses a club table-tennis game as a top-shelf mobile sports title under stadium lights. Everything sits on a deep navy ground lit from above by a soft blue floodlight wash; panels step up in two raised tones and are separated by cool hairlines, never by heavy borders. Numbers are the stars: scores, levels and results set in condensed italic sports numerals, the way a broadcast scorebug reads.

Colour is a strict signal system. Electric cyan means "act" or "live"; gold means "earned" (levels, XP, rewards, tiers, the selected card); red means "opponent or danger". The lobby reads as a game menu (tiles with drawn line icons, a gold-lit player card grid, one full-width cyan chamfered start bar in the thumb zone), not a form.

**Key Characteristics:**
- Night-stadium navy ground with a fixed radial floodlight gradient.
- Two-step raised panels plus cool hairlines for depth.
- One action colour (cyan), one reward colour (gold), one danger colour (red).
- Condensed italic numerals (Barlow Condensed) for every number that matters; Pretendard for Korean.
- A single 10px chamfer on the primary and reward actions.
- Player cards framed bronze / silver / gold / special by difficulty.

## Colors

A dark, cool, two-accent signal palette: navy for space, cyan for action, gold for reward.

### Primary
- **Electric Cyan** (`--cyan`): the only action and live-state colour. Primary buttons, focus rings, text selection, active segmented underline, ready 필살기 chip, lobby tile icons, active skill tabs.
- **Cyan Glow** (`--cyan2`): hover state of cyan actions; scorebug mode label.
- **Cyan Ink** (`--cyan-ink`): text on cyan; never use white on cyan.

### Secondary
- **Trophy Gold** (`--gold`) and **Gold Light** (`--gold2`): levels, XP bars, skill points, reward tiles (강화, 대회, 추천 배치), win titles, the selected player card. Text on solid gold is **Gold Ink** (#2a1700).

### Tertiary
- **Opponent Red** (`--red`): opponent and danger only. Declared as a token; sparing by design.

### Neutral
- **Stadium Void** (`--bg0`): page ground under the floodlight gradient.
- **Stadium Navy** (`--bg1`): arena frame, side panels, list rows.
- **Panel Raised** (`--bg2`): secondary buttons, inputs, header pills, close buttons.
- **Panel Lifted** (`--bg3`): hover and active segmented state, scorebug avatars.
- **Hairline** (`--line`) / **Hairline Strong** (`--line2`): all separators and container borders.
- **Ink** (`--ink`) and **Muted** (`--muted`): body text and secondary text. Dialog body copy uses #a9b8dc; placeholders #7d8fb8.

### Named Rules
**The Signal Rule.** Cyan = act/live, gold = earned, red = opponent/danger. A colour never borrows another's meaning; a decorative cyan or gold is a bug.

**The One Bar Rule.** Each view has exactly one solid cyan chamfered bar: the primary action (경기 시작, 다시 하기, 이어하기).

## Typography

**Display / Numeral Font:** Barlow Condensed (600/700/800, italic 700/800), fallback Pretendard
**Body Font:** Pretendard Variable (with Pretendard, -apple-system, Apple SD Gothic Neo, Malgun Gothic)

**Character:** A broadcast pairing: condensed italic numerals give speed and scoreboard authority; Pretendard keeps Korean headings heavy and body text clean.

### Hierarchy
- **Result Score** (Barlow 800 italic, 56px): final score in the result dialog. Result title 44px uppercase.
- **Display** (Barlow 800 italic, 34px, line-height 1, uppercase): lobby card title.
- **Score** (Barlow 800 italic, 30px): scorebug points. Brand wordmark 26px; level label 24px gold.
- **Headline** (Pretendard 800, -.02em): panel, section and dialog headings, white.
- **Body** (Pretendard 400, -.01em): ink on navy; muted for secondary.
- **Label** (Barlow 600–700, 11–16px, .02–.06em): XP readouts, mode label, tier name on cards, skill points, 필살기 gauge chip (15px).

### Named Rules
**The Numerals Rule.** Any score, level, rating, XP or count is set in Barlow Condensed; Korean words never are.

## Layout

Phone portrait first (375–430px); PC secondary. Slim header (brand left, settings + sound right, 44px round settings button). The arena frame holds a broadcast scorebug top bar, the court, and a bottom bar. The lobby overlay stacks: level strip with XP bar, 2x2 menu tiles (48px min), gold enhance tile, player card grid (8px gap), then the full-width primary bar (56px) in the thumb zone. Touch targets are 44–56px. Spacing is compact: 8–12px gaps inside the lobby.

## Elevation & Depth

Hybrid: tonal layering does most of the work (void → navy → raised → lifted, with hairlines), and soft, dark ambient shadows lift floating surfaces. Coloured glows are reserved for signal colours.

### Shadow Vocabulary
- **Arena** (`0 18px 50px rgba(0,0,0,.45)`): the court frame.
- **Lobby card** (`0 24px 60px rgba(0,0,0,.55)`): start overlay card.
- **Dialog** (`0 30px 80px rgba(0,0,0,.6)`): every modal; backdrop rgba(2,5,14,.78) with 3px blur.
- **Cyan lift** (`0 10px 28px rgba(20,224,255,.28)`): primary bar only.
- **Gold lit** (`0 0 0 3px rgba(255,201,74,.18), 0 10px 24px rgba(255,201,74,.18)`): selected player card; XP fill glow `0 0 10px rgba(255,201,74,.45)`.

### Named Rules
**The Glow Is A Signal Rule.** Only cyan actions and gold rewards may glow. Neutral surfaces use dark ambient shadows or none.

## Shapes

Two shape families. Containers use soft radii: 8px (segmented inner), 10px (buttons, inputs, tiles), 12px (player cards), 14px (panels, arena), 16px (dialogs, lobby card), pill for header pills, toasts, badges and bars. Primary and reward actions drop the radius and take a single **10px chamfer** (`--chamfer`: top-left and bottom-right corners cut). Avatars are circles with a 2px gap ring and a 1px tier/hairline ring.

**The Cut Corner Rule.** The chamfer marks a commitment action (play, retry, reward). Never chamfer neutral buttons, panels or cards.

## Components

### Header
Transparent-to-navy gradient bar with a hairline bottom. Brand in Barlow 800 italic 26px white beside a small ball mark; edition label Pretendard 600 11px tracked .14em muted. Right side: 44px round settings button (drawn gear icon, ink) and a pill sound toggle on Panel Raised. Hover borders go cyan.

### Scorebug
Arena top bar on a #101a3a → #0a1128 gradient with a hairline. Mode label Barlow 700 13px cyan glow; points Barlow 800 italic 30px white; names Pretendard 700 11px #c9d4f2; separators #4d5f8f. Avatars on Panel Lifted with a navy gap ring and hairline ring.

### Lobby Tiles
48px min, left-aligned text with a 20px drawn line icon (SVG mask) at 12px left, tinted cyan; titles/trophy tiles tint gold. Background #141f40 → #0f1733, hairline-strong border, 10px radius; hover lifts to Panel Lifted with a cyan-tinted border; active nudges 1px down. Count badges are cyan pills with cyan ink. The enhance tile is the gold reward tile (brown-gold gradient, gold border, gold-light text).

### Buttons
- **Primary:** solid cyan, cyan ink, 900 weight 19px, chamfer, 56px, cyan lift shadow; hover Cyan Glow. Trailing numeral in Barlow italic floats right.
- **Secondary:** Panel Raised, ink, hairline-strong border, 10px radius, 800 weight; hover Panel Lifted. Outline variant (mode settings) is transparent with a drawn chevron.
- **Reward:** solid gold (or #ffd76a → #f0a92a gradient for 대회), gold ink, chamfer, no radius.

### Player Cards
Each card carries a tier pair `--t` / `--t2` from `data-tier`: 쉬움 bronze (#d08a4e / #7a4a22), 보통 silver (#c9d3e6 / #6e7b96), 어려움 gold (#ffc94a / #a8781a), 매우 어려움 special (#ff5c8a / #7b2bd6); default #9aa7c7 / #5b6789. Tier tints the top-down gradient (22%), the border (55%), a 3px top foil strip, the avatar ring and the Barlow tier label. 12px radius, 96px min height. Selected (`aria-checked=true`): gold frame 2px, dark gold gradient, gold-lit shadow, gold-light name. Locked: opacity .6, desaturated, tier colour still visible.

### Dialogs
All modals share one shell: #0e1733 → #090f24 gradient, hairline-strong border, 16px radius, dialog shadow, blurred dark backdrop. Headings white 800; body #a9b8dc. Close button on Panel Raised, turns cyan on hover. Result dialog: gold title on win, #c9d4f2 on loss, drawn trophy/ring emblem, gold XP bar, retry as the cyan chamfer bar.

### Segmented Controls & Tabs
Track on #0a1128 with hairline border, 10px; items #9fb0d6 700 with 8px radius. Active item: Panel Lifted, white, 2px inset cyan underline. Skill tabs active go solid cyan; 필살기 tabs active go solid gold.

### Inputs
Panel Raised, ink, hairline-strong border, 10px radius, placeholder #7d8fb8.

### Focus, Selection, Scrollbar
Focus: 2px solid cyan outline, 3px offset, on buttons, selects, inputs and links. Selection: cyan background, cyan ink. Scrollbar: thin, thumb #2a3a6a, 8px radius, transparent track.

## Do's and Don'ts

### Do:
- **Do** use cyan only for actions and live state, gold only for earned things, red only for opponent/danger.
- **Do** set every number in Barlow Condensed italic 800 at scoreboard sizes.
- **Do** give each view one cyan chamfered primary bar in the thumb zone.
- **Do** frame player cards by `data-tier` using the tier pairs; light the selected card gold.
- **Do** draw icons as inline SVG line masks tinted with a signal colour.

### Don't:
- **Don't** use emoji as icons or in 필살기 / skill-tree names.
- **Don't** return to purple glow cards; neutral surfaces get dark ambient shadows only.
- **Don't** chamfer neutral buttons, panels or cards.
- **Don't** put white text on cyan or gold; use cyan ink / gold ink.
