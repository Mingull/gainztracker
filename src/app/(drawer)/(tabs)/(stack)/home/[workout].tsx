import { Text } from "@/components";
import { useGlobalSearchParams } from "expo-router";
import { useLocalSearchParams } from "expo-router/src/hooks";
import { View } from "react-native";

export default function WorkoutPage() {
	const { workout } = useLocalSearchParams();

	return (
		<View className="h-full bg-zinc-900">
			<View className="h-full pt-10 pb-20 bg-white" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
				<Text>Workout: {workout}</Text>
			</View>
		</View>
	);
}
