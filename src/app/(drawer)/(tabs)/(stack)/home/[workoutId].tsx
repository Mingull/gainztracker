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
		<Animated.View sharedTransitionTag="page-wrapper" className="h-full bg-zinc-900">
			<View
				className="relative h-full pt-5 pb-0 bg-white"
				style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
			>
				<View className="justify-center mx-5">
					<View className="flex-row items-center">
						<Pressable onPress={() => router.back()}>
							<StyledComponent component={ChevronLeft} size={24} color="black" />
						</Pressable>
						<Text className="text-2xl font-semibold" sharedTransitionTag={`workout-${workoutId}-title`}>
							{workout?.name}
						</Text>
					</View>
					<Text>Poep</Text>
				</View>
			</View>
		</Animated.View>
	);
}
