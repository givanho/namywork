import React , {useState}from 'react'
import { UserAuth } from '../context/context'

import { Ionicons } from '@expo/vector-icons';
import { Box, Image,Text, Input,Button,
 FormControl
  } from 'native-base'
import {ScrollView,  StyleSheet, } from 'react-native';
import LoadState from '../Components/LoadState';

const ForgotPassword = () => {
    const {forgotPassword} = UserAuth()
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState(null)
    const [events, setEvents] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
  


    const handleSubmit = async (e) => {
        e.preventDefault()
        
   
       
        
        try {
         setIsLoading(true);
            await forgotPassword(email)
           setEvents("Recovery Password sent to your Email")
         setErrors(null)
   
            setIsLoading(false);
   
   }
            
         catch (e) {
            setErrors(e.message) 
            setEvents(null)
            console.log(e.message)
            setIsLoading(false);
   
           
        }
   
        
        
       
    }
    
  return (
    
    
      <ScrollView showsVerticalScrollIndicator={false} 
      contentContainerStyle={{ backgroundColor:'#fff', flexGrow: 1, alignItems: 'center', }}
    >
    <Box justifyContent='center' alignSelf='center'  height='100%' w='90%' >
        <Box justifyContent='center'   pb='24px' >
            <Box alignSelf='center'>
          <Image  source={require('../assets/adaptive-icon.png')}
           alt='headerImage'size={48} resizeMode="contain" 
           />
           </Box>
    <Text mb='20px' color='text.600'> Enter your email to reset your password</Text>
<Box >
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
 
  { errors ? <FormControl.ErrorMessage mt={1} >Error</FormControl.ErrorMessage> : <FormControl.HelperText mt={1}>
      Email must contain @
    </FormControl.HelperText>}
</FormControl>
</Box>
     
     
{errors && <Text color='error.700' mt='20px' >{errors}</Text>}
{events && <Text color='success.700' mt='20px'>{events}</Text>}
   
   
<LoadState  style={{ width: '30%',  aspectRatio: 1, marginTop:-5 }}
          showAnimation={isLoading}
          title= {'sending reset mail...' }
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
          }>

             <Button rounded='md' mt='24px'
     bg='#158e73' colorScheme='emerald'
     onPress={handleSubmit} >
   Reset Password
  </Button>
</LoadState>

   

        </Box>

       
        </Box>
        </ScrollView>
  
 
 
  )
}

export default ForgotPassword
const styles = StyleSheet.create({
    text: {
     fontSize:14,
    marginTop:-35,
    // fontFamily:'Poppins-Regular'
    

  
    }
  });