import React, { useState, useRef, useCallback, useEffect } from "react";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { db } from "../firebase";
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
  Pressable
} from "native-base";
import { parsePhoneNumber } from "libphonenumber-js";
import { UserAuth } from "../context/context";
import { StyleSheet } from "react-native";
import LoadState from "../Components/LoadState";
import { Ionicons } from "@expo/vector-icons";

const SignUp = ({ navigation }) => {
 
  const[loading, setLoading] = useState(false)
  const [userName, setUserName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [number, setNumber] = useState("");
  const [password, setPasswowrd] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [show, setShow] = useState(false);

  const [errorOutput, setErrorOutput] = useState({
    firstname: null,
    lastName: null,
    number: null,
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
  const { createUser , user} = UserAuth();
  

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
      }
    } else {
      errors.lastname = "Last name is required";
    }

    // Phone number validation
    try {
      const phoneNumbers = parsePhoneNumber(number, "NG");
      if (phoneNumbers) {
        if (phoneNumbers.isPossible() == false) {
          errors.number = "enter a valid number";
        }
      }
    } catch (error) {
      errors.number = error.message;
    }

    // Password validation
    if (!password) {
      errors.password = "enter a valid password";
    } else if (password === rePassword) {
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
  }, [user]);

  /*When this function is triggered, it runs the validate function first, 
  then succesfully submit user'scredentials if no errors are found*/
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validate();
    try {
      if (Object.keys(errors).some((key) => errors[key] !== "")) {
        setLoading(false)
      } else {
        setLoading(true)
        const user = await createUser(email, password);
      if (user) {
        await setDoc(doc(db, 'users', user.user.uid ), {
          firstname: userName,
          surname: lastName,
          email,
          number,
          createdAt: serverTimestamp(),
          userImg: null,
          userID: user.user.uid
        },{ merge: true })
        navigation.navigate('Profile')
      }
      else {
        
        setEmailError("error");
        setErrorOutput({
          firstname: null,
          lastName: null,
          number: null,
          password: null,
          rePassword: null,
          fireError: null,
        });
        return false
      }
    }
    } catch (e) {
      setEmailError(e.message);
     setLoading(false)
    return true

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
              <VStack width="95%" >
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
                      borderWidth='0.4'
                      borderColor="#71797E"
                      _input={{ bg: "#fff" ,  selectionColor:'#7FFFD4'}}
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
                      borderWidth='0.4'
                      borderColor="#71797E"
                      _input={{ bg: "#fff" ,  selectionColor:'#7FFFD4'}}
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
                  InputLeftElement={ <Box ml={3}><Ionicons name='mail' size={24} color="#36454F" />
                  </Box>}
                    mb="2.5"
                    rounded="md"
                    borderWidth='0.4'
                    borderColor="#71797E"
                    _input={{ bg: "#fff" , selectionColor:'#7FFFD4' }}
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
                  isInvalid={errorOutput && errorOutput.number}
                >
                  <Input
                   InputLeftElement={ <Box ml={3}><Ionicons name='call' size={24} color="#36454F" />
                   </Box>}
                    mb="2.5"
                    rounded="md"
                    type="number"
                    borderWidth='0.4'
                    borderColor="#71797E"
                    _input={{ bg: "#fff",  selectionColor:'#7FFFD4' }}
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
                  {errorOutput && errorOutput.number && (
                    <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                      {errorOutput.number}
                    </Text>
                  )}
                </FormControl>

                {/* Password */}
                <FormControl
                  isRequired
                  isInvalid={errorOutput && errorOutput.password}
                >
                  <Input
                  type={show ? "text" : "password"} 
                  InputRightElement={<Pressable mr={3}  onPress={() => setShow(!show)}>
                        <Ionicons name={show ? "eye" : "eye-off" }  size={24} color="#36454F" /> 
                      </Pressable> }
                       InputLeftElement={ <Box ml={3}><Ionicons name='key' size={24} color="#36454F" />
                       </Box>}
                    mb="2.5"
                    rounded="md"
                    
                    _input={{ bg: "#fff",  selectionColor:'#7FFFD4' }}
                    _focus={{
                      borderColor: "#158e73",
                      borderWidth: "1px",
                    }}
                    placeholder="Password" 
                    returnKeyType="next"
                    borderWidth='0.4'
                    borderColor="#71797E"
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
                  type={show ? "text" : "password"} 
                  InputRightElement={<Pressable mr={3}  onPress={() => setShow(!show)}>
                        <Ionicons name={show ? "eye" : "eye-off" }  size={24} color="#36454F" /> 
                      </Pressable> }
                       InputLeftElement={ <Box ml={3}><Ionicons name='key' size={24} color="#36454F" />
                       </Box>}
                    mb="2.5"
                    rounded="md"
                    borderWidth='0.4'
                    borderColor="#71797E"
                    _input={{ bg: "#fff",  selectionColor:'#7FFFD4' }}
                    _focus={{
                      borderColor: "#158e73",
                      borderWidth: "1px",
                    }}
                    placeholder="Re-Enter Password"
                    returnKeyType="done"
                    ref={repasswordInputRef}
                    onSubmitEditing={onSubmit}
                    onChangeText={(rePassword) => setRePassword(rePassword)}
                  />
                  {errorOutput && errorOutput.password && (
                    <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                      {errorOutput.password}
                    </Text>
                  )}
                </FormControl>
                <LoadState
          style={{ width: '30%',  aspectRatio: 1, marginTop:-5 }}
          showAnimation={loading}
          title= {'Creating Account...' }
          textStyle={styles.text}
          source={require('../assets/animation/loaded.json')}
          colorFilters={
            [
              {
                keypath: "Shape Layer 1",
                color: "#2C9981",
              },
              {
                keypath: "Shape Layer 2",
                color: "#158e73",
              },
              {
                keypath: "Shape Layer 3",
                color: "#0E624F",
              },
              {
                keypath: "Shape Layer 4",
                color: "#44A58F",
              },
              {
                keypath: "Shape Layer 6",
                color: "#2ADFB7",
              },
              {
                keypath: "Shape Layer 5",
                color: "#5BB09D",
              },
            ]
          }
          >

                <Button
                  rounded="md"
                  onPress={onSubmit}
                  mt="24px"
                  bg="#158e73"
                  colorScheme="emerald"
                 >
                  Create Account
                </Button>
          </LoadState>
               
          <Box alignItems='center' mt='96px'>
            <Text mb='8px'>
            Already have an account? </Text> 
              <Text textDecorationLine='underline' color="green.700" onPress={() => {
                navigation.navigate('SignIn')
              }}>Sign In </Text>
    </Box>
              
              </VStack>
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  text: {
   fontSize:14,
  marginTop:-35,
  // fontFamily:'Poppins-Regular'

  }
});