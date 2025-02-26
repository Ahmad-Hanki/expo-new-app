import { auth } from "@/config/firebaseConfig";
import { Redirect, Slot } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const AuthLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.currentUser);
  if (isAuthenticated?.uid) {
    return <Redirect href="/" />;
  }

  return <Slot />;
};

export default AuthLayout;
