import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') { 
      WebBrowser.warmUpAsync().catch((error) =>
        console.warn("WebBrowser warmUpAsync error:", error)
      );
      
      return () => {
        WebBrowser.coolDownAsync().catch((error) =>
          console.warn("WebBrowser coolDownAsync error:", error)
        );
      };
    }
  }, []);
};
