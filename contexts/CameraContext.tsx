import { PropsWithChildren, createContext, useContext, useState } from "react";

interface Camera {
  name: string;
  group: string;
  streamUrl: string;
  snapshotUrl: string;
  visible: boolean;
}

interface CameraContextType {
  cameras: Camera[];
  setCameras: React.Dispatch<React.SetStateAction<Camera[]>>
}

const CameraContext = createContext<CameraContextType | null>(null);

export function CameraProvider({ children }: PropsWithChildren) {
  const [cameras, setCameras] = useState<Camera[]>([]);

  return (
    <CameraContext.Provider value={{ cameras, setCameras }}>
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  const context = useContext(CameraContext);

  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
}