import React, { useState } from "react";
import { View, Text, TextInput, Modal, Button, TouchableOpacity, Alert } from "react-native";

const Posts = ({fetchItems}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [postData, setPostData] = useState({
    name: "",
    image: "",
    description: "",
    comments: "",
    subtitle: "",
  });

  // 📌 Handle input changes
  const handleChange = (key, value) => {
    setPostData({ ...postData, [key]: value });
  };

  // 📌 Submit post to backend
  const handleSubmit = async () => {
    try {
      const response = await fetch("https://backendcatpaws.onrender.com/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (response.ok) {  
        setPostData({ name: "", image: "", description: "", comments: "", subtitle: "" }); // Clear form
        Alert.alert("Success", "Post created successfully!");
        setModalVisible(false);
        fetchItems()
      } else {
        Alert.alert("Error", "Failed to create post.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* 📌 Button to Open Post Modal */}
      <TouchableOpacity
        style={{ backgroundColor: "#d4c8c7", padding: 15, borderRadius: 10, alignItems: "center" }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "black", fontSize: 16,fontFamily: 'BerkshireSwash_400Regular' }}>Post your cat</Text>
      </TouchableOpacity>

      {/* 📌 Post Creation Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Create a Post</Text>

            <TextInput placeholder="Name" value={postData.name} onChangeText={(text) => handleChange("name", text)} style={styles.input} />
            <TextInput placeholder="Image URL" value={postData.image} onChangeText={(text) => handleChange("image", text)} style={styles.input}keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false} />
            <TextInput placeholder="Description" value={postData.description} onChangeText={(text) => handleChange("description", text)} style={styles.input} />
            <TextInput placeholder="Comments" value={postData.comments} onChangeText={(text) => handleChange("comments", text)} style={styles.input} />
            <TextInput placeholder="Subtitle" value={postData.subtitle} onChangeText={(text) => handleChange("subtitle", text)} style={styles.input} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <TouchableOpacity  onPress={() => setModalVisible(false)} style={{backgroundColor:"red",borderRadius:10,alignItems:"center"}} >
                <Text style={{color:"white",padding:10}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:"blue", borderRadius:10}} >
                <Text style={{color:"white",padding:10}}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
};

export default Posts;
