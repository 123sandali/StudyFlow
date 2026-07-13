import { useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import ProfileForm from '../components/ProfileForm';
import '../profile.css';

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

export default function ProfilePage() {
  const { user, updateUser } = useUser();

  const [saved, setSaved] = useState(false);

  function handleSaveProfile(profileValues) {
    updateUser(profileValues);
    setSaved(true);
  }

  return (
    <section className="profilePage">
      <div className="profileHero">
        <div className="profileAvatar">
          {getInitials(user.displayName)}
        </div>

        <div className="profileHeroText">
          <h1 className="profileName">
            {user.displayName || 'StudyFlow user'}
          </h1>

          <p className="profileMeta">
            Local profile · Phase 1
          </p>
        </div>
      </div>

      {saved && (
        <div
          className="profileSavedMessage"
          role="status"
        >
          Profile saved successfully.
        </div>
      )}

      <div className="profileContent">
        <ProfileForm
          key={user.updatedAt}
          initialValues={user}
          onSubmit={handleSaveProfile}
        />
      </div>
    </section>
  );
}