import { UserCtx } from "@/lib/contexts/User.context";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions, ParamListBase } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useDeferredValue } from "react";
import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Skeleton } from "./Skeleton";
import Text from "./Text";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withDecay,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SCREEN_WIDTH } from "@/constants/screen";

export default function Navbar({ loading, user }: Pick<UserCtx, "loading" | "user">) {
	const NAVBAR_HEIGHT = 40 + 16 + 16;
	const NAVBAR_WIDTH = SCREEN_WIDTH - 48;
	const nav = useNavigation<DrawerNavigationProp<ParamListBase>>();
	const height = useSharedValue(0);

	const swipeDownGestureHandler = useAnimatedGestureHandler({
		onStart: (event) => {},
		onActive: (event) => {
			height.value = event.translationY;
		},
		onEnd: (event) => {
			if (height.value > NAVBAR_HEIGHT / 2) {
				height.value = NAVBAR_HEIGHT;
			} else {
				height.value = 0;
			}
		},
	});

	// useDerivedValue(() => {
	// 	console.log(height.value);
	// });

	const swipeDownAnimation = useAnimatedStyle(() => ({
		height: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [NAVBAR_HEIGHT, NAVBAR_HEIGHT * 3.5])),
	}));

	const imageAnimation = useAnimatedStyle(() => ({
		width: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [40, 120])),
		height: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [40, 120])),
		borderRadius: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [20, 60])),
		transform: [
			{
				translateX: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [0, NAVBAR_WIDTH / 2 - 60])),
			},
		],
		marginRight: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [10, 0])),
	}));

	const usernameAnimation = useAnimatedStyle(() => {
		return {
			fontSize: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [16, 30])),
			lineHeight: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [24, 36])),
			transform: [
				{ translateY: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [10, 95])) },
				{
					translateX: withTiming(
						interpolate(
							height.value,
							[0, NAVBAR_HEIGHT],
							[0, -(NAVBAR_WIDTH - 48) + (NAVBAR_WIDTH + 24) / 2]
						)
					),
				},
			],
		};
	});

	const emailAnimation = useAnimatedStyle(() => {
		const width = SCREEN_WIDTH - (48 + 50);
		return {
			opacity: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [0, 1])),
			transform: [
				{
					translateY: withTiming(interpolate(height.value, [0, NAVBAR_HEIGHT], [10, 100])),
				},
				{
					translateX: withTiming(
						interpolate(
							height.value,
							[0, NAVBAR_HEIGHT],
							[0, -(NAVBAR_WIDTH - 48) + (NAVBAR_WIDTH + 24) / 2]
						)
					),
				},
			],
		};
	});

	return (
		<SafeAreaView className="relative z-10 border-b border-b-zinc-900 bg-zinc-900">
			<Animated.View className="px-6 py-4" style={[swipeDownAnimation]}>
				<StatusBar />
				{/* <StyledComponent component={Menu} className="text-blue-500" /> */}
				{!loading ? (
					<Pressable onPress={() => nav.dispatch(DrawerActions.toggleDrawer)}>
						<View className="flex-row items-center">
							<user.avatar.image
								style={[styles.profileImage, imageAnimation]}
								width={styles.profileImage.width}
								height={styles.profileImage.height}
							/>
							<View className="justify-center">
								<Text style={[usernameAnimation]} className="w-48 text-3xl font-bold text-zinc-50">
									{user.username}
								</Text>
								<Text style={[emailAnimation]} className="w-48 text-sm font-bold text-zinc-500">
									{user.email}
								</Text>
							</View>
						</View>
					</Pressable>
				) : (
					<View className="flex-row items-center">
						<Skeleton width={40} height={40} circle className="mr-2.5" />
						<Skeleton width={115} height={16} />
					</View>
				)}
			</Animated.View>
			<PanGestureHandler onGestureEvent={swipeDownGestureHandler}>
				<Animated.View
					style={{
						position: "absolute",
						width: "100%",
						height: NAVBAR_HEIGHT / 2,
						bottom: 0,
						left: 0,
						// backgroundColor: "red",
					}}
				></Animated.View>
			</PanGestureHandler>
			<View
				className="absolute z-20 w-44 rounded h-0.5 bg-zinc-600 bottom-1 left-1/2"
				style={{
					transform: [
						{
							translateX: -176 / 2,
						},
					],
				}}
			/>
			<View
				className="absolute bottom-0 z-20 w-1 h-full bg-blue-500 rounded left-1/2"
				style={{
					transform: [
						{
							translateX: -4 / 2,
						},
					],
				}}
			/>
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
