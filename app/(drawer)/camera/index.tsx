
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ThemedParallaxHeader from "@/components/ThemedParallaxHeader";
import CameraStreamPlayer from "@/components/camera/VideoPlayer";
import { useCamera } from "@/contexts/CameraContext";

export default function Camera() {

  const { cameras } = useCamera();

  return (
    <ParallaxScrollView
      headerImage={<ThemedParallaxHeader
        icon="cctv"
        title="Cameras"
        text={"View the live camera feeds"} />
      } headerBackgroundColor={{ dark: '#333', light: '#f4f4f4' }}>
      <CameraStreamPlayer cameraName="street" />
      <CameraStreamPlayer cameraName="garage" />
    </ParallaxScrollView>
  );
}