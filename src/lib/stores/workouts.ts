import { create } from "zustand";
import { Exercise, Workout } from "../types/Workout";

export interface WorkoutState {
	workouts: Workout[];
	addWorkout: (workout: Workout) => void;
	removeWorkout: (workout: Workout) => void;
	clearWorkouts: () => void;
	items: number;
}

const useWorkoutStore = create<WorkoutState>()((set, get) => ({
	workouts: [],
	items: 0,
	addWorkout: (workout) => {
		set((state) => {
			state.items += 1;
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
			state.items -= 1;
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
	clearWorkouts: () => set({ workouts: [], items: 0 }),
}));

export default useWorkoutStore;
