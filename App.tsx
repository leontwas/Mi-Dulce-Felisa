import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import 'react-native-gesture-handler';

// This is the entry point for the app
export default function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);