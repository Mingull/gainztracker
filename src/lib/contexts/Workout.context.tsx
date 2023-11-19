// import { useState } from "react";
// import { Workout } from "../types/Workout";
// import { createSafeContext } from "../utils";

// export interface WorkoutCtx {
// 	workouts: Workout[];
// 	loading: boolean;
// 	addWorkout: (user: Workout) => {};
// }

// const [Provider, useWorkouts] = createSafeContext<WorkoutCtx>("useWorkouts() must be used within a WorkoutsProvider");

// const WorkoutsProvider = ({ children }: { children: React.ReactNode }) => {
// 	const [workouts, setWorkouts] = useState<Workout[]>([]);
// 	const [loading, setLoading] = useState<boolean>(false);

// 	const getWorkouts = async () => {
// 		try {
// 			if (!user) throw new Error("No user!");
// 			const { data, error } = await supabase.from("workouts").select(`id, name, createdAt:created_at, exercises
// 				(id, name, photos,
// 					sets (id, weight, reps)) `);

// 			if (error) throw error;

// 			setWorkouts(data);
// 			setExercises((prev) => ({ ...prev, exercises: data.map((w) => w.exercises) }));
// 			setSets((prev) => ({ ...prev, sets: data.map((w) => w.exercises.flatMap((e) => e.sets)) }));
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	return <Provider value={{ workouts, loading, addWorkout: () => {} }}>{children}</Provider>;
// };

// export default WorkoutsProvider;
// export { useWorkouts };
