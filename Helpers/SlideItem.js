import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
    TouchableOpacity,
  } from 'react-native';
  import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
  import React,{useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
  
  const {width, height} = Dimensions.get('screen');
  
  const SlideItem = ({item, navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const translateYImage = new Animated.Value(40);
    const handleImagePress = () => {
      // Open modal or perform any action you want when the image is pressed
      // For example, you can set a state to show the modal
      setModalVisible(true);
    };
  
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();

 const renderArrow =() =>{
 return(
   
    
    <Ionicons name='close-sharp' color="#fff" size={42} onPress={() => setModalVisible(false)}
   />
   
   
 )
 } 
 
  
    return( 
      <View style={styles.container}>
        <TouchableOpacity onPress={handleImagePress}>
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
  </TouchableOpacity>
  <Modal visible={isModalVisible} transparent={true} 
  saveToLocalByLongPress={true} 
     onRequestClose={() => setModalVisible(false)}>
      
  <ImageViewer imageUrls={[{ url: item.imageUrl }]} onCancel={() => setModalVisible(false)} 
  renderHeader={renderArrow}
 
  />
      </Modal>

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