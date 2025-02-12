import React, { useEffect, useState,useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert,TextInput,Image,Button,FlatList,ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, BerkshireSwash_400Regular } from '@expo-google-fonts/berkshire-swash';
import * as ImagePicker from 'expo-image-picker';
import { ThemeContext } from './ThemeContext';


const ProfileScreen = () => {
  

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false); 
  const [album, setAlbum] = useState([]);

  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    // Load stored data when the component mounts
    const loadProfileData = async () => {
      const storedImage = await AsyncStorage.getItem('profileImage');
      const storedDescription = await AsyncStorage.getItem('profileDescription');
      const storedUser = await AsyncStorage.getItem('user');
      const savedAlbum = await AsyncStorage.getItem("profileAlbum");
      
      if (storedImage) setImage(storedImage);
      if (storedDescription) setDescription(storedDescription);
      if (storedUser) {const parsedUser = JSON.parse(storedUser);
      if (savedAlbum) setAlbum(JSON.parse(savedAlbum));
        setName(parsedUser.name)}
    };
    
    loadProfileData();
  }, []);

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await AsyncStorage.setItem('profileImage', result.assets[0].uri);
    }
  };

  // Function to save the description
  const saveDescription = async () => {
    try {
      await AsyncStorage.setItem("profileImage", image || "");
      await AsyncStorage.setItem("profileDescription", description);
      setIsEditing(false);
      Alert.alert("Success", "Profile data saved!");
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };


  const pickAlbumImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newAlbum = [...album, result.assets[0].uri];
      setAlbum(newAlbum);
      await AsyncStorage.setItem("profileAlbum", JSON.stringify(newAlbum));
    }
  };

  
  const [fontsLoaded] = useFonts({
      BerkshireSwash_400Regular,
    });
  
  
   if (!fontsLoaded) return null; 
  return (
    <ImageBackground
     resizeMode="repeat"
     source={require(`../images/cats54.jpg`)}
     style={{flex:1,width:"100%",height:"100%"}}
    >
    <View style={styles.container}>

          <View style={{flex:2, justifyContent:"flex-start", alignItems:"center",padding:20,backgroundColor:theme==="light"?"#dfb9b4":"#b9ebf1",borderRadius:15,width:"100%",marginTop:10}}>
       
          {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}> */}
      <Text style={{ fontSize: 30, marginBottom: 20, fontFamily:'BerkshireSwash_400Regular'}}>{name}</Text>

      {/* 📌 Display Image if Selected */}
      {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 10 }} />}

      {/* 📌 Show Image Picker only in Edit Mode */}
      {isEditing && <TouchableOpacity  onPress={pickImage} style={{backgroundColor:theme==="light"?"#a2615c":"#549fa7",borderRadius:10}}>

        <Text style={styles.buttonText}>Pick a Profile Image</Text>
      </TouchableOpacity>
      
      }

      {/* 📌 Display Description */}
     
      {isEditing ? (
        <TextInput
          placeholder="Enter new description..."
          value={description}
          onChangeText={setDescription}
          style={{
            width: "100%",
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            marginTop: 5,
          }}
        />
      ) : (
        <Text style={{ fontSize: 16, color: "gray", marginTop: 5 }}>{description || "No description yet."}</Text>
      )}

      {/* 📌 Edit & Save Buttons */}
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        {isEditing ? (
          <TouchableOpacity onPress={saveDescription} style={{backgroundColor:theme==="light"?"#a2615c":"#549fa7",borderRadius:10}} >
           <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{backgroundColor:theme==="light"?"#a2615c":"#549fa7",borderRadius:10}} onPress={() => setIsEditing(true)} >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={{ width: "100%", marginTop: 30 }}>
        <Text style={{ fontSize: 18,fontFamily:'BerkshireSwash_400Regular', marginBottom: 10, textAlign: "center" }}>My Album</Text>
        <TouchableOpacity style={{backgroundColor:theme==="light"?"#a2615c":"#549fa7",borderRadius:10}} onPress={pickAlbumImage} >
        <Text style={styles.buttonText}>Add Image to Album</Text>
        </TouchableOpacity>

        {/* 📌 Display Album Images */}
        <FlatList
          data={album}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          style={{ marginTop: 10 }}
          renderItem={({ item }) => (
            <View style={{ margin: 5 }}>
              <Image source={{ uri: item }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            </View>
          )}
        />
      </View>

    </View>
         
     
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center',flexDirection:"column",padding: 20 },
  myProfile:{flex:2, justifyContent:"flex-start", alignItems:"center",padding:20,backgroundColor:"#dfb9b4",borderRadius:15,width:"100%",marginTop:10},
  buttonText:{color:"white",padding:10},
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  imagePlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 10 },
  button2: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
});

export default ProfileScreen;


