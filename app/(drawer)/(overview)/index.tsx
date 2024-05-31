import { Text, View } from "react-native";

import { useSetting } from "@/contexts/SettingContext";
import { usePathname } from "expo-router";

export default function Home() {

  const pathname = usePathname();
  const { queryServerUrl } = useSetting();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home {pathname}</Text>
    </View>
  );
}