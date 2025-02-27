import { Button } from '@/components/ui/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from '@/config/firebaseConfig';
const handleSignInWithGoogle = async () => {
}
const GoogleSignIn = () => {
    return (
      <View>
        <Button className="" size="xl" variant="link" >
          <AntDesign name="google" size={40} color="black" />
        </Button>
      </View>
    );
}

const styles = StyleSheet.create({})

export default GoogleSignIn;
