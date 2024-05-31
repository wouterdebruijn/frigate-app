import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Not Found</Text>

      <Text style={{ marginTop: 10 }}>
        This page does not exist.
      </Text>

      <Link replace href="/">
          <Text>Go to Home</Text>
      </Link>
    </View>
  );
}
