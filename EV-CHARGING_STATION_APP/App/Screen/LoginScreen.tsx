import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../Utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = async () => {
        try {
            // Start the OAuth flow and destructure the result
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
            
            // Set the session as active if it's created
            if (createdSessionId) {
                await setActive({ session: createdSessionId });
            }
        } catch (error) {
            console.error("OAuth error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/logo.png")} style={styles.logoImage} />
            <Image source={require("../../assets/images/ev-charging.png")} style={styles.bgImage} />
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Your Ultimate EV Charging Station Finder App</Text>
                <Text style={styles.desc}>
                    Find EV charging stations near you, plan trips, and so much more with just one click.
                </Text>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Login With Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80,
    },
    logoImage: {
        width: 250,
        height: 40,
        resizeMode: "contain",
    },
    bgImage: {
        width: "100%",
        height: 240,
        marginTop: 20,
        resizeMode: "cover",
    },
    textContainer: {
        padding: 20,
    },
    heading: {
        fontSize: 25,
        fontFamily: "outfit-bold",
        textAlign: "center",
        marginTop: 20,
    },
    desc: {
        fontSize: 17,
        fontFamily: "outfit",
        marginTop: 15,
        textAlign: "center",
        color: Colors.GRAY,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 70,
        alignItems: "center",
    },
    buttonText: {
        color: Colors.BLACK,
        textAlign: "center",
        fontFamily: "outfit",
        fontSize: 17,
    },
});
