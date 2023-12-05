import { useQuery } from "@tanstack/react-query";
import { supabase } from "../db/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { Avatar } from "@/components/Avatar";
import { AvatarProps } from "@/components/Avatar/Avatar";

export type UserInfo = {
	id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	website: string;
	avatar: { url: string; image: ({ height, width, style }: Omit<AvatarProps, "url">) => JSX.Element };
	createdAt: string;
	updatedAt: string;
};

export const useUser = () => {
	const [session, setSession] = useState<Session | null>(null);
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) {
				setSession(session);
			}
		});
	}, []);
	return useQuery<UserInfo>({
		queryKey: ["user"],
		enabled: !!session,
		queryFn: async () => {
			if (!session?.user) throw new Error("No user on the session!");
			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, email, first_name, last_name, avatar_url, website, created_at, updated_at`)
				.eq("id", session?.user.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}
			return {
				id: session.user.id,
				username: data?.username!,
				email: data?.email!,
				firstName: data?.first_name!,
				lastName: data?.last_name!,
				website: data?.website!,
				avatar: {
					url: data?.avatar_url!,
					image: ({ height = 150, width = 150, style }: Omit<AvatarProps, "url">) =>
						Avatar({ url: data?.avatar_url!, height, width, style }),
				},
				createdAt: data?.created_at!,
				updatedAt: data?.updated_at!,
			};
		},
	});
};
