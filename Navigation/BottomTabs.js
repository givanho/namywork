import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/context'

import { Text, 
   Box, Avatar,} from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorite from "../bottom tabs/Favorite";
import Post from "../bottom tabs/Post";
import Messages from "../bottom tabs/Messages";

import Ionicons from '@expo/vector-icons/Ionicons';
import {Feather} from '@expo/vector-icons';
import {StyleSheet} from "react-native";
import ProfileRoutes from "./ProfileRoutes";
import SignIn from "../Authentication/SignIn";
import HomeStack from "./HomeStack";
import { collection, query, where , onSnapshot, } from "firebase/firestore";
import { db , } from '../firebase'
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({navigation}) {

 const {user} =UserAuth()
const [imgSrc, setImgSrc] = useState('')
 
    useEffect(() => {
      if (user?.uid  ) {
        //When the query snapshot changes (new data is added), 
       // the onSnapshot callback function is called. If the query snapshot is not empty, 
       // we update the state with the data from the first document in the snapshot.
  
        const q = query(collection(db, 'users'), where('userID', '==', user.uid));
  
        //The unsubscribe function returned by onSnapshot is used to 
        //remove the listener when the component unmounts, preventing memory leaks.
  
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
  
            if (doc.data().userImg) {
              setImgSrc({ uri: doc.data().userImg });
            }
            else{
              setImgSrc('')
            }
          }
        });
  
        return () => {
          unsubscribe();
        };
      }
      else{
        return
      }
    }, [user])
    
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
        
      <Tab.Screen name="Home" component={HomeStack} 
     
    options={{
      
      headerShown:false,
      tabBarIcon:(props) => (
           <Ionicons name='ios-home-outline' type= "Octicons"size={25} color={props.color} />
         ),
    }}
      />
    



 <Tab.Screen name="Favorite" component={user ? Favorite :SignIn}
 
 options={({ navigation, route }) => ({
  
  tabBarIcon:(props) => (
    <Ionicons name='md-heart-outline' type= "Octicons"size={25} color={props.color} />
  ),
  headerStatusBarHeight:10,
  headerTitle:'My favorites',
  headerShown:true,
  headerTitleAlign:'center',
    headerTitleStyle:{fontSize:19, fontWeight:'700' , color:'#36454F'},
    // headerTitleStyle:{fontSize:19, fontFamily:'Poppins-Bold' , color:'#36454F'},
  headerStyle:{
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'#71797E',
    borderTopWidth:0,
    elevation: 15,
    shadowOpacity: 1,
   
  },
  headerShadowVisible:true,
  headerRight: () => (
    <Box>
   {(!imgSrc) ? (
          <Box bg="gray.300" alignItems="center" justifyContent='center' size="10" mr='4' rounded='full'>
                            <Ionicons name="person" size={28} color="#fff" />
                            </Box>
 
) : (
  <Avatar bg="gray.300" alignSelf="center" justifyContent='center' size="10" alt='profile pic' mr='4'  source={imgSrc}>
    Avatar
  </Avatar>
)}
</Box>
  ),
})}
 
 />
 
  
     


 <Tab.Screen name="Post" component={user ? Post : SignIn} 
 options={{
  
  tabBarIcon:(props) => (
    <Ionicons name='ios-add-circle-outline' type= "Octicons"size={25} color={props.color} />
  ),
  headerStyle:{
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'#71797E',
    borderTopWidth:0,

    elevation: 20,
    shadowOpacity: 1,
    
  },
 
 headerRight:()=>(
  <Box>
      {(!imgSrc) ? (
          <Box bg="gray.300" alignItems="center" justifyContent='center' size="10" mr='4' rounded='full'>
                            <Ionicons name="person" size={28} color="#fff" />
                            </Box>
 
) : (
  <Avatar bg="gray.300" alignSelf="center" justifyContent='center' size="10" alt='profile pic' mr='4'  source={imgSrc}>
    Avatar
  </Avatar>
)}
  </Box>


 ),
 headerTitleAlign:'center',
 headerTitle:'Create AD', 
//  headerTitleStyle:{fontSize:19, fontFamily:'Poppins-Bold', color:'#36454F'},
 headerTitleStyle:{fontSize:19, fontWeight:'700' , color:'#36454F'},

 headerShown:'true',
 headerStatusBarHeight:10,
 
 
 
}}/>
<Tab.Screen name="Messages" component={user ? Messages : SignIn} 
  
    
    options={({route}) =>({
      headerStatusBarHeight:10,
      headerTitle:"Messages",
      headerShown:true,
      headerTintColor:'#36454F',
      headerTitleAlign:'center',
    headerTitleStyle:{fontSize:19, fontWeight:'700' , color:'#36454F'},

      headerStyle:{
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:'#71797E',
        borderTopWidth:0,

      elevation: 1,
      shadowOpacity: 1,
      },
      headerShadowVisible:true,
      tabBarIcon:(props) => (
        <Ionicons name='ios-chatbox-ellipses-outline' type= "Octicons"size={25} color={props.color} />
      ),
      headerRight:()=>(
        <Box>
{(!imgSrc) ? (
          <Box bg="gray.300" alignItems="center" justifyContent='center' size="10" mr='4' rounded='full'>
                            <Ionicons name="person" size={28} color="#fff" />
                            </Box>
 
) : (
  <Avatar bg="gray.300" alignSelf="center" justifyContent='center' size="10" alt='profile pic' mr='4'  source={imgSrc}>
    Avatar
  </Avatar>
)}

            
        </Box>
       ),
     })}
   
   />
        <Tab.Screen name="Profile" component={user? ProfileRoutes : SignIn} 
        options={{

          tabBarIcon:(props) => (
            <Feather name="user"  size={25} color={props.color} />
          ),
        
         
        }}/>
  
     
    </Tab.Navigator>
  );
}
