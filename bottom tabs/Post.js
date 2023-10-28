import { polyfillWebCrypto } from "expo-standard-web-crypto";

import React, { useState , useEffect } from 'react';
import { UserAuth } from '../context/context'
import {  v4  } from "uuid";
import {   Alert, TouchableOpacity, StyleSheet  } from 'react-native';
import { collection, query, where ,doc, setDoc, onSnapshot,serverTimestamp } from "firebase/firestore";
import { db , storage} from '../firebase';
import { ref , uploadBytesResumable, getDownloadURL,} from 'firebase/storage';
import {Box, FormControl, Input, ScrollView, TextArea, Image,Text,Button, Center,} from "native-base"
import DropDownCat from '../Components/DropDownCat';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker' 
import LoadState from "../Components/LoadState";
  polyfillWebCrypto();
const Post = ({navigation}) => {

const {user} = UserAuth();
const postID = v4();
const[name, setName]=useState('')
const [title, setTitle] = useState('')
const [ price, setPrice] = useState('')
const [story, setStory] = useState('')
const [category, setCategory] = useState('')
const [image, setImage] = useState([])
const [errorOutput, setErrorOutput] = useState({
  title: null,
  price: null,
  story: null,
  imageUri: null,
  
});
const maxLength = 200;

const [button, setButton] = useState(false)
const [imageUri, setImageUri] = useState(null)
const [handlePermissions, setHandlePermissions] = useState(null)
const [loading, setLoading]= useState(false)
const [loadingText, setLoadingText]= useState('')

useEffect(() => {
  
  if(!user){
    navigation.navigate("SignIn")
  }
  else{
    const q = query(collection(db, 'users'), where('userID', '==', user.uid));
  
        //The unsubscribe function returned by onSnapshot is used to 
        //remove the listener when the component unmounts, preventing memory leaks.
  
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
           
           
  
            setName(doc.data().firstname + ' '+ doc.data().surname)
          }
        });
  
        return () => {
          unsubscribe();
        };
  }
  
}, [user])


 /* this validate function, checks all the required fields for errors, 
 if any, it returns false   */
 const validate = () => {
  let errors = {};

  // Title validation
  if (!title) {
    errors.title = "Title is required";
  } else if (title.length < 10) {
    errors.name = "Title is too short";
  } 

  // Story validation
  if (!story) {
    errors.story = "Story is required";
   
  } 
 // Category validation
 if (!category) {
  errors.category = "Category is required";
 
} 

  //Price Validation
  if (!price) {
    errors.price = "Price is required";
   
  } 

  // Image validation
  if (!imageUri) {
    errors.imageUri = "Pick at least 1 image";
  }  else if(imageUri > 3) {
    errors.imageUri = "Images should not exceed 3";
  }

  setErrorOutput(errors);
  return errors;
};

const handleCategorySelection = (category) => {
  setCategory(category);

};


useEffect(() => {
  (async() =>{
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHandlePermissions(galleryStatus.status === 'granted');
  })()

  
}, []);
const pickImages = async (index) => {
  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 4],
    quality:0.5,
    allowsMultipleSelection:false,
    selectionLimit:3
    
  });

  if (!result.canceled) {
    if(result.assets.length <=3) {
      const uris = result.assets.map(item => item.uri);
      const newImages = [...image];
      newImages[index] = uris[0]; // Replace the image at the specified index
      setImage(newImages);
      setButton(false)
    }
    else{
      setImageUri(result.assets.length)
    }

  }
}
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 4],
    quality:0.5,
    allowsMultipleSelection:true,
    selectionLimit:3
    
  });

  
  if (!result.canceled) {
    if(result.assets.length === 3) {
      setButton(false)
       const uris = result.assets.map(item => item.uri);
       setImage([...image, ...uris]);
    setImageUri(uris)
    setErrorOutput({
      imageUri: null,
    });

    } 
    else if(result.assets.length <=2){
      const uris = result.assets.map(item => item.uri);
      setImage([...image, ...uris]);
      setButton(true)
   setImageUri(uris)
   setErrorOutput({
    imageUri: null,

  });
    }

    else{
      setImageUri(result.assets.length)
    }

  }
};

const buttonImg = async () => {
  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 4],
    quality:0.5,
    allowsMultipleSelection:false,
    selectionLimit:3
    
  });

  if (!result.canceled) {
    
       const uris = result.assets.map(item => item.uri);
       setImage([...image, ...uris]);
     
    setImageUri(uris)
  if(image.length>=2){
    setButton(false)
  }
  
  }
};







const removeImage = indexToRemove => {
  const updatedImages = image.filter((_, index) => index !== indexToRemove);
  setButton(true)
  setImage(updatedImages);
};

if (handlePermissions === false){
return <Text>No access to gallery</Text>
}  

 /*When this function is triggered, it runs the validate function first, 
  then succesfully submit user'scredentials if no errors are found*/
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validate();
    try {
     setLoading(true)
      if (Object.keys(errors).some((key) => errors[key] !== "")) {
        setLoading(false)
        return 
      } else {
        const storagePromises = image.map(async (image, index) => {
          const storageRef = ref(storage, `postImages/${postID}/pictures/image${index}`);
          const response = await fetch(image);
          const blob = await response.blob();
          const uploadTask = uploadBytesResumable(storageRef, blob);
  
          return new Promise(async (resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setLoadingText('Uploading ' + progress + '% ')
              }, 
             
              (error) => {
                reject(error); // Reject the promise if there's an error
              },
              async () => {
               
                try {
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                  resolve(downloadURL); // Resolve the promise with the download URL
                } catch (error) {
                  reject(error); // Reject the promise if there's an error
                }
              }
            );
          });
        });
  
        // Wait for all image uploads to complete
        const uploadedImageURLs = await Promise.all(storagePromises);
  
        // After uploading images and gettin the download url, we can use it below
        
        await setDoc(doc(db, 'posts',postID), 
          {
            postID,
            category,
            author: name,
            content:story,
            postImg:uploadedImageURLs,
            createdAt: serverTimestamp(),
            title,
            price,
            userID: user.uid
          }, {merge:true},
         
);


    
          setErrorOutput({
            title: null,
            imageUri: null,
            price: null,
            story: null,
            category: null,
          
          });
        
      }
      navigation.navigate('Home')
    setLoading(false)
    setName('')
    setTitle('')
    setPrice('')
    setStory('')
    setCategory('')
    setImageUri(null)
    setImage([])
    } catch (e) {
      
      Alert.alert("Error  ",  e.message);
    setLoading(false)

    }
  };
 



    return (
      <ScrollView  bg='#fff'  pt={5}  >

      <Box  >
        <Center width='90%' alignSelf='center' pb={40}>
        <FormControl mb="-3"mt={5} isInvalid={errorOutput && errorOutput.category} >
          
          <DropDownCat onSelectCategory={handleCategorySelection}/>
          {errorOutput && errorOutput.category && (
                      <Text fontSize={9} mb="3.5" mt="0.5" color="error.600">
                        {errorOutput.category}
                      </Text>
                    )}
          </FormControl>
         

          <FormControl mt='10' isInvalid={errorOutput && errorOutput.title} >
      <FormControl.Label ><Text color='text.600' fontSize='14' 
       position= 'absolute'
       bg='white'
       left= {15}
       top= {-15}
       zIndex= {999}
       paddingHorizontal= {8}
       >Title</Text></FormControl.Label>
        <Input mt='-2' mb='3' zIndex='-999' rounded="md"  type ='text'  borderWidth='0.4'
                      borderColor="#71797E" keyboardType='default' _input={{bg:'#fff', selectionColor:'#7FFFD4'}} _focus={{
      
      borderColor: "#158e73",
      borderWidth: "1px"
    }}  
    maxLength={75}
    numberOfLines={2}
    value={title}
    placeholder='I Will do....'
    onChangeText={(text) => {
    
        setTitle(text);
      
    }}
    />
     {errorOutput && errorOutput.title && (
                      <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                        {errorOutput.title}
                      </Text>
                    )}
      </FormControl>

      <FormControl mt={7} isInvalid={errorOutput && errorOutput.price}>
      <FormControl.Label><Text color='text.600' fontSize='14' 
       position= 'absolute'
       bg='white'
       left= {15}
       top= {-15}
       zIndex= {9999}
       paddingHorizontal= {8}>Price</Text></FormControl.Label>
    <Input  mt='-2' mb='3' rounded="md" type ='text' keyboardType='decimal-pad'  borderWidth='0.4'
                      borderColor="#71797E"zIndex= {-9999} _input={{bg:'#fff', selectionColor:'#7FFFD4'}} _focus={{
      borderColor: "#158e73",
      borderWidth: "1px",
       }}  
      value={price}
      placeholder='₦20000'
      onChangeText={(text) => setPrice(text)}
      />
       {errorOutput && errorOutput.price && (
                      <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                        {errorOutput.price}
                      </Text>
                    )}
  </FormControl>

  
  <FormControl alignItems='center' isInvalid={errorOutput && errorOutput.imageUri}>
    <FormControl.HelperText><Text fontSize='15' color='text.600' mb='5'>Upload Images of Your recent job</Text></FormControl.HelperText>
   <TouchableOpacity onPress={pickImage}> 
    <Center>
    {image.length !== 0  ? (
      <FormControl flexDirection='row'  w='100%'
     >
      {button ? (
      <TouchableOpacity onPress={buttonImg}>
        <Ionicons name='add-circle-sharp' size={50} color='#158e73' />
        <Text fontSize='10' width='80%'>Add more Images</Text>
      </TouchableOpacity>
    ) : null}
{image.map((uri, index) => (
  
      <Box 
      w='33%'
      flexGrow='1'
      key={index}
      > 
      
      <TouchableOpacity
              
              onPress={() => pickImages(index)}
            >
              <Image source={{ uri }} alt='images' w='20' h='20'  borderWidth='1'alignContent='center'
      alignItems='center'
      alignSelf='center'
      borderRadius='8'
      borderColor='#ccc' />
            </TouchableOpacity>
           <TouchableOpacity onPress={() => removeImage(index)} >
            <Box  opacity='0.5'>
            <Ionicons name='close-circle' size={25} color='red'
           />
           </Box>
           </TouchableOpacity> 
            
      </Box> 
      ))}
       
</FormControl>                     
                    ) :(
                      <>
                      <Box>
                      <Ionicons name='ios-images-outline' size={100} color='#ddd'/> 
                      </Box>
                      <Box position='absolute' alignSelf='flex-end' opacity='0.5'>
                      <Ionicons name='add-circle-sharp' size={40} color='#158e73'  /> 
                      </Box>
                      </>
                    )}
     
    </Center>
   </TouchableOpacity>
    
    {errorOutput && errorOutput.imageUri? (
                      <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                        {errorOutput.imageUri}
                      </Text>
                    ) :(<FormControl.HelperText><Text fontSize='15' color='#158e73'>Max 3 Images</Text></FormControl.HelperText>)}
  </FormControl>


  
  <FormControl mt='4'  isInvalid={errorOutput && errorOutput.story}>
    <FormControl.Label > <Text color='text.600' fontSize='14' 
       position= 'absolute'
       bg='white'
       left= {15}
       top= {-3}
       zIndex= {9999}
       paddingHorizontal= {8}>Short Story</Text></FormControl.Label>
  <TextArea mt='-4'  rounded="md" type ='text'   borderWidth='0.4'
                      borderColor="#71797E" zIndex= {-9999}_input={{bg:'#fff', selectionColor:'#7FFFD4'}} _focus={{
      borderColor: "#158e73",
      borderWidth: "1px"
       }} 
       InputRightElement={<Text >  { story ? maxLength - story.length:maxLength}</Text>} 
      value={story}
       maxLength={maxLength}
      placeholder='Write a short description of the image(s)'
      
      onChangeText={(text) => {
    
        setStory(text);
    }}
       />
     {errorOutput && errorOutput.story && (
                      <Text fontSize={9} mb="3"  color="error.600">
                        {errorOutput.story}
                      </Text>
                    )}
  </FormControl>
  
   <LoadState
          style={{ width: '30%',  aspectRatio: 1, marginTop:-15 }}
          showAnimation={loading}
          title= {loadingText }
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

          <Button rounded="md"  mt="24px" bg='#158e73' colorScheme='emerald' width='100%' onPress={onSubmit}>
          Post
        </Button>  
          </LoadState>
 
         
  
      </Center>
          </Box>
          </ ScrollView>
    );
      
   

  
};


export default Post;
const styles = StyleSheet.create({
  text: {
   fontSize:14,
  marginTop:-25,
  // fontFamily:'Poppins-Regular'

  }
});