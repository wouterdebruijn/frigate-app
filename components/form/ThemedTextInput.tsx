import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";

interface ThemedTextInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  loading?: boolean;
}

export default function ThemedTextInput({ label, value, onChange, loading = false }: ThemedTextInputProps) {
  return (
    <View>
      <Text style={styles.label} >{label}</Text>
      <ActivityIndicator animating={loading} style={styles.activityIndicator} color="lightgray" />
      <TextInput style={styles.input} value={value} onChangeText={onChange} inputMode="url" readOnly={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    paddingVertical: 4,
    marginTop: 4,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  activityIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 8,
  }
})