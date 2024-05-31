import { StyleSheet } from 'react-native';
import SkeletonView from './SkeletonView';

export function SkeletonCamera() {
  return (
    <SkeletonView style={styles.skeleton} />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
  }
});