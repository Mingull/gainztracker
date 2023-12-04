import { useQuery } from "@tanstack/react-query";
import { supabase } from "../db/supabase";
import { useUser } from "../contexts/User.context";

export const useWorkouts = () => {
	const { user, loading } = useUser();

	console.log({ user, loading });
	if (loading) return { isLoading: true, data: null, error: null };

	return useQuery({
		queryKey: ["workouts"],
		queryFn: async () => {
			if (!user.id) throw new Error("No user found");

			const { data, error } = await supabase
				.from("workouts")
				.select(`id, name, createdAt:created_at, exercises (id, name, photos, sets (id, weight, reps))`)
				.eq("user_id", user.id)
				.order("created_at", { ascending: false });
			console.log(data);
			if (error) throw error;

			return data;
		},
	});
};
