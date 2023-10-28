/* eslint-disable react/prop-types */
import React , {useEffect, useState} from 'react'
import { FlatList,  TouchableWithoutFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    Box,
    Image,
    View,
    Text,
    HStack,
    VStack,
    Heading,
    Input,
  } from "native-base";






const Search = ({navigation, route}) => {
    const{adList} = route.params
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);


    useEffect(() => {
        setFilteredDataSource(adList);
        
       }, [])
       useEffect(() => {
        const setHeaderOptions = () => {
          navigation.setOptions({
            headerRight: () => (
                <Input placeholder="Search Services" variant="underlined" width="100%" borderRadius="5" 
                borderBottomColor='#158e73' alignSelf="center" mr="15" fontSize='16'
                InputRightElement={<Ionicons name='search' color='#36454F' size={32}/>} 
                
                onChangeText={(text) => searchFilterFunction(text)}
                 onClear={(text) => searchFilterFunction('')}
              
                 value={search}
                />
            ),
          });  
         }
        // Call the function to set options
        setHeaderOptions();
      }, [navigation])
    
       
       
      
          
       
       
          const searchFilterFunction = (text) => {
           // Check if searched text is not blank
           if (text) {
             // Inserted text is not blank
             // Filter the masterDataSource
             // Update FilteredDataSource
             const newData = adList.filter(function (item) {
               const itemData = item.title
                 ? item.title.toUpperCase()
                 : ''.toUpperCase();
                 const itemDataCategory = item.category
                 ? item.category.toUpperCase()
                 : ''.toUpperCase();
               const textData = text.toUpperCase();
               return (
                itemData.indexOf(textData) > -1 ||
                itemDataCategory.indexOf(textData) > -1
              )
              
             });
             setFilteredDataSource(newData);
             setSearch(text);
           } else {
             // Inserted text is blank
             // Update FilteredDataSource with masterDataSource
             setFilteredDataSource(adList);
             setSearch(text);
           }
         };
       
         const ItemView = ({ item }) => {
           return (
             // Flat List Item
             <View mt={4}>
          

             <VStack mb={2}>
            
         
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
                     number: item.number,
                     postAuthorID: item.userID
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
                  
                 </VStack>
               </TouchableWithoutFeedback>
               
             </VStack>
             
             </View>
           );
         };
       
        //  const ItemSeparatorView = () => {
        //    return (
        //      // Flat List Item Separator
        //      <View
        //        style={{
        //          height: 0.5,
        //          width: '100%',
        //          backgroundColor: '#C8C8C8',
        //        }}
        //      />
        //    );
        //  };
       
        //  const getItem = (item) => {
        //    // Function for click on an item
        //    alert('Id : ' + item.id + ' Title : ' + item.title);
        //  };
       
  return (
    <View>
      
         {search.length != 0 ?  <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
        //   ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        /> : null}
         
    </View>
  )
}

export default Search