import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import for tab focus
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const { width, height } = Dimensions.get("window");

const CatGameScreen = () => {
  const [catPosition, setCatPosition] = useState({ x: 100, y: 100 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const { theme } = useContext(ThemeContext);
  

  useEffect(() => {
    if (timeLeft === 0 && gameStarted) {
      setTimeout(() => {
        alert(`Game Over! Your score: ${score}`);
        resetGame();
      }, 100);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameStarted(true);
  };

  const moveCat = () => {
    if (timeLeft > 0) {
      const randomX = Math.random() * (width - 100);
      const randomY = Math.random() * (height - 200);
      setCatPosition({ x: randomX, y: randomY });
      setScore(score + 1);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setTimeLeft(0);
  };

  // Stop the game when switching tabs
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        resetGame(); // Reset when tab changes
      };
    }, [])
  );

  return (
    <View style={{flex: 1, backgroundColor:theme==="light"?"#a2615c":"#549fa7", justifyContent: "center", alignItems: "center"}}>
      {gameStarted ? (
        <>
          <Text style={styles.score}>🐱 Score: {score}</Text>
          <Text style={styles.timer}>⏳ Time: {timeLeft}s</Text>

          <TouchableOpacity onPress={moveCat} style={[styles.cat, { left: catPosition.x, top: catPosition.y }]}>
            <Image source={require(`../images/gamecat.jpg`)} style={styles.catImage} />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={startGame} style={styles.startButton}>
          <Text style={styles.startText}>Start Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
 
  score: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  timer: { fontSize: 20, marginBottom: 20 },
  cat: { position: "absolute", width: 100, height: 100 },
  catImage: { width: "100%", height: "100%", resizeMode: "contain" },
  startButton: { backgroundColor: "black", padding: 15, borderRadius: 10 },
  startText: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
});

export default CatGameScreen;
