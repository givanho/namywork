import React, {useState, useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Box,  Center ,Text, Input,Button,
   HStack,VStack,
   FormControl,Avatar, ScrollView, TextArea} from 'native-base'
   import { UserAuth } from '../context/context'
import * as ImagePicker from 'expo-image-picker' 
import {TouchableOpacity} from 'react-native';
import { collection, query, where ,doc, setDoc, onSnapshot, } from "firebase/firestore";
import { db , storage} from '../firebase';
import { ref , uploadBytesResumable, getDownloadURL,} from 'firebase/storage';
import DropDownMenu from '../Components/DropDownMenu';


const EditScreen = ({navigation, route}) => {
  const{value, locationRoute, aboutRoute, skillRoute} = route.params
  const { user} = UserAuth();
  const [data, setData] = useState(null)
  const maxLength = 200;
    const [number, setNumber]= useState(value)
    const [skill, setSkill]= useState(skillRoute)
    const [about, setAbout]= useState(aboutRoute)
    const [location, setLocation]= useState(locationRoute)
    const [userImgSrc, setUserImgSrc] = useState(null);
    const [image, setImage] = useState(null)
    const [imgSrc, setImgSrc] = useState(require("../assets/avatar.png"));

    const [selectedState, setSelectedState] = useState(null);
  const [selectedCapital, setSelectedCapital] = useState(null);

const [handlePermissions, setHandlePermissions] = useState(null)



//imageupload function

const imageUpload = async () =>{
  if( userImgSrc == null ) {
    await setDoc(doc(db, 'users', user.uid), {
     
      number,
      location,
      about,
      skill,
      }, { merge: true });
      navigation.goBack();
  }
  
else{


 
  try {
    const storageRef = ref(storage, 'profile_pics/' + user.email + '/DP');
    const response = await fetch(userImgSrc);
    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      // ... progress and error handlers ...
      async() => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      return await getDownloadURL(uploadTask.snapshot.ref)
      .then(async (downloadURL) => {
        setImage(downloadURL)
          console.log('File available at', downloadURL);

         await setDoc(doc(db, 'users', user.uid), {
                 userImg: downloadURL, // Use downloadURL here
                 number,
                 location,
                 about,
                 skill,
                 }, { merge: true });
        });
      }
      
    );

    // ... rest of your code ...
    navigation.goBack();
  } catch (error) {
    console.error('Error uploading image: ', error);
  }
}
};



  //We're using the useEffect hook to set up the real-time listener when the component mounts
  useEffect(() => {
    if (user) {
      //When the query snapshot changes (new data is added), 
     // the onSnapshot callback function is called. If the query snapshot is not empty, 
     // we update the state with the data from the first document in the snapshot.

      const q = query(collection(db, 'users'), where('userID', '==', user.uid));

      //The unsubscribe function returned by onSnapshot is used to 
      //remove the listener when the component unmounts, preventing memory leaks.

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          console.log(doc.id, ' => ', doc.data());
          setData(doc.data());
          if (doc.data().userImg) {
            setImgSrc({ uri: doc.data().userImg });
          }
         
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [image]);


useEffect(() => {
  (async() =>{
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHandlePermissions(galleryStatus.status === 'granted');
  })()

  
}, []);


const handleStateSelection = (state) => {
  setSelectedState(state);

};

// Callback function to update selected capital
const handleCapitalSelection = (capital) => {
  setSelectedCapital(capital);

};
useEffect(() => {
  if (selectedState&&selectedCapital){
    setLocation(selectedState+', '+selectedCapital)
  }
  else{
    setLocation(locationRoute)
  }
}, [selectedCapital, selectedState])



// Function that handle user image Picker (profile pic)
const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality:0.5
    });

    
     console.log('user clicked council')
    if (!result.canceled) {
      const email = user.email; // Replace with actual user ID
      setUserImgSrc(result.assets[0].uri)
    // await imageUpload(result.assets[0].uri);
    console.log('userimagesource: =>' + userImgSrc)
      // setImage(imageUri);
    }
  };
 if (handlePermissions === false){
  return <Text>No access to gallery</Text>
 }  
 

  


  return (
       
      <ScrollView  bg='#fff'  pt={5} >
     <VStack  alignItems='center' alignContent='center'pb={40}  >
     <Box   width='100%' bg='#fff' pb={40}>
          
          <Center>
<VStack  width="90%" mx="3" maxW="300px"  >
<HStack alignItems="center" justifyContent='center'>
     <Box h="150"
    w="150" 
    borderColor= "#158e73"
    borderBottomWidth='8px'
    borderTopWidth='1px'
    bg="#eff3f6"
    
    borderRadius={100} >  
    
    
    {/* Dynamically render image if user has uploaded a pic or display default avatar  */}
    <Avatar bg="gray.100" alignSelf="center" justifyContent='center'mt={2} size="2xl"
    source= {userImgSrc !=null ?{uri:userImgSrc} :imgSrc}
    >
        avatar
      </Avatar>
   </Box> 

  {/* Camera Icon by the Picture border to handle onPress to select picture */}
  <TouchableOpacity  onPress={pickImage} >
    <Box position='absolute' mt={3} ml={-6} >
  <Ionicons 
        name='camera' type= "Octicons"size={35} color='#158e73' opacity={0.9} />
  </Box>
  </TouchableOpacity>
  </HStack>
{/* <Box alignSelf='center' pb={5}>
<Image  source={require('../assets/icon.png')}
           alt='headerImage' h='130' w='130' resizeMode="contain"/>
           </Box> */}
           
      <FormControl mt='4' isRequired >
      <FormControl.Label ><Text color='text.600' fontSize='11'>Phone Number</Text></FormControl.Label>
        <Input mt='-2' mb='3' zIndex='-999' rounded="md"  type ='text' borderColor='#e5e6ea' keyboardType='number-pad' _input={{bg:'#F8FAFB'}} _focus={{
      
      borderColor: "#158e73",
      borderWidth: "1px"
    }}  
    
    value={number}
    placeholder={data ? data.number|| 'add a phone number':'add a phone number'}
    onChangeText={(number) => {
    
        setNumber(number);
      
    }}
    />
      </FormControl>

      <FormControl isRequired >
      <FormControl.Label><Text color='text.600' fontSize='11'>Handwork</Text></FormControl.Label>
    <Input  mt='-2' mb='3' rounded="md" type ='text' borderColor='#e5e6ea' _input={{bg:'#F8FAFB'}} _focus={{
      borderColor: "#158e73",
      borderWidth: "1px"
       }}  
      value={skill}
      placeholder={data ? data.skill|| 'What do you do':'you get handwork?'}
      onChangeText={(skill) => setSkill(skill)}
      />
  </FormControl>

  <FormControl mt='1' rounded="md">
  <FormControl.Label  mb='-0.5'><Text color='text.600' fontSize='11'>Location</Text></FormControl.Label>
  <DropDownMenu onSelectState={handleStateSelection} location={location} onSelectCapital={handleCapitalSelection} />
   
  </FormControl>
  
  <FormControl mt='4' importantForAccessibility='About'>
    <FormControl.Label > <Text color='text.600' fontSize='11'>About Me</Text></FormControl.Label>
  <TextArea mt='-2'  rounded="md" type ='text' InputRightElement={<Text>  {maxLength - about.length}</Text>}  borderColor='#e5e6ea'_input={{bg:'#F8FAFB'}} _focus={{
      borderColor: "#158e73",
      borderWidth: "1px"
       }}  
      value={about}
      maxLength={maxLength}
      placeholder={data ? data.about|| 'who you be':'tell us small thing about u'}
      onChangeText={(about) => {if (about.length <= maxLength) {
        setAbout(about);
      }
      }} />
    {/* <Input mt='4' rounded="md" type ='text'   borderColor='#e5e6ea'_input={{bg:'#F8FAFB'}} _focus={{
      borderColor: "#158e73",
      borderWidth: "1px"
       }}  
      value={about}
      placeholder={data ? data.about|| 'who you be':'tell us small thing about u'}
      onChangeText={(about) => setAbout(about)}
      /> */}
  </FormControl>
  
      <Button rounded="md"  mt="5" bg='#158e73' colorScheme='emerald' onPress={imageUpload}>
        Save
      </Button>
     
        </VStack>
        </Center>
             </Box>
   

                 </VStack>

        










       
       
      </ScrollView>
  
   
  
    
  )
}

export default EditScreen