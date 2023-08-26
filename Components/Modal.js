// ReusableModal.js
import React from 'react';
import { Modal, StatusBar, TouchableOpacity,TouchableWithoutFeedback, PanResponder , View} from 'react-native';
import { Box, Image, Center ,Text, Actionsheet,
    Input,useDisclose, ScrollView,AspectRatio, 
    Stack,VStack,HStack,Flex, Spacer,
    Button,Heading} from 'native-base'

const ReusableModal = ({ visible, onClose, children }) => {
  const panResponder = React.useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          onClose();
        }
      },
      onPanResponderRelease: () => {},
    });
  }, [onClose]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      
    >
         <Box
        flex= {1} size='full' 
       
      >

<TouchableWithoutFeedback onPress={onClose}>
      <Box 
      
        flex= {1}
        bg= "rgba(0, 0, 0, 0.4)"
        zIndex= {1}
      >
</Box>
</TouchableWithoutFeedback>
        <View
        {...panResponder.panHandlers} // Attach panResponder to the View

         style={{
            backgroundColor:'white',
            padding:16,
            marginBottom:20,
            width:'100%',
            position:'absolute',
            bottom:-20 * 1.1,
            borderTopRightRadius:20,
            borderTopLeftRadius:20,
            zIndex:1
         }}
        >
            <View style={{marginTop:-20}}>
    <Image  alignItems="center" justifyContent="center" alignSelf='center' alignContent='center'
    source= {require('../assets/lines.png')}
    alt="User Aatar"
    resizeMode="contain"
  />
    </View>
          {children}
          
          </View>     
       
      </Box>
    </Modal>
  );
};

export default ReusableModal;
