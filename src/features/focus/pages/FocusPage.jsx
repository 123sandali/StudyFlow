import { useEffect, useState } from 'react';
import './focus.css';

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
}

export default function FocusPage() {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const displayName = name.trim() || 'Student';

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    document.title = running
      ? `StudyFlow — ${formatTime(seconds)}`
      : 'StudyFlow';
  }, [running, seconds]);

  function handleStartPause() {
    setRunning((currentRunning) => !currentRunning);
  }

  function handleResetTimer() {
    setRunning(false);
    setSeconds(0);
  }

  function handleCompleteSession() {
    setCount((currentCount) => currentCount + 1);
    setRunning(false);
    setSeconds(0);
  }

  return (
    <div className="focusPage">
      <section className="focusHero card">
        <div>
          <p className="focusLabel">Focus timer</p>
          <h1 className="focusTitle">Stay focused, {displayName}</h1>
          <p className="focusDescription">
            This page uses useState for local state and useEffect for timer
            side effects, cleanup, and document title updates.
          </p>
        </div>

        <div className="focusCounterBox">
          <span className="focusCounterValue">{count}</span>
          <span className="focusCounterText">completed sessions</span>
        </div>
      </section>

      <section className="focusTimerLayout">
        <div className="focusTimerCard card">
          <p className="focusTimerLabel">
            {running ? 'Timer running' : 'Timer paused'}
          </p>

          <div className="focusTimerValue">{formatTime(seconds)}</div>

          <div className="focusTimerActions">
            <button
              className="focusButton focusButtonPrimary"
              type="button"
              onClick={handleStartPause}
            >
              {running ? 'Pause' : 'Start'}
            </button>

            <button
              className="focusButton focusButtonSecondary"
              type="button"
              onClick={handleResetTimer}
            >
              Reset
            </button>

            <button
              className="focusButton focusButtonComplete"
              type="button"
              onClick={handleCompleteSession}
            >
              Complete session
            </button>
          </div>
        </div>

        <div className="focusSidePanel">
          <div className="focusCard card">
            <label className="focusInputLabel" htmlFor="studentName">
              Your name
            </label>

            <input
              id="studentName"
              className="focusInput"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: Menura"
            />

            <p className="focusHint">
              Current value from state:{' '}
              <strong>{name.trim() || 'No name entered yet'}</strong>
            </p>
          </div>

          <div className="focusCard card">
            <p className="focusInputLabel">What to observe</p>

            <ul className="focusList">
              <li>Start the timer and watch seconds increase.</li>
              <li>Check browser tab title while timer is running.</li>
              <li>Pause and confirm timer stops.</li>
              <li>Reset and confirm seconds return to 00:00.</li>
              <li>StrictMode should not make the timer jump by 2.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}