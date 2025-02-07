import * as LocalAuthentication from "expo-local-authentication"; 
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from "expo-router";

const {width} = Dimensions.get("window");


const AuthScreen = () => {
    const [hasBiometrics, setHasBiometrics] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState<string | null>(null) ;
    const router = useRouter();
useEffect(() => {
    checkBiometrics();
}, [])

    const checkBiometrics = async () => {
        const hasHardWare = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        setHasBiometrics(hasHardWare && isEnrolled);
    }
    const authenticate = async() => {
        try{
            setIsAuthenticating(true);
            setError(null);
            const hasHardWare = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            const supportedType = await LocalAuthentication.supportedAuthenticationTypesAsync;

            //handle supported type
            // if(supportedType.length === 0){
            //     throw new Error("No authentication type available");
            // }
            const auth = await LocalAuthentication.authenticateAsync({
                promptMessage: hasHardWare && isEnrolled ? "Use faceId/TouchId" : "Enter Pin to access medications",
                fallbackLabel: "Use Pin",
                cancelLabel: 'Cancel',
                disableDeviceFallback: false,
            });
            if(auth.success){
                router.replace('/home')
            }
            else{
                setError("Authentication Failed: Please try again")
            }
        }
        catch(error){

        }
    }
  return (
    <LinearGradient colors={["#6883bc", "#3b4d61"]} style={styles.container}>
         <View style={styles.content}>
        <View style={styles.iconContainer}>
        <Fontisto name="doctor" size={80} color="white" />
        </View>
        <Text style={styles.title}>
        MediMate
        </Text>
        <Text style={styles.subTitle}>
            Your personal medical assistant
        </Text>
        <View style={styles.card}>
            <Text style={styles.welcomeText}> Welcome back </Text>
            <Text style={styles.intructionText}>
                {
                hasBiometrics ? "Use Face ID/Touch ID or Pin to access your medications": "Enter your pin to access your medications"
                }
            </Text>
            <TouchableOpacity 
            style={[styles.button, isAuthenticating && styles.buttonDisabled]}
            onPress={authenticate}
            disabled={isAuthenticating}
            >
               
                <Ionicons style={styles.buttonIcon} name={hasBiometrics ? "finger-print-outline" : "keypad-outline"} size={24} color="white"/>
                <Text style={styles.buttonText}>
                    { isAuthenticating ? 
                    "Verifying...." : hasBiometrics? "Authenticate" : "Enter PIN"
                    }
                </Text>
            </TouchableOpacity>
            {
                error && 
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={20} color={"#f44336"}/>
                    <Text style={styles.errorText }>
                            {error}
                    </Text>
                </View>
            }
        </View>
        </View>
    </LinearGradient>
   
  )
}

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    content: {
        flex:1,
        padding:20, 
        justifyContent:"center",
        alignItems: "center",
    },
    iconContainer: {
        width:120,
        height:120,
        backgroundColor: 'rgba(255,255,255, 0.2)',
        borderRadius:60,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,

    },
    title: {
        fontSize:24,
        fontWeight: 'bold',
        color: "white",
        textShadowColor: "rgba(0,0,0,0.2)",
        textShadowOffset: {width:1, height:1},
        textShadowRadius: 3
    },
    subTitle: {
        color: "rgba(255,255,255,0.9)",
        fontSize:18,
        marginBottom:40,
        textAlign:"center",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 20,
        padding:30,
        width: width - 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation:5,
    },
    welcomeText: {
        fontSize:24,
        fontWeight: "bold",
        color: "#333",
        marginBottom:10,
    },
    intructionText: {
        color: "#666",
        fontSize:16,
        marginBottom: 30,
        textAlign: "center",
    },
    button:{
        backgroundColor: '#1d3c45',
        borderRadius:12,
        paddingVertical:15,
        paddingHorizontal:30,
        width:'100%',
        alignItems:"center",
        justifyContent:"center",
        flexDirection: "row",
        gap:8
    },
    buttonDisabled:{
        opacity:0.7,
    },
    buttonIcon: {
        marginRight:10
    },
    buttonText:{
        color: "white",
        fontSize:16,
        fontWeight:"600",
    }, 
    errorContainer:{
        alignItems: "center",
        marginTop: 20,
        padding:10,
        backgroundColor: "#ffebee",
        borderRadius:8,
    },
    errorText:{
         color: "#f44336",
         fontSize:14,
         marginLeft:8,

    },
});