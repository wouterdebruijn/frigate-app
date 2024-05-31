import { useCamera } from "@/contexts/CameraContext";
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

  const { setCameras: setCamerasInContext, cameras: camerasInContext } = useCamera();

  const [cameras, setCameras] = useState(camerasInitial.map((camera) => {
    return {
      name: camera.name,
      group: 'default',
      visible: true,
      streamUrl: `${savedServerUrl}api/${camera.name}/stream`,
      snapshotUrl: `${savedServerUrl}api/${camera.name}/latest.jpg`
    }
  }))

  const hasChanged = camerasInContext.length !== cameras.length || cameras.some((camera, index) => {
    return camera.name !== camerasInContext[index].name || camera.visible !== camerasInContext[index].visible;
  })

  async function onCameraPress(name: string) {
    setCameras((prev) => {
      return prev.map((camera) => {
        if (camera.name === name) {
          return {
            ...camera,
            visible: !camera.visible
          }
        }
        return camera;
      })
    })
  }

  function submitButton() {
    setCamerasInContext(cameras);
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
                visible={camera.visible}
                onPress={() => onCameraPress(camera.name)}
              />
            )
          })
        }
      </View>

      <ThemedButton title="Save" onPress={() => submitButton()} disabled={!hasChanged} />
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