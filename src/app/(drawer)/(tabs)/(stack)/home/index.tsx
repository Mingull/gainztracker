import { Text } from "@/components";
import { Skeleton } from "@/components/Skeleton";
import { AddButton, PopupButton } from "@/components/addButton";
import { shadows } from "@/constants/shadows";
import { useUser } from "@/lib/contexts/User.context";
import { useWorkouts } from "@/lib/hooks/use-workouts";
import formatDateTime from "@/lib/utils/formatDate";
import { router } from "expo-router";
import { ChevronRight, Dumbbell } from "lucide-react-native";
import { StyledComponent } from "nativewind";
import React from "react"; // Import React
import { FlatList, Pressable, View } from "react-native";

export default function HomePage() {
	const { data: workouts, isLoading, error } = useWorkouts();

	console.log({ workouts, error });

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
		<View className="h-full bg-zinc-900">
			<View
				className="relative h-full pt-10 pb-20 bg-white"
				style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
			>
				{!isLoading ? (
					<FlatList
						data={workouts}
						renderItem={({ index, item }) => {
							const createdAt = new Date(Date.parse(item.createdAt));
							return (
								<Pressable
									onPress={() => {
										router.push("/home/" + item.id);
									}}
								>
									<View
										className="flex flex-row items-center justify-between p-4 mx-5 rounded-lg bg-zinc-100"
										style={{
											marginBottom: 15,
											...shadows.default,
										}}
									>
										<View>
											<Text>{item.name}</Text>
											<Text className="text-sm text-zinc-400">{formatDateTime(createdAt)}</Text>
										</View>
										<StyledComponent component={ChevronRight} size={24} className="text-blue-500" />
									</View>
								</Pressable>
							);
						}}
						ListEmptyComponent={() => <Text>No workouts</Text>}
						keyExtractor={(item) => item.id.toString()}
					/>
				) : (
					<>
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
		</View>
	);
}
