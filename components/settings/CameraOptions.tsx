import { useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

export interface CameraOptionsProps {
  name: string;
  snapshot: string;
}

export default function CameraOptions({ name, snapshot }: CameraOptionsProps) {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible(!visible);
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(visible ? 1 : 0.4)
    }
  })


  return (
    <Pressable style={styles.cameraContainer} onPress={toggleVisible}>
      <Animated.View style={animatedStyle}>
        <Image source={{ uri: snapshot }} style={styles.cameraSnapshot} />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cameraSnapshot: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    elevation: 1,
  }
})