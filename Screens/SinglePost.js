/* eslint-disable react/prop-types */

import React, {useState, useEffect, useRef}from 'react'
import { ScrollView,TouchableOpacity ,Animated,
  Alert, FlatList,StyleSheet,Linking} from 'react-native';
import { Box, Text, VStack,Heading, Avatar, Button, TextArea} from 'native-base'
import { UserAuth } from '../context/context'
import Ionicons from '@expo/vector-icons/Ionicons';
import SlideItem from '../Helpers/SlideItem';
import Pagination from '../Helpers/Pagination';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { collection, query, where , onSnapshot , 
  serverTimestamp, doc, addDoc,  updateDoc,
  arrayUnion,orderBy,getDocs,deleteDoc ,arrayRemove} from "firebase/firestore";
import { db } from '../firebase';
import {  useIsFocused } from '@react-navigation/native';
import LoadState from '../Components/LoadState';



const SinglePost = ({navigation, route}) => {
    const { category, location, price, content,postAuthorID,
       name, createdAt, Img, postTitle,number,postID,
       profilePic, userSkill} = route.params
       const [isModalVisible, setModalVisible] = useState(false);

       const [index, setIndex] = useState(0);
       const[comment, setComment]=useState('')
       const[commentData, setCommentData]=useState([])
        const [imgSrc, setImgSrc] = useState('');
        const [userName, setUserName] = useState('');
        const isFocused = useIsFocused();
        const [loading, setLoading]= useState(false)
       const scrollX = useRef(new Animated.Value(0)).current;  
       const[docREF, setDocREF] = useState(null)
       const {user} = UserAuth()
       const Images = Img.map((url, index) => ({
        id: index, // You can use a unique identifier for each object
        imageUrl: url,
      }));
      
    
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
       
          setImgSrc({ uri: doc.data().userImg });
          setUserName(doc.data().firstname + ' '+ doc.data().surname)
       
      }
    });

    return () => {
      unsubscribe();
    };
  }
}, [isFocused, user]);

useEffect(() => {
  const fetchData = async () => {
  const commentCollectionRef = collection(db, 'posts' ,"comments", postID);
  const commentQuery = query(commentCollectionRef, orderBy('createdTime', 'desc'));
  const commentQuerySnapshot = await getDocs(commentQuery);


  const commentData = [];
        commentQuerySnapshot.forEach((doc) => {
          commentData.push({ id: doc.id, ...doc.data() });
        })
        setCommentData( commentData)
      }
      

  const commentCollectionRef = collection(db, 'posts' ,"comments", postID);
  const unsubscribeComment = onSnapshot(commentCollectionRef, fetchData);
  return () => {
    // Unsubscribe from the listeners when the component unmounts
    unsubscribeComment();
  };
}, [])




      const handleOnScroll = event => {
        Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )(event);
      };
    
      const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
        if (viewableItems.length > 0) {
          setIndex(viewableItems[0].index);
        }
      }).current;
    
      const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
      }).current;
    
      const dial =  (number) => {
        Linking.openURL(`tel:${number}`)
       }
        
       const handleComment = async () =>{
        
        if (user) {
          if(comment === "")
          {
            Alert.alert("feedback can not be blank");
            return false
          }
          else{
            try {
              setLoading(true)
              const docRef = await addDoc(collection(db, "posts", "comments", postID), {
                commentID:postID,
                userID:user.uid,
                comment,
               createdTime: serverTimestamp(),
                imgSrc,
                userName
              });
              
             setDocREF(docRef.id)
             setLoading(false)
        const postRefs = doc(db, "posts", postID);

              
              await updateDoc(postRefs, {
                comments: arrayUnion(docRef.id),
              });
              setComment('')

            } catch (error) {
             Alert.alert('Error:',error)
             setLoading(false)
            }
           
          }
         
        
        }
        else {
          navigation.navigate('SignIn')
          
         
          return false
        }
       }
       const handleDelete = (commentID) => {
        // Show a confirmation dialog
        Alert.alert(
          'Delete Confirmation',
          'Are you sure you want to delete this Comment?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => {
                // Handle the delete action here
                // Put your delete logic here
                deleteComment(commentID)
                
              },
              style: "destructive",
            },
          ],
          { cancelable: false } // Prevent the user from dismissing the dialog by tapping outside of it
        );
      };
      const deleteComment = (commentID)=>{
        Alert.prompt
        const commentCollectionRef = doc(db, 'posts', "comments",postID, commentID);
        const postRefs = doc(db, "posts", postID);

              
               updateDoc(postRefs, {
                comments: arrayRemove(docREF),
              });
        // Delete the document
        deleteDoc(commentCollectionRef)
          
          .catch((error) => {
            Alert.alert('Error deleting post: ', error);
          });
       }
       
       const  imageView =(item) =>{
        return (
          <Modal visible={true} transparent={true}>
              <ImageViewer imageUrls={item}/>
          </Modal>
      )
       }

       const renderArrow =() =>{
        return(
           <Ionicons name='close-sharp' color="#fff" size={42} onPress={() => setModalVisible(false)}
          />
        )
        } 
        const handleImagePress = () => {
          // Open modal or perform any action you want when the image is pressed
          // For example, you can set a state to show the modal
          setModalVisible(true);
        };
  return (
   <ScrollView >
    <VStack my={10}  justifyContent='center' alignSelf='center' w='95%'>

    
    <Box backgroundColor='rose.300'  borderRadius='4' alignSelf='center'ml='auto' mb={1} >
            <Text fontSize='14'color='#000' px={1} > {createdAt.toDate().toDateString()}</Text> 
                
            </Box>
        <Box mb={5}   >
        <FlatList  style={{  
        // Without height undefined it won't work
        height: "auto",
        width:'100%',
       resizeMode:"contain",
       borderRadius:20,
       borderWidth:1,
       borderColor:'#ccc',
       
        aspectRatio: 3 / 2, }}
        data={Images}
        renderItem={({item}) => 
        <SlideItem item={item} onPress={imageView(item.imageUrl)} />
       }
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Images} scrollX={scrollX} index={index} />

        </Box>
        <Box w='90%' justifyContent='center' alignSelf='center'>
          <Heading fontSize='24px' lineHeight='33.6px' color='text.600' mb='16px'>
            {postTitle}
          </Heading>
          {/* category highlight */}
          <Box  justifyContent='space-between' flexDirection='row' mb='8px' w='100%'>
             <Box  backgroundColor='violet.300'  borderRadius='4' alignSelf='center' 
          > 
            <Text fontSize='10px' lineHeight='15px'color='#000' >  {category}</Text> 
            </Box> 
           <Heading fontSize='23' color='#158e73'> ₦{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Heading>
          </Box>
         <Box mb='23px'>
            <Text fontSize='14px' lineHeight='21px' color='text.600'>
            {content}
            
            </Text>
         </Box>

         <Box flexDirection='row' justifyContent='flex-start' alignContent='center' mb='24px'>
            <Box >
            <TouchableOpacity onPress={handleImagePress}>
            <Avatar bg="gray.300" alignSelf="center" justifyContent='center' size="16"
             alt='profile pic'   source={{uri: profilePic}}
                >
          avatar
        </Avatar>
        </TouchableOpacity>
        <Modal visible={isModalVisible} transparent={true} 
       
       onRequestClose={() => setModalVisible(false)}>
      
  <ImageViewer imageUrls={[{ url: profilePic }]} onCancel={() => setModalVisible(false)} 
  renderHeader={renderArrow}
  saveToLocalByLongPress={true} 
  failImageSource={{category}}
 
  />
      </Modal>
            </Box>
            <Box   >
               <Box ml={4} >
                <Heading fontSize='16px'
               lineHeight='24px' >{name } </Heading> 
               <Text fontSize='10px' lineHeight='15px' >{userSkill }</Text>
               <Box borderRadius='4' px={1} backgroundColor='coolGray.300'>
              <Text fontSize='12px' lineHeight='15px'>{location}</Text>  
            </Box>
                </Box>
               
            </Box>
          
         </Box>


                      <Box  >
                      {!user || user.uid != postAuthorID ? (
                        <Box flexDirection='row' w='100%' justifyContent='space-between' mb='30px'
                        alignSelf='center'>
                      <Button  onPress={() => {
                        // eslint-disable-next-line react/prop-types
                     user? navigation.navigate("MessageMenu", {
                      fname: name,
                      fprofilePic: profilePic,
                      fpostAuthorID: postAuthorID
                    }):navigation.navigate("SignIn")
                      }}
                      leftIcon={<Ionicons name='chatbox' color='#fff' size={20}/>}
                      w='45%'
                      rounded="md"
                      bg="#158e73"
                      colorScheme="emerald">
                            Message
                      </Button>
                      <Button onPress={() =>
                        dial(number)
                      }
                      leftIcon={<Ionicons name='call' color='#36454F' size={20}/>}
                       w='45%'
                      rounded="md"
                      bg="white"
                    borderWidth= '0.3'
                      
                      
                      colorScheme="dark">
                      <Text color='black'> call</Text> 
                      </Button>
                      </Box>
                      ):(
                        null
                      )}

<Box>
  {commentData.length === 0 ?
   null
  :
  <Heading fontSize='13' color='#36454F' mb={2}>Feedback</Heading>}
  
<FlatList
     data={commentData}
     showsHorizontalScrollIndicator={false}
     keyExtractor={(item, index) => `${item.commentID}-${index}`}
     renderItem={({ item }) => 
     <Box justifyContent='space-between'
    mb='22px'
      mr={4}
       bg='#fff'
       p='4'
       w= {commentData.length === 1?'83%' : 64}
       borderWidth='0.3'
        borderRadius='10'
        borderColor='#36454F'
      > 
      <Box mb={4}>
      <Box flexDirection='row' justifyContent='flex-start' alignItems='center' mb={4}>
            <Box >
            <Avatar bg="gray.300" alignSelf="center" justifyContent='center' size="8"
             alt='profile pic'   source={item.imgSrc}
                >
          avatar
        </Avatar>
            </Box>
            <Box   >
               <Box ml={2} >
                <Heading fontSize='14'
               lineHeight='15' >{item.userName } </Heading> 
                </Box>
               
            </Box>
          
         </Box>
     <Text textAlign='justify' fontSize='12' > {item.comment}</Text>
     </Box>
     <Box flexDirection='row' justifyContent='space-between' alignItems='center' >
     {!user || user.uid != item.userID ? ""
     : 
    <Box >
      <TouchableOpacity  onPress={() =>
                        handleDelete(item.id)
                      }>

                          <Box
                          flexDirection="row"
                          justifyContent="space-evenly"
                          alignItems="center"
                         >
                          <Ionicons name="trash-bin-outline" color="#36454F" size={16} />
                          <Text textAlign="center" color="danger.600" fontSize="13">
                        {" "}
                        delete
                      </Text>
                        </Box>
                        
                      </TouchableOpacity>
      </Box> 
      }
      
          <Box>
     <Text color='#808080' fontSize='10' >
      {item.createdTime ? item.createdTime.toDate().toDateString() : null}
          </Text>
          </Box>
      </Box>
      </Box>
      }
     horizontal
   />
</Box>

{!user || user.uid != postAuthorID ? (
                      <Box mt='24px'>
                      <TextArea   rounded="md"
                      placeholder='Leave a feedback...'
                      size='sm'
                    borderWidth= '1'
                    borderColor='#36454F'
                    borderStyle='dashed'
                     _focus={{
                      borderColor: "#158e73",
                      borderWidth: "1px"
                    }}
                     h={16}
                     variant='rounded'
                     value={comment}
                     onChangeText={(text) => setComment(text)}
                    />
                     
                  <LoadState  style={{ width: '30%',  aspectRatio: 1, marginTop:-5 }}
          showAnimation={loading}
          title= {'No post yet.' }
         
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

                          <Button
                        rounded="md"
                      
                        mt="3"
                        bg="#158e73"
                        colorScheme="emerald"
                        onPress={handleComment}
                      >
                        
                          Leave Feedback
                          </Button>
                  </LoadState>
                     
                      </Box>
)
:(
null
)}
                      </Box>
                    

</Box>
        
    </VStack>
   </ScrollView>
  )
}

export default SinglePost


const styles = StyleSheet.create({
    container: {
        width: '100%',
        // Without height undefined it won't work
        height: "auto",
       resizeMode:"contain",
       borderRadius:20,
       borderWidth:1,
       borderColor:'#ccc',
        aspectRatio: 3 / 2,
    },
    dot: {
        width: 19,
        height: 9,
        borderRadius: 6,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
        opacity:0.4
      },
      dotActive: {
        backgroundColor: '#000',
      }
    
  });