import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { Link, router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import GoogleSignIn from "./_components/GoogleSignIn";
import GithubSignIn from "./_components/GithubSignIn";
import MicrosoftSignIn from "./_components/MicrosoftSignIn";
const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const validateForm = () => {
    let errors = {
      email: !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email),
      password: formValues.password.length < 8,
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      // console.log("Form submitted", formValues);
      const account = await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );

      console.log(account.user.uid);

      if (account.user.uid) {
        return router.replace("/(tabs)");
      }
    }
  };

  return (
    <ScrollView>
      <SafeAreaView className="min-h-full justify-center items-center px-4">
        <Heading>Sign In</Heading>
        <View className="mt-3 ">
          <VStack className="w-full min-w-full  rounded-md border border-background-200 p-4">
            {/* Email Field */}
            <FormControl isInvalid={formErrors.email} size="md">
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <MaterialCommunityIcons
                  name="account-outline"
                  size={20}
                  color="black"
                />
                <InputField
                  type="text"
                  placeholder="Email"
                  value={formValues.email}
                  onChangeText={(text) =>
                    setFormValues((prev) => ({ ...prev, email: text }))
                  }
                />
              </Input>
              {formErrors.email && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    Enter a valid email address.
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Password Field */}
            <FormControl isInvalid={formErrors.password} size="md">
              <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <AntDesign name="lock" size={20} color="black" />
                <InputField
                  type="password"
                  placeholder="Password"
                  secureTextEntry
                  value={formValues.password}
                  onChangeText={(text) =>
                    setFormValues((prev) => ({ ...prev, password: text }))
                  }
                />
              </Input>
              {formErrors.password && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    Password must be at least 8 characters.
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            {/* Submit Button */}
            <Button
              className="w-full min-w-full mt-4"
              size="sm"
              onPress={handleSubmit}
            >
              <ButtonText className="text-lg">Submit</ButtonText>
            </Button>

            <Link href={"/auth/signUp"} className="mt-3">
              <Text className="font-bold">Do not Have An Account? Sign Up</Text>
            </Link>

            <View className="mt-9 gap-3">
              <Text className="text-center text-base text-gray-500">
                Or Sign In With
              </Text>

              <View className="flex flex-row items-center justify-center gap-4 w-full">
                <GoogleSignIn />
                <GithubSignIn />
                <MicrosoftSignIn />
              </View>
            </View>
          </VStack>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;
