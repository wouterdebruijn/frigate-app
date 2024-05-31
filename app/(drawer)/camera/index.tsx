import { Text, View } from "react-native";

import { usePathname } from "expo-router";

export default function Camera() {

  const pathname = usePathname();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Camera {pathname}</Text>
    </View>
  );
}