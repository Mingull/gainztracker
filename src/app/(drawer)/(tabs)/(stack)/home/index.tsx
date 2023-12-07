import { Text } from "@/components";
import { Skeleton } from "@/components/Skeleton";
import { AddButton, PopupButton } from "@/components/addButton";
import { shadows } from "@/constants/shadows";
import { useWorkouts } from "@/lib/hooks/use-workouts";
import formatDateTime from "@/lib/utils/formatDate";
import { Link, router } from "expo-router";
import { ChevronLeft, ChevronRight, Dumbbell } from "lucide-react-native";
import { StyledComponent } from "nativewind";
import React from "react"; // Import React
import { FlatList, Pressable, RefreshControl, View } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";

export default function HomePage() {
	const { data: workouts, isLoading, error, status, isFetching, refetch } = useWorkouts();

	const pupupItems: PopupButton[] = [
		{
			delay: 1,
			title: "Add Workout",
			icon: Dumbbell,
			onPress: () => {
				console.log("Add Workout");
			},
		},
	];

	return (
		<Animated.View sharedTransitionTag="page-wrapper" className="h-full bg-zinc-900">
			<View
				className="relative h-full pt-5 pb-0 bg-white"
				style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
			>
				{!isLoading && !isFetching ? (
					<FlatList
						data={workouts}
						renderItem={({ index, item }) => {
							const createdAt = new Date(Date.parse(item.createdAt));
							return (
								<Link asChild href={"/home/" + item.id}>
									<Pressable>
										<Animated.View
											sharedTransitionTag={`workout-${item.id}-wrapper`}
											className="flex flex-row items-center justify-between p-4 mx-5 rounded-lg bg-zinc-100"
											style={{
												marginBottom: 15,
												...shadows.default,
											}}
										>
											<View>
												<Text sharedTransitionTag={`workout-${item.id}-title`}>
													{item.name}
												</Text>
												<Text className="text-sm text-zinc-400">
													{formatDateTime(createdAt)}
												</Text>
											</View>
											<StyledComponent
												component={ChevronRight}
												size={24}
												className="text-blue-500"
											/>
										</Animated.View>
									</Pressable>
								</Link>
							);
						}}
						ListHeaderComponent={() => (
							<Text className="mb-2 ml-5 text-2xl font-bold text-center">Your Workouts</Text>
						)}
						refreshControl={<RefreshControl onRefresh={refetch} refreshing={isFetching} />}
						ListEmptyComponent={() => <Text>No workouts</Text>}
						keyExtractor={(item) => item.id.toString()}
					/>
				) : (
					<>
						<Text className="ml-5 text-2xl font-bold">Your Workouts</Text>
						<View
							className="flex-row items-center justify-between p-4 mx-5 rounded-lg bg-zinc-100"
							style={{
								marginBottom: 15,
								...shadows.default,
							}}
						>
							<View>
								<Skeleton className="h-6 mb-0.5 w-20" />
								<Skeleton className="w-32 h-4" />
							</View>
						</View>
						<View
							className="flex-row items-center justify-between p-4 mx-5 rounded-lg bg-zinc-100"
							style={{
								marginBottom: 15,
								...shadows.default,
							}}
						>
							<View>
								<Skeleton className="h-6 mb-0.5 w-20" />
								<Skeleton className="w-32 h-4" />
							</View>
						</View>
						<View
							className="flex-row items-center justify-between p-4 mx-5 rounded-lg bg-zinc-100"
							style={{
								marginBottom: 15,
								...shadows.default,
							}}
						>
							<View>
								<Skeleton className="h-6 mb-0.5 w-20" />
								<Skeleton className="w-32 h-4" />
							</View>
						</View>
					</>
				)}
				<AddButton items={pupupItems} />
			</View>
		</Animated.View>
	);
}

// const RenderItemDetails = ({ item }: { item: any }) => {
// 	return (
// 		<View className="justify-center mx-5">
// 			<View className="flex-row items-center">
// 				<Pressable onPress={() => router.back()}>
// 					<StyledComponent component={ChevronLeft} size={24} color="black" />
// 				</Pressable>
// 				<Text className="text-2xl font-semibold" sharedTransitionTag={`workout-${workoutId}-title`}>
// 					{workout?.name}
// 				</Text>
// 			</View>
// 			<Text>Poep</Text>
// 		</View>
// 	);
// };
