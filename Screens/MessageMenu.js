
import { View,  } from 'react-native'
import React, {useEffect, useCallback, useState, useLayoutEffect} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {ScrollView, Box, Image, Center ,Text, Input,Button,
  AspectRatio, Stack,HStack,Flex,VStack, Spacer, Link,KeyboardAvoidingView,
  FormControl,Heading} from 'native-base'
import Messages from '../bottom tabs/Messages'
  import {
    collection,
    setDoc,
    addDoc,
    orderBy,
    doc,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { db } from "../firebase";
import { UserAuth } from "../context/context";

import LoadState from '../Components/LoadState';
import LottieView from 'lottie-react-native';

const MessageMenu = ({navigation, route}) => {
  const {  fname, fprofilePic, fpostAuthorID} = route.params
  const {user} = UserAuth();
  const userid = user.uid
const [isLoading, setIsLoading] = useState(false)

  const [messages, setMessages] = useState([])
const chatRoomKey = [userid, fpostAuthorID].sort().join('_');
  useLayoutEffect(() => {
setIsLoading(true)
    const chatRoomRef = collection(db, 'chats','messages',  chatRoomKey);

  const q = query(chatRoomRef, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    setMessages(
      querySnapshot.docs.map((doc) => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }))
    );
  });
  setIsLoading(false)
  return unsubscribe;
}, [ route]);
console.log('received messages', messages)

const chatRoomRef = collection(db, 'chats','messages', chatRoomKey);

const onSend = useCallback((messages = []) => {
  setMessages((previousMessages) =>
    GiftedChat.append(previousMessages, messages)
  );

  const {_id, createdAt, text, user } = messages[0];

  // Add a new message with an auto-generated document ID
  addDoc(chatRoomRef, {
    _id,
    createdAt,
    text,
    user,
  });

  addDoc(collection(db, 'chats', 'messages','personal'), {
    chatID: chatRoomKey
    // other fields you want to add to the document
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

}, [ route]);


  return (
    <View style={{ height:'100%', width:'100%'}}>
      {route.params?  
        ( <LoadState
         showAnimation={isLoading == true}
         title={'Loading...'}
         source={require('../assets/animation/works.json')}
       >
         <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={messages => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: '#fff'
        }}
        textInputStyle={{
          backgroundColor: '#fff',
          borderRadius: 20,
        }}
        user={{
          _id: user?.uid,
          avatar: fprofilePic
        }}
      /> 

      <Text> hi there is a param</Text>
      </LoadState>
      )
      : 
        (
         <Messages chatRoomKey={chatRoomKeys}/> // Render ChatMenu when accessed through the bottom tab press
       )
       }
    
    </View>


  )
}

export default MessageMenu