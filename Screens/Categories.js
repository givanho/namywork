import {
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    Linking,
    StyleSheet
  } from "react-native";
import React, {useState, useEffect} from 'react'
import {
    Box,
    Image,
    View,
    Text,
    HStack,
    VStack,
    
    Heading,
    
  } from "native-base";
  import { Ionicons } from "@expo/vector-icons";
import { UserAuth } from '../context/context';
import LoadState from "../Components/LoadState";
import {
    orderBy,
    collection,
    getDocs,
    doc,
    onSnapshot,
    updateDoc,
    arrayRemove,
    arrayUnion,
    query,
    deleteDoc ,
    
  } from "firebase/firestore";
  import { db, storage } from "../firebase";
  import { ref, listAll, deleteObject } from 'firebase/storage';

const Categories = ({navigation, route}) => {
    const { category} = route.params
    const {user} = UserAuth()
  const [adList, setAdList] = useState([]);

    const[likes, setLikes] = useState(userLikes)
    const[userLikes, setUserLikes] = useState(false)
    const [error, setError] = useState(null)
    const [triggerFetch, setTriggerFetch] = useState(0);
  const [privatePic, setPrivatePic ] = useState('')


    useEffect(() => {
        const fetchData = async () => {
          try {
            setError(null)
            const postsCollectionRef = collection(db, 'posts');
            
            const userQuerySnapshot = await getDocs(collection(db, "users"));
    
            // Extract postIDs directly from the postQuerySnapshot
            const postQuery = query(postsCollectionRef, orderBy('createdAt', 'desc'));
            const postQuerySnapshot = await getDocs(postQuery);
    
    
    
            const postData = [];
            postQuerySnapshot.forEach((doc) => {
              postData.push({ id: doc.id, ...doc.data() });
            });
            
            const userData = [];
            userQuerySnapshot.forEach((doc) => {
              userData.push({ id: doc.id, ...doc.data() })
            
            
            });
    
            const updatedPostData = await Promise.all(
              postData.map(async (post) => {
                const matchingUser = userData.find(
                  (user) => user.userID === post.userID
                 
                );
               
                if (matchingUser) {
                  const location = matchingUser.location;
                  const userImg = matchingUser.userImg;
                  const skill = matchingUser.skill;
                  const number = matchingUser.number;
    
                  let liked = false;
    
                  if (user?.uid) {
                    // Check if the post has a likes array
                    if (post.likes && Array.isArray(post.likes)) {
                      liked = post.likes.includes(user.uid);
                    }
                  }
                  setUserLikes(liked)
                  return { ...post, location, userImg, skill, liked, privatePic, number };
                }
                return post;
              })
            );
    
            setAdList(updatedPostData);
          } catch (error) {
           setError('error loading Posts: ',error)
          
          }
          
        };
    
        // Use onSnapshot to listen for real-time updates to 'posts' and 'users' collections
        const postsCollectionRef = collection(db, "posts");
        const usersCollectionRef = collection(db, "users");
    
        const unsubscribePosts = onSnapshot(postsCollectionRef, fetchData);
        const unsubscribeUsers = onSnapshot(usersCollectionRef, fetchData);
    
    
        if (triggerFetch > 0) {
          unsubscribePosts();
          unsubscribeUsers();
          setTriggerFetch(0); // Reset the trigger
        }
    
        return () => {
          // Unsubscribe from the listeners when the component unmounts
          unsubscribePosts();
          unsubscribeUsers();
        };
    
         // Only fetch data when triggerFetch changes
         
      }, [user, triggerFetch]);
      const categoryList = adList.filter((post) => post.category == category);
    
// Function to handle liking/unliking a post
  const handleLikeToggle = async (postId, liked) => {

    if (!user) {
      // Handle the case where the user is not authenticated

      navigation.navigate("SignIn");
      return;
    }
  
    const postRef = doc(db, "posts", postId);

    try {
      
      if (liked) {
        setLikes(false)
        // If the user already liked the post, remove their like
        await updateDoc(postRef, {
          likes: arrayRemove(user.uid),
        });
      } else {
        setLikes(true)
        // If the user hasn't liked the post, add their like
        await updateDoc(postRef, {
          likes: arrayUnion(user.uid),
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Error liking post');
    } 
  };

//   const fetchNewData = () => {
//     setTriggerFetch((prev) => prev + 1); // Increment triggerFetch to re-run useEffect
//   };

    const dial =  (number) => {
        Linking.openURL(`tel:${number}`)
       }
      
       const handleDelete = (postID) => {
        // Show a confirmation dialog
        Alert.alert(
          'Delete Confirmation',
          'Are you sure you want to delete this item?',
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
                deletePost(postID)
                console.log('Item deleted');
              },
              style: "destructive",
            },
          ],
          { cancelable: false } // Prevent the user from dismissing the dialog by tapping outside of it
        );
      };
       
    
       const deletePost = (postID) =>{
        Alert.prompt
        const imageRef = ref(storage, "postImages/" + postID + "/pictures");
        async function deleteFolderContents(imageRef) {
          try {
            // List all items (files and subfolders) in the folder
            const items = await listAll(imageRef);
        
            // Delete each item in the folder
            const deletePromises = items.items.map(async (item) => {
              if (item.isDirectory) {
                // If it's a subfolder, recursively delete its contents
                await deleteFolderContents(item);
              } else {
                // If it's a file, delete it
                await deleteObject(item);
              }
            });
          // Wait for all deletion promises to complete
          await Promise.all(deletePromises);
    
          console.log('Folder and its contents deleted successfully');
        } catch (error) {
          console.error('Error deleting folder and its contents: ', error);
        }
      }
        
        // Call the function to delete the folder and its contents
        deleteFolderContents(imageRef);
        deletePostData(postID)
       }
       const deletePostData = (postID)=>{
        const postDocRef = doc(db, 'posts', postID);
    
        // Delete the document
        deleteDoc(postDocRef)
          .then(() => {
            console.log('Post deleted successfully', postID);
          })
          .catch((error) => {
            console.error('Error deleting post: ', error);
          });
       }
    

  return (
    <View>
        {categoryList.length === 0 ? 
         <LoadState
         style={{ width: '100%',  aspectRatio: 1, marginTop:5 }}
         showAnimation={true}
         title={'This Category is empty.'}
         source={require('../assets/animation/astro.json')}>
         </LoadState> : 
          <FlatList
          showsVerticalScrollIndicator={false}

          data={categoryList} // Pass the filtered posts as data
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => (
            <Heading color='#36454F' ml={2}mt={4} 
            fontSize='16'
            isTruncated
            maxW="300"
            w="80%"
            noOfLines={2}>{category}</Heading>
          )}
          renderItem={({ item }) => (
            <View mt='5'  backgroundColor='#F3F5F6'>
          

          <VStack mb={6}>
         
      
            {/* start of the view */}
            <TouchableWithoutFeedback
              onPress={() => {
                // eslint-disable-next-line react/prop-types
                navigation.navigate("Details", {
                  category: item.category,
                  location: item.location,
                  price: item.price,
                  content: item.content,
                  postID: item.postID,
                  name: item.author,
                  createdAt: item.createdAt,
                  Img: item.postImg,
                  postTitle: item.title,
                  profilePic: item.userImg,
                  userSkill: item.skill,
                  number: item.number,
                  postAuthorID: item.userID
                });
              }}
            >
              <VStack
                borderWidth='0.4'
                borderColor="#71797E"
                bg="#fff"
                borderRadius="10"
                w="95%"
                alignItems="center"
                justifyContent="center"
                mb={3}
                alignSelf="center"
                alignContent="center"
              >
                <HStack>
                  <Image
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="center"
                    alignContent="center"
                    source={item ? { uri: item.postImg[0] } : null}
                    alt="Post Pic"
                    flex={1}
                    borderLeftRadius="10"
                    size="100%"
                    resizeMode="cover"
                  />
                  <View
                    bg="#fff"
                    w="55%"
                    borderRightRadius="10"
                    justifyContent="center"
                    mt={1}
                  >
                    {/* date and heart */}
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      ml={4}
                      mr={4}
                      alignItems="center"
                    >
                      <Text fontSize="9">
                        {item &&
                        item.createdAt &&
                        item.createdAt.toDate &&
                        typeof item.createdAt.toDate === "function"
                          ? item.createdAt.toDate().toDateString()
                          : "waiting..."}
                      </Text>

                      {user && user.uid === item.userID ? null : (
                        <TouchableOpacity
                          onPress={() =>
                            handleLikeToggle(item.postID, item.liked)
                           
                          }
                          
                        >
                         {/* {likes ? <Ionicons name="heart" size={24} color="#F58989"/> :  <Ionicons
                              name="heart-outline"
                              size={24}
                              color="#158e73"
                            />}   */}
                          {item.liked ? (
                            <Ionicons name="heart" size={24} color="#F58989" />
                          ) : (
                            <Ionicons
                              name="heart-outline"
                              size={24}
                              color="#158e73"
                            />
                          )}
                        </TouchableOpacity>
                      )}
                    </Box>

                    {/* text title */}
                    <Text
                      fontSize="13"
                      ml={4}
                      isTruncated
                      maxW="300"
                      w="80%"
                      noOfLines={2}
                    >
                      {item ? item.title : "waiting..."}
                    </Text>

                    {/* text category and price */}
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      mx={3}
                      my={2}
                    >
                      <Box
                        backgroundColor="emerald.200"
                        borderRadius="4"
                        alignSelf="center"
                        isTruncated
                        maxW="300"
                        w="50%"
                      >
                        <Text
                          fontSize="11"
                          color="#000"
                          isTruncated
                          maxW="300"
                          w="100%"
                          pl={1}
                          pr={1}
                        >
                          {" "}
                          {item ? item.category : "waiting..."}
                        </Text>
                      </Box>

                      <Heading fontSize="17" color='#36454F'>
                        ₦{" "}
                        {item
                          ? item.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "waiting..."}{" "}
                      </Heading>
                    </Box>

                    {/* location */}
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      mx={3}
                      alignItems="center"
                    >
                      <Ionicons
                        name="location-sharp"
                        color="#158e73"
                        size={15}
                      />
                      <Text fontSize="12">
                        {" "}
                        {item
                          ? item.location || "no location"
                          : "waiting.."}{" "}
                      </Text>
                    </Box>
                  </View>
                </HStack>
                <HStack
                  
                  w="100%"
                  h={12}
                  alignItems="center"
                  alignContent="center"
                  justifyContent="space-between"
                >
                  {/* message or edit button */}
                  <Box w="40%" ml={3} pt={3} borderTopWidth="1"
                  borderTopColor="emerald.600">
                    {!user || user.uid != item.userID ? (
                      <TouchableOpacity  onPress={() => {
                        // eslint-disable-next-line react/prop-types
                     user?   navigation.navigate("MessageMenu", {
                          fname: item.author,
                          fprofilePic: item.userImg,
                          fpostAuthorID: item.userID
                        }):navigation.navigate("SignIn")
                      }}>
                        <Box
                          flexDirection="row"
                          justifyContent="space-evenly"
                          alignItems="center"
                        >
                          <Ionicons
                            name="send-sharp"
                            color="#158e73"
                            size={20}
                          />
                          <Text
                            textAlign="center"
                            color="#158e73"
                            fontSize="13"
                          >
                            {" "}
                            Message
                          </Text>
                        </Box>
                      </TouchableOpacity>
                    ) : (
                      <Text textAlign="center" color="#158e73" fontSize="13">
                        {" "}
                        Edit
                      </Text>
                    )}
                  </Box>

                  

                  {/* call or delete button */}
                  <Box w="40%" mr={3} pt={3} borderTopWidth="1"
                  borderTopColor="cyan.300">
                    {!user || user.uid != item.userID ? (
                      <TouchableOpacity  onPress={() =>
                        dial(item.number)
                      }>
                        <Box
                          flexDirection="row"
                          justifyContent="space-evenly"
                          alignItems="center"
                        >
                          <Ionicons name="call-sharp" color="#36454F" size={20} />
                          <Text textAlign="center" color="#000" fontSize="13">
                            {" "}

                            Call
                          </Text>
                        </Box>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity  onPress={() =>
                        handleDelete(item.postID)
                      }>

                          <Box
                          flexDirection="row"
                          justifyContent="space-evenly"
                          alignItems="center"
                         >
                          <Ionicons name="trash-bin-sharp" color="#36454F" size={20} />
                          <Text textAlign="center" color="danger.600" fontSize="13">
                        {" "}
                        delete
                      </Text>
                        </Box>
                        
                      </TouchableOpacity>
                      
                    )}
                  </Box>
                </HStack>
              </VStack>
            </TouchableWithoutFeedback>
            
          </VStack>
          
          </View>
          )}
        /> }
   
  </View>
  )
}

export default Categories