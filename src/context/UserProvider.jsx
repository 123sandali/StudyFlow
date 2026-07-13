import { UserContext } from './UserContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DEFAULT_USER = {
  id: 'local-user',
  displayName: 'Menura Basitha',
  email: '',
  university: 'University of Sri Jayewardenepura',
  programme: 'Computer Science',
};

export default function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage(
    'studyflow-profile',
    DEFAULT_USER,
  );

  function updateUser(changes) {
    setUser((currentUser) => ({
      ...currentUser,
      ...changes,
      updatedAt: new Date().toISOString(),
    }));
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
}