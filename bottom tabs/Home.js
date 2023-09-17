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
  Divider,
  Heading,
} from "native-base";
import {
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert 
} from "react-native";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/context";

polyfillWebCrypto();

const Home = ({ navigation }) => {
  const [adList, setAdList] = useState([]);
  const { user } = UserAuth();
  const [error, setError] = useState(null)
  const [triggerFetch, setTriggerFetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const postQuerySnapshot = await getDocs(collection(db, "posts"));
        const userQuerySnapshot = await getDocs(collection(db, "users"));

        // Extract postIDs directly from the postQuerySnapshot

        const postData = [];
        postQuerySnapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() });
        });

        const userData = [];
        userQuerySnapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() });
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

              let liked = false;

              if (user?.uid) {
                // Check if the post has a likes array
                if (post.likes && Array.isArray(post.likes)) {
                  liked = post.likes.includes(user.uid);
                }
              }

              return { ...post, location, userImg, skill, liked };
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
        console.log("likes removed");
      } else {
        // If the user hasn't liked the post, add their like
        await updateDoc(postRef, {
          likes: arrayUnion(user.uid),
        });
        console.log("likes added");
      }
    } catch (error) {
      Alert.alert('Error', 'Error liking post');
    } 
  };

  const fetchNewData = () => {
    setTriggerFetch((prev) => prev + 1); // Increment triggerFetch to re-run useEffect
  };
  
  return (
    <View h="100%" bg="#eff3f6">
        
 
      <FlatList
        data={adList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <Box mt={10}>
          <Heading color='text.600' ml={2}>Categories</Heading>
          <Box
            width="95%"
            alignSelf="center"
            mb={10}
            margin={3}
            flexDirection="row"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
                Alluminum Dors & Windows Installation
              </Text>
            </Box>

            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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

            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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

            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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

            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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

            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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

            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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

            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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

            <Box
              flexDirection="column"
              justifyContent="center"
              mb={3}
              borderWidth="1"
              borderColor="#ccc"
              borderRadius="10"
              w="32%"
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
          </Box>

          <Heading color="text.600"ml={2} mb={3}>All Handworks</Heading>
      {adList.length === 0 ? <LoadState
 style={{ width: '20%', aspectRatio: 1, marginTop:5 }}
showAnimation={true}
title={'No posts yet..'}
source={require('../assets/animation/loaded.json')}
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
          <View>
          

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
                  postAuthorID: item.userID
                });
              }}
            >
              <VStack
                borderWidth={0.7}
                borderColor="#ccc"
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
                        backgroundColor="emerald.300"
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

                      <Heading fontSize="17">
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
                  borderTopWidth="3px"
                  borderTopColor="#eff3f6"
                  w="100%"
                  h={10}
                  alignItems="center"
                  alignContent="center"
                  justifyContent="space-between"
                >
                  {/* message or edit button */}
                  <Box w="40%">
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
                            size={15}
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

                  <Divider
                    bg="#eff3f6"
                    thickness="3"
                    mx="4"
                    orientation="vertical"
                  />

                  {/* call or delete button */}
                  <Box w="40%">
                    {!user || user.uid != item.userID ? (
                      <TouchableOpacity>
                        <Box
                          flexDirection="row"
                          justifyContent="space-evenly"
                          alignItems="center"
                        >
                          <Ionicons name="call-sharp" color="#000" size={15} />
                          <Text textAlign="center" color="#000" fontSize="13">
                            {" "}
                            Call
                          </Text>
                        </Box>
                      </TouchableOpacity>
                    ) : (
                      <Text textAlign="center" color="danger.600" fontSize="13">
                        {" "}
                        delete
                      </Text>
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

export default Home;
