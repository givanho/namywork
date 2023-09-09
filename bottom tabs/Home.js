import React,{useState, useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Box, Image,View, Text, HStack,VStack, Divider, Heading} from 'native-base'
import { FlatList, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import { collection,  getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { UserAuth } from '../context/context'

const Home = ({navigation}) => {
  const [adList, setAdList] = useState([]);
  const {user} = UserAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postQuerySnapshot = await getDocs(collection(db, 'posts'));
        const userQuerySnapshot = await getDocs(collection(db, 'users'));
  
        const postData = [];
        postQuerySnapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() });
        });
  
        const userData = [];
        userQuerySnapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() });
        });

         // Iterate through postData and match it with userData
      const updatedPostData = postData.map((post) => {
        const matchingUser = userData.find((user) => user.userID === post.userID);
        if (matchingUser) {
          // Extract location from matching user data
          const location = matchingUser.location;
          const userImg = matchingUser.userImg;
          const skill = matchingUser.skill;
          
          // Add location to the post object
          return { ...post, location, userImg, skill };
        }
        // If no matching user is found, return the post as is
        return post;
      });

  
        setAdList(updatedPostData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  return (
    
    <View h='100%' bg="#eff3f6">
   
    
      
      
    
      <FlatList
  data={adList}
  keyExtractor={(item) => item.id}
  ListHeaderComponent={() => (
    <Box mt={10}  >
      <Heading ml={2}>Categories</Heading>
      <Box width='95%' alignSelf='center' mb={32}
      margin={3} flexDirection='row' justifyContent='space-between' flexWrap='wrap'>

        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center' >
         <Image  source={require('../assets/category/carpenter.png')}
          alt='carpenter' size='20' resizeMode="contain"
          />
         
          <Text mb={3}color='#000'>Carpenter</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/cctvInstaller.png')}
          alt='cctv' size='20' resizeMode="contain"
          />
         
          <Text mb={3}color='#000'>CCTV Installer</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/door.png')}
          alt='door' size='16' resizeMode="contain"
          />
         
          <Text fontSize='12' numberOfLines={2} mb={3}color='#000'>Alluminum Dors & Windows Installation</Text>
        </Box>
      
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/productionlight.png')}
          alt='plumber' size='20' m={1} resizeMode="contain"
          />
         
          <Text mb={3}color='#000'>Plumber</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/teamworkcrop.png')}
          alt='floor-work' size='20' resizeMode="contain" 
          />
         
          <Text numberOfLines={2} mb={2}  fontSize='12'color='#000'>Floor Tiling & P.O.P Installation</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/workercut.png')}
          alt='chef' size='20' resizeMode="contain" 
          />
         
          <Text numberOfLines={2} fontSize='12' mb={3}color='#000'>Food & Restaurant</Text>
        </Box>

        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/hairstyle.png')}
          alt='hairstyle' size='20' resizeMode="contain" mb={2}
          />
         
          <Text mb={3}color='#000'>Hair Stylist</Text>
        </Box>


        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/handbag.png')}
          alt='handbag' size='20' resizeMode="contain" 
          />
         
          <Text numberOfLines={2} fontSize='12' mb={3}color='#000'>HandBag, Beads, Crotchet making etc</Text>
        </Box>
        
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/instrumentalist.png')}
          alt='instrumentalist' m={-17}size='32' resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Instrumentalist</Text>
        </Box>
        
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/gardener.png')}
          alt='gardener' size='32' m={-15} resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Gardener</Text>
        </Box>
        
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/makeup.png')}
          alt='makeup' size='20' resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Make-Up, Nails and Eyelashes</Text>
        </Box>

        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/mechanic.png')}
          alt='car' size='20' m={1} resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Auto Mechanic</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/paintbrush.png')}
          alt='brush' size='20' resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Painter</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/eventplanner.png')}
          alt='calendar' size='20' resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Event Planner</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/welder.png')}
          alt='welder' size='20' resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Welder</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/phonerepair.png')}
          alt='phone' size='20' resizeMode="contain" 
          />
         
          <Text fontSize='13' mb={3}color='#000'>Phone & Laptop repairer</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/photogrphy.png')}
          alt='camera' size='32'm={-13} resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Photographer</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/watch.png')}
          alt='watch' size='20' resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Wrist Watch Repairer</Text>
        </Box>
        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/solarpanel.png')}
          alt='solar' size='20' resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Solar Power Installation</Text>
        </Box>

        <Box flexDirection='column' justifyContent='space-between'mb={3} borderWidth='1'
        borderColor='#ccc' borderRadius='10'  w='32%' alignItems='center'>
         <Image  source={require('../assets/category/wallpaper.png')}
          alt='wallpaper' size='20' resizeMode="contain" 
          />
         
          <Text  mb={3}color='#000'>Wallpaper Installation</Text>
        </Box>

      </Box>
     
<Heading ml={2}>All Handworks</Heading>

  </Box>
  )}
  renderItem={({ item }) => (
    <VStack space={8}>
{/* start of the view */}
<TouchableWithoutFeedback  onPress={() => {
                  // eslint-disable-next-line react/prop-types
                  navigation.navigate('Details', { category: item.category, location: item.location,
                     price:item.price, content:item.content, postID:item.postID, name:item.author,
                    createdAt:item.createdAt, Img:item.postImg, postTitle:item.title,
                  profilePic:item.userImg, userSkill:item.skill});
                  }}>
    <VStack  borderWidth={0.7} borderColor='#ccc' bg='#fff' borderRadius='10' w='95%' alignItems="center" 
    justifyContent="center" mb={3}
    alignSelf='center' alignContent='center' >
    <HStack   >
    <Image alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'
  
  source= {item?{uri:item.postImg[0]}: null}
  alt="User Aatar"
  flex={1}
  borderLeftRadius='10'
  size='100%'
  resizeMode="cover"/>
  <View  bg="#fff" w='55%'  borderRightRadius='10' justifyContent='center' mt={1}>

     {/* date and heart */}
    <Box flexDirection='row' justifyContent='space-between' ml={4} mr={4} alignItems='center'>
      <Text fontSize='9'   > 
{item?item.createdAt.toDate().toDateString(): 'waiting...'} </Text>
{!user || user.uid != item.userID ?
 <Ionicons name='heart-outline' size={24} color='#158e73'/> : null}
    </Box>
  
  {/* text title */}
<Text fontSize='13'  ml={4} isTruncated maxW="300" w="80%" noOfLines={2} > 
{item?item.title: 'waiting...'}</Text>

{/* text category and price */}
  <Box flexDirection="row"  justifyContent="space-between" mx={3} my={2}>
  <Box  backgroundColor='emerald.300'  borderRadius='4' alignSelf='center' 
        isTruncated maxW="300" w="50%"  > 
           <Text fontSize='11'color='#000' isTruncated maxW="300" w="100%"
   pl={1} pr={1}>  {item?item.category: 'waiting...'}</Text> 
            </Box> 
 {/* <Box backgroundColor='#d3f8f0'  height='4' borderRadius='4' > 
   
  </Box>  */}
  <Heading fontSize='17' >₦ {item?item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 'waiting...'} </Heading>
  </Box>
  
  {/* location */}
  <Box flexDirection='row' justifyContent='space-between' mx={3} alignItems='center'>
    <Ionicons name='location-sharp' color='#158e73' size={15}/>
    <Text fontSize='12' > {item?item.location ||'no location' : 'waiting..'} </Text>
  </Box>
</View>

  </HStack>
  <HStack borderTopWidth='3px' borderTopColor='#eff3f6' w='100%' h={10}
    alignItems='center' alignContent='center' justifyContent='space-between'>

      {/* message or edit button */}
     <Box w='40%' >
  {!user || user.uid != item.userID ?<TouchableOpacity>
    <Box flexDirection='row' justifyContent='space-evenly' alignItems='center'>
      <Ionicons name='send-sharp'  color='#158e73' size={15}/>
      <Text textAlign='center'  color='#158e73' fontSize='13'> Message</Text> 
    </Box>
    
  </TouchableOpacity> :<Text textAlign='center'  color='#158e73' fontSize='13'> Edit</Text> }
  
   </Box>
  
   <Divider bg="#eff3f6" thickness="3" mx="4" orientation="vertical" />

   {/* call or delete button */}
   <Box w='40%'>
   {!user || user.uid != item.userID ?<TouchableOpacity>
    <Box flexDirection='row' justifyContent='space-evenly' alignItems='center'>
      <Ionicons name='call-sharp'  color='#000' size={15}/>
      <Text textAlign='center'  color='#000' fontSize='13'> Call</Text> 
    </Box>
    
  </TouchableOpacity> :<Text textAlign='center'  color='danger.600' fontSize='13'> delete</Text>}

  </Box>

 </HStack>
 </VStack>
  
  
 </TouchableWithoutFeedback>

  </VStack>
  )}
  
/>
   
      
     </View>
    
  )
}

export default Home