import { Text } from "@/components";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupsPage() {
	return (
		<View className="h-full bg-zinc-900">
			<View className="h-full pt-10 pb-20 bg-white" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
				<Text>Groups</Text>
			</View>
		</View>
	);
}
