import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
  } from 'react-native';
  import React from 'react';
import { shadow } from 'react-native-paper';
  
  const {width, height} = Dimensions.get('screen');
  
  const SlideItem = ({item}) => {
    const translateYImage = new Animated.Value(40);
  
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  
    return (
      <View style={styles.container}>
        <Animated.Image
          source={{ uri: item.imageUrl }}
          resizeMode="cover"
          style={[
            styles.image,
            {
              transform: [
                {
                  translateY: translateYImage,
                },
              ],
            },
          ]}
        />
  
        
      </View>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    container: {
      width,
      height,
      alignItems: 'center',
      
    },
    image: {
      width: '95%',
                 
                 height: "auto",
                resizeMode:"contain",
                borderRadius:20,
                borderWidth:1,
                borderColor:'#ccc',
                 aspectRatio: 3 / 2,
     
    },
    
   
  });