import { Text } from "@/components";
import { Avatar, UpdateAvatar } from "@/components/Avatar";
import modal from "@/components/Modalify";
import { supabase } from "@/lib/db/supabase";
import { useUserSession } from "@/lib/hooks/user";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [website, setWebsite] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");

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

	async function getProfile() {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");
			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, first_name, last_name, avatar_url, website`)
				.eq("id", session?.user.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}
			if (data) {
				setUsername(data.username);
				setFirstName(data.first_name);
				setLastName(data.last_name);
				setAvatarUrl(data.avatar_url);
				setWebsite(data.website);
			}
		} finally {
			setLoading(false);
		}
	}

	async function updateProfile({
		username,
		firstName,
		lastName,
		website,
		avatar_url,
	}: {
		username: string;
		firstName: string;
		lastName: string;
		website: string;
		avatar_url: string;
	}) {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");

			const updates = {
				id: session?.user.id,
				username,
				first_name: firstName,
				last_name: lastName,
				website,
				avatar_url,
				updated_at: new Date(),
			};

			const { error, status, count, data, statusText } = await supabase.from("profiles").upsert(updates);

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
	}

	return (
		<SafeAreaView className="flex-1 pb-20 bg-zinc-200">
			<View>
				<UpdateAvatar
					url={avatarUrl}
					onUpload={(url) => {
						console.log(url);
						setAvatarUrl(url);
						updateProfile({ username, firstName, lastName, website, avatar_url: url });
					}}
				/>
				<Text>Username: {username}</Text>
				<Text>First name: {firstName}</Text>
				<Text>Last name: {lastName}</Text>
				<Text>website: {website}</Text>
				<Text>aratar url: {avatarUrl}</Text>
			</View>
		</SafeAreaView>
	);
}
