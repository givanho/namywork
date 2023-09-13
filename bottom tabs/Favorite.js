/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
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


const Favorite = ({ navigation }) => {
  const [adList, setAdList] = useState([]);
  const { user } = UserAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
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
              let userLiked = null;
              if (user?.uid) {
                // Check if the post has a likes array
               if (post.likes && Array.isArray(post.likes)) {
    // Check if the user's UID is in the likes array
    if (post.likes.includes(user.uid)) {
      liked = true;

      // Find the liked post in the postData array (assuming postData contains all posts)
      userLiked = postData.find((likedPost) => likedPost.id === post.id);
    }
  }
              }

            console.log('userLikedPosts =>', userLiked)

              return { ...post, location, userImg, skill, liked,userLiked };
            }
            
            return post;
          })
          
        );
        const filteredPosts = updatedPostData.filter((post) => post.userLiked !== null);
        setAdList(filteredPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Use onSnapshot to listen for real-time updates to 'posts' and 'users' collections
    const postsCollectionRef = collection(db, "posts");
    const usersCollectionRef = collection(db, "users");

    const unsubscribePosts = onSnapshot(postsCollectionRef, fetchData);
    const unsubscribeUsers = onSnapshot(usersCollectionRef, fetchData);

    return () => {
      // Unsubscribe from the listeners when the component unmounts
      unsubscribePosts();
      unsubscribeUsers();
    };
  }, [user]);

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
      console.error("Error toggling like:", error);
    }
  };

  return (
    <View h="100%" bg="#eff3f6">
      <FlatList
        data={adList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <Box my={10}>
            

            <Heading ml={2}>My Favorites</Heading>
          </Box>
        )}
        renderItem={({ item }) => (
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
                      <TouchableOpacity>
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
        )}
      />
    </View>
  );
};


export default Favorite;
