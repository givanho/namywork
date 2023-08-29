import React, {useState, useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Box, Image, Center ,Text, Input,Button,
   AspectRatio, Stack,HStack,Flex,VStack, Spacer, Link,
   FormControl,Heading} from 'native-base'
   import { UserAuth } from '../context/context'
import * as ImagePicker from 'expo-image-picker' 
import {ScrollView, View, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const EditScreen = () => {
  const {createUser, googleSignIn, user, logout} = UserAuth();

    const [number, setNumber]= useState('')
    const [skill, setSkill]= useState('')
    const [about, setAbout]= useState('')
    const [location, setLocation]= useState('')

    const [images, setImages] = useState("https://img.icons8.com/?size=1x&id=23265&format=png")
const [image, setImage] = useState('')
const [handlePermissions, setHandlePermissions] = useState(null)

// Hook for Profile picture Permission on device
useEffect(() => {
    (async() =>{
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHandlePermissions(galleryStatus.status === 'granted');
    })()
  
    
  }, []);
  
  
  // Function that handle user image Picker (profile pic)
  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
   if (handlePermissions === false){
    return <Text>No access to gallery</Text>
   }
  useEffect(() => {
      if (user && user.photoURL) {
        setEmail(user.email);
        setDisplayName(user.displayName)
        setImages(user.photoURL)
        
      } else {
        console.log('No users found');
      }
    }, [user]);
  


  return (
        <Box h='100%' bg='#fff'  justifyContent= 'center'>
      <ScrollView h='10%'  justifyContent= 'center'  >
     
        
        <Box  h='100%'  bg='#fff' >
          
            <Center>
  <VStack  width="90%" mx="3" maxW="300px"  >
  <HStack alignItems='center' justifyContent='center'>
      <Box h="150"
      w="150" 
      borderColor= "#158e73"
      borderBottomWidth='8px'
      borderTopWidth='1px'
      bg="#F8FAFB"
      borderRadius={100} > 
      
      {/* Dynamically render image if user has uploaded a pic or display default avatar  */}
    {image ? (<Image  alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'
      source= {{uri: image}}
      alt="User Aatar"
      flex={1}
      w='140'
      h='120'
      resizeMode="cover"
      borderRadius={100}
      borderColor= "#e5e6ea"
      borderWidth= "3px"
    />):
    // Avatar when there is no profile pic
       (
        <View w='80%'
    h='80%' alignItems="center" justifyContent="center" alignSelf='center' alignContent='center' m='auto'>
      <Image  alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'
    source= {require('../assets/avatar.png')}
    alt="User Aatar"
    flex={1}
    w='140'
    h='120'
    resizeMode="contain"
    borderRadius={100}
    borderColor= "#e5e6ea"
    borderWidth= "3px"
  />
  </View>
  )
  }  
    
    </Box>

    {/* Camera Icon by the Picture border to handle onPress to select picture */}
    <TouchableOpacity  onPress={pickImage} >
    <Image 
     source={require("../assets/camera.png")}
     alt="Upload Image"
     h="50"
     w="50"
     ml={-7}
     mt={22}
     position='absolute'
    opacity={0.6}
     resizeMode="contain"/>
    </TouchableOpacity>
    </HStack>
  {/* <Box alignSelf='center' pb={5}>
  <Image  source={require('../assets/icon.png')}
             alt='headerImage' h='130' w='130' resizeMode="contain"/>
             </Box> */}
             
        <FormControl isRequired >
      
          <Input mt='4' rounded="md" type ='text' borderColor='#e5e6ea' keyboardType='number-pad' _input={{bg:'#F8FAFB'}} _focus={{
        
        borderColor: "#158e73",
        borderWidth: "1px"
      }}  
      
      placeholder="Number" 
      onChangeText={(number) => setNumber(number)}
      />
        </FormControl>

        <FormControl isRequired >
      <Input mt='4' rounded="md" type ='text' borderColor='#e5e6ea' _input={{bg:'#F8FAFB'}} _focus={{
        borderColor: "#158e73",
        borderWidth: "1px"
         }}  
  
        placeholder="Skill" 
        onChangeText={(skill) => setSkill(skill)}
        />
    </FormControl>

    <FormControl isRequired >
      <Input mt='4' rounded="md" type ='text'  borderColor='#e5e6ea' _input={{bg:'#F8FAFB'}} _focus={{
        borderColor: "#158e73",
        borderWidth: "1px"
         }}  
  
        placeholder="Location" 
        onChangeText={(location) => setLocation(location)}
        />
    </FormControl>

    <FormControl isRequired >
      <Input mt='4' rounded="md" type ='text'   borderColor='#e5e6ea'_input={{bg:'#F8FAFB'}} _focus={{
        borderColor: "#158e73",
        borderWidth: "1px"
         }}  
  
        placeholder="About Me" 
        onChangeText={(about) => setAbout(about)}
        />
    </FormControl>
        <Button rounded="md"  mt="5" bg='#158e73' colorScheme='emerald'>
          Save
        </Button>
      
          </VStack>
          </Center>
               </Box>
       
      </ScrollView>
  </Box>
   
  
    
  )
}

export default EditScreen