import { useEffect, useState } from 'react';
import { useFocusTimer } from '../../../hooks/useFocusTimer';
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

  const { seconds, running, toggle, reset } = useFocusTimer(0);

  const displayName = name.trim() || 'Student';

  useEffect(() => {
    document.title = running
      ? `StudyFlow — ${formatTime(seconds)}`
      : 'StudyFlow';
  }, [running, seconds]);

  function handleCompleteSession() {
    setCount((currentCount) => currentCount + 1);
    reset();
  }

  return (
    <div className="focusPage">
      <section className="focusHero card">
        <div>
          <p className="focusLabel">Focus timer</p>
          <h1 className="focusTitle">Stay focused, {displayName}</h1>
          <p className="focusDescription">
            Timer state now comes from the useFocusTimer custom hook. The page
            only renders UI and handles page-specific actions.
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
              onClick={toggle}
            >
              {running ? 'Pause' : 'Start'}
            </button>

            <button
              className="focusButton focusButtonSecondary"
              type="button"
              onClick={reset}
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
            <p className="focusInputLabel">Custom hook responsibility</p>

            <ul className="focusList">
              <li>useFocusTimer owns timer seconds.</li>
              <li>useFocusTimer owns running/paused state.</li>
              <li>useFocusTimer cleans the interval.</li>
              <li>FocusPage only renders the feature UI.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}