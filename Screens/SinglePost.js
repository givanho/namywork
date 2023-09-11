/* eslint-disable react/prop-types */

import React, {useState, useEffect, useRef}from 'react'
import { ScrollView,Image, TouchableOpacity ,Animated, Dimensions,FlatList,StyleSheet} from 'react-native';
import { Box, View,Text, VStack,HStack,Heading, Avatar, Button, TextArea} from 'native-base'
import { UserAuth } from '../context/context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, query, where , onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import SlideItem from '../Helpers/SlideItem';
import Pagination from '../Helpers/Pagination';
const SinglePost = ({navigation, route}) => {
    const { category, location, price, content, postID, name, createdAt, Img, postTitle,
       profilePic, userSkill} = route.params
       const [index, setIndex] = useState(0);
       const scrollX = useRef(new Animated.Value(0)).current;      

       const { width } = Dimensions.get('window');
       const Images = Img.map((url, index) => ({
        id: index, // You can use a unique identifier for each object
        imageUrl: url,
      }));
      
      
    


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
        renderItem={({item}) => <SlideItem item={item} />}
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
        
          <Heading fontSize='20' color='text.600'>
            {postTitle}
          </Heading>
          {/* category highlight */}
          <Box  justifyContent='space-between' flexDirection='row' my={3}>
             <Box  backgroundColor='violet.300'  borderRadius='4' alignSelf='center' 
          > 
            <Text fontSize='14'color='#000' px={1} >  {category}</Text> 
            </Box> 
           <Heading fontSize='23'> ₦{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Heading>
          </Box>
         <Box>
            <Text fontSize='16'color='text.600'>
            {content}
            
            </Text>
         </Box>

         <Box flexDirection='row' justifyContent='flex-start' alignContent='center' my={4}>
            <Box >
            <Avatar bg="gray.300" alignSelf="center" justifyContent='center' size="16"
             alt='profile pic'   source={{uri: profilePic}}
                >
          avatar
        </Avatar>
            </Box>
            <Box   >
               <Box ml={4} ><Heading fontSize='19' pt={1}>{name } </Heading> <Text mt={-5}>{userSkill }</Text>
               <Box borderRadius='4' px={1} backgroundColor='coolGray.300'>
              <Text>{location}</Text>  
            </Box>
                </Box>
               
            </Box>
          
         </Box>

        
        <Button
                  rounded="md"
                
                  mt="5"
                  bg="#158e73"
                  colorScheme="emerald"
                >
                  Message Me
                </Button>
                <Box my={6}>
                <TextArea height='5'>

            </TextArea>
                <Button
                  rounded="md"
                
                  mt="3"
                  bg="blueGray.500"
                  colorScheme="blueGray"
                >
                    Leave Feedback
                    </Button>
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