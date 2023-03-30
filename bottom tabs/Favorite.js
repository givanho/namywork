import React,{useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Box, Image, Center ,Text, Input, AspectRatio, Stack,HStack, Heading} from 'native-base'
import {ScrollView, StyleSheet} from 'react-native'

const Favorite = () => {
  const [isSearchIconVisible, setIsSearchIconVisible] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 0 && isSearchBarVisible) {
      setIsSearchBarVisible(false);
      setIsSearchIconVisible(true);
    } else if (offsetY === 0 && !isSearchBarVisible) {
      setIsSearchBarVisible(true);
      setIsSearchIconVisible(false);
    }
  };
    

  return (
    <ScrollView onScroll={handleScroll}
    style={{height:'100%', width:'100%', backgroundColor:'#000',flex:1, top:0,}}>
        
     
     
     </ScrollView>
  );
}

 

export default Favorite