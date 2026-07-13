import { useSettings } from '../../../context/SettingsContext';
import '../settings.css';

export default function SettingsPage() {
  const {
    theme,
    defaultFocusMinutes,
    setTheme,
    setDefaultFocusMinutes,
  } = useSettings();

  function handleFocusDurationChange(event) {
    setDefaultFocusMinutes(event.target.value);
  }

  return (
    <section className="settingsPage">
      <div className="settingsPageHeader">
        <h1>Settings</h1>

        <p>
          Personalize your StudyFlow experience. These
          preferences are stored in the current browser.
        </p>
      </div>

      <div className="settingsGrid">
        <article className="settingsCard">
          <div className="settingsCardHeader">
            <div>
              <h2>Appearance</h2>

              <p>
                Select the visual theme used throughout the
                application.
              </p>
            </div>

            <span className="settingsValueBadge">
              {theme}
            </span>
          </div>

          <div
            className="settingsChoiceGroup"
            role="group"
            aria-label="Application theme"
          >
            <button
              className={`settingsChoiceButton ${
                theme === 'light'
                  ? 'settingsChoiceButtonActive'
                  : ''
              }`}
              type="button"
              onClick={() => setTheme('light')}
              aria-pressed={theme === 'light'}
            >
              Light
            </button>

            <button
              className={`settingsChoiceButton ${
                theme === 'dark'
                  ? 'settingsChoiceButtonActive'
                  : ''
              }`}
              type="button"
              onClick={() => setTheme('dark')}
              aria-pressed={theme === 'dark'}
            >
              Dark
            </button>
          </div>
        </article>

        <article className="settingsCard">
          <div className="settingsCardHeader">
            <div>
              <h2>Focus timer</h2>

              <p>
                Select the default duration for a new focus
                session.
              </p>
            </div>

            <span className="settingsValueBadge">
              {defaultFocusMinutes} min
            </span>
          </div>

          <div className="settingsField">
            <label htmlFor="default-focus-minutes">
              Default duration
            </label>

            <select
              id="default-focus-minutes"
              className="settingsSelect"
              value={defaultFocusMinutes}
              onChange={handleFocusDurationChange}
            >
              <option value="15">15 minutes</option>
              <option value="25">25 minutes</option>
              <option value="45">45 minutes</option>
              <option value="50">50 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>
        </article>

        <article className="settingsCard">
          <div className="settingsCardHeader">
            <div>
              <h2>Phase 1 storage</h2>

              <p>
                Settings currently belong to this browser
                profile. Firebase synchronization will be
                introduced during Phase 2.
              </p>
            </div>
          </div>

          <div
            className="settingsInformation"
            role="note"
          >
            Changing devices or clearing browser storage will
            remove Phase 1 preferences.
          </div>
        </article>
      </div>
    </section>
  );
}