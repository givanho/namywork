import React,{useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Box, Image, Center ,Text, Input, AspectRatio, Stack,HStack,Flex, Spacer, Heading} from 'native-base'
import {ScrollView, StyleSheet} from 'react-native'


const Home = ({ setShowSearchIcon }) => {
  const [isSearchIconVisible, setIsSearchIconVisible] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 38 && isSearchBarVisible) {
      setIsSearchBarVisible(false);
      setShowSearchIcon(true);
      setIsSearchIconVisible(true);
    } else if (offsetY <= 25 && !isSearchBarVisible) {
      setIsSearchBarVisible(true);
      setIsSearchIconVisible(false);
      setShowSearchIcon(false);

    }
  };

  return (
    <ScrollView 
    style={{height:'60%', width:'100%', backgroundColor:'#ffffff', top:0, }}>
        <Box >
          <Box w={340} bg="#F8FAFB" mt={10} ml={2}rounded="lg" h='10'>
        <Text alignContent='center'alignItems="center"  fontSize={20} fontWeight='bold' color="#158e73">Categories</Text>
        </Box>
        <Flex  alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'>
          <HStack w={340} flexWrap='wrap'pt={5} space={7.5} >
            
            <Box >
      <Center  bg="#F8FAFB" rounded="lg" size={105} mb={2}>
        <Image  source={require('../assets/skills/carpenter.png')}
    alt='carpenter' h='70' w='70' resizeMode="contain"
       />
      </Center>
      <Text fontWeight='bold' color="black" alignSelf="center" mb={30} >Carpenter</Text>
      </Box>
      <Box >
      <Center  bg="#F8FAFB" rounded="lg" size={105} mb={2}>
        <Image  source={require('../assets/skills/hair-cutting.png')}
    alt='carpenter' h='70' w='70' resizeMode="contain"
       />
      </Center>
      <Text fontWeight='bold' color="black" alignSelf="center" mb={30} >Hair Stylist</Text>
      </Box>
      <Box >
      <Center  bg="#F8FAFB" rounded="lg" size={105} mb={2}>
        <Image  source={require('../assets/skills/multimeter.png')}
    alt='carpenter' h='70' w='70' resizeMode="contain"
       />
      </Center>
      <Text fontWeight='bold' color="black" alignSelf="center" mb={30} >Electrician</Text>
      </Box>
      <Box >
      <Center  bg="#F8FAFB" rounded="lg" size={105} mb={2}>
        <Image  source={require('../assets/skills/plumber.png')}
    alt='carpenter' h='70' w='70' resizeMode="contain"
       />
      </Center>
      <Text fontWeight='bold' color="black" alignSelf="center" mb={30} >Plumber</Text>
      </Box>
      <Box >
      <Center  bg="#F8FAFB" rounded="lg" size={105} mb={2}>
        <Image  source={require('../assets/skills/hammer.png')}
    alt='carpenter' h='70' w='70' resizeMode="contain"
       />
      </Center>
      <Text fontWeight='bold' color="black" alignSelf="center" mb={30} >Tiler</Text>
      </Box>
      <Box >
      <Center  bg="#F8FAFB" rounded="lg" size={105} mb={2}>
        <Image  source={require('../assets/skills/tailor.png')}
    alt='carpenter' h='70' w='70' resizeMode="contain"
       />
      </Center>
      <Text fontWeight='bold' color="black" alignSelf="center" mb={30} >Fashion Designer</Text>
      </Box>
      <Box >
      <Center  bg="#F8FAFB" rounded="lg" size={105} mb={2}>
        <Image  source={require('../assets/skills/wedding-arch.png')}
    alt='carpenter' h='70' w='70' resizeMode="contain"
       />
      </Center>
      <Text fontWeight='bold' color="black" alignSelf="center" mb={30} >Event Planner</Text>
      </Box>
      </HStack>
    </Flex>;

        </Box>
    
     </ScrollView>
  );
}

export default Home