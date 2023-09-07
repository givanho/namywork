import React,{useState, useEffect} from 'react'
import { FlatList } from 'react-native';
import { Box, Image,View,Text, VStack,HStack,Heading, ScrollView} from 'native-base'
import { UserAuth } from '../context/context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, query, where , onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

import { Divider } from 'native-base';
const MyAds = () => {
  const [adList, setAdList] = useState([]);
  const {user} = UserAuth()
//We're using the useEffect hook to set up the real-time listener when the component mounts

useEffect(() => {
 
  if (user) {
    //When the query snapshot changes (new data is added), 
   // the onSnapshot callback function is called. If the query snapshot is not empty, 
  
  const q = query(collection(db, 'posts'), where('userID', '==', user.uid));

  //The unsubscribe function returned by onSnapshot is used to 
  //remove the listener when the component unmounts, preventing memory leaks.
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const Ad = [];
    querySnapshot.forEach((doc) => {
      // Extract data from the document
      const data = doc.data();
      Ad.push({ id: doc.id, ...data });
    });
    // Update the state with the post data
    setAdList(Ad);
  });
   

  return () => {
    unsubscribe();
  };
  }
}, [ user])

  return (
    <FlatList
  data={adList}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
<ScrollView bg="#eff3f6" showsVerticalScrollIndicator={false} pt={3}>
    <VStack space={8}>

    <VStack shadow={1} borderWidth={0.7} borderColor='#ccc' bg='#fff' borderRadius='10' w='95%' alignItems="center" justifyContent="center" 
    alignSelf='center' alignContent='center'>
    <HStack   >
    <Image alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'
  
  source= {item?{uri:item.postImg[0]}: null}
  alt="User Aatar"
  flex={1}
  borderLeftRadius='10'
  size='100%'
  resizeMode="cover"/>
  <View  bg="#fff" w='65%'  borderRightRadius='10' justifyContent='center' mt={5}>
  <Text fontSize='9'  textAlign='right' mr={4} > 
{item?item.createdAt.toDate().toDateString(): 'waiting...'} </Text>
<Text fontSize='15'  ml={4} isTruncated maxW="300" w="80%" noOfLines={3} > 
{item?item.title: 'waiting...'}</Text>
  <Box flexDirection="row"  justifyContent="space-between" m={4} >
 <Box backgroundColor='#d3f8f0'  height='4' borderRadius='4' > 
  <Text fontSize='11'color='#000' pl={1} pr={1}>  {item?item.category: 'waiting...'}</Text> 
  </Box> 
  <Heading fontSize='18' >₦ {item?item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 'waiting...'} </Heading>
  </Box>
  
</View>

  </HStack>
  <HStack borderTopWidth='3px' borderTopColor='#eff3f6' w='100%' h={10}
    alignItems='center' alignContent='center' justifyContent='space-between'>
     <Box w='40%' >
  <Text textAlign='center'  color='#158e73' fontSize='12'> Edit</Text> 
   </Box>
  
   <Divider bg="#eff3f6" thickness="4" mx="4" orientation="vertical" />
   <Box w='40%'>
  <Text textAlign='center' color='danger.600' fontSize='12'> Delete</Text>
  </Box>

 </HStack>
 </VStack>
  
  


  </VStack>
  </ScrollView>
  )}
/>

    // <ScrollView   h='100%'bg="#eff3f6" showsVerticalScrollIndicator={false} pt={3}>
      
        
    // </ScrollView>
    
  )
}

export default MyAds