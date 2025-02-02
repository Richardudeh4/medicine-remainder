import * as LocalAuthentication from "expo-local-authentication"; 
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const {width} = Dimensions.get("window");
const AuthScreen = () => {
    const [hasBiometrics, setHasBiometrics] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState(false);
  return (
    <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.container}>
         <View style={styles.content}>
        <View style={styles.iconContainer}>
        <Ionicons name="medical" size={80} color="white"/>
        </View>
        <Text style={styles.title}>
            MedReminder
        </Text>
        <Text>
            Your personal medical assistant
        </Text>
        <View>
            <Text> Welcome back </Text>
            <Text>
                {
                hasBiometrics ? "Use Face ID/Touch ID or Pin to access your medications": "Enter your pin to access your medications"
                }
            </Text>
            <TouchableOpacity>
                <Ionicons name={hasBiometrics ? "finger-print-outline" : "keypad-outline"} size={24} color="white"/>
                <Text>
                    {isAuthenticating ? 
                    "Verifying...." : hasBiometrics? "Authenticate" : "Enter PIN"
                    }
                </Text>
            </TouchableOpacity>
            {
                error && <View>
                    <Ionicons name="alert-circle" size={20} color={"#f44336"}/>
                    <Text>
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
        color: "white",
        fontSize:24,
    }
})