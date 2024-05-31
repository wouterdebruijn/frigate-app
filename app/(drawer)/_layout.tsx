import DrawerIcon from '@/components/DrawerIcon';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { CameraProvider } from '@/contexts/CameraContext';
import { SettingProvider } from '@/contexts/SettingContext';


export default function Layout() {
  return (
    <CameraProvider>
      <SettingProvider>
        <GestureHandlerRootView>
          <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} >
            <Drawer.Screen name="(overview)/index" options={{ title: "Overview", drawerIcon: (props) => <DrawerIcon {...props} name="home" /> }} />
            <Drawer.Screen name="camera/index" options={{ title: "Camera", drawerIcon: (props) => <DrawerIcon {...props} name="cctv" /> }} />
            <Drawer.Screen name="settings/index" options={{ title: "Settings", drawerItemStyle: { marginTop: "auto" }, drawerIcon: (props) => <DrawerIcon {...props} name="cog" /> }} />
          </Drawer>
        </GestureHandlerRootView>
      </SettingProvider>
    </CameraProvider>
  );
}

type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};


function CustomDrawerContent(props: Props) {
  const { state, navigation } = props;

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }} {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}