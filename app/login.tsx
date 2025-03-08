import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { useRouter, useNavigation } from 'expo-router';

export default function Login() {
    const [fontsLoaded] = useFonts({ PermanentMarker_400Regular });
    const [passwd, setPasswd] = useState('');
    const [email, setEmail] = useState('');

    const router = useRouter();
    const navigation = useNavigation();

    const handleLogIn = () => {
      // check log in here
      router.replace('/workout')
    }

    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, []);

    const images = {
        'corgi-1': require('../assets/images/corgi-1.png'),
        'corgi-2': require('../assets/images/corgi-2.png'),
        'corgi-3': require('../assets/images/corgi-3.png'),
        'corgi-4': require('../assets/images/corgi-4.png'),
      };
      
      const getImage = () => {
        if (passwd.length === 0) return images['corgi-1'];
        if (passwd.length <= 2) return images['corgi-2'];
        if (passwd.length <= 4) return images['corgi-3'];
        return images['corgi-4'];
      };
      
    return (
        <View style={styles.container}>
            <Image source={getImage()} style={styles.logo} />
            <Text style={styles.title}>CORGFIT</Text>

            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} placeholderTextColor="#888" />
            <TextInput placeholder="Password" style={styles.input} value={passwd} onChangeText={setPasswd} placeholderTextColor="#888" secureTextEntry />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogIn}>
                <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton}>
                <FontAwesome name="google" size={30} color="#fff" />
            </TouchableOpacity>

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                    <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1F24',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    marginBottom: 30,
    fontFamily: 'PermanentMarker_400Regular'
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#CC749C',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    
  },
  signupText: {
    color: '#fff',
  },
  signupLink: {
    color: '#CC8533',
    fontWeight: '700',
    marginLeft: 5,
  },
});