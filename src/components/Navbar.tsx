import { UserCtx } from "@/lib/contexts/User.context";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withRepeat } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Navbar({ loading, user }: Pick<UserCtx, "loading" | "user">) {
	const skeletonAnimation = useAnimatedStyle(() => ({
		opacity: withRepeat(0.5, -1, true),
	}));

	return (
		<SafeAreaView className="flex-row items-center justify-between px-6 py-4 border-b border-b-zinc-900 bg-zinc-900">
			<StatusBar />
			{/* <StyledComponent component={Menu} className="text-blue-500" /> */}
			{/* {!loading && user ? (
				<View className="flex-row items-center">
					<Avatar url={user.avatarUrl} style={styles.profileImage} />
					<Text className="text-base font-bold text-zinc-50">{user.username}</Text>
				</View>
			) : ( */}
			<View className="flex-row items-center">
				<Animated.View style={[styles.profileImage]} className="bg-zinc-400" />
				<Animated.View style={[]} className="h-4 text-base font-bold w-28 bg-zinc-400 rounded-sm" />
			</View>
			{/* )} */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	navbar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		paddingHorizontal: 25,
		paddingVertical: 15,
	},
	userProfile: {
		flexDirection: "row",
		alignItems: "center",
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
	},
	profileText: {
		color: "#333",
		fontSize: 16,
		fontWeight: "bold",
	},
});
