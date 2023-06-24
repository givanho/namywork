import React,{useState, useEffect, } from 'react'
import { StyleSheet,TouchableOpacity, TouchableNativeFeedbackBase} from 'react-native';
import { Box, Image,View, Center ,Text, Input,useDisclose, ScrollView,AspectRatio, Stack,VStack,HStack,Flex, Spacer,
   Button,Heading} from 'native-base'
import { UserAuth } from '../context'
import * as ImagePicker from 'expo-image-picker' 
import Ionicons from '@expo/vector-icons/Ionicons';
import { Actionsheet } from "native-base";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const Profiles = ({navigation}) => {
  const {createUser, googleSignIn, user, logout} = UserAuth();
const [email, setEmail] = useState('')
const [displayName, setDisplayName] = useState('')
const [images, setImages] = useState("https://img.icons8.com/?size=1x&id=23265&format=png")
const [image, setImage] = useState('')
const [handlePermissions, setHandlePermissions] = useState(null)
const {
  isOpen,
  onOpen,
  onClose
} = useDisclose();


useEffect(() => {
  (async() =>{
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHandlePermissions(galleryStatus.status === 'granted');
  })()

  
}, []);

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
    <ScrollView h='100%' bg="#eff3f6"  showsVerticalScrollIndicator={false} pt={10} >
    <VStack  alignItems='center' alignContent='center'pb={40} >
      <HStack >
      <Box h="150"
      w="150" 
      borderColor= "rgba(21, 142, 115, 0.5)"
      borderBottomWidth='8px'
      borderTopWidth='1px'
      bg="#eff3f6"
      borderRadius={100} > 
      
    {image ? (<Image  alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'
      source= {{uri: image}}
      alt="User Aatar"
      flex={1}
      w='140'
      h='120'
      resizeMode="cover"
      borderRadius={100}
      borderColor= "#eee"
      borderWidth= "3px"
    />):
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
    borderColor= "#eee"
    borderWidth= "3px"
  />
  </View>
  )
  }  
    
    
    
    
    </Box>
    <TouchableOpacity  onPress={pickImage} >
    <Image 
     source={require("../assets/camera.png")}
     alt="Upload Image"
     h="50"
     w="50"
     ml={-6}
     mt={77}
     position='absolute'
    opacity={0.6}
     resizeMode="contain"/>
    </TouchableOpacity>
    </HStack>
    

    <Box w= "95%" h="100%" bg='#fff'
                  borderTopRightRadius={40}
                  borderTopLeftRadius={40} 
                  mt={-50}
                  position='relative'
                  style={styles.rotatedBox}
                  >
                
               <VStack  alignItems='center' alignContent='center'>
                
    {/* <Text> {email}</Text> */}
 

    {/* <Text>{displayName}</Text> */}
    <Heading mt={50} fontSize='xl'> Rejoice P</Heading>
    <Text> Make-Up artiste</Text>
    <Text> Port Harcourt, Rivers State</Text>
 
      
      <HStack space={13.5} 
       alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'
       w="90%"
       >
        <Button 
                  rounded="md"
                 onPress={() => {
                  navigation.navigate('MyAd');
                  }}
                  mt="5"
                  w="40%"

                  bg="#158e73"
                  colorScheme="emerald"
                >
                  My Ads
                </Button>
                <Button
                  rounded="md"
                  onPress={pickImage}
                  mt="5"
                  w="40%"
                  bg="#158e73"
                  colorScheme="emerald"
                >
                  Edit Profile
                </Button>
      </HStack>
      <Box h='45' w='90%' borderColor= "#eff3f6"
      borderTopWidth= "2px"  mt={2}>
        <HStack mb='auto'mt='auto' space={4}>
          <Box bg="#eff3f6" size={9} borderRadius={10}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='md-heart' type= "Octicons"size={22} color='#158e73' opacity={0.9}/>
          </Box>
           <Heading fontSize='sm' color='text.500'   mb='auto'mt='auto'>Favorited</Heading>
           <Heading fontSize='md' color='text.600' ml='auto'  mb='auto'mt='auto'>500</Heading>
        </HStack>
      </Box>
      
      <Box h='45' w='90%' borderColor= "#F8FAFB"
      mt={1}>
       <HStack mb='auto'mt='auto' space={4}>
          <Box bg="#eff3f6" size={9} borderRadius={10}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='call-sharp' type= "Octicons"size={22} color='#158e73' opacity={0.9}/>
          </Box>
           <Heading fontSize='sm' color='text.500'   mb='auto'mt='auto'>08144299862</Heading>
        </HStack>
      </Box>
      
      <Box h='45' w='90%' borderColor= "#eee"
       mt={1}>
      <HStack mb='auto'mt='auto' space={4}>
          <Box bg="#eff3f6" size={9} borderRadius={10}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='ios-happy' type="Octicons" size={22} color='#158e73' opacity={0.9}/>
          </Box>
           <Heading fontSize='sm' color='text.500'   mb='auto'mt='auto'>Feedbacks</Heading>
           <Heading fontSize='md' color='text.600' ml='auto'  mb='auto'mt='auto'>500</Heading>
        </HStack>
      </Box>
      
      <Box h='45' w='90%' borderColor= "#eee"
       mt={1}>
        <TouchableWithoutFeedback onPress={onOpen} style={styles.rotatedBox}>
      <HStack mb='auto'mt='auto' space={4}>
          <Box bg="#eff3f6" size={9} borderRadius={10}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='ios-person' type="Octicons" size={22} color='#158e73' opacity={0.9}/>
          </Box>
           <Heading fontSize='sm' color='text.500'   mb='auto'mt='auto'>About Me</Heading>
           
           <Box mb='auto'mt='auto'  ml='auto'>
           <Ionicons 
          name='ios-chevron-forward' type="Octicons" size={18} opacity={0.9} color='#475569'
            />
          </Box>
        </HStack>
        </TouchableWithoutFeedback>
      </Box>
      
      <Box h='45' w='90%' borderColor= "#eff3f6"
      borderTopWidth= "2px" mt={1}>
    <HStack mb='auto'mt='auto' space={4}>
          <Box bg="#eff3f6" size={9} borderRadius={10}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='ios-share-social' type="Octicons" size={22} color='#158e73' opacity={0.9}/>
          </Box>
           <Heading fontSize='sm' color='text.500'   mb='auto'mt='auto'>Share Your Profile</Heading>
           
           <Box mb='auto'mt='auto'  ml='auto'>
           <Ionicons 
          name='ios-chevron-forward' type="Octicons" size={18} opacity={0.9} color='#475569'
            />
          </Box>
        </HStack>
      </Box>
      <Box h='45' w='90%' borderColor= "#F8FAFB"
       mt={1}>
      <HStack mb='auto'mt='auto' space={4}>
          <Box bg="#eff3f6" size={9} borderRadius={10}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='ios-exit' type="Octicons" size={22} color='#158e73' opacity={0.9}/>
          </Box>
           <Heading fontSize='sm' color='text.500'   mb='auto'mt='auto'>Log Out</Heading>
           
           <Box mb='auto'mt='auto'  ml='auto'>
           <Ionicons 
          name='ios-chevron-forward' type="Octicons" size={18} opacity={0.9} color='#475569'
            />
          </Box>
        </HStack>
      </Box>
        </VStack>
      </Box>

   

                </VStack>
                <Center>
   
   <Actionsheet isOpen={isOpen} onClose={onClose} size="full" h="100%">
     <Actionsheet.Content>
       <Box w="100%"  h="30" px={4} justifyContent="center">
         <Text fontSize="16" color="gray.600" _dark={{
         color: "gray.300"
       }}>
           About Me
         </Text>
       </Box>
       <Actionsheet.Item>
        <Box borderWidth={1} borderColor='#158e73' rounded='md'>
          <Text fontSize="14" color="gray.700" m={3}>
          I am 25 year old Make-Up artiste, with about 5 years 
            experience in the beauty business. You can contact me on 08128085142
             or follow me on Instagram @rejiPhil
          </Text>
        </Box>
       </Actionsheet.Item>
     </Actionsheet.Content>
   </Actionsheet>
 </Center>
    </ScrollView>
 
  )
}
const styles = StyleSheet.create({
  rotatedBox: {
    zIndex: -82,
    
  },
  rotatedImage: {
  
    
    width: '100%',

  },

});

export default Profiles