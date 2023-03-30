import React from "react";
import { StatusBar } from 'expo-status-bar';

import {extendTheme,Image, NativeBaseProvider,IconButton,Icon, Text, Center,
   Box,AspectRatio, Container ,Stack,HStack,Input, Heading} from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Favorite from "./bottom tabs/Favorite";
import Home from "./bottom tabs/Home";
import Post from "./bottom tabs/Post";
import Messages from "./bottom tabs/Messages";
import Profile from "./bottom tabs/Profile";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Feather} from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#F8FAFB",
  },
};
const theme = extendTheme({ colors: newColorTheme });
export default function App() {
  return (
    <NavigationContainer>
       <NativeBaseProvider>
       <StatusBar bg="#000"  barStyle="light-content" />
       
     <Tab.Navigator 
    
     screenOptions={{
      "tabBarShowLabel":false,
       "headerShown": false,
       "tabBarActiveTintColor": "#158e73",
      "tabBarStyle": [
         {
           "display": "flex"
          },
          null
        ]
  }}>
        
      <Tab.Screen name="Home" component={Home} 
     
      options={{
        header:() =>(
       
        <Box  safeAreaTop h='82' bg='#158e73' w='100%'alignItems='center' >
        <HStack justifyContent='space-between' w='90%' mt='3'>
          <Image  source={require('./assets/headerwhite.png')}
        alt='headerImage' h='8' w='160' resizeMode="contain"
           />
        <Feather name='search' size={28} color='white' />
        </HStack>
          </Box>),
        headerShown:true,
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
    </Tab.Navigator>
    </NativeBaseProvider>
    </NavigationContainer>
   
  );
}


