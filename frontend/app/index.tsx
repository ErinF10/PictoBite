import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const isGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>QR Code Scanner</Text>
      <View style={{ gap: 20 }}>
        {!isGranted && (
          <Pressable onPress={requestPermission}>
            <Text style={styles.buttonStyle}>Request Permissions</Text>
          </Pressable>
        )}
        <Link href={"/camera"} asChild>
          <Pressable disabled={!isGranted}>
            <Text
              style={[styles.buttonStyle, { opacity: !isGranted ? 0.5 : 1 }]}
            >
              Take Photo
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#efebce",
    justifyContent: "space-around",
    paddingVertical: 80,
  },
  title: {
    color: "#000",
    fontSize: 40,
  },
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
