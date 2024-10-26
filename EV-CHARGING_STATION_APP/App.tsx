import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import LoginScreen from "./App/Screen/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    outfit: require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-SemiBold.ttf"),
  });

  // Splash screen control for font loading
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }

  // Retrieve the publishable key from environment variables
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error("Missing Publishable Key.");
    return null; 
  }

  // SecureStore token management (token cache)
  const tokenCache = {
    async getToken(key: string) {
      try {
        return await SecureStore.getItemAsync(key);
      } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        await SecureStore.setItemAsync(key, value);
      } catch (error) {
        console.error("Error saving token:", error);
      }
    },
  };

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          <Text>You are Signed In</Text>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
