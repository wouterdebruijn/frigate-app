
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ThemedParallaxHeader from "@/components/ThemedParallaxHeader";
import CameraSettings from "@/components/settings/CameraSettings";
import { useSetting } from "@/contexts/SettingContext";
import { usePathname } from "expo-router";
import { Suspense } from "react";

export default function Home() {

  const pathname = usePathname();
  const { queryServerUrl } = useSetting();

  return (
    <ParallaxScrollView
      headerImage={<ThemedParallaxHeader
        icon="home"
        title="Home"
        text={"Your Frigate Cameras"} />
      } headerBackgroundColor={{ dark: '#333', light: '#f4f4f4' }}>

      <Suspense>
        <CameraSettings />
      </Suspense>

    </ParallaxScrollView>
  );
}