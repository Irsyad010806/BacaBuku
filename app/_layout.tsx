import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' }, // header putih
          headerTintColor: '#000',                  // icon panah & judul hitam
          headerTitleStyle: { color: '#000' },      // judul hitam
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="SMK10" options={{ title: 'SMK KELAS 10' }} />
        <Stack.Screen name="SMK11" options={{ title: 'SMK KELAS 11' }} />
        <Stack.Screen name="SMK12" options={{ title: 'SMK KELAS 12' }} />
        <Stack.Screen name="SMA10" options={{ title: 'SMA KELAS 10' }} />
        <Stack.Screen name="SMA11" options={{ title: 'SMA KELAS 11' }} />
        <Stack.Screen name="SMA12" options={{ title: 'SMA KELAS 12' }} />
        <Stack.Screen name="MA10" options={{ title: 'MA KELAS 10' }} />
        <Stack.Screen name="MA11" options={{ title: 'MA KELAS 11' }} />
        <Stack.Screen name="MA12" options={{ title: 'MA KELAS 12' }} />
      </Stack>
      <StatusBar style="dark" backgroundColor="#fff" />
    </ThemeProvider>
  );
}
