import { Text } from "@/components";
import { useUser } from "@/lib/contexts/User.context";
import { supabase } from "@/lib/db/supabase";
import { Exercise, Set, Workout } from "@/lib/types/Workout";
import { prettyPrint } from "@/lib/utils";
import React, { useEffect } from "react"; // Import React
import { ScrollView, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
	const { user, loading } = useUser();

	const [workouts, setWorkouts] = React.useState<Workout[]>([]);
	const [exercises, setExercises] = React.useState<Exercise[]>([]);
	const [sets, setSets] = React.useState<Set[]>([]);
	useEffect(() => {
		if (!loading && user) getWorkouts();
	}, [user, loading]);

	const getWorkouts = async () => {
		try {
			if (!user) throw new Error("No user!");
			const { data, error } = await supabase.from("workouts").select(`id, name, createdAt:created_at, exercises
				(id, name, photos,
					sets (id, weight, reps)) `);

			if (error) throw error;

			setWorkouts(data);
			setExercises((prev) => ({ ...prev, exercises: data.map((w) => w.exercises) }));
			setSets((prev) => ({ ...prev, sets: data.map((w) => w.exercises.flatMap((e) => e.sets)) }));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SafeAreaView className="items-center justify-center flex-1 pb-20 bg-zinc-200">
			{workouts ? (
				<FlatList
					data={workouts}
					renderItem={({ index, item, separators }) => {
						return (
							<View style={{ gap: 20 }}>
								<View className="p-4 bg-blue-500">
									<Text>{item.name}</Text>
									<FlatList
										data={item.exercises}
										renderItem={({ item }) => {
											return (
												<View style={{ gap: 20 }}>
													<View className="py-4 bg-blue-500">
														<Text>{item.name}</Text>
													</View>
												</View>
											);
										}}
										horizontal={true}
									/>
								</View>
							</View>
						);
					}}
					keyExtractor={(item) => item.id.toString()}
				/>
			) : (
				<Text>No workouts</Text>
			)}
		</SafeAreaView>
	);
}
