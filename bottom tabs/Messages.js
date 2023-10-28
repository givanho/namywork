import { View, FlatList,  TouchableOpacity,  Image, Alert } from "react-native";
import React, { useLayoutEffect, useState,useEffect } from "react";
import { Box , Avatar, Heading ,Text} from "native-base";
import LoadState from "../Components/LoadState";
import { collection, orderBy, query, onSnapshot,getDocs , where, } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/context";
import {  useIsFocused } from '@react-navigation/native';
import moment from "moment/moment";

const Messages = ({ navigation }) => {

  const isFocused = useIsFocused();
  const { user } = UserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatID, setChatID] = useState('');
  const [chatRoom, setChatRoom] = useState(null)

  const userID = user.uid;
  useEffect(() => {
    const fetchChatIDs = async () => {
      setIsLoading(true);
      try {
        const chatsCollectionRef = collection(db, "chats", 'messages', 'personal');
        const chatSnapshot = await getDocs(chatsCollectionRef);
        const userID = user.uid; // Assuming user.userID is the user's ID
        let filteredChats = '';
        chatSnapshot.forEach((doc) => {
          const chatID = doc.data().chatID;
          setChatID(chatID)
          // Split the chatID using '_' as the separator
          const parts = chatID.split('_');
    
          // Check if the parts array has at least two elements
          if (parts.length >= 2) {
            const chatUserIDBefore = parts[0]; // The part before the underscore
            const chatUserIDAfter = parts[1];  // The part after the underscore
    
            // Check if either part matches the currently signed-in user's userID
            if (chatUserIDBefore === userID || chatUserIDAfter === userID) {
              filteredChats += chatID + ','; // Concatenate the chatID with a comma separator
            }
          }
        });
    
        // Remove the trailing comma from the filteredChats string, if any
        if (filteredChats.endsWith(',')) {
          filteredChats = filteredChats.slice(0, -1);
        }
    
        setChatRoom(filteredChats)
      } catch (error) {
        Alert.alert("Error retrieving chat IDs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatIDs(); // Call the function to fetch chat IDs
  }, [chats,chatRoom,user,isFocused]);



  useLayoutEffect(() => {
    async function fetchChatMessages(chatRoom) {
      if (chatRoom) {
        // Split the chatRoom string into an array of chatKeys using a comma as the delimiter
        const chatKeysArray = chatRoom.split(',');
    
        if (chatKeysArray.length > 0) {
          // Initialize an object to store chat messages grouped by chatKey
          const chatMessagesByChatKey = {};
          const chatMessagesByUser = {};
        
          // Initialize an object to store the most recent message for each individual chat ID
          const mostRecentMessagesByChatID = {};
          const earliestMessagesByChatID = {};
          // Fetch all chat messages for each chatKey
          for (const chatKey of chatKeysArray) {
            const chatRoomRef = collection(db, "chats", "messages", chatKey.trim());
            const q = query(chatRoomRef, orderBy("createdAt", "desc"));
        
            const querySnapshot = await getDocs(q);
        
            // Group messages by chatKey and keep track of the most recent message
            querySnapshot.forEach((doc) => {
              const chatMessage = {
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
              }
              if (!chatMessagesByChatKey[chatKey] || chatMessage.createdAt > chatMessagesByChatKey[chatKey].createdAt) {
                chatMessagesByChatKey[chatKey] = chatMessage;
                
              }

              if (!earliestMessagesByChatID[chatKey] || chatMessage.createdAt < earliestMessagesByChatID[chatKey].createdAt) {
                earliestMessagesByChatID[chatKey] = chatMessage;
              }
              if ( earliestMessagesByChatID[chatKey] !=  chatMessagesByChatKey[chatKey]) {
                // Overwrite the avatar and name field with information from the earliest message.
                chatMessagesByChatKey[chatKey].user.avatar =  earliestMessagesByChatID[chatKey].user.avatar;
                chatMessagesByChatKey[chatKey].user.name =  earliestMessagesByChatID[chatKey].user.name;
                chatMessagesByChatKey[chatKey].user._id =  earliestMessagesByChatID[chatKey].user._id;
                chatMessagesByChatKey[chatKey].user.receiverID =  earliestMessagesByChatID[chatKey].user.receiverID;
                chatMessagesByChatKey[chatKey].user.receiverImg =  earliestMessagesByChatID[chatKey].user.receiverImg;
                
              }
        
              // Group messages by individual chat ID and keep track of the most recent message
              const chatID = chatMessage.user.id;
              if (!mostRecentMessagesByChatID[chatID] || chatMessage.createdAt > mostRecentMessagesByChatID[chatID].createdAt)
               {
                mostRecentMessagesByChatID[chatID] = chatMessage;

              }
        
              
            });
          }
        
          // Create an array of chat heads with the most recent message for each unique chat key
          const chatHeads = Object.values( chatMessagesByChatKey);
        
          // Sort chatHeads by createdAt if needed
          const sortedChatHeads = chatHeads.sort((a, b) => b.createdAt - a.createdAt);
        
          // Set sortedChatHeads and mostRecentMessages as the state or do whatever you need with them
          setChats(sortedChatHeads);
        
          
        } else {
          return
        }
      } else {
        return
      }
    }
    
    fetchChatMessages(chatRoom)
    
  }, [chatRoom,isFocused]);

  const renderChatHeader = ({ item }) => (
 
    <TouchableOpacity
    onPress={() => {
      // eslint-disable-next-line react/prop-types
   user? navigation.navigate("MessageMenu", {
    chatRoomKeys:item.user.chatRoom,
    receiverNames:item.user.receiverName,
    receiverIDs:item.user.receiverID,
    receiverImgs:item.user.receiverImg
  }):navigation.navigate("SignIn")
    }}
    >
      {/* Render the chat header here */}
      <Box bg='#fff' w='90%' alignSelf='center'>
        <Box flexDirection='row'
        
          mt={5}  >
          <Box   >
        <Avatar bg="gray.300" alignSelf="center" justifyContent='center' size="12" alt='profile pic' 
         mr='4'  source={ userID === item.user._id ? { uri: item.user.receiverImg }: { uri: item.user.avatar}}
          
         
         
            >
          avatar
        </Avatar>
          </Box>
        <Box >
          <Heading fontSize='14' >{userID === item.user._id ?item.user.receiverName : item.user.name}</Heading>

        <Box w='90%' flexDirection='row' justifyContent='space-between' alignContent='center' alignItems='center'>
          <Text textAlign='center' >{item.text}</Text>
          <Text ml='auto'  color='#808080' fontSize='10'>
          {moment.utc(item.createdAt).local().startOf('seconds').fromNow()
          }</Text>
      </Box>

        </Box>
        </Box>
        
       
      </Box>
    </TouchableOpacity>
  );
  return (
    <Box bg='#fff' h='100%' >
       {chats.length ===0 ?  
          <LoadState
          style={{ width: '100%',  aspectRatio: 1, marginTop:5 }}
          showAnimation={true}
          title={'No messages yet.'}
          source={require('../assets/animation/astro.json')}>
          </LoadState>
  :   
        <FlatList
          data={chats}
          keyExtractor={(item, index) => `${item.uniqueID}-${index}`}
          renderItem={renderChatHeader}
        />}
    </Box>
  );
};

export default Messages;
