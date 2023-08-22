import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ScrollView,
  Box,
  Image,
  Center,
  Text,
  Input,
  Button,
  HStack,
  VStack,
  KeyboardAvoidingView,
  FormControl,
} from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { parsePhoneNumber } from "libphonenumber-js";
import { UserAuth } from "../context";
const Nav = createNativeStackNavigator();

const SignUp = ({ navigation }) => {
  const [photoURL, setPhotoURL] = useState(
    "https://img.icons8.com/?size=1x&id=23265&format=png"
  );

  const [userName, setUserName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [displayName, setNumber] = useState("");
  const [password, setPasswowrd] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [errorOutput, setErrorOutput] = useState({
    firstname: null,
    lastName: null,
    displayName: null,
    password: null,
    rePassword: null,
    fireError: null,
  });

  //the following refs are strictly for the keyboard return key behaviour, it allows users
  //go to the next input fields from their keyboards
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const numberInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const repasswordInputRef = useRef(null);
  const { createUser, googleSignIn, user, logout } = UserAuth();
  

  //the following blocks of code is used to focus correctly on the exact field a user  is filling
  const focusLastNameInput = useCallback(() => {
    if (lastNameInputRef.current) {
      lastNameInputRef.current.focus();
    }
  }, []);

  const focusEmailInput = useCallback(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const focusNumberInput = useCallback(() => {
    if (numberInputRef.current) {
      numberInputRef.current.focus();
    }
  }, []);

  const focusPasswordInput = useCallback(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);
  const focusRePasswordInput = useCallback(() => {
    if (repasswordInputRef.current) {
      repasswordInputRef.current.focus();
    }
  }, []);

  /* this validate function, checks all the required fields for errors, 
 if any, it returns false   */
  const validate = () => {
    let errors = {};

    // Name validation
    if (!userName) {
      errors.name = "Name is required";
    } else if (userName.length < 3) {
      errors.name = "Name is too short";
    } else if (!userName.match(/^[a-zA-Z]+\s*$/)) {
      errors.name = "Name is not valid";
    }

    // Last name validation
    if (lastName !== null) {
      const lastNameMod = lastName.replace(/\b(\w+)\s+(?=\b)/g, "$1");
      if (!lastNameMod) {
        errors.lastname = "Last name is required";
      } else if (lastNameMod.length < 3) {
        errors.lastname = "Last name is too short";
      } else if (!lastNameMod.match(/^[a-zA-Z]+\s*$/)) {
        errors.lastname = "Last name is not valid";
        console.log(lastNameMod + " words");
      }
    } else {
      errors.lastname = "Last name is required";
    }

    // Phone number validation
    try {
      const phoneNumbers = parsePhoneNumber(displayName, "NG");
      if (phoneNumbers) {
        if (phoneNumbers.isPossible() == false) {
          errors.displayName = "enter a valid number";
        }
      }
    } catch (error) {
      errors.displayName = error.message;
    }

    // Password validation
    if (!password) {
      errors.password = "enter a valid password";
    } else if (password === rePassword) {
      console.log("Passwords matched");
      if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    } else {
      errors.password = "Passwords do not match";
    }

    setErrorOutput(errors);
    return errors;
  };

  useEffect(() => {
    console.log("users " + user);
  }, [user]);

  /*When this function is triggered, it runs the validate function first, 
  then succesfully submit user'scredentials if no errors are found*/
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userName == null) {
      console.log("username null");
    }
    const errors = validate();
    try {
      if (Object.keys(errors).some((key) => errors[key] !== "")) {
        console.log(errors);
      } else {
        console.log("Success");
        await createUser(email, password, displayName, photoURL)
          .then(() => {
            console.log(displayName);
            // Perform any additional actions
            console.log("user logged in");
            navigation.navigate("Profile");
          })

          .catch((error) => {
            console.log("Error creating user:", error.message);
            setEmailError(error.message);
            setErrorOutput({
              firstname: null,
              lastName: null,
              displayName: null,
              password: null,
              rePassword: null,
              fireError: null,
            });
          });
      }
    } catch (e) {
      console.log("Error Email " + e.message);
    }
  };
  // Google Sign In
  const signInGoogle = async () => {
    try {
      await googleSignIn();
      console.log("Signed in as");
    } catch (e) {
      console.log("Signin error  " + e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      enabled={true}
      keyboardVerticalOffset={-50}
    >
      <ScrollView>
        <Box h="100%" bg="#fff" justifyContent="center" pb={40}>
          {/* this is where the entire app contents are */}
          <Box h="100%" bg="#fff" pt={20} justifyContent="center">
            {/* the center tag accompanied by the VStack tag, helps to vertically
             align each item */}

            <Center>
              <VStack width="90%" mx="3" maxW="320px">
                <Box alignSelf="center" pb={5}>
                  <Image
                    source={require("../assets/icon.png")}
                    alt="headerImage"
                    h="130"
                    w="130"
                    resizeMode="contain"
                  />
                </Box>

                {/* this is where the input fields start, HStack 
                here is used to place First Name and Last name side by side */}
                <HStack
                  w="48%"
                  pt={2}
                  space={3.5}
                  alignSelf="center"
                  justifyContent="center"
                >
                  {/* Name */}
                  <FormControl
                    isRequired
                    isInvalid={errorOutput && errorOutput.name}
                  >
                    <Input
                      mb="2.5"
                      rounded="md"
                      type="text"
                      _input={{ bg: "#fff" }}
                      _focus={{
                        borderColor: "#158e73",
                        borderWidth: "1px",
                      }}
                      placeholder="First Name"
                      returnKeyType="next"
                      keyboardType="default"
                      onSubmitEditing={focusLastNameInput}
                      onChangeText={(text) => setUserName(text)}
                    />
                    {errorOutput && errorOutput.name && (
                      <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                        {errorOutput.name}
                      </Text>
                    )}
                  </FormControl>

                  {/* Last Name */}
                  <FormControl
                    isRequired
                    isInvalid={errorOutput && errorOutput.lastname}
                  >
                    <Input
                      mb="2.5"
                      rounded="md"
                      type="number"
                      _input={{ bg: "#fff" }}
                      _focus={{
                        borderColor: "#158e73",
                        borderWidth: "1px",
                      }}
                      placeholder="Last Name"
                      returnKeyType="next"
                      keyboardType="default"
                      ref={lastNameInputRef}
                      onSubmitEditing={focusEmailInput}
                      onChangeText={(text) => setLastName(text)}
                    />
                    {errorOutput && errorOutput.lastname && (
                      <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                        {errorOutput.lastname}
                      </Text>
                    )}
                  </FormControl>
                </HStack>

                {/* Email */}
                <FormControl isRequired isInvalid={emailError && emailError}>
                  <Input
                    mb="2.5"
                    rounded="md"
                    _input={{ bg: "#fff" }}
                    _focus={{
                      borderColor: "#158e73",
                      borderWidth: "1px",
                    }}
                    placeholder="Email"
                    returnKeyType="next"
                    keyboardType="email-address"
                    ref={emailInputRef}
                    onSubmitEditing={focusNumberInput}
                    onChangeText={(text) => setEmail(text)}
                  />
                  {emailError && emailError && (
                    <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                      {emailError}
                    </Text>
                  )}
                </FormControl>

                {/* Number */}
                <FormControl
                  isRequired
                  isInvalid={errorOutput && errorOutput.displayName}
                >
                  <Input
                    mb="2.5"
                    rounded="md"
                    type="number"
                    _input={{ bg: "#fff" }}
                    _focus={{
                      borderColor: "#158e73",
                      borderWidth: "1px",
                    }}
                    placeholder="number"
                    returnKeyType="next"
                    keyboardType="numeric"
                    ref={numberInputRef}
                    onSubmitEditing={focusPasswordInput}
                    onChangeText={(phoneNumber) => setNumber(phoneNumber)}
                  />
                  {errorOutput && errorOutput.displayName && (
                    <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                      {errorOutput.displayName}
                    </Text>
                  )}
                </FormControl>

                {/* Password */}
                <FormControl
                  isRequired
                  isInvalid={errorOutput && errorOutput.password}
                >
                  <Input
                    mb="2.5"
                    rounded="md"
                    type="password"
                    _input={{ bg: "#fff" }}
                    _focus={{
                      borderColor: "#158e73",
                      borderWidth: "1px",
                    }}
                    placeholder="Password"
                    returnKeyType="next"
                    secureTextEntry={true}
                    ref={passwordInputRef}
                    onSubmitEditing={focusRePasswordInput}
                    onChangeText={(password) => setPasswowrd(password)}
                  />
                  {errorOutput && errorOutput.password && (
                    <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                      {errorOutput.password}
                    </Text>
                  )}
                </FormControl>

                {/* Re Enter Password */}
                <FormControl
                  isRequired
                  isInvalid={errorOutput && errorOutput.password}
                >
                  <Input
                    mb="2.5"
                    rounded="md"
                    type="password"
                    _input={{ bg: "#fff" }}
                    _focus={{
                      borderColor: "#158e73",
                      borderWidth: "1px",
                    }}
                    placeholder="Re-Enter Password"
                    returnKeyType="done"
                    ref={repasswordInputRef}
                    secureTextEntry={true}
                    onSubmitEditing={onSubmit}
                    onChangeText={(rePassword) => setRePassword(rePassword)}
                  />
                  {errorOutput && errorOutput.password && (
                    <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                      {errorOutput.password}
                    </Text>
                  )}
                </FormControl>

                <Button
                  rounded="md"
                  onPress={onSubmit}
                  mt="5"
                  bg="#158e73"
                  colorScheme="emerald"
                >
                  Sign Up
                </Button>

                <Text>
                  Already have an account?{" "}
                  <Text
                    color="green.700"
                    onPress={() => {
                      navigation.navigate("Portfolio");
                    }}
                  >
                    Sign In{" "}
                  </Text>
                </Text>
              </VStack>
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
