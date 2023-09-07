import React, { useEffect, useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import { Ionicons } from '@expo/vector-icons';
import states from '../data/states';

   

  const DropDownMenu = ({ location, onSelectState, onSelectCapital }) => {
    const [value, setValue] = useState(null);
    const [capital, setCapital] = useState(null);
    const [selectedState, setSelectedState] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [commaIndex, setCommaIndex] = useState('');
    const [locationState, setLocationState] = useState('');
    const [locationCapital, setLocationCapital] = useState('');
   
useEffect(() => {
  if (!location) {
    // Handle the case when locationRoute is not provided or is null/undefined
    return null; // You can render nothing or provide a default behavior
  }
  else{
    const commaIndex = location.indexOf(",");
    const locationState = location.slice(0, commaIndex).trim();
    const locationCapital = location.slice(commaIndex + 1).trim();

    setCommaIndex(commaIndex)
    setLocationState(locationState)
    setLocationCapital(locationCapital)
  }
}, [])

   

const [isFocus, setIsFocus] = useState(false);

    

    useEffect(() => {
        let stateDataArray = [];

        for (var i = 0; i < states.length; i++) {
          const stateName = Object.keys(states[i])[0]; // Extract the state name
          const cities = states[i][stateName]; // Extract the cities for the state
       
          stateDataArray.push({
            value: stateName,
            label: stateName,
          });
        }
             setSelectedState(stateDataArray)
            
       
    }, [])

    //props sent to edit screen
    const handleStateSelect = (value) => {
        
        onSelectState(value);
      };

      
      const handleCapitalSelect = (capital) => {
     
        // Call the parent component's callback function to pass the selected capital
        onSelectCapital(capital);
        
        
      };

    const handleSelect = (value) => {
        const selectedState = states.find(stateObj => {
            const stateName = Object.keys(stateObj)[0];
            return stateName === value;
          });
          
          if (selectedState) {
            const stateName = Object.keys(selectedState)[0]; // Extract the state name
            const cities = selectedState[stateName]; // Extract the cities for the selected state
          
            // Convert the cities into the format expected by the dropdown component
            const cityDataArray = cities.map(city => ({
              id: city,
              cityname: city,
            }));
          
            setSelectedCity(cityDataArray);
          }
      }
      
    return (
        <View style={{flexDirection:'row', width:"1000%",justifyContent:'center', width:'100%', alignContent:'center',
        backgroundColor:'#F8FAFB'}}>
            <View style={{alignContent:'center',width:"40%"
        }}>
            
      <Dropdown
        style={[styles.dropdown, isFocus && { borderTopWidth:1, borderColor: '#158e73'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={selectedState}
        search
        maxHeight={300}
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.containeryy}
        itemTextStyle={styles.itemTextStyle}
        mode='modal'
        onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        backgroundColor="rgba(0, 0, 0, 0.6)"
        labelField="label"
        valueField="value"
        placeholder={locationState}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false)
          handleSelect(item.value)
          handleStateSelect(item.value)
        }}
        renderRightIcon={() => (
            <Ionicons
              style={styles.icon}
              color={isFocus ? 'gray' : 'green'}
              name="chevron-down-outline"
              size={20}
            />
          )}
      />
</View>
<View style={{  alignContent:'center',  width:"60%", borderLeftWidth:1, borderLeftColor:'#158e73',
borderBottomColor:'#158e73',
        }}>
<Dropdown
        style={[styles.dropdown, isFocus && { borderTopWidth:1, borderColor: '#158e73' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={selectedCity}
        search
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.containeryy}
        itemTextStyle={styles.itemTextStyle}
        mode='modal'
        backgroundColor="rgba(0, 0, 0, 0.6)"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        maxHeight={300}
        labelField="cityname"
        valueField="id"
        placeholder={locationCapital}
        searchPlaceholder="Search..."
        value={capital}
        onChange={item => {
          setCapital(item.capital);
          setIsFocus(false)
          handleCapitalSelect(item.cityname)
        }}
        renderRightIcon={() => (
            <Ionicons
              style={styles.icon}
              color={isFocus ? 'gray' : 'green'}
              name="chevron-down-outline"
              size={20}
            />
          )}
      />
</View>
</View>

      
    );
  };

  export default DropDownMenu;

  const styles = StyleSheet.create({
    dropdown: {
        width:'100%',
      height:42,
        // backgroundColor:'#F8FAFB',
      fontFamily:"Poppins-Regular",
      borderBottomWidth:1,
      borderBottomColor:'#158e73',
    },
    icon: {
      marginRight: 0,
    },
    placeholderStyle: {
      fontSize: 12,
      paddingStart:10,
      fontFamily:"Poppins-light",
      color:'gray'
    },
    selectedTextStyle: {
      fontSize: 13,
      fontFamily:"Poppins-Regular"
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      fontFamily:"Poppins-Regular"
    },
    containeryy:{
        backgroundColor:"#fff",
        borderRadius:10,
       
      
        
        
    },
    itemTextStyle:{
        fontSize: 13,
        fontFamily:"Poppins-Regular",
        borderRadius:10,
        borderBottomWidth:1,
       
        borderBottomColor:'#e5e6ea',
    },
    containerStyle:{
        
        backgroundColor:'#fff',
        padding:16,
            marginBottom:20,
        height:"50%",
        width:300,
        borderWidth:1,
        position:'absolute',
        bottom:-20 * 1.1,
        elevation:1,
        shadowColor:'#eee',
      borderRadius:10,
      borderTopColor:'#158e73',
      borderColor:'#e5e6ea',
      zIndex:1
    }
  });