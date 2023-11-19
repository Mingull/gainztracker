import { UserCtx } from "@/lib/contexts/User.context";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "./Avatar";
import { Skeleton } from "./Skeleton";
import Text from "./Text";
import { DrawerNavigationProp, DrawerToggleButton } from "@react-navigation/drawer";
import { ParamListBase, DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function Navbar({ loading, user }: Pick<UserCtx, "loading" | "user">) {
	const nav = useNavigation<DrawerNavigationProp<ParamListBase>>();
	return (
		<SafeAreaView className="relative z-10 flex-row items-center justify-between px-6 py-4 border-b border-b-zinc-900 bg-zinc-900">
			<StatusBar />
			{/* <StyledComponent component={Menu} className="text-blue-500" /> */}
			{!loading ? (
				<Pressable onPress={() => nav.dispatch(DrawerActions.toggleDrawer)}>
					<View className="flex-row items-center">
						<Avatar
							url={user.avatarUrl}
							style={styles.profileImage}
							width={styles.profileImage.width}
							height={styles.profileImage.height}
						/>
						<Text className="text-base font-bold text-zinc-50">{user.username}</Text>
					</View>
				</Pressable>
			) : (
				<View className="flex-row items-center">
					<Skeleton width={40} height={40} circle />
					<Skeleton width={115} height={16} />
				</View>
			)}
			<View className="absolute w-5 h-5 -bottom-5 rounded-tl-xl bg-zinc-900" />
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

	skeleton: {
		opacity: 1,
	},
});
