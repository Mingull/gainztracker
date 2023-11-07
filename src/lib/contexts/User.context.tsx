import modal from "@/components/Modalify";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../db/supabase";
import { createSafeContext } from "../utils";

interface UserCtx {
	user: UserInfo;
	loading: boolean;
	update: (user: UserInfo) => {};
}

export type UserInfo = {
	id: string | null;
	username: string | null;
	firstName: string | null;
	lastName: string | null;
	website: string | null;
	avatarUrl: string | null;
	createdAt: string | null;
	updatedAt: string | null;
};

const [Provider, useUser] = createSafeContext<UserCtx>("useUser() must be used within a UserProvider");

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState<string | null>(null);
	const [username, setUsername] = useState<string | null>(null);
	const [firstName, setFirstName] = useState<string | null>(null);
	const [lastName, setLastName] = useState<string | null>(null);
	const [website, setWebsite] = useState<string | null>(null);
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const [createdAt, setCreatedAt] = useState<string | null>(null);
	const [updatedAt, setUpdatedAt] = useState<string | null>(null);

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
				.select(`username, first_name, last_name, avatar_url, website, created_at, updated_at`)
				.eq("id", session?.user.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}
			if (data) {
				setUserId(session?.user.id);
				setUsername(data.username);
				setFirstName(data.first_name);
				setLastName(data.last_name);
				setAvatarUrl(data.avatar_url);
				setWebsite(data.website);
				setCreatedAt(data.created_at);
				setUpdatedAt(data.updated_at);
			}
		} finally {
			setLoading(false);
		}
	};

	const update = async ({ username, firstName, lastName, website, avatarUrl }: UserInfo) => {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");

			const updates = {
				id: session?.user.id,
				username,
				first_name: firstName,
				last_name: lastName,
				website,
				avatar_url: avatarUrl,
				created_at: createdAt,
				updated_at: new Date().toString(),
			};

			const { error } = await supabase.from("profiles").upsert(updates);

			if (error) {
				throw error;
			}
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
				user: { id: userId, username, firstName, lastName, website, avatarUrl, createdAt, updatedAt },
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