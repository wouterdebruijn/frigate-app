import { useSetting } from "@/contexts/SettingContext";
import { configQuery } from "@/queries/config-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ThemedButton from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import SkeletonView from "../skeletons/SkeletonView";
import CameraOptions from "./CameraOptions";


function CameraSettings() {

  const { queryServerUrl } = useSetting();

  const { data: savedServerUrl } = useSuspenseQuery({ ...queryServerUrl() });
  const { data: camerasInitial, error, isPending } = useSuspenseQuery({ ...configQuery({ serverUrl: savedServerUrl! }) })

  const [cameras, setCameras] = useState(camerasInitial)

  async function submitButton() {

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

      <ThemedButton title="Save" onPress={() => submitButton()} />
    </View>
  )
}

function Skeleton() {
  return (
    <View>
      <ThemedText type="subtitle">Cameras: 0</ThemedText>
      <View style={styles.camerasWrapper}>
        <CameraOptions.Skeleton />
        <CameraOptions.Skeleton />
      </View>

      <SkeletonView style={{ width: '100%', height: 35 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  camerasWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    paddingVertical: 10,
  }
})

CameraSettings.Skeleton = Skeleton;
export default CameraSettings;