/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { polyfillWebCrypto } from "expo-standard-web-crypto";
import { Ionicons } from "@expo/vector-icons";
import LoadState from "../Components/LoadState";
import {
  Box,
  Image,
  View,
  Text,
  HStack,
  VStack,
  
  Heading,
  
} from "native-base";
import {
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet
} from "react-native";
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

import { UserAuth } from "../context/context";

polyfillWebCrypto();

const Home = ({ navigation }) => {
  const [adList, setAdList] = useState([]);

  const { user } = UserAuth();
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
        // If the user already liked the post, remove their like
        await updateDoc(postRef, {
          likes: arrayRemove(user.uid),
        });
      } else {
        // If the user hasn't liked the post, add their like
        await updateDoc(postRef, {
          likes: arrayUnion(user.uid),
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Error liking post');
    } 
  };

  const fetchNewData = () => {
    setTriggerFetch((prev) => prev + 1); // Increment triggerFetch to re-run useEffect
  };
  



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
   


      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={{marginRight:15}} onPress={() => {
            // eslint-disable-next-line react/prop-types
            navigation.navigate("Search", {
              adList: adList,
            
            });
          }}
          >
      <Ionicons  name='search-outline' color='#fff' size={28} />
      </TouchableOpacity>
        ),
      }); 
 
const onPressHandler = (item) => {
    navigation.navigate('Category',{
      adList:adList,
      category:item
    });
   
  };
  
  return (
    <View h="100%" backgroundColor='#F3F5F6'>
     
 
      <FlatList
        data={adList}
        keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <Box mt={10}>
          <Heading color='#36454F' ml={2}>Categories</Heading>
          <Box
            width="95%"
            alignSelf="center"
            mb={10}
            margin={3}
            flexDirection="row"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <TouchableOpacity style={styles.category} onPress={() => onPressHandler("Alluminum Doors & Windows Installation")}>
            <Box
             
              alignItems="center"
            >
              <Image
                source={require("../assets/category/door.png")}
                alt="door"
                size="10"
                mt="1"
                mb={3}
                resizeMode="contain"
              />

              <Text fontSize="12" numberOfLines={2} mb={3} color="#000">
                Alluminum Doors & Windows Installation
              </Text>
            </Box>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Auto-Mechanic")}>
            <Box
             
              alignItems="center"
            >
              <Image
                source={require("../assets/category/mechanic.png")}
                alt="car"
                size="10"
                mb={3}
                resizeMode="contain"
              />

              <Text mb={3} color="#000">
                Auto Mechanic
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category } onPress={() => onPressHandler("Carpenter")}
           
           >
            <Box
            alignItems="center"
             
              
            >
              <Image
                source={require("../assets/category/carpenter.png")}
                alt="carpenter"
                size="10"
                resizeMode="contain"
                mb={3}
              />

              <Text mb={3} color="#000">
                Carpenter
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => onPressHandler("CCTV Installation")}>
            <Box
             
              alignItems="center"
            >
              <Image
                source={require("../assets/category/cctvInstaller.png")}
                alt="cctv"
                size="10"
                mb={3}
                resizeMode="contain"
              />

              <Text mb={3} color="#000">
                CCTV Installer
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Event Planner")}>
            <Box
             
              alignItems="center"
            >
              <Image
                source={require("../assets/category/eventplanner.png")}
                alt="calendar"
                size="12"
                resizeMode="contain"
                mb={3}
              />

              <Text mb={3} color="#000">
                Event Planner
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => onPressHandler("Floor Tiling & P.O.P Installation")}>
            <Box
             
              alignItems="center"
            >
              <Image
                source={require("../assets/category/teamworkcrop.png")}
                alt="floor-work"
                size="10"
                mb={3}
                resizeMode="contain"
              />

              <Text numberOfLines={2} mb={2} fontSize="12" color="#000">
                Floor Tiling & P.O.P Installation
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => onPressHandler("Food & Restaurant")}>
            <Box
             
              alignItems="center"
            >
              <Image
                source={require("../assets/category/workercut.png")}
                alt="chef"
                size="12"
                mb={3}
                resizeMode="contain"
              />

              <Text numberOfLines={2} fontSize="12" mb={3} color="#000">
                Food & Restaurant
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => onPressHandler("Gardener")}>
            <Box
           
              alignItems="center"
            >
              <Image
                source={require("../assets/category/gardener.png")}
                alt="gardener"
                size="12"
                mb={3}
                resizeMode="contain"
              />

              <Text mb={3} color="#000">
                Gardener
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => onPressHandler("Hair Stylist")}>
            <Box
           
              alignItems="center"
            >
              <Image
                source={require("../assets/category/hairstyle.png")}
                alt="hairstyle"
                size="10"
                resizeMode="contain"
                mb={3}
              />

              <Text mb={3} color="#000">
                Hair Stylist
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => onPressHandler("HandBag, Beads, Crotchet making etc")}>
            <Box
            
              alignItems="center"
            >
              <Image
                source={require("../assets/category/handbag.png")}
                alt="handbag"
                size="10"
                resizeMode="contain"
                mb={3}
              />

              <Text numberOfLines={2} fontSize="12" mb={3} color="#000">
                HandBag, Beads, Crotchet making etc
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Instrumentalist")}>
            <Box
             
              alignItems="center"
            >
              <Image
                source={require("../assets/category/instrumentalist.png")}
                alt="instrumentalist"
                mb={1}
                size="16"
                resizeMode="contain"
              />

              <Text mb={3} color="#000">
                Instrumentalist
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Make-Up, Nails and Eyelashes")}>
            <Box
             
              alignItems="center"
            >
              <Image
                source={require("../assets/category/makeup.png")}
                alt="makeup"
                size="10"
                resizeMode="contain"
                mb={3}
              />

              <Text mb={3} color="#000">
                Make-Up, Nails and Eyelashes
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Painter")}>
            <Box
              alignItems="center"
            >
              <Image
                source={require("../assets/category/paintbrush.png")}
                alt="brush"
                size="10"
                resizeMode="contain"
                mb={3}
              />

              <Text mb={3} color="#000">
                Painter
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Phone and Laptop Repair")}>
            <Box
             alignItems="center"
            >
              <Image
                source={require("../assets/category/phonerepair.png")}
                alt="phone"
                size="10"
                resizeMode="contain"
                mb={3}
              />

              <Text fontSize="13" mb={3} color="#000">
                Phone & Laptop repairer
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler ("Photographer")}>
            <Box
             alignItems="center"
            >
              <Image
                source={require("../assets/category/photogrphy.png")}
                alt="camera"
                size="12"
               
                resizeMode="contain"
              />

              <Text mb={3} color="#000">
                Photographer
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => onPressHandler("Plumber")}>
            <Box
             
              alignItems="center"
            >
              <Image
                source={require("../assets/category/productionlight.png")}
                alt="plumber"
                size="10"
                mb={3}
                resizeMode="contain"
              />

              <Text mb={3} color="#000">
                Plumber
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Solar Power Installation")}>
            <Box
            alignItems="center"
            >
              <Image
                source={require("../assets/category/solarpanel.png")}
                alt="solar"
                size="10"
                mb={3}
                resizeMode="contain"
              />

              <Text mb={3} color="#000">
                Solar Power Installation
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Tailoring & Fashion")}>
            <Box
            alignItems="center"
            >
              <Image
                source={require("../assets/category/fashiondesign.png")}
                alt="fashion"
                size="10"
                mb={3}
                resizeMode="contain"
              />

              <Text mb={3} color="#000">
              Tailoring & Fashion
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Wallpaper Installation")}>
            <Box
           alignItems="center"
            >
              <Image
                source={require("../assets/category/wallpaper.png")}
                alt="wallpaper"
                size="10"
                resizeMode="contain"
                mb={3}
              />

              <Text mb={3} color="#000">
                Wallpaper Installation
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Welder")}>
            <Box
             alignItems="center"
             
            >
              <Image
                source={require("../assets/category/welder.png")}
                alt="welder"
                size="10"
                resizeMode="contain"
                mb={3}
              />

              <Text mb={3} color="#000">
                Welder
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Wristwatch Repair")}>
            <Box
           alignItems="center"
            >
              <Image
                source={require("../assets/category/watch.png")}
                alt="watch"
                size="10"
                resizeMode="contain"
                mb={3}
              />

              <Text mb={3} color="#000">
                Wrist Watch Repairer
              </Text>
            </Box>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}onPress={() => onPressHandler("Others")}>
            <Box
           alignItems="center"
            >
              <Image
                source={require("../assets/category/others.png")}
                alt="others"
                size="10"
                resizeMode="contain"
                mb={3}
              />

              <Text mb={3} color="#000">
                Others
              </Text>
            </Box>
            </TouchableOpacity>
          </Box>

          <Heading color="#36454F"ml={2} >All Services</Heading>
      {adList.length === 0 ?  <LoadState
          style={{ width: '30%',  aspectRatio: 1, marginTop:-5 }}
          showAnimation={true}
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
          }
          >
{error ?<Box alignItems='center' ><Text fontSize='16' color='error.600'> error</Text>
<TouchableOpacity onPress={fetchNewData}>
 <Box flexDirection='row'  width='100%' alignItems='center'>
   <Ionicons name='refresh' size={16}/>
   <Text ml={1}textDecorationLine='underline' fontSize='14' color='#158e73'>Try Again</Text>
 </Box></TouchableOpacity> </Box> : null}
 </LoadState> : null}
 






 
        </Box>
        )}
        renderItem={({ item }) => (
          <View mt={2}>
          

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
      />
    </View>
  );
};

const styles = StyleSheet.create({
category:{
          width:'32%',
           
          flexDirection:'column',
           justifyContent:"center",
           marginBottom:10,
           borderWidth:0.4,
           borderColor:"#71797E",
           borderRadius:10,
           borderBottomWidth:3,
           
           borderBottomColor:'#D3D3D3',
           
}
}

)
export default Home;
