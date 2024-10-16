import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView
} from 'react-native';
import { StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;

    const handleAuth = async (action: 'signIn' | 'signUp') => {
        setLoading(true);
        try {
            const authFunction = action === 'signIn' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
            const response = await authFunction(auth, email, password);
            console.log(response);
            Alert.alert("Success", action === 'signIn' ? "Logged in successfully!" : "Account created successfully!");
            navigation.navigate('Home');
        } catch (error: any) {
            console.log(error);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <Text style={styles.title}>Welcome</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => handleAuth('signIn')}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => handleAuth('signUp')}>
                            <Text style={styles.buttonText}>Create account</Text>
                        </TouchableOpacity>
                    </>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 10,
    },
    secondaryButton: {
        backgroundColor: '#34C759',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;