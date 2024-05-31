import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function ThemedButton({ title, onPress, loading = false, disabled = false }: ThemedButtonProps) {

  const tint = useThemeColor({}, 'tint');
  const text = Colors.dark.text;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: tint }, disabled ? styles.button_disabled : null]}
      disabled={disabled}
    >
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
    elevation: 1
  },
  button_disabled: {
    opacity: 0.4
  },
  activityIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 8,
  },
})