import { useSetting } from "@/contexts/SettingContext";
import { configQuery } from "@/queries/config-query";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { SkeletonCamera } from "../skeletons/SkeletonCamera";
import CameraOptions from "./CameraOptions";


export default function CameraSettings() {
  const { queryServerUrl } = useSetting();

  const { data: savedServerUrl } = useQuery({ ...queryServerUrl() });
  const { data: cameras, error, isPending } = useQuery({ ...configQuery({ serverUrl: savedServerUrl! }), enabled: !!savedServerUrl })

  if (isPending) {
    return (
      <View style={styles.camerasWrapper}>
        <ThemedText type="subtitle">Cameras: </ThemedText>
        <SkeletonCamera />
        <SkeletonCamera />
        <SkeletonCamera />
        <SkeletonCamera />
      </View>
    )
  }

  if (error) {
    return <ThemedText>Error loading cameras</ThemedText>
  }

  return (
    <View>
      <ThemedText type="subtitle">Cameras: {cameras.length}</ThemedText>
      <View style={styles.camerasWrapper}>
        {
          cameras.map((camera) => {
            return (
              <CameraOptions
                key={camera.name}
                name={camera.name}
                snapshot={`${savedServerUrl}api/${camera.name}/latest.jpg`}
              />
            )
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  camerasWrapper: {
    flex: 1,
    gap: 15,
    paddingTop: 10,
  }
})