import React,{useState, useRef, useCallback  } from 'react'
import { Ionicons } from '@expo/vector-icons';
import {ScrollView, Box, Image, Center ,Text, Input,Button,
   AspectRatio, Stack,HStack,Flex,VStack, Spacer, Link,KeyboardAvoidingView,
   FormControl,Heading} from 'native-base'
import { View,TouchableOpacity,} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { parsePhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js';


const Nav = createNativeStackNavigator();

const SignUp = ({navigation}) => {

  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);
  const [password, setPasswowrd] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const numberInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const repasswordInputRef = useRef(null);

  const focusNumberInput = useCallback(() => {
    if (numberInputRef.current) {
      numberInputRef.current.focus();
    }
  }, []);

  const focusPasswordInput = useCallback(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
    else{console.log('No password')
  }
  }, []);
  const focusRePasswordInput = useCallback(() => {
    if (repasswordInputRef.current) {
      repasswordInputRef.current.focus();
    }
  }, []);

  function validateNigerianPhoneNumber(phoneNumber) {
    const phoneUtil =u ;
    try {
      const numberProto = phoneUtil.parse(phoneNumber, "NG");
      return phoneUtil.isValidNumber(numberProto);
    } catch (e) {
      console.log(e)
      return false;
    }
  
};
 const handleSubmit = async (event) => {
  event.preventDefault()
 

 validateNigerianPhoneNumber('08144299862');

// if (isNigerianPhoneNumberValid) {
// // The phone number is valid
// } else {
// // The phone number is not valid
// }

 }
    
  const validate = () => {
    let errors = [];
    let vali=''
    if (!userName) {
      errors.push('Name is required');
    } else if (userName.length < 3) {
      errors.push('Name is too short');
    }
  

      const phoneNumbers = parsePhoneNumber(number, 'NG')

      if ( phoneNumbers.isValid() == true) {
       console.log('country '+ phoneNumbers.country ) 
       console.log('naija '+ phoneNumbers.number ) 
       
        // Note: `.getType()` requires `/max` metadata: see below for an explanation.
        phoneNumbers.getType()
       setNumber(phoneNumbers.number)
      console.log(phoneNumbers.number)
      }
    else{
      errors.push('Error in Phone number')
    }
    
    return errors;
  };

  const onSubmit = () => {

    const errors = validate();

    if (errors.length > 0) {
      console.log('Validation errors:', errors);
    } else {
      console.log('Submitted!'+ userName);

    }
    };

  return (
    <KeyboardAvoidingView
    behavior="height"
   
    enabled={true}
    keyboardVerticalOffset={-50}
    
  >
   <ScrollView >
      <Box h='100%' bg='#fff'  justifyContent= 'center' pb={40}>
    
   
   
      <Box  h='100%'  bg='#fff' pt={20}  justifyContent= 'center'>
          {/*  */}
          <Center>
<VStack  width="90%" mx="3" maxW="320px">
<Box alignSelf='center' pb={5}>
<Image  source={require('../assets/icon.png')}
           alt='headerImage' h='130' w='130' resizeMode="contain"/>
           </Box>
           <FormControl isRequired >
    
        <Input mb="2.5" rounded="md" type ='number' _input={{bg:'#fff'}} _focus={{
      
      borderColor: "#158e73",
      borderWidth: "1px"
    }}  
    
    placeholder="Name"
    returnKeyType="next"
   keyboardType="default"
   onSubmitEditing={focusNumberInput}
    onChangeText={ (text) => setUserName(text)}
    />
      </FormControl>
      <FormControl isRequired >
    
        <Input mb="2.5" rounded="md" type ='number' _input={{bg:'#fff'}} _focus={{
      
      borderColor: "#158e73",
      borderWidth: "1px"
    }}  
    
    placeholder="number"
    returnKeyType="next"
    keyboardType="numeric"
    ref={numberInputRef}
    onSubmitEditing={focusPasswordInput}
   
    onChangeText={ (phoneNumber) => setNumber(phoneNumber)}
    />
      </FormControl>

      <FormControl isRequired >
    
    <Input mb="2.5" rounded="md" type ='text' _input={{bg:'#fff'}} _focus={{
  
  borderColor: "#158e73",
  borderWidth: "1px"
}}  

placeholder="Password"
returnKeyType="next"
secureTextEntry={true}
ref={passwordInputRef}
onSubmitEditing={focusRePasswordInput}
onChangeText={ (password) => setPasswowrd(password)}
/>
  </FormControl>

  <FormControl isRequired >
    
    <Input rounded="md" type ='text' _input={{bg:'#fff'}} _focus={{
  
  borderColor: "#158e73",
  borderWidth: "1px"
}}  

placeholder="Re-Enter Password"
returnKeyType="done"
ref={repasswordInputRef}
secureTextEntry={true}
onSubmitEditing={onSubmit}
onChangeText={ (rePassword) => setRePassword(rePassword)}
/>
  </FormControl>

       
      <Button rounded="md" onPress={onSubmit} mt="5" bg='#158e73' colorScheme='emerald'>
        Sign Up
      </Button>
     
      <Button borderColor='#158e73' borderWidth='1' rounded="md" bg='#F8FAFB' colorScheme='#158e73' mt="1" h='10'>
        <HStack>
      <Image  source={require('../Authentication/google.png')}
           alt='headerImage' h='22' w='25' resizeMode="contain" mr="3"/>
           <Text> Sign-In with Google</Text>
           </HStack>
      </Button>
      <Text >
        Don't have an account? <Text color="green.700" onPress={() => {
    navigation.navigate('SignUp')
  }}>Sign up </Text>
      </Text>
        </VStack>
        </Center>
             </Box>
    
</Box>
</ScrollView>
</KeyboardAvoidingView>
  )
  
}

export default SignUp