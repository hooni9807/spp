---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface brief: SPP game UI (index.html)

Scope: whole web game UI on GitHub Pages: header, main start overlay, in-game HUD, side settings panel, techniques/ranking sections, every dialog. Mode: Experience (the game leads), dialogs operate inside it. Phone first (375-430 wide portrait), PC secondary.
Audience: club members (photo-face characters) and link visitors from KakaoTalk.
Unresolved: none blocking; prologue/login screen (prologue.css) is in scope as the entry.

## Direction contract

THESIS: SPP looks like a top-shelf mobile football title (eFootball / FIFA Mobile) pointed at table tennis: broadcast-grade dark stadium UI, player cards with tier frames, condensed sports numerals. It refuses the current purple-glow card soup and emoji-as-icon buttons.

OWN-WORLD: Night-stadium navy ground (#070b18 to #0d1430), raised panels in two steps, hairline cool lines. One action colour: electric cyan (#14e0ff) for primary actions and live state; gold (#ffc94a) only for rewards, levels, tiers; red (#ff3b5c) only for opponent / danger. Condensed italic sports numerals (Barlow Condensed) for scores, levels, ratings; Pretendard heavy for Korean headings, Pretendard regular for body. Angled cut corners (one 10px chamfer) on panels and primary buttons; character picks are player cards with bronze/silver/gold frames by difficulty.

STORY: Within one viewport a player sees their character card, level, and a single unmistakable 경기 시작 action; menus (스킬트리·필살기, 퀘스트, 칭호, 커스터마이징, 강화) read as a game lobby, not a form.

FIRST VIEWPORT: Phone portrait: slim top bar (SPP mark left, sound right). Court stage below with the start overlay as a lobby: level strip with XP bar at top, 2x2 menu tiles, enhance tile, then a horizontally scannable grid of player cards; the selected card gold-lit. Primary 경기 시작 sits in the overlay's thumb zone as a full-width cyan chamfered bar.

FORM: Canon (category standard, user-chosen), quality bar eFootball / FIFA Mobile. seed:fe79b0fe62a5bf09

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
