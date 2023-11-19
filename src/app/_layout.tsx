import { Slot } from "expo-router";
import { View } from "react-native";
import { Modalify } from "@/components/Modalify";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
	return (
		<>
			<Slot />
			<Modalify />
		</>
	);
}
