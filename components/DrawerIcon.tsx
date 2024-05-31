
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

interface DrawerIconProps {
  color: string;
  size: number;
  focused: boolean;
  name: ComponentProps<typeof MaterialCommunityIcons>['name'];
}


export default function DrawerIcon(props: DrawerIconProps) {
  return (
    <MaterialCommunityIcons name={props.name} color={props.color} size={props.size} />
  )
}