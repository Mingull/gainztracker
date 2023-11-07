import { Text } from "@/components";
import { useUser } from "@/lib/contexts/User.context";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddWorkout() {
	const { user, loading, update } = useUser();

	if (!loading) console.log(JSON.stringify(user, null, 4));

	return (
		<SafeAreaView className="items-center justify-center flex-1 pb-20 bg-zinc-200">
			<View>
				<Text variant={"title"}>Add Workout</Text>
			</View>
		</SafeAreaView>
	);
}
