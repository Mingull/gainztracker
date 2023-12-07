import { Text } from "@/components";
import { useWorkout } from "@/lib/hooks/use-workout";
import { useWorkouts } from "@/lib/hooks/use-workouts";
import { BlurView } from "expo-blur";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { useLocalSearchParams } from "expo-router/src/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { StyledComponent } from "nativewind";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

export default function WorkoutPage() {
	const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

	const workout = useWorkout(workoutId!);

	return (
		<BlurView intensity={40} style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
			<Animated.View
				sharedTransitionTag={`workout-${workoutId}-wrapper`}
				className="flex flex-row items-center justify-between p-4 mx-5 rounded-lg bg-zinc-100"
			>
				<View className="justify-center mx-5">
					{/* <View className="flex-row items-center">
						<Pressable onPress={() => router.back()}>
							<StyledComponent component={ChevronLeft} size={24} color="black" />
						</Pressable>
						<Text className="text-2xl font-semibold" sharedTransitionTag={`workout-${workoutId}-title`}>
							{workout?.name}
						</Text>
					</View> */}
					<Text>Poep</Text>
				</View>
			</Animated.View>
		</BlurView>
	);
}
