import { Text } from "@/components";
import { useUser } from "@/lib/contexts/User.context";
import { supabase } from "@/lib/db/supabase";
import { Exercise, Set, Workout } from "@/lib/types/Workout";
import React, { useEffect, useState } from "react"; // Import React
import { FlatList, View } from "react-native";

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
		<View className="h-full px-5 pt-10 pb-20 bg-white">
			{workouts ? (
				<>
					<FlatList
						data={workouts}
						renderItem={({ index, item }) => {
							const createdAt = new Date(Date.parse(item.createdAt));
							return (
								<View
									className="p-4 rounded-lg bg-zinc-100"
									style={{
										marginBottom: index !== workouts.length - 1 ? 15 : 0,
									}}
								>
									<Text>{item.name}</Text>
									<Text className="">{createdAt.toDateString()}</Text>
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
	);
}
