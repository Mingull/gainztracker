import { UserCtx } from "@/lib/contexts/User.context";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions, ParamListBase } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useDeferredValue, useRef } from "react";
import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Skeleton } from "./Skeleton";
import Text from "./Text";
import Animated, {
	Extrapolate,
	interpolate,
	interpolateColor,
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
import { UserInfo } from "@/lib/hooks/use-user";

export default function Navbar({ isLoading, user }: { isLoading: boolean; user: UserInfo | undefined }) {
	const NAVBAR_HEIGHT = 50 + 16 + 16;
	const NAVBAR_WIDTH = SCREEN_WIDTH - 40;
	const nav = useNavigation<DrawerNavigationProp<ParamListBase>>();
	const navbarHeight = useSharedValue(0);
	const textWrapperWidth = useSharedValue(0);
	const usernameWidth = useSharedValue(0);
	const emailWidth = useSharedValue(0);

	const swipeDownGestureHandler = useAnimatedGestureHandler({
		onStart: (event) => {},
		onActive: (event) => {
			navbarHeight.value = event.translationY;
			// console.log(event.velocityY);
			// if (event.velocityY > 750) {
			// 	navbarHeight.value = NAVBAR_HEIGHT;
			// } else {
			// 	navbarHeight.value = 0;
			// }
		},
		onEnd: (event) => {
			console.log(event.velocityY);
			if (navbarHeight.value > NAVBAR_HEIGHT / 2 || event.velocityY > 100) {
				navbarHeight.value = NAVBAR_HEIGHT;
			} else {
				navbarHeight.value = 0;
			}
		},
	});

	// useDerivedValue(() => {
	// 	console.log("SCREEN_WIDTH", SCREEN_WIDTH);
	// 	console.log("NAVBAR_HEIGHT", NAVBAR_HEIGHT);
	// 	console.log("NAVBAR_WIDTH", NAVBAR_WIDTH);
	// 	console.log("textWrapperWidth", textWrapperWidth.value);
	// 	console.log("usernameWidth", usernameWidth.value);
	// 	console.log("emailAnimation", emailWidth.value);
	// });

	const swipeDownAnimation = useAnimatedStyle(() => ({
		height: withSpring(
			interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [NAVBAR_HEIGHT, NAVBAR_HEIGHT * 3.5], Extrapolate.CLAMP)
		),
	}));

	const imageAnimation = useAnimatedStyle(() => ({
		width: withTiming(interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [50, 120], Extrapolate.CLAMP)),
		height: withTiming(interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [50, 120], Extrapolate.CLAMP)),
		borderRadius: withTiming(interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [25, 60], Extrapolate.CLAMP)),
		transform: [
			{
				translateY: withSpring(interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [0, 20], Extrapolate.CLAMP)),
			},
			{
				translateX: withSpring(
					interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [0, NAVBAR_WIDTH / 2 - 60], Extrapolate.CLAMP)
				),
			},
		],
	}));

	const textWrapperAnimation = useAnimatedStyle(() => ({
		marginLeft: withTiming(interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [10, 0], Extrapolate.CLAMP)),
		transform: [
			{
				translateX: withTiming(
					interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [0, -120], Extrapolate.CLAMP)
				),
			},
			{
				translateX: withTiming(
					interpolate(
						navbarHeight.value,
						[0, NAVBAR_HEIGHT],
						[0, NAVBAR_WIDTH / 2 - textWrapperWidth.value / 2],
						Extrapolate.CLAMP
					)
				),
			},
			{
				translateY: withTiming(
					interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [0, 150], Extrapolate.CLAMP)
				),
			},
		],
	}));
	const usernameAnimation = useAnimatedStyle(() => {
		return {
			fontSize: withTiming(interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [16, 30], Extrapolate.CLAMP)),
			lineHeight: withTiming(interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [24, 36], Extrapolate.CLAMP)),
			// width: usernameRef.current?.measureLayout().width,
			transform: [
				{
					translateX: withSpring(
						interpolate(
							navbarHeight.value,
							[0, NAVBAR_HEIGHT],
							[0, textWrapperWidth.value / 2 - usernameWidth.value / 2],
							Extrapolate.CLAMP
						)
					),
				},
				{
					translateY: withTiming(
						interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [10, 15], Extrapolate.CLAMP)
					),
				},
			],
		};
	});

	const emailAnimation = useAnimatedStyle(() => {
		return {
			opacity: withSpring(interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [0, 1], Extrapolate.CLAMP)),
			transform: [
				{
					translateY: withSpring(
						interpolate(navbarHeight.value, [0, NAVBAR_HEIGHT], [0, 15], Extrapolate.CLAMP)
					),
				},
				{
					translateX: withSpring(
						interpolate(
							navbarHeight.value,
							[0, NAVBAR_HEIGHT],
							[0, textWrapperWidth.value / 2 - emailWidth.value / 2],
							Extrapolate.CLAMP
						)
					),
				},
			],
		};
	});

	return (
		<SafeAreaView className="relative z-10 border-b border-b-zinc-900 bg-zinc-900">
			<Animated.View className="px-5 py-4" style={[swipeDownAnimation]}>
				<StatusBar />
				{/* <StyledComponent component={Menu} className="text-blue-500" /> */}
				{!isLoading && user ? (
					<Pressable onPress={() => nav.dispatch(DrawerActions.toggleDrawer)}>
						<View className="flex-row">
							<user.avatar.image
								style={[styles.profileImage, imageAnimation]}
								width={styles.profileImage.width}
								height={styles.profileImage.height}
							/>
							<Animated.View
								onLayout={(e) => {
									textWrapperWidth.value = e.nativeEvent.layout.width;
								}}
								style={[textWrapperAnimation]}
							>
								<Text
									onLayout={(e) => {
										usernameWidth.value = e.nativeEvent.layout.width;
									}}
									style={[usernameAnimation]}
									className="self-start text-3xl font-bold text-zinc-50"
								>
									{user.username}
								</Text>

								<Text
									onLayout={(e) => {
										emailWidth.value = e.nativeEvent.layout.width;
									}}
									style={[emailAnimation]}
									className="self-start text-xs font-bold text-zinc-500"
								>
									{user.email}
								</Text>
							</Animated.View>
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
						height: NAVBAR_HEIGHT / 1.5,
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
		width: 50,
		height: 50,
		borderRadius: 25,
		// marginRight: 10,
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
