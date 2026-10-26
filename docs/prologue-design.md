# SPP — Snap Ping Pong prologue

## Gameplay preview (2026-10-21)

The introduction renders the currently selected player character on a procedural tournament map. Its face and outfit colors are used directly; no external character art or video is embedded.

`prologue-match.js` renders a tournament-entry map: the selected player character travels from 스핀항 through 드라이브시 and 커트골 to 챔피언 광장. Four procedurally drawn town-logo badges mark the route. The counter is the current town, not a live ranked match.

The preview has its own canvas and temporary render state, restored in `finally`. It never starts a game or updates rankings, inventory, score, auth, or saves. Rendering of the covered main court is suspended while the dialog is open. Existing login/entry behavior is retained.

SPP, Snap Ping Pong, the headline, map overlay, chapter copy, footer and color palette use a consistent dark violet / lime treatment. The inline first-paint guard remains in place. Motion can be paused or replayed; hidden tabs stop animation. Reduced-motion users see a static map frame.

## Startup behavior

The map can start before the selected portrait loads; it uses the character's initial as a temporary fallback. A failed or slow portrait never blocks the prologue, its entry button, or the main page.

## References

- [web.dev — Animation and motion](https://web.dev/learn/accessibility/motion): reduced-motion and explicit pause controls.

These are movement and accessibility references, not copied assets. The demo is choreographed using game renderers rather than a recording or an autonomous competitive match.

## Verification

Run from the repository root with Playwright installed:

```sh
node tests/prologue-preview.cjs
```

`PLAYWRIGHT_MODULE` can point to an existing Playwright installation; `CHROME_PATH` optionally selects an installed browser. The smoke check covers desktop/mobile width, four town transitions, restored game state, no page errors, reduced motion and entering the main screen. It blocks external requests and does not test Google login or multiplayer.

## Town route

The route progresses through 스핀항, 드라이브시, 커트골 and 챔피언 광장. Each stop has a distinct procedural logo badge and the player avatar runs between them. The animation is visual only: no game, skill, inventory, ranking or save state changes occur.
