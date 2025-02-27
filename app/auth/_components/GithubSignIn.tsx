import { Button } from '@/components/ui/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const GithubSignIn = () => {
    return (
      <View>
        <Button variant="link" className="" size="xl" >
          <AntDesign name="github" size={40} color="black" />
        </Button>
      </View>
    );
}

const styles = StyleSheet.create({})

export default GithubSignIn;
