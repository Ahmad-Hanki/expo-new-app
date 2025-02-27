import { Button } from '@/components/ui/button';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const MicrosoftSignIn = () => {
    return (
      <View>
        <Button variant="link" className="" size="xl" >
          <MaterialCommunityIcons name="microsoft" size={40} color="black" />
        </Button>
      </View>
    );
}

const styles = StyleSheet.create({})

export default MicrosoftSignIn;
