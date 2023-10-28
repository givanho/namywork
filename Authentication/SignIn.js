import React,{useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Box, Image, Center ,Text, Input,Button,
 VStack,
   FormControl,Pressable} from 'native-base'
import {ScrollView,  StyleSheet,} from 'react-native';
import { UserAuth } from '../context/context'
import LoadState from '../Components/LoadState';


const SignIn = ({navigation}) => {
  const { signIn} = UserAuth();
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState(null);
  const [email, setEmail]   = useState('')
  const [password, setPassword]   = useState('')
  const [loading, setLoading]   = useState(false)

  
  const emailSignIn = async () =>{
    try {
      setLoading(true);
  
      // Assuming signIn is a function that returns a user object upon successful authentication
      const user = await signIn(email, password);
  
      // Store user information in AsyncStorage
      await AsyncStorage.setItem('userToken', user.uid);
  
     
  
      // Navigate to the "Profile" screen
      navigation.navigate('Profile');
    } catch (e) {
      setErrors(e.message);
    } finally {
      setLoading(false);
    }
  }
 
 

  return (
  

    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',
     backgroundColor:'#fff', }}>
    <Box bg='#fff' width="100%"  justifyContent= 'center' >
  
 
    
    <Box  width="100%"  bg='#fff' alignSelf='center' justifyContent= 'center'  >
        {/*  */}
        <Center >
<VStack   width="90%"  >
<Box alignSelf='center' pb='24px'>
<Image  source={require('../assets/icon.png')}
         alt='headerImage' h='130' w='130' resizeMode="contain"/>
         </Box>
       
    <FormControl isRequired  >
  
      <Input  InputLeftElement={ <Box ml={3}><Ionicons name='mail' size={24} color="#36454F"  />
      </Box>} rounded="md" type ='email'   borderWidth='0.4'
                borderColor="#71797E" _input={{bg:'#F8FAFB',  selectionColor:'#7FFFD4'}} _focus={{
    
    borderColor: "#158e73",
    borderWidth: "1px"
  }}  
  
  placeholder="Email" 
  onChangeText={(email) => setEmail(email)}
  />
     
      { errors ? <FormControl.ErrorMessage mt={1}>Error</FormControl.ErrorMessage> : <FormControl.HelperText mt={1}>
          Email must contain @
        </FormControl.HelperText>}
    </FormControl>
    <FormControl isRequired isInvalid={errors}>
     
      <Input
      type={show ? "text" : "password"} 
      InputRightElement={<Pressable mr={3}  onPress={() => setShow(!show)}>
            <Ionicons name={show ? "eye" : "eye-off" }  size={24} color="#36454F" /> 
          </Pressable> }
           InputLeftElement={ <Box ml={3}><Ionicons name='key' size={24} color="#36454F" />
           </Box>}
      mt="4" rounded="md"   borderWidth='0.4'
      borderColor="#71797E" _input={{bg:'#F8FAFB',  selectionColor:'#7FFFD4'}} _focus={{
    
    borderColor: "#158e73",
    borderWidth: "1px"
  }}  placeholder="Password" 
  onChangeText={(password) => setPassword(password)}
  
     />
      { errors ? <FormControl.ErrorMessage>{errors}</FormControl.ErrorMessage> : <FormControl.HelperText>
        
        </FormControl.HelperText>}
    </FormControl>
    <Text onPress={()=>{navigation.navigate('ForgotPassword')}} alignSelf='flex-end'textDecorationLine='underline' mt='24px' color='#158e73'>Forgot Password ?</Text>
          <LoadState
          style={{ width: '30%',  aspectRatio: 1, marginTop:-5 }}
          showAnimation={loading}
          title= {'Signing in...' }
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

         <Button rounded="md" onPress={emailSignIn} mt="24px" bg='#158e73' colorScheme='emerald' >
            Sign In
          </Button>
          </LoadState>

           

       
    
    <Box alignItems='center' mt='96px'>
            <Text mb='8px'>
              Don't have an account?</Text> 
              <Text textDecorationLine='underline' color="green.700" onPress={() => {
                navigation.navigate('SignUp')
              }}>Sign up </Text>
    </Box>
      </VStack>
      </Center>
           </Box>
   
 
</Box>
</ScrollView>

    
  )
  
}

export default SignIn
const styles = StyleSheet.create({
  text: {
   fontSize:14,
  marginTop:-35,
  // fontFamily:'Poppins-Regular'


  }
});