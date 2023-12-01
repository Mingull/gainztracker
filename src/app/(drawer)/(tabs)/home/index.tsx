import { Text } from "@/components";
import { shadows } from "@/constants/shadows";
import { useUser } from "@/lib/contexts/User.context";
import { useWorkouts } from "@/lib/contexts/Workout.context";
import formatDateTime from "@/lib/utils/formatDate";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { StyledComponent } from "nativewind";
import React from "react"; // Import React
import { FlatList, View } from "react-native";

export default function HomePage() {
	const { workouts, loading } = useWorkouts();

	// const [loadingWorkouts, setLoadingWorkouts] = useState<boolean>(false);

	// const [workouts, setWorkouts] = useState<Workout[]>([]);
	// const [exercises, setExercises] = useState<Exercise[]>([]);
	// const [sets, setSets] = useState<Set[]>([]);

	// useEffect(() => {
	// 	if (!loading && user) getWorkouts();
	// }, [user, loading]);

	// const getWorkouts = async () => {
	// 	setLoadingWorkouts(true);
	// 	try {
	// 		if (!user) throw new Error("No user!");
	// 		const { data, error } = await supabase.from("workouts").select(`id, name, createdAt:created_at, exercises
	// 			(id, name, photos,
	// 				sets (id, weight, reps)) `);

	// 		if (error) throw error;

	// 		setWorkouts(data);
	// 		setExercises((prev) => ({ ...prev, exercises: data.map((w) => w.exercises) }));
	// 		setSets((prev) => ({ ...prev, sets: data.map((w) => w.exercises.flatMap((e) => e.sets)) }));
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		setLoadingWorkouts(false);
	// 	}
	// };

	return (
		<View className="h-full bg-zinc-900">
			<View className="h-full pt-10 pb-20 bg-white" style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
				{workouts && !loading ? (
					<>
						<FlatList
							data={workouts}
							renderItem={({ index, item }) => {
								const createdAt = new Date(Date.parse(item.createdAt));
								return (
									<View
										className="flex-row items-center justify-between p-4 mx-5 rounded-lg bg-zinc-100"
										style={{
											marginBottom: 15,
											...shadows.default,
										}}
									>
										<View>
											<Text>{item.name}</Text>
											<Text className="text-sm text-zinc-400">{formatDateTime(createdAt)}</Text>
										</View>
										<Link href={"/(drawer)/(tabs)/home/" + item.id}>
											<StyledComponent
												component={ChevronRight}
												size={24}
												className="text-blue-500"
											/>
										</Link>
									</View>
								);
							}}
							keyExtractor={(item) => item.id.toString()}
						/>
					</>
				) : (
					<Text>No workouts</Text>
				)}
			</View>
		</View>
	);
}
