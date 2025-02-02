import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const router = useRouter();
  useEffect(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue:1,
          duration:1000,
          useNativeDriver:true,
        }),
        Animated.spring(scaleAnim,{
          toValue:1,
          tension:10,
          friction:2,
          useNativeDriver:true,
        }),
      ]).start();
      const timer = setTimeout(() => {
        router.replace('/auth');
      }, 2000)

      return () => clearTimeout(timer);
  },[]);
  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.iconContainer,{
          opacity: fadeAnim,
          transform: [{scale: scaleAnim }]
        }
      ]}>
        <Ionicons name='medical' color="white" size={100}/>
      <Text style={styles.appName}>Med Remainer</Text>

      </Animated.View>

    </View>
  )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        alignItems:"center",
    },
    appName:{
      color: "white",
      fontSize:32,
      fontWeight: "bold",
      marginTop:20,
    }
})