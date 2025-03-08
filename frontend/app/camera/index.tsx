import { Camera, CameraView } from "expo-camera";
import { Link } from "expo-router";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
// import { useEffect, useRef } from "react";

export default function Home() {
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView style={StyleSheet.absoluteFillObject} facing="back" />
      <View>
        <Link href={".."} asChild>
          <Pressable>
            <Text>Return</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    color: "#000",
    backgroundColor: "#a3a380",
    width: 100,
    // height: 50,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
  },
});
