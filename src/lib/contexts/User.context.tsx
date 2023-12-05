import modal from "@/components/Modalify";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../db/supabase";
import { createSafeContext } from "../utils";
import { Avatar } from "@/components/Avatar";
import { AvatarProps } from "@/components/Avatar/Avatar";

export type UserCtx = {
	loading: boolean;
	user: UserInfo | undefined | null;
	update: (user: UserInfo) => {};
};

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

const [Provider, useUser] = createSafeContext<UserCtx>("useUser() must be used within a UserProvider");

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [website, setWebsite] = useState<string>("");
	const [avatarUrl, setAvatarUrl] = useState<string>("");
	const [createdAt, setCreatedAt] = useState<string>("");
	const [updatedAt, setUpdatedAt] = useState<string>("");

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) {
				setSession(session);
			}
		});
	}, []);

	useEffect(() => {
		if (session) getProfile();
	}, [session]);

	const getProfile = async () => {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");
			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, email, first_name, last_name, avatar_url, website, created_at, updated_at`)
				.eq("id", session?.user.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}
			if (data) {
				setUserId(session?.user.id);
				setUsername(data.username!);
				setEmail(data.email!);
				setFirstName(data.first_name!!);
				setLastName(data.last_name!);
				setAvatarUrl(data.avatar_url!);
				setWebsite(data.website!);
				setCreatedAt(data.created_at!);
				setUpdatedAt(data.updated_at!);
			}
		} finally {
			setLoading(false);
		}
	};

	const update = async ({ username, firstName, lastName, website, avatar }: UserInfo) => {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");

			const updates = {
				id: session?.user.id,
				username,
				first_name: firstName,
				last_name: lastName,
				website,
				avatar_url: avatar.url,
				created_at: createdAt,
				updated_at: new Date().toString(),
			};

			const { error } = await supabase.from("profiles").upsert(updates);

			if (error) {
				throw error;
			}

			getProfile();
		} catch (error) {
			if (error instanceof Error) {
				modal.error(error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Provider
			value={{
				user: {
					id: userId,
					username,
					email,
					firstName,
					lastName,
					website,
					avatar: {
						url: avatarUrl,
						image: ({ height = 150, width = 150, style }: Omit<AvatarProps, "url">) =>
							Avatar({ url: avatarUrl, height, width, style }),
					},
					createdAt,
					updatedAt,
				},
				loading,
				update,
			}}
		>
			{children}
		</Provider>
	);
};

export default UserProvider;
export { useUser };
