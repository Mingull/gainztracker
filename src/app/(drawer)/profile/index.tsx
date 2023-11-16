import { Text } from "@/components";
import { Avatar, UpdateAvatar } from "@/components/Avatar";
import modal from "@/components/Modalify";
import { useUser } from "@/lib/contexts/User.context";
import { supabase } from "@/lib/db/supabase";
import { useUserSession } from "@/lib/hooks/user";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {
	const { user, loading, update } = useUser();

	return (
		<SafeAreaView className="flex-1 pb-20 bg-zinc-200">
			{!loading && user ? (
				<View>
					<UpdateAvatar
						url={user.avatarUrl}
						onUpload={(url) => {
							console.log(url);
							update({ ...user, avatarUrl: url });
						}}
					/>
					<Text>Username: {user.username}</Text>
					<Text>First name: {user.firstName}</Text>
					<Text>Last name: {user.lastName}</Text>
					<Text>website: {user.website}</Text>
					<Text>avatar url: {user.avatarUrl}</Text>
				</View>
			) : (
				<Text>Loading...</Text>
			)}
		</SafeAreaView>
	);
}
