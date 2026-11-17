(() => {
  const pace = document.querySelector('#rally-pace');
  const start = document.querySelector('#rally-start');
  const stop = document.querySelector('#rally-stop');
  const hit = document.querySelector('#rally-hit');
  const table = document.querySelector('#rally-table');
  const ball = document.querySelector('#rally-ball');
  const cue = document.querySelector('#rally-cue');
  const feedback = document.querySelector('#rally-feedback');
  const count = document.querySelector('#rally-count');
  const successes = document.querySelector('#rally-success');
  const best = document.querySelector('#rally-best');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const shotCount = 8;
  const presets = {
    steady: { durations: [1750], window: 200 },
    quick: { durations: [1220], window: 130 },
    varied: { durations: [1600, 1020, 1450, 1200, 1700, 1110, 1550, 1050], window: 140 }
  };

  let session;
  let frame;
  let nextShot;

  function announce(message) {
    if (cue.textContent !== message) cue.textContent = message;
  }

  function updateScore(attempts, success, longest) {
    count.textContent = `${attempts} / ${shotCount}구`;
    successes.textContent = `${success}회`;
    best.textContent = `${longest}회`;
  }

  function end(message, focusStart) {
    cancelAnimationFrame(frame);
    clearTimeout(nextShot);
    session = null;
    ball.hidden = true;
    table.dataset.rallyLive = 'false';
    pace.disabled = false;
    start.disabled = false;
    stop.disabled = true;
    hit.disabled = true;
    hit.removeAttribute('aria-disabled');
    announce('연습 종료');
    feedback.textContent = message;
    if (focusStart) start.focus();
  }

  function readBall(now) {
    const delta = now - session.arrival;
    if (delta > session.window) {
      record(null);
      return;
    }
    const position = 78 + 71 * delta / session.duration;
    ball.style.setProperty('--rally-ball', `${position}%`);
    const inZone = Math.abs(delta) <= session.window;
    table.dataset.rallyLive = String(inZone);
    announce(inZone ? '지금 받아치세요' : '공이 오는 중');
    frame = requestAnimationFrame(readBall);
  }

  function serve() {
    const durations = session.preset.durations;
    session.duration = durations[session.attempts % durations.length];
    session.window = session.preset.window;
    session.arrival = performance.now() + session.duration;
    table.style.setProperty('--rally-zone', `${71 * session.window / session.duration}%`);
    table.dataset.rallyStill = String(reducedMotion.matches);
    hit.removeAttribute('aria-disabled');
    ball.hidden = false;
    readBall(performance.now());
  }

  function record(delta) {
    cancelAnimationFrame(frame);
    session.attempts += 1;
    session.arrival = null;
    const success = delta !== null && Math.abs(delta) <= session.window;
    if (success) {
      session.success += 1;
      session.streak += 1;
      session.longest = Math.max(session.longest, session.streak);
    } else {
      session.streak = 0;
    }
    ball.hidden = true;
    table.dataset.rallyLive = 'false';
    updateScore(session.attempts, session.success, session.longest);

    let detail = '놓쳤어요. 공이 노란 구간에 있을 때 눌러 보세요.';
    if (delta !== null) {
      const difference = Math.round(Math.abs(delta));
      const direction = delta < 0 ? '빠름' : '늦음';
      const offset = difference === 0 ? '타격 구간의 중심' : `중심보다 ${difference}ms ${direction}`;
      detail = `${success ? '성공' : '실패'} · ${offset}`;
    }
    if (session.attempts === shotCount) {
      end(`${detail} / 세트 완료, ${session.success}구 성공. 최고 연속 ${session.longest}회.`, true);
      return;
    }
    feedback.textContent = `${session.attempts}구 결과. ${detail}`;
    hit.setAttribute('aria-disabled', 'true');
    announce('다음 공 준비');
    nextShot = setTimeout(serve, 800);
  }

  pace.disabled = false;
  start.disabled = false;
  start.addEventListener('click', () => {
    session = { preset: presets[pace.value], attempts: 0, success: 0, streak: 0, longest: 0 };
    pace.disabled = true;
    start.disabled = true;
    stop.disabled = false;
    hit.disabled = false;
    hit.focus();
    updateScore(0, 0, 0);
    feedback.textContent = '첫 공이 옵니다. 노란 구간까지 기다리세요.';
    serve();
  });
  hit.addEventListener('click', () => {
    if (session?.arrival != null) record(performance.now() - session.arrival);
  });
  hit.addEventListener('keydown', event => {
    if (event.repeat && (event.key === ' ' || event.key === 'Enter')) event.preventDefault();
  });
  stop.addEventListener('click', () => end('연습을 중단했습니다. 8구 시작으로 새 세트를 시작할 수 있습니다.', true));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && session) end('화면을 벗어나 연습을 중단했습니다. 돌아오면 새 세트를 시작할 수 있습니다.', false);
  });
})();
