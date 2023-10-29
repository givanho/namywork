import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';



import Profiles from '../Screens/Profiles';
import Home from '../bottom tabs/Home';
import { TouchableOpacity , Image, View} from 'react-native';
import Categories from '../Screens/Categories';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
return (
    
   <Stack.Navigator 
     
     screenOptions={{
        headerShown:false,
        headerShadowVisible:false,
        elevation: 0,
        statusBarTranslucent:false,
        statusBarHidden:false
        
       
     }}
     
     
>

       
    <Stack.Screen name="HomeStack" component={Home} 
    options={({ navigation, route }) => ({
      headerShown: true,
      headerLeft: ()=>(<View style={{ height:70, justifyContent:'center', alignSelf:'center'}}>
          <Image  source={require('../assets/headerwhite.png')}
              alt='headerImage' style={{resizeMode:'contain', width:130 }}
               /> 
               </View> ),
               
        headerStyle: {  backgroundColor:'#158e73',}, // adjust height here
        headerTitle:'',
        statusBarTranslucent:false,
        statusBarColor:'#158e73',
        statusBarHidden:false,
      // Add a placeholder button without the `onPress` to avoid flicker
      headerRight:() =>( <TouchableOpacity style={{marginRight:15}}
        onPress={() => alert('This is a button!')}
        
      >
         <Ionicons  name='search-circle' color='#36454F' size={28} />
         </TouchableOpacity>
       
    
      
        
        ),
      
    })}
      />
    
    
    <Stack.Screen name="HomeProfile" component={Profiles}  
      />
      
      <Stack.Screen name="Category" component={Categories}  
       options={({ navigation, route }) => ({
        headerShown: true,
        statusBarTranslucent:true,
        statusBarHidden:true,
        headerRight: ()=>(<View style={{ height:70, paddingBottom:4,marginRight:90, justifyContent:'center', alignSelf:'center'}}>
            <Image  source={require('../assets/headerwhite.png')}
                alt='headerImage' style={{resizeMode:'contain', width:130 }}
                 /> 
                 </View> ),
                 
          headerStyle: {  backgroundColor:'#158e73', }, // adjust height here
          headerTitle:'',
        headerTintColor:'#fff'
       
        
      })}/>
    
   </Stack.Navigator>
)
    
}
export default HomeStack;
