// import { useEffect, useState } from "react";
// import { Exercise, Workout, Set } from "../types/Workout";
// import { createSafeContext } from "../utils";
// import { supabase } from "../db/supabase";
// import { useUser } from "./User.context";

// export interface WorkoutCtx {
// 	workouts: Workout[];
// 	loading: boolean;
// 	addWorkout: (workout: Workout) => void;
// }

// const [Provider, useWorkouts] = createSafeContext<WorkoutCtx>("useWorkouts() must be used within a WorkoutsProvider");

// const WorkoutsProvider = ({ children }: { children: React.ReactNode }) => {
// 	const [workouts, setWorkouts] = useState<Workout[]>([]);
// 	const [loadingWorkout, setLoadingWorkouts] = useState<boolean>(false);
// 	const { user, loading: userLoading } = useUser();

// 	useEffect(() => {
// 		if (!userLoading && user && user.id) getData();
// 	}, [user, userLoading]);

// 	const getData = async () => {
// 		setLoadingWorkouts(true);
// 		try {
// 			if (!user) throw new Error("No user!");
// 			await getWorkouts();
// 		} catch (error) {
// 			console.log({ error });
// 		} finally {
// 			setLoadingWorkouts(false);
// 		}
// 	};
// 	const getWorkouts = async () => {
// 		const { data, error } = await supabase
// 			.from("workouts")
// 			.select(`id, name, createdAt:created_at, exercises (id, name, photos, sets (id, weight, reps))`)
// 			.eq("user_id", user.id)
// 			.order("created_at", { ascending: false });

// 		if (error) throw error;

// 		setWorkouts(data);
// 	};

// 	return (
// 		<Provider value={{ workouts, loading: loadingWorkout, addWorkout: (workout: Workout) => {} }}>
// 			{children}
// 		</Provider>
// 	);
// };

// export default WorkoutsProvider;
// export { useWorkouts };
