import React from 'react';
import { useEffect, useState,useContext } from 'react';
import { View, Text,StyleSheet,ImageBackground,ScrollView,ActivityIndicator,Switch } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts, BerkshireSwash_400Regular } from '@expo-google-fonts/berkshire-swash';
import AllProfiles from './AllProfiles'
import Posts from './Posts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from "./useStore"
import Logout from './Logout';
import { ThemeContext } from './ThemeContext';



const HomeScreen = () => {
   const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { name, loadUserName } = useStore();

     const { theme, toggleTheme } = useContext(ThemeContext);


  const storedUser = AsyncStorage.getItem('user');
  const parsedUser= storedUser.name
  // const parsedUser = JSON.parse(storedUser)
 
  const API_URL = 'https://backendcatpaws.onrender.com/items'

    useEffect(() => {
      fetchItems();
      loadUserName();
    }, []);
  
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) {
      return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',padding:10}}>
      <ActivityIndicator size="large" color="blue"  />
         <Text>Backend is loading...</Text>
         </View>)
    }
  
    const handleLike = async (id) => {
      try {
        const response = await fetch(`https://backendcatpaws.onrender.com/items/${id}/like`, { method: "PUT" });
        if (response.ok) {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === id ? { ...item, likes: item.likes + 1 } : item
            )
          );
        }
      } catch (error) {
        console.error("Error liking item:", error);
      }
    };
    
    const handleComment = async (id, comment) => {
      if (!comment.trim()) return;
    
      try {
        const response = await fetch(`https://backendcatpaws.onrender.com/items/${id}/comment`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment }),
        });
    
        if (response.ok) {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === id ? { ...item, comments: [...item.comments, comment] } : item
            )
          );
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    };
    
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1 ,backgroundColor:theme==="light"?"#c4adaa":"#d8e0e1"}}>
      
      
     <ScrollView style={{flex:1}}>
     
    <ImageBackground
           resizeMode="cover"
           source={require(`../images/catpaw3.jpg`)}
           style={styles.hero}
       >

        <View style={{flexDirection:"row", justifyContent:"space-between",padding:15}}>
          <Text style={{fontFamily: 'BerkshireSwash_400Regular'}}>Hi {name}</Text>
          <Logout/>
        </View>
          <View style={{flex:1,justifyContent:"flex-end",alignItems:"center"}}>
      <Text style={{fontFamily: 'BerkshireSwash_400Regular', fontSize:18,marginBottom:15}}>CatPaws is a social media app & community where we share our cats' lives.</Text>
      </View>
      </ImageBackground>  
      <Posts fetchItems={fetchItems}/>
      <AllProfiles items={items} onComment={handleComment} onLike={handleLike} fetchItems={fetchItems} name={parsedUser}/>
      <Switch
       value={theme === "dark"}
      onValueChange={toggleTheme}
      style={{marginRight:10}}
        />
    </ScrollView> 
    
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create ({

 hero:{width:"100%",height:250},
 textcontainer:{padding:20, flex:1, justifyContent:"center"},


})