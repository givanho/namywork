// import 'react-native-gesture-handler';
import React, {useCallback}from "react";
// import { StatusBar } from 'react-native'; 
import { StatusBar } from 'expo-status-bar';
import {NativeBaseProvider, } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated, StyleSheet } from "react-native";
import SignIn from "./Authentication/SignIn";
import BottomTabNavigator from "./Navigation/BottomTabs";
import { AuthContextProvider } from "./context/context";
import SignUp from './Authentication/SignUp';
import MessageMenu from "./Screens/MessageMenu";
import Theme from "./context/Theme";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import SinglePost from "./Screens/SinglePost";
import Search from "./Screens/Search";
import { Ionicons } from '@expo/vector-icons';
import {

  Input,
} from "native-base";
import ForgotPassword from "./Authentication/ForgotPassword";
SplashScreen.preventAutoHideAsync();


const Nav = createStackNavigator();

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted
          ),
        },
      ],
    },
  };
};

export default function App({navigation}) {
  
  const [fontsLoaded] = useFonts({
    // "Adobe-Regular": require('./assets/fonts/adobe/AdobeCleanRegular.otf'),
    // "Adobe-Bold": require('./assets/fonts/adobe/AdobeCleanBold.otf'),
    "Blask-Sans": require('./assets/fonts/sans/blacksansblackwebfont.otf'),
    "Blask-Light": require('./assets/fonts/sans/blacksanscondensedmediumwebfont.otf'),
    "Poppins-Bold": require('./assets/fonts/poppins/Poppins-Bold.ttf'),
   "Poppins-light": require('./assets/fonts/poppins/Poppins-Light.ttf'),
    "Poppins-Regular": require('./assets/fonts/poppins/Poppins-Regular.ttf'),

  });

  const onLayoutRootView = useCallback(async() =>{
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if(!fontsLoaded){
    return null;
  }
  onLayoutRootView()



  return (
    <NavigationContainer >
<AuthContextProvider>
       <NativeBaseProvider theme={Theme} >
       <StatusBar style='light' hidden={true} />
       <Nav.Navigator  options={{
        headerShown: false,
     

       }}>
       
        <Nav.Screen  name='BottomTabs' component={BottomTabNavigator} 
         options={{  
           cardStyleInterpolator: forSlide ,
         headerShown: false,}}/>
        <Nav.Screen name='SignIn' component ={SignIn}
         options={{  
          headerShown:true,
          headerTitle:'Sign In',
        headerTintColor:'#36454F',
          headerTitleAlign:'center',
          headerTitleStyle:{fontSize:19, fontFamily:'Poppins-Bold',color:'#36454F'},
          headerStyle:{
            borderWidth:StyleSheet.hairlineWidth,
            borderColor:'#71797E',
        
            elevation: 15,
            shadowOpacity: 1,
           
          },
          headerShadowVisible:true,
          headerStatusBarHeight:10,
          cardStyleInterpolator: forSlide ,
       }}/> 

<Nav.Screen name='ForgotPassword' component ={ForgotPassword}
         options={{  
          headerShown:true,
          headerTitle:'Forgot Password?',
        headerTintColor:'#36454F',
          headerTitleAlign:'center',
          headerTitleStyle:{fontSize:19, fontFamily:'Poppins-Bold',color:'#36454F'},
          headerStyle:{
            borderWidth:StyleSheet.hairlineWidth,
            borderColor:'#71797E',
        
            elevation: 15,
            shadowOpacity: 1,
           
          },
          headerShadowVisible:true,
          headerStatusBarHeight:10,
          cardStyleInterpolator: forSlide ,
       }}/> 

       <Nav.Screen name='SignUp' component={SignUp}
       options={{  
        headerTitle:'Create Account',
        headerTintColor:'#36454F',
          headerTitleAlign:'center',
          headerTitleStyle:{fontSize:19, fontFamily:'Poppins-Bold',color:'#36454F'},
          headerShown:'true',
          headerStyle:{
            borderWidth:StyleSheet.hairlineWidth,
            borderColor:'#71797E',
        
            elevation: 15,
            shadowOpacity: 1,
           
          },
          headerShadowVisible:true,
          headerStatusBarHeight:10,
        
        cardStyleInterpolator: forSlide ,
     }}/>
      <Nav.Screen name='Details' component={SinglePost}
       options={{  
        cardStyleInterpolator: forSlide ,
        
          headerTintColor:'#36454F',
            headerTitleAlign:'center',
            headerTitleStyle:{fontSize:19, fontFamily:'Poppins-Bold',color:'#36454F'},
            headerShown:'true',
            headerStatusBarHeight:10,
            headerStyle:{
              borderWidth:StyleSheet.hairlineWidth,
              borderColor:'#71797E',
              elevation: 1,
              shadowOpacity: 1,
              },
     }}/>
      
      <Nav.Screen name="MessageMenu" component={MessageMenu} 
           options={({route}) =>({
            headerStatusBarHeight:10,
            headerTitle: route.params.receiverNames||route.params.fname,
            headerShown:true,
            headerTintColor:'#36454F',
            headerTitleAlign:'center',
            headerTitleStyle:{fontSize:19, fontFamily:'Poppins-Bold', color:'#36454F'},
            headerStyle:{
            borderWidth:StyleSheet.hairlineWidth,
            borderColor:'#71797E',
            elevation: 1,
            shadowOpacity: 1,
            },
            headerShadowVisible:true,
            
           })}
           />
    
    <Nav.Screen name='Search' component={Search}
       options={{  
        cardStyleInterpolator: forSlide ,
        headerRight:() =>( <Input placeholder="Search" variant="underlined" width="100%"  alignSelf="center"
         borderRadius="5" mr="15"
        InputLeftElement={<Ionicons name='search-circle' color='#36454F' size={20}/>} 
       
    
      
        
        />),
        headerTitle:'',
          headerTintColor:'#36454F',
            headerTitleAlign:'left',
            headerTitleStyle:{marginRight:-20},
            headerShown:'true',
            headerStatusBarHeight:10,
            headerStyle:{
              borderWidth:StyleSheet.hairlineWidth,
              borderColor:'#71797E',
              elevation: 1,
              shadowOpacity: 1,
              },
     }}/>
      
      
       
       </Nav.Navigator>
     
    </NativeBaseProvider>
    </AuthContextProvider>
    </NavigationContainer>
   
  );
}


