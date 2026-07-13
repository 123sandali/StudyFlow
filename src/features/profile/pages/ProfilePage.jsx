import { useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import ProfileForm from '../components/ProfileForm';
import '../profile.css';

const DEFAULT_PROFILE = {
  id: 'local-user',
  displayName: 'Menura Basitha',
  email: '',
  university: 'University of Sri Jayewardenepura',
  programme: 'Computer Science',
  avatarUrl: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

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
  const [profile, setProfile] = useLocalStorage(
    'studyflow-profile',
    DEFAULT_PROFILE,
  );

  const [saved, setSaved] = useState(false);

  function handleSaveProfile(profileValues) {
    const now = new Date().toISOString();

    setProfile((currentProfile) => ({
      ...currentProfile,
      ...profileValues,
      id: currentProfile.id ?? 'local-user',
      createdAt: currentProfile.createdAt ?? now,
      updatedAt: now,
    }));

    setSaved(true);
  }

  return (
    <section className="profilePage">
      <div className="profileHero">
        <div className="profileAvatar">
          {getInitials(profile.displayName)}
        </div>

        <div className="profileHeroText">
          <h1 className="profileName">
            {profile.displayName || 'StudyFlow user'}
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
          Profile saved successfully in localStorage.
        </div>
      )}

      <div className="profileContent">
        <ProfileForm
          initialValues={profile}
          onSubmit={handleSaveProfile}
        />
      </div>
    </section>
  );
}