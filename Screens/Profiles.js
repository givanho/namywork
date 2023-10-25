import React,{useState, useEffect, } from 'react'
import { StyleSheet,TouchableOpacity,Alert, Share,
   TouchableWithoutFeedback, View, Modal, StatusBar, Image} from 'react-native';
import { Box,  Center ,Text, useDisclose, ScrollView,VStack,HStack,
   Button,Heading,Avatar} from 'native-base'
import { UserAuth } from '../context/context'
import * as ImagePicker from 'expo-image-picker' 
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Actionsheet } from "native-base";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReusableModal from '../Components/Modal';
import { collection, query, where ,doc, setDoc, onSnapshot,getDocs } from "firebase/firestore";
import LoadState from '../Components/LoadState';
import { db } from '../firebase';
import { storage } from '../firebase';
import { ref , uploadBytesResumable, getDownloadURL,} from 'firebase/storage';
// This is the User's Profile DashBoard

const Profiles = ({navigation}) => {
const { user, logout} = UserAuth();
const [image, setImage] = useState('')
const [handlePermissions, setHandlePermissions] = useState(null)
const [uploading, setUploading] = useState(false);
const [data, setData] = useState(null)
const [userImgSrc, setUserImgSrc] = useState('');
const [favorited, setFavorited] = useState(null)
const [feedbacks, setFeedbacks] = useState(null)
const [isModalVisible2, setModalVisible2] = useState(false);

// ActionSheet State manager
const {
  isOpen,
  onOpen,
  onClose
} = useDisclose();

const [modalVisible, setModalVisible] = useState(false);

const openModal = () => {
  setModalVisible(true);
};

const closeModal = () => {
  setModalVisible(false);
};


//imageupload function
const imageUpload = async (uri, ) =>{


  try {
    const imageRef = ref(storage, 'profile_pics/' + user.email + '/DP');
    const response = await fetch(uri);
    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(imageRef, blob);

    uploadTask.on(
      'state_changed',
      // ... progress and error handlers ...
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
       getDownloadURL(uploadTask.snapshot.ref)
      .then(async (downloadURL) => {
        setImage(downloadURL)
       

         await setDoc(doc(db, 'users', user.uid), {
                 userImg: downloadURL, // Use downloadURL here
                 }, { merge: true });
        });
      }
      
    );

    // ... rest of your code ...
  } catch (error) {
    Alert.alert('Error uploading image: ', error);
  }
};
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality:0.5
    });

    
    
    if (!result.canceled) {
      const email = user.email; 
   await   imageUpload(result.assets[0].uri, email);
      // setImage(imageUri);
    }
  };
 if (handlePermissions === false){
  return <Text>No access to gallery</Text>
 }

  const onShare = async () => {
    try {
      const result = await Share.share({
       
        title:'Handwork',
        message:
          'Hello, I have posted my skill on Handwork. Do you need my services? http://google.com/handwork',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
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
          
          setData(doc.data());

          if (doc.data().userImg) {
            setUserImgSrc({ uri: doc.data().userImg });
          }
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [image]);
    

  useEffect(() => {
    const fetchData = async () => {
       const postQuerySnapshot = await getDocs(collection(db, "posts"));
       
  
    // Extract postIDs directly from the postQuerySnapshot
  
    const postData = [];
    postQuerySnapshot.forEach((doc) => {
      postData.push({ id: doc.id, ...doc.data() });
    });

let totalLikes = 0;
let totalComments = 0
 postData.forEach((post) => {
  if (post.userID === user.uid && post.likes && Array.isArray(post.likes)) {
    totalLikes += post.likes.length;
  }
  if (post.userID === user.uid && post.comments && Array.isArray(post.comments)) {
    totalComments += post.comments.length;
  }
});

setFeedbacks(totalComments)
setFavorited(totalLikes)
  
  }
  const postsCollectionRef = collection(db, "posts");
  
  const unsubscribePosts = onSnapshot(postsCollectionRef, fetchData);
  
  
  return () => {
    // Unsubscribe from the listeners when the component unmounts
 

    unsubscribePosts();
  }
  }, [])

  
  return (
    
    <View style={styles.container}>
    <ScrollView  bg="#eff3f6"  showsVerticalScrollIndicator={false} pt={5} 
     >
     
    <VStack  alignItems='center' alignContent='center'pb={40}  >
      <HStack >
       <Box h="150"
      w="150" 
      borderColor= "#158e73"
      borderBottomWidth='8px'
      borderTopWidth='1px'
      bg="#eff3f6"
      borderRadius={100} >  
      
      {/* Dynamically render image if user has uploaded a pic or display default avatar  */}
    
      <Avatar bg="gray.100" alignSelf="center" justifyContent='center'mt={2} size="2xl"
      source={userImgSrc}
      >
          avatar
        </Avatar>
   
     </Box> 

    {/* Camera Icon by the Picture border to handle onPress to select picture */}
    <TouchableOpacity  onPress={pickImage} >
      <Box position='absolute' mt={78} ml={-6}>
    <Ionicons 
          name='camera' type= "Octicons"size={35} color='#158e73' opacity={0.9} />
    </Box>
    </TouchableOpacity>
    </HStack>
    
{/* User Details Including Name and other data */}
    <Box w= "100%" h="100%" bg='#fff'
                  borderTopRightRadius={40}
                  borderTopLeftRadius={40} 
                  mt={-50}
                  position='relative'
                  style={styles.rotatedBox}
                  >
                
               <VStack  alignItems='center' alignContent='center'>
                
    {/* <Text> {email}</Text> */}

    {/* <Text>{displayName}</Text> */} 
    {/* fontfamily-'mono' for text and heading for header */}
    <Heading mt={58} fontSize='2xl' fontWeight='700' color='text.700'  > {data ? data.firstname +' ' +data.surname : null}</Heading>
    <Text fontSize='lg' fontWeight='200'  color='text.600'> {data ? data.skill || <Text fontSize='xs'>Add your Handwork</Text>:<Text fontSize='xs'>Add a Skill</Text> }</Text>
    <Text fontSize='sm' fontWeight='200'  color='text.600'>{data ? data.location || <Text fontSize='xs'>Add your Location</Text>:<Text fontSize='xs'>Add a Skill</Text> }</Text>
 
      
      <HStack space={2} 
       alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'
       w="90%"
       >
        <Button 
        
                  rounded="md"
                 onPress={() => {
                  navigation.navigate('MyAds');
                  }}
                  mt="5"
                  w="49%"
                  leftIcon={ <MaterialCommunityIcons name='file-table-box-multiple-outline' size={20}
                  color='#fff'/>}
                  
                  bg="#158e73"
                  colorScheme="emerald"
                >
                  
                  My Services
                 
                </Button>
                <Button
                  rounded="md"
                 
                  //props are passed to edit screen
                  onPress={() => 
                    navigation.navigate('Edit' , { value: data.number, locationRoute: data.location, aboutRoute:data.about, skillRoute:data.skill })
                    }
                  mt="5"
                  w="49%"
                  bg="white"
                  borderWidth= '0.3'
                  borderColor='#158e73'
                  colorScheme="dark"
                  leftIcon={ <Feather name='edit' color='#158e73' size={20}/>}
                   >
                   <Text color='#158e73'>
                     Edit Profile
                   </Text>
                 
                  
                </Button>
      </HStack>
      <Box h='45' w='90%'  mt={6} >
        <HStack  space={6}>
          <Box bg="#eff3f6" size={10} borderRadius={9}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='md-heart' type= "Octicons"size={22} color='#158e73' />
          </Box>
           <Heading fontSize='sm'fontWeight='600'  color='text.600'   mb='auto'mt='auto'>Liked By</Heading>
           <Heading fontSize='md' color='text.600' ml='auto'  mb='auto'mt='auto'>{favorited}</Heading>
        </HStack>
      </Box>
      
      <Box h='45' w='90%' 
      mt={1}>
       <HStack space={6}>
          <Box bg="#eff3f6" size={10} borderRadius={9}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='call-sharp' type= "Octicons"size={22} color='#158e73'/>
          </Box>
           <Heading fontSize='sm' color='text.600'  fontWeight='600'  
            mb='auto'mt='auto'>{data ? data.number : null}</Heading>
        </HStack>
      </Box>
      
      <Box h='45' w='90%' 
       mt={1}>
      <HStack space={6}>
          <Box bg="#eff3f6" size={10} borderRadius={9}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='ios-happy' type="Octicons" size={22} color='#158e73' />
          </Box>
           <Heading fontSize='sm' color='text.600' fontWeight='600'  mb='auto'mt='auto'>Feedbacks</Heading>
           <Heading fontSize='md' color='text.600' ml='auto'  mb='auto'mt='auto'>{feedbacks}</Heading>
        </HStack>
      </Box>
      
      <Box h='45' w='90%' borderColor= "#eee"
       mt={1}>
        <TouchableWithoutFeedback onPress={openModal} >
      <HStack  space={6}>
          <Box bg="#eff3f6" size={10} borderRadius={9}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='ios-person' type="Octicons" size={22} color='#158e73' />
          </Box>
           <Heading fontSize='sm' color='text.600'   mb='auto'mt='auto'>About Me</Heading>
           
           <Box mb='auto'mt='auto'  ml='auto'>
           <Ionicons 
          name='ios-chevron-forward' type="Octicons" size={22}  color='#475569'
            />
          </Box>
        </HStack>
        </TouchableWithoutFeedback>
      </Box>
      
      <Box h='45' w='90%'  mt={1} >
        <TouchableWithoutFeedback onPress={onShare} style={styles.rotatedBox}>
    <HStack space={6}>
          <Box bg="#eff3f6" size={10} borderRadius={9}
          alignItems="center" justifyContent="center" >
          <Ionicons 
          name='ios-share-social' type="Octicons" size={22} color='#158e73' />
          </Box>
           <Heading fontSize='sm' color='text.600' mb='auto'mt='auto'>Share Your Profile</Heading>
           
           <Box mb='auto'mt='auto'  ml='auto'>
           <Ionicons 
          name='ios-chevron-forward' type="Octicons" size={22}  color='#475569'
            />
          </Box>
        </HStack>
        </TouchableWithoutFeedback>
      </Box>
      <Box h='45' w='90%' borderColor= "#F8FAFB"
       >
         <TouchableWithoutFeedback onPress={()=> logout()}>
      <HStack mb='auto'mt='auto' space={6}>
        
          <Box bg="#eff3f6" size={10} borderRadius={9}
          alignItems="center" justifyContent="center" >

          <Ionicons 
          name='ios-exit' type="Octicons" size={22} color='#158e73' />
          </Box>
           <Heading fontSize='sm' color='danger.600'   fontWeight='400' mb='auto'mt='auto'>Log Out</Heading>
           
           <Box mb='auto'mt='auto'  ml='auto'>
           <Ionicons 
          name='ios-chevron-forward' type="Octicons" size={22}  color='#475569'
            />
          </Box>
        </HStack>
        </TouchableWithoutFeedback>

      </Box>
        </VStack>
      </Box>

   

                 </VStack>
                
                  <Box >
                   
   <ReusableModal visible={modalVisible} onClose={closeModal}>
  <ScrollView w='100%' >
    
    <Heading color='#158e73' fontSize="16" mb='4'>
      About Me
    </Heading>
          <Text fontSize="16"  fontWeight='400'color="gray.700" w='100%' textAlign='center'>
          {data ? data.about|| <Text>Let your customers know about you</Text>:<Text>Add an about me</Text>  }
          </Text>
       </ScrollView>
      </ReusableModal>
      </Box>



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
       
       </Actionsheet.Item>
     </Actionsheet.Content>
   </Actionsheet>
 </Center>
    </ScrollView>
   
    <Modal transparent={true} animationType="fade" visible={data? false: true} >

    <View style={styles.modal}>
    <StatusBar barStyle = "dark-content" hidden = {false}  backgroundColor="rgba(0, 0, 0, 0.4)" translucent = {true}/>
<Box bg="#eee" w='40%' h='10%' justifyContent="center" rounded='md'>
      <LoadState
        style={{ width: '30%', aspectRatio: 1 }}
        showAnimation={true}
        source={require('../assets/animation/spinner.json')}
      />
      </Box>
    </View>
  </Modal>
    
    
    </View>
  )
}
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  modal: {
    ...StyleSheet.absoluteFillObject, // This covers the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // semi-transparent background
  },
  rotatedBox: {
    zIndex: -82,
  },
  rotatedImage: {
  
    width: '100%',
  },

});



export default Profiles