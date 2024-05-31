
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ThemedParallaxHeader from "@/components/ThemedParallaxHeader";
import { ThemedText } from "@/components/ThemedText";
import CameraSettings from "@/components/settings/CameraSettings";

import ServerSettings from "@/components/settings/ServerSettings";
import SkeletonView from "@/components/skeletons/SkeletonView";
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

      <Suspense fallback={<SkeletonView height={200} width={400} />}>
        <ServerSettings />
      </Suspense>

      <Suspense>
        <CameraSettings />
      </Suspense>

    </ParallaxScrollView>
  );
}