import React from 'react'
import {
        StyleSheet,
        Text,
        View,
      } from 'react-native';
      
      import LottieView from 'lottie-react-native';
const LoadState = ({
   children,
    showAnimation,
    containerStyle,
    textStyle,
    title,
    style,
    ...lottieProps
  }) => {
    
      
      
        if (!showAnimation) return <>{children}</>;
      
        return (
          <View
            style={[
              {
                
                alignItems: 'center',
                justifyContent: 'center',
               
              },
              containerStyle,
            ]}
          >
            <LottieView
              style={{ width: '80%', aspectRatio: 1, ...style }}
              autoPlay
              loop
              {...lottieProps}
            />
            {title && (
              <Text style={[{ fontSize: 25, fontWeight: '300' }, textStyle]}>
                {title}
              </Text>
            )}
          </View>
        );
      };
export default LoadState
const styles = StyleSheet.create({});