import React, { useState,useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,ImageBackground,Switch,KeyboardAvoidingView,Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';
import { useFonts, BerkshireSwash_400Regular } from '@expo-google-fonts/berkshire-swash';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const navigation = useNavigation()
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const userData = { name, email,password };
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    Alert.alert('Success', 'Account created! You can now log in.');
    navigation.navigate('Login'); // Redirect to login screen
  };
   
    const [fontsLoaded] = useFonts({
          BerkshireSwash_400Regular,
        });
        
        if (!fontsLoaded) return null; 
  
  return (
  
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex:1}}>
      <View style={styles.container}>
                        <ImageBackground
                            resizeMode="cover"
                            source={require(`../images/catpaw1.jpg`)}
                            style={styles.image}
                          >

                       <Switch
                      value={theme === "dark"}
                      onValueChange={toggleTheme}
                      style={{marginRight:10}}
                            />
                      
                            <MotiView 
                                  from={{ translateX: -200, opacity: 0 }} // Start off-screen left
                                  animate={{ translateX: 0, opacity: 1 }} // Move to position
                                  transition={{ type: 'spring',  damping: 8, // Lower damping = slower, bouncier effect
                                    stiffness: 80, // Lower stiffness = slower movement
                                    mass: 1,
                                    duration: 1500, // Increase the duration for slower motion 
                                  }}
                                  style={styles.titleView}>
                                  <Text style={{ fontFamily: 'BerkshireSwash_400Regular', fontSize:50}}>CatPaws</Text>
                                  </MotiView>
       <View style={styles.view}>
   
      <TextInput placeholder="Name/Cats name" placeholderTextColor="#555"  value={name} onChangeText={setName}  style={[styles.input, isFocused && styles.inputFocused]}
       onFocus={() => setIsFocused(true)} 
       onBlur={() => setIsFocused(false)} 
      />
      <TextInput placeholder="Email" placeholderTextColor="#555"  value={email} onChangeText={setEmail}  style={[styles.input, isFocused && styles.inputFocused]} 
       onFocus={() => setIsFocused(true)} 
       onBlur={() => setIsFocused(false)} 
      />
      <TextInput placeholder="Password" placeholderTextColor="#555"  value={password} onChangeText={setPassword} secureTextEntry  style={[styles.input, isFocused && styles.inputFocused]} 
      onFocus={() => setIsFocused(true)} 
      onBlur={() => setIsFocused(false)} 
      />
      <TouchableOpacity onPress={handleRegister} style={{alignItems:"center", backgroundColor:theme==="light"?"#97382a":"#57becb", borderRadius:5, paddingVertical:7,paddingHorizontal:18}}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ marginTop: 10, color:theme==="light"?"#97382a" :"#57becb" }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
    {/* </KeyboardAvoidingView> */}
    </ImageBackground>
    </View>
   </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  view:{flex:2,justifyContent:"center",alignItems:"center", paddingBottom:75,marginRight:5},
  titleView: {flex:1,alignItems:"center",justifyContent:"center",paddingBottom:130},
  input: { width: 200, height: 40, borderWidth: 1, marginBottom: 10, padding: 5,borderRadius:6 },
  inputFocused: {
    backgroundColor: "#f0f0f0",
  },
  buttonText: { color: 'white', fontSize: 16 },
  image:{flex: 1, width: "100%", height: "100%"},
  
});

export default RegisterScreen;
