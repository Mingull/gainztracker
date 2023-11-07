import { Text } from "@/components";
import { useUser } from "@/lib/contexts/User.context";
import { supabase } from "@/lib/db/supabase";
import { Exercise, Set, Workout } from "@/lib/types/Workout";
import { prettyPrint } from "@/lib/utils";
import React, { useEffect } from "react"; // Import React
import { FlatList, View } from "react-native";
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
			<FlatList
				data={workouts}
				renderItem={({ index, item, separators }) => {
					return <Text>{item.name}</Text>;
				}}
				keyExtractor={(item) => item.id.toString()}
				horizontal={true}
			/>
		</SafeAreaView>
	);
}
