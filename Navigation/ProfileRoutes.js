import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Profiles from '../Screens/Profiles';
import MyAds from '../Screens/MyAds';
const Stack = createNativeStackNavigator();

const ProfileRoutes = () => {
    const navigation = useNavigation();
return (
   <Stack.Navigator>
    <Stack.Screen name="Profiles" component={Profiles}  />
    <Stack.Screen name="MyAds" component={MyAds}  
      />
    
   </Stack.Navigator>
)
    
}
export default ProfileRoutes;
