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
import { useMutation } from "@tanstack/react-query";
import signUpAction from "./_actions/signUpAction";
import { Link, Redirect } from "expo-router";
const SignUp = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const { mutateAsync, data, isPending } = useMutation({
    mutationKey: ["signUp", formValues.email],
    mutationFn: async () => {
      const res = await signUpAction(formValues);
      if (res == 200) {
        return <Redirect href="/" />;
      }
    },
  });

  const validateForm = () => {
    let errors = {
      name: formValues.name.length < 2,
      email: !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email),
      password: formValues.password.length < 8,
      confirmPassword: formValues.confirmPassword !== formValues.password,
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      // console.log("Form submitted", formValues);
      await mutateAsync();
      console.log(data);
    }
  };

  return (
    <SafeAreaView className="h-full justify-center items-center space-y-3 px-4">
      <Heading>Sign Up</Heading>
      <View className="mt-3">
        <VStack className="w-full min-w-full rounded-md border border-background-200 p-4">
          {/* Name Field */}
          <FormControl isInvalid={formErrors.name} size="md">
            <FormControlLabel>
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                placeholder="Name"
                value={formValues.name}
                onChangeText={(text) =>
                  setFormValues((prev) => ({ ...prev, name: text }))
                }
              />
            </Input>
            {formErrors.name && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Name must be at least 3ahmad characters.
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

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

          {/* Confirm Password Field */}
          <FormControl isInvalid={formErrors.confirmPassword} size="md">
            <FormControlLabel>
              <FormControlLabelText>Confirm Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="password"
                placeholder="Confirm Password"
                secureTextEntry
                value={formValues.confirmPassword}
                onChangeText={(text) =>
                  setFormValues((prev) => ({ ...prev, confirmPassword: text }))
                }
              />
            </Input>
            {formErrors.confirmPassword && (
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Passwords do not match.
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

          <Link href={"/auth/signIn"}>
            <Text className="font-bold">Have An Account? Sign In</Text>
          </Link>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
