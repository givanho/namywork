import { TouchableOpacity,View ,Dimensions,StyleSheet,Text} from 'react-native'
import {    Box} from 'native-base';
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { setItem } from '../Helpers/Async';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');
const OnBoard = () => {
    const navigation = useNavigation();

    const handleDone = async()=>{
        navigation.navigate('BottomTabs');
        setItem('onboarded', '1');
    }
    const doneButton = ({...props})=>{
        return (
            <TouchableOpacity  {...props}>
                <Ionicons name='arrow-forward-circle' size={40} color='#158e73' style={{marginRight:22}}/>
            </TouchableOpacity>
        )
        
    }
    const next = ({...props})=>{
        return (
            <TouchableOpacity  {...props}>
               <Text style={styles.skip}>Next</Text>
            </TouchableOpacity>
        )
        
    }
    const skip = ({...props})=>{
        return (
            <TouchableOpacity  {...props}>
               <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
        )
        
    }
    const dot = ({ selected,...props})=>{
        return (
            
            <View  {...props}
            style={{backgroundColor: selected ? '#158e73' : null,
            borderRadius:100,
            borderWidth:selected? 0 : 1,
            borderColor:selected? '#e7f3f1' : '#158e73',
            marginRight:5,
            height:10,
            width:10}} />
            
             
        )
        
    }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Onboarding
      titleStyles={styles.heading}
      subTitleStyles={styles.para}
      NextButtonComponent={next}
     DotComponent={dot}
      SkipButtonComponent={skip}
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View style={{width:width*0.7, height:height/2, alignItems:'center', 
              position:'relative',justifyContent:'center',}}>

                <Box bg='#e7f3f1' size='64' borderRadius='full' position='relative' justifyContent='center' alignItems='center'>
                <Box bg='#d0e8e3' size='56' borderRadius='full' position='relative' borderWidth='5' borderColor='#e7f3f1'></Box>

                </Box>
               <Lottie source={require("../assets/onBoard/first.json")} autoPlay loop/>
             </View>
            ),
            title: " Welcome to Handwork",
            subtitle:
              "Find local artisans within your neighborhood. Explore, review, and connect seamlessly. ",
          },
          {
            backgroundColor: "#e6faed",
            image: (
                <View style={{width:width*0.7, height:height/2, alignItems:'center', 
                position:'relative',justifyContent:'center',}}>
  
                  <Box bg='#e7f3f1' size='64' borderRadius='full' position='relative' justifyContent='center' alignItems='center'>
                  <Box bg='#d0e8e3' size='56' borderRadius='full' position='relative' borderWidth='5' borderColor='#e7f3f1'></Box>
  
                  </Box>
                 <Lottie  source={require("../assets/onBoard/search.json")} autoPlay loop
                 />
               </View>
            ),
            title: "Discover Local Artisans",
            subtitle: "Explore diverse local artisans effortlessly. \
            Browse profiles, check reviews, and find the perfect match for your project."
          },
          {
            backgroundColor: "#E7EEEA",
            image: (
                <View style={{width:width*0.7, height:height/2, alignItems:'center', 
                position:'relative',justifyContent:'center',}}>
  
                  <Box bg='#e7f3f1' size='64' borderRadius='full' position='relative' justifyContent='center' alignItems='center'>
                  <Box bg='#d0e8e3' size='56' borderRadius='full' position='relative' borderWidth='5' borderColor='#e7f3f1'></Box>
  
                  </Box>
                 <Lottie 
                  source={require("../assets/onBoard/idea.json")} autoPlay loop
                 
                  />
               </View>
            ),
            title: " Easy Connections, Seamless Solutions",
            subtitle:
              " Connect effortlessly with artisans in-app. Discuss projects, get quotes, and\
               finalize arrangements—all hassle-free."
              
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    heading: {
    //  fontFamily:'Poppins-Bold',
      color:'#158e73',
      fontWeight:'700'
    },
    para: {
      // fontFamily:'Poppins-Regular'
      fontWeight:'300'

    },
    skip: {
        // fontFamily:'Poppins-Bold',
        color:'#36454F',
        paddingHorizontal: 20,
      fontWeight:'700'

      },
    
   
  });

export default OnBoard