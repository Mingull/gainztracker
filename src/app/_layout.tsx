import { Modalify } from "@/components/Modalify";
import { Slot } from "expo-router";
import "react-native-gesture-handler";

export default function RootLayout() {
	return (
		<>
			<Slot />
			<Modalify />
		</>
	);
}
