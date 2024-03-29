
import { View, StyleSheet, Alert, } from 'react-native'
import React, {useEffect, useCallback, useState, useLayoutEffect} from 'react'
import { GiftedChat, Send, Bubble, InputToolbar,  } from 'react-native-gifted-chat'
import { Text, Avatar, Box } from 'native-base'
  import {
    collection,
    where,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { db } from "../firebase";
import { UserAuth } from "../context/context";

import { Entypo } from '@expo/vector-icons';
import { Feather, Ionicons } from '@expo/vector-icons'
const MessageMenu = ({navigation, route}) => {
  const {chatRoomKeys , fpostAuthorID, receiverIDs,
    receiverNames, receiverImgs, fname, fprofilePic} = route.params
  const {user} = UserAuth();
  const userid = user.uid
const [imgSrc, setImgSrc] = useState('')
const [userName, setUserName] = useState('')

  const [messages, setMessages] = useState([])
const chatRoomKey = [ userid, fpostAuthorID].sort().join('_');

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
        setImgSrc(doc.data().userImg);
        setUserName(doc.data().firstname + ' '+ doc.data().surname)
        
      }
    });

    return () => {
      unsubscribe();
    };
  }
}, [user])




  useLayoutEffect(() => {
    const chatRoomRef = collection(db, 'chats','messages',  chatRoomKeys||chatRoomKey);
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
}, [chatRoomKey, route]);

const chatRoomRef = collection(db, 'chats','messages', chatRoomKeys||chatRoomKey);

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
    
    .catch((error) => {
      Alert.alert("Error adding document:", error);
    });

}, [ route]);

const renderSend = (props) =>{
  return (
    <Send {...props}>
<View >
  <Feather name='send' size={26} color='#36454F'style={{
    marginRight:7,
    marginBottom:9,
    justifyContent:'center',
   
  }} />
</View>
    </Send>
  )
}

const renderBubble = (props) =>{
  return (
    <Bubble 
    {...props}
    wrapperStyle={{
      right:{
        backgroundColor:'#D3F5E4',
        maxWidth: "80%",
    
    
      },
    
      left:{
        backgroundColor:'#fff',
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:'#71797E',
        maxWidth: "80%",
      }
    }}
    textStyle={{
      right:{
        // fontFamily:'Poppins-Regular',
        color:'#000',
        fontSize: 14,
        lineHeight: 20,
      },
      left:{
        // fontFamily:'Poppins-Regular',
        color:'#000',
        fontSize: 14,
        lineHeight: 20,
      }
    }}  

    />
      
 
  )

}
const inputProps = (props) =>{
  return (
    <InputToolbar {...props}
   containerStyle={{
    backgroundColor:'#fff',
    
    borderTopWidth:StyleSheet.hairlineWidth,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderColor:'#71797E'
   }}
    />
  )
}

const chatEmpty = () =>{
  return (
    <View style={{ flex:1, justifyContent:'center',
    alignItems:'center', transform: [{  rotateZ:'180deg' }],  }}>
     <Entypo name='new-message' size={72} color='#ccc'/>
     <Text color='text.400'>Start new Chat </Text>


<View style={{  justifyContent:'center',
    alignItems:'center', flexDirection:'row', marginTop:30 }}>
     {(!receiverImgs) ? (
          <Box bg="gray.300" alignItems="center" justifyContent='center' size="12" mr='4' rounded='full'>
                            <Ionicons name="person" size={32} color="#fff" />
                            </Box>
 
) : (
 
 
  <Avatar bg="gray.300" alignSelf="center" justifyContent='center' size="12" alt='profile pic' mr='4' source={{ uri: fprofilePic }}>
  Avatar
</Avatar>

)}

{(!fprofilePic) ? (
          <Box bg="gray.300" alignItems="center" justifyContent='center' size="12" mr='4' rounded='full'>
                            <Ionicons name="person" size={32} color="#fff" />
                            </Box>
 
) : (
 
 
  <Avatar bg="gray.300" alignSelf="center" justifyContent='center' size="12" alt='profile pic' mr='4' source={{ uri: fprofilePic }}>
  Avatar
</Avatar>

)}
 </View>

     
    </View>
  )
}
  return (
    <View style={{ height:'100%', width:'100%', }}>
         <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}

        onSend={messages => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: '#f8f8f8',
          paddingBottom:30
        }}
        textInputStyle={{
          // fontFamily: 'Poppins-Regular',
          
        }}
        renderChatEmpty={chatEmpty}
         renderSend={renderSend}
        renderBubble={renderBubble}
        scrollToBottom={true}
        timeTextStyle={{right:{
           color:'#000'
                      },
          }}
          
        alwaysShowSend={true}
        renderInputToolbar={inputProps}

        user={{
          _id: user?.uid,
          name:userName,
          receiverID:receiverIDs||fpostAuthorID,
        receiverName: receiverNames||fname,
        receiverImg:receiverImgs==null? '':receiverImgs||fprofilePic,
        chatRoom: chatRoomKeys||chatRoomKey,
          avatar: imgSrc
        }}
      /> 

    
       
    
    </View>


  )
}

export default MessageMenu