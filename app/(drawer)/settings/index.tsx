
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ThemedParallaxHeader from "@/components/ThemedParallaxHeader";
import { ThemedText } from "@/components/ThemedText";
import CameraSettings from "@/components/settings/CameraSettings";

import ServerSettings from "@/components/settings/ServerSettings";
import { Suspense } from "react";


export default function Settings() {
  return (
    <ParallaxScrollView
      headerImage={<ThemedParallaxHeader
        icon="cog"
        title="Settings"
        text={"Configure the app settings"} />
      } headerBackgroundColor={{ dark: '#333', light: '#f4f4f4' }}>
      <ThemedText type="subtitle">Frigate Server:</ThemedText>

      <Suspense>
        <ServerSettings />
      </Suspense>

      <Suspense fallback={<CameraSettings.Skeleton />}>
        <CameraSettings />
      </Suspense>

    </ParallaxScrollView>
  );
}