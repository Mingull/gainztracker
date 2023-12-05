import { useQuery } from "@tanstack/react-query";
import { supabase } from "../db/supabase";
import { useUser } from "./use-user";

export const useWorkouts = () => {
	const { data: user } = useUser();
	return useQuery({
		queryKey: ["workouts"],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase
				.from("workouts")
				.select(`id, name, createdAt:created_at, exercises (id, name, photos, sets (id, weight, reps))`)
				.eq("user_id", user!.id)
				.order("created_at", { ascending: false });

			if (error) throw error;

			return data;
		},
	});
};
