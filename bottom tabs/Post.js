import React, { useState , useEffect } from 'react';
import { StyleSheet,  TouchableOpacity,  View ,} from 'react-native';
import {Box, FormControl, Input, ScrollView, TextArea, Image,Text,Button, Center, Avatar} from "native-base"
import DropDownCat from '../Components/DropDownCat';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker' 


const Post = () => {
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
const [button, setButton] = useState(false)
const [imageUri, setImageUri] = useState(null)
const [handlePermissions, setHandlePermissions] = useState(null)


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

const handleCategorySelection = (select) => {
  setCategory(select);

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

  
   console.log('user clicked council')
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
      console.log('images should not exceed 3')
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

  
   console.log('user clicked council')
  if (!result.canceled) {
    if(result.assets.length === 3) {
      console.log(result.assets.length)
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
      console.log(result.assets.length)
   setImageUri(uris)
   setErrorOutput({
    imageUri: null,

  });
    }

    else{
      setImageUri(result.assets.length)
      console.log('images should not exceed 3')
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
      if (Object.keys(errors).some((key) => errors[key] !== "")) {
        console.log(errors);
      } else {
        console.log(title, imageUri, price, story)
       
    
        
        setErrorOutput({
          title: null,
          imageUri: null,
          price: null,
          story: null,
          category: null,
        
        });
        return false
      }
    
    } catch (e) {
      
      console.log("Error validate " + e.message);
    return true

    }
  };
 



    return (
      <ScrollView  bg='#fff'  pt={5}  >

      <Box  >
        <Center width='90%' alignSelf='center' pb={40}>
        <FormControl mb="-3" isInvalid={errorOutput && errorOutput.category}>
          <FormControl.Label></FormControl.Label>
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
        <Input mt='-2' mb='3' zIndex='-999' rounded="md"  type ='text' borderColor='#ccc' keyboardType='default' _input={{bg:'#fff'}} _focus={{
      
      borderColor: "#158e73",
      borderWidth: "1px"
    }}  
    
    value={title}
    placeholder='Title'
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
    <Input  mt='-2' mb='3' rounded="md" type ='text' keyboardType='decimal-pad' borderColor='#ccc'zIndex= {-9999} _input={{bg:'#fff'}} _focus={{
      borderColor: "#158e73",
      borderWidth: "1px",
       }}  
      value={price}
      placeholder='price'
      onChangeText={(text) => setPrice(text)}
      />
       {errorOutput && errorOutput.price && (
                      <Text fontSize={9} mb="3.5" mt="-2.5" color="error.600">
                        {errorOutput.price}
                      </Text>
                    )}
  </FormControl>

  {/* <FormControl mt='1' rounded="md">
  <FormControl.Label  mb='-0.5'><Text color='text.600' fontSize='11'>Location</Text></FormControl.Label>
  <DropDownMenu onSelectState={handleStateSelection} location={location} onSelectCapital={handleCapitalSelection} />
   
  </FormControl> */}
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
  <TextArea mt='-4'  rounded="md" type ='text'  borderColor='#ccc' zIndex= {-9999}_input={{bg:'#fff'}} _focus={{
      borderColor: "#158e73",
      borderWidth: "1px"
       }}  
      value={story}
      // maxLength={maxLength}
      placeholder='story'
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
  
      <Button rounded="md"  mt="5" bg='#158e73' colorScheme='emerald' width='100%' onPress={onSubmit}>
        Post
      </Button>
      </Center>
          </Box>
          </ ScrollView>
    );
      
   

  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default Post;
