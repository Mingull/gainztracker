import { useWorkouts } from "./use-workouts";

export const useWorkout = (workoutId: string) => {
	const { data: workouts } = useWorkouts();

	const workout = workouts?.find((workout) => workout.id.toString() === workoutId);

	return workout;
};
