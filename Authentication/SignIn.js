import React,{useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Box, Image, Center ,Text, Input,Button,
   AspectRatio, Stack,HStack,Flex,VStack, Spacer, Link,
   FormControl,Heading} from 'native-base'
import {ScrollView, View, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserAuth } from '../context/context'



const SignIn = ({navigation}) => {
  const { signIn, user} = UserAuth();

  const [errors, setErrors] = useState(null);
  const [email, setEmail]   = useState('')
  const [password, setPassword]   = useState('')
  
  // const validate = () => {
  //   if (formData.name === undefined) {
  //     setErrors({ ...errors,
  //       name: 'Name is required'
  //     } );
      

  //     return false;
  //   } else if (formData.name.length < 3) {
  //     setErrors({ ...errors,
  //       name: 'Name is too short'
  //     });
  //     return false;
  //   }

  //   return true;
  // };
  const emailSignIn = async () =>{
    try {
     
        await signIn(email, password)
          .then(() => {
            console.log(user);
            // Perform any additional actions
            console.log("user logged in");
            navigation.navigate("Profile");
          })

          
      
    } catch (e) {
      setErrors(e.message)
      console.log("Error Email " + e.message);
    }
  }
  const onSubmit = () => {
    emailSignIn
  };

  return (
   
      <Box h='100%' bg='#fff'  justifyContent= 'center'>
    <ScrollView h='10%'  justifyContent= 'center'  >
   
      
      <Box  h='100%'  bg='#fff' >
          {/*  */}
          <Center>
<VStack  width="90%" mx="3" maxW="300px">
<Box alignSelf='center' pb={5}>
<Image  source={require('../assets/icon.png')}
           alt='headerImage' h='130' w='130' resizeMode="contain"/>
           </Box>
           
      <FormControl isRequired >
    
        <Input rounded="md" type ='email' borderColor='#e5e6ea' _input={{bg:'#F8FAFB'}} _focus={{
      
      borderColor: "#158e73",
      borderWidth: "1px"
    }}  
    
    placeholder="Email" 
    onChangeText={(email) => setEmail(email)}
    />
       
        { errors ? <FormControl.ErrorMessage mt={-0.5}>Error</FormControl.ErrorMessage> : <FormControl.HelperText mt={-0.5}>
            Email must contain '@'
          </FormControl.HelperText>}
      </FormControl>
      <FormControl isRequired isInvalid={errors}>
       
        <Input mt="4" rounded="md" type ='password' borderColor='#e5e6ea' _input={{bg:'#F8FAFB'}} _focus={{
      
      borderColor: "#158e73",
      borderWidth: "1px"
    }}  placeholder="Password" 
    onChangeText={(password) => setPassword(password)}
    
       />
        { errors ? <FormControl.ErrorMessage>{errors}</FormControl.ErrorMessage> : <FormControl.HelperText>
          
          </FormControl.HelperText>}
      </FormControl>
      <Button rounded="md" onPress={emailSignIn} mt="5" bg='#158e73' colorScheme='emerald'>
        Sign In
      </Button>
      
      <Text>
        Don't have an account? <Text color="green.700" onPress={() => {
    navigation.navigate('SignUp')
  }}>Sign up </Text>
      </Text>
        </VStack>
        </Center>
             </Box>
     
    </ScrollView>
</Box>
 

  )
  
}

export default SignIn