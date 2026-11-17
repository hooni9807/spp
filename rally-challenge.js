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
  const review = document.querySelector('#rally-review');
  const summary = document.querySelector('#rally-summary');
  const recommendation = document.querySelector('#rally-next');
  const results = document.querySelector('#rally-results');
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

  function showReview() {
    const inputs = session.results.filter(result => result.delta !== null);
    const early = inputs.filter(result => !result.success && result.delta < 0).length;
    const late = inputs.filter(result => !result.success && result.delta >= 0).length;
    const missed = shotCount - inputs.length;
    const average = inputs.length
      ? Math.round(inputs.reduce((total, result) => total + Math.abs(result.delta), 0) / inputs.length)
      : null;
    summary.textContent = `빠른 실패 ${early}회 · 늦은 실패 ${late}회 · 놓친 공 ${missed}구.` +
      (average === null ? '' : ` 입력한 ${inputs.length}구의 중심과 차이는 평균 ${average}ms입니다.`);

    let next = '같은 속도로 한 세트를 더 해보세요. 공별 결과에서 실패한 구간을 보고 다음 입력 박자를 맞춰 보세요.';
    if (missed >= 2) {
      next = '놓친 공이 두 개 이상입니다. 일정한 공을 고르고 버튼에 손을 준비한 채, 공이 노란 구간에 도착할 때 한 번 누르는 연습부터 해보세요.';
    } else if (early > late) {
      next = '구간에 도착하기 전에 누른 실패가 더 많습니다. 같은 속도로 한 세트를 더 하면서 노란 구간에 들어올 때까지 기다려 보세요.';
    } else if (late > early) {
      next = '구간을 지난 뒤 누른 실패가 더 많습니다. 같은 속도에서 버튼에 손을 미리 준비하고 공이 구간에 들어오는 순간 눌러 보세요.';
    } else if (session.success >= 6) {
      next = {
        steady: '여섯 공 이상 성공했습니다. 다음에는 빠른 공을 골라 줄어든 타격 구간에서도 같은 성공 횟수를 이어가 보세요.',
        quick: '빠른 공도 여섯 개 이상 성공했습니다. 박자가 바뀌는 공을 골라 이전 공의 리듬보다 새 공의 속도를 읽어 보세요.',
        varied: '박자가 바뀌어도 여섯 공 이상 성공했습니다. 아래 경기 화면 공략에서 타이밍 원을 확인하고 스윙 방향까지 함께 연습해 보세요.'
      }[session.pace];
    }
    recommendation.textContent = next;
    results.replaceChildren(...session.results.map((result, index) => {
      const row = document.createElement('tr');
      const number = document.createElement('th');
      number.scope = 'row';
      number.textContent = `${index + 1}구`;
      row.append(number);
      let status = '놓침';
      let timing = '입력 없음';
      if (result.delta !== null) {
        status = result.success ? '성공' : '실패';
        const difference = Math.round(Math.abs(result.delta));
        const direction = result.delta < 0 ? '빠름' : '늦음';
        timing = difference === 0 ? '중심에 입력' : `${difference}ms ${direction}`;
      }
      for (const value of [status, timing]) {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      }
      return row;
    }));
    review.hidden = false;
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
    session.results.push({ delta, success });
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
      showReview();
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
    session = { pace: pace.value, preset: presets[pace.value], attempts: 0, success: 0, streak: 0, longest: 0, results: [] };
    review.hidden = true;
    results.replaceChildren();
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
