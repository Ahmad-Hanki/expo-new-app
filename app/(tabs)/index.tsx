import { auth } from "@/config/firebaseConfig";
import { Link, Redirect } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Wait until authentication state is determined
  if (isAuthenticated === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/auth/signUp" />;
  }

  return (
    <SafeAreaView>
      <Text className="text-red-700 text-5xl">
        <Link href="/auth/signUp">Sign Up</Link>
      </Text>
      <Pressable
        onPress={async () => {
          await signOut(auth);
        }}
        className="text-red-700 text-5xl"
      >
        <Text>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Index;
