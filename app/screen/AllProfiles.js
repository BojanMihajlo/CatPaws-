import React, { useEffect, useState,useContext } from 'react';
import { View,  Image, Text, ActivityIndicator, StyleSheet,TouchableOpacity,Modal,TextInput,Button, } from 'react-native';
import { Card } from 'react-native-paper';
import { ThemeContext } from './ThemeContext';

import useStore from "./useStore"



const ItemsScreen = ({items,onLike,onComment,fetchItems}) => {
  const [comment, setComment] = useState(""); 
 
  const {name, loadUserName } = useStore();

  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    loadUserName();
  }, []);

  const handleDeleteComment = async (itemId, commentIndex) => {
    try {
      const response = await fetch(`https://backendcatpaws.onrender.com/items/${itemId}/comments/${commentIndex}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        alert("Comment deleted!");
        fetchItems()
        // Refresh UI to remove the comment from state
      } else {
        alert("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

 
  
  return (
    <View style={styles.itemsContainer}>
            {items.map((item) => (
              <Card key={item.id} style={{ margin: 10, padding: 10 ,backgroundColor:theme==="light"?"#f9e9e8":"#daf8fb"}}>
                {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                
                </View>
                <TouchableOpacity onPress={() => onLike(item.id)}>
        <Text>❤️ {item.likes} Likes</Text>
      </TouchableOpacity>

      {/* Comment Input */}
      <TextInput
        placeholder="Write a comment..."
        value={comment}
        onChangeText={setComment}
        style={{ borderWidth: 1, marginTop: 5, padding:8,borderColor:theme==="light"?"#a2615c":"#549fa7",borderTopLeftRadius:10,borderTopRightRadius:10 }}
      />
      <TouchableOpacity onPress={() => { onComment(item.id, comment + `-${name}`); setComment(""); }} style={{backgroundColor:theme==="light"?"#a2615c":"#549fa7",  alignItems:"center",padding:8,borderBottomLeftRadius:10,borderBottomRightRadius:10,marginBottom:8}}>
          <Text>Post Comment</Text>
      </TouchableOpacity>
      {/* Display Comments */}

      {Array.isArray(item.comments) &&
  item.comments.map((cmt, index) => (
    <View key={index} style={{ marginBottom: 5,flexDirection:"row",justifyContent:"space-between" }}>
      <Text>💬 {cmt}</Text>
      <TouchableOpacity onPress={() => handleDeleteComment(item.id, index)}>
        <Text style={{ color: "red", marginRight: 10,fontWeight:"bold" }}>X</Text>
      </TouchableOpacity>
    </View>
  ))}

              </Card>
            ))}
          </View>
  );
};

const styles = StyleSheet.create({
 
  card: { margin: 10, padding: 10 ,backgroundColor:"#f9e9e8"},
  image: { width: '100%', height: 200, borderRadius: 10 },
  textContainer: { marginTop: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: 'gray' },
  description: { marginTop: 5 },
  comments: { marginTop: 5, fontStyle: 'italic' },
  itemsContainer: { paddingHorizontal: 12,paddingVertical:30 },
 
});

export default ItemsScreen;
