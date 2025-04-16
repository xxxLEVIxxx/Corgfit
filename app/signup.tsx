import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { useRouter, useNavigation } from 'expo-router';


export default function SignUp() {
    const [fontsLoaded] = useFonts({ PermanentMarker_400Regular });
    const [passwd, setPasswd] = useState('');
    const [email, setEmail] = useState('');
    const [confirm, setConfirm] = useState('');
    const [correct, setCorrect] = useState(true);
    const [passwdError, setPasswdError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [index, setIndex] = useState(0);
    const [startAnimation, setStartAnimation] = useState(false);
    const [reverseAnimation, setReverseAnimation] = useState(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    const router = useRouter();

    const handleSignUp = () => {
      // Validate password requirements
      const error = validatePassword(passwd);
      if (error) {
        setPasswdError(error);
        setCorrect(false);
        return;
      }
      
      // Validate password matching
      if (passwd !== confirm) {
        setConfirmError("Passwords do not match! Please re-enter.");
        setCorrect(false);
      } else {
        // All validation passed
        router.replace('/survey');
      }
    }

    const handleFocus = () => {
      setStartAnimation(true);
      setReverseAnimation(false)
      setIndex(0);
    }

    const handleBlur = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setReverseAnimation(true);
      setStartAnimation(false);
    }

    const validatePassword = (password: string) => {
      if (password.length < 8) {
        return "Password must be at least 8 characters";
      }
      if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one capital letter";
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return "Password must contain at least one special character";
      }
      return "";
    };

    const images = [
      require('../assets/images/corgi-1.png'),
      require('../assets/images/corgi-2.png'),
      require('../assets/images/corgi-3.png'),
      require('../assets/images/corgi-4.png'),
    ]

    useEffect(() => {
      if (startAnimation && index < images.length - 1) {
        timeoutRef.current = setTimeout(() => {
          setIndex(prevIndex => prevIndex + 1);
        }, 80); 
      } else if (startAnimation && index === images.length - 1) {
        setStartAnimation(false);
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [startAnimation, index]);

    useEffect(() => {
      if (reverseAnimation && index > 0) {
        timeoutRef.current = setTimeout(() => {
          setIndex(prev => prev - 1);
        }, 80);
      } else if (reverseAnimation && index === 0) {
        setReverseAnimation(false);
      }
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [reverseAnimation, index]);
      
    const handlePasswordChange = (text: string) => {
      setPasswd(text);
      const error = validatePassword(text);
      setPasswdError(error);
      
      // Clear the match error when editing either password field
      setConfirmError("");
      setCorrect(true); // Reset general error state when editing
    };

    const handleConfirmChange = (text: string) => {
      setConfirm(text);
      // Clear errors while typing in confirm field
      setConfirmError("");
      setCorrect(true); // Reset general error state when editing
    };
    
    const handleConfirmBlur = () => {
      // Don't show errors on blur - only on signup button click
      // This ensures consistent behavior
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
              <FontAwesome name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Image source={images[index]} style={styles.logo} />
            <Text style={styles.title}>CORGFIT</Text>

            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} placeholderTextColor="#888" />
            
            <View style={styles.passwordContainer}>
              <TextInput 
                placeholder="Password" 
                style={styles.passwordInput} 
                value={passwd} 
                onChangeText={handlePasswordChange} 
                placeholderTextColor="#888" 
                secureTextEntry={!showPassword} 
                onFocus={handleFocus} 
                onBlur={handleBlur}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowPassword(!showPassword)}
              >
                <FontAwesome 
                  name={showPassword ? "eye" : "eye-slash"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.passwordContainer}>
              <TextInput 
                placeholder="Confirm your password" 
                style={styles.passwordInput} 
                value={confirm} 
                onChangeText={handleConfirmChange} 
                onBlur={handleConfirmBlur}
                placeholderTextColor="#888" 
                secureTextEntry={!showConfirmPassword} 
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesome 
                  name={showConfirmPassword ? "eye" : "eye-slash"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                <Text style={styles.loginButtonText}>Sign up</Text>
            </TouchableOpacity>

            {(!correct || passwdError || confirmError) && (
              <Text style={styles.errorText}>
                {passwdError || confirmError || "Passwords do not match! Please re-enter."}
              </Text>
            )}
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
  closeButton: {
    position: 'absolute',
    top: 80,
    right: 20,
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
    paddingHorizontal: 10,
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
  errorText: {
      color: 'red',
      marginBottom: 15,
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
  },
});