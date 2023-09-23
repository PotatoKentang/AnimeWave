import React, { useEffect } from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  Easing,
  withSpring,
  withTiming,
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withSequence,
  useAnimatedStyle,
  withDelay,
  interpolate,
  Extrapolate,
  Keyframe
} from "react-native-reanimated";
import { Button } from "@gluestack-ui/themed";


export default function LoadingScreen() {
  // Create a shared value for the loading animation
  const progress = useSharedValue(0);
  useEffect(()=>{

  },[])
  const handlePress = () => {
    progress.value += 100;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(progress.value * 2) }],
    transform: [{ translateX: -withSpring(progress.value * 2) }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedStyles]}>
        Loading...
      </Animated.Text>
      <Button onPress={handlePress}><Text>Press Me</Text></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
