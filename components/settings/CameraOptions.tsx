import { useState } from "react";
import { Image, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import SkeletonView from "../skeletons/SkeletonView";

export interface CameraOptionsProps {
  name: string;
  snapshot: string;
}

function CameraOptions({ name, snapshot }: CameraOptionsProps) {
  const [visible, setVisible] = useState(false);
  const { width } = useWindowDimensions();

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
        <Image source={{ uri: snapshot }} style={[styles.cameraSnapshot, { width: (width - 37) / 2 }]} />
      </Animated.View>
    </Pressable>
  )
}

function Skeleton() {
  const { width } = useWindowDimensions();

  return (
    <SkeletonView style={[styles.cameraSnapshot, { width: (width - 37) / 2 }, { elevation: 0 }]} />
  )
}

const styles = StyleSheet.create({
  cameraContainer: {
    alignItems: 'center',
  },
  cameraSnapshot: {
    aspectRatio: 16 / 9,
    borderRadius: 5,
    elevation: 1,
  }
})

CameraOptions.Skeleton = Skeleton;
export default CameraOptions;