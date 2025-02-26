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
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { Link, router } from "expo-router";

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
        return router.replace("/");
      }
    }
  };

  return (
    <SafeAreaView className="h-full justify-center items-center space-y-3 px-4">
      <Heading>Sign In</Heading>
      <View className="mt-3">
        <VStack className="w-full min-w-full rounded-md border border-background-200 p-4">
          {/* Email Field */}
          <FormControl isInvalid={formErrors.email} size="md">
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
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
            className="w-fit self-end mt-4"
            size="sm"
            onPress={handleSubmit}
          >
            <ButtonText>Submit</ButtonText>
          </Button>

          <Link href={"/auth/signUp"}>
            <Text className="font-bold">Do not Have An Account? Sign Up</Text>
          </Link>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
