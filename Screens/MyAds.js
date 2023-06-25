import React,{useState, useEffect} from 'react'
import { StyleSheet,TouchableOpacity, } from 'react-native';
import { Box, Image,View, Center ,Text, Input, AspectRatio, Stack,VStack,HStack,Flex, Spacer,
   Button,Heading, ScrollView} from 'native-base'
import { UserAuth } from '../context'
import * as ImagePicker from 'expo-image-picker' 
import Ionicons from '@expo/vector-icons/Ionicons';
import { Divider } from 'native-base';

const MyAds = () => {
  return (

    <ScrollView   h='100%'bg="#eff3f6" showsVerticalScrollIndicator={false} pt={3}>
      <VStack space={4}>

        <VStack elevation={1}  bg='#fff' borderRadius='xl' w='95%' alignItems="center" justifyContent="center" 
        alignSelf='center' alignContent='center'>
        <HStack   >
        <Image alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'
      
      source= {require('../assets/splash.png')}
      alt="User Aatar"
      flex={1}
      borderLeftRadius='xl'
      size='100%'
      resizeMode="cover"/>
      <View  bg="#fff" w='65%'  borderRightRadius='xl' >
    <Heading fontSize='md'  ml={2} >
      Beauty is my Language </Heading>
      <Text  ml={2}> Creative Make ups</Text>
      <Text  ml={2}> from 700</Text>
      <Text  ml={2}> from 700</Text>
      <Text  ml={2}> from 700</Text>
  </View>

      </HStack>
      <HStack borderTopWidth='3px' borderTopColor='#eff3f6' w='100%' h={10}
        alignItems='center' alignContent='center' justifyContent='space-between'>
          <Box w='40%' >
      <Heading textAlign='center' color='#158e73' fontSize='md'> Edit</Heading> 
       </Box>
       <Divider bg="#eff3f6" thickness="4" mx="4" orientation="vertical" />
       <Box w='40%'>
      <Heading textAlign='center' color='danger.400' fontSize='md'> Delete</Heading>
      </Box>
    
     </HStack>
     </VStack>
      
      
     <VStack elevation={1}  bg='#fff' borderRadius='xl' w='95%' alignItems="center" justifyContent="center" 
        alignSelf='center' alignContent='center'>
        <HStack   >
        <Image alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'
      
      source= {require('../assets/splash.png')}
      alt="User Aatar"
      flex={1}
      borderLeftRadius='xl'
      size='100%'
      resizeMode="cover"/>
      <View  bg="#fff" w='65%'  borderRightRadius='xl' >
    <Heading fontSize='md'  ml={2} >
      Beauty is my Language </Heading>
      <Text  ml={2}> Creative Make ups</Text>
      <Text  ml={2}> from 700</Text>
      <Text  ml={2}> from 700</Text>
      <Text  ml={2}> from 700</Text>
  </View>

      </HStack>
      <HStack borderTopWidth='3px' borderTopColor='#eff3f6' w='100%' h={10}
        alignItems='center' alignContent='center' justifyContent='space-between'>
          <Box w='40%' >
      <Heading textAlign='center' color='#158e73' fontSize='md'> Edit</Heading> 
       </Box>
       <Divider bg="#eff3f6" thickness="4" mx="4" orientation="vertical" />
       <Box w='40%'>
      <Heading textAlign='center' color='danger.400' fontSize='md'> Delete</Heading>
      </Box>
    
     </HStack>
     </VStack>

     
      </VStack>
        
    </ScrollView>
    
  )
}

export default MyAds