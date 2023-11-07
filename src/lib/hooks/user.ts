import modal from "@/components/Modalify";
import { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { supabase } from "../db/supabase";

export const useUserSession = (): [User | null, Dispatch<SetStateAction<User | null>>] => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		supabase.auth.getUser().then(({ data: { user } }) => {
			if (user) {
				setUser(user);
			} else {
				modal.error("Error Accessing User");
			}
		});
	}, []);

	return [user, setUser];
};
