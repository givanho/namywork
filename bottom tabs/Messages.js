import { View,  } from 'react-native'
import React, {useEffect, useCallback, useState, useLayoutEffect} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {ScrollView, Box, Image, Center ,Text, Input,Button,
  AspectRatio, Stack,HStack,Flex,VStack, Spacer, Link,KeyboardAvoidingView,
  FormControl,Heading} from 'native-base'

  import {
    collection,
    setDoc,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { db } from "../firebase";
import { UserAuth } from "../context/context";


const Messages = ({navigation, route}) => {
  const {  fname, fprofilePic, fpostAuthorID} = route.params
  const {user} = UserAuth();
  const userid = user.uid
  const [messages, setMessages] = useState([])
console.log("fpostAuthorID", fpostAuthorID,'user id', user.uid, 'all', user.uid+fpostAuthorID )
const chatRoomKey = [userid, fpostAuthorID].sort().join('_');
  useLayoutEffect(() => {

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
}, [ route]);

  return (
    <View style={{ height:'100%', width:'100%'}}>
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
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
    </View>
  )
}

export default Messages