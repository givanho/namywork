import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import categories from '../data/categories';
import { Ionicons } from '@expo/vector-icons';

const DropDownCat = () => {
  const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#158e73' }]}>
            Select Category
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && {borderTopWidth:1, borderColor: '#158e73' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={styles.containerStyle}
          itemContainerStyle={styles.containeryy}
          itemTextStyle={styles.itemTextStyle}
          activeColor={styles.activeColor}
          data={categories}
          search
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder={!isFocus ? 'Select Category' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderRightIcon={() => (
            <Ionicons
              style={styles.icon}
              color={isFocus ? '#158e73' : 'black'}
              name="chevron-down-outline"
              size={20}
            />
          )}
          renderLeftIcon={() => (
            <Ionicons
              style={styles.icon}
              color={isFocus ? '#158e73' : 'black'}
              name="square-outline"
              size={20}
            />
          )}
        />
      </View>
    );

  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  activeColor:{
    backgroundColor: '#e5e6ea',
  },
  dropdown: {
    height: 50,
    borderColor: '#e5e6ea',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontFamily:"Poppins-Regular",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 13,
    fontFamily:"Poppins-light",
  },
  selectedTextProps:{
    textTransform:'uppercase'
  },
  placeholderStyle: {
    fontSize: 15,
      paddingStart:10,
      fontFamily:"Poppins-light",
      
  },
  selectedTextStyle: {
    fontSize: 15,
    fontFamily:"Poppins-Regular",
    
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    fontFamily:"Poppins-light",
  },
  containeryy:{
    backgroundColor:"#fff",
    borderRadius:10,
},

itemTextStyle:{
    fontSize: 13,
    fontFamily:"Poppins-Regular",
    borderRadius:8,
    borderBottomWidth:1,
   
    borderBottomColor:'#e5e6ea',
},
containerStyle:{
    marginTop:-15,
    backgroundColor:'#fff',
    padding:12,
    borderWidth:1,
    elevation:1,
    shadowColor:'#158e73',
  borderRadius:8,
  borderTopColor:'#158e73',
  borderColor:'#e5e6ea',
  
}
});
export default DropDownCat;
