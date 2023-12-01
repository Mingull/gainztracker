import { create } from "zustand";
import { Exercise, Workout } from "../types/Workout";
import { supabase } from "../db/supabase";
import { useUser } from "../contexts/User.context";
import { typesAreEqual } from "react-native-document-picker/lib/typescript/fileTypes";

export interface WorkoutState {
	workouts: Workout[];
	loading: boolean;
	addWorkout: (workout: Workout) => void;
	removeWorkout: (workout: Workout) => void;
	clearWorkouts: () => void;
}

const useWorkoutStore = create<WorkoutState>()((set, get) => ({
	workouts: [],
	loading: false,
	fetch: async () => {
		set({ loading: true });
		try {
			const { user, loading } = useUser();
			if (!user) throw new Error("User not found");

			const { data, error } = await supabase
				.from("workouts")
				.select(`id, name, createdAt:created_at, exercises (id, name, photos, sets (id, weight, reps))`)
				.eq("user_id", user.id)
				.order("created_at", { ascending: false });

			if (error) throw error;

			set({ workouts: data });
		} catch (err) {
			console.log(err);
		} finally {
			set({ loading: false });
		}
	},
	addWorkout: (workout) => {
		set((state) => {
			const hasWorkout = state.workouts.find((w) => w.id === workout.id);

			if (hasWorkout) {
				return { workouts: [...state.workouts] };
			} else {
				return { workouts: [...state.workouts, workout] };
			}
		});
	},
	removeWorkout: (workout) => {
		set((state) => {
			const hasWorkout = state.workouts.find((w) => w.id === workout.id);

			if (hasWorkout) {
				return {
					workouts: state.workouts.filter((w) => w.id !== workout.id),
				};
			} else {
				return { workouts: [...state.workouts] };
			}
		});
	},
	clearWorkouts: () => set({ workouts: [] }),
}));

export default useWorkoutStore;
