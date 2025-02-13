import React from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity ,ImageBackground,Alert,KeyboardAvoidingView,Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';
import { useFonts, BerkshireSwash_400Regular } from '@expo-google-fonts/berkshire-swash';
import  { useState,useEffect,useContext } from 'react';
// import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './ThemeContext';




const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  // const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    const checkStorage = async () => {
      const user = await AsyncStorage.getItem("user");
      console.log("Stored User:", user); // 🔹 Check if user is stored correctly
    };
    checkStorage();
  }, []);
  
  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
     
      if (!storedUser) {
        Alert.alert("Error", "No registered user found. Please sign up first.");
        return;
      }
  
      const user = JSON.parse(storedUser);
      
      // Compare email/password
      if (
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
      ) {
        console.log("✅ Login Successful! Redirecting...");
        await AsyncStorage.setItem("isLoggedIn", "true");
        Alert.alert("Success", "Login successful!");
        navigation.replace("TabNavigator");
      } else {
        console.log("❌ Invalid Credentials!"); // ✅ Step 3: Log why it fails
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };
  




   const [fontsLoaded] = useFonts({
        BerkshireSwash_400Regular,
      });
      
      if (!fontsLoaded) return null; 

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    style={{flex:1}}
    >
      <View style={styles.container}>
                    <ImageBackground
                        resizeMode="cover"
                        source={require(`../images/catpaw1.jpg`)}
                        style={styles.image}
                      >
                        
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
      {/* <Text style={styles.title}>Login</Text> */}
      <TextInput placeholder="Email" placeholderTextColor="#555" value={email} onChangeText={setEmail}  style={[styles.input, isFocused && styles.inputFocused]} 
       onFocus={() => setIsFocused(true)}   
        onBlur={() => setIsFocused(false)}   
      />
      <TextInput placeholder="Password" placeholderTextColor="#555" value={password} onChangeText={setPassword} secureTextEntry  style={[styles.input, isFocused && styles.inputFocused]} 
       onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)}   
      />
      <TouchableOpacity onPress={handleLogin} style={{alignItems:"center", backgroundColor:theme==="light"?"#97382a":"#57becb", borderRadius:5, paddingVertical:7,paddingHorizontal:18}}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{marginTop: 15, color:theme==="light"? '#97382a':"#57becb" }}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
   
    </ImageBackground>
    </View>
   
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  view:{flex:2,justifyContent:"center",alignItems:"center", marginBottom:60,marginRight:5},
  titleView: {flex:1,alignItems:"center",justifyContent:"center",marginBottom:80},
  input: { width: 200, height: 40, borderWidth: 1, marginBottom: 10, padding: 5,borderRadius:6 },
   inputFocused: {
    backgroundColor: "#f0f0f0", // Change color when typing
  },
 
  buttonText:{color:"white"},
  image:{flex: 1, width: "100%", height: "100%"},
 
});

export default LoginScreen;