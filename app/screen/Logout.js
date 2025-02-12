
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { CommonActions } from "@react-navigation/native";




const Logout = () => {

const navigation = useNavigation()

const { theme } = useContext(ThemeContext);

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('user'); // ✅ Clear user data
          await AsyncStorage.removeItem('profileImage');
          await AsyncStorage.removeItem('profileDescription');
          await AsyncStorage.removeItem("profileAlbum");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name:"Login" }], // Ensure "LoginScreen" exists in the stack
            })
          );
        } catch (error) {
          console.error("Logout Error:", error);
        }
      };



    return(
         <View style={styles.viewButton}>
                <TouchableOpacity onPress={handleLogout} style={{ backgroundColor:theme==="light"? '#97382a':"#57becb", padding: 10, borderRadius: 5 }}>
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                </View>
    )
}

export default Logout


const styles = StyleSheet.create({
    viewButton:{ justifyContent:"flex-start",marginLeft:240},
   
  buttonText: { color: 'white', fontSize: 12 },


})