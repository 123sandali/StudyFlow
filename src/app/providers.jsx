import { SettingsProvider } from '../context/SettingsContext';
import UserProvider from '../context/UserProvider';

export default function AppProviders({ children }) {
  return (
    <SettingsProvider>
      <UserProvider>{children}</UserProvider>
    </SettingsProvider>
  );
}