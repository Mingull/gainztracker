import { useEffect, useState } from "react";
import { Exercise, Workout, Set } from "../types/Workout";
import { createSafeContext } from "../utils";
import { supabase } from "../db/supabase";
import { useUser } from "./User.context";

export interface WorkoutCtx {
	workouts: Omit<Workout, "exercises">[];
	exercises: Omit<Exercise, "sets">[];
	sets: Set[];
	loading: boolean;
	addWorkout: (workout: Workout) => void;
}

const [Provider, hook] = createSafeContext<WorkoutCtx>("useWorkouts() must be used within a WorkoutsProvider");

const WorkoutsProvider = ({ children }: { children: React.ReactNode }) => {
	const [workouts, setWorkouts] = useState<Omit<Workout, "exercises">[]>([]);
	const [exercises, setExercises] = useState<Omit<Exercise, "sets">[]>([]);
	const [sets, setSets] = useState<Set[]>([]);
	const [loadingWorkout, setLoadingWorkouts] = useState<boolean>(false);
	const { user, loading: userLoading } = useUser();

	useEffect(() => {
		if (!userLoading && user) getData();
	}, [user, userLoading]);
	const getData = () => {
		getWorkouts();
		getExercises();
	};
	const getWorkouts = async () => {
		setLoadingWorkouts(true);
		try {
			const { data, error } = await supabase
				.from("workouts")
				.select(
					`id, name, createdAt:created_at, exercises
				(id, name, photos,
					sets (id, weight, reps))`
				)
				.eq("user_id", user.id!)
				.order("created_at", { ascending: false });

			if (error) throw error;

			setWorkouts(data);
			// setExercises((prev) => ({ ...prev, exercises: data.map((w) => w.exercises) }));
			// setSets((prev) => ({ ...prev, sets: data.map((w) => w.exercises.flatMap((e) => e.sets)) }));
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingWorkouts(false);
		}
	};
	const getExercises = async () => {
		try {
			if (!user) throw new Error("No user!");
			const { data, error } = await supabase.from("exercises").select(`id, name, photos,
	            sets (id, weight, reps) `);

			if (error) throw error;

			setExercises(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Provider value={{ workouts, exercises, sets, loading: loadingWorkout, addWorkout: (workout: Workout) => {} }}>
			{children}
		</Provider>
	);
};

type Options = {
	workoutsOnly: boolean;
	exercisesOnly: boolean;
	setsOnly: boolean;
};

const useWorkouts = ({ workoutsOnly, exercisesOnly, setsOnly }: Options) => {
	return hook();
};

export default WorkoutsProvider;
export { useWorkouts };
