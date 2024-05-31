import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface ThemedParallaxHeaderProps {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  text: string;
}

export default function ThemedParallaxHeader(props: ThemedParallaxHeaderProps) {
  return (
    <LinearGradient colors={['#29323c', '#485563']} style={styles.wrapper} start={{ x: 0, y: 0.2 }} end={{ x: 1, y: 0.8 }}>
      <View style={styles.container}>
        <MaterialCommunityIcons name={props.icon} size={42} color="white" />
        <View>
          <ThemedText type="title" style={{ lineHeight: 41 }} lightColor="white" darkColor="white">
            {props.title}
          </ThemedText>
          <ThemedText lightColor="white" darkColor="white">{props.text}</ThemedText>
        </View>
      </View>
    </LinearGradient >
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    gap: 16,
    flexDirection: 'row',
    padding: 16,
    height: 100,
    marginTop: 'auto'
  },
});