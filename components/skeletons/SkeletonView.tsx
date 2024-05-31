import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

export interface SkeletonViewProps {
  children?: React.ReactNode;
  style: ViewStyle
}

export default function SkeletonView({ children, style }: SkeletonViewProps) {
  const skeletonPulseAnimation = useSharedValue(0);

  skeletonPulseAnimation.value = withRepeat(
    withSequence(withTiming(0.4, { duration: 1000 }), withTiming(0.8, { duration: 1000 })),
    -1,
    true
  )


  const animatedStyle = useAnimatedStyle(() => ({
    opacity: skeletonPulseAnimation.value,
  }));


  return (
    <Animated.View style={animatedStyle}>
      <LinearGradient colors={['#f4f4f4', '#d0d0d0', '#f4f4f4']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={[styles.skeleton, style]}>
        {children}
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});