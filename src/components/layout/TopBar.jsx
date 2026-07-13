import { useSettings } from '../../context/SettingsContext';
import { useUser } from '../../hooks/useUser';

function getInitials(name) {
  if (!name) {
    return 'SF';
  }

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export default function TopBar({ title }) {
  const { user } = useUser();

  const {
    theme,
    toggleTheme,
  } = useSettings();

  return (
    <div className="topBarInner">
      <div className="topBarPageInfo">
        <h1 className="topBarTitle">{title}</h1>

        <p className="topBarSubtitle">
          Organize your learning and stay focused.
        </p>
      </div>

      <div className="topBarActions">
        <button
          className="themeButton"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${
            theme === 'light' ? 'dark' : 'light'
          } mode`}
        >
          {theme === 'light'
            ? 'Dark mode'
            : 'Light mode'}
        </button>

        <div className="topBarProfile">
          <div
            className="topBarAvatar"
            aria-hidden="true"
          >
            {getInitials(user.displayName)}
          </div>

          <div className="topBarUserInfo">
            <strong>
              {user.displayName || 'StudyFlow User'}
            </strong>

            <span>
              {user.programme || 'Local profile'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}