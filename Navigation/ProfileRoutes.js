import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Profiles from '../Screens/Profiles';
import MyAds from '../Screens/MyAds';
import EditScreen from '../Screens/EditScreen';
const Stack = createNativeStackNavigator();

const ProfileRoutes = () => {
return (
    
   <Stack.Navigator>

       
    <Stack.Screen name="Profiles" component={Profiles}
    options={
      {
         
         headerTitleAlign:'center',
        headerTitle:"Profile",
        // headerTitleStyle:{fontSize:19, fontFamily:'Poppins-Bold',color:'#36454F'},
    headerTitleStyle:{fontSize:19, fontWeight:'700' , color:'#36454F'},

         headerShown:'true',
         headerStatusBarHeight:10,
         headerStyle:{
          borderWidth:StyleSheet.hairlineWidth,
          borderColor:'#71797E',
          elevation: 1,
          shadowOpacity: 1,
     },
      }
    } />
    <Stack.Screen name="MyAds" component={MyAds}
    options={{
      headerTitleAlign:'center',
      headerTitle:'My Ads', 
      headerTintColor:'#36454F',
            // headerTitleStyle:{fontSize:19, fontFamily:'Poppins-Bold',color:'#36454F'},
    headerTitleStyle:{fontSize:19, fontWeight:'700' , color:'#36454F'},

            headerShown:'true',
            headerStatusBarHeight:10,
            headerStyle:{
              borderWidth:StyleSheet.hairlineWidth,
              borderColor:'#71797E',
              elevation: 1,
              shadowOpacity: 1,
         },
    }}  
      />
      <Stack.Screen name="Edit" component={EditScreen} 
      options={{
       
        headerTitleAlign:'center',
        headerTitle:'Edit Profile', 
        headerTintColor:'#36454F',
              // headerTitleStyle:{fontSize:19, fontFamily:'Poppins-Bold',color:'#36454F'},
    headerTitleStyle:{fontSize:19, fontWeight:'700' , color:'#36454F'},

              headerShown:'true',
              headerStatusBarHeight:10,
              headerStyle:{
                borderWidth:StyleSheet.hairlineWidth,
                borderColor:'#71797E',
                elevation: 1,
                shadowOpacity: 1,
           },
         
       }}   
      />
    
   </Stack.Navigator>
)
    
}
export default ProfileRoutes
