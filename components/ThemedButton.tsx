import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export default function ThemedButton({ title, onPress, loading = false }: ThemedButtonProps) {

  const tint = useThemeColor({}, 'tint');
  const text = useThemeColor({}, 'text');

  return (
    <Pressable onPress={onPress} style={[styles.button, { backgroundColor: tint }]}>
      <ActivityIndicator animating={loading} style={[styles.activityIndicator]} />
      <Text style={[{ color: text }]}>{loading ? 'loading' : title}</Text>
    </Pressable>
  );

}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 8,
  }
})