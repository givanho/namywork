import React from "react";
import { StatusBar } from 'expo-status-bar';

import {extendTheme,Image, NativeBaseProvider,IconButton,Icon, Text, Center,
   Box,AspectRatio, Container ,Stack,HStack,Input, Heading} from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Favorite from "../bottom tabs/Favorite";
import Home from "../bottom tabs/Home";
import Post from "../bottom tabs/Post";
import Messages from "../bottom tabs/Messages";
import Profile from "../bottom tabs/Profile";
import Profiles from "../Screens/Profiles";
import MyAds from "../Screens/MyAds";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Feather} from '@expo/vector-icons';
import { Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({navigation}) {
  return (
    <Tab.Navigator 
    initialRouteName="Home"
detachInactiveScreens="true"

   
     screenOptions={{
      "tabBarShowLabel":false,
     headerShown:false,
       "animationEnabled": true,
       
       
       "tabBarActiveTintColor": "#158e73",
       tabBarInactiveTintColor:"gray",
      "tabBarStyle": [
         {
           "display": "flex"
          },
          null
        ],
       
  }}>
        
      <Tab.Screen name="Home" component={Home} 
     
      options={{
       
      
        header:() =>(
         
        
          <Box  safeAreaTop h='20' bg='#158e73' alignItems='center' justifyContent='center'>
            
          <HStack justifyContent='space-between' w='90%' mt='1' alignItems="center">
            <Image  source={require('../assets/headerwhite.png')}
          alt='headerImage' h='120%' w='50%' resizeMode="contain"
             />
          <Feather name='search' size={24} color='white' />
          </HStack>
            </Box>
          
          ),
        
        headerShown: true,
        headerTitleContainerStyle: { height: 10 }, // adjust height here
        headerStyle: { height: 50 }, // adjust height here
        
        tabBarIcon:(props) => (
        <Ionicons name='ios-home-outline' type= "Octicons"size={25} color={props.color} />
      ),
      
    }}
      />
      <Tab.Screen name="Favorite" component={Favorite}
      options={{
        tabBarIcon:(props) => (
          <Ionicons name='md-heart-outline' type= "Octicons"size={25} color={props.color} />
        ),
       
      }} />
      <Tab.Screen name="Post" component={Post} 
       options={{

        tabBarIcon:(props) => (
          <Ionicons name='ios-add-circle-outline' type= "Octicons"size={25} color={props.color} />
        ),
        
      }}/>
      <Tab.Screen name="Messages" component={Messages} 
      options={{
        tabBarIcon:(props) => (
          <Ionicons name='ios-chatbox-ellipses-outline' type= "Octicons"size={25} color={props.color} />
        ),
        
      }}/>
      <Tab.Screen name="Profile" component={Profile} 
      options={{

        tabBarIcon:(props) => (
          <Feather name="user"  size={25} color={props.color} />
        ),
       
      }}/>
      <Tab.Screen name="Profiles" component={Profiles} 
      
      options={{
        headerShown: true,
        headerTintColor:'#158e73',
        headerStyle:{
          backgroundColor:"#eff3f6",
         
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => {
            navigation.goBack();
            }} >
              <Box ml={3}>
          <Feather name='arrow-left' size={26} color='#158e73' />
          </Box>
           </TouchableOpacity>
         
        ),
        headerLeftLabelVisible:true,
        headerTitleAlign:'center',
        headerTruncatedBackTitle:'Back',
        headerTitleStyle:{
          
          fontSize:17
        },
        headerTitle:"Rejoice@gmail.com",
        tabBarButton: (props) => null,
       
      }}/>
      <Tab.Screen name="MyAd" component={MyAds} 
     
        options={{
          headerShown: true,
          headerTintColor:'#000',
          headerStyle:{
            backgroundColor:"#eff3f6",
           
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => {
              console.log(navigation.state);
              navigation.navigate('Profiles');
              }} >
                <Box ml={3}>
            <Feather name='arrow-left' size={26} color='#158e73' />
            </Box>
             </TouchableOpacity>
           
          ),
          headerLeftLabelVisible:true,
          headerTitleAlign:'center',
          headerTruncatedBackTitle:'Back',
          headerTitleStyle:{
            
            fontSize:17
          },
          headerTitle:"My ADs",
        tabBarButton: (props) => null,
        
       
      }}/>
    </Tab.Navigator>
  );
}
